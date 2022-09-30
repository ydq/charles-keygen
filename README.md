# 🤪 Charles KeyGen

### 🤪 Charles KeyGen JS web 版

本实现参考 [Gitee 上的 Java 版本](https://gitee.com/thom/charles-keygen) 基于浏览器原生 JS （ES2020+）实现

### 🔗 在线使用
https://ydq.github.io/charles-keygen

### 🛠 开发

- install
~~~bash
yarn
# or npm i
~~~

- dev
~~~bash
yarn run dev
# or npm run dev
~~~

- build
~~~bash
yarn run build
# or npm run build
~~~

### 📦 其他

因为原 Java 源码中有使用到 long 类型的数字，在 JS 中使用传统的 Number 会溢出，所以必须使用 ES2020+ 的 BigInt 类型，因此使用 `vite` 打包的时候直接设定了 `target = esnext`

### 📄 LICENSE
[WTFPLv2](LICENSE)
