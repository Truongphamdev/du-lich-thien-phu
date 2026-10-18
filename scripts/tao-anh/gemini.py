#!/usr/bin/env python3
"""Tạo ảnh nền poster bằng Gemini API.
Chạy:  GEMINI_API_KEY=... python3 scripts/tao-anh/gemini.py scripts/tao-anh/gemini-prompts.json out-gemini
Key chỉ đọc từ biến môi trường, không ghi ra log."""
import json, os, sys, time, base64, urllib.request, urllib.error

KEY = os.environ.get("GEMINI_API_KEY", "").strip()
if not KEY:
    sys.exit("Thiếu GEMINI_API_KEY")
BASE = "https://generativelanguage.googleapis.com/v1beta"
MODELS = ["gemini-3-pro-image-preview", "gemini-2.5-flash-image", "gemini-2.5-flash-image-preview"]

def call(url, body=None, auth="key"):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method="POST" if data else "GET")
    req.add_header("Content-Type", "application/json")
    if auth == "key":
        req.add_header("x-goog-api-key", KEY)
    else:
        req.add_header("Authorization", "Bearer " + KEY)
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)

def pick_auth():
    for auth in ("key", "bearer"):
        try:
            call(BASE + "/models?pageSize=1", auth=auth)
            return auth
        except urllib.error.HTTPError as e:
            print(f"auth={auth}: HTTP {e.code}", file=sys.stderr)
    sys.exit("Key không hợp lệ với Gemini API. Key chuẩn bắt đầu bằng 'AIza', lấy tại https://aistudio.google.com/apikey")

def available_models(auth):
    names, token = set(), ""
    while True:
        res = call(BASE + "/models?pageSize=100" + (f"&pageToken={token}" if token else ""), auth=auth)
        for m in res.get("models", []):
            names.add(m["name"].split("/")[-1])
        token = res.get("nextPageToken")
        if not token:
            return names

def generate(model, prompt, ratio, auth):
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": ratio}},
    }
    res = call(f"{BASE}/models/{model}:generateContent", body, auth)
    for part in res["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            return base64.b64decode(part["inlineData"]["data"]), part["inlineData"].get("mimeType", "image/png")
    raise RuntimeError("Không có ảnh trong phản hồi: " + json.dumps(res)[:300])

def main():
    jobs = json.load(open(sys.argv[1])); out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    auth = pick_auth()
    avail = available_models(auth)
    model = next((m for m in MODELS if m in avail), None)
    if not model:
        sys.exit("Không thấy model tạo ảnh. Model có: " + ", ".join(sorted(n for n in avail if "image" in n)))
    print("Dùng model:", model)
    for j in jobs:
        path = f"{out}/{j['name']}.png"
        if os.path.exists(path):
            print("bỏ qua (đã có):", j["name"]); continue
        for attempt in range(3):
            try:
                data, mime = generate(model, j["prompt"], j.get("ratio", "4:3"), auth)
                open(path, "wb").write(data)
                print("ok", j["name"], len(data) // 1024, "KB", flush=True)
                break
            except urllib.error.HTTPError as e:
                print("lỗi", j["name"], "HTTP", e.code, e.read()[:200].decode(errors="ignore"), file=sys.stderr)
                time.sleep(8 * (attempt + 1))
            except Exception as e:
                print("lỗi", j["name"], str(e)[:200], file=sys.stderr)
                time.sleep(5)
        time.sleep(1)

if __name__ == "__main__":
    main()
