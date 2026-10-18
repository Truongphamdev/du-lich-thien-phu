# Tạo ảnh poster cho web Thiên Phú Travel

Ảnh trên web gồm 2 lớp: **ảnh nền do AI tạo** + **lớp poster** (logo, tiêu đề, hotline) ghép bằng `compose.py`.
Nhờ vậy chữ tiếng Việt luôn sắc nét, và chỉ cần đổi ảnh nền là có poster mới.

## Cách 1: Gemini (đẹp nhất, cần API key)

Lấy key tại https://aistudio.google.com/apikey (key chuẩn bắt đầu bằng `AIza`).

```bash
GEMINI_API_KEY=AIza... python3 scripts/tao-anh/gemini.py scripts/tao-anh/gemini-prompts.json out-gemini
python3 scripts/tao-anh/compose.py out-gemini img
```

Script tự chọn model ảnh mới nhất có trong tài khoản (gemini-3-pro-image, gemini-2.5-flash-image).
Ảnh nào đã có trong `out-gemini/` thì bỏ qua, nên muốn tạo lại ảnh nào chỉ cần xóa file đó rồi chạy lại.
Sửa prompt trong `gemini-prompts.json`, sửa chữ trên poster trong `COPY` của `compose.py`.

## Cách 2: chạy model trên máy, không cần key (chất lượng thấp hơn)

Model stabilityai/sd-turbo, khoảng 1 phút/ảnh trên CPU.

```bash
uv venv .venv-anh
uv pip install --python .venv-anh/bin/python --index-url https://download.pytorch.org/whl/cpu torch
uv pip install --python .venv-anh/bin/python diffusers transformers accelerate safetensors pillow
.venv-anh/bin/python scripts/tao-anh/gen.py scripts/tao-anh/prompts.json out-sd
python3 scripts/tao-anh/compose.py out-sd img
```

## Danh sách ảnh

| File | Dùng ở | Tỷ lệ |
|---|---|---|
| hero.jpg | Banner đầu trang | 21:9 |
| car-4.jpg, car-7.jpg, car-16.jpg | Thẻ dòng xe | 16:9 |
| dest-*.jpg (8 ảnh) | Thẻ điểm đến | 4:3 |
| gal-fleet, gal-airport, gal-interior, gal-dalat-road | Mục "Uy tín và an toàn" | 16:9 |
