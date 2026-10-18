"""Hậu kỳ: phóng 2x (Lanczos), làm nét nhẹ, xuất JPG đúng kích thước vào img/."""
import sys, json
from PIL import Image, ImageFilter, ImageEnhance
src, dst, picks = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
TARGET = {"hero": (1800, 900), "car-4": (1200, 560), "car-7": (1200, 560)}
for name, variant in picks.items():
    im = Image.open(f"{src}/{name}_{variant}.png").convert("RGB")
    tw, th = TARGET.get(name, (1200, 840))
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    # crop về đúng tỷ lệ rồi scale
    r, tr = im.width / im.height, tw / th
    if r > tr:
        nw = int(im.height * tr); im = im.crop(((im.width - nw) // 2, 0, (im.width - nw) // 2 + nw, im.height))
    elif r < tr:
        nh = int(im.width / tr); im = im.crop((0, (im.height - nh) // 2, im.width, (im.height - nh) // 2 + nh))
    im = im.resize((tw, th), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    im = ImageEnhance.Color(im).enhance(1.06)
    im.save(f"{dst}/{name}.jpg", quality=82, optimize=True, progressive=True)
    print(name, im.size)
