/* ==========================================================================
   content.js — Toàn bộ nội dung của landing page nằm ở đây.
   Muốn sửa tuyến, giá, đánh giá, câu hỏi → sửa trong file này, không cần
   đụng tới index.html hay app.js.

   GIÁ LÀ GIÁ DEMO. Thay bằng giá thật của bạn trước khi chạy quảng cáo.
   Số điện thoại trong index.html hiện là số giả: 0900 000 000.
   ========================================================================== */

window.XDV_CONTENT = {

  /* ---------------------------------------------------------------------
     5 tuyến đang khai thác.
       id        : mã dùng nội bộ, không hiển thị
       name      : tên tuyến hiển thị
       from/to   : điểm đầu và điểm cuối (hiển thị trên card)
       km        : quãng đường, đơn vị km
       duration  : thời gian chạy dự kiến
       depart    : các khung giờ khởi hành thường ngày
       note      : một câu mô tả ngắn cho khách
       price     : { 4, 7, 16 } giá trọn xe theo số chỗ (VND)
       featured  : true = ghim lên đầu danh sách
     --------------------------------------------------------------------- */
  routes: [
    {
      id: "sgn-nt",
      name: "Sài Gòn – Nha Trang",
      from: "TP. Hồ Chí Minh",
      to: "Nha Trang",
      km: 440,
      duration: "≈ 7 giờ",
      depart: ["05:00", "08:00", "20:00"],
      note: "Tuyến dài nhất, chạy cao tốc. Khởi hành tối là ngủ một giấc tới Nha Trang sáng sớm.",
      price: { 4: 3300000, 7: 3900000, 16: 5200000 },
      featured: true
    },
    {
      id: "sgn-dl",
      name: "Sài Gòn – Đà Lạt",
      from: "TP. Hồ Chí Minh",
      to: "Đà Lạt",
      km: 300,
      duration: "≈ 6 giờ",
      depart: ["04:00", "07:00", "13:00"],
      note: "Đèo dốc nhiều, xe đời mới chạy êm hơn. Khởi hành sớm cho kịp ăn sáng ở Đà Lạt.",
      price: { 4: 2600000, 7: 3100000, 16: 4200000 },
      featured: true
    },
    {
      id: "nt-dl",
      name: "Nha Trang – Đà Lạt",
      from: "Nha Trang",
      to: "Đà Lạt",
      km: 135,
      duration: "≈ 3,5 giờ",
      depart: ["06:00", "09:00", "14:00"],
      note: "Chặng ngắn, hay được ghép với tua nghỉ dưỡng. Đi sáng thì chiều tới nơi kịp dạo chợ đêm.",
      price: { 4: 1400000, 7: 1700000, 16: 2300000 },
      featured: true
    },
    {
      id: "nt-pr-vh",
      name: "Nha Trang – Phan Rang – Vĩnh Hy",
      from: "Nha Trang",
      to: "Phan Rang · Vĩnh Hy",
      km: 110,
      duration: "≈ 2,5 giờ",
      depart: ["07:00", "13:00"],
      note: "Ghé Vĩnh Hy ngắm vịnh rồi vào Phan Rang. Có thể dừng chụp hình vườn nho dọc đường.",
      price: { 4: 1350000, 7: 1600000, 16: 2100000 },
      featured: false
    },
    {
      id: "nt-qn",
      name: "Nha Trang – Quy Nhơn",
      from: "Nha Trang",
      to: "Quy Nhơn",
      km: 220,
      duration: "≈ 4 giờ",
      depart: ["06:00", "12:00"],
      note: "Đi men biển, đường đẹp. Dừng ăn ở Đại Lãnh được nếu bạn muốn.",
      price: { 4: 2100000, 7: 2500000, 16: 3300000 },
      featured: false
    }
  ],

  /* ---------------------------------------------------------------------
     Đánh giá khách hàng. Tên và nội dung là ví dụ — thay bằng đánh giá thật
     của khách (hoặc giữ nếu đây chỉ là bản demo trình bày).
     initial : chữ cái đầu, dùng làm avatar
     --------------------------------------------------------------------- */
  quotes: [
    {
      name: "Chị Thu Hà",
      where: "Sài Gòn → Nha Trang",
      initial: "H",
      text: "Đặt tối hôm trước, sáng sớm tài xế đã có mặt trước nhà. Xe sạch, máy lạnh mát, chạy êm tới mức hai đứa nhỏ ngủ một mạch. Giá đúng như lúc báo."
    },
    {
      name: "Anh Quốc Bảo",
      where: "Nha Trang → Đà Lạt",
      initial: "B",
      text: "Mình đi ghép với bạn, sợ đèo nên đặt xe riêng. Tài xế quen đường, chạy rất chắc tay, dừng cho chụp hình ở đèo Ngoạn Mục luôn. Đáng tiền."
    },
    {
      name: "Nhóm bạn của Linh",
      where: "Nha Trang → Vĩnh Hy",
      initial: "L",
      text: "6 người nên lấy xe 7 chỗ. Tụi mình muốn ghé vườn nho chụp hình, tài xế chờ thoải mái không hối. Tính ra rẻ hơn đi từng chặng."
    }
  ],

  /* ---------------------------------------------------------------------
     Ba bước đặt xe
     --------------------------------------------------------------------- */
  steps: [
    {
      title: "Điền thông tin",
      text: "Chọn tuyến, loại xe, ngày giờ và để lại số điện thoại. Mất chưa tới một phút."
    },
    {
      title: "Chúng tôi gọi xác nhận",
      text: "Gọi lại chốt giá, giờ đón và điểm hẹn cụ thể. Bạn đồng ý rồi mới coi như đặt xong."
    },
    {
      title: "Tài xế đón tận nơi",
      text: "Đúng giờ đã hẹn, tài xế gọi trước khi tới. Lên xe là đi, không cần làm gì thêm."
    }
  ],

  /* ---------------------------------------------------------------------
     Câu hỏi thường gặp
     --------------------------------------------------------------------- */
  faq: [
    {
      q: "Đặt xe trước bao lâu là được?",
      a: "Thường đặt trước một ngày là đủ. Nhưng nhận được trong ngày vẫn xếp được nếu còn xe — cứ gọi hotline để kiểm tra ngay."
    },
    {
      q: "Giá đã bao gồm những gì?",
      a: "Giá đã gồm xăng, phí cầu đường và tiền tài xế cho trọn tuyến. Không gồm phí gửi xe ở điểm bạn yêu cầu dừng, và phí đón/trả ở khu vực xa trung tâm — những khoản này sẽ báo trước nếu có."
    },
    {
      q: "Có đi ghép chung với khách khác không?",
      a: "Không. Xe bạn đặt là xe riêng cho đoàn của bạn, chạy đúng giờ bạn muốn. Không gom khách, không chờ đủ người."
    },
    {
      q: "Đón ở sân bay thì thế nào?",
      a: "Tài xế theo dõi số chuyến bay, nên máy bay trễ vẫn chờ. Bạn gửi số chuyến bay khi đặt để tài xế canh đúng giờ ra cổng."
    },
    {
      q: "Đi nhiều điểm trong ngày có được không?",
      a: "Được. Ghép nhiều điểm hoặc khứ hồi trong ngày thường rẻ hơn tính từng chặng riêng. Ghi rõ trong phần ghi chú khi đặt, hoặc gọi để báo giá."
    },
    {
      q: "Đổi hoặc hủy chuyến thì sao?",
      a: "Đổi hoặc hủy trước 12 giờ so với giờ khởi hành thì không mất phí. Báo sớm để bên mình kịp xếp xe khác cho khách khác."
    },
    {
      q: "Có xuất hóa đơn không?",
      a: "Có, cho khách đi công tác hoặc công ty. Nhắn trước khi đi để bên mình chuẩn bị."
    }
  ]
};
