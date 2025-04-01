/**
 * 因为JS 没有像java 一样的 int long，只有 number 和 bigint
 * 因此写一个工具类尽可能的模拟java中的 int long 的行为
 */
class Helper {

    /**
     * 反转二进制字符串
     * @param input 二进制字符串
     * @returns 
     */
    static reverseBinary(input: string): string {
        return input.replace(/./g, bit => bit === '0' ? '1' : '0');
    }

    /**
     * 将int类型的数字 以二进制的形式 强转为long类型的数字
     * @param input int类型的数字
     * @returns 
     */
    static int2long(input: number): bigint {
        let b = input.toString(2)
        if (b.charAt(0) == '-') {
            b = b.substring(1, b.length)
            b = this.reverseBinary(b)
            b = this.addBinary(b, '1')
            b = b.padStart(64, '1')
        }
        return BigInt('0b' + b)
    }

    /**
     * 将 long 类型的数字 强转为 int 类型的数字，丢弃精度，同时最高位为符号位
     * @param input long类型的数字
     * @returns 
     */
    static long2int(input: bigint): number {
        let b = input.toString(2)
        if (b.charAt(0) == '-') {
            b = b.substring(1, b.length)
            b = b.padStart(64, '0')
            b = this.reverseBinary(b)
            b = this.addBinary(b, '1')
        } else {
            b = b.padStart(64, '0')
        }
        b = b.substring(b.length - 32, b.length)
        return this.binary2Number(b)
    }

    /**
     * 将二进制的字符串转为数字类型（最高位为符号位）
     * @param binary 二进制字符串
     * @returns 
     */
    static binary2Number(binary: string): number {
        let f = 1;
        if (binary.charAt(0) == '1') {
            f = -1
            binary = this.reverseBinary(binary)
            binary = this.addBinary(binary, '1');
        }
        return f * Number('0b' + binary)
    }

    /**
     * bigint（对应java中的long） 实现无符号右移
     * js 中的 bigint 类型不支持无符号右移，这里通过自己转二进制形式做到无符号右移
     * @param input long类型数字
     * @param n 位移数
     * @returns 
     */
    static longZeroFillRightShift(input: bigint, n: number): bigint {
        if (input >= 0) {
            return input >> BigInt(n)
        }
        input *= -1n;
        let b = input.toString(2)
        b = b.padStart(64, '0')
        b = this.reverseBinary(b)
        b = this.addBinary(b, '1');
        b = b.substring(0, b.length - n)
        b = b.padStart(64, '0')
        return BigInt('0b' + b);
    }

    /**
     * 兼容java中 int 类型的左移
     * @param input 待左移的数字
     * @param n 位移量
     * @returns 
     */
    static intLeftShift(input: number, n: number): number {
        let b = input.toString(2)
        if (b.charAt(0) == '-') {
            b = b.substring(1, b.length)
            b = b.padStart(32, '0')
            b = this.reverseBinary(b)
            b = this.addBinary(b, '1')
        } else {
            b = b.padStart(32, '0')
        }
        b = b + '0'.repeat(n)
        b = b.substring(b.length - 32, b.length)
        return this.binary2Number(b.substring(b.length - 32, b.length));
    }

    /**
     * 二进制字符串相加
     * @param a 原始二进制字符串
     * @param b 要相加的二进制字符串
     * @returns 
     */
    static addBinary(a: string, b: string): string {
        let res = '';
        let c = 0;
        let _a = a.split('')
        let _b = b.split('')
        while (_a.length || _b.length || c) {
            c += parseInt(_a.pop() ?? '0') + parseInt(_b.pop() ?? '0');
            res = c % 2 + res;
            c = c > 1 ? 1 : 0
        }
        return res
    }

    /**
     * 将 js 中的大数转为 java 中的 long 类型（若溢出 则强制 丢失精度，并计算符号位）
     * @param input 输入的大数
     * @returns 
     */
    static bigint2long(input: bigint): bigint {
        let b = input.toString(2);
        if (b.length <= 64) {
            return input;
        }
        b = b.substring(b.length - 64, b.length)
        let s = 1n;
        if (b.charAt(0) == '1') {
            s = -1n;
            b = this.reverseBinary(b)
            b = this.addBinary(b, '1')
        }
        return BigInt('0b' + b) * s;
    }

    /**
     * 生成随机数
     * @returns 随机数
     */
    static nextInt(): number {
        return Math.floor(Math.random() * 1e10)
    }

