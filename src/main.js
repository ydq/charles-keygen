import './style.css'
import { bind } from './keygen'


document.querySelector('#app').innerHTML = `
<h1>🤪 Charles KeyGen</h1>
<blockquote>
    <details>
        <summary>Charles KeyGen JS web 版</summary>
        <p>本实现参考 <a href="https://gitee.com/thom/charles-keygen" target="_blank">Gitee 上的 Java 版本</a> 基于浏览器原生 JS （ES2020+）实现</p>
    </details>
<footer><a href="https://www.charlesproxy.com/latest-release/download.do" target="_blank" rel='noopener noreferrer'>👉 DOWNLOAD 👈</a> ｜ <a href='https://github.com/ydq/charles-keygen'>👉 SOURCE CODE 👈</a></footer>
</blockquote>
<form>
    <fieldset>
        <legend>🤪 Charles KeyGen</legend>
        <label>Name:</label>
        <input name="name" autofocus placeholder='Please input...' type='email' />
        <label>Key:</label>
        <input name="key" readonly placeholder='Auto generate' />
    </fieldset>
</form>
`

bind(document.querySelector('input[name="name"]'),document.querySelector('input[name="key"]'))
