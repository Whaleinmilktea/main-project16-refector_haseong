import {
  require_react
} from "./chunk-FLAVOKRJ.js";
import {
  __commonJS
} from "./chunk-AC2VUBZ6.js";

// node_modules/@ckeditor/ckeditor5-react/dist/index.js
var require_dist = __commonJS({
  "node_modules/@ckeditor/ckeditor5-react/dist/index.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e(require_react()) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.CKEditor = e(require_react()) : t.CKEditor = e(t.React);
    }(self, (t) => (() => {
      var e = { 703: (t2, e2, r2) => {
        "use strict";
        var o2 = r2(414);
        function n2() {
        }
        function i() {
        }
        i.resetWarningCache = n2, t2.exports = function() {
          function t3(t4, e4, r4, n3, i2, s) {
            if (s !== o2) {
              var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw a.name = "Invariant Violation", a;
            }
          }
          function e3() {
            return t3;
          }
          t3.isRequired = t3;
          var r3 = { array: t3, bigint: t3, bool: t3, func: t3, number: t3, object: t3, string: t3, symbol: t3, any: t3, arrayOf: e3, element: t3, elementType: t3, instanceOf: e3, node: t3, objectOf: e3, oneOf: e3, oneOfType: e3, shape: e3, exact: e3, checkPropTypes: i, resetWarningCache: n2 };
          return r3.PropTypes = r3, r3;
        };
      }, 697: (t2, e2, r2) => {
        t2.exports = r2(703)();
      }, 414: (t2) => {
        "use strict";
        t2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      }, 787: (e2) => {
        "use strict";
        e2.exports = t;
      } }, r = {};
      function o(t2) {
        var n2 = r[t2];
        if (void 0 !== n2)
          return n2.exports;
        var i = r[t2] = { exports: {} };
        return e[t2](i, i.exports, o), i.exports;
      }
      o.n = (t2) => {
        var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
        return o.d(e2, { a: e2 }), e2;
      }, o.d = (t2, e2) => {
        for (var r2 in e2)
          o.o(e2, r2) && !o.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: e2[r2] });
      }, o.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), o.r = (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      };
      var n = {};
      return (() => {
        "use strict";
        o.r(n), o.d(n, { CKEditor: () => to, CKEditorContext: () => Xr });
        var t2 = o(787), e2 = o.n(t2), r2 = o(697), i = o.n(r2);
        const s = new Array(256).fill("").map((t3, e3) => ("0" + e3.toString(16)).slice(-2));
        class a {
          constructor(t3) {
            if (this.crashes = [], this.state = "initializing", this._now = Date.now, this.crashes = [], this._crashNumberLimit = "number" == typeof t3.crashNumberLimit ? t3.crashNumberLimit : 3, this._minimumNonErrorTimePeriod = "number" == typeof t3.minimumNonErrorTimePeriod ? t3.minimumNonErrorTimePeriod : 5e3, this._boundErrorHandler = (t4) => {
              const e3 = "error" in t4 ? t4.error : t4.reason;
              e3 instanceof Error && this._handleError(e3, t4);
            }, this._listeners = {}, !this._restart)
              throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.");
          }
          destroy() {
            this._stopErrorHandling(), this._listeners = {};
          }
          on(t3, e3) {
            this._listeners[t3] || (this._listeners[t3] = []), this._listeners[t3].push(e3);
          }
          off(t3, e3) {
            this._listeners[t3] = this._listeners[t3].filter((t4) => t4 !== e3);
          }
          _fire(t3, ...e3) {
            const r3 = this._listeners[t3] || [];
            for (const t4 of r3)
              t4.apply(this, [null, ...e3]);
          }
          _startErrorHandling() {
            window.addEventListener("error", this._boundErrorHandler), window.addEventListener("unhandledrejection", this._boundErrorHandler);
          }
          _stopErrorHandling() {
            window.removeEventListener("error", this._boundErrorHandler), window.removeEventListener("unhandledrejection", this._boundErrorHandler);
          }
          _handleError(t3, e3) {
            if (this._shouldReactToError(t3)) {
              this.crashes.push({ message: t3.message, stack: t3.stack, filename: e3 instanceof ErrorEvent ? e3.filename : void 0, lineno: e3 instanceof ErrorEvent ? e3.lineno : void 0, colno: e3 instanceof ErrorEvent ? e3.colno : void 0, date: this._now() });
              const r3 = this._shouldRestart();
              this.state = "crashed", this._fire("stateChange"), this._fire("error", { error: t3, causesRestart: r3 }), r3 ? this._restart() : (this.state = "crashedPermanently", this._fire("stateChange"));
            }
          }
          _shouldReactToError(t3) {
            return t3.is && t3.is("CKEditorError") && void 0 !== t3.context && null !== t3.context && "ready" === this.state && this._isErrorComingFromThisItem(t3);
          }
          _shouldRestart() {
            if (this.crashes.length <= this._crashNumberLimit)
              return true;
            return (this.crashes[this.crashes.length - 1].date - this.crashes[this.crashes.length - 1 - this._crashNumberLimit].date) / this._crashNumberLimit > this._minimumNonErrorTimePeriod;
          }
        }
        function c(t3, e3 = /* @__PURE__ */ new Set()) {
          const r3 = [t3], o2 = /* @__PURE__ */ new Set();
          let n2 = 0;
          for (; r3.length > n2; ) {
            const t4 = r3[n2++];
            if (!o2.has(t4) && u(t4) && !e3.has(t4))
              if (o2.add(t4), Symbol.iterator in t4)
                try {
                  for (const e4 of t4)
                    r3.push(e4);
                } catch (t5) {
                }
              else
                for (const e4 in t4)
                  "defaultValue" !== e4 && r3.push(t4[e4]);
          }
          return o2;
        }
        function u(t3) {
          const e3 = Object.prototype.toString.call(t3), r3 = typeof t3;
          return !("number" === r3 || "boolean" === r3 || "string" === r3 || "symbol" === r3 || "function" === r3 || "[object Date]" === e3 || "[object RegExp]" === e3 || "[object Module]" === e3 || null == t3 || t3._watchdogExcluded || t3 instanceof EventTarget || t3 instanceof Event);
        }
        function h(t3, e3, r3 = /* @__PURE__ */ new Set()) {
          if (t3 === e3 && ("object" == typeof (o2 = t3) && null !== o2))
            return true;
          var o2;
          const n2 = c(t3, r3), i2 = c(e3, r3);
          for (const t4 of n2)
            if (i2.has(t4))
              return true;
          return false;
        }
        const d = function(t3) {
          var e3 = typeof t3;
          return null != t3 && ("object" == e3 || "function" == e3);
        };
        const l = "object" == typeof global && global && global.Object === Object && global;
        var f = "object" == typeof self && self && self.Object === Object && self;
        const p = l || f || Function("return this")();
        const _ = function() {
          return p.Date.now();
        };
        var y = /\s/;
        const g = function(t3) {
          for (var e3 = t3.length; e3-- && y.test(t3.charAt(e3)); )
            ;
          return e3;
        };
        var b = /^\s+/;
        const v = function(t3) {
          return t3 ? t3.slice(0, g(t3) + 1).replace(b, "") : t3;
        };
        const m = p.Symbol;
        var j = Object.prototype, w = j.hasOwnProperty, x = j.toString, E = m ? m.toStringTag : void 0;
        const O = function(t3) {
          var e3 = w.call(t3, E), r3 = t3[E];
          try {
            t3[E] = void 0;
            var o2 = true;
          } catch (t4) {
          }
          var n2 = x.call(t3);
          return o2 && (e3 ? t3[E] = r3 : delete t3[E]), n2;
        };
        var C = Object.prototype.toString;
        const P = function(t3) {
          return C.call(t3);
        };
        var A = m ? m.toStringTag : void 0;
        const T = function(t3) {
          return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : A && A in Object(t3) ? O(t3) : P(t3);
        };
        const S = function(t3) {
          return null != t3 && "object" == typeof t3;
        };
        const W = function(t3) {
          return "symbol" == typeof t3 || S(t3) && "[object Symbol]" == T(t3);
        };
        var R = /^[-+]0x[0-9a-f]+$/i, I = /^0b[01]+$/i, D = /^0o[0-7]+$/i, z = parseInt;
        const M = function(t3) {
          if ("number" == typeof t3)
            return t3;
          if (W(t3))
            return NaN;
          if (d(t3)) {
            var e3 = "function" == typeof t3.valueOf ? t3.valueOf() : t3;
            t3 = d(e3) ? e3 + "" : e3;
          }
          if ("string" != typeof t3)
            return 0 === t3 ? t3 : +t3;
          t3 = v(t3);
          var r3 = I.test(t3);
          return r3 || D.test(t3) ? z(t3.slice(2), r3 ? 2 : 8) : R.test(t3) ? NaN : +t3;
        };
        var U = Math.max, N = Math.min;
        const F = function(t3, e3, r3) {
          var o2, n2, i2, s2, a2, c2, u2 = 0, h2 = false, l2 = false, f2 = true;
          if ("function" != typeof t3)
            throw new TypeError("Expected a function");
          function p2(e4) {
            var r4 = o2, i3 = n2;
            return o2 = n2 = void 0, u2 = e4, s2 = t3.apply(i3, r4);
          }
          function y2(t4) {
            var r4 = t4 - c2;
            return void 0 === c2 || r4 >= e3 || r4 < 0 || l2 && t4 - u2 >= i2;
          }
          function g2() {
            var t4 = _();
            if (y2(t4))
              return b2(t4);
            a2 = setTimeout(g2, function(t5) {
              var r4 = e3 - (t5 - c2);
              return l2 ? N(r4, i2 - (t5 - u2)) : r4;
            }(t4));
          }
          function b2(t4) {
            return a2 = void 0, f2 && o2 ? p2(t4) : (o2 = n2 = void 0, s2);
          }
          function v2() {
            var t4 = _(), r4 = y2(t4);
            if (o2 = arguments, n2 = this, c2 = t4, r4) {
              if (void 0 === a2)
                return function(t5) {
                  return u2 = t5, a2 = setTimeout(g2, e3), h2 ? p2(t5) : s2;
                }(c2);
              if (l2)
                return clearTimeout(a2), a2 = setTimeout(g2, e3), p2(c2);
            }
            return void 0 === a2 && (a2 = setTimeout(g2, e3)), s2;
          }
          return e3 = M(e3) || 0, d(r3) && (h2 = !!r3.leading, i2 = (l2 = "maxWait" in r3) ? U(M(r3.maxWait) || 0, e3) : i2, f2 = "trailing" in r3 ? !!r3.trailing : f2), v2.cancel = function() {
            void 0 !== a2 && clearTimeout(a2), u2 = 0, o2 = c2 = n2 = a2 = void 0;
          }, v2.flush = function() {
            return void 0 === a2 ? s2 : b2(_());
          }, v2;
        };
        const q = function(t3, e3, r3) {
          var o2 = true, n2 = true;
          if ("function" != typeof t3)
            throw new TypeError("Expected a function");
          return d(r3) && (o2 = "leading" in r3 ? !!r3.leading : o2, n2 = "trailing" in r3 ? !!r3.trailing : n2), F(t3, e3, { leading: o2, maxWait: e3, trailing: n2 });
        };
        const L = function() {
          this.__data__ = [], this.size = 0;
        };
        const k = function(t3, e3) {
          return t3 === e3 || t3 != t3 && e3 != e3;
        };
        const B = function(t3, e3) {
          for (var r3 = t3.length; r3--; )
            if (k(t3[r3][0], e3))
              return r3;
          return -1;
        };
        var $ = Array.prototype.splice;
        const H = function(t3) {
          var e3 = this.__data__, r3 = B(e3, t3);
          return !(r3 < 0) && (r3 == e3.length - 1 ? e3.pop() : $.call(e3, r3, 1), --this.size, true);
        };
        const V = function(t3) {
          var e3 = this.__data__, r3 = B(e3, t3);
          return r3 < 0 ? void 0 : e3[r3][1];
        };
        const K = function(t3) {
          return B(this.__data__, t3) > -1;
        };
        const Q = function(t3, e3) {
          var r3 = this.__data__, o2 = B(r3, t3);
          return o2 < 0 ? (++this.size, r3.push([t3, e3])) : r3[o2][1] = e3, this;
        };
        function G(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        G.prototype.clear = L, G.prototype.delete = H, G.prototype.get = V, G.prototype.has = K, G.prototype.set = Q;
        const Y = G;
        const J = function() {
          this.__data__ = new Y(), this.size = 0;
        };
        const X = function(t3) {
          var e3 = this.__data__, r3 = e3.delete(t3);
          return this.size = e3.size, r3;
        };
        const Z = function(t3) {
          return this.__data__.get(t3);
        };
        const tt = function(t3) {
          return this.__data__.has(t3);
        };
        const et = function(t3) {
          if (!d(t3))
            return false;
          var e3 = T(t3);
          return "[object Function]" == e3 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
        };
        const rt = p["__core-js_shared__"];
        var ot = function() {
          var t3 = /[^.]+$/.exec(rt && rt.keys && rt.keys.IE_PROTO || "");
          return t3 ? "Symbol(src)_1." + t3 : "";
        }();
        const nt = function(t3) {
          return !!ot && ot in t3;
        };
        var it = Function.prototype.toString;
        const st = function(t3) {
          if (null != t3) {
            try {
              return it.call(t3);
            } catch (t4) {
            }
            try {
              return t3 + "";
            } catch (t4) {
            }
          }
          return "";
        };
        var at = /^\[object .+?Constructor\]$/, ct = Function.prototype, ut = Object.prototype, ht = ct.toString, dt = ut.hasOwnProperty, lt = RegExp("^" + ht.call(dt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        const ft = function(t3) {
          return !(!d(t3) || nt(t3)) && (et(t3) ? lt : at).test(st(t3));
        };
        const pt = function(t3, e3) {
          return null == t3 ? void 0 : t3[e3];
        };
        const _t = function(t3, e3) {
          var r3 = pt(t3, e3);
          return ft(r3) ? r3 : void 0;
        };
        const yt = _t(p, "Map");
        const gt = _t(Object, "create");
        const bt = function() {
          this.__data__ = gt ? gt(null) : {}, this.size = 0;
        };
        const vt = function(t3) {
          var e3 = this.has(t3) && delete this.__data__[t3];
          return this.size -= e3 ? 1 : 0, e3;
        };
        var mt = Object.prototype.hasOwnProperty;
        const jt = function(t3) {
          var e3 = this.__data__;
          if (gt) {
            var r3 = e3[t3];
            return "__lodash_hash_undefined__" === r3 ? void 0 : r3;
          }
          return mt.call(e3, t3) ? e3[t3] : void 0;
        };
        var wt = Object.prototype.hasOwnProperty;
        const xt = function(t3) {
          var e3 = this.__data__;
          return gt ? void 0 !== e3[t3] : wt.call(e3, t3);
        };
        const Et = function(t3, e3) {
          var r3 = this.__data__;
          return this.size += this.has(t3) ? 0 : 1, r3[t3] = gt && void 0 === e3 ? "__lodash_hash_undefined__" : e3, this;
        };
        function Ot(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        Ot.prototype.clear = bt, Ot.prototype.delete = vt, Ot.prototype.get = jt, Ot.prototype.has = xt, Ot.prototype.set = Et;
        const Ct = Ot;
        const Pt = function() {
          this.size = 0, this.__data__ = { hash: new Ct(), map: new (yt || Y)(), string: new Ct() };
        };
        const At = function(t3) {
          var e3 = typeof t3;
          return "string" == e3 || "number" == e3 || "symbol" == e3 || "boolean" == e3 ? "__proto__" !== t3 : null === t3;
        };
        const Tt = function(t3, e3) {
          var r3 = t3.__data__;
          return At(e3) ? r3["string" == typeof e3 ? "string" : "hash"] : r3.map;
        };
        const St = function(t3) {
          var e3 = Tt(this, t3).delete(t3);
          return this.size -= e3 ? 1 : 0, e3;
        };
        const Wt = function(t3) {
          return Tt(this, t3).get(t3);
        };
        const Rt = function(t3) {
          return Tt(this, t3).has(t3);
        };
        const It = function(t3, e3) {
          var r3 = Tt(this, t3), o2 = r3.size;
          return r3.set(t3, e3), this.size += r3.size == o2 ? 0 : 1, this;
        };
        function Dt(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        Dt.prototype.clear = Pt, Dt.prototype.delete = St, Dt.prototype.get = Wt, Dt.prototype.has = Rt, Dt.prototype.set = It;
        const zt = Dt;
        const Mt = function(t3, e3) {
          var r3 = this.__data__;
          if (r3 instanceof Y) {
            var o2 = r3.__data__;
            if (!yt || o2.length < 199)
              return o2.push([t3, e3]), this.size = ++r3.size, this;
            r3 = this.__data__ = new zt(o2);
          }
          return r3.set(t3, e3), this.size = r3.size, this;
        };
        function Ut(t3) {
          var e3 = this.__data__ = new Y(t3);
          this.size = e3.size;
        }
        Ut.prototype.clear = J, Ut.prototype.delete = X, Ut.prototype.get = Z, Ut.prototype.has = tt, Ut.prototype.set = Mt;
        const Nt = Ut;
        const Ft = function(t3, e3) {
          for (var r3 = -1, o2 = null == t3 ? 0 : t3.length; ++r3 < o2 && false !== e3(t3[r3], r3, t3); )
            ;
          return t3;
        };
        const qt = function() {
          try {
            var t3 = _t(Object, "defineProperty");
            return t3({}, "", {}), t3;
          } catch (t4) {
          }
        }();
        const Lt = function(t3, e3, r3) {
          "__proto__" == e3 && qt ? qt(t3, e3, { configurable: true, enumerable: true, value: r3, writable: true }) : t3[e3] = r3;
        };
        var kt = Object.prototype.hasOwnProperty;
        const Bt = function(t3, e3, r3) {
          var o2 = t3[e3];
          kt.call(t3, e3) && k(o2, r3) && (void 0 !== r3 || e3 in t3) || Lt(t3, e3, r3);
        };
        const $t = function(t3, e3, r3, o2) {
          var n2 = !r3;
          r3 || (r3 = {});
          for (var i2 = -1, s2 = e3.length; ++i2 < s2; ) {
            var a2 = e3[i2], c2 = o2 ? o2(r3[a2], t3[a2], a2, r3, t3) : void 0;
            void 0 === c2 && (c2 = t3[a2]), n2 ? Lt(r3, a2, c2) : Bt(r3, a2, c2);
          }
          return r3;
        };
        const Ht = function(t3, e3) {
          for (var r3 = -1, o2 = Array(t3); ++r3 < t3; )
            o2[r3] = e3(r3);
          return o2;
        };
        const Vt = function(t3) {
          return S(t3) && "[object Arguments]" == T(t3);
        };
        var Kt = Object.prototype, Qt = Kt.hasOwnProperty, Gt = Kt.propertyIsEnumerable;
        const Yt = Vt(function() {
          return arguments;
        }()) ? Vt : function(t3) {
          return S(t3) && Qt.call(t3, "callee") && !Gt.call(t3, "callee");
        };
        const Jt = Array.isArray;
        const Xt = function() {
          return false;
        };
        var Zt = "object" == typeof exports && exports && !exports.nodeType && exports, te = Zt && "object" == typeof module && module && !module.nodeType && module, ee = te && te.exports === Zt ? p.Buffer : void 0;
        const re = (ee ? ee.isBuffer : void 0) || Xt;
        var oe = /^(?:0|[1-9]\d*)$/;
        const ne = function(t3, e3) {
          var r3 = typeof t3;
          return !!(e3 = null == e3 ? 9007199254740991 : e3) && ("number" == r3 || "symbol" != r3 && oe.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
        };
        const ie = function(t3) {
          return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= 9007199254740991;
        };
        var se = {};
        se["[object Float32Array]"] = se["[object Float64Array]"] = se["[object Int8Array]"] = se["[object Int16Array]"] = se["[object Int32Array]"] = se["[object Uint8Array]"] = se["[object Uint8ClampedArray]"] = se["[object Uint16Array]"] = se["[object Uint32Array]"] = true, se["[object Arguments]"] = se["[object Array]"] = se["[object ArrayBuffer]"] = se["[object Boolean]"] = se["[object DataView]"] = se["[object Date]"] = se["[object Error]"] = se["[object Function]"] = se["[object Map]"] = se["[object Number]"] = se["[object Object]"] = se["[object RegExp]"] = se["[object Set]"] = se["[object String]"] = se["[object WeakMap]"] = false;
        const ae = function(t3) {
          return S(t3) && ie(t3.length) && !!se[T(t3)];
        };
        const ce = function(t3) {
          return function(e3) {
            return t3(e3);
          };
        };
        var ue = "object" == typeof exports && exports && !exports.nodeType && exports, he = ue && "object" == typeof module && module && !module.nodeType && module, de = he && he.exports === ue && l.process;
        const le = function() {
          try {
            var t3 = he && he.require && he.require("util").types;
            return t3 || de && de.binding && de.binding("util");
          } catch (t4) {
          }
        }();
        var fe = le && le.isTypedArray;
        const pe = fe ? ce(fe) : ae;
        var _e = Object.prototype.hasOwnProperty;
        const ye = function(t3, e3) {
          var r3 = Jt(t3), o2 = !r3 && Yt(t3), n2 = !r3 && !o2 && re(t3), i2 = !r3 && !o2 && !n2 && pe(t3), s2 = r3 || o2 || n2 || i2, a2 = s2 ? Ht(t3.length, String) : [], c2 = a2.length;
          for (var u2 in t3)
            !e3 && !_e.call(t3, u2) || s2 && ("length" == u2 || n2 && ("offset" == u2 || "parent" == u2) || i2 && ("buffer" == u2 || "byteLength" == u2 || "byteOffset" == u2) || ne(u2, c2)) || a2.push(u2);
          return a2;
        };
        var ge = Object.prototype;
        const be = function(t3) {
          var e3 = t3 && t3.constructor;
          return t3 === ("function" == typeof e3 && e3.prototype || ge);
        };
        const ve = function(t3, e3) {
          return function(r3) {
            return t3(e3(r3));
          };
        };
        const me = ve(Object.keys, Object);
        var je = Object.prototype.hasOwnProperty;
        const we = function(t3) {
          if (!be(t3))
            return me(t3);
          var e3 = [];
          for (var r3 in Object(t3))
            je.call(t3, r3) && "constructor" != r3 && e3.push(r3);
          return e3;
        };
        const xe = function(t3) {
          return null != t3 && ie(t3.length) && !et(t3);
        };
        const Ee = function(t3) {
          return xe(t3) ? ye(t3) : we(t3);
        };
        const Oe = function(t3, e3) {
          return t3 && $t(e3, Ee(e3), t3);
        };
        const Ce = function(t3) {
          var e3 = [];
          if (null != t3)
            for (var r3 in Object(t3))
              e3.push(r3);
          return e3;
        };
        var Pe = Object.prototype.hasOwnProperty;
        const Ae = function(t3) {
          if (!d(t3))
            return Ce(t3);
          var e3 = be(t3), r3 = [];
          for (var o2 in t3)
            ("constructor" != o2 || !e3 && Pe.call(t3, o2)) && r3.push(o2);
          return r3;
        };
        const Te = function(t3) {
          return xe(t3) ? ye(t3, true) : Ae(t3);
        };
        const Se = function(t3, e3) {
          return t3 && $t(e3, Te(e3), t3);
        };
        var We = "object" == typeof exports && exports && !exports.nodeType && exports, Re = We && "object" == typeof module && module && !module.nodeType && module, Ie = Re && Re.exports === We ? p.Buffer : void 0, De = Ie ? Ie.allocUnsafe : void 0;
        const ze = function(t3, e3) {
          if (e3)
            return t3.slice();
          var r3 = t3.length, o2 = De ? De(r3) : new t3.constructor(r3);
          return t3.copy(o2), o2;
        };
        const Me = function(t3, e3) {
          var r3 = -1, o2 = t3.length;
          for (e3 || (e3 = Array(o2)); ++r3 < o2; )
            e3[r3] = t3[r3];
          return e3;
        };
        const Ue = function(t3, e3) {
          for (var r3 = -1, o2 = null == t3 ? 0 : t3.length, n2 = 0, i2 = []; ++r3 < o2; ) {
            var s2 = t3[r3];
            e3(s2, r3, t3) && (i2[n2++] = s2);
          }
          return i2;
        };
        const Ne = function() {
          return [];
        };
        var Fe = Object.prototype.propertyIsEnumerable, qe = Object.getOwnPropertySymbols;
        const Le = qe ? function(t3) {
          return null == t3 ? [] : (t3 = Object(t3), Ue(qe(t3), function(e3) {
            return Fe.call(t3, e3);
          }));
        } : Ne;
        const ke = function(t3, e3) {
          return $t(t3, Le(t3), e3);
        };
        const Be = function(t3, e3) {
          for (var r3 = -1, o2 = e3.length, n2 = t3.length; ++r3 < o2; )
            t3[n2 + r3] = e3[r3];
          return t3;
        };
        const $e = ve(Object.getPrototypeOf, Object);
        const He = Object.getOwnPropertySymbols ? function(t3) {
          for (var e3 = []; t3; )
            Be(e3, Le(t3)), t3 = $e(t3);
          return e3;
        } : Ne;
        const Ve = function(t3, e3) {
          return $t(t3, He(t3), e3);
        };
        const Ke = function(t3, e3, r3) {
          var o2 = e3(t3);
          return Jt(t3) ? o2 : Be(o2, r3(t3));
        };
        const Qe = function(t3) {
          return Ke(t3, Ee, Le);
        };
        const Ge = function(t3) {
          return Ke(t3, Te, He);
        };
        const Ye = _t(p, "DataView");
        const Je = _t(p, "Promise");
        const Xe = _t(p, "Set");
        const Ze = _t(p, "WeakMap");
        var tr = "[object Map]", er = "[object Promise]", rr = "[object Set]", or = "[object WeakMap]", nr = "[object DataView]", ir = st(Ye), sr = st(yt), ar = st(Je), cr = st(Xe), ur = st(Ze), hr = T;
        (Ye && hr(new Ye(new ArrayBuffer(1))) != nr || yt && hr(new yt()) != tr || Je && hr(Je.resolve()) != er || Xe && hr(new Xe()) != rr || Ze && hr(new Ze()) != or) && (hr = function(t3) {
          var e3 = T(t3), r3 = "[object Object]" == e3 ? t3.constructor : void 0, o2 = r3 ? st(r3) : "";
          if (o2)
            switch (o2) {
              case ir:
                return nr;
              case sr:
                return tr;
              case ar:
                return er;
              case cr:
                return rr;
              case ur:
                return or;
            }
          return e3;
        });
        const dr = hr;
        var lr = Object.prototype.hasOwnProperty;
        const fr = function(t3) {
          var e3 = t3.length, r3 = new t3.constructor(e3);
          return e3 && "string" == typeof t3[0] && lr.call(t3, "index") && (r3.index = t3.index, r3.input = t3.input), r3;
        };
        const pr = p.Uint8Array;
        const _r = function(t3) {
          var e3 = new t3.constructor(t3.byteLength);
          return new pr(e3).set(new pr(t3)), e3;
        };
        const yr = function(t3, e3) {
          var r3 = e3 ? _r(t3.buffer) : t3.buffer;
          return new t3.constructor(r3, t3.byteOffset, t3.byteLength);
        };
        var gr = /\w*$/;
        const br = function(t3) {
          var e3 = new t3.constructor(t3.source, gr.exec(t3));
          return e3.lastIndex = t3.lastIndex, e3;
        };
        var vr = m ? m.prototype : void 0, mr = vr ? vr.valueOf : void 0;
        const jr = function(t3) {
          return mr ? Object(mr.call(t3)) : {};
        };
        const wr = function(t3, e3) {
          var r3 = e3 ? _r(t3.buffer) : t3.buffer;
          return new t3.constructor(r3, t3.byteOffset, t3.length);
        };
        const xr = function(t3, e3, r3) {
          var o2 = t3.constructor;
          switch (e3) {
            case "[object ArrayBuffer]":
              return _r(t3);
            case "[object Boolean]":
            case "[object Date]":
              return new o2(+t3);
            case "[object DataView]":
              return yr(t3, r3);
            case "[object Float32Array]":
            case "[object Float64Array]":
            case "[object Int8Array]":
            case "[object Int16Array]":
            case "[object Int32Array]":
            case "[object Uint8Array]":
            case "[object Uint8ClampedArray]":
            case "[object Uint16Array]":
            case "[object Uint32Array]":
              return wr(t3, r3);
            case "[object Map]":
            case "[object Set]":
              return new o2();
            case "[object Number]":
            case "[object String]":
              return new o2(t3);
            case "[object RegExp]":
              return br(t3);
            case "[object Symbol]":
              return jr(t3);
          }
        };
        var Er = Object.create;
        const Or = function() {
          function t3() {
          }
          return function(e3) {
            if (!d(e3))
              return {};
            if (Er)
              return Er(e3);
            t3.prototype = e3;
            var r3 = new t3();
            return t3.prototype = void 0, r3;
          };
        }();
        const Cr = function(t3) {
          return "function" != typeof t3.constructor || be(t3) ? {} : Or($e(t3));
        };
        const Pr = function(t3) {
          return S(t3) && "[object Map]" == dr(t3);
        };
        var Ar = le && le.isMap;
        const Tr = Ar ? ce(Ar) : Pr;
        const Sr = function(t3) {
          return S(t3) && "[object Set]" == dr(t3);
        };
        var Wr = le && le.isSet;
        const Rr = Wr ? ce(Wr) : Sr;
        var Ir = "[object Arguments]", Dr = "[object Function]", zr = "[object Object]", Mr = {};
        Mr[Ir] = Mr["[object Array]"] = Mr["[object ArrayBuffer]"] = Mr["[object DataView]"] = Mr["[object Boolean]"] = Mr["[object Date]"] = Mr["[object Float32Array]"] = Mr["[object Float64Array]"] = Mr["[object Int8Array]"] = Mr["[object Int16Array]"] = Mr["[object Int32Array]"] = Mr["[object Map]"] = Mr["[object Number]"] = Mr[zr] = Mr["[object RegExp]"] = Mr["[object Set]"] = Mr["[object String]"] = Mr["[object Symbol]"] = Mr["[object Uint8Array]"] = Mr["[object Uint8ClampedArray]"] = Mr["[object Uint16Array]"] = Mr["[object Uint32Array]"] = true, Mr["[object Error]"] = Mr[Dr] = Mr["[object WeakMap]"] = false;
        const Ur = function t3(e3, r3, o2, n2, i2, s2) {
          var a2, c2 = 1 & r3, u2 = 2 & r3, h2 = 4 & r3;
          if (o2 && (a2 = i2 ? o2(e3, n2, i2, s2) : o2(e3)), void 0 !== a2)
            return a2;
          if (!d(e3))
            return e3;
          var l2 = Jt(e3);
          if (l2) {
            if (a2 = fr(e3), !c2)
              return Me(e3, a2);
          } else {
            var f2 = dr(e3), p2 = f2 == Dr || "[object GeneratorFunction]" == f2;
            if (re(e3))
              return ze(e3, c2);
            if (f2 == zr || f2 == Ir || p2 && !i2) {
              if (a2 = u2 || p2 ? {} : Cr(e3), !c2)
                return u2 ? Ve(e3, Se(a2, e3)) : ke(e3, Oe(a2, e3));
            } else {
              if (!Mr[f2])
                return i2 ? e3 : {};
              a2 = xr(e3, f2, c2);
            }
          }
          s2 || (s2 = new Nt());
          var _2 = s2.get(e3);
          if (_2)
            return _2;
          s2.set(e3, a2), Rr(e3) ? e3.forEach(function(n3) {
            a2.add(t3(n3, r3, o2, n3, e3, s2));
          }) : Tr(e3) && e3.forEach(function(n3, i3) {
            a2.set(i3, t3(n3, r3, o2, i3, e3, s2));
          });
          var y2 = l2 ? void 0 : (h2 ? u2 ? Ge : Qe : u2 ? Te : Ee)(e3);
          return Ft(y2 || e3, function(n3, i3) {
            y2 && (n3 = e3[i3 = n3]), Bt(a2, i3, t3(n3, r3, o2, i3, e3, s2));
          }), a2;
        };
        const Nr = function(t3, e3) {
          return Ur(t3, 5, e3 = "function" == typeof e3 ? e3 : void 0);
        };
        var Fr = Function.prototype, qr = Object.prototype, Lr = Fr.toString, kr = qr.hasOwnProperty, Br = Lr.call(Object);
        const $r = function(t3) {
          if (!S(t3) || "[object Object]" != T(t3))
            return false;
          var e3 = $e(t3);
          if (null === e3)
            return true;
          var r3 = kr.call(e3, "constructor") && e3.constructor;
          return "function" == typeof r3 && r3 instanceof r3 && Lr.call(r3) == Br;
        };
        const Hr = function(t3) {
          return S(t3) && 1 === t3.nodeType && !$r(t3);
        };
        class Vr extends a {
          constructor(t3, e3 = {}) {
            super(e3), this._editor = null, this._throttledSave = q(this._save.bind(this), "number" == typeof e3.saveInterval ? e3.saveInterval : 5e3), t3 && (this._creator = (e4, r3) => t3.create(e4, r3)), this._destructor = (t4) => t4.destroy();
          }
          get editor() {
            return this._editor;
          }
          get _item() {
            return this._editor;
          }
          setCreator(t3) {
            this._creator = t3;
          }
          setDestructor(t3) {
            this._destructor = t3;
          }
          _restart() {
            return Promise.resolve().then(() => (this.state = "initializing", this._fire("stateChange"), this._destroy())).catch((t3) => {
              console.error("An error happened during the editor destroying.", t3);
            }).then(() => {
              if ("string" == typeof this._elementOrData)
                return this.create(this._data, this._config, this._config.context);
              {
                const t3 = Object.assign({}, this._config, { initialData: this._data });
                return this.create(this._elementOrData, t3, t3.context);
              }
            }).then(() => {
              this._fire("restart");
            });
          }
          create(t3 = this._elementOrData, e3 = this._config, r3) {
            return Promise.resolve().then(() => (super._startErrorHandling(), this._elementOrData = t3, this._config = this._cloneEditorConfiguration(e3) || {}, this._config.context = r3, this._creator(t3, this._config))).then((t4) => {
              this._editor = t4, t4.model.document.on("change:data", this._throttledSave), this._lastDocumentVersion = t4.model.document.version, this._data = this._getData(), this.state = "ready", this._fire("stateChange");
            });
          }
          destroy() {
            return Promise.resolve().then(() => (this.state = "destroyed", this._fire("stateChange"), super.destroy(), this._destroy()));
          }
          _destroy() {
            return Promise.resolve().then(() => {
              this._stopErrorHandling(), this._throttledSave.flush();
              const t3 = this._editor;
              return this._editor = null, t3.model.document.off("change:data", this._throttledSave), this._destructor(t3);
            });
          }
          _save() {
            const t3 = this._editor.model.document.version;
            try {
              this._data = this._getData(), this._lastDocumentVersion = t3;
            } catch (t4) {
              console.error(t4, "An error happened during restoring editor data. Editor will be restored from the previously saved data.");
            }
          }
          _setExcludedProperties(t3) {
            this._excludedProps = t3;
          }
          _getData() {
            const t3 = {};
            for (const e3 of this._editor.model.document.getRootNames())
              t3[e3] = this._editor.data.get({ rootName: e3 });
            return t3;
          }
          _isErrorComingFromThisItem(t3) {
            return h(this._editor, t3.context, this._excludedProps);
          }
          _cloneEditorConfiguration(t3) {
            return Nr(t3, (t4, e3) => Hr(t4) || "context" === e3 ? t4 : void 0);
          }
        }
        const Kr = Symbol("MainQueueId");
        class Qr extends a {
          constructor(t3, e3 = {}) {
            super(e3), this._watchdogs = /* @__PURE__ */ new Map(), this._context = null, this._contextProps = /* @__PURE__ */ new Set(), this._actionQueues = new Gr(), this._watchdogConfig = e3, this._creator = (e4) => t3.create(e4), this._destructor = (t4) => t4.destroy(), this._actionQueues.onEmpty(() => {
              "initializing" === this.state && (this.state = "ready", this._fire("stateChange"));
            });
          }
          setCreator(t3) {
            this._creator = t3;
          }
          setDestructor(t3) {
            this._destructor = t3;
          }
          get context() {
            return this._context;
          }
          create(t3 = {}) {
            return this._actionQueues.enqueue(Kr, () => (this._contextConfig = t3, this._create()));
          }
          getItem(t3) {
            return this._getWatchdog(t3)._item;
          }
          getItemState(t3) {
            return this._getWatchdog(t3).state;
          }
          add(t3) {
            const e3 = Yr(t3);
            return Promise.all(e3.map((t4) => this._actionQueues.enqueue(t4.id, () => {
              if ("destroyed" === this.state)
                throw new Error("Cannot add items to destroyed watchdog.");
              if (!this._context)
                throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");
              let e4;
              if (this._watchdogs.has(t4.id))
                throw new Error(`Item with the given id is already added: '${t4.id}'.`);
              if ("editor" === t4.type)
                return e4 = new Vr(null, this._watchdogConfig), e4.setCreator(t4.creator), e4._setExcludedProperties(this._contextProps), t4.destructor && e4.setDestructor(t4.destructor), this._watchdogs.set(t4.id, e4), e4.on("error", (r3, { error: o2, causesRestart: n2 }) => {
                  this._fire("itemError", { itemId: t4.id, error: o2 }), n2 && this._actionQueues.enqueue(t4.id, () => new Promise((r4) => {
                    const o3 = () => {
                      e4.off("restart", o3), this._fire("itemRestart", { itemId: t4.id }), r4();
                    };
                    e4.on("restart", o3);
                  }));
                }), e4.create(t4.sourceElementOrData, t4.config, this._context);
              throw new Error(`Not supported item type: '${t4.type}'.`);
            })));
          }
          remove(t3) {
            const e3 = Yr(t3);
            return Promise.all(e3.map((t4) => this._actionQueues.enqueue(t4, () => {
              const e4 = this._getWatchdog(t4);
              return this._watchdogs.delete(t4), e4.destroy();
            })));
          }
          destroy() {
            return this._actionQueues.enqueue(Kr, () => (this.state = "destroyed", this._fire("stateChange"), super.destroy(), this._destroy()));
          }
          _restart() {
            return this._actionQueues.enqueue(Kr, () => (this.state = "initializing", this._fire("stateChange"), this._destroy().catch((t3) => {
              console.error("An error happened during destroying the context or items.", t3);
            }).then(() => this._create()).then(() => this._fire("restart"))));
          }
          _create() {
            return Promise.resolve().then(() => (this._startErrorHandling(), this._creator(this._contextConfig))).then((t3) => (this._context = t3, this._contextProps = c(this._context), Promise.all(Array.from(this._watchdogs.values()).map((t4) => (t4._setExcludedProperties(this._contextProps), t4.create(void 0, void 0, this._context))))));
          }
          _destroy() {
            return Promise.resolve().then(() => {
              this._stopErrorHandling();
              const t3 = this._context;
              return this._context = null, this._contextProps = /* @__PURE__ */ new Set(), Promise.all(Array.from(this._watchdogs.values()).map((t4) => t4.destroy())).then(() => this._destructor(t3));
            });
          }
          _getWatchdog(t3) {
            const e3 = this._watchdogs.get(t3);
            if (!e3)
              throw new Error(`Item with the given id was not registered: ${t3}.`);
            return e3;
          }
          _isErrorComingFromThisItem(t3) {
            for (const e3 of this._watchdogs.values())
              if (e3._isErrorComingFromThisItem(t3))
                return false;
            return h(this._context, t3.context);
          }
        }
        class Gr {
          constructor() {
            this._onEmptyCallbacks = [], this._queues = /* @__PURE__ */ new Map(), this._activeActions = 0;
          }
          onEmpty(t3) {
            this._onEmptyCallbacks.push(t3);
          }
          enqueue(t3, e3) {
            const r3 = t3 === Kr;
            this._activeActions++, this._queues.get(t3) || this._queues.set(t3, Promise.resolve());
            const o2 = (r3 ? Promise.all(this._queues.values()) : Promise.all([this._queues.get(Kr), this._queues.get(t3)])).then(e3), n2 = o2.catch(() => {
            });
            return this._queues.set(t3, n2), o2.finally(() => {
              this._activeActions--, this._queues.get(t3) === n2 && 0 === this._activeActions && this._onEmptyCallbacks.forEach((t4) => t4());
            });
          }
        }
        function Yr(t3) {
          return Array.isArray(t3) ? t3 : [t3];
        }
        const Jr = e2().createContext("contextWatchdog");
        class Xr extends e2().Component {
          constructor(t3, e3) {
            super(t3, e3), this.contextWatchdog = null, this.props.isLayoutReady && this._initializeContextWatchdog(this.props.config);
          }
          shouldComponentUpdate(t3) {
            return this._shouldComponentUpdate(t3);
          }
          async _shouldComponentUpdate(t3) {
            return t3.id !== this.props.id && (this.contextWatchdog && await this.contextWatchdog.destroy(), await this._initializeContextWatchdog(t3.config)), t3.isLayoutReady && !this.contextWatchdog ? (await this._initializeContextWatchdog(t3.config), true) : this.props.children !== t3.children;
          }
          render() {
            return e2().createElement(Jr.Provider, { value: this.contextWatchdog }, this.props.children);
          }
          componentWillUnmount() {
            this._destroyContext();
          }
          async _initializeContextWatchdog(t3) {
            this.contextWatchdog = new Qr(this.props.context, this.props.watchdogConfig), this.contextWatchdog.on("error", (t4, e3) => {
              this.props.onError(e3.error, { phase: "runtime", willContextRestart: e3.causesRestart });
            }), this.contextWatchdog.on("stateChange", () => {
              "ready" === this.contextWatchdog.state && this.props.onReady && this.props.onReady(this.contextWatchdog.context);
            }), await this.contextWatchdog.create(t3).catch((t4) => {
              this.props.onError(t4, { phase: "initialization", willContextRestart: false });
            });
          }
          async _destroyContext() {
            this.contextWatchdog && (await this.contextWatchdog.destroy(), this.contextWatchdog = null);
          }
        }
        Xr.defaultProps = { isLayoutReady: true, onError: (t3, e3) => console.error(t3, e3) }, Xr.propTypes = { id: i().string, isLayoutReady: i().bool, context: i().func, watchdogConfig: i().object, config: i().object, onReady: i().func, onError: i().func };
        const Zr = "Lock from React integration (@ckeditor/ckeditor5-react)";
        class to extends e2().Component {
          constructor(t3) {
            super(t3), this.editorDestructionInProgress = null, this.domContainer = e2().createRef(), this.watchdog = null;
            const { CKEDITOR_VERSION: r3 } = window;
            if (r3) {
              const [t4] = r3.split(".").map(Number);
              t4 < 37 && console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.");
            } else
              console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');
          }
          get editor() {
            return this.watchdog ? this.watchdog.editor : null;
          }
          shouldComponentUpdate(t3) {
            return !!this.editor && (t3.id !== this.props.id || (this._shouldUpdateEditor(t3) && this.editor.data.set(t3.data), "disabled" in t3 && (t3.disabled ? this.editor.enableReadOnlyMode(Zr) : this.editor.disableReadOnlyMode(Zr)), false));
          }
          async componentDidMount() {
            await this._initializeEditor();
          }
          async componentDidUpdate() {
            await this._destroyEditor(), await this._initializeEditor();
          }
          async componentWillUnmount() {
            await this._destroyEditor();
          }
          render() {
            return e2().createElement("div", { ref: this.domContainer });
          }
          async _initializeEditor() {
            await this.editorDestructionInProgress, this.watchdog || (this.context instanceof Qr ? this.watchdog = new eo(this.context) : this.watchdog = new to._EditorWatchdog(this.props.editor, this.props.watchdogConfig), this.watchdog.setCreator((t3, e3) => this._createEditor(t3, e3)), this.watchdog.on("error", (t3, { error: e3, causesRestart: r3 }) => {
              (this.props.onError || console.error)(e3, { phase: "runtime", willEditorRestart: r3 });
            }), await this.watchdog.create(this.domContainer.current, this._getConfig()).catch((t3) => {
              (this.props.onError || console.error)(t3, { phase: "initialization", willEditorRestart: false });
            }));
          }
          _createEditor(t3, e3) {
            return this.props.editor.create(t3, e3).then((t4) => {
              "disabled" in this.props && this.props.disabled && t4.enableReadOnlyMode(Zr);
              const e4 = t4.model.document, r3 = t4.editing.view.document;
              return e4.on("change:data", (e5) => {
                this.props.onChange && this.props.onChange(e5, t4);
              }), r3.on("focus", (e5) => {
                this.props.onFocus && this.props.onFocus(e5, t4);
              }), r3.on("blur", (e5) => {
                this.props.onBlur && this.props.onBlur(e5, t4);
              }), setTimeout(() => {
                this.props.onReady && this.props.onReady(t4);
              }), t4;
            });
          }
          async _destroyEditor() {
            this.editorDestructionInProgress = new Promise((t3) => {
              setTimeout(() => {
                this.watchdog ? this.watchdog.destroy().then(() => {
                  this.watchdog = null, t3();
                }) : t3();
              });
            });
          }
          _shouldUpdateEditor(t3) {
            return this.props.data !== t3.data && this.editor.data.get() !== t3.data;
          }
          _getConfig() {
            const t3 = this.props.config || {};
            return this.props.data && t3.initialData && console.warn("Editor data should be provided either using `config.initialData` or `data` properties. The config property is over the data value and the first one will be used when specified both."), { ...t3, initialData: t3.initialData || this.props.data || "" };
          }
        }
        to.contextType = Jr, to.propTypes = { editor: i().func.isRequired, data: i().string, config: i().object, watchdogConfig: i().object, onChange: i().func, onReady: i().func, onFocus: i().func, onBlur: i().func, onError: i().func, disabled: i().bool, id: i().any }, to._EditorWatchdog = Vr;
        class eo {
          constructor(t3) {
            this._contextWatchdog = t3, this._id = function() {
              const t4 = 4294967296 * Math.random() >>> 0, e3 = 4294967296 * Math.random() >>> 0, r3 = 4294967296 * Math.random() >>> 0, o2 = 4294967296 * Math.random() >>> 0;
              return "e" + s[t4 >> 0 & 255] + s[t4 >> 8 & 255] + s[t4 >> 16 & 255] + s[t4 >> 24 & 255] + s[e3 >> 0 & 255] + s[e3 >> 8 & 255] + s[e3 >> 16 & 255] + s[e3 >> 24 & 255] + s[r3 >> 0 & 255] + s[r3 >> 8 & 255] + s[r3 >> 16 & 255] + s[r3 >> 24 & 255] + s[o2 >> 0 & 255] + s[o2 >> 8 & 255] + s[o2 >> 16 & 255] + s[o2 >> 24 & 255];
            }();
          }
          setCreator(t3) {
            this._creator = t3;
          }
          create(t3, e3) {
            return this._contextWatchdog.add({ sourceElementOrData: t3, config: e3, creator: this._creator, id: this._id, type: "editor" });
          }
          on(t3, e3) {
            this._contextWatchdog.on("itemError", (t4, { itemId: r3, error: o2 }) => {
              r3 === this._id && e3(null, { error: o2, causesRestart: void 0 });
            });
          }
          destroy() {
            return "ready" === this._contextWatchdog.state ? this._contextWatchdog.remove(this._id) : Promise.resolve();
          }
          get editor() {
            return this._contextWatchdog.getItem(this._id);
          }
        }
      })(), n;
    })());
  }
});
export default require_dist();
/*! Bundled license information:

@ckeditor/ckeditor5-react/dist/index.js:
  (*!
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md.
   *)
*/
//# sourceMappingURL=@ckeditor_ckeditor5-react.js.map
