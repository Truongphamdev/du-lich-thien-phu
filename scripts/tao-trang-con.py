# Sinh 4 trang con (gioi-thieu, bang-gia, dat-xe, lien-he) dùng chung head/foot.
# Chạy: python3 scripts/tao-trang-con.py .   (chạy lại khi sửa phần <head> chung)
import sys, pathlib
ROOT = pathlib.Path(sys.argv[1])

FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%230A3D55'/%3E%3Cpath d='M8 23c4-9 9-13 18-13 3 0 6 1 7 2-2 5-7 9-13 9H8z' fill='%2362C3D6'/%3E%3Cpath d='M8 23h22c0 4-2 6-6 6H14c-4 0-6-2-6-6z' fill='%23F6B73C'/%3E%3C/svg%3E"
PHONE = '<span class="btn__ic" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M5 3h3l1.5 4-2 1.2a9 9 0 0 0 4.3 4.3L13 10.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 5a2 2 0 0 1 2-2Z" fill="currentColor"/></svg></span>'
ARROW = '<span class="btn__ic" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M6 4h6v6"/></svg></span>'

def btn_call(label="Gọi 0964 559 794", size="btn--lg"):
    return f'<a class="btn btn--sun {size}" href="tel:+84964559794"><span>{label}</span>{PHONE}</a>'
def btn_line(label, href, size="btn--lg", blank=False):
    extra = ' target="_blank" rel="noopener"' if blank else ""
    return f'<a class="btn btn--line {size}" href="{href}"{extra}><span>{label}</span>{ARROW}</a>'

def head(file, title, desc, og_img="img/hero.jpg"):
    return f'''<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#F4F7F8">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{og_img}">
<meta property="og:locale" content="vi_VN">
<link rel="canonical" href="{file}">
<link rel="icon" href="{FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Be+Vietnam+Pro:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/pages.css">
</head>
<body>
<a class="skip" href="#noi-dung">Bỏ qua tới nội dung</a>
<div class="grain" aria-hidden="true"></div>
<canvas class="snow" id="snow" aria-hidden="true"></canvas>
<div class="ambient" aria-hidden="true"></div>

<div id="siteHeader"></div>

<main id="noi-dung">
'''

FOOT = '''
</main>

<div id="siteFooter"></div>
<div id="siteDock"></div>

<script src="js/content.js"></script>
<script src="js/layout.js"></script>
<script src="js/app.js"></script>
<script src="js/effects.js"></script>
</body>
</html>
'''

def phero(tag, h1, lede, actions, art=None, extra_cls=""):
    art_html = f'''
    <div class="phero__art bezel intro intro--6" data-mouse-parallax>
      <img src="{art[0]}" alt="{art[1]}" width="1200" height="900" fetchpriority="high">
    </div>''' if art else ""
    return f'''
<section class="phero {extra_cls}" aria-labelledby="pageTitle">
  <div class="wrap phero__grid">
    <div class="phero__copy">
      <p class="tag intro intro--1">{tag}</p>
      <h1 id="pageTitle" class="split" data-split>{h1}</h1>
      <p class="phero__lede intro intro--3">{lede}</p>
      <div class="phero__actions intro intro--4">{actions}</div>
    </div>{art_html}
  </div>
</section>
'''

def cta(h2, p, second):
    return f'''
<section class="sec" aria-labelledby="ctaTitle">
  <div class="wrap">
    <div class="cta bezel bezel--deep rv">
      <div class="core">
        <div><h2 id="ctaTitle" data-split-scroll>{h2}</h2><p>{p}</p></div>
        <div class="cta__actions">{btn_call()}{second}</div>
      </div>
    </div>
  </div>
</section>
'''

