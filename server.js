const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

// Middleware để tạo Nonce ngẫu nhiên cho mỗi request
app.use((req, res, next) => {
    // Tạo chuỗi ngẫu nhiên 16 bytes format base64
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

// 1. TRANG CHỦ (Menu)
app.get('/', (req, res) => {
    res.send(`
        <h1>Demo Content Security Policy (CSP) Advanced</h1>
        <ul>
            <li><a href="/nonce-demo">Demo 1: Sử dụng NONCE (Dynamic)</a></li>
            <li><a href="/hash-demo">Demo 2: Sử dụng HASH (Static)</a></li>
        </ul>
    `);
});

// 2. DEMO NONCE (Thường dùng cho Server Side Rendering)
app.get('/nonce-demo', (req, res) => {
    const nonce = res.locals.nonce;

    // Cấu hình Header CSP
    // script-src 'nonce-...' -> Chỉ chạy script có thuộc tính nonce khớp với header
    res.setHeader(
        'Content-Security-Policy', 
        `script-src 'self' 'nonce-${nonce}'`
    );

    res.send(`
        <h1>Demo CSP: Nonce Strategy</h1>
        <p>Nonce hiện tại: <strong>${nonce}</strong></p>
        <hr>

        <h3>1. Script Hợp lệ:</h3>
        <script nonce="${nonce}">
            document.write("<p style='color:green'>✅ Script này chạy được vì có Nonce khớp!</p>");
            console.log("Nonce Script executed");
        </script>

        <h3>2. Giả lập tấn công XSS (Inline Script):</h3>
        <script>
            alert("Nếu bạn thấy thông báo này, CSP đã thất bại!");
            document.write("<p style='color:red'>❌ Script này chạy được (LỖI CSP)</p>");
        </script>
        
        <p><em>Hãy mở F12 (Console) để xem trình duyệt chặn script thứ 2 như thế nào.</em></p>
        <a href="/">Quay lại</a>
    `);
});

// 3. DEMO HASH (Thường dùng cho Static Site hoặc SPA)
app.get('/hash-demo', (req, res) => {
    // Nội dung script chúng ta muốn cho phép
    const allowedScript = `console.log('Hello from Hashed Script'); alert('Hash Script Works!');`;
    
    // Tính toán Hash SHA256 của đoạn script trên
    // Lưu ý: Trong thực tế, bạn dùng tool để tính trước, không tính mỗi request như này
    const hash = crypto.createHash('sha256').update(allowedScript).digest('base64');

    // Cấu hình Header CSP
    // script-src 'sha256-...' -> Chỉ chạy script có nội dung khớp hoàn toàn với hash này
    res.setHeader(
        'Content-Security-Policy', 
        `script-src 'self' 'sha256-${hash}'`
    );

    res.send(`
        <h1>Demo CSP: Hash Strategy</h1>
        <p>Hash được allow: <strong>sha256-${hash}</strong></p>
        <hr>

        <h3>1. Script đúng Hash:</h3>
        <script>${allowedScript}</script>
        <p style='color:green'>✅ Nếu Alert hiện lên, script hash đã chạy.</p>

        <h3>2. Script bị sửa đổi (Sai Hash):</h3>
        <script>
            console.log('Hello from Hashed Script'); 
            alert('Hacked!'); // Dòng này làm thay đổi hash
        </script>
        <p><em>Script thứ 2 bị chặn vì nội dung không khớp với hash trong Header.</em></p>

        <a href="/">Quay lại</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});