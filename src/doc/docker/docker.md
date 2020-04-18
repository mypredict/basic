# Terminal Command

# 基础配置

sudo usermod -aG docker xxx // 将普通用户加入 docker 用户组  
sudo service docker start // service 命令启动 docker 服务  
sudo systemctl start docker // systemctl 命令启动 docker 服务  
docker info // 查看 docker 的基本信息

## images

docker image pull library/hello-world // 抓取 library(docker 官方, 也是默认的) 仓库中的 hello-world image 文件  
docker images // 查看 docker 中的所有 image 文件  
docker image ls // 同上  
docker image build -t xxx . // 通过 Dockerfile 文件创建 image 文件, -t 指定 image 文件名称, .(当前路径)表示 Dockerfile 文件所在路径  
docker image build -t xxx:0.0.1 . // 冒号后面指定标签, 默认为 latest

## container

docker container run hello-world // 从选中的 image 文件(本地或者远程仓库)生成一个正在运行的容器实例  
docker container start containerId // 启动已经生成且已经停止运行的容器文件  
docker container kill containerId // 终止不是自动终止的服务容器(会立即终止)  
bash container stop containerId // 终止服务容器(会进行收尾清理工作)  
docker container ls // 本机正在运行的 docker 容器  
docker ps // 本机正在运行的 docker 容器  
Ctrl + d // 退出容器  
docker container ls --all // 本机所有的容器  
docker ps -a // 本机所有的容器  
docker container rm containerId // 删除已经终止运行的 docker 容器文件(不会自动删除)  
docker container logs containerId // docker 容器的输出(没有 -it 参数使用此命令查看输出)  
docker container cp containerId:/a/b . // 从正在运行的 docker 容器中将文件拷贝到本机目录(. 当前目录)  
docker container exec -it containerId /bin/bash // 没有 -it 参数时通过此命令进入容器执行 shell 命令

> 从 image 文件生成容器  
> -p 容器的 3000 端口映射到本机的 8000 端口  
> -it 容器的 shell 映射到当前的 shell (在本机窗口输入的命令会传入容器)  
> xxx:0.0.1 image 的名字和标签(默认 latest)  
> /bin/bash 容器启动后执行的第一个命令, 此处是启动 bash, 保证用户可以 shell  
> 最终会返回 root@66d80f4aaf1e:/app# 提示符, 此时可以输入 node index.js  
> docker container run -p 8000:3000 -it xxx /bin/bash  
> docker container run -p 8000:3000 -it xxx:0.0.1 /bin/bash  
> docker container run --rm -p 8000:3000 -it xxx /bin/bash // 容器终止运行后自动删除容器文件

# .dockerignore

## 打包除以下文件的内容

.git  
node_modules  
npm-debug.log

# Dockerfile

FROM node:8.4 // 该 image 文件继承官方的 node image, 冒号表示标签, 这里标签是 8.4, 即 8.4 版本的 node  
COPY . /app // 将当前目录下的所有文件(除了.dockerignore 排除的路径), 都拷贝进入 image 文件的 /app 目录  
WORKDIR /app // 指定接下来的工作路径为 /app  
RUN npm install // 在 /app 目录下, 运行 npm install 命令安装依赖. 注意, 安装后所有的依赖, 都将打包进入 image 文件  
EXPOSE 3000 // 将容器 3000 端口暴露出来, 允许外部连接这个端口  
CMD node index.js // 容器启动后自动运行
