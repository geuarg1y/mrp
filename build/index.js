
// ==UserScript==
// @name         Megamarket Real Price
// @description  Выводит цены с учетом бонусов и добавляет сортировку по ним
// @version      2.0.6
// @author       undfndusr
// @license      MIT
// @match        *://*.megamarket.ru/*
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=megamarket.ru
// @homepageURL  https://greasyfork.org/ru/scripts/483156-megamarket-real-price
// @run-at       document-end
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==
((u = d || (d = {})).BASKET = 'BASKET'),    (u.CHECKOUT = 'CHECKOUT'),
    (u.COMMON = 'COMMON'),
    (u.PRODUCT = 'PRODUCT'),
    (u.FAVORITES = 'FAVORITES');
const e = {
        BASKET: '/multicart/',
        CHECKOUT: '/multicart/checkout/',
        PRODUCT: '/catalog/details/',
        FAVORITES: '/personal/favorites/',
    },
    t = {
        BASKET: '.multicart-item__summary',
        CHECKOUT: '.precheck-block',
        COMMON: '[data-product-id]',
        FAVORITES: '[data-product-id]',
        PRODUCT: '.pdp-sales-block .bonus-amount',
    },
    r = {
        INIT_DELAY: 2e3,
        REAL_PRICE_CLASSNAME: 'mrp-real-price',
        MRP_TOOLBAR_CLASSNAME: 'mrp-toolbar',
        CATALOG_WRAPPER_SELECTOR: '.r',
        CATALOG_FILTER_SELECTOR: '.r .filter',
        BASKET_TOTAL_PRICE_SELECTOR: '[class*="__total-price-value"]',
        PRODUCT_SELECTOR: '[id][data-product-id]',
        PRODUCT_PRICE_SELECTOR: '.item-price',
        PRODUCT_OFFERS_SECTIONS: '.product-offers',
        FAVORITES_CATALOG_WRAPPER_SELECTOR: '.personal-listing__container',
        SORT_TOGGLE_KEY: 'sortToggle',
        CURRENT_PAGE_URL_KEY: 'currentPageUrl',
    },
    o = [
        {
            wrapperSelector: '.pdp-sales-block',
            priceSelector: '[class*="__price-final"]',
            bonusSelector: '.bonus-amount',
        },
        {
            wrapperSelector: '.product-list-item-price__money',
            priceSelector: '.amount',
            bonusSelector: '.bonus-amount',
        },
        {
            wrapperSelector: '.product-offer-price',
            priceSelector: '.product-offer-price__amount',
            bonusSelector: '.bonus-amount',
        },
        {
            wrapperSelector: '.goods-item-card__money',
            priceSelector: '.goods-item-card__amount',
            bonusSelector: '.bonus-amount',
        },
        { wrapperSelector: '.item-money', priceSelector: '.item-price', bonusSelector: '.bonus-amount' },
        {
            wrapperSelector: '.multicart-item__summary',
            priceSelector: '.cart-summary-redesign__total-price-value',
            bonusSelector: '.bonus-amount',
        },
        { wrapperSelector: '.cart-item-price', priceSelector: '.price', bonusSelector: '.bonus-amount' },
        {
            wrapperSelector: '.precheck-block',
            priceSelector: '.precheck-block__total-text',
            bonusSelector: '.bonus-amount',
        },
    ],
    a = t => {
        let r = e[t];
        return location.pathname.startsWith(r);
    },
    n = (e, t = 1e4) =>
        new Promise((r, o) => {
            try {
                let o;
                setTimeout(() => {
                    r(null);
                }, t);
                let a = () => {
                    let t = document.querySelector(e);
                    t ? (clearTimeout(o), r(t)) : (o = setTimeout(a, 100));
                };
                a();
            } catch (e) {
                o(e);
            }
        }),
    c =
        e =>
        (...e) => {},
    i = e => +e.replace(/[^0-9.-]+/g, ''),
    l = (e, t = {}, r = [], o = null) => {
        let a = document.createElement(e);
        if ('object' == typeof t) for (let e in t) a.setAttribute(e, t[e]);
        return (
            Array.isArray(r) &&
                r.forEach(e => {
                    a.appendChild('string' == typeof e ? document.createTextNode(e) : e);
                }),
            o && o.appendChild(a),
            a
        );
    },
    s = (e, t) => {
        let r;
        return function (...o) {
            return new Promise(a => {
                clearTimeout(r),
                    (r = setTimeout(() => {
                        (r = null), Promise.resolve(e.apply(this, [...o])).then(a);
                    }, t));
            });
        };
    },
    p = async e => {
        await GM.setValue(r.CURRENT_PAGE_URL_KEY, window.location.href);
        let t = s(async () => {
            let t = await GM.getValue(r.CURRENT_PAGE_URL_KEY),
                o = window.location.href;
            t !== o && (await GM.setValue(r.CURRENT_PAGE_URL_KEY, o), e());
        }, 500);
        new MutationObserver(t).observe(document.body, { childList: !0, subtree: !0 });
    };
