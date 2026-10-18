# 16 prompt poster hoàn chỉnh (AI vẽ cả chữ)

Mỗi prompt tạo **một ảnh riêng**, không gộp collage. Trong Gemini chọn model tạo ảnh tốt nhất (Nano Banana Pro / 2.5 Flash Image).
Nếu chữ sai chính tả, nhắn tiếp: `Fix the spelling, the text must be exactly: "..."` rồi tạo lại.
Lưu vào thư mục `out-gemini/` đúng tên file, rồi chạy:

```
python3 scripts/tao-anh/compose.py out-gemini img --raw
```
(`--raw` = chỉ cắt đúng kích thước, không ghép thêm chữ.)

---

## 1. `hero` — Banner đầu trang (tỷ lệ 21:9)

```
Wide banner: a spotless white Toyota Vios sedan, a spotless white Toyota Fortuner 7-seat SUV and a spotless white Ford Transit 16-seat van parked in a row on a coastal boulevard in Nha Trang Vietnam, turquoise bay, beach, mountains and palm trees behind, bright morning. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "XE DỊCH VỤ DU LỊCH NHA TRANG – ĐÀ LẠT"; under it a smaller white line: "Xe 4 chỗ – 7 chỗ – 16 chỗ · Đón tận nơi · Giá niêm yết · Từ 2011"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 2. `car-4` — Xe 4 chỗ (tỷ lệ 16:9)

```
a spotless white Toyota Vios sedan parked on a seaside road in Nha Trang Vietnam, front three-quarter view, palm trees and turquoise sea behind. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "DỊCH VỤ CHO THUÊ XE 4 CHỖ"; under it a smaller white line: "Nha Trang – Đà Lạt – Cam Ranh – Phan Rang · Từ 300.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 3. `car-7` — Xe 7 chỗ (tỷ lệ 16:9)

```
a spotless white Toyota Fortuner 7-seat SUV parked at a viewpoint on the Khanh Le mountain pass between Nha Trang and Da Lat, pine forest and misty valley behind. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "DỊCH VỤ CHO THUÊ XE 7 CHỖ"; under it a smaller white line: "Gia đình, nhóm bạn · Hành lý rộng · Từ 350.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 4. `car-16` — Xe 16 chỗ (tỷ lệ 16:9)

```
a spotless white Ford Transit 16-seat van parked in front of a modern seaside hotel entrance in Nha Trang, luggage trolley nearby, palm trees. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "DỊCH VỤ CHO THUÊ XE 16 CHỖ"; under it a smaller white line: "Đoàn đông, công ty · Đón tiễn sân bay · Báo giá theo tuyến"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 5. `dest-dalat` — Đà Lạt (tỷ lệ 4:3)

```
a spotless white Toyota Fortuner 7-seat SUV on a pine-lined road arriving in Da Lat Vietnam at dawn, Xuan Huong lake with soft fog, the pink Domaine de Marie church, flower gardens. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – ĐÀ LẠT"; under it a smaller white line: "140 km · Xe 4 chỗ 900.000đ · Xe 7 chỗ 1.100.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 6. `dest-camranh` — Sân bay Cam Ranh (tỷ lệ 4:3)

```
a spotless white Toyota Vios sedan at the drop-off lane of Cam Ranh International Airport Vietnam, glass terminal, a passenger jet taking off over the turquoise bay. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "ĐƯA ĐÓN SÂN BAY CAM RANH"; under it a smaller white line: "35 km · Xe 4 chỗ 300.000đ · Xe 7 chỗ 350.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 7. `dest-phanrang` — Phan Rang (tỷ lệ 4:3)

```
a spotless white Toyota Fortuner 7-seat SUV on a road below the Po Klong Garai red-brick Cham towers on a sunlit hill in Phan Rang Vietnam, vineyards, deep blue sky. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – PHAN RANG"; under it a smaller white line: "120 km · Xe 4 chỗ 850.000đ · Xe 7 chỗ 950.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 8. `dest-tuyhoa` — Tuy Hòa (tỷ lệ 4:3)

```
a spotless white Toyota Vios sedan on a coastal road near Tuy Hoa Vietnam, Nhan Tower (ancient Cham tower) on a green hill, river bridge and the sea. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – TUY HÒA"; under it a smaller white line: "110 km · Xe 4 chỗ 850.000đ · Xe 7 chỗ 950.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 9. `dest-phanthiet` — Phan Thiết (tỷ lệ 4:3)

