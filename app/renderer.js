const $ = (id) => document.getElementById(id);
const status = (text) => $("status").textContent = text;

let encryptedToken = localStorage.getItem("facebook_poster_token") || "";
if (encryptedToken) {
  $("token").placeholder = "Token đã được lưu an toàn";
}

$("save").addEventListener("click", async () => {
  const token = $("token").value.trim();
  if (!token) return status("Hãy nhập Page Access Token.");
  try {
    encryptedToken = await window.desktop.saveToken(token);
    localStorage.setItem("facebook_poster_token", encryptedToken);
    $("token").value = "";
    status("Đã lưu token bằng cơ chế mã hóa của hệ điều hành.");
  } catch (e) {
    status("Không thể lưu token: " + e.message);
  }
});

$("post").addEventListener("click", async () => {
  const pageId = $("pageId").value.trim();
  const message = $("message").value.trim();
  const link = $("link").value.trim();

  if (!pageId || !message) {
    return status("Cần Page ID và nội dung bài viết.");
  }

  let token = $("token").value.trim();
  if (!token && encryptedToken) {
    try {
      token = await window.desktop.readToken(encryptedToken);
    } catch (e) {
      return status("Không đọc được token đã lưu: " + e.message);
    }
  }

  if (!token) return status("Chưa có Page Access Token.");

  status("Đang gửi yêu cầu đến Meta Graph API...");

  try {
    const params = new URLSearchParams({ message, access_token: token });
    if (link) params.set("link", link);

    // Dùng Graph API endpoint /PAGE_ID/feed.
    // Phiên bản API được cấu hình tập trung để dễ cập nhật.
    const graphVersion = "v23.0";
    const response = await fetch(`https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pageId)}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error?.message || `HTTP ${response.status}`);
    }

    status("Đăng bài thành công.\nPost ID: " + (data.id || "không có ID trả về"));
  } catch (e) {
    status(
      "Đăng bài thất bại.\n\n" + e.message +
      "\n\nKiểm tra Page ID, Page Access Token, quyền API và phiên bản Graph API."
    );
  }
});
