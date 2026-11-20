#!/usr/bin/env python3
"""Poster cho các tuyến thêm sau (Cam Ranh, Ninh Hòa, Cam Lâm, Vạn Ninh, Buôn Ma Thuột, sân bay Cam Ranh – Đà Lạt) khi chưa có ảnh nền riêng:
cắt vùng không chữ từ poster có sẵn (chạy trước sua-gia-anh.py; _dalat-orig.jpg là bản Đà Lạt gốc tạm đặt vào img) rồi ghép logo + tiêu đề + hotline bằng compose.py.
Có ảnh nền Gemini riêng thì bỏ script này, thêm vào COPY của compose.py như các tuyến khác.
Chạy: python3 scripts/tao-anh/ghep-tuyen-moi.py img"""
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import compose

SIZE = (1200, 900)
# tên ảnh ra: (ảnh nguồn, vùng cắt 4:3 không dính chữ, tiêu đề, dòng phụ)
JOBS = {
    "dest-camranh-tp": ("dest-camranh.jpg",   (300, 450, 1027, 995), "CAM RANH",         "Nha Trang – Cam Ranh · 60 km · từ 400.000đ"),
    "dest-ninhhoa":    ("dest-vungtau.jpg",   (80, 250, 593, 635),   "NINH HÒA",         "Nha Trang – Ninh Hòa · 35 km · từ 450.000đ"),
    "dest-camlam":     ("dest-phanthiet.jpg", (250, 350, 970, 890),  "CAM LÂM",          "Nha Trang – Cam Lâm · 35 km · từ 250.000đ"),
    "dest-vanninh":    ("dest-quynhon.jpg",   (500, 330, 1153, 820), "VẠN NINH",         "Nha Trang – Vạn Ninh · 65 km · từ 550.000đ"),
    "dest-bmt":        ("gal-dalat-road.jpg", (100, 350, 927, 970),  "BUÔN MA THUỘT",    "Nha Trang – Buôn Ma Thuột · 190 km · từ 1.400.000đ"),
    "dest-sbcr-dalat": ("_dalat-orig.jpg",    (80, 300, 747, 800),   "CAM RANH – ĐÀ LẠT", "Sân bay Cam Ranh – Đà Lạt · 160 km · từ 1.000.000đ"),
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
