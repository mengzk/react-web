# 文档

访问地址：https://dhstatic.bthome.com/appstore/{prod|uat|test|dev}/crmPage/index.html#/xxx

### 目录

```bash
├── deploy
│   ├── cdn                   # 刷新cdn
│   ├── index                 # 执行打包
│   ├── oss                   # 打包上传地址
│   ├── request               # 打包请求
│   ├── utils                 # 打包工具
├── public                     
│   ├── favicon.ico           # favicon
├── ├── index.html            # index入口
├── src
│   ├── assets                # 本地静态资源
│   ├── components            # 业务通用组件
│   ├── config                # 项目配置
│   ├── hooks                 # 通用 Hoooks
│   │   ├── launch            # 
│   │   ├── scroll            # 
│   │   ├── visible           # 
│   │   ├── useTouch          # 
│   ├── libs                  # 三方库封装
│   │   ├── bnq               # 住小橙 原生API封装
│   ├── modules               # 业务模块
│   ├── pages                 # 项目页面
│   ├── router                # 路由
│   ├── stores                # 数据缓存及状态管理
│   ├── utils                 # 工具库
│   └── index.js              # 项目入口JS
├── .babelrc                  # babel配置文件
├── env                       # 环境配置
├── env.xxx                   # xxx环境配置
├── eslintrc                  # eslint配置文件
├── webpack.config.js         # webpack配置
├── README.md
└── package.json
```

## 命令

#### 启动
`npm start`
#### 发布
`npm run push:d` 
#### 打包 Test环境
`npm run push:t`
#### 打包 Uat环境
`npm run push:u`
#### 打包生产
`npm run push:prod`


### 三方库使用情况

`注：每隔 3个月 要更新一下 库 至最新版本`
