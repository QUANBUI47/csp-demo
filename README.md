# BÁO CÁO CHUYÊN ĐỀ: PHÁT TRIỂN PHẦN MỀM WEB AN TOÀN
## Đề tài: Content Security Policy Nâng cao (Nonce & Hash)

Dự án demo việc ngăn chặn tấn công XSS (Inline Script) bằng cách sử dụng Content Security Policy (CSP) với kỹ thuật Nonce và Hash SHA-256.

### 1. Danh sách thành viên nhóm
| STT | Họ và tên | Mã sinh viên | Lớp | Vai trò |
|:---:|:---|:---|:---|:---|
| 1 | **Bùi Anh Quân** | 22810310251 | D17CNPM6 | Trưởng nhóm (Dev & Report) |


### 2. Phân chia công việc
- **Bùi Anh Quân:**
  - Nghiên cứu lý thuyết về CSP, Nonce, Hash.
  - Xây dựng Web Server với Node.js & Express.
  - Viết mã nguồn demo chặn Inline Script.
  - Viết báo cáo và quay video demo.

### 3. Yêu cầu hệ thống & Cài đặt
**Yêu cầu:**
- Node.js (v14 trở lên)
- Trình duyệt Google Chrome (để kiểm tra Console Log)

### 4. Ảnh demo
# Nonce Demo:
<img width="1908" height="966" alt="Ảnh chụp màn hình 2025-12-09 120225" src="https://github.com/user-attachments/assets/569615b7-6301-4bca-8984-e3c4fdba5b75" />

# Hash Demo:
<img width="1910" height="968" alt="Ảnh chụp màn hình 2025-12-09 120414" src="https://github.com/user-attachments/assets/963a6563-0ba9-4e3b-8b59-18eee30c13f8" />

**Cài đặt:**
```bash
# 1. Clone dự án (nhánh production)
git clone -b production <LINK_GIT_CUA_BAN>

# 2. Di chuyển vào thư mục
cd <TEN_THU_MUC>

# 3. Cài đặt thư viện
npm install express crypto




