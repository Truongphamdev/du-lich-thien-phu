#!/usr/bin/env python3
"""Ghép logo, tiêu đề, hotline lên ảnh nền để thành poster kiểu quảng cáo.
Chạy: python3 scripts/tao-anh/compose.py out-gemini img
Nội dung chữ của từng ảnh nằm trong COPY bên dưới."""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
F = lambda name, size: ImageFont.truetype(os.path.join(HERE, "fonts", name), size)
BRAND, SUB, HOT = "THIÊN PHÚ TRAVEL", "Xe dịch vụ du lịch · từ 2011", "Hotline / Zalo / WhatsApp 24/7:  0964 559 794"
NAVY, SEA, SUN, WHITE = (10, 61, 85), (14, 143, 168), (246, 183, 60), (255, 255, 255)

# tên ảnh: (kích thước đích, tiêu đề lớn, dòng phụ)
COPY = {
 "hero":        (None, "", ""),          # None = giữ nguyên tỷ lệ ảnh gốc, rộng 1800
 "car-4":       ((1200, 675), "XE 4 CHỖ", "Sedan máy lạnh · 3 khách · từ 300.000đ"),
 "car-7":       ((1200, 675), "XE 7 CHỖ", "SUV gầm cao · 6 khách · từ 350.000đ"),
 "car-16":      ((1200, 675), "XE 16 CHỖ", "Đoàn đông, hành lý nhiều · liên hệ báo giá"),
 "dest-dalat":    ((1200, 900), "ĐÀ LẠT",          "Nha Trang – Đà Lạt · 140 km · từ 900.000đ"),
 "dest-camranh":  ((1200, 900), "SÂN BAY CAM RANH", "Nha Trang – Cam Ranh · 35 km · từ 300.000đ"),
 "dest-phanrang": ((1200, 900), "PHAN RANG",        "Nha Trang – Phan Rang · 120 km · từ 850.000đ"),
 "dest-tuyhoa":   ((1200, 900), "TUY HÒA",          "Nha Trang – Tuy Hòa · 110 km · từ 850.000đ"),
 "dest-phanthiet":((1200, 900), "PHAN THIẾT",       "Nha Trang – Mũi Né · 175 km · từ 1.300.000đ"),
 "dest-quynhon":  ((1200, 900), "QUY NHƠN",         "Nha Trang – Quy Nhơn · 260 km · từ 2.000.000đ"),
 "dest-vungtau":  ((1200, 900), "VŨNG TÀU",         "Nha Trang – Vũng Tàu · 340 km · từ 2.500.000đ"),
 "dest-saigon":   ((1200, 900), "SÀI GÒN",          "Nha Trang – Sài Gòn · 340 km · từ 2.500.000đ"),
 "gal-fleet":      ((1200, 675), "", ""),
 "gal-airport":    ((1200, 675), "", ""),
 "gal-interior":   ((1200, 675), "", ""),
 "gal-dalat-road": ((1200, 675), "", ""),
 "gal-nhatrang":   ((1200, 675), "", ""),
}

def cover(im, size):
    tw, th = size; r, tr = im.width / im.height, tw / th
    if r > tr:
        nw = int(im.height * tr); im = im.crop(((im.width - nw) // 2, 0, (im.width - nw) // 2 + nw, im.height))
    else:
        nh = int(im.width / tr); im = im.crop((0, (im.height - nh) // 2, im.width, (im.height - nh) // 2 + nh))
    return im.resize(size, Image.LANCZOS)

def badge(im, s):
    """Logo bo tròn góc trái trên."""
    d = ImageDraw.Draw(im, "RGBA")
    f1, f2 = F("BeVietnamPro-ExtraBold.ttf", int(26 * s)), F("BeVietnamPro-Medium.ttf", int(15 * s))
    pad, x, y = int(16 * s), int(26 * s), int(24 * s)
    w = max(d.textlength(BRAND, f1), d.textlength(SUB, f2)) + pad * 2 + int(44 * s)
    h = int(74 * s)
    d.rounded_rectangle((x, y, x + w, y + h), radius=int(18 * s), fill=(255, 255, 255, 235))
    # icon xe nhỏ
    ix, iy = x + pad, y + int(18 * s)
    d.rounded_rectangle((ix, iy + int(12 * s), ix + int(34 * s), iy + int(30 * s)), radius=int(7 * s), fill=SEA)
    d.rounded_rectangle((ix + int(7 * s), iy, ix + int(27 * s), iy + int(16 * s)), radius=int(6 * s), fill=SEA)
    d.ellipse((ix + int(5 * s), iy + int(26 * s), ix + int(13 * s), iy + int(34 * s)), fill=NAVY)
    d.ellipse((ix + int(21 * s), iy + int(26 * s), ix + int(29 * s), iy + int(34 * s)), fill=NAVY)
    tx = x + pad + int(44 * s)
    d.text((tx, y + int(14 * s)), BRAND, font=f1, fill=NAVY)
    d.text((tx, y + int(46 * s)), SUB, font=f2, fill=(90, 105, 115))

def footer(im, s, title, sub):
    W, H = im.size
    # dải tối mờ dần ở đáy
    grad = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(grad)
    gh = int(H * 0.46)
    for i in range(gh):
        a = int(225 * (i / gh) ** 1.4)
        gd.line([(0, H - gh + i), (W, H - gh + i)], fill=(8, 30, 45, a))
    im.alpha_composite(grad)
    d = ImageDraw.Draw(im, "RGBA")
    bar_h = int(54 * s)
    d.rectangle((0, H - bar_h, W, H), fill=SUN)
    fh = F("BeVietnamPro-Bold.ttf", int(22 * s))
    d.text((W / 2, H - bar_h / 2), HOT, font=fh, fill=NAVY, anchor="mm")
    if title:
        ft = F("BeVietnamPro-ExtraBold.ttf", int(72 * s))
        fs = F("BeVietnamPro-Medium.ttf", int(23 * s))
        x = int(34 * s)
        y_sub = H - bar_h - int(30 * s)                 # đáy dòng phụ
        y_line = y_sub - int(40 * s)                    # gạch vàng
        y_title = y_line - int(16 * s)                  # đáy tiêu đề
        d.text((x + 3, y_title + 3), title, font=ft, fill=(0, 0, 0, 140), anchor="ls")
        d.text((x, y_title), title, font=ft, fill=WHITE, anchor="ls")
        d.rounded_rectangle((x, y_line, x + int(70 * s), y_line + int(5 * s)), radius=3, fill=SUN)
        d.text((x, y_sub), sub, font=fs, fill=(235, 242, 245), anchor="ls")

def main(src, dst, raw=False):
    """raw=True: ảnh đã có sẵn chữ do AI vẽ, chỉ cắt đúng kích thước, không ghép thêm."""
    for name, (size, title, sub) in COPY.items():
        cands = [f"{src}/{name}{ext}" for ext in (".png", ".jpg", ".jpeg", ".webp")]
        p = next((c for c in cands if os.path.exists(c)), None)
        if not p:
            print("thiếu", name); continue
        im = Image.open(p).convert("RGB")
        if size is None or raw:
            tw = 1800 if name == "hero" else 1200
            size = (tw, round(im.height * tw / im.width))
        im = cover(im, size).convert("RGBA")
        s = min(size[0] / 1200, size[1] / 675)
        if not raw:
            badge(im, s)
            footer(im, s, title, sub)
        im.convert("RGB").save(f"{dst}/{name}.jpg", quality=84, optimize=True, progressive=True)
        print("ok", name, size)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], raw="--raw" in sys.argv)