var u,
    d,
    m = {};
m =
    '.mrp-button,.mrp-toggle{cursor:pointer;border-radius:4px;justify-content:center;align-items:center;gap:8px;padding:6px 12px;font-size:14px;transition:all .3s ease-out;display:flex}.mrp-button svg{color:var(--pui-text-tertiary);transition:color .3s ease-out}.mrp-button:hover{background-color:#8654cc1a}.mrp-button:hover svg{color:var(--pui-button-primary)}@media screen and (max-width:968px){.mrp-button .text{display:none}}.r .sort-field .field{max-width:210px}.r .filter{margin-left:auto}.mrp-real-price.mrp-real-price.mrp-real-price{letter-spacing:normal;color:#e91e63;font-family:SB Sans Display,sans-serif;font-size:max(80%,16px);line-height:1.4}.mrp-toolbar{gap:16px;margin:0 24px;display:flex}@media screen and (max-width:1200px){.mrp-toolbar{margin-top:-8px;margin-bottom:-8px}}.mrp-toggle{position:relative}.mrp-toggle input,.mrp-toggle input:active{opacity:0;border:0;outline:none;width:0;height:0;position:absolute;left:-5000px}.mrp-toggle .icon{background:#f8f8f8;border:.2em solid #ddd;border-radius:1.6em;width:5.3em;height:3.2em;padding:1em;font-size:7px;transition:all .3s ease-out;display:block;position:relative}.mrp-toggle .icon:before{content:"";text-indent:4em;z-index:2;background:#fff;border-radius:1.4em;width:2.8em;height:2.8em;transition:all .25s ease-in-out;display:block;position:absolute;top:0;left:0;right:auto;box-shadow:0 .3em .3em #0003,0 0 0 .1em #ddd}.mrp-toggle .icon:after{content:"";z-index:1;background:#f8f8f8;border-radius:1.4em;width:2.8em;height:100%;transition:all .25s ease-in-out;display:block;position:absolute;top:0;left:0}.mrp-toggle input:active+.icon:before{width:3.2em}.mrp-toggle input:checked+.icon{border-color:var(--pui-button-primary);box-shadow:inset 0 0 0 2em var(--pui-button-primary)}.mrp-toggle input:checked+.icon:after{background-color:var(--pui-button-primary);width:100%;right:1.4em}.mrp-toggle input:checked+.icon:before{left:calc(100% - 2.8em);box-shadow:0 0 0 .1em #0000,0 .3em .3em #0000004d}.mrp-toggle input:checked:active+.icon:before{left:calc(100% - 3.2em)}@media screen and (max-width:968px){.mrp-toggle .text{display:none}}';
const E = () => {
        document.head.insertAdjacentHTML('beforeend', `<style type="text/css" id="mrpStyles">${m}</style>`);
    },
    S = c(!1),
    h = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }),
    R = e => {
        let {
            wrapperEl: t,
            priceSelector: o = '.item-price',
            bonusSelector: a = '.bonus-amount',
            realPriceClassName: n,
        } = e;
        S('---- wrapperEl', t);
        let c = t.querySelector(o),
            s = t.querySelector(a),
            p = t.querySelector(`.${n}`);
        if ((S('---- priceEl', o, c), S('---- bonusEl', a, s), S('---- realPriceEl', p), !c || !s)) {
            S('setRealPrice cancel');
            return;
        }
        let u = i(c.firstChild.textContent.trim()),
            d = i(s.firstChild.textContent.trim());
        S('---- priceValue', u), S('---- bonusValue', d);
        let m = +u - +d;
        S('---- newPriceValue', m);
        let E = ` (${h.format(m)})`;
        if ((S('---- newPriceFormatted', E), p)) (p.textContent = E), S('---- realPriceEl', p);
        else {
            let e = l('span', { class: n, 'data-parent-id': c.closest(r.PRODUCT_SELECTOR)?.id }, [E]);
            S('---- newPriceEl', e), c.append(e);
        }
        S('setRealPrice end');
    },
    T = async () => {
        o.forEach(({ wrapperSelector: e, priceSelector: t, bonusSelector: o }) => {
            document.querySelectorAll(e).forEach(e => {
                R({ wrapperEl: e, priceSelector: t, bonusSelector: o, realPriceClassName: r.REAL_PRICE_CLASSNAME });
            });
        });
    },
    g = async () => {
        await T();
    };
