# vue2.0 猫眼电影App

## 项目简介

使用vue2.0仿猫眼电影app,因为猫眼暂不对外开放api接口,因此采用的是豆瓣的api。现阶段对豆瓣api的数据请求过程中，豆瓣对图片请求做了某些限制，致使项目图片加载不完整，但其他数据均正常，不影响正常使用。

api来源自豆瓣官方api，详情请戳[豆瓣电影api](https://developers.douban.com/wiki/?title=movie_v2)

## 线上体验

#### PC访问

[猫眼电影webapp](http://47.104.98.140:8000)

打开浏览器进入开发者模式，先选择移动端视口, 观看效果更佳

## 项目运行

clone项目源码
```
git clone https://github.com/buptsky/vue-douban-movie.git
```
安装依赖
```
cd vue-douban-movie
npm install/yarn
``` 
运行
```
npm run dev
```
打开浏览器进入localhost:8000，在开发者工具的移动端模式下查看效果

## 部分效果演示
### 热映和即将上映电影模块入口，电影详情和评论

![image](https://github.com/xiaoxiao1008150/vue-douban-movie/raw/master/screenshot/movie.gif)
![image](https://github.com/xiaoxiao1008150/vue-douban-movie/raw/master/screenshot/detail.gif)

### 城市搜索和相关影人、电影搜索

![image](https://github.com/xiaoxiao1008150/vue-douban-movie/raw/master/screenshots/search_city.gif)
![image](https://github.com/xiaoxiao1008150/vue-douban-movie/raw/master/screenshots/search_people.gif)

## 项目描述
### 技术栈
- vue2.0 + vue-router + vuex：vue全家桶
- axios：用于ajax请求
- vue-lazyload：用于图片懒加载
- better-scroll：移动端滚动库，优化移动端滚动效果
- webpack： 构建工具
- es6: 使用es6语法
- stylus: css预处理

使用flex布局进行移动端适配，用eslint进行代码规范检查

使用localStorage搜索信息

### 功能实现
#### 上映电影部分
- [x] 获取正在上映的电影信息和即将上映电影的信息
- [x] 电影列表均实现上拉加载功能
#### 电影搜索部分
- [x] 支持用户根据关键字搜索
- [x] 根据搜索结果查看电影详情
- [x] 记录搜索历史
#### 城市搜索部分
- [x] 支持用户滑动页面进行城市选择
- [x] 根据关键词进行城市搜索，支持拼音检索
#### 电影详情部分
- [x] 获取电影所有的基础信息
- [x] 获取电影的短评，可查看该电影所有短评

### 关于浏览器跨域
#### 开发环境
项目通过vue脚手架vue-cli进行配置，可在'config/index'目录下进行如下配置
```
proxyTable: {
      '/api': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
```
参数里中的changeOrigin，接收一个布尔值，如果设置为true,那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了

#### 生产环境
执行```npm run build```打包以后，豆瓣api的代理配置将不再起作用，因此在配置ngnix服务器的时候可以使用反向代理的配置，
确保可以正确的请求到数据，进入nginx的配置文件中(环境ubuntun,nginx),文件路径为/www/nginx/nginx.conf,在http中添加如下设置
```
server {
    listen  8000;
    server_name  localhost;
    location / {
            root /www/production/movie/;
            try_files $uri $uri/ @router;
            index index.html;
    }
    location @router {
            rewrite ^.*$ /index.html last;
     }
    location ^~/api {
            proxy_pass http://api.douban.com/v2;
    }
  }
```

## 项目布局
```
├─build                       // webpack配置文件
├─config                      // 项目开发环境配置相关代码   
├─dist                        // 项目打包目录
├─screenshots                 // 项目截图
├─src                         // 源码目录    
│  ├─api                      // axios请求，获取项目数据
│  ├─base                     // 项目基础组件
│  │  ├─CityResult            // 城市选择结果
│  │  ├─Comments              // 评论组件
│  │  ├─DisplayBox            // 影视、影人搜索单项组件
│  │  ├─Loading               // 页面加载
│  │  ├─Mask                  // 城市选择页面遮罩
│  │  ├─Mfooter               // 选项卡
│  │  ├─Scroll                // 滚动
│  │  ├─SearchList            // 影视、影人搜索基本页面
│  │  ├─SearchResult          // 影视、影人搜索列表
│  │  ├─Slider                // 滑动动画
│  │  └─Tab                   // 电影选项卡
│  ├─common                   // 公共资源 
│  │  ├─fonts                 // 图标字体
│  │  ├─image                 // 图片资源
│  │  ├─js                    // 公共方法
│  │  └─stylus                // css样式
│  ├─components               // 业务组件 
│  │  ├─Home                  // 主页
│  │  ├─Movies                // 电影分类
│  │  ├─City                  // 城市选择
│  │  ├─Detail                // 电影详情
│  │  ├─Reviews               // 电影短评
│  │  ├─Search                // 城市搜索
│  │  └─SearchList            // 影视搜索列表
│  ├─router                   // vue-router路由管理
│  └─store                    // vuex状态管理 
└─static 
```
