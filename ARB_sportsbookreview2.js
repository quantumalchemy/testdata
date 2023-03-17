! function () {
    "use strict";
    var e = function () {
            document.getElementsByClassName("sbr-calculator-result-section")[0].hasAttribute("style") && (document.getElementsByClassName("sbr-calculator-result-section")[0].style.height = "auto")
        },
        t = document.getElementById("numberOfBets"),
        n = document.getElementsByClassName("lines")[0],
        a = document.getElementsByClassName("bets")[0],
        l = function () {
            document.querySelectorAll(".input-line")
                .forEach((function (e) {
                    e.addEventListener("blur", (function (e) {
                        d(e.currentTarget), m()
                    }))
                }))
        },
        u = function () {
            var n = t.value;
            e(), r(n), l(), m()
        },
        r = function (e) {
            var t = Array.from({
                    length: e
                }, (function (e, t) {
                    return t + 1
                }))
                .map((function (e) {
                    return "<div class='calc-row col-12 form-floating'>\n      <input id='line".concat(e, "' class='form-control input-line' type='text' value='")
                        .concat(document.getElementById("line".concat(e)) ? document.getElementById("line".concat(e))
                            .value : "-110.00", "'>\n      <label for='line")
                        .concat(e, "'>Line #")
                        .concat(e, "</label>\n    </div>")
                }));
            n.innerHTML = t.join("");
            var l, u, r, c = (l = 2, u = e, r = 1, Array.from({
                    length: (u - l) / r + 1
                }, (function (e, t) {
                    return l + t * r
                })))
                .map((function (e) {
                    return "<div class='results-row'>\n      <span>Bet #".concat(e, "</span>\n      <span class='result-bet' id='result-bet'>--</span>\n    </div>")
                }));
            a.innerHTML = c.join("")
        };

    function c(e) {
        return e = parseFloat(e), Math.abs(e) < 100 || isNaN(e) ? 1.91 : e > 0 ? 1 + e / 100 : 1 - 100 / e
    }

    function o(e) {
        var t = {
                $: "",
                ",": ""
            },
            n = (e = "" + e)
            .replace(/[$,]/g, (function (e) {
                return t[e]
            }));
        return isNaN(n) ? 0 : 1 * n
    }

    function i(e, t) {
        return null == t && (t = 2), (e = o(e)) < 0 ? "-$" + s((-1 * e)
            .toFixed(t)) : "$" + s((1 * e)
            .toFixed(t))
    }

    function s(e) {
        for (var t = (e += "")
                .split("."), n = t[0], a = t.length > 1 ? "." + t[1] : "", l = /(\d+)(\d{3})/; l.test(n);) n = n.replace(l, "$1,$2");
        return n + a
    }

    function d(e) {
        e.value = e.value.replace("[/ ]+", " ");
        var t = e.value.split(" ");
        e.value = t[0];
        var n = t[1];
        isNaN(e.value) && (e.value = -110), Math.abs(e.value) < 100 || 0 == e.value.indexOf("0") || 0 == e.value.indexOf("d") || 0 == e.value.indexOf("D") ? e.value = function (e) {
            var t;
            t = (e = parseFloat(e)) <= 1 || isNaN(e) ? -110 : e < 2 ? -100 / (e - 1) : 100 * (e - 1);
            return (t > 0 ? "+" : "") + t.toFixed(2)
        }(e.value.replace(/^(0|d)/i, "")) : 1 * e.value > 0 && (e.value = "+" + (1 * e.value)
            .toFixed(2)), null != n && (e.value = function (e, t) {
            t = t.toString()
                .indexOf("%") > -1 ? Math.abs(parseFloat(t) / 100) : Math.abs(parseFloat(t));
            return t < 1 ? c(e) * (1 - t) + t : e
        }(e.value, n), d(e))
    }

    function m() {
        for (var e = t.value, n = document.getElementsByClassName("result-bet"), a = Array.from({
                    length: t.value
                }, (function (e, t) {
                    return t + 1
                }))
                .map((function (e) {
                    return document.getElementById("line".concat(e))
                        .value
                })), l = o(document.getElementById("bet")
                    .value), u = c(a[0]), r = l * u, s = l * (u - 1), d = l, m = 1; m < e; m++) {
            var v = r / c(a[m]);
            n[m].innerHTML = i(v), s -= v, d += v
        }
        var f, g = s / d;
        document.getElementById("result-total-bet")
            .innerHTML = i(d), document.getElementById("result-profit")
            .innerHTML = i(s), document.getElementById("result-profit-porcentage")
            .innerHTML = (f = g, isNaN(f) ? 0 : (100 * f)
                .toFixed(4) + "%")
    }
    document.getElementById("bet")
        .addEventListener("blur", (function (e) {
            e.currentTarget.value = i(e.currentTarget.value), m()
        })), l(), t.addEventListener("change", (function (e) {
            u(e)
        })), document.getElementById("calculate")
        .addEventListener("click", (function () {
            //  ** m() ** calculate
            m(), document.getElementById("calculate")
                .hasAttribute("data-toggle") ? (document.getElementById("calculate")
                    .removeAttribute("data-toggle"), document.getElementById("calculate")
                    .removeAttribute("data-target")) : document.getElementsByClassName("calculator-results-wrapper")[0].style.height = "auto", document.getElementsByClassName("calculator-results-wrapper")[0].classList.remove("hide")
        }))
}();
