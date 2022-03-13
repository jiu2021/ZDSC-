# 项目说明

## 基本介绍

**介绍**：**中地商城**后端通用接口服务，本项目基于node.js以及MongoDB数据开发。

**技术栈**：koa2+mongoose

**主要功能**：提供了用户注册登录接口、有关商品、购物车、地址、订单的增删改查接口。

**项目目录结构**：

```
|-- ZDSC', 									#中地商城
    |-- .env', 								#自定义配置
    |-- .gitignore',
    |-- package-lock.json',
    |-- package.json',
    |-- readme.md', 						#说明文档
    |-- src',
        |-- main.js', 						#入口文件
        |-- app',
        |   |-- errHandler.js', 			#错误处理
        |   |-- index.js', 					#app各项服务
        |-- config',
        |   |-- config.default.js', 		#开启配置
        |-- constant',
        |   |-- err.type.js', 				#定义错误
        |-- controller', 					#路由控件
        |-- db',
        |   |-- index.js', 					#连接数据库
        |-- middleware', 					#路由处理中间件
        |-- model', 						#数据模型
        |-- router', 						#路由
        |-- service', 						#操作数据库  
        |-- upload', #存储上传文件
```

## 运行项目

**初始准备**

安装Git，Node，MongoDB

**克隆项目**

```
git clone git@github.com:jiu2021/ZDSC-koa2.git
```

**安装依赖**

```
npm install ...
//生产依赖
"bcryptjs": "^2.4.3",
"dotenv": "^16.0.0",
"jsonwebtoken": "^8.5.1",
"koa": "^2.13.4",
"koa-body": "^4.2.0",
"koa-parameter": "^3.0.1",
"koa-router": "^10.1.1",
"koa-static": "^5.0.0",
"mongoose": "^6.2.4",
"mongoose-delete": "^0.5.4",
```

```
npm install nodemon -D
//开发依赖
"nodemon": "^2.0.15"
```

**新建数据库**

在localhost:27017下建立名为ZDSC数据库

**启动项目**

```
npm run dev
//控制台显示: http://localhost:8000 数据库连接成功……
//则服务已在8000端口启动
```

**调用接口**

可使用postman模拟发送http请求，接口地址参考/src/router文件