BOOK_FORM = '''
        <form class="book__form" id="bookForm" novalidate>
          <div class="field field--pills">
            <fieldset><legend class="field__legend">Loại hình thuê</legend>
              <div class="pills">
                <label><input type="radio" name="trip" value="1c" checked><span>Một chiều</span></label>
                <label><input type="radio" name="trip" value="kh"><span>Khứ hồi trong ngày</span></label>
                <label><input type="radio" name="trip" value="nn"><span>Nhiều ngày, xe ở lại phục vụ</span></label>
              </div>
            </fieldset>
          </div>
          <div class="field"><label for="bRoute">Tuyến đi</label><select id="bRoute" name="route" required></select></div>
          <div class="field"><label for="bCar">Loại xe</label><select id="bCar" name="car"><option value="4">Xe 4 chỗ</option><option value="7">Xe 7 chỗ</option><option value="16">Xe 16 chỗ, báo giá theo tuyến</option></select></div>
          <div class="field"><label for="bDate">Ngày đi</label><input id="bDate" name="date" type="date" required><p class="field__err" data-err="date"></p></div>
          <div class="field"><label for="bTime">Giờ đón</label><input id="bTime" name="time" type="time" value="08:00"></div>
          <div class="field"><label for="bPax">Số khách</label><input id="bPax" name="pax" type="number" inputmode="numeric" min="1" max="30" placeholder="4"></div>
          <div class="field"><label for="bPickup">Điểm đón</label><input id="bPickup" name="pickup" type="text" placeholder="Khách sạn, sân bay, địa chỉ nhà…"></div>
          <div class="field"><label for="bName">Tên của bạn</label><input id="bName" name="name" type="text" autocomplete="name" placeholder="Nguyễn Minh An" required><p class="field__err" data-err="name"></p></div>
          <div class="field"><label for="bPhone">Số điện thoại</label><input id="bPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="0912 345 678" required><p class="field__err" data-err="phone"></p></div>
          <div class="field field--full"><label for="bNote">Ghi chú</label><textarea id="bNote" name="note" rows="2" placeholder="Có trẻ nhỏ, hành lý nhiều, muốn ghé thêm điểm, cần hóa đơn…"></textarea></div>
          <div class="book__send">
            <button class="btn btn--sun btn--lg" type="submit" data-via="zalo"><span>Gửi qua Zalo</span>''' + ARROW + '''</button>
            <button class="btn btn--line btn--lg" type="submit" data-via="whatsapp"><span>Gửi qua WhatsApp</span>''' + ARROW + '''</button>
          </div>
          <p class="book__ok" id="bookOk" role="status" hidden></p>
          <p class="book__privacy">Số điện thoại chỉ dùng để liên hệ về chuyến này.</p>
        </form>'''

def book_block(h2, p):
    return f'''
<section class="sec sec--tight" id="dat-xe" aria-labelledby="bookTitle">
  <div class="wrap">
    <div class="book book--page bezel bezel--deep rv">
      <div class="core book__grid">
        <div class="book__copy">
          <p class="tag tag--light">Đặt xe</p>
          <h2 id="bookTitle" data-split-scroll>{h2}</h2>
          <p>{p}</p>
          <ol class="how">
            <li><b>Bạn gửi yêu cầu</b><span>tuyến, loại xe, ngày giờ và số điện thoại.</span></li>
            <li><b>Thiên Phú gọi xác nhận</b><span>chốt giá, điểm đón và giờ đón.</span></li>
            <li><b>Tài xế đón tận nơi</b><span>gọi trước 15 phút khi sắp tới.</span></li>
          </ol>
        </div>{BOOK_FORM}
      </div>
    </div>
  </div>
</section>
'''

pages = {}

