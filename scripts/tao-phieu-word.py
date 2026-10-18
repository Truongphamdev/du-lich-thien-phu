# -*- coding: utf-8 -*-
"""
tao-phieu-word.py — Tạo file Word "Phieu-thong-tin-website.docx" để gửi khách.

Chạy:  python3 scripts/tao-phieu-word.py
Kết quả: Phieu-thong-tin-website.docx ở thư mục gốc dự án.

File này KHÔNG chứa dữ liệu demo. Mọi chỗ khách cần điền đều là ô trống
hoặc dấu chấm, khách gõ thẳng vào Word rồi gửi lại.
"""

import os
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "Phieu-thong-tin-website.docx")

INK = RGBColor(0x1A, 0x1A, 0x1A)
MUTED = RGBColor(0x60, 0x60, 0x60)
SUN = RGBColor(0xB0, 0x4A, 0x16)
LINE = "C9C3BA"
FILL_HEAD = "F2EDE6"
FILL_HEADER = "EFE9E1"

# ---------------------------------------------------------------- helpers

def shade(cell, hexcolor):
    """Tô nền một ô bảng."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hexcolor)
    tcPr.append(shd)


def borders(table, color=LINE, sz=6):
    """Kẻ viền mảnh cho toàn bảng."""
    tbl = table._tbl
    tblPr = tbl.tblPr
    b = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement("w:" + edge)
        e.set(qn("w:val"), "single")
        e.set(qn("w:sz"), str(sz))
        e.set(qn("w:space"), "0")
        e.set(qn("w:color"), color)
        b.append(e)
    tblPr.append(b)


def cell_text(cell, text, bold=False, color=INK, size=10, italic=False):
    """Ghi chữ vào ô, xoá nội dung cũ."""
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run(text)
    r.bold = bold
    r.italic = italic
    r.font.size = Pt(size)
    r.font.color.rgb = color
    r.font.name = "Calibri"
    return p


def para(doc, text="", size=10.5, bold=False, italic=False, color=INK,
         before=0, after=6, align=None, style=None):
    p = doc.add_paragraph(style=style)
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    if align is not None:
        p.alignment = align
    if text:
        r = p.add_run(text)
        r.bold = bold
        r.italic = italic
        r.font.size = Pt(size)
        r.font.color.rgb = color
        r.font.name = "Calibri"
    return p


def bullet(doc, text, size=10.5, color=INK):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.color.rgb = color
    r.font.name = "Calibri"
    return p


def numbered(doc, text, size=10.5, color=INK):
    p = doc.add_paragraph(style="List Number")
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.color.rgb = color
    r.font.name = "Calibri"
    return p


def h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.font.size = Pt(14)
    r.font.color.rgb = SUN
    r.font.name = "Calibri"
    return p


def h2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.font.size = Pt(11.5)
    r.font.color.rgb = INK
    r.font.name = "Calibri"
    return p


def hint(doc, text):
    """Dòng giải thích mục này dùng làm gì — in nghiêng, xám."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run("→ " + text)
    r.italic = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = MUTED
    r.font.name = "Calibri"
    return p


