(function () {
  /* 
 
    Copyright The Closure Library Authors. 
    SPDX-License-Identifier: Apache-2.0 
   */

  var aa =
    "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        };
  function ba(a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(this);
  function da(a, b) {
    if (b) {
      var c = ca;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d &&
        null != b &&
        aa(c, a, { configurable: !0, writable: !0, value: b });
    }
  }
  da("Object.values", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b)
            Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
          return c;
        };
  });
  var k = this || self,
    ea = /^[\w+/_-]+[=]{0,2}$/,
    n = null;
  function ha(a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) &&
      (a = a.nonce || a.getAttribute("nonce")) &&
      ea.test(a)
      ? a
      : "";
  }
  function q(a) {
    return a;
  }
  function r(a) {
    a = parseFloat(a);
    return isNaN(a) || 1 < a || 0 > a ? 0 : a;
  }
  function ia(a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  var ja = Array.prototype.some
    ? function (a, b) {
        return Array.prototype.some.call(a, b, void 0);
      }
    : function (a, b) {
        for (
          var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
          e < c;
          e++
        )
          if (e in d && b.call(void 0, d[e], e, a)) return !0;
        return !1;
      };
  var t;
  function u(a, b) {
    this.b = (a === ka && b) || "";
    this.a = la;
  }
  var la = {};
  function ma(a) {
    if (void 0 === t) {
      var b = null;
      var c = k.trustedTypes;
      if (c && c.createPolicy) {
        try {
          b = c.createPolicy("goog#html", {
            createHTML: q,
            createScript: q,
            createScriptURL: q,
          });
        } catch (d) {
          k.console && k.console.error(d.message);
        }
        t = b;
      } else t = b;
    }
    a = (b = t) ? b.createScriptURL(a) : a;
    return new u(ka, a);
  }
  var ka = {};
  var x;
  a: {
    var na = k.navigator;
    if (na) {
      var oa = na.userAgent;
      if (oa) {
        x = oa;
        break a;
      }
    }
    x = "";
  }
  function pa(a, b) {
    a.src =
      b instanceof u && b.constructor === u && b.a === la
        ? b.b
        : "type_error:TrustedResourceUrl";
    (b = a.ownerDocument && a.ownerDocument.defaultView) && b != k
      ? (b = ha(b.document))
      : (null === n && (n = ha(k.document)), (b = n));
    b && a.setAttribute("nonce", b);
  }
  function y(a) {
    y[" "](a);
    return a;
  }
  y[" "] = function () {};
  function qa(a) {
    var b = document;
    a = String(a);
    "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
    return b.createElement(a);
  }
  var ra = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
  function sa(a) {
    var b = a.match(ra);
    a = b[5];
    var c = b[6];
    b = b[7];
    var d = "";
    a && (d += a);
    c && (d += "?" + c);
    b && (d += "#" + b);
    return d;
  }
  function z(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
      var f = a.charCodeAt(b - 1);
      if (38 == f || 63 == f)
        if (((f = a.charCodeAt(b + e)), !f || 61 == f || 38 == f || 35 == f))
          return b;
      b += e + 1;
    }
    return -1;
  }
  var A = /#|$/;
  function B(a, b) {
    var c = a.search(A),
      d = z(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "));
  }
  var ta = /[?&]($|#)/;
  function C(a, b, c) {
    for (var d = a.search(A), e = 0, f, g = []; 0 <= (f = z(a, e, b, d)); )
      g.push(a.substring(e, f)), (e = Math.min(a.indexOf("&", f) + 1 || d, d));
    g.push(a.substr(e));
    a = g.join("").replace(ta, "$1");
    c = null != c ? "=" + encodeURIComponent(String(c)) : "";
    (b += c)
      ? ((c = a.indexOf("#")),
        0 > c && (c = a.length),
        (d = a.indexOf("?")),
        0 > d || d > c ? ((d = c), (e = "")) : (e = a.substring(d + 1, c)),
        (c = [a.substr(0, d), e, a.substr(c)]),
        (a = c[1]),
        (c[1] = b ? (a ? a + "&" + b : b) : a),
        (b = c[0] + (c[1] ? "?" + c[1] : "") + c[2]))
      : (b = a);
    return b;
  }
  function ua() {
    if (!k.crypto) return Math.random();
    try {
      var a = new Uint32Array(1);
      k.crypto.getRandomValues(a);
      return a[0] / 65536 / 65536;
    } catch (b) {
      return Math.random();
    }
  }
  function va(a, b) {
    if (a)
      for (var c in a)
        Object.prototype.hasOwnProperty.call(a, c) &&
          b.call(void 0, a[c], c, a);
  }
  var xa = ia(function () {
      return (
        ja(
          [
            "Google Web Preview",
            "Mediapartners-Google",
            "Google-Read-Aloud",
            "Google-Adwords",
          ],
          wa
        ) || 1e-4 > Math.random()
      );
    }),
    ya = ia(function () {
      return -1 != x.indexOf("MSIE");
    });
  function wa(a) {
    return -1 != x.indexOf(a);
  }
  var za = r("0.20"),
    Aa = r("0.002"),
    Ba = r("0.00"),
    Ca = r("0.00"),
    Da = /^true$/.test("false"),
    Ea = /^true$/.test("true"),
    Fa = /^true$/.test("true");
  var D = null;
  function Ga() {
    if (null === D) {
      D = "";
      try {
        var a = "";
        try {
          a = k.top.location.hash;
        } catch (c) {
          a = k.location.hash;
        }
        if (a) {
          var b = a.match(/\bdeid=([\d,]+)/);
          D = b ? b[1] : "";
        }
      } catch (c) {}
    }
    return D;
  }
  function E(a, b, c) {
    var d = F;
    if (c ? d.a.hasOwnProperty(c) && "" == d.a[c] : 1) {
      var e;
      e = (e = Ga())
        ? (e = e.match(new RegExp("\\b(" + a.join("|") + ")\\b")))
          ? e[0]
          : null
        : null;
      if (e) a = e;
      else
        a: {
          if (!ya() && !xa() && ((e = Math.random()), e < b)) {
            e = ua();
            a = a[Math.floor(e * a.length)];
            break a;
          }
          a = null;
        }
      a &&
        "" != a &&
        (c ? d.a.hasOwnProperty(c) && (d.a[c] = a) : (d.b[a] = !0));
    }
  }
  function G(a) {
    var b = F;
    return b.a.hasOwnProperty(a) ? b.a[a] : "";
  }
  function Ha() {
    var a = F,
      b = [];
    va(a.b, function (c, d) {
      b.push(d);
    });
    va(a.a, function (c) {
      "" != c && b.push(c);
    });
    return b;
  }
  var Ia = { s: 2, D: 13, C: 14, v: 16, u: 17 },
    F = null;
  function H() {
    return !!F && "592230571" == G(16);
  }
  var I = window,
    Ja = document;
  var J = {};
  function K(a) {
    J.TAGGING = J.TAGGING || [];
    J.TAGGING[a] = !0;
  }
  function Ka(a, b) {
    if (Array.prototype.indexOf)
      return (a = a.indexOf(b)), "number" == typeof a ? a : -1;
    for (var c = 0; c < a.length; c++) if (a[c] === b) return c;
    return -1;
  }
  function La(a, b) {
    for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
  }
  var L = [];
  function M() {
    var a = {};
    var b = I.google_tag_data;
    I.google_tag_data = void 0 === b ? a : b;
    a = I.google_tag_data;
    a.ics ||
      (a.ics = {
        entries: {},
        set: Ma,
        update: Na,
        addListener: Oa,
        notifyListeners: Pa,
        active: !1,
      });
    return a.ics;
  }
  function Ma(a, b, c, d, e, f) {
    var g = M();
    g.active = !0;
    if (void 0 != b) {
      var h = g.entries;
      g = h[a] || {};
      var l = g.region;
      c = c && "string" == typeof c ? c.toUpperCase() : void 0;
      d = d.toUpperCase();
      e = e.toUpperCase();
      if (c === e || (c === d ? l !== e : !c && !l)) {
        d = !!(f && 0 < f && void 0 === g.update);
        var m = {
          region: c,
          initial: "granted" === b,
          update: g.update,
          quiet: d,
        };
        h[a] = m;
        d &&
          I.setTimeout(function () {
            h[a] === m && m.quiet && ((m.quiet = !1), N(a), Pa(), K(2));
          }, f);
      }
    }
  }
  function Na(a, b) {
    var c = M();
    c.active = !0;
    if (void 0 != b) {
      var d = O(a);
      c = c.entries;
      c = c[a] = c[a] || {};
      c.update = "granted" === b;
      b = O(a);
      c.quiet ? ((c.quiet = !1), N(a)) : b !== d && N(a);
    }
  }
  function Oa(a, b) {
    L.push({ g: a, i: b });
  }
  function N(a) {
    for (var b = 0; b < L.length; ++b) {
      var c = L[b];
      "[object Array]" == Object.prototype.toString.call(Object(c.g)) &&
        -1 !== c.g.indexOf(a) &&
        (c.h = !0);
    }
  }
  function Pa() {
    for (var a = 0; a < L.length; ++a) {
      var b = L[a];
      if (b.h) {
        b.h = !1;
        try {
          b.i.call();
        } catch (c) {}
      }
    }
  }
  function O(a) {
    a = M().entries[a] || {};
    return void 0 !== a.update
      ? a.update
      : void 0 !== a.initial
      ? a.initial
      : void 0;
  }
  function P(a) {
    return !(M().entries[a] || {}).quiet;
  }
  function Qa(a, b) {
    M().addListener(a, b);
  }
  function Ra(a) {
    function b() {
      for (var e = 0; e < c.length; e++) if (!P(c[e])) return !0;
      return !1;
    }
    var c = ["ad_storage"];
    if (b()) {
      var d = !1;
      Qa(c, function () {
        d || b() || ((d = !0), a());
      });
    } else a();
  }
  function Sa(a) {
    if (!1 === O("ad_storage")) {
      var b = !1;
      Qa(["ad_storage"], function () {
        !b && O("ad_storage") && (a(), (b = !0));
      });
    }
  }
  var Q = /:[0-9]+$/;
  function Ta(a, b) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].split("=");
      if (decodeURIComponent(d[0]).replace(/\+/g, " ") === b)
        return decodeURIComponent(d.slice(1).join("=")).replace(/\+/g, " ");
    }
  }
  function Ua(a, b) {
    var c = "query";
    if ("protocol" === c || "port" === c)
      a.protocol = Va(a.protocol) || Va(I.location.protocol);
    "port" === c
      ? (a.port = String(
          Number(a.hostname ? a.port : I.location.port) ||
            ("http" == a.protocol ? 80 : "https" == a.protocol ? 443 : "")
        ))
      : "host" === c &&
        (a.hostname = (a.hostname || I.location.hostname)
          .replace(Q, "")
          .toLowerCase());
    var d = Va(a.protocol);
    c && (c = String(c).toLowerCase());
    switch (c) {
      case "url_no_fragment":
        b = "";
        a &&
          a.href &&
          ((b = a.href.indexOf("#")),
          (b = 0 > b ? a.href : a.href.substr(0, b)));
        a = b;
        break;
      case "protocol":
        a = d;
        break;
      case "host":
        a = a.hostname.replace(Q, "").toLowerCase();
        break;
      case "port":
        a = String(
          Number(a.port) || ("http" == d ? 80 : "https" == d ? 443 : "")
        );
        break;
      case "path":
        a.pathname || a.hostname || K(1);
        a = "/" == a.pathname.charAt(0) ? a.pathname : "/" + a.pathname;
        a = a.split("/");
        0 <= Ka([], a[a.length - 1]) && (a[a.length - 1] = "");
        a = a.join("/");
        break;
      case "query":
        a = a.search.replace("?", "");
        b && (a = Ta(a, b));
        break;
      case "extension":
        a = a.pathname.split(".");
        a = 1 < a.length ? a[a.length - 1] : "";
        a = a.split("/")[0];
        break;
      case "fragment":
        a = a.hash.replace("#", "");
        break;
      default:
        a = a && a.href;
    }
    return a;
  }
  function Va(a) {
    return a ? a.replace(":", "").toLowerCase() : "";
  }
  var Wa = {};
  function Xa(a) {
    return void 0 == Wa[a] ? !1 : Wa[a];
  }
  function Ya(a, b, c, d) {
    if (Za(d)) {
      d = [];
      b = String(b || document.cookie).split(";");
      for (var e = 0; e < b.length; e++) {
        var f = b[e].split("="),
          g = f[0].replace(/^\s*|\s*$/g, "");
        g &&
          g == a &&
          ((f = f
            .slice(1)
            .join("=")
            .replace(/^\s*|\s*$/g, "")) &&
            c &&
            (f = decodeURIComponent(f)),
          d.push(f));
      }
      a = d;
    } else a = [];
    return a;
  }
  function $a(a, b, c, d) {
    var e = document.cookie;
    document.cookie = a;
    a = document.cookie;
    return e != a || (void 0 != c && 0 <= Ya(b, a, !1, d).indexOf(c));
  }
  function ab(a, b, c) {
    function d(v, w, fa) {
      if (null == fa) return delete g[w], v;
      g[w] = fa;
      return v + "; " + w + "=" + fa;
    }
    function e(v, w) {
      if (null == w) return delete g[w], v;
      g[w] = !0;
      return v + "; " + w;
    }
    if (Za(c.c)) {
      if (void 0 == b)
        var f = a + "=deleted; expires=" + new Date(0).toUTCString();
      else
        c.encode && (b = encodeURIComponent(b)), (b = bb(b)), (f = a + "=" + b);
      var g = {};
      f = d(f, "path", c.path);
      if (c.expires instanceof Date) var h = c.expires.toUTCString();
      else null != c.expires && (h = c.expires);
      f = d(f, "expires", h);
      f = d(f, "max-age", c.G);
      f = d(f, "samesite", c.H);
      c.I && (f = e(f, "secure"));
      h = c.domain;
      if ("auto" === h) {
        h = cb();
        for (var l = 0; l < h.length; ++l) {
          var m = "none" !== h[l] ? h[l] : void 0,
            p = d(f, "domain", m);
          p = e(p, c.flags);
          if (!db(m, c.path) && $a(p, a, b, c.c)) break;
        }
      } else
        h && "none" !== h && (f = d(f, "domain", h)),
          (f = e(f, c.flags)),
          db(h, c.path) || $a(f, a, b, c.c);
    }
  }
  function bb(a) {
    a && 1200 < a.length && (a = a.substring(0, 1200));
    return a;
  }
  var eb = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
    fb = /(^|\.)doubleclick\.net$/i;
  function db(a, b) {
    return fb.test(document.location.hostname) || ("/" === b && eb.test(a));
  }
  function cb() {
    var a = [],
      b = document.location.hostname.split(".");
    if (4 === b.length) {
      var c = b[b.length - 1];
      if (parseInt(c, 10).toString() === c) return ["none"];
    }
    for (c = b.length - 2; 0 <= c; c--) a.push(b.slice(c).join("."));
    b = document.location.hostname;
    fb.test(b) || eb.test(b) || a.push("none");
    return a;
  }
  function Za(a) {
    if (!Xa("gtag_cs_api") || !a || !M().active) return !0;
    if (!P(a)) return !1;
    a = O(a);
    return null == a ? !0 : !!a;
  }
  function gb(a, b) {
    var c,
      d = a.F;
    null == d && (d = 7776e3);
    0 !== d && (c = new Date((b || new Date().getTime()) + 1e3 * d));
    return {
      path: a.path,
      domain: a.domain,
      flags: a.flags,
      encode: !0,
      expires: c,
    };
  }
  var hb = /^\w+$/,
    ib = /^[\w-]+$/,
    jb = /^~?[\w-]+$/,
    kb = { aw: "_aw", dc: "_dc", gf: "_gf", ha: "_ha", gp: "_gp" };
  function lb() {
    if (!Xa("gtag_cs_api") || !M().active) return !0;
    var a = O("ad_storage");
    return null == a ? !0 : !!a;
  }
  function mb(a, b) {
    P("ad_storage")
      ? lb()
        ? a()
        : Sa(a)
      : b
      ? K(3)
      : Ra(function () {
          mb(a, !0);
        });
  }
  function nb(a, b) {
    var c = [];
    if (!a.cookie) return c;
    a = Ya(b, a.cookie, void 0, "ad_storage");
    if (!a || 0 == a.length) return c;
    for (b = 0; b < a.length; b++) {
      var d = ob(a[b]);
      d && -1 === Ka(c, d) && c.push(d);
    }
    return pb(c);
  }
  function qb(a) {
    return a && "string" == typeof a && a.match(hb) ? a : "_gcl";
  }
  function rb() {
    var a = I.location.href,
      b = Ja.createElement("a");
    a && (b.href = a);
    var c = b.pathname;
    "/" !== c[0] && (a || K(1), (c = "/" + c));
    a = b.hostname.replace(Q, "");
    var d = {
      href: b.href,
      protocol: b.protocol,
      host: b.host,
      hostname: a,
      pathname: c,
      search: b.search,
      hash: b.hash,
      port: b.port,
    };
    b = Ua(d, "gclid");
    c = Ua(d, "gclsrc");
    a = Ua(d, "dclid");
    (b && c) ||
      ((d = d.hash.replace("#", "")),
      (b = b || Ta(d, "gclid")),
      (c = c || Ta(d, "gclsrc")));
    return sb(b, c, a);
  }
  function sb(a, b, c) {
    function d(f, g) {
      e[g] || (e[g] = []);
      e[g].push(f);
    }
    var e = {};
    e.gclid = a;
    e.gclsrc = b;
    e.dclid = c;
    if (void 0 !== a && a.match(ib))
      switch (b) {
        case void 0:
          d(a, "aw");
          break;
        case "aw.ds":
          d(a, "aw");
          d(a, "dc");
          break;
        case "ds":
          d(a, "dc");
          break;
        case "3p.ds":
          Xa("gtm_3pds") && d(a, "dc");
          break;
        case "gf":
          d(a, "gf");
          break;
        case "ha":
          d(a, "ha");
          break;
        case "gp":
          d(a, "gp");
      }
    c && d(c, "dc");
    return e;
  }
  function tb() {
    var a = {},
      b = rb();
    mb(function () {
      return ub(b, a);
    });
  }
  function ub(a, b, c) {
    function d(m) {
      return ["GCL", l, m].join(".");
    }
    function e(m, p) {
      m = kb[m];
      m = void 0 !== m ? f + m : void 0;
      m &&
        (null == g.path && (g.path = "/"),
        g.domain || (g.domain = "auto"),
        ab(m, p, g),
        (h = !0));
    }
    b = b || {};
    var f = qb(b.prefix);
    c = c || new Date().getTime();
    var g = gb(b, c);
    g.c = "ad_storage";
    var h = !1,
      l = Math.round(c / 1e3);
    a.aw && (!0 === b.J ? e("aw", d("~" + a.aw[0])) : e("aw", d(a.aw[0])));
    a.dc && e("dc", d(a.dc[0]));
    a.gf && e("gf", d(a.gf[0]));
    a.ha && e("ha", d(a.ha[0]));
    a.gp && e("gp", d(a.gp[0]));
    return h;
  }
  function ob(a) {
    a = a.split(".");
    if (3 == a.length && "GCL" == a[0] && a[1]) return a[2];
  }
  function pb(a) {
    return a.filter(function (b) {
      return jb.test(b);
    });
  }
  function vb() {
    for (
      var a = ["aw"], b = {}, c = qb(b.prefix), d = {}, e = 0;
      e < a.length;
      e++
    )
      kb[a[e]] && (d[a[e]] = kb[a[e]]);
    mb(function () {
      La(d, function (f, g) {
        g = Ya(c + g, Ja.cookie, void 0, "ad_storage");
        if (g.length) {
          g = g[0];
          var h = g.split(".");
          h = 3 !== h.length || "GCL" !== h[0] ? 0 : 1e3 * (Number(h[1]) || 0);
          var l = {};
          l[f] = [ob(g)];
          ub(l, b, h);
        }
      });
    });
  }
  var wb = /^UA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*(?:%3BUA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*)*$/,
    xb = /^~?[\w-]+(?:\.~?[\w-]+)*$/,
    yb = /^\d+\.fls\.doubleclick\.net$/,
    zb = /;gac=([^;?]+)/,
    Ab = /;gclaw=([^;?]+)/;
  function Bb(a, b) {
    if (yb.test(a.location.host)) {
      if ((a = a.location.href.match(Ab)) && 2 == a.length && a[1].match(xb))
        return a[1];
    } else if (((a = nb(a, (b || "_gcl") + "_aw")), 0 < a.length))
      return a.join(".");
    return "";
  }
  function Cb(a) {
    0 !== nb(document, "_gcl_aw").length ||
      (a && 0 !== nb(document, a + "_aw").length) ||
      (tb(), vb());
  }
  function Db(a) {
    var b = k.performance;
    return (b && b.timing && b.timing[a]) || 0;
  }
  var Eb = { A: 0, l: 1, B: 2, o: 3, m: 4 };
  function R() {
    this.a = {};
  }
  function Fb(a, b, c) {
    "number" === typeof c && 0 < c && (a.a[b] = Math.round(c));
  }
  function Gb(a) {
    var b = R.a();
    var c = void 0 === c ? k : c;
    c = c.performance;
    Fb(b, a, c && c.now ? c.now() : null);
  }
  function Hb() {
    function a() {
      return Fb(b, 0, Db("loadEventStart") - Db("navigationStart"));
    }
    var b = R.a();
    0 != Db("loadEventStart") ? a() : window.addEventListener("load", a);
  }
  function Ib() {
    var a = R.a();
    return Object.values(Eb).map(function (b) {
      return [b, a.a[b] || 0];
    });
  }
  R.b = void 0;
  R.a = function () {
    return R.b ? R.b : (R.b = new R());
  };
  function Jb(a, b, c) {
    a = Kb(a, !0);
    if (a[b]) return !1;
    a[b] = [];
    a[b][0] = c;
    return !0;
  }
  function Kb(a, b) {
    var c = a.GooglebQhCsO;
    c || ((c = {}), b && (a.GooglebQhCsO = c));
    return c;
  }
  var Lb = {},
    S = null;
  function Mb(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      255 < e && ((b[c++] = e & 255), (e >>= 8));
      b[c++] = e;
    }
    a = 4;
    void 0 === a && (a = 0);
    if (!S)
      for (
        S = {},
          c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
            ""
          ),
          d = ["+/=", "+/", "-_=", "-_.", "-_"],
          e = 0;
        5 > e;
        e++
      ) {
        var f = c.concat(d[e].split(""));
        Lb[e] = f;
        for (var g = 0; g < f.length; g++) {
          var h = f[g];
          void 0 === S[h] && (S[h] = g);
        }
      }
    a = Lb[a];
    c = [];
    for (d = 0; d < b.length; d += 3) {
      var l = b[d],
        m = (e = d + 1 < b.length) ? b[d + 1] : 0;
      h = (f = d + 2 < b.length) ? b[d + 2] : 0;
      g = l >> 2;
      l = ((l & 3) << 4) | (m >> 4);
      m = ((m & 15) << 2) | (h >> 6);
      h &= 63;
      f || ((h = 64), e || (m = 64));
      c.push(a[g], a[l], a[m] || "", a[h] || "");
    }
    return c.join("");
  }
  function Nb(a, b, c, d) {
    var e = B(c, "fmt");
    if (d) {
      var f = B(c, "random"),
        g = B(c, "label") || "";
      if (!f) return !1;
      f = Mb(
        decodeURIComponent(g.replace(/\+/g, " ")) +
          ":" +
          decodeURIComponent(f.replace(/\+/g, " "))
      );
      if (!Jb(a, f, d)) return !1;
    }
    e && 4 != e && (c = C(c, "rfmt", e));
    e = C(c, "fmt", 4);
    c = qa("SCRIPT");
    e = ma(e);
    pa(c, e);
    c.onload = function () {
      a.google_noFurtherRedirects &&
        d &&
        d.call &&
        ((a.google_noFurtherRedirects = null), d());
    };
    b.getElementsByTagName("script")[0].parentElement.appendChild(c);
    return !0;
  }
  var Ob = /^true$/.test("true");
  function Pb() {
    if ("function" == typeof I.__uspapi) {
      var a = "";
      try {
        I.__uspapi("getUSPData", 1, function (b, c) {
          c &&
            b &&
            (b = b.uspString) &&
            /^[\da-zA-Z-]{1,20}$/.test(b) &&
            (a = b);
        });
      } catch (b) {}
      return a;
    }
  }
  var T = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_evaluemrc google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_gtag_event_data google_remarketing_only google_conversion_linker google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_allow_ad_personalization_signals google_restricted_data_processing google_conversion_items google_conversion_merchant_id google_user_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_gtm_url_processor google_conversion_page_url google_conversion_referrer_url google_gtm google_gcl_cookie_prefix google_read_gcl_cookie_opt_out google_basket_feed_country google_basket_feed_language google_basket_discount google_basket_transaction_type google_disable_merchant_reported_conversions google_additional_conversion_params google_transport_url".split(
      " "
    ),
    Qb = ["google_conversion_first_time", "google_conversion_snippets"];
  function U(a) {
    return null != a ? encodeURIComponent(String(a)) : "";
  }
  function Rb(a) {
    if (null != a) {
      a = String(a).substring(0, 512);
      var b = a.indexOf("#");
      return -1 == b ? a : a.substring(0, b);
    }
    return "";
  }
  function V(a, b) {
    b = U(b);
    return "" != b && ((a = U(a)), "" != a) ? "&".concat(a, "=", b) : "";
  }
  function Sb(a) {
    var b = typeof a;
    return null == a || "object" == b || "function" == b
      ? null
      : String(a)
          .replace(/,/g, "\\,")
          .replace(/;/g, "\\;")
          .replace(/=/g, "\\=");
  }
  function Tb(a) {
    if (!a || "object" != typeof a || "function" == typeof a.join) return "";
    var b = [],
      c;
    for (c in a)
      if (Object.prototype.hasOwnProperty.call(a, c)) {
        var d = a[c];
        if (d && "function" == typeof d.join) {
          for (var e = [], f = 0; f < d.length; ++f) {
            var g = Sb(d[f]);
            null != g && e.push(g);
          }
          d = 0 == e.length ? null : e.join(",");
        } else d = Sb(d);
        (e = Sb(c)) && null != d && b.push(e + "=" + d);
      }
    return b.join(";");
  }
  function Ub(a, b) {
    b = void 0 === b ? null : b;
    a = Tb(a.google_custom_params);
    b = Tb(b);
    b = a.concat(0 < a.length && 0 < b.length ? ";" : "", b);
    return "" == b ? "" : "&".concat("data=", encodeURIComponent(b));
  }
  function Vb(a) {
    return null == a || (0 != a && 1 != a) ? "" : V("tfcd", a);
  }
  function Wb(a) {
    return null == a || (0 != a && 1 != a) ? "" : V("tfua", a);
  }
  function Xb(a) {
    return !1 === a ? V("npa", 1) : !0 === a ? V("npa", 0) : "";
  }
  function Yb(a) {
    return Fa ? (!0 === a ? V("rdp", 1) : !1 === a ? V("rdp", 0) : "") : "";
  }
  function Zb(a) {
    if (null != a) {
      a = a.toString();
      if (2 == a.length) return V("hl", a);
      if (5 == a.length)
        return V("hl", a.substring(0, 2)) + V("gl", a.substring(3, 5));
    }
    return "";
  }
  function W(a) {
    return "number" != typeof a && "string" != typeof a ? "" : U(a.toString());
  }
  function $b(a) {
    if (!a) return "";
    a = a.google_conversion_items;
    if (!a) return "";
    for (var b = [], c = 0, d = a.length; c < d; c++) {
      var e = a[c],
        f = [];
      e &&
        (f.push(W(e.value)),
        f.push(W(e.quantity)),
        f.push(W(e.item_id)),
        f.push(W(e.start_date)),
        f.push(W(e.end_date)),
        b.push("(" + f.join("*") + ")"));
    }
    return 0 < b.length ? "&item=" + b.join("") : "";
  }
  function ac(a, b) {
    if (
      b.google_read_gcl_cookie_opt_out ||
      b.google_remarketing_only ||
      (b.google_conversion_domain &&
        (!b.google_gcl_cookie_prefix ||
          !/^_ycl/.test(b.google_gcl_cookie_prefix)))
    )
      return "";
    var c = "";
    if (
      b.google_gcl_cookie_prefix &&
      /^[a-zA-Z0-9_]+$/.test(b.google_gcl_cookie_prefix) &&
      "_gcl" != b.google_gcl_cookie_prefix
    )
      return (c = Bb(a, b.google_gcl_cookie_prefix)), V("gclaw", c);
    (b = Bb(a)) && (c = V("gclaw", b));
    if (yb.test(a.location.host))
      var d =
        (d = a.location.href.match(zb)) && 2 == d.length && d[1].match(wb)
          ? decodeURIComponent(d[1])
          : "";
    else {
      if (lb()) {
        b = [];
        a = a.cookie.split(";");
        for (
          var e = /^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/, f = 0;
          f < a.length;
          f++
        ) {
          var g = a[f].match(e);
          g && b.push({ f: g[1], value: g[2] });
        }
        a = {};
        if (b && b.length)
          for (e = 0; e < b.length; e++)
            (f = b[e].value.split(".")),
              "1" == f[0] &&
                3 == f.length &&
                f[1] &&
                (a[b[e].f] || (a[b[e].f] = []),
                a[b[e].f].push({ timestamp: f[1], j: f[2] }));
        b = a;
      } else b = {};
      a = [];
      for (d in b) {
        e = [];
        f = b[d];
        for (g = 0; g < f.length; g++) e.push(f[g].j);
        a.push(d + ":" + e.join(","));
      }
      d = 0 < a.length ? a.join(";") : "";
    }
    return c + (d ? V("gac", d) : "");
  }
  function bc(a, b, c) {
    var d = [];
    if (a) {
      var e = a.screen;
      e &&
        (d.push(V("u_h", e.height)),
        d.push(V("u_w", e.width)),
        d.push(V("u_ah", e.availHeight)),
        d.push(V("u_aw", e.availWidth)),
        d.push(V("u_cd", e.colorDepth)));
      a.history && d.push(V("u_his", a.history.length));
    }
    c &&
      "function" == typeof c.getTimezoneOffset &&
      d.push(V("u_tz", -c.getTimezoneOffset()));
    b &&
      ("function" == typeof b.javaEnabled &&
        d.push(V("u_java", b.javaEnabled())),
      b.plugins && d.push(V("u_nplug", b.plugins.length)),
      b.mimeTypes && d.push(V("u_nmime", b.mimeTypes.length)));
    return d.join("");
  }
  function cc(a) {
    function b(d) {
      try {
        return decodeURIComponent(d), !0;
      } catch (e) {
        return !1;
      }
    }
    a = a ? a.title : "";
    if (void 0 == a || "" == a) return "";
    a = encodeURIComponent(a);
    for (var c = 256; !b(a.substr(0, c)); ) c--;
    return "&tiba=" + a.substr(0, c);
  }
  function dc(a, b, c, d) {
    var e = "";
    if (b) {
      if (a.top == a) var f = 0;
      else {
        var g = a.location.ancestorOrigins;
        if (g) f = g[g.length - 1] == a.location.origin ? 1 : 2;
        else {
          g = a.top;
          try {
            var h;
            if ((h = !!g && null != g.location.href))
              c: {
                try {
                  y(g.foo);
                  h = !0;
                  break c;
                } catch (l) {}
                h = !1;
              }
            f = h;
          } catch (l) {
            f = !1;
          }
          f = f ? 1 : 2;
        }
      }
      a = c ? c : 1 == f ? a.top.location.href : a.location.href;
      e += V("frm", f);
      e += V("url", Rb(a));
      e += V("ref", Rb(d || b.referrer));
    }
    return e;
  }
  function ec(a, b, c, d, e) {
    var f = void 0 === f ? null : f;
    var g = "https://",
      h = "landing" === d.google_conversion_type ? "/extclk" : "/";
    switch (e) {
      default:
        return "";
      case 2:
      case 3:
        var l = "googleads.g.doubleclick.net/";
        var m = "pagead/viewthroughconversion/";
        break;
      case 1:
        l = "www.google.com/";
        m = "pagead/1p-conversion/";
        break;
      case 0:
        (l = d.google_conversion_domain || "www.googleadservices.com/"),
          (m = "pagead/conversion/");
    }
    Da && d.google_transport_url && (l = d.google_transport_url);
    "/" !== l[l.length - 1] && (l += "/");
    if (0 === l.indexOf("http://") || 0 === l.indexOf("https://")) g = "";
    g = [
      g,
      l,
      m,
      U(d.google_conversion_id),
      h,
      "?random=",
      U(d.google_conversion_time),
    ].join("");
    f = void 0 === f ? null : f;
    a = [
      V("cv", d.google_conversion_js_version),
      V("fst", d.google_conversion_first_time),
      V("num", d.google_conversion_snippets),
      V("fmt", d.google_conversion_format),
      d.google_remarketing_only ? V("userId", d.google_user_id) : "",
      Vb(d.google_tag_for_child_directed_treatment),
      Wb(d.google_tag_for_under_age_of_consent),
      Xb(d.google_allow_ad_personalization_signals),
      Yb(d.google_restricted_data_processing),
      V("value", d.google_conversion_value),
      V("evaluemrc", d.google_conversion_evaluemrc),
      V("currency_code", d.google_conversion_currency),
      V("label", d.google_conversion_label),
      V("oid", d.google_conversion_order_id),
      V("bg", d.google_conversion_color),
      Zb(d.google_conversion_language),
      V("guid", "ON"),
      !d.google_conversion_domain &&
      "GooglemKTybQhCsO" in k &&
      "function" == typeof k.GooglemKTybQhCsO
        ? V("resp", "GooglemKTybQhCsO")
        : "",
      V("disvt", d.google_disable_viewthrough),
      V("eid", Ha().join()),
      bc(a, b, d.google_conversion_date),
      V("gtm", d.google_gtm),
      b && b.sendBeacon ? V("sendb", "1") : "",
      fc(),
      V("ig", /googleadservices\.com/.test("www.googleadservices.com") ? 1 : 0),
      Ub(d, f),
      ac(c, d),
      dc(a, c, d.google_conversion_page_url, d.google_conversion_referrer_url),
      cc(c),
      d.google_remarketing_only || !d.google_additional_conversion_params
        ? ""
        : gc(d.google_additional_conversion_params),
      "&hn=" + U("www.googleadservices.com"),
    ].join("");
    b = Ga();
    a += 0 < b.length ? "&debug_experiment_id=" + b : "";
    d.google_remarketing_only || d.google_conversion_domain
      ? (d = a)
      : (hc(d) &&
          !d.google_basket_transaction_type &&
          (d.google_basket_transaction_type = "mrc"),
        (b = [
          V("mid", d.google_conversion_merchant_id),
          V("fcntr", d.google_basket_feed_country),
          V("flng", d.google_basket_feed_language),
          V("dscnt", d.google_basket_discount),
          V("bttype", d.google_basket_transaction_type),
        ].join("")),
        (d = [a, b, $b(d)].join("")),
        (d = 4e3 < d.length ? [a, V("item", "elngth")].join("") : d));
    g += d;
    1 === e
      ? (g += [V("gcp", 1), V("sscte", 1), V("ct_cookie_present", 1)].join(""))
      : 3 == e && ((g += V("gcp", 1)), (g += V("ct_cookie_present", 1)));
    Ea && ((e = Pb()), void 0 !== e && (g += V("us_privacy", e || "error")));
    return g;
  }
  function ic(a, b, c, d, e, f, g) {
    return (
      '<iframe name="' +
      a +
      '"' +
      (g ? ' id="' + g + '"' : "") +
      ' title="' +
      b +
      '" width="' +
      d +
      '" height="' +
      e +
      '"' +
      (c ? ' src="' + c + '"' : "") +
      ' frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"' +
      (f ? ' style="display:none"' : "") +
      ' scrolling="no"></iframe>'
    );
  }
  function jc(a) {
    return {
      ar: 1,
      bg: 1,
      cs: 1,
      da: 1,
      de: 1,
      el: 1,
      en_AU: 1,
      en_US: 1,
      en_GB: 1,
      es: 1,
      et: 1,
      fi: 1,
      fr: 1,
      hi: 1,
      hr: 1,
      hu: 1,
      id: 1,
      is: 1,
      it: 1,
      iw: 1,
      ja: 1,
      ko: 1,
      lt: 1,
      nl: 1,
      no: 1,
      pl: 1,
      pt_BR: 1,
      pt_PT: 1,
      ro: 1,
      ru: 1,
      sk: 1,
      sl: 1,
      sr: 1,
      sv: 1,
      th: 1,
      tl: 1,
      tr: 1,
      vi: 1,
      zh_CN: 1,
      zh_TW: 1,
    }[a]
      ? a + ".html"
      : "en_US.html";
  }
  function kc(a, b, c, d) {
    function e(h, l, m, p) {
      return (
        '<img height="' +
        m +
        '" width="' +
        l +
        '" border="0" alt="" src="' +
        h +
        '"' +
        (p ? ' style="display:none"' : "") +
        " />"
      );
    }
    H() && Gb(2);
    var f = "";
    d.google_remarketing_only &&
      d.google_enable_display_cookie_match &&
      !Ob &&
      (F && E(["376635470", "376635471"], za, 2),
      (f =
        d.google_remarketing_only &&
        d.google_enable_display_cookie_match &&
        !Ob &&
        F &&
        "376635471" == G(2)
          ? ic(
              "google_cookie_match_frame",
              "Google cookie match frame",
              "https://bid.g.doubleclick.net/xbbe/pixel?d=KAE",
              1,
              1,
              !0,
              null
            )
          : ""));
    d.google_remarketing_only &&
      !d.google_conversion_domain &&
      F &&
      E(["759238990", "759238991"], Ca, 13);
    !d.google_remarketing_only ||
      d.google_conversion_domain ||
      (F && ("759248991" == G(14) || "759248990" == G(14))) ||
      (F && E(["759248990", "759248991"], Ba, 14));
    !1 !== d.google_conversion_linker && Cb(d.google_gcl_cookie_prefix);
    b = ec(a, b, c, d, d.google_remarketing_only ? 2 : 0);
    if (0 == d.google_conversion_format && null == d.google_conversion_domain)
      return (
        '<a href="https://services.google.com/sitestats/' +
        (jc(d.google_conversion_language) +
          "?cid=" +
          U(d.google_conversion_id)) +
        '" target="_blank">' +
        e(b, 135, 27, !1) +
        "</a>" +
        f
      );
    if (1 < d.google_conversion_snippets || 3 == d.google_conversion_format) {
      var g = b;
      null == d.google_conversion_domain &&
        (g = 3 == d.google_conversion_format ? b : C(b, "fmt", 3));
      return lc(a, c, d, g) ? f : e(g, 1, 1, !0) + f;
    }
    g = null;
    !d.google_conversion_domain &&
      lc(a, c, d, b) &&
      ((g = "goog_conv_iframe"), (b = ""));
    return (
      ic(
        "google_conversion_frame",
        "Google conversion frame",
        b,
        2 == d.google_conversion_format ? 200 : 300,
        2 == d.google_conversion_format ? 26 : 13,
        !1,
        g
      ) + f
    );
  }
  function lc(a, b, c, d) {
    if (c.google_conversion_domain) return !1;
    try {
      return Nb(a, b, d, null);
    } catch (e) {
      return !1;
    }
  }
  function mc(a) {
    for (
      var b = qa("IFRAME"), c = [], d = [], e = 0;
      e < a.google_conversion_items.length;
      e++
    ) {
      var f = a.google_conversion_items[e];
      f &&
        f.quantity &&
        (f.sku || f.item_id) &&
        (c.push(f.sku || f.item_id), d.push(f.quantity));
    }
    e = "";
    null != a.google_basket_feed_language &&
    null != a.google_basket_feed_country
      ? (e =
          "&mrc_language=" +
          a.google_basket_feed_language.toString() +
          "&mrc_country=" +
          a.google_basket_feed_country.toString())
      : null != a.google_conversion_language &&
        ((f = a.google_conversion_language.toString()),
        5 == f.length &&
          (e =
            "&mrc_language=" +
            f.substring(0, 2) +
            "&mrc_country=" +
            f.substring(3, 5)));
    b.src =
      "https://www.google.com/ads/mrc?sku=" +
      c.join(",") +
      "&qty=" +
      d.join(",") +
      "&oid=" +
      a.google_conversion_order_id +
      "&mcid=" +
      a.google_conversion_merchant_id +
      e;
    b.style.width = "1px";
    b.style.height = "1px";
    b.style.display = "none";
    return b;
  }
  function hc(a) {
    return (
      !a.google_disable_merchant_reported_conversions &&
      !!a.google_conversion_merchant_id &&
      !!a.google_conversion_order_id &&
      !!a.google_conversion_items
    );
  }
  function nc(a) {
    if (
      "landing" == a.google_conversion_type ||
      !a.google_conversion_id ||
      (a.google_remarketing_only && a.google_disable_viewthrough)
    )
      return !1;
    a.google_conversion_date = new Date();
    a.google_conversion_time = a.google_conversion_date.getTime();
    a.google_conversion_snippets =
      "number" == typeof a.google_conversion_snippets &&
      0 < a.google_conversion_snippets
        ? a.google_conversion_snippets + 1
        : 1;
    "number" != typeof a.google_conversion_first_time &&
      (a.google_conversion_first_time = a.google_conversion_time);
    a.google_conversion_js_version = "9";
    0 != a.google_conversion_format &&
      1 != a.google_conversion_format &&
      2 != a.google_conversion_format &&
      3 != a.google_conversion_format &&
      (a.google_conversion_format = 3);
    !1 !== a.google_enable_display_cookie_match &&
      (a.google_enable_display_cookie_match = !0);
    return !0;
  }
  function oc(a) {
    for (var b = 0; b < T.length; b++) a[T[b]] = null;
  }
  function pc(a) {
    for (var b = {}, c = 0; c < T.length; c++) b[T[c]] = a[T[c]];
    for (c = 0; c < Qb.length; c++) b[Qb[c]] = a[Qb[c]];
    return b;
  }
  function fc() {
    var a = "";
    H() &&
      (a = Ib()
        .map(function (b) {
          return b.join("-");
        })
        .join("_"));
    return V("li", a);
  }
  function gc(a) {
    var b = "",
      c;
    for (c in a) a.hasOwnProperty(c) && (b += V(c, a[c]));
    return b;
  }
  function qc(a) {
    return (
      { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
        a.visibilityState ||
          a.webkitVisibilityState ||
          a.mozVisibilityState ||
          ""
      ] || 0
    );
  }
  function rc(a) {
    var b;
    a.visibilityState
      ? (b = "visibilitychange")
      : a.mozVisibilityState
      ? (b = "mozvisibilitychange")
      : a.webkitVisibilityState && (b = "webkitvisibilitychange");
    return b;
  }
  function sc(a, b) {
    if (3 == qc(b)) return !1;
    a();
    return !0;
  }
  function tc(a, b) {
    if (!sc(a, b)) {
      var c = !1,
        d = rc(b),
        e = function () {
          !c &&
            sc(a, b) &&
            ((c = !0),
            b.removeEventListener && b.removeEventListener(d, e, !1));
        };
      d && b.addEventListener && b.addEventListener(d, e, !1);
    }
  }
  F = new (function () {
    var a = [],
      b = 0,
      c;
    for (c in Ia) a[b++] = Ia[c];
    this.b = {};
    this.a = {};
    a = a || [];
    b = 0;
    for (c = a.length; b < c; ++b) this.a[a[b]] = "";
  })();
  E(["592230570", "592230571"], Aa, 16);
  H() && (Gb(1), Hb());
  function uc(a, b, c) {
    function d(m, p) {
      var v = new Image();
      v.onload = m;
      v.src = p;
    }
    function e() {
      --f;
      if (0 >= f) {
        var m = Kb(a, !1),
          p = m[b];
        p && (delete m[b], (m = p[0]) && m.call && m());
      }
    }
    var f = c.length + 1;
    if (2 == c.length) {
      var g = c[0],
        h = c[1];
      0 <= z(g, 0, "rmt_tld", g.search(A)) &&
        0 <= z(g, 0, "ipr", g.search(A)) &&
        !h.match(ra)[6] &&
        ((h += sa(g)), (c[1] = C(h, "rmt_tld", "1")));
    }
    for (g = 0; g < c.length; g++) {
      h = c[g];
      var l = B(h, "fmt");
      switch (parseInt(l, 10)) {
        case 1:
        case 2:
          (l = a.document.getElementById("goog_conv_iframe")) && !l.src
            ? ((l.onload = e), (l.src = h))
            : d(e, h);
          break;
        case 4:
          Nb(a, a.document, h, e);
          break;
        case 5:
          if (a.navigator && a.navigator.sendBeacon)
            if (a.navigator.sendBeacon(h, "")) {
              e();
              break;
            } else h = C(h, "sendb", 2);
          h = C(h, "fmt", 3);
        default:
          d(e, h);
      }
    }
    e();
  }
  var X = ["GooglemKTybQhCsO"],
    Y = k;
  X[0] in Y ||
    "undefined" == typeof Y.execScript ||
    Y.execScript("var " + X[0]);
  for (var Z; X.length && (Z = X.shift()); )
    X.length || void 0 === uc
      ? Y[Z] && Y[Z] !== Object.prototype[Z]
        ? (Y = Y[Z])
        : (Y = Y[Z] = {})
      : (Y[Z] = uc);
  (function (a, b, c) {
    if (a) {
      try {
        if (nc(a))
          if (3 == qc(c)) {
            var d = pc(a),
              e = "google_conversion_" + Math.floor(1e9 * Math.random());
            c.write('<span id="' + e + '"></span>');
            tc(function () {
              try {
                var f = c.getElementById(e);
                f && (f.innerHTML = kc(a, b, c, d));
              } catch (g) {}
            }, c);
          } else c.write(kc(a, b, c, a));
        hc(a) && c.documentElement.appendChild(mc(a));
      } catch (f) {}
      oc(a);
    }
  })(window, navigator, document);
}.call(this));