# ------------------------------------------------------------------ GIỚI THIỆU
pages["gioi-thieu.html"] = head("gioi-thieu.html",
    "Giới thiệu Thiên Phú Travel — xe dịch vụ Nha Trang từ 2011",
    "Thiên Phú Travel chạy xe dịch vụ từ năm 2011: Nha Trang đi Đà Lạt, sân bay Cam Ranh và các tỉnh duyên hải Nam Trung Bộ. Xe 4, 7, 16 chỗ, tài xế quen đường, giá minh bạch.",
    "img/gal-fleet.jpg") + phero(
    "Giới thiệu",
    "Mười lăm năm chạy xe giữa Nha Trang, Đà Lạt và dọc biển miền Trung.",
    "Thiên Phú Travel chạy xe dịch vụ từ năm 2011, xuất phát Nha Trang. Khách gọi là có xe, giá chốt trước, tài xế đón tận cửa và chờ đến khi bạn xong việc.",
    btn_call() + btn_line("Xem bảng giá", "bang-gia.html"),
    ("img/gal-fleet.jpg", "Đội xe 4, 7 và 16 chỗ của Thiên Phú Travel đậu trước biển Nha Trang")) + '''
<section class="sec sec--tight" aria-label="Số liệu">
  <div class="wrap">
    <ul class="facts rv">
      <li><b data-count="15">0</b><span>năm chạy tuyến</span></li>
      <li><b data-count="8">0</b><span>tuyến giá công khai</span></li>
      <li><b data-count="3">0</b><span>dòng xe</span></li>
      <li><b>24/7</b><span>nghe máy</span></li>
    </ul>
  </div>
</section>

<section class="sec sec--tint" id="vi-sao" aria-labelledby="whyTitle">
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="whyTitle" data-split-scroll>Vì sao khách quen gọi lại mỗi mùa hè</h2>
      <p>Không có gì cao siêu. Xe sạch, tài xế hiền, đúng giờ và đúng giá. Làm đều mười lăm năm thì thành thói quen của khách.</p>
    </div>
    <ul class="why" id="whyList"></ul>
  </div>
</section>


<section class="sec" id="hinh-anh" aria-labelledby="galTitle">
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="galTitle" data-split-scroll>Hình ảnh trên đường</h2>
      <p>Xe, tài xế và những tuyến chạy quen. Giá từng tuyến xem ở <a href="bang-gia.html">bảng giá</a>, dòng xe xem ở <a href="index.html#dong-xe">trang chủ</a>.</p>
    </div>
    <div class="shots" id="galleryGrid"></div>
  </div>
</section>
''' + cta("Cần xe ngày mai? Gọi hôm nay là xong.",
          "Báo tuyến, ngày giờ và số khách. Thiên Phú xác nhận giá và tài xế trong 10 phút.",
          btn_line("Gửi yêu cầu báo giá", "dat-xe.html")) + FOOT

# ------------------------------------------------------------------ BẢNG GIÁ

