import './style.css'
import { bind } from './keygen'


document.querySelector('#app').innerHTML = `
<h1>๐คช Charles KeyGen</h1>
<blockquote>
    <details>
        <summary>Charles KeyGen JS web ็</summary>
        <p>ๆฌๅฎ็ฐๅ่ <a href="https://gitee.com/thom/charles-keygen" target="_blank">Gitee ไธ็ Java ็ๆฌ</a> ๅบไบๆต่งๅจๅ็ JS ๏ผES2020+๏ผๅฎ็ฐ</p>
    </details>
<footer><a href="https://www.charlesproxy.com/latest-release/download.do" target="_blank" rel='noopener noreferrer'>๐ DOWNLOAD ๐</a> ๏ฝ <a href='https://github.com/ydq/charles-keygen'>๐ SOURCE CODE ๐</a></footer>
</blockquote>
<form>
    <fieldset>
        <legend>๐คช Charles KeyGen</legend>
        <label>Name:</label>
        <input name="name" autofocus placeholder='Please input...' type='email' />
        <label>Key:</label>
        <input name="key" readonly placeholder='Auto generate' />
    </fieldset>
</form>
`

bind(document.querySelector('input[name="name"]'),document.querySelector('input[name="key"]'))
