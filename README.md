# 小爱课程表开发者工具本地调试工具
## 适配广州城市理工学院（gcu）教务系统（正方教务）
[x] 使用WebSocket将NodeWatch监听到的文件变动发送到开发者工具
[x] Parser本地调试环境，完全模拟服务器处理环境

## 使用说明

首先修改`config.ini`，根据注释修改为自己对应的文件，保存间隔最好还是不要低于300，通信和处理信息都需要时间

lock文件是使用了淘宝镜像源的，可以直接`npm i`

随后就可以运行脚本`npm run start`

此时打开开发者工具，进入`版本详情`Tab，如果代码编写右边出现绿色链接标志，则表明链接成功

修改你在`config.ini`配置的代码文件，则会自动同步到代码框中

> 注意：不要在输入框弹出的时候使用，是不生效的

本工具还附带了模拟服务器环境运行parser的功能，在进行本地测试时会自动调用

如需debug需要自行关注命令行输出