# 安全配置说明

## 当前配置的安全问题

原始配置存在以下安全问题：

1. **数据库密码明文存储** - 密码直接写在配置文件中
2. **使用 root 用户** - 权限过大
3. **禁用 SSL 连接** - 数据传输不加密

## 安全改进方案

### 1. 使用环境变量

将敏感信息移到环境变量中：

```bash
# 复制示例文件
cp env.example .env

# 编辑 .env 文件，设置真实的密码
DB_PASSWORD=your_actual_secure_password
```

### 2. 创建专用数据库用户

```sql
-- 创建专用用户
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- 只授予必要权限
GRANT SELECT, INSERT, UPDATE, DELETE ON blogdb.* TO 'blog_user'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;
```

### 3. 启用 SSL 连接

确保 `DB_USE_SSL=true`，这样数据库连接会使用加密传输。

### 4. 生产环境建议

- 使用强密码（至少 12 位，包含大小写字母、数字、特殊字符）
- 定期更换密码
- 使用数据库连接池
- 启用数据库审计日志
- 考虑使用密钥管理服务（如 AWS KMS、Azure Key Vault）

### 5. 开发环境

开发时可以使用：

```bash
export DB_PASSWORD=dev_password
```

但不要将真实密码提交到版本控制系统。