```
a spotless white Toyota Fortuner 7-seat SUV on a road beside the red sand dunes of Mui Ne, Phan Thiet Vietnam at sunset, round basket boats on the shore. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – PHAN THIẾT MŨI NÉ"; under it a smaller white line: "175 km · Xe 4 chỗ 1.300.000đ · Xe 7 chỗ 1.500.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 10. `dest-quynhon` — Quy Nhơn (tỷ lệ 4:3)

```
a spotless white Toyota Vios sedan on a cliffside road above Eo Gio and Ky Co beach near Quy Nhon Vietnam, rocky coast, white sand cove, emerald sea. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – QUY NHƠN"; under it a smaller white line: "260 km · Xe 4 chỗ 2.000.000đ · Xe 7 chỗ 2.200.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 11. `dest-vungtau` — Vũng Tàu (tỷ lệ 4:3)

```
a spotless white Toyota Fortuner 7-seat SUV on the beach boulevard of Vung Tau Vietnam, the Christ of Vung Tau statue with open arms on the mountain above, lighthouse, long beach. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – VŨNG TÀU"; under it a smaller white line: "340 km · Xe 4 chỗ 2.500.000đ · Xe 7 chỗ 2.700.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 12. `dest-saigon` — Sài Gòn (tỷ lệ 4:3)

```
a spotless white Toyota Fortuner 7-seat SUV on a riverside road with the Ho Chi Minh City skyline at blue hour, Landmark 81 and Bitexco towers lit up, reflections on the Saigon river. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "NHA TRANG – SÀI GÒN"; under it a smaller white line: "340 km · Xe 4 chỗ 2.500.000đ · Xe 7 chỗ 2.700.000đ"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 13. `gal-fleet` — Đội xe (tỷ lệ 16:9)

```
Five spotless white rental cars (Toyota Vios sedans, Toyota Fortuner SUVs and a Ford Transit van) parked in a diagonal row on a seaside promenade in Nha Trang, drone-height view, palm trees and blue sea. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "UY TÍN – AN TOÀN – 15 NĂM KINH NGHIỆM"; under it a smaller white line: "Đội xe đời mới · Bảo dưỡng định kỳ · Bảo hiểm hành khách"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 14. `gal-airport` — Đón sân bay (tỷ lệ 16:9)

```
A professional driver in a white shirt seen from behind opening the rear door of a spotless white Toyota Fortuner 7-seat SUV for passengers at an airport arrival curb, luggage on a trolley, warm light. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "ĐÓN TIỄN SÂN BAY 24/7"; under it a smaller white line: "Canh giờ bay · Chờ miễn phí khi máy bay trễ · Hỗ trợ hành lý"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 15. `gal-interior` — Nội thất (tỷ lệ 16:9)

```
Clean interior of a modern 7-seat SUV: beige leather seats, two chilled water bottles and cold towels in the center console, sunlight through the window showing a tropical beach outside. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "XE SẠCH – MÁY LẠNH – NƯỚC SUỐI, KHĂN LẠNH"; under it a smaller white line: "Chu đáo, tận tình trên từng chuyến đi"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```

## 16. `gal-dalat-road` — Đèo Khánh Lê (tỷ lệ 16:9)

```
a spotless white Toyota Vios sedan driving on the winding Khanh Le mountain pass with pine forests and clouds below, road from Nha Trang to Da Lat, aerial view, morning mist. Make it a finished Vietnamese car-rental advertising poster, like a professional Facebook ad. Layout: top-left a round emblem logo with a golden laurel wreath and a small white car icon, next to it the brand name "THIÊN PHÚ TRAVEL" in bold navy-blue letters and a small tagline "An toàn – Uy tín – Vui vẻ – Chu đáo – Tận tình"; a big bold white uppercase headline with a soft dark shadow: "15 NĂM CHẠY ĐÈO KHÁNH LÊ"; under it a smaller white line: "Tài xế quen đường · Chạy đúng giờ hẹn · Không ghép khách"; a golden-yellow strip across the bottom with a phone icon and the text "Hotline / Zalo / WhatsApp 24/7: 0964 559 794". Palette: deep navy, turquoise, golden yellow, white text. Glossy, sharp, high-end commercial photography. Spell every word exactly as given with correct Vietnamese diacritics. No other text, no watermark, no license plates, no visible faces.
```
