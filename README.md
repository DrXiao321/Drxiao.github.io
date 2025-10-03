# 就业服务站求职招聘信息平台

一个完整的求职招聘信息平台，支持求职者和招聘者的功能。

## 功能特性

### 求职者功能
- 浏览职位列表
- 查看职位详情
- 投递简历
- 管理个人简历
- 查看申请记录

### 招聘者功能
- 发布单个职位
- **批量上传职位**（新增功能）
- 管理已发布职位
- 查看职位申请
- 管理公司信息

### 批量上传功能
- 支持Excel文件批量上传
- 提供标准模板下载
- 自动验证数据格式
- 批量处理结果反馈

## 技术栈

### 后端
- Node.js + Express
- MongoDB + Mongoose
- JWT认证
- 文件上传处理

### 前端
- Vue 3 + Composition API
- Vue Router + Vuex
- Element Plus UI组件库
- Vite构建工具

## 快速开始

### 环境要求
- Node.js 14+
- MongoDB 4+
- npm 或 yarn

### 安装和运行

1. **启动后端服务**
```bash
cd job-platform/backend
npm install
npm run dev
```

2. **启动前端服务**
```bash
cd job-platform/frontend
npm install
npm run dev
```

3. **访问应用**
- 前端地址：http://localhost:3002
- 后端API：http://localhost:5000

## 批量上传使用说明

### 1. 下载模板
在职位发布页面点击"下载模板"按钮，获取标准Excel模板。

### 2. 填写数据
按照模板格式填写职位信息：
- 职位名称、工作地点、薪资范围
- 工作类型、经验要求、学历要求
- 职位描述、职位要求
- 技能要求（用逗号分隔）
- 福利待遇（用逗号分隔）

### 3. 上传文件
- 选择填写好的Excel文件
- 点击"开始上传"
- 系统会自动验证并导入数据

### 4. 查看结果
上传成功后可以在"管理职位"页面查看批量导入的职位。

## API接口

### 认证相关
- POST `/api/auth/register` - 用户注册
- POST `/api/auth/login` - 用户登录
- GET `/api/auth/me` - 获取当前用户信息

### 职位相关
- GET `/api/jobs` - 获取职位列表
- POST `/api/jobs` - 创建单个职位
- POST `/api/jobs/batch` - 批量创建职位（新增）
- GET `/api/jobs/company` - 获取招聘者职位
- PUT/DELETE `/api/jobs/:id` - 更新/删除职位

## 项目结构

```
job-platform/
├── backend/                 # 后端代码
│   ├── controllers/         # 控制器
│   ├── models/             # 数据模型
│   ├── routes/             # 路由配置
│   ├── middlewares/        # 中间件
│   └── server.js           # 服务器入口
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── views/          # 页面组件
│   │   ├── components/     # 通用组件
│   │   ├── router/         # 路由配置
│   │   └── store/          # 状态管理
│   └── package.json
└── README.md
```

## 注意事项

1. **权限控制**：不同角色用户有不同的访问权限
2. **数据验证**：前后端都有完整的数据验证机制
3. **错误处理**：友好的错误提示和异常处理
4. **安全性**：JWT认证、密码加密、输入验证

## 开发团队

本项目为完整的就业服务平台，可直接用于生产环境部署。