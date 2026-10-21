/**
 * Thiên Phú Travel — nhận yêu cầu đặt xe từ website.
 * Ghi mỗi yêu cầu vào Google Sheet và gửi email thông báo.
 *
 * Triển khai: xem HUONG-DAN.md cùng thư mục.
 */

var MAIL_TO = "Phanson25042102@gmail.com";
var SHEET_NAME = "Yeu cau";
var COLUMNS = [
  ["time", "Thời gian"], ["name", "Tên"], ["phone", "SĐT"], ["route", "Tuyến"],
  ["car", "Xe"], ["trip", "Loại hình"], ["date", "Ngày đi"], ["timePick", "Giờ đón"],
  ["pax", "Số khách"], ["pickup", "Điểm đón"], ["price", "Giá web"], ["note", "Ghi chú"],
  ["via", "Gửi qua"], ["source", "Trang"],
  ["utm_source", "UTM source"], ["utm_medium", "UTM medium"], ["utm_campaign", "UTM campaign"],
  ["utm_content", "UTM content"], ["fbclid", "fbclid"], ["gclid", "gclid"]
];

/** Kiểm tra nhanh: mở URL /exec trên trình duyệt phải thấy dòng này. */
function doGet() {
  return ContentService.createTextOutput("Thiên Phú Travel form OK");
}

/** Website POST JSON (Content-Type text/plain) vào đây. */
function doPost(e) {
  var data = parseBody(e);
  if (!data.phone && !data.name) {
    return json({ ok: false, error: "Thiếu dữ liệu" });
  }
  var row = toRow(data);
  appendRow(row);
  sendMail(data, row);
  return json({ ok: true });
}

function parseBody(e) {
  try {
    return JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return {};
  }
}

function toRow(data) {
  return COLUMNS.map(function (c) { return String(data[c[0]] || ""); });
}

function appendRow(row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
}

function sendMail(data, row) {
  var subject = "[Đặt xe] " + (data.name || "Khách") + " - " + (data.route || "") +
    " - " + (data.date || "");
  var lines = COLUMNS.map(function (c, i) {
    return "<tr><td style=\"padding:4px 10px;color:#666\">" + c[1] + "</td><td style=\"padding:4px 10px\"><b>" + escapeHtml(row[i]) + "</b></td></tr>";
  });
  var html = "<p>Có yêu cầu đặt xe mới từ website Thiên Phú Travel:</p>" +
    "<table style=\"border-collapse:collapse;font-family:sans-serif\">" + lines.join("") + "</table>" +
    (data.message ? "<p style=\"color:#666\">Tin nhắn khách soạn: " + escapeHtml(data.message) + "</p>" : "") +
    "<p><a href=\"tel:" + escapeHtml(data.phone || "") + "\">Gọi lại khách</a></p>";
  MailApp.sendEmail({ to: MAIL_TO, subject: subject, htmlBody: html, name: "Website Thiên Phú Travel" });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy tay 1 lần trong trình soạn thảo để cấp quyền Sheet + Gmail và thử gửi mail. */
function testSend() {
  var sample = { time: new Date().toLocaleString("vi-VN"), name: "Khách thử", phone: "0912345678",
    route: "Đà Lạt", car: "Xe 7 chỗ", trip: "một chiều", date: "2026-11-01", timePick: "08:00",
    pax: "4", pickup: "KS Mường Thanh", price: "1.000.000 ₫", note: "Thử hệ thống", via: "test", source: "test" };
  appendRow(toRow(sample));
  sendMail(sample, toRow(sample));
}
