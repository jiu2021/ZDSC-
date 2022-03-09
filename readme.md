# 项目说明

## 基本介绍

**介绍**：中地商城后端通用接口服务，本项目基于node.js以及MongoDB数据开发。

**技术栈**：koa2+mongoose

**主要功能**：提供了用户注册登录接口、有关商品、购物车、地址、订单的增删改查接口。

**项目目录结构**：

```
|-- ZDSC', #中地商城
    |-- .env', #自定义配置
    |-- .gitignore',
    |-- package-lock.json',
    |-- package.json',
    |-- readme.md', #说明文档
    |-- src',
        |-- main.js', #入口文件
        |-- app',
        |   |-- errHandler.js', #错误处理
        |   |-- index.js', #app各项服务
        |-- config',
        |   |-- config.default.js', #开启配置
        |-- constant',
        |   |-- err.type.js', #定义错误
        |-- controller', #路由控件
        |   |-- addr.controller.js',
        |   |-- cart.controller.js',
        |   |-- goods.controller.js',
        |   |-- order.controller.js',
        |   |-- user.controller.js',
        |-- db',
        |   |-- index.js', #连接数据库
        |-- middleware', #路由处理中间件
        |   |-- addr.middleware.js',
        |   |-- auth.middleware.js',
        |   |-- cart.middleware.js',
        |   |-- goods.middleware.js',
        |   |-- order.middleware.js',
        |   |-- user.middleware.js',
        |-- model', #数据模型
        |   |-- addr.model.js',
        |   |-- cart.model.js',
        |   |-- goods.model.js',
        |   |-- order.model.js',
        |   |-- user.model.js',
        |-- router', #路由
        |   |-- addr.route.js',
        |   |-- cart.route.js',
        |   |-- goods.route.js',
        |   |-- order.route.js',
        |   |-- user.route.js',
        |-- service', #操作数据库
        |   |-- addr.service.js',
        |   |-- cart.service.js',
        |   |-- goods.service.js',
        |   |-- order.service.js',
        |   |-- user.service.js',
        |-- upload', #存储上传文件
```