def note(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.left_indent = Cm(0.3)
    r = p.add_run(text)
    r.italic = True
    r.font.size = Pt(10)
    r.font.color.rgb = SUN
    r.font.name = "Calibri"
    return p


def fill_table(doc, headers, rows, widths=None):
    """Bảng khách điền: dòng 1 là tiêu đề, các dòng sau để trống."""
    t = doc.add_table(rows=1, cols=len(headers))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    borders(t)
    for i, htext in enumerate(headers):
        c = t.rows[0].cells[i]
        cell_text(c, htext, bold=True, size=9.5)
        shade(c, FILL_HEADER)
    for row in rows:
        cells = t.add_row().cells
        for i, val in enumerate(row):
            cell_text(cells[i], val, size=10,
                      color=MUTED if i == 0 else INK)
    if widths:
        for row in t.rows:
            for i, w in enumerate(widths):
                row.cells[i].width = Cm(w)
    return t


def field(doc, label, hint_text=None, example=None):
    """Một mục cần điền: nhãn đậm + dòng kẻ trống để khách gõ."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(1)
    r = p.add_run(label)
    r.bold = True
    r.font.size = Pt(10.5)
    r.font.color.rgb = INK
    r.font.name = "Calibri"
    if hint_text:
        r2 = p.add_run("  " + hint_text)
        r2.italic = True
        r2.font.size = Pt(9)
        r2.font.color.rgb = MUTED
        r2.font.name = "Calibri"

    # dòng kẻ trống
    line = doc.add_paragraph()
    line.paragraph_format.space_before = Pt(0)
    line.paragraph_format.space_after = Pt(4 if not example else 1)
    r3 = line.add_run(" " * 90)
    r3.font.size = Pt(11)
    r3.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    r3.font.name = "Calibri"
    pPr = line._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "4")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), LINE)
    pbdr.append(bottom)
    pPr.append(pbdr)

    if example:
        ex = doc.add_paragraph()
        ex.paragraph_format.space_before = Pt(0)
        ex.paragraph_format.space_after = Pt(4)
        r4 = ex.add_run("Ví dụ: " + example)
        r4.italic = True
        r4.font.size = Pt(9)
        r4.font.color.rgb = MUTED
        r4.font.name = "Calibri"


# ---------------------------------------------------------------- document

doc = Document()

# lề trang
for s in doc.sections:
    s.top_margin = Cm(1.9)
    s.bottom_margin = Cm(1.9)
    s.left_margin = Cm(2.1)
    s.right_margin = Cm(2.1)

# font mặc định
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(10.5)
style.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
style.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE

# ---- TIÊU ĐỀ ----
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(2)
r = p.add_run("PHIẾU THÔNG TIN LÀM WEBSITE")
r.bold = True
r.font.size = Pt(20)
r.font.color.rgb = SUN
r.font.name = "Calibri"

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(14)
r = p.add_run("Dịch vụ xe liên tỉnh / đưa đón sân bay")
r.font.size = Pt(12)
r.font.color.rgb = MUTED
r.font.name = "Calibri"

t = doc.add_table(rows=1, cols=1)
borders(t)
c = t.rows[0].cells[0]
shade(c, FILL_HEAD)
cell_text(c, "Kính gửi anh/chị,\n\n"
             "Để làm website cho dịch vụ xe của mình, em cần anh/chị điền phiếu dưới đây. "
             "Mỗi mục em đều ghi rõ dùng để làm gì trên web, và có dòng \"Ví dụ\" để anh/chị dễ hình dung. "
             "Anh/chị chỉ cần gõ thay bằng thông tin thật.\n\n"
             "Không cần điền hết một lần. Chỗ nào chưa có cứ ghi \"chưa có\" hoặc bỏ trống, "
             "em sẽ để lại và bổ sung sau. Em không tự bịa thông tin của anh/chị.",
          size=10.5)

para(doc, "", after=4)

# =============================== 1. THÔNG TIN CHUNG
h1(doc, "1. THÔNG TIN CHUNG")
hint(doc, "Đây là những gì khách nhìn thấy đầu tiên khi mở web.")

field(doc, "Tên dịch vụ / thương hiệu",
      "(hiện trên logo góc trái, đầu trang, chân trang)",
      "Xe Dịch Vụ Liên Tỉnh")
field(doc, "Tên phụ hiện dưới tên chính",
      "(chữ nhỏ trên logo)",
      "Liên Tỉnh")
field(doc, "Mô tả ngắn 1 câu",
      "(hiện ở đầu trang, cũng là dòng khách thấy khi tìm trên Google)",
      "Đưa đón sân bay & du lịch Nha Trang, Đà Lạt")
field(doc, "Khu vực hoạt động",
      "(khách biết mình có nằm trong vùng phục vụ)",
      "TP.HCM · Nha Trang · Đà Lạt · Phan Rang · Quy Nhơn")
field(doc, "Năm bắt đầu chạy xe",
      "(để ghi \"hơn X năm chạy tuyến\", tạo tin cậy)",
      "2019")

# =============================== 2. LIÊN HỆ
h1(doc, "2. LIÊN HỆ")
hint(doc, "Đây là phần khách bấm vào là gọi/chat được ngay. Số hiện trên web phải là số chạy máy thật.")
field(doc, "Hotline", "(nút \"Gọi ngay\" ở đầu trang, chân trang, và thanh gọi nhanh trên điện thoại)")
field(doc, "Số Zalo", "(nút \"Nhắn Zalo\" — khách gửi ảnh điểm hẹn, hỏi nhanh)")
field(doc, "Giờ nghe máy", "(khách biết gọi lúc nào có người)", "24/7, kể cả lễ Tết")
field(doc, "Giờ chạy xe thường ngày", "(khách biết khung giờ đặt)", "05:00 – 21:00")
field(doc, "Email", "(cho khách đi công tác, công ty cần hóa đơn)")
field(doc, "Địa chỉ văn phòng", "(hiện ở chân trang, tăng uy tín — nếu có)")

h2(doc, "Mạng xã hội — dán link, chỗ nào không có ghi \"không\"")
field(doc, "Facebook")
field(doc, "TikTok")
field(doc, "Kênh khác (YouTube, Instagram…)")

# =============================== 3. TUYẾN ĐƯỜNG
doc.add_page_break()
h1(doc, "3. TUYẾN ĐƯỜNG ĐANG CHẠY")
hint(doc, "Đây là phần quan trọng nhất của web. Mỗi tuyến sẽ thành một thẻ trên trang chủ, "
          "và tự chảy vào ô chọn tuyến khi khách đặt xe. Anh/chị điền càng rõ, khách càng dễ chọn.")

para(doc, "Anh/chị điền từng tuyến vào bảng dưới. Nếu chưa muốn công khai giá, "
          "để trống phần giá — xem Mục 4.", italic=True, color=MUTED, size=9.5, after=8)

fill_table(
    doc,
    ["STT", "Điểm đi", "Điểm đến", "Số km", "Thời gian chạy", "Giờ khởi hành", "Mô tả ngắn cho khách", "Khách đi nhiều?"],
    [[str(i), "", "", "", "", "", "", ""] for i in range(1, 7)],
    widths=[1.0, 2.6, 2.6, 1.5, 2.2, 3.0, 4.5, 1.8],
)

para(doc, "", after=6)
h2(doc, "Chi tiết từng tuyến")
hint(doc, "Với mỗi tuyến, điền thêm vài dòng dưới đây nếu anh/chị muốn câu mô tả hấp dẫn hơn "
          "(vd: tuyến này chạy cao tốc, hay ghép được tua nghỉ dưỡng, có thể dừng chụp hình dọc đường…).")

for i in range(1, 4):
    h2(doc, "Tuyến %d" % i)
    field(doc, "Tên tuyến", "(điểm đi → điểm đến)",
          "TP. Hồ Chí Minh → Nha Trang")
    field(doc, "Mô tả ngắn", "(1–2 câu \"chào hàng\" cho tuyến này)",
          "Tuyến dài nhất, chạy cao tốc. Khởi hành tối là ngủ một giấc tới Nha Trang sáng sớm.")
    field(doc, "Đi xe 4 chỗ / 7 chỗ / 16 chỗ được không?", "(loại xe nào chạy được tuyến này)",
          "Cả 3 loại")

# =============================== 4. GIÁ
doc.add_page_break()
h1(doc, "4. GIÁ — MỤC NÀY KHÔNG CÔNG KHAI")
para(doc, "Anh/chị đã nói giá không muốn công khai. Em xử lý theo hướng sau:", after=6)
bullet(doc, "Trên web sẽ KHÔNG hiện bảng giá cho khách xem.")
bullet(doc, "Thay vào đó em ghi một dòng: \"Giá báo riêng theo ngày và số khách — gọi hoặc nhắn Zalo để được báo giá chính xác\".")
bullet(doc, "Ở form đặt xe, ô \"giá dự kiến\" sẽ ẩn đi. Khách điền xong chờ nhân viên gọi lại báo giá — giống cách các hãng xe hợp đồng vẫn làm.")
para(doc, "Lý do nên làm vậy: giá thay đổi theo mùa, lễ Tết, số khách và điểm đón khác nhau. "
          "Niêm yết cứng dễ bị khách so đo hoặc hớ; báo riêng qua điện thoại vừa linh động vừa dễ chốt giá hơn.",
     italic=True, color=MUTED, size=9.5, after=10)

h2(doc, "Anh/chị chỉ cần chọn 1 trong 3 cách (đánh dấu X vào ô vuông):")
fill_table(
    doc,
    ["Chọn", "Cách hiển thị"],
    [["", "A. Không hiện giá nào cả, chỉ ghi \"liên hệ báo giá\"  (khuyến nghị)"],
     ["", "B. Hiện khoảng giá tham khảo (vd: từ 1,3 – 5,9 triệu), không hiện số chính xác từng tuyến"],
     ["", "C. Hiện giá đầy đủ từng tuyến (chỉ chọn nếu anh/chị chắc chắn muốn công khai)"]],
    widths=[1.8, 14.5],
)
para(doc, "", after=6)
para(doc, "Nếu chọn A hoặc B, anh/chị để trống toàn bộ phần giá ở Mục 3 — em sẽ không hiện gì cả.",
     italic=True, color=SUN, size=10, after=6)

h2(doc, "Nếu chọn B — ghi khoảng giá ở đây")
field(doc, "Khoảng giá thấp nhất – cao nhất", "", "1.300.000đ – 5.900.000đ")

h2(doc, "Nếu chọn C — ghi giá từng tuyến")
fill_table(
    doc,
    ["Tuyến", "Giá xe 4 chỗ", "Giá xe 7 chỗ", "Giá xe 16 chỗ"],
    [[str(i), "", "", ""] for i in range(1, 6)],
    widths=[6.5, 3.2, 3.2, 3.2],
)
para(doc, "", after=8)
field(doc, "Giá đã bao gồm những gì?",
      "(xăng, phí cầu đường, tiền tài xế… và KHÔNG gồm gì)",
      "Gồm xăng + phí cầu đường. Không gồm phí gửi xe và khu vực xa trung tâm")
field(doc, "Giá lễ/Tết có khác không?",
      "(khách rất hay hỏi mục này)",
      "Lễ Tết cộng thêm 10–20%")

# =============================== 5. VÌ SAO CHỌN
doc.add_page_break()
h1(doc, "5. VÌ SAO KHÁCH NÊN CHỌN ANH/CHỊ")
hint(doc, "Phần \"4 lý do\" ở đầu trang. Khách đọc phần này để quyết định gọi hay không. "
          "Nên là điểm THẬT khách hay khen, đừng nói chung chung.")

fill_table(
    doc,
    ["Tiêu đề", "Giải thích thêm (1 câu)"],
    [["", ""] for _ in range(5)],
    widths=[6.0, 10.3],
)

para(doc, "", after=8)
field(doc, "Điểm đặc biệt mà đối thủ không có?",
      "(vd: tài xế biết tiếng Anh, có ghế trẻ em, nhận hóa đơn VAT, chở được thú cưng…)")

# =============================== 6. LOẠI XE
h1(doc, "6. LOẠI XE & SỨC CHỨA")
hint(doc, "Hiện ở ô chọn loại xe khi khách đặt. Giúp khách chọn đúng xe, tránh đặt thiếu chỗ.")

fill_table(
    doc,
    ["Loại xe", "Số ghế", "Chở tối đa (khách)", "Có nhận? (ghi có/không)"],
    [["Xe 4 chỗ", "4", "", ""],
     ["Xe 7 chỗ", "7", "", ""],
     ["Xe 16 chỗ", "16", "", ""],
     ["Xe 29 chỗ", "29", "", ""],
     ["Xe khác:", "", "", ""]],
    widths=[4.0, 2.5, 4.0, 6.0],
)
para(doc, "", after=8)
field(doc, "Yêu cầu đặc biệt có nhận không?",
      "(ghế trẻ em, xe lăn, nhiều hành lý, thú cưng…)")

# =============================== 7. ĐÁNH GIÁ
h1(doc, "7. ĐÁNH GIÁ CỦA KHÁCH CŨ")
hint(doc, "Phần \"Khách nói gì\" — tạo niềm tin rất mạnh với khách mới. Ưu tiên đánh giá THẬT.")
para(doc, "Nếu chưa có, anh/chị gửi em vài ảnh chụp tin nhắn khách khen, em gõ lại thành đánh giá. "
          "Hoặc để trống — em sẽ ẩn cả phần này. Thà không có còn hơn để đánh giá giả, "
          "vì web ghi đánh giá bịa có thể bị coi là quảng cáo sai sự thật.",
     italic=True, color=MUTED, size=9.5, after=8)

fill_table(
    doc,
    ["Tên khách", "Đi tuyến nào", "Khách nói gì (nguyên văn càng tốt)"],
    [["", "", ""] for _ in range(4)],
    widths=[3.6, 4.0, 8.7],
)
para(doc, "", after=8)
field(doc, "Anh/chị có ảnh thật không?",
      "(ảnh xe, ảnh tài xế, ảnh khách chụp cùng — gửi kèm càng tốt)",
      "Có, gửi kèm / Chưa có")

# =============================== 8. CHÍNH SÁCH
doc.add_page_break()
h1(doc, "8. CHÍNH SÁCH CẦN NÓI RÕ VỚI KHÁCH")
hint(doc, "Phần \"Hỏi đáp\" trên web. Khách rất hay hỏi mấy câu này — trả lời sẵn trên web "
          "thì đỡ phải gọi hỏi nhiều lần. Câu nào chưa có chính sách rõ cứ ghi \"chưa có\".")

for q in [
    "Đặt trước bao lâu thì được?",
    "Giá đã bao gồm những gì?",
    "Có ghép khách chung với đoàn khác không?",
    "Đón sân bay — máy bay trễ thì sao?",
    "Đổi hoặc hủy chuyến thì thế nào?",
    "Có xuất hóa đơn không?",
]:
    field(doc, q)

# =============================== 9. CÁC BƯỚC
h1(doc, "9. CÁC BƯỚC ĐẶT XE")
hint(doc, "Phần \"Ba bước\" — cho khách thấy đặt xe dễ, nhanh. Em đang để mặc định như dưới, "
          "anh/chị xem có đúng với quy trình thật không.")
numbered(doc, "Khách điền thông tin → chọn tuyến, loại xe, ngày giờ, để lại số điện thoại.")
numbered(doc, "Mình gọi xác nhận → chốt giá, giờ đón, điểm hẹn. Khách đồng ý mới coi như đặt xong.")
numbered(doc, "Tài xế đón tận nơi → đúng giờ, tài xế gọi trước khi tới.")
para(doc, "", after=6)
fill_table(
    doc,
    ["Đúng với quy trình thật chưa?", "Nếu cần sửa, ghi vào đây"],
    [["", ""]],
    widths=[5.5, 10.8],
)

# =============================== 10. CHI TIẾT NHỎ
h1(doc, "10. NHỮNG THỨ NHỎ NHƯNG QUAN TRỌNG")
hint(doc, "Mấy chi tiết này quyết định web trông chuyên nghiệp và đúng gu anh/chị hay không.")

fill_table(
    doc,
    ["Mục", "Dùng để làm gì", "Anh/chị điền"],
    [["Khách có phải đặt cọc trước không?", "Ghi ngay dưới form đặt xe", ""],
     ["Thời gian phản hồi trung bình", "Khách biết chờ bao lâu thì được gọi lại", ""],
     ["Có gửi tin quảng cáo cho khách không?", "Dòng cam kết bảo mật dưới form", ""],
     ["Màu thương hiệu", "Chủ đích màu web theo logo (nếu có)", ""],
     ["Logo", "Thay logo hiện tại (gửi kèm file ảnh)", ""]],
    widths=[5.0, 6.0, 5.3],
)

# =============================== KẾT
para(doc, "", after=10)
t = doc.add_table(rows=1, cols=1)
borders(t)
c = t.rows[0].cells[0]
shade(c, FILL_HEAD)
cell_text(c,
          "Sau khi điền xong\n\n"
          "Anh/chị gửi lại phiếu này qua Zalo hoặc email. Em sẽ:\n"
          "   1. Dựng web hoàn chỉnh từ thông tin trên\n"
          "   2. Gửi anh/chị link xem thử để duyệt\n"
          "   3. Sửa theo góp ý tới khi vừa ý\n\n"
          "Mục nào chưa có cứ ghi \"chưa có\" — em để chỗ đó lại, không tự bịa thông tin cho anh/chị.",
          size=10.5)

para(doc, "", after=8)
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("Cảm ơn anh/chị đã dành thời gian điền phiếu.")
r.italic = True
r.font.size = Pt(10)
r.font.color.rgb = MUTED
r.font.name = "Calibri"

doc.save(OUT)
print("Đã tạo:", OUT)
