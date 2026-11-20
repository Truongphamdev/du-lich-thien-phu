#!/usr/bin/env python3
"""Sửa dòng giá in sẵn trên 4 poster điểm đến do Gemini vẽ.
Trong vùng ROUGH của mỗi ảnh, tìm chữ sáng (trắng/vàng), vá bằng màu nền
từng hàng rồi vẽ lại bằng font Be Vietnam Pro.
Chạy: python3 scripts/tao-anh/sua-gia-anh.py img <thư_mục_ra>"""
import os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "fonts", "BeVietnamPro-Bold.ttf")
WHITE, SUN, SHADOW = (255, 255, 255), (250, 205, 90), (5, 25, 45, 150)
NAVY = np.array([10, 61, 85], np.float32)
PAD = 6            # nới vùng vá quanh chữ
DILATE = 13        # nở mặt nạ chữ để phủ viền mờ và bóng đổ
MIN_KEEP = 10      # số pixel nền tối thiểu trong một hàng để lấy màu

# tên ảnh: (vùng tìm chữ x0,y0,x1,y1 ; các đoạn chữ mới (text, màu) ; tùy chọn)
#   shadow: nền sáng, chữ cũ có bóng tối phải xóa luôn.  maxw: chữ mới rộng tối đa so với chữ cũ.
JOBS = {
    "dest-dalat":   ((225, 236, 990, 290), [("140 km · Xe 4 chỗ 850.000đ · Xe 7 chỗ 950.000đ", WHITE)], {}),
    "dest-quynhon": ((55, 272, 925, 330),  [("260 km · Xe 4 chỗ 1.500.000đ · Xe 7 chỗ 1.600.000đ", WHITE)], {"shadow": True}),
    "dest-vungtau": ((215, 200, 965, 240), [("340 km · Xe 4 chỗ ", WHITE), ("2.400.000đ", SUN), (" · Xe 7 chỗ ", WHITE), ("2.500.000đ", SUN)], {"maxw": 0.98}),
    "dest-saigon":  ((45, 244, 795, 280),  [("340 km · Xe 4 chỗ 2.500.000đ · Xe 7 chỗ 2.600.000đ", WHITE)], {}),
}

def bright_mask(arr):
    """Chữ trắng hoặc vàng: đỏ và lục đều cao."""
    r, g = arr[:, :, 0].astype(int), arr[:, :, 1].astype(int)
    return (r >= 165) & (g >= 150)

def shadow_mask(arr, rough):
    """Pixel tối trong vùng (bóng đổ của chữ cũ trên nền sáng)."""
    x0, y0, x1, y1 = rough
    lum = arr.astype(int).sum(axis=2) / 3
    m = np.zeros(lum.shape, bool); m[y0:y1, x0:x1] = lum[y0:y1, x0:x1] < 135
    return m

def text_box(mask, rough):
    x0, y0, x1, y1 = rough
    sub = mask[y0:y1, x0:x1]
    ys, xs = np.where(sub)
    if not len(ys): raise SystemExit("không thấy chữ trong " + str(rough))
    return x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1

def erase(arr, mask, box):
    xa, ya, xb, yb = box
    xa, ya = max(0, xa - PAD), max(0, ya - PAD)
    xb, yb = min(arr.shape[1], xb + PAD), min(arr.shape[0], yb + PAD)
    m = Image.fromarray((mask[ya:yb, xa:xb] * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(DILATE))
    m = np.array(m) > 0
    region = arr[ya:yb, xa:xb].astype(np.float32)
    for r in range(region.shape[0]):
        keep = ~m[r]
        if keep.sum() < MIN_KEEP:
            near = [rr for rr in (r - 4, r + 4, r - 8, r + 8) if 0 <= rr < region.shape[0] and (~m[rr]).sum() >= MIN_KEEP]
            keep = ~m[near[0]] if near else keep
        color = np.median(region[r][keep], axis=0) if keep.sum() else NAVY
        region[r][m[r]] = color
    arr[ya:yb, xa:xb] = region.astype(np.uint8)
    im = Image.fromarray(arr)
    im.paste(im.crop((xa, ya, xb, yb)).filter(ImageFilter.GaussianBlur(1.0)), (xa, ya))
    return np.array(im)

def draw_segments(im, box, segs, maxw=1.10, size=None):
    xa, ya, xb, yb = box
    size = size or int((yb - ya) * 1.05)
    d = ImageDraw.Draw(im, "RGBA")
    f = ImageFont.truetype(FONT, size)
    total = lambda f: sum(d.textlength(t, font=f) for t, _ in segs)
    while total(f) > (xb - xa) * maxw and size > 12:
        size -= 1; f = ImageFont.truetype(FONT, size)
    x = (xa + xb) / 2 - total(f) / 2
    cy = (ya + yb) / 2
    for t, color in segs:
        d.text((x + 2, cy + 2), t, font=f, fill=SHADOW, anchor="lm")
        d.text((x, cy), t, font=f, fill=color, anchor="lm")
        x += d.textlength(t, font=f)

def main(src, dst):
    for name, (rough, segs, opt) in JOBS.items():
        im = Image.open(os.path.join(src, name + ".jpg")).convert("RGB")
        arr = np.array(im)
        mask = bright_mask(arr)
        box = text_box(mask, rough)            # khung chữ sáng, dùng để canh chữ mới
        if opt.get("shadow"):
            mask = mask | shadow_mask(arr, rough)
        im = Image.fromarray(erase(arr, mask, text_box(mask, rough)))
        draw_segments(im, box, segs, maxw=opt.get("maxw", 1.10))
        im.save(os.path.join(dst, name + ".jpg"), quality=86, optimize=True, progressive=True)
        print("ok", name, box)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
