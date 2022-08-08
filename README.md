### 1.About
## Website quản lý phòng khám , các chuyên khoa, bác sĩ

KẾT NỐI BACKEND VỚI DATABASE:

Trong file **config.json** : phần sẽ sử dụng là ở development , 
chỉnh sửa phần database muốn chọn
(ở đây ví dụ lựa chọn db name hocvu) 
![view](res/data_config.png)

đồng thời sử dụng áp đặt sequelize để kết nối db (chỉnh ở trang **connectDB.js** )
![view](res/sequelize.png)



**HOÀN THÀNH KÊT NỐI XONG thực hiện khởi tạo các bảng sử dụng lệnh terminal**
```
-npx sequelize-cli db:migrate
``` 
** ở đây em kết nối db bằng xampp**

## Lập bảng giá trị cho bảng Allcodes trên db có sẵn với dữ liệu sau:
```
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('TIME','T8','4:00 PM - 5:00 PM', '16:00 - 17:00' );										
										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('POSITION','P0','None', 'Bác sĩ' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('POSITION','P1','Master', 'Thạc sĩ' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('POSITION','P2','Doctor', 'Tiến sĩ' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('POSITION','P3','Associate Professor', 'Phó giáo sư' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('POSITION','P4','Professor', 'Giáo sư' );										
										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('GENDER','M','Male', 'Nam' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('GENDER','F','Female', 'Nữ' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('GENDER','O','Other', 'Khác' );										
										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI1','10', '200000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI2','15', '250000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI3','20', '300000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI4','25', '350000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI5','30', '400000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI6','35', '450000' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PRICE','PRI7','40', '500000' );										
										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PAYMENT','PAY1','Cash', 'Tiền mặt' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PAYMENT','PAY2','Credit card', 'Thẻ ATM' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PAYMENT','PAY3','All payment method', 'Tất cả' );										
										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO1','Ha Noi', 'Hà Nội' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO2','Ho Chi Minh', 'Hồ Chí Minh' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO3','Da Nang', 'Đà Nẵng' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO4','Can Tho', 'Cần Thơ' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO5','Binh Duong', 'Bình Dương' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO6','Dong Nai', 'Đồng Nai' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO7','Quang Ninh', 'Quảng Ninh' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO8','Hue', 'Thừa Thiên Huế' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO9','Quang Binh', 'Quảng Bình' );										
INSERT INTO ALLCODES (ALLCODES.type,ALLCODES.keyMap, ALLCODES.valueEN, ALLCODES.valueVI) values ('PROVINCE','PRO10','Khanh Hoa', 'Khánh Hòa' );
```

** Khởi động chương trình của front and back: **
```
-npm start 
```


### 2. Ngôn ngữ
- Programming language: JavaScript
-	Frontend: ReactJS
-	Backend: NodeJS-sử dụng kỹ thuật ORM sequelize
- Database: MySQL


### 3. Download
```
# Clone this repository
$ git clone: https://github.com/hoc2000/web_maxhealth.git
```
