import Vue from 'vue';
import App from './App';

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import Utils from "./utils/index";
Vue.prototype.utils = Utils;

import uView from "uview-ui";
Vue.use(uView);

import SuntonMain from "./components/sunton-main";
Vue.component('sunton-main', SuntonMain);

var lang = uni.getStorageSync('languageStorage') || 'en';
const i18n = new VueI18n({
    locale: lang,
    messages: {
        en: require("./static/lang/en.json"),
        zh: require("./static/lang/zh.json"),
        // ja: require("./static/lang/ja.json"),
        // ko: require("./static/lang/ko.json"),
        // fr: require("./static/lang/fr.json"),
        // es: require("./static/lang/es.json"),
        // pt: require("./static/lang/pt.json"),
        // it: require("./static/lang/it.json"),
        // ru: require("./static/lang/ru.json"),
        // vi: require("./static/lang/vi.json"),
        // de: require("./static/lang/de.json"),
        // ar: require("./static/lang/ar.json"),
        // id: require("./static/lang/id.json"),
        // af: require("./static/lang/af.json"),
        // bs: require("./static/lang/bs.json"),
        // bg: require("./static/lang/bg.json"),
        // ca: require("./static/lang/ca.json"),
        // hr: require("./static/lang/hr.json"),
        // cs: require("./static/lang/cs.json"),
        // da: require("./static/lang/da.json"),
        // nl: require("./static/lang/nl.json"),
        // et: require("./static/lang/et.json"),
        // fj: require("./static/lang/fj.json"),
        // fi: require("./static/lang/fi.json"),
        // el: require("./static/lang/el.json"),
        // ht: require("./static/lang/ht.json"),
        // he: require("./static/lang/he.json"),
        // hi: require("./static/lang/hi.json"),
        // mww: require("./static/lang/mww.json"),
        // hu: require("./static/lang/hu.json"),
        // sw: require("./static/lang/sw.json"),
        // tlh: require("./static/lang/tlh.json"),
        // lv: require("./static/lang/lv.json"),
        // lt: require("./static/lang/lt.json"),
        // ms: require("./static/lang/ms.json"),
        // mt: require("./static/lang/mt.json"),
        // no: require("./static/lang/no.json"),
        // pl: require("./static/lang/pl.json"),
        // otq: require("./static/lang/otq.json"),
        // ro: require("./static/lang/ro.json"),
        // 'sr-Cyrl': require("./static/lang/sr-Cyrl.json"),
        // 'sr-Latn': require("./static/lang/sr-Latn.json"),
        // sk: require("./static/lang/sk.json"),
        // sl: require("./static/lang/sl.json"),
        // sv: require("./static/lang/sv.json"),
        // ty: require("./static/lang/ty.json"),
        // th: require("./static/lang/th.json"),
        // to: require("./static/lang/to.json"),
        // tr: require("./static/lang/tr.json"),
        // uk: require("./static/lang/uk.json"),
        // ur: require("./static/lang/ur.json"),
        // cy: require("./static/lang/cy.json"),
        // yua: require("./static/lang/yua.json"),
        // sq: require("./static/lang/sq.json"),
        // hy: require("./static/lang/hy.json"),
        // bn: require("./static/lang/bn.json"),
        // eu: require("./static/lang/eu.json"),
        // be: require("./static/lang/be.json"),
        // co: require("./static/lang/co.json"),
        // eo: require("./static/lang/eo.json"),
        // tl: require("./static/lang/tl.json"),
        // fy: require("./static/lang/fy.json"),
        // gl: require("./static/lang/gl.json"),
        // gu: require("./static/lang/gu.json"),
        // ha: require("./static/lang/ha.json"),
        // haw: require("./static/lang/haw.json"),
        // is: require("./static/lang/is.json"),
        // ig: require("./static/lang/ig.json"),
        // ga: require("./static/lang/ga.json"),
        // jw: require("./static/lang/jw.json"),
        // kn: require("./static/lang/kn.json"),
        // kk: require("./static/lang/kk.json"),
        // km: require("./static/lang/km.json"),
        // ku: require("./static/lang/ku.json"),
        // lo: require("./static/lang/lo.json"),
        // la: require("./static/lang/la.json"),
        // lb: require("./static/lang/lb.json"),
        // mk: require("./static/lang/mk.json"),
        // mg: require("./static/lang/mg.json"),
        // ml: require("./static/lang/ml.json"),
        // mi: require("./static/lang/mi.json"),
        // mr: require("./static/lang/mr.json"),
    }
});

Vue.prototype._i18n = i18n;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({i18n, ...App});
app.$mount();