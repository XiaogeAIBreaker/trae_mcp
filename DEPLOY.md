# 🚀 GitHub Pages 部署指南

## 📋 部署步骤

### 方法1：使用GitHub Actions（推荐）

1. **启用GitHub Pages**
   - 进入仓库设置 → Pages
   - 选择 "Deploy from a branch"
   - 选择 "GitHub Actions"

2. **推送代码**
   ```bash
   git add .
   git commit -m "feat: 配置GitHub Pages部署"
   git push origin main
   ```

3. **自动部署**
   - GitHub Actions会自动运行部署流程
   - 部署完成后访问：https://XiaogeAIBreaker.github.io/trae_mcp

### 方法2：使用gh-pages分支

1. **安装gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **构建并部署**
   ```bash
   npm run deploy
   ```

3. **设置GitHub Pages**
   - 进入仓库设置 → Pages
   - 选择 "Deploy from a branch"
   - 选择 "gh-pages" 分支
   - 保存后访问：https://XiaogeAIBreaker.github.io/trae_mcp

## 🔧 配置文件说明

### package.json 关键配置
```json
{
  "homepage": "https://XiaogeAIBreaker.github.io/trae_mcp",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### vite.config.js 配置
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/trae_mcp/',  // 重要：匹配仓库名
  build: {
    outDir: 'dist'
  }
})
```

### GitHub Actions 工作流
文件位置：`.github/workflows/deploy.yml`
- 自动触发：push到main分支
- 构建React应用
- 部署到GitHub Pages

## 🌐 访问地址

**生产环境**：https://XiaogeAIBreaker.github.io/trae_mcp

## 📱 测试部署

### 本地测试
```bash
npm run build
npm run preview
```

### 检查构建结果
- 确保dist目录包含index.html
- 确保静态资源路径正确

## 🚨 常见问题解决

### 1. 空白页面
- 检查浏览器控制台错误
- 确认base路径设置正确
- 检查网络请求是否404

### 2. 样式不加载
- 检查CSS文件路径
- 确认vite.config.js中base配置

### 3. 路由问题
- 由于是单页应用，确保使用hash路由或正确配置

## 🔄 更新部署

每次更新代码后：
```bash
# 推送到main分支（GitHub Actions会自动部署）
git add .
git commit -m "更新功能描述"
git push origin main

# 或使用gh-pages手动部署
npm run deploy
```

## 📊 部署状态检查

1. **GitHub Actions**：查看Actions标签页
2. **Pages状态**：仓库设置 → Pages
3. **访问测试**：使用不同设备测试响应式效果