    /**
     * 兼容负数 转 16 进制（js中默认为 -正数的十六进制，与 java 中的不相同）
     * @param num bigint 类型的数字转 16 进制
     * @returns Long 类型转的16进制字符串
     */
    static long2Hex(num: bigint): string {
        return this.num2Hex(num, 64)
    }

    /**
     * 兼容负数 转 16 进制（js中默认为 -正数的十六进制，与 java 中的不相同）
     * @param num number 类型的数字转 16 进制
     * @returns Integer 类型转的16进制字符串
     */
    static int2Hex(num: number): string {
        return this.num2Hex(num, 32)
    }

    /**
     * 通用数字类型转十六进制
     * @param num 通用的数字类型
     * @param n 数字类型的长度 int = 32 long = 64
     * @returns 16进制字符串
     */
    private static num2Hex(num: number | bigint, n: number): string {
        if (num >= 0) {
            return num.toString(16)
        }
        let b = num.toString(2)
        b = b.substring(1, b.length)
        b = b.padStart(n, '0')
        b = this.reverseBinary(b)
        b = this.addBinary(b, '1')
        return BigInt('0b' + b).toString(16)
    }

    /**
     * 模拟 java 的字符串转 byte 数组
     * @param str 字符串
     * @returns byte数组
     */
    static stringToByte(str: string): number[] {
        let bytes = new Array();
        let len: number, c: number;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }
}

/**
 * 模拟 Java 中的 java.nio.ByteBuffer 类 的一些简单实现
 */
class ByteBuffer {
    private readonly data: string[] = []
    private readonly cap: number;
    private pos: number = 0;

    constructor(cap: number) {
        this.cap = cap;
        for (let i = 0; i < cap; i++) {
            this.data[i] = '0'.repeat(8)
        }
    }

    putInt(input: number): ByteBuffer {
        return this.putNumber(input, 32)
    }

    putLong(input: bigint): ByteBuffer {
        return this.putNumber(input, 64)
    }

    putBytes(input: number[]): ByteBuffer {
        input.forEach(byte => this.putNumber(byte, 8))
        return this;
    }

    private putNumber(num: number | bigint, bit: number): ByteBuffer {
        let b = num.toString(2)
        if (num < 0) {
            b = b.substring(1, b.length);
            b = Helper.reverseBinary(b)
            b = Helper.addBinary(b, '1')
            b = b.padStart(bit, '1')
        } else {
            b = b.padStart(bit, '0')
        }
        for (let i = 0; i < bit; i += 8) {
            this.data[this.pos++] = b.substring(i, i + 8)
        }
        return this;
    }

    getLong(): bigint {
        let b = '';
        for (let end = this.pos + 8; this.pos < end; this.pos++) {
            b += this.data[this.pos]
        }
        return Helper.bigint2long(BigInt('0b' + b))
    }

    hasRemaining(): boolean {
        return this.pos < this.cap
    }

    rewind(): ByteBuffer {
        this.pos = 0
        return this
    }

    array(): number[] {
        return this.data.map(b => Helper.binary2Number(b))
    }

}

/**
 * 参考 Java 版本的 SimpleRC5 源码 实现
 */
class SimpleRC5 {

    readonly P32 = Helper.long2int(0xb7e15163n);
    readonly Q32 = Helper.long2int(0x9e3779b9n);

    readonly R = 12;
    readonly S: number[] = [];

    constructor(key: bigint) {
        this.setKey(key);
    }

    private setKey(key: bigint): void {
        const t = 2 * (this.R + 1);
        const c = 2;

        let L: number[] = [];
        L[0] = Helper.long2int(key);
        L[1] = Number(Helper.longZeroFillRightShift(key, 32));

        this.S[0] = this.P32;
        for (let i = 1; i < t; i++) {
            this.S[i] = Helper.long2int(Helper.int2long(this.S[i - 1]) + Helper.int2long(this.Q32))
        }

        let i = 0, j = 0, A = 0, B = 0;

        for (let k = 0; k < 3 * t; k++) {
            A = this.S[i] = this.rotateLeft(this.S[i] + A + B, 3);
            B = L[j] = this.rotateLeft(L[j] + A + B, A + B);
            i = (i + 1) % t;
            j = (j + 1) % c;
        }
    }

