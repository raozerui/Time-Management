修复了一些隐藏的bug，同时对于context多处使用真的很不习惯，带来的渲染成本有点高。不过这个项目比较简单，整体开销就很小。如果是大项目的话
还是会考虑分成多个context，一个专门传数据，写起来更优雅，同时没有更新，渲染成本低。另一个有更新,但是优先采用props传状态和函数，父组件内部在对传进来的context包一层，然后通过props传给子组件，这样渲染相对成本就可控很多。

写的差不多了，明天补一下文档，洗个澡看会书先！
## 使用Material UI的感受