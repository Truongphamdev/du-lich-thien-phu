#!/usr/bin/env python3
"""Sinh ảnh đại diện (1080x1080) và ảnh bìa (1640x624) cho fanpage Facebook.
Chạy: python3 scripts/tao-anh/fb.py fb"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
F = lambda name, size: ImageFont.truetype(os.path.join(HERE, "fonts", name), size)
NAVY, SEA, SUN, WHITE = (10, 61, 85), (14, 143, 168), (246, 183, 60), (255, 255, 255)
HOTLINE = "0964 559 794"

def car_icon(d, x, y, s, body=WHITE, wheel=NAVY):
    d.rounded_rectangle((x, y + 12 * s, x + 34 * s, y + 30 * s), radius=7 * s, fill=body)
    d.rounded_rectangle((x + 7 * s, y, x + 27 * s, y + 16 * s), radius=6 * s, fill=body)
    d.ellipse((x + 5 * s, y + 26 * s, x + 13 * s, y + 34 * s), fill=wheel)
    d.ellipse((x + 21 * s, y + 26 * s, x + 29 * s, y + 34 * s), fill=wheel)

def avatar(dst):
    W = 1080
    im = Image.new("RGB", (W, W), SEA)
    d = ImageDraw.Draw(im)
    for i in range(W):  # nền chuyển sắc xanh biển -> xanh đậm
        t = i / W
        d.line([(0, i), (W, i)], fill=tuple(int(SEA[k] * (1 - t) + NAVY[k] * t) for k in range(3)))
    # vòng tròn trắng chứa icon xe
    r = 190; cx, cy = W // 2, 330
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=WHITE)
    car_icon(d, cx - 17 * 7, cy - 17 * 7 + 20, 7, body=SEA, wheel=NAVY)
    f1 = F("BeVietnamPro-ExtraBold.ttf", 132); f2 = F("BeVietnamPro-Bold.ttf", 84); f3 = F("BeVietnamPro-Medium.ttf", 44)
    d.text((W / 2, 640), "THIÊN PHÚ", font=f1, fill=WHITE, anchor="mm")
    d.text((W / 2, 745), "TRAVEL", font=f2, fill=SUN, anchor="mm")
    d.rounded_rectangle((W / 2 - 60, 815, W / 2 + 60, 823), radius=4, fill=SUN)
    d.text((W / 2, 880), "Xe dịch vụ du lịch · Nha Trang", font=f3, fill=(220, 236, 241), anchor="mm")
    d.text((W / 2, 950), HOTLINE, font=F("BeVietnamPro-Bold.ttf", 54), fill=SUN, anchor="mm")
    im.save(os.path.join(dst, "avatar.png"), optimize=True)

def cover(dst):
    W, H = 1640, 624
    src = Image.open(os.path.join(ROOT, "img", "hero.jpg")).convert("RGB")
    nh = round(src.width * H / W)
    top = max(0, (src.height - nh) // 2 - 40)
    im = src.crop((0, top, src.width, top + nh)).resize((W, H), Image.LANCZOS).convert("RGBA")
    d = ImageDraw.Draw(im, "RGBA")
    d.rounded_rectangle((W - 330, H - 70, W - 40, H - 22), radius=24, fill=(8, 30, 45, 170))
    d.text((W - 185, H - 46), "phucphucar.com", font=F("BeVietnamPro-Bold.ttf", 28), fill=WHITE, anchor="mm")
    im.convert("RGB").save(os.path.join(dst, "cover.jpg"), quality=90, optimize=True)

if __name__ == "__main__":
    dst = sys.argv[1] if len(sys.argv) > 1 else "fb"
    os.makedirs(dst, exist_ok=True); avatar(dst); cover(dst); print("ok", os.listdir(dst))