    encrypt(input: bigint): bigint {
        let A = Helper.long2int(input + Helper.int2long(this.S[0]));
        let B = Helper.long2int(Helper.longZeroFillRightShift(input, 32) + Helper.int2long(this.S[1]))

        for (let i = 1; i <= this.R; i++) {
            A = Helper.long2int(Helper.int2long(this.rotateLeft(A ^ B, B)) + Helper.int2long(this.S[2 * i]));
            B = Helper.long2int(Helper.int2long(this.rotateLeft(B ^ A, A)) + Helper.int2long(this.S[2 * i + 1]));
        }

        return this.asLong(A, B);
    }

    decrypt(input: bigint): bigint {
        let A = Helper.long2int(input);
        let B = Helper.long2int(Helper.longZeroFillRightShift(input, 32));

        for (let i = this.R; i > 0; i--) {
            B = this.rotateRight(Helper.long2int(Helper.int2long(B) - Helper.int2long(this.S[2 * i + 1])), A) ^ A;
            A = this.rotateRight(Helper.long2int(Helper.int2long(A) - Helper.int2long(this.S[2 * i])), B) ^ B;
        }

        B = B - this.S[1];
        A = A - this.S[0];

        return this.asLong(A, B);
    }

    rotateLeft(x: number, y: number): number {
        return (Helper.long2int((Helper.int2long(x) << Helper.int2long(y & 31))) | (x >>> (32 - (y & (32 - 1)))));
    }

    rotateRight(x: number, y: number): number {
        return ((x >>> (y & (32 - 1))) | Helper.intLeftShift(x, 32 - (y & 31)));
    }

    private asLong(a: number, b: number): bigint {
        return Helper.bigint2long((Helper.int2long(a) & 0xffffffffn) | (Helper.int2long(b) << 32n));
    }
}

/**
 * 参考 Java 版本的 CharlesKeygen 实现
 */
class CharlesKeygen {

    private static readonly RC5KEY_NAME: bigint = 0x7a21c951691cd470n;
    private static readonly RC5KEY_KEY: bigint = 0xb4f0e0ccec0eafadn;
    private static readonly NAME_PREFIX: bigint = 0x54882f8an;

    private static calcPrefix(name: string): number {
        const bytes: number[] = Helper.stringToByte(name.replace(/[\u00A0\u1680\u180E\u2000\u200A\u202F\u205F\u3000]/g, ' '));
        let length = bytes.length + 4;
        let padded = ((~length + 1) & (8 - 1)) + length;
        let input = new ByteBuffer(padded).putInt(bytes.length).putBytes(bytes).rewind();

        let rc5 = new SimpleRC5(this.RC5KEY_NAME);
        let output = new ByteBuffer(padded);
        while (input.hasRemaining()) {
            output.putLong(rc5.encrypt(input.getLong()));
        }

        let n = 0;
        output.array().forEach(b => {
            n = rc5.rotateLeft(n ^ b, 0x3);
        })
        return n;
    }

    private static xor(n: bigint): number {
        let n2 = 0n
        let tmp = 0xffn

        for (let i = 56; i >= 0; i -= 8) {
            n2 ^= (Helper.longZeroFillRightShift(n, i) & tmp);
        }
        return Math.abs(Helper.long2int(n2 & tmp));
    }

    private static key(prefix: number, suffix: number): string {

        let input = Helper.bigint2long(Helper.int2long(prefix) << 32n);

        switch (suffix >> 16) {
            case 0x0401: // user - v4
            case 0x0402: // site - v4
            case 0x0403: // multi-site - v4
                input |= Helper.int2long(suffix);
                break;
            default:
                input |= Helper.int2long(0x01000000 | (suffix & 0xffffff));
                break;
        }
        let out = new SimpleRC5(this.RC5KEY_KEY).decrypt(input);
        return Helper.int2Hex(this.xor(input)).padStart(2, '0') + Helper.long2Hex(out).padStart(16, '0')
    }

    static keygen(name: string, suffix: number = Helper.nextInt()): string {
        let prefix = this.calcPrefix(name) ^ Helper.long2int(this.NAME_PREFIX);
        return this.key(prefix, suffix);
    }

}

export function bind(input: HTMLInputElement, output: HTMLInputElement) {
    input.addEventListener('input', (e: Event) => {
        let val = (e.target as HTMLInputElement).value
        output.value = val.trim() ? CharlesKeygen.keygen(val) : ''
    })
}
