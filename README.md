<h2 align="center">React+Material-ui+TypeScript构建的时间管理工具</h2>
做了一很简陋的时间管理工具，记录用户每天某一个时间段已经完成的活动，并打上标签。可以随意预设标签，例如“学习”，“休息“，”吃饭“，”通勤“，等。假设一个活动只有一个标签。用户需要手动输入开始时间，结束时间，活动内容，及标签。
用表格将所有的数据展示出来，同时支持筛选查看对应标签的记录，标签对应的总学习时长会在头部展示出来。

### 如何使用
``` bash
# 克隆该仓库
git clone https://github.com/raozerui/Time-Management.git

# 进入Time-Management文件夹
cd Time-Management

# 安装依赖
npm install
# 或者
yarn add

# 启动项目：http://localhost:3000
npm run start
# 或者
yarn start

# 打包构建
npm run build
# 或者
yarn build
```
### 使用Material UI的感受
平心而论，这是一款很酷炫的UI，但是看文档之后产生的另一个感觉是这一框UI确实扩展性很强，但是有些地方的功能提供不是很足，需要自定义。，比如在项目中使用Table组件，按照以往使用Antd的经验的话，是有现成的组件可以拿来即用的，但是在Material UI这里发现这类比较复杂的组件往往需要自己再去封装一层。

其次是在写的过程中，因为时间的关系，没有去采用推荐的`Css-in-Js`，而是采用了习惯的Css Module的做法。虽然从demo来看，这类写法并不是很难，类似于之前了解过得`Type-style`实现，后续会用推荐的`Css-in-Js`去修改样式属性。

### 一些不足
在项目中没有很好的处理到context导致的渲染问题，可以看到项目中大多数用到context的地方都是采用useContext的方式来获得，实际山会带来一定的渲染成本，导致context更新的时候所有引用到的地方都会更新。优先采用props传状态和函数，父组件内部在对传进来的context包一层，然后通过props传给子组件，这样渲染相对可控。

没有采用useMemo或者useCallback，导致渲染成本增加，后续优化这一块。

因为不熟悉的原因，所以花了半天时间先了解一下Material UI，不得不吐槽文档写的不咋地。其实现在看到的这个UI已经是我调整过得一版了，第一版丑的我都不想吐槽，所以后面从官网模板对照着复制了一些样式过来有了UI展示。虽然现在看起来也不咋地...。

