"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTrackedRef = void 0;
var react_1 = require("react");
var TrackedReference = (function () {
    function TrackedReference(ref) {
        this.callbackStack = [];
        this.lastId = 0;
        this.reference = ref;
    }
    TrackedReference.prototype.addListener = function (callback) {
        var id = this.lastId++;
        this.callbackStack.push({
            id: id,
            callback: callback,
        });
        return id;
    };
    TrackedReference.prototype.removeListener = function (id) {
        this.callbackStack = this.callbackStack.filter(function (entry) { return entry.id !== id; });
    };
    Object.defineProperty(TrackedReference.prototype, "current", {
        get: function () {
            return this.reference;
        },
        set: function (newVal) {
            var e_1, _a;
            var _this = this;
            if (newVal !== this.current) {
                this.reference = newVal;
                var _loop_1 = function (c) {
                    c.callback(newVal, function () {
                        _this.removeListener(c.id);
                    });
                };
                try {
                    for (var _b = __values(this.callbackStack), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        _loop_1(c);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return TrackedReference;
}());
function useTrackedRef(val) {
    var tf = react_1.useRef(new TrackedReference(val));
    return tf.current;
}
exports.useTrackedRef = useTrackedRef;