pages["bang-gia.html"] = head("bang-gia.html",
    "Bảng giá xe dịch vụ Nha Trang đi Đà Lạt, Cam Ranh, Phan Rang, Sài Gòn — Thiên Phú Travel",
    "Giá trọn xe 4 chỗ và 7 chỗ từ Nha Trang: Đà Lạt 900.000, sân bay Cam Ranh 300.000, Phan Rang 850.000, Phan Thiết 1.300.000, Quy Nhơn 2.000.000, Sài Gòn 2.500.000. Đã gồm xăng, cầu đường, tài xế.") + f'''
<section class="phero phero--solo" aria-labelledby="pageTitle">
  <div class="wrap phero__grid">
    <div class="phero__copy">
      <p class="tag intro intro--1">Bảng giá</p>
      <h1 id="pageTitle" class="split" data-split>Giá trọn xe, một chiều, công khai cho tám tuyến.</h1>
      <p class="phero__lede intro intro--3">Đây là giá cho cả xe, không phải giá mỗi người. Đã gồm xăng, phí cầu đường và tài xế.</p>
      <div class="phero__actions intro intro--4">{btn_call()}{btn_line("Gửi yêu cầu báo giá", "dat-xe.html")}</div>
    </div>
  </div>
</section>

<section class="sec sec--tight" id="bang-gia" aria-labelledby="priceTitle">
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="priceTitle" data-split-scroll>Bảng giá xe 4 chỗ và 7 chỗ</h2>
      <p>Áp dụng ngày thường. Lễ, Tết hoặc chạy đêm sau 22 giờ gọi để chốt giá chính xác.</p>
    </div>
    <div class="ledger bezel rv">
      <div class="core">
        <table class="ledger__table">
          <caption class="sr-only">Bảng giá xe Thiên Phú Travel theo tuyến và loại xe</caption>
          <thead><tr><th scope="col">Nha Trang đi</th><th scope="col">Quãng đường</th><th scope="col">Xe 4 chỗ</th><th scope="col">Xe 7 chỗ</th></tr></thead>
          <tbody id="priceBody"></tbody>
          <tfoot><tr><td>Xe 16 chỗ<small>mọi tuyến</small></td><td></td><td class="num num--na" colspan="2">Báo giá theo đoàn và lịch trình</td></tr></tfoot>
        </table>
        <div class="ledger__foot">
          <p>Khứ hồi trong ngày, đi nhiều điểm hoặc xe 16 chỗ: báo giá riêng, thường rẻ hơn cộng từng chặng.</p>
          {btn_call(size="")}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="gia-gom" aria-labelledby="inclTitle">
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="inclTitle" data-split-scroll>Giá gồm gì, chưa gồm gì</h2>
    </div>
    <div class="incl">
      <div class="bezel rv"><div class="core">
        <h3>Đã gồm trong giá</h3>
        <ul>
          <li>Xăng dầu cho cả chuyến</li>
          <li>Phí cầu đường, cao tốc</li>
          <li>Tài xế và tiền ăn của tài xế</li>
          <li>Nước suối, khăn lạnh trên xe</li>
          <li>Chờ máy bay trễ khi đón sân bay</li>
          <li>Dừng chụp hình, ghé mua đặc sản dọc đường</li>
        </ul>
      </div></div>
      <div class="bezel incl--no rv"><div class="core">
        <h3>Chưa gồm, bạn tự trả nếu có</h3>
        <ul>
          <li>Vé tham quan, phí vào cổng điểm du lịch</li>
          <li>Phí gửi xe tại điểm bạn yêu cầu dừng lâu</li>
          <li>Phụ thu lễ, Tết: báo trước khi chốt</li>
          <li>Chạy thêm điểm ngoài lộ trình đã chốt</li>
          <li>Phòng nghỉ tài xế khi đi nhiều ngày</li>
        </ul>
      </div></div>
    </div>
  </div>
</section>

''' + cta("Tuyến của bạn chưa có trong bảng?",
          "Khứ hồi, đi nhiều điểm, xe 16 chỗ hay tuyến khác: gửi lịch trình, Thiên Phú báo giá trong 10 phút.",
          btn_line("Gửi yêu cầu báo giá", "dat-xe.html")) + FOOT

# ------------------------------------------------------------------ YÊU CẦU BÁO GIÁ
pages["dat-xe.html"] = head("dat-xe.html",
    "Yêu cầu báo giá, đặt xe Nha Trang — Thiên Phú Travel",
    "Gửi tuyến, loại xe, ngày giờ và số khách. Thiên Phú Travel gọi lại xác nhận giá và tài xế trong 10 phút. Không cần đặt cọc.") + phero(
    "Yêu cầu báo giá",
    "Để lại vài dòng, Thiên Phú gọi lại trong 10 phút.",
    "Một chiều, khứ hồi hay đi nhiều ngày đều được. Điền xong, tin nhắn sẽ được soạn sẵn để bạn gửi qua Zalo hoặc WhatsApp. Không cần đặt cọc.",
    btn_call() + btn_line("Hoặc nhắn Zalo", "https://zalo.me/0964559794", blank=True)) + book_block(
    "Gửi yêu cầu thuê xe",
    "Càng rõ càng dễ xếp xe: điểm đón, số khách, hành lý và giờ bay nếu đón sân bay.") + '''
''' + FOOT

