const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
window = dom.window;



export class TranslateClass {
    Rb(a) {
        return function () {
            return a
        }
    };
    Sb(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    }
    /**
     * 获取tk
     * @param a 
     * @returns 
     */
    tk(a) {
        // a=29979;
        let Tb = null;
        if (null !== Tb)
            var b = Tb;
        else {
            b = this.Rb(String.fromCharCode(84));
            var c: any = this.Rb(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (Tb = window[b.join(c())] || "") || ""
        }
        var d: any = this.Rb(String.fromCharCode(116));
        c = this.Rb(String.fromCharCode(107));
        d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") + "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var k = a.charCodeAt(g);
            128 > k ? e[f++] = k : (2048 > k ? e[f++] = k >> 6 | 192 : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023),
                e[f++] = k >> 18 | 240,
                e[f++] = k >> 12 & 63 | 128) : e[f++] = k >> 12 | 224,
                e[f++] = k >> 6 & 63 | 128),
                e[f++] = k & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++)
            a += e[f],
                a = this.Sb(a, "+-a^+6");
        a = this.Sb(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        console.log(a)
        let result = c + (a.toString() + "." + (a ^ b));
        console.log(result);
        return result
    }
}
// let json=`[\"\至于“形”的含义，《乐记》里有“在天成象，在地成形”的话。钱锺书先生释为“‘形’者，完成之定状”。钱先生还引述亚里士多德论“自然”有五层含义。其四，是“相形之下，尚未成形之原料”，也就是“有质而无形”的状态；其五，是“止境宿归之形”。这种由“原质”，“原料”而“成形”的说法用之于文章写作，也如钱先生所阐述的，“春来花鸟，具‘形’之天然物色也，而性癖耽吟者反目为‘诗料’”。指明做为“诗料”的“形”，即包括着“题材”的内。“吟安佳句，具‘形’之词章也”。指明做为诗文的“形”即指“词章”，包括语言、结构等。我在上文所论“形”的概念，也具有同这里所引说法的一致性。 \"]`;
// let str=`["Accounting","Contract"]`;
// let txt=`q=%20FeHelper&q=%7C&q=%3Ca%20i%3D0%3E%E8%87%AA%E5%8A%A8%E8%A7%A3%E7%A0%81%3C%2Fa%3E%3Ca%20i%3D1%3E%7C%3C%2Fa%3E%3Ca%20i%3D2%3E%E6%8E%92%E5%BA%8F%EF%BC%9A%3C%2Fa%3E%3Ca%20i%3D3%3E%E9%BB%98%E8%AE%A4%3C%2Fa%3E&q=%E5%8D%87%E5%BA%8F&q=%E9%99%8D%E5%BA%8F&q=%E4%B9%B1%E7%A0%81%E4%BF%AE%E6%AD%A3&q=%E5%85%83%E6%95%B0%E6%8D%AE&q=%E6%8A%98%E5%8F%A0%E6%89%80%E6%9C%89&q=%E4%B8%8B%E8%BD%BDJSON&q=%E9%9A%90%E8%97%8F%26gt%3B%26gt%3B&q=%7B&q=%3Ca%20i%3D0%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D1%3EstatusCode%3C%2Fa%3E%3Ca%20i%3D2%3E%26quot%3B%3A%C2%A0%3C%2Fa%3E%3Ca%20i%3D3%3E404%3C%2Fa%3E%3Ca%20i%3D4%3E%2C%3C%2Fa%3E&q=%3Ca%20i%3D0%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D1%3Emessage%3C%2Fa%3E%3Ca%20i%3D2%3E%26quot%3B%3A%C2%A0%3C%2Fa%3E%3Ca%20i%3D3%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D4%3ECannot%20GET%20%2F%3C%2Fa%3E%3Ca%20i%3D5%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D6%3E%2C%3C%2Fa%3E&q=%3Ca%20i%3D0%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D1%3Eerror%3C%2Fa%3E%3Ca%20i%3D2%3E%26quot%3B%3A%C2%A0%3C%2Fa%3E%3Ca%20i%3D3%3E%26quot%3B%3C%2Fa%3E%3Ca%20i%3D4%3ENot%20Found%3C%2Fa%3E%3Ca%20i%3D5%3E%26quot%3B%3C%2Fa%3E&q=%7D&q=fehelper&q=%E5%B1%95%E5%BC%80%E6%88%96%E6%94%B6%E8%B5%B7%E5%B7%A5%E5%85%B7%E6%A0%8F&q=%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%AD...&q=%0A%20%20%20%20%26quot%3BstatusCode%26quot%3B%3A%20404%2C&q=%0A%20%20%20%20%26quot%3Bmessage%26quot%3B%3A%20%26quot%3BCannot%20GET%20%2F%26quot%3B%2C&q=%0A%20%20%20%20%26quot%3Berror%26quot%3B%3A%20%26quot%3BNot%20Found%26quot%3B&q=%0A%7D&q=%7B%26quot%3BstatusCode%26quot%3B%3A404%2C%26quot%3Bmessage%26quot%3B%3A%26quot%3BCannot%20GET%20%2F%26quot%3B%2C%26quot%3Berror%26quot%3B%3A%26quot%3BNot%20Found%26quot%3B%7D`;
// test(json);
//150861.307109
//790399.790399
