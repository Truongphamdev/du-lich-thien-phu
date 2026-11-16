#!/usr/bin/env python3
"""Poster cho 2 tuyến thêm sau (Cam Ranh, Ninh Hòa) khi chưa có ảnh nền riêng:
cắt vùng không chữ từ poster có sẵn rồi ghép logo + tiêu đề + hotline bằng compose.py.
Có ảnh nền Gemini riêng thì bỏ script này, thêm vào COPY của compose.py như các tuyến khác.
Chạy: python3 scripts/tao-anh/ghep-tuyen-moi.py img"""
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import compose

SIZE = (1200, 900)
# tên ảnh ra: (ảnh nguồn, vùng cắt 4:3 không dính chữ, tiêu đề, dòng phụ)
JOBS = {
    "dest-camranh-tp": ("dest-camranh.jpg", (300, 450, 1027, 995), "CAM RANH", "Nha Trang – Cam Ranh · 60 km · từ 450.000đ"),
    "dest-ninhhoa":    ("dest-vungtau.jpg", (80, 250, 593, 635),   "NINH HÒA", "Nha Trang – Ninh Hòa · 35 km · từ 450.000đ"),
}

def main(img_dir):
    for name, (src, box, title, sub) in JOBS.items():
        im = Image.open(os.path.join(img_dir, src)).convert("RGB").crop(box).resize(SIZE, Image.LANCZOS).convert("RGBA")
        s = min(SIZE[0] / 1200, SIZE[1] / 675)
        compose.badge(im, s)
        compose.footer(im, s, title, sub)
        im.convert("RGB").save(os.path.join(img_dir, name + ".jpg"), quality=84, optimize=True, progressive=True)
        print("ok", name)

if __name__ == "__main__":
    main(sys.argv[1])