# ------------------------------------------------------------------ LIÊN HỆ
pages["lien-he.html"] = head("lien-he.html",
    "Liên hệ đặt xe Thiên Phú Travel — Hotline, Zalo, WhatsApp 24/7",
    "Hotline 0964 559 794 và 0559 497 866, Zalo, WhatsApp, email phanson25042102@gmail.com. Nghe máy 24/7 kể cả lễ Tết. Xe dịch vụ Nha Trang, Đà Lạt, Cam Ranh.") + phero(
    "Liên hệ",
    "Gọi là có xe. Nghe máy 24/7, kể cả lễ Tết.",
    "Hai số hotline, Zalo và WhatsApp đều là người của Thiên Phú trực tiếp nghe, không qua tổng đài. Nửa đêm cần xe ra sân bay cứ gọi.",
    btn_call() + btn_line("Nhắn Zalo", "https://zalo.me/0964559794", blank=True),
    ("img/gal-airport.jpg", "Tài xế Thiên Phú Travel đón khách tại sân bay Cam Ranh")) + f'''
<section class="sec sec--tight" id="kenh" aria-labelledby="chTitle">
  <div class="wrap">
    <div class="sec__head rv"><h2 id="chTitle" data-split-scroll>Chọn kênh bạn tiện nhất</h2></div>
    <div class="contacts">
      <div class="contact contact--hot bezel"><div class="core">
        <small>Hotline 24/7</small>
        <div class="contact__nums"><b><a href="tel:+84964559794">0964 559 794</a></b><b><a href="tel:+84559497866">0559 497 866</a></b></div>
        <p>Gọi số nào cũng được. Máy bận thì gọi số còn lại, hoặc nhắn Zalo sẽ gọi lại ngay.</p>
        {btn_call("Gọi ngay", "")}
      </div></div>
      <div class="contact contact--zalo bezel"><div class="core">
        <small>Zalo</small>
        <b>0964 559 794</b>
        <p>Nhắn tuyến, ngày giờ, số khách. Trả lời trong vài phút.</p>
        {btn_line("Mở Zalo", "https://zalo.me/0964559794", "", True)}
      </div></div>
      <div class="contact contact--wa bezel"><div class="core">
        <small>WhatsApp</small>
        <b>+84 964 559 794</b>
        <p>Tiện cho khách nước ngoài hoặc đang ở ngoài Việt Nam.</p>
        {btn_line("Mở WhatsApp", "https://wa.me/84964559794", "", True)}
      </div></div>
      <div class="contact contact--mail bezel"><div class="core">
        <small>Email</small>
        <b>phanson25042102@gmail.com</b>
        <p>Cho khách công ty cần báo giá, hợp đồng và hóa đơn.</p>
        {btn_line("Gửi email", "mailto:phanson25042102@gmail.com", "")}
      </div></div>
      <div class="contact bezel"><div class="core">
        <small>Facebook</small>
        <b>Thiên Phú Travel</b>
        <p>Xem ảnh chuyến đi mới và nhắn tin qua Messenger.</p>
        {btn_line("Mở fanpage", "https://www.facebook.com/share/19cJy7iHVu/?mibextid=wwXIfr", "", True)}
      </div></div>
    </div>
  </div>
</section>

<section class="sec sec--tint" id="dich-vu" aria-labelledby="svTitle">
  <div class="wrap">
    <div class="sec__head rv">
      <h2 id="svTitle" data-split-scroll>Các dịch vụ chính</h2>
      <p>Gọi và nói bạn cần gì, Thiên Phú xếp xe phù hợp. Dưới đây là những việc làm thường xuyên nhất.</p>
    </div>
    <ul class="services" id="serviceList"></ul>
    <h3 class="area-title rv">Khu vực hoạt động</h3>
    <ul class="area rv">
      <li>Nha Trang</li><li>Cam Ranh</li><li>Đà Lạt</li><li>Phan Rang</li><li>Tuy Hòa</li><li>Phan Thiết</li><li>Quy Nhơn</li><li>Vũng Tàu</li><li>Sài Gòn</li>
    </ul>
  </div>
</section>
''' + cta("Muốn báo giá bằng chữ?", "Gửi tuyến, ngày giờ và số khách qua form, Thiên Phú nhắn lại giá trong 10 phút.", btn_line("Gửi yêu cầu báo giá", "dat-xe.html")) + FOOT

for name, html in pages.items():
    (ROOT / name).write_text(html, encoding="utf-8")
    print(name, html.count("\n"), "lines")