class y {
    constructor({ pageType: e, pageReadyElementSelector: t, onPreparePage: r, onRun: o }) {
        (this.run = async () => {
            try {
                await n(this._pageReadyElementSelector), await this.onPreparePage?.(), await this.onRun();
            } catch (e) {}
        }),
            (this._pageType = e),
            (this._pageReadyElementSelector = t),
            (this.onPreparePage = r),
            (this.onRun = o);
    }
}
const C = async () => {
        let e = document.querySelector(r.BASKET_TOTAL_PRICE_SELECTOR);
        new MutationObserver(([e]) => {
            let t = e.target.textContent.trim();
            e.oldValue !== t && g();
        }).observe(e, { characterData: !0, attributes: !1, childList: !1, subtree: !0, characterDataOldValue: !0 });
    },
    b = async () => {
        g();
    },
    _ = new y({ pageType: d.BASKET, pageReadyElementSelector: t.BASKET, onPreparePage: C, onRun: b }),
    O = c(!1),
    A = e => {
        if (!e) return;
        let t = e.querySelector(`.${r.REAL_PRICE_CLASSNAME}`)?.textContent,
            o = e.querySelector(r.PRODUCT_PRICE_SELECTOR)?.textContent,
            a = i(t || o);
        return O('realPrice', t), O('price', o), O('resultPrice', a), a;
    },
    f = (e, t) =>
        (O('sort a', e), O('sort b', t), e.hasAttribute('data-product-id'))
            ? t.hasAttribute('data-product-id')
                ? A(e) - A(t)
                : -1
            : 1,
    w = () => {
        let e = document.querySelector(r.PRODUCT_SELECTOR);
        if (!e) return;
        let t = e.parentElement;
        Array.from(t.children)
            .sort(f)
            .forEach(e => t.append(e));
    },
    P = async e => {
        let t = e.target.checked;
        t && w(), await GM.setValue(r.SORT_TOGGLE_KEY, t);
    },
    L = async () => {
        (await GM.getValue(r.SORT_TOGGLE_KEY)) && w();
    };
