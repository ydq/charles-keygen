import './style.css'
import { bind } from './keygen'

let tips = 'Supports 4.x & 5.0'

document.querySelector<HTMLBodyElement>('body')!.innerHTML = `
<fieldset>
<legend>🫙 Charles KeyGen <small>${tips}</small></legend>
<input name="name" autofocus placeholder='Registered Name' type='email' />
<input name="key" readonly placeholder='License Key'/>
</fieldset>
`
const uname: HTMLInputElement = document.querySelector<HTMLInputElement>('input[name="name"]')!
const license: HTMLInputElement = document.querySelector<HTMLInputElement>('input[name="key"]')!
const tipsEl: HTMLElement = document.querySelector<HTMLElement>('small')!
let timer: number;
license.addEventListener('click', async () => {
    if (license.value) {
        timer && clearTimeout(timer)
        try {
            await navigator?.clipboard?.writeText(license.value);
            tipsEl.innerText = 'Copied to clipboard'
        } catch (e) {
            tipsEl.innerText = 'Auto copy failed'
        }
        timer = setTimeout(() => tipsEl.innerText = tips, 2e3)
        setTimeout(() => license.select())
    } else {
        uname.focus()
    }
})

bind(uname, license)
