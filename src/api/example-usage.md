# API Error Handling Examples

Hệ thống xử lý lỗi hỗ trợ nhiều format response khác nhau từ server.

## Các loại Response được hỗ trợ

### 1. Response với status và message trong body (Ưu tiên cao nhất)

```json
{
  "status": 404,
  "message": "Expense not found"
}
```

**Kết quả**: Hiển thị thông báo "Expense not found"

### 2. Response chỉ có message trong body

```json
{
  "message": "Invalid expense data"
}
```

**Kết quả**: Hiển thị thông báo "Invalid expense data" với HTTP status code

### 3. Response chỉ có HTTP status code

```http
HTTP/1.1 404 Not Found
```

**Kết quả**: Hiển thị thông báo mặc định cho 404 "Resource not found"

## Ví dụ sử dụng

### Trường hợp 1: Expense không tồn tại
```javascript
// API call
const response = await get('/api/expenses/999');

// Server response
{
  "status": 404,
  "message": "Expense with ID 999 not found"
}

// Hiển thị toast: "Expense with ID 999 not found"
```

### Trường hợp 2: Dữ liệu không hợp lệ
```javascript
// API call
const response = await post('/api/expenses', invalidData);

// Server response
{
  "status": 422,
  "message": "Amount must be greater than 0"
}

// Hiển thị toast: "Amount must be greater than 0"
```

### Trường hợp 3: Lỗi server
```javascript
// API call
const response = await get('/api/expenses');

// Server response
HTTP/1.1 500 Internal Server Error

// Hiển thị toast: "Internal server error. Please try again later or contact support."
```

## Logic xử lý

1. **Kiểm tra response body** có chứa `status` và `message` không
2. **Nếu có**: Sử dụng status và message từ body
3. **Nếu chỉ có message**: Sử dụng HTTP status + message từ body
4. **Fallback**: Sử dụng HTTP status code với thông báo mặc định

## Lợi ích

- **Linh hoạt**: Hỗ trợ nhiều format response khác nhau
- **Chi tiết**: Hiển thị thông báo lỗi cụ thể từ server
- **Fallback**: Luôn có thông báo mặc định nếu server không trả về message
- **Đa ngôn ngữ**: Tất cả thông báo đều hỗ trợ i18n 