let x = '';
const v = s(async e => {
        let t = document.querySelector(r.PRODUCT_SELECTOR);
        t && x !== t.id && ((x = t.id), e());
    }, 300),
    k = async (e, t) => {
        try {
            (x = ''),
                new MutationObserver(async () => {
                    v(t);
                }).observe(e, { childList: !0, subtree: !0 });
        } catch (e) {}
    },
    M = ({ text: e, attrs: t, icon: r, onClick: o }) => {
        let a = e ? [l('span', { class: 'text' }, [e])] : [],
            n = l('button', { class: 'mrp-button', ...t }, a);
        return r && n.insertAdjacentHTML('afterbegin', r), o && n.addEventListener('click', o), n;
    },
    U = ({ text: e, attrs: t, checked: r, onChange: o }) => {
        let a = l('input', r ? { type: 'checkbox', checked: r } : { type: 'checkbox' }),
            n = l('span', { class: 'icon' }),
            c = l('span', { class: 'text' }, [e]),
            i = l('label', { class: 'mrp-toggle', ...t }, [a, n, c]);
        return o && a.addEventListener('change', o), i;
    },
    G = () => {
        let e = document.querySelector(r.CATALOG_FILTER_SELECTOR),
            t = l('div', { class: r.MRP_TOOLBAR_CLASSNAME }, []);
        e.before(t);
    },
    I = async () => {
        try {
            let e = document.querySelector(`.${r.MRP_TOOLBAR_CLASSNAME}`),
                t = await GM.getValue(r.SORT_TOGGLE_KEY),
                o = U({
                    checked: t,
                    text: 'Автосортировка',
                    attrs: { title: 'Вкл/Выкл автоматической сортировки по "красным" ценникам' },
                    onChange: P,
                }),
                a = M({
                    text: 'Ручная сортировка',
                    attrs: { title: 'Ручная сортировка по "красным" ценникам' },
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g clip-path="url(#a)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h9m-9 6h7m-7 6h7m4-3 3 3m0 0 3-3m-3 3V6"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>',
                    onClick: w,
                }),
                n = M({
                    text: 'Пересчет цен',
                    attrs: { title: 'Ручной запуск подсчета цен с учетом бонусов' },
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 10.89c-1.26-.33-1.66-.67-1.66-1.2 0-.6.56-1.02 1.5-1.02.99 0 1.35.47 1.38 1.16h1.23a2.21 2.21 0 0 0-1.78-2.11V6.5h-1.67v1.2c-1.07.24-1.94.93-1.94 2 0 1.29 1.07 1.93 2.61 2.3 1.4.33 1.67.82 1.67 1.34 0 .38-.27 1-1.5 1-1.15 0-1.6-.52-1.66-1.17H9c.07 1.21.98 1.9 2.04 2.12v1.21h1.67v-1.2c1.08-.2 1.94-.83 1.94-1.97 0-1.57-1.35-2.11-2.6-2.44Z"/><path fill="currentColor" d="M4.56 16.13a.7.7 0 0 1-.62-.4A8.78 8.78 0 0 1 5.58 5.58a8.8 8.8 0 0 1 12.44 0 .7.7 0 0 1-.99 1A7.4 7.4 0 0 0 5.19 15.1a.7.7 0 0 1-.62 1.02Zm7.24 4.46a8.77 8.77 0 0 1-6.22-2.57.7.7 0 0 1 1-1A7.4 7.4 0 0 0 18.4 8.48a.7.7 0 1 1 1.26-.63 8.8 8.8 0 0 1-7.87 12.74Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 17-2.8.5c-.05 0-.1.02-.14.05a.39.39 0 0 0-.1.12.45.45 0 0 0-.07.16.5.5 0 0 0 0 .17l.57 3.21M15.35 6.96l2.8-.5c.05 0 .1-.02.14-.05a.39.39 0 0 0 .1-.12c.03-.05.05-.1.06-.16a.5.5 0 0 0 0-.17l-.56-3.21"/></svg>',
                    onClick: g,
                });
            e.append(o, a, n);
        } catch (e) {}
    },
    K = async () => {
        await g(), await L();
    },
    N = async () => {
        let e = document.querySelector(r.CATALOG_WRAPPER_SELECTOR),
            t = document.querySelector(r.CATALOG_FILTER_SELECTOR),
            o = document.querySelector(`.${r.MRP_TOOLBAR_CLASSNAME}`);
        e && k(e, K), t && !o && (G(), I());
    },
    V = async () => {
        try {
            let e = document.querySelector(r.CATALOG_WRAPPER_SELECTOR);
            await g(), e && (await L());
        } catch (e) {}
    },
    D = new y({ pageType: d.COMMON, pageReadyElementSelector: t.COMMON, onPreparePage: N, onRun: V }),
    q = s(g, 300),
    F = async () => {
        let e = document.querySelector(t.CHECKOUT);
        new MutationObserver(q).observe(e, { childList: !0, subtree: !0 });
    },
    B = async () => {
        g();
    },
    H = new y({ pageType: d.CHECKOUT, pageReadyElementSelector: t.CHECKOUT, onPreparePage: F, onRun: B }),
    Y = async () => {
        let e = document.querySelector(r.FAVORITES_CATALOG_WRAPPER_SELECTOR);
        e && k(e, g);
    },
    j = async () => {
        g();
    },
    z = new y({ pageType: d.FAVORITES, pageReadyElementSelector: t.FAVORITES, onPreparePage: Y, onRun: j }),
    W = s(g, 300),
    $ = async () => {
        let e = document.querySelector(r.PRODUCT_OFFERS_SECTIONS);
        e && new MutationObserver(W).observe(e, { childList: !0, subtree: !0 });
    },
    Z = async () => {
        g();
    },
    J = new y({ pageType: d.PRODUCT, pageReadyElementSelector: t.PRODUCT, onPreparePage: $, onRun: Z }),
    Q = async () => {
        if (a(d.PRODUCT)) {
            J.run();
            return;
        }
        if (a(d.CHECKOUT)) {
            H.run();
            return;
        }
        if (a(d.BASKET)) {
            _.run();
            return;
        }
        if (a(d.FAVORITES)) {
            z.run();
            return;
        }
        D.run();
    },
    X = e => {
        document.onvisibilitychange = () => {
            'visible' === document.visibilityState && e();
        };
    },
    ee = () => {
        E(), Q(), p(Q), X(Q);
    };
try {
    window.onload = () => {
        setTimeout(ee, r.INIT_DELAY);
    };
} catch (e) {}
