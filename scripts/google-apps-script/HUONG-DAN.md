# Nối form đặt xe với Google Sheet + email

Form trên web gửi dữ liệu lên một Google Apps Script Web App (giống cách làm bên YOKO).
Script ghi vào Google Sheet và gửi email về **Phanson25042102@gmail.com**.

## Các bước (làm 1 lần, khoảng 5 phút)

1. Đăng nhập Google bằng tài khoản sẽ nhận yêu cầu (nên dùng chính Phanson25042102@gmail.com).
2. Vào https://sheets.new tạo Sheet mới, đặt tên ví dụ `Thien Phu - Yeu cau dat xe`.
3. Trong Sheet: menu **Tiện ích mở rộng → Apps Script**.
4. Xóa nội dung mặc định, dán toàn bộ file `Code.gs` vào, bấm **Lưu**.
5. Chọn hàm `testSend` ở thanh trên, bấm **Chạy**. Google hỏi cấp quyền → Cho phép
   (chọn "Nâng cao → Đi tới dự án (không an toàn)" nếu có cảnh báo, vì script là của chính mình).
   Kiểm tra: Sheet có 1 dòng mới và email nhận được thư "[Đặt xe] Khách thử".
6. Bấm **Triển khai → Tùy chọn triển khai mới**:
   - Loại: **Ứng dụng web**
   - Thực thi với tư cách: **Tôi**
   - Ai có quyền truy cập: **Bất kỳ ai**
   - Bấm Triển khai, copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
7. Mở `js/content.js`, dán URL vào `brand.formUrl`:
   ```js
   formUrl: "https://script.google.com/macros/s/XXXX/exec",
   ```
8. Commit + push. Vào web, gửi thử 1 yêu cầu, kiểm tra Sheet và email.

## Sửa script về sau

Mỗi lần sửa `Code.gs` phải **Triển khai → Quản lý triển khai → sửa → Phiên bản mới**
thì URL cũ mới nhận code mới. URL không đổi.

## Đổi email nhận

Sửa dòng `var MAIL_TO = "..."` trong `Code.gs` rồi triển khai phiên bản mới.
Muốn gửi nhiều người: `"a@gmail.com,b@gmail.com"`.
