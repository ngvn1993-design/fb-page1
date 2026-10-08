# Facebook Poster - Windows Starter

Ứng dụng desktop mẫu để đăng bài lên Facebook Page thông qua Meta Graph API.

## Quan trọng
- Đây là bộ mã nguồn khởi đầu, không phải công cụ spam Facebook.
- Chỉ dùng với Page/tài khoản mà bạn có quyền quản lý và API permissions/token hợp lệ.
- Không lưu access token trong mã nguồn.
- Trước khi dùng thực tế, cần tạo Meta App và cấu hình quyền/API theo chính sách hiện hành của Meta.

## Build bằng GitHub
1. Tạo một GitHub repository mới.
2. Upload toàn bộ nội dung của ZIP này vào repository.
3. Vào **Actions**.
4. Chọn workflow **Build Windows**.
5. Bấm **Run workflow**.
6. Chờ workflow hoàn tất.
7. Vào run vừa build > **Artifacts** > tải `FacebookPoster-Windows`.
8. Giải nén artifact để lấy file `.exe`.

Workflow sử dụng GitHub-hosted Windows runner nên máy cá nhân không cần cài Node.js hay mở CMD.

## Chạy local
Cần Node.js 20+ nếu muốn chạy thử trực tiếp:
```bash
npm install
npm start
```

## Cấu trúc
- `app/` mã nguồn Electron
- `.github/workflows/build-windows.yml` workflow build Windows
- `package.json` cấu hình ứng dụng và electron-builder
