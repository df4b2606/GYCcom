# Article API Documentation

## 接口名称

文章管理相关接口，包括文章的增删改查、分类查询、标签查询以及点赞功能。

---

## 接口地址

基础路径：`/article`

---

## 请求方式

支持 GET 和 POST 两种方式

---

## 功能说明

文章模块提供以下功能：
- 发布文章
- 获取文章列表
- 根据ID或短链接获取文章
- 根据分类获取文章
- 根据标签获取文章
- 文章点赞功能（支持点赞/取消点赞）
- 获取文章点赞数量
- 查询设备是否已点赞

---

## 接口详情

### 1. 发布文章

**接口地址**：`POST /article`

**请求方式**：POST

**功能说明**：发布新文章

**请求参数示例**：
```json
{
  "title": "文章标题",
  "content": "文章内容",
  "categoryId": 1,
  "tagNames": ["技术", "Java"]
}
```

**返回参数示例**：
```json
{
  "id": 1,
  "title": "文章标题",
  "content": "文章内容",
  "category": {...},
  "tags": [...],
  "createTime": "2024-01-01T00:00:00"
}
```

### 2. 获取所有文章

**接口地址**：`GET /article`

**请求方式**：GET

**功能说明**：获取所有文章列表

**返回参数示例**：
```json
[
  {
    "id": 1,
    "title": "文章标题",
    "content": "文章内容",
    "category": {...},
    "tags": [...],
    "createTime": "2024-01-01T00:00:00"
  }
]
```

### 3. 根据ID获取文章

**接口地址**：`GET /article/{id}`

**请求方式**：GET

**功能说明**：根据文章ID获取文章详情

**路径参数**：
- `id`: 文章ID

**返回参数示例**：
```json
{
  "id": 1,
  "title": "文章标题",
  "content": "文章内容",
  "category": {...},
  "tags": [...],
  "createTime": "2024-01-01T00:00:00"
}
```

### 4. 根据短链接获取文章

**接口地址**：`GET /article/slug/{shortUrl}`

**请求方式**：GET

**功能说明**：根据文章短链接获取文章详情

**路径参数**：
- `shortUrl`: 文章短链接

**返回参数示例**：
```json
{
  "id": 1,
  "title": "文章标题",
  "content": "文章内容",
  "category": {...},
  "tags": [...],
  "createTime": "2024-01-01T00:00:00"
}
```

### 5. 根据分类获取文章

**接口地址**：`GET /article/category/{categoryId}`

**请求方式**：GET

**功能说明**：根据分类ID获取该分类下的所有文章

**路径参数**：
- `categoryId`: 分类ID

**返回参数示例**：
```json
[
  {
    "id": 1,
    "title": "文章标题",
    "content": "文章内容",
    "category": {...},
    "tags": [...],
    "createTime": "2024-01-01T00:00:00"
  }
]
```

### 6. 根据标签获取文章

**接口地址**：`GET /article/tags`

**请求方式**：GET

**功能说明**：根据标签名称获取包含任一标签的文章（OR查询）

**查询参数**：
- `tags`: 标签名称列表，支持重复参数或CSV格式

**请求示例**：
```
GET /article/tags?tags=技术&tags=Java
GET /article/tags?tags=技术,Java
```

**返回参数示例**：
```json
[
  {
    "id": 1,
    "title": "文章标题",
    "content": "文章内容",
    "category": {...},
    "tags": [...],
    "createTime": "2024-01-01T00:00:00"
  }
]
```

### 7. 文章点赞/取消点赞

**接口地址**：`POST /article/like`

**请求方式**：POST

**功能说明**：切换文章的点赞状态，如果已点赞则取消点赞，如果未点赞则点赞

**请求参数示例**：
```json
{
  "articleId": 1,
  "deviceId": "device_123456"
}
```

**返回参数示例**：
```json
{
  "articleId": 1,
  "deviceId": "device_123456",
  "isLiked": true,
  "likeCount": 42,
  "message": "Successfully liked the article"
}
```

### 8. 获取文章点赞数量

**接口地址**：`GET /article/{articleId}/like/count`

**请求方式**：GET

**功能说明**：获取指定文章的点赞总数

**路径参数**：
- `articleId`: 文章ID

**返回参数示例**：
```json
42
```

### 9. 查询设备是否已点赞

**接口地址**：`GET /article/{articleId}/like/status`

**请求方式**：GET

**功能说明**：查询指定设备是否已点赞指定文章

**路径参数**：
- `articleId`: 文章ID

**查询参数**：
- `deviceId`: 设备ID

**请求示例**：
```
GET /article/1/like/status?deviceId=device_123456
```

**返回参数示例**：
```json
true
```

---

## 技术实现说明

### 点赞功能设计

点赞功能使用Redis实现，具有以下特点：

1. **原子性操作**：使用Lua脚本确保点赞操作的原子性
2. **设备识别**：使用设备ID识别用户（可后续升级为用户ID）
3. **自动去重**：Redis Set结构自动防止同一设备重复点赞
4. **实时计数**：点赞数量实时更新，支持高并发访问

### 数据存储结构

- `like:art:{articleId}`: 存储点赞该文章的设备ID集合（Set类型）
- `like:cnt:{articleId}`: 存储文章点赞总数（String类型）

### 业务逻辑

1. 前端点击点赞按钮时调用 `/article/like` 接口
2. 后端执行Lua脚本，根据设备ID是否已存在决定点赞或取消点赞
3. 返回操作结果和最新的点赞数量
4. 前端根据返回结果更新UI状态
