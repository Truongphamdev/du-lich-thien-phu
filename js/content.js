/* ==========================================================================
   content.js — Toàn bộ nội dung Thiên Phú Travel nằm ở đây.
   Sửa tuyến, giá, câu hỏi, đánh giá → chỉ cần sửa file này.
   ========================================================================== */

window.TP_CONTENT = {

  brand: {
    name: "Thiên Phú Travel",
    slogan: "An toàn, uy tín, vui vẻ, chu đáo, tận tình",
    since: 2011,
    hotline: ["0559 497 866", "0964 559 794"],
    hotlineTel: ["+84559497866", "+84964559794"],
    zalo: "0964559794",
    whatsapp: "84964559794",
    email: "phanson25042102@gmail.com",
    facebook: "https://www.facebook.com/share/19cJy7iHVu/?mibextid=wwXIfr",
    area: ["Nha Trang", "Đà Lạt", "Cam Ranh", "Phan Rang", "Phan Thiết", "Tuy Hòa", "Quy Nhơn", "Vũng Tàu", "Sài Gòn"]
  },

  /* ẢNH: mỗi mục có `photo` (ảnh JPG do AI tạo, xem img/PROMPTS.md) và `img`
     (SVG tạm). Trang ưu tiên JPG; chưa có file JPG thì tự dùng SVG.           */
  /* Loại xe đang nhận. pax: số khách tối đa theo thông tin chủ xe. */
  cars: [
    { id: "4", name: "Xe 4 chỗ", pax: 4, bags: "2 vali lớn", photo: "img/car-4.jpg", img: "img/car-4.svg",
      note: "Sedan máy lạnh, êm và tiết kiệm cho cặp đôi hoặc nhóm nhỏ." },
    { id: "7", name: "Xe 7 chỗ", pax: 7, bags: "4 vali lớn", photo: "img/car-7.jpg", img: "img/car-7.svg",
      note: "Gầm cao, rộng rãi cho gia đình, nhóm bạn và đoàn mang nhiều hành lý." },
    { id: "16", name: "Xe 16 chỗ", pax: 14, bags: "nhiều hành lý", photo: "img/car-16.jpg", img: "",
      note: "Cho đoàn đông, công ty đi nghỉ hoặc đón tiễn sân bay số lượng lớn. Báo giá theo tuyến." }
  ],

  /* Ảnh thực tế dịch vụ. Thiếu file nào thì thẻ đó tự ẩn. */
  gallery: [
    { photo: "img/gal-fleet.jpg",      caption: "Đội xe 4, 7 và 16 chỗ, đời mới, bảo dưỡng định kỳ" },
    { photo: "img/gal-nhatrang.jpg",   caption: "Khám phá Nha Trang: biển xanh, đảo đẹp, ẩm thực phong phú" },
    { photo: "img/gal-dalat-road.jpg", caption: "Đà Lạt, thành phố ngàn hoa, tuyến quen thuộc 15 năm" },
    { photo: "img/gal-airport.jpg",    caption: "Đón tiễn sân bay Cam Ranh, tài xế hỗ trợ hành lý" },
    { photo: "img/gal-interior.jpg",   caption: "Nước suối, khăn lạnh sẵn trên xe" }
  ],

  /* Tuyến đường & giá trọn xe (VND). km: quãng đường, img: ảnh minh họa điểm đến. */
  routes: [
    { id: "nt-dl",  to: "Đà Lạt",            km: "140-150 km", hours: "≈ 3,5 giờ", price: { 4: 900000,  7: 1000000 }, photo: "img/dest-dalat.jpg", img: "img/dest-dalat.svg",     featured: true,
      note: "Đường đèo Khánh Lê, tài xế quen tay. Lên tới nơi còn kịp cà phê chiều." },
    { id: "nt-cxr", to: "Sân bay Cam Ranh",  km: "35 km",        hours: "≈ 45 phút", price: { 4: 300000,  7: 350000 },  photo: "img/dest-camranh.jpg", img: "img/dest-camranh.svg",   featured: true,
      note: "Đón trả tận cổng, canh giờ bay. Máy bay trễ vẫn chờ." },
    { id: "nt-pr",  to: "Phan Rang",         km: "110-130 km", hours: "≈ 2,5 giờ", price: { 4: 850000,  7: 950000 },  photo: "img/dest-phanrang.jpg", img: "img/dest-phanrang.svg",
      note: "Men theo biển, có thể ghé Vĩnh Hy hoặc vườn nho dọc đường." },
    { id: "nt-th",  to: "Tuy Hòa",           km: "100-120 km", hours: "≈ 2,5 giờ", price: { 4: 850000,  7: 950000 },  photo: "img/dest-tuyhoa.jpg", img: "img/dest-tuyhoa.svg",
      note: "Qua đèo Cả, dừng chụp hình Đại Lãnh nếu bạn muốn." },
    { id: "nt-pt",  to: "Phan Thiết",        km: "170-180 km", hours: "≈ 3,5 giờ", price: { 4: 1300000, 7: 1500000 }, photo: "img/dest-phanthiet.jpg", img: "img/dest-phanthiet.svg",
      note: "Thẳng tới Mũi Né, đồi cát và làng chài." },
    { id: "nt-qn",  to: "Quy Nhơn",          km: "240-280 km", hours: "≈ 5 giờ",   price: { 4: 1800000, 7: 2000000 }, photo: "img/dest-quynhon.jpg", img: "img/dest-quynhon.svg",
      note: "Đường ven biển đẹp, ghé Kỳ Co hoặc Eo Gió trên đường." },
    { id: "nt-vt",  to: "Vũng Tàu",          km: "320-360 km", hours: "≈ 7 giờ",   price: { 4: 2500000, 7: 2700000 }, photo: "img/dest-vungtau.jpg", img: "img/dest-vungtau.svg",
      note: "Chạy cao tốc, đi sáng tới nơi kịp ăn trưa hải sản." },
    { id: "nt-sg",  to: "Sài Gòn",           km: "320-360 km", hours: "≈ 7 giờ",   price: { 4: 2500000, 7: 2700000 }, photo: "img/dest-saigon.jpg", img: "img/dest-saigon.svg",
      note: "Tuyến dài nhất, khởi hành sớm hoặc chạy đêm theo yêu cầu." }
  ],

  /* Năm giá trị trong slogan của Thiên Phú, mỗi giá trị kèm một cam kết cụ thể. */
  values: [
    { title: "An toàn",   text: "Xe đăng kiểm, bảo hiểm hành khách đầy đủ. Tài xế không chạy ẩu, không nghe máy khi đang lái." },
    { title: "Uy tín",    text: "Chạy tuyến từ 2011. Giá chốt trước khi lên xe, không phát sinh dọc đường." },
    { title: "Vui vẻ",    text: "Tài xế thân thiện, biết chỗ ăn ngon và điểm dừng đẹp để gợi ý cho bạn." },
    { title: "Chu đáo",   text: "Có nước suối, khăn lạnh trên xe. Nhắc giờ, gọi trước khi tới đón." },
    { title: "Tận tình",  text: "Hỗ trợ hành lý, chờ khi bạn muốn dừng chụp hình hay ghé mua đặc sản." }
  ],

  /* Trang giới thiệu: vì sao khách chọn Thiên Phú. */
  why: [
    { title: "Xe đời mới, sạch sẽ", text: "Bảo dưỡng định kỳ, đăng kiểm và bảo hiểm hành khách đầy đủ. Lên xe là máy lạnh đã mát." },
    { title: "Tài xế quen đường", text: "Chạy đèo Khánh Lê, đèo Cả và đường ven biển từ 2011. Biết chỗ dừng đẹp, quán ăn ngon để gợi ý." },
    { title: "Đúng giờ, hỗ trợ 24/7", text: "Gọi trước 15 phút khi sắp tới đón. Máy bay trễ vẫn chờ, nửa đêm gọi vẫn có người nghe." },
    { title: "Giá minh bạch", text: "Giá niêm yết trên web, chốt trước khi lên xe. Không phát sinh dọc đường, không phí ẩn." },
    { title: "Linh hoạt theo lịch của bạn", text: "Muốn đi sớm, chạy đêm, ghé thêm điểm hay dừng chụp hình đều sắp xếp được." },
    { title: "Chu đáo từng chuyến", text: "Nước suối, khăn lạnh sẵn trên xe. Hỗ trợ hành lý, trẻ nhỏ và người lớn tuổi." }
  ],

  /* Trang liên hệ: các dịch vụ chính đang nhận. */
  services: [
    { title: "Đưa đón sân bay Cam Ranh", text: "Đón tận cổng đến, trả tận khách sạn. Theo dõi giờ bay, trễ không tính thêm phí chờ." },
    { title: "Nha Trang đi Đà Lạt và các tỉnh", text: "Phan Rang, Tuy Hòa, Phan Thiết, Quy Nhơn, Vũng Tàu, Sài Gòn. Một chiều hoặc khứ hồi." },
    { title: "Tour Nha Trang trong ngày", text: "Xe riêng đi Vĩnh Hy, Bãi Dài, Dốc Lết, Ba Hồ hoặc tự chọn điểm, tài xế chờ cả ngày." },
    { title: "Xe nhiều ngày, ở lại phục vụ", text: "Đi 2 đến 5 ngày quanh Đà Lạt, Phan Thiết hay dọc biển, xe và tài xế theo suốt chuyến." },
    { title: "Đưa đón đoàn công ty", text: "Xe 7 và 16 chỗ cho đoàn nghỉ mát, hội nghị, team building. Xuất hóa đơn đầy đủ." },
    { title: "Xe một chiều liên tỉnh", text: "Chỉ cần đi một chiều, trả giá một chiều. Không ghép khách, không chờ gom chuyến." }
  ],

  /* Đánh giá mẫu. Thay bằng lời khách thật trước khi chạy quảng cáo. */
  quotes: [
    { name: "Chị Minh Thư", where: "Nha Trang đi Đà Lạt", initial: "T",
      text: "Đặt tối hôm trước, sáng sớm anh tài đã đứng trước khách sạn. Đèo Khánh Lê sương mù mà xe chạy rất chắc, hai bé ngủ một mạch tới Đà Lạt." },
    { name: "Anh Hoàng Nam", where: "Đón sân bay Cam Ranh", initial: "N",
      text: "Máy bay trễ hơn một tiếng, tài xế vẫn canh và nhắn tin trước. Ra cổng là có xe, giá đúng như đã báo qua Zalo." },
    { name: "Nhóm bạn của Lan", where: "Nha Trang đi Quy Nhơn", initial: "L",
      text: "Sáu người lấy xe 7 chỗ, dọc đường muốn ghé Eo Gió chụp hình, anh tài chờ thoải mái không hối. Tính ra rẻ hơn đi từng chặng." }
  ],

  faq: [
    { q: "Đặt xe trước bao lâu?",
      a: "Trước một ngày là chắc chắn có xe. Đặt trong ngày vẫn xếp được nếu xe rảnh, bạn cứ gọi hotline để kiểm tra ngay." },
    { q: "Giá đã gồm những gì?",
      a: "Giá trọn xe đã gồm xăng, phí cầu đường và tài xế cho một chiều. Không gồm phí gửi xe ở điểm bạn yêu cầu dừng. Khứ hồi hoặc đi nhiều điểm sẽ báo giá riêng, thường rẻ hơn cộng từng chặng." },
    { q: "Có ghép khách không?",
      a: "Không. Xe bạn đặt là xe riêng, chạy giờ bạn chọn, không chờ gom khách." },
    { q: "Đón sân bay, máy bay trễ thì sao?",
      a: "Bạn gửi số chuyến bay khi đặt. Tài xế theo dõi giờ hạ cánh và chờ tại cổng, không tính thêm phí chờ." },
    { q: "Đổi hoặc hủy chuyến thế nào?",
      a: "Báo trước 12 giờ so với giờ khởi hành là không mất phí. Chỉ cần nhắn Zalo hoặc gọi." },
    { q: "Có xuất hóa đơn không?",
      a: "Có, cho khách công tác hoặc công ty. Nhắn trước khi đi để bên mình chuẩn bị." }
  ]
};
