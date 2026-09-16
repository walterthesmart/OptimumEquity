import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/core.cjs
var require_core$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.globalConfig = exports.$ZodEncodeError = exports.$ZodAsyncError = exports.$brand = exports.NEVER = void 0;
	exports.$constructor = $constructor;
	exports.config = config;
	/** A special constant with type `never` */
	exports.NEVER = Object.freeze({ status: "aborted" });
	function $constructor(name, initializer, params) {
		function init(inst, def) {
			if (!inst._zod) Object.defineProperty(inst, "_zod", {
				value: {
					def,
					constr: _,
					traits: /* @__PURE__ */ new Set()
				},
				enumerable: false
			});
			if (inst._zod.traits.has(name)) return;
			inst._zod.traits.add(name);
			initializer(inst, def);
			const proto = _.prototype;
			const keys = Object.keys(proto);
			for (let i = 0; i < keys.length; i++) {
				const k = keys[i];
				if (!(k in inst)) inst[k] = proto[k].bind(inst);
			}
		}
		const Parent = params?.Parent ?? Object;
		class Definition extends Parent {}
		Object.defineProperty(Definition, "name", { value: name });
		function _(def) {
			var _a;
			const inst = params?.Parent ? new Definition() : this;
			init(inst, def);
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			for (const fn of inst._zod.deferred) fn();
			return inst;
		}
		Object.defineProperty(_, "init", { value: init });
		Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
			if (params?.Parent && inst instanceof params.Parent) return true;
			return inst?._zod?.traits?.has(name);
		} });
		Object.defineProperty(_, "name", { value: name });
		return _;
	}
	exports.$brand = Symbol("zod_brand");
	var $ZodAsyncError = class extends Error {
		constructor() {
			super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
		}
	};
	exports.$ZodAsyncError = $ZodAsyncError;
	var $ZodEncodeError = class extends Error {
		constructor(name) {
			super(`Encountered unidirectional transform during encode: ${name}`);
			this.name = "ZodEncodeError";
		}
	};
	exports.$ZodEncodeError = $ZodEncodeError;
	(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
	exports.globalConfig = globalThis.__zod_globalConfig;
	function config(newConfig) {
		if (newConfig) Object.assign(exports.globalConfig, newConfig);
		return exports.globalConfig;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/util.cjs
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Class = exports.BIGINT_FORMAT_RANGES = exports.NUMBER_FORMAT_RANGES = exports.primitiveTypes = exports.propertyKeyTypes = exports.getParsedType = exports.allowsEval = exports.captureStackTrace = void 0;
	exports.assertEqual = assertEqual;
	exports.assertNotEqual = assertNotEqual;
	exports.assertIs = assertIs;
	exports.assertNever = assertNever;
	exports.assert = assert;
	exports.getEnumValues = getEnumValues;
	exports.joinValues = joinValues;
	exports.jsonStringifyReplacer = jsonStringifyReplacer;
	exports.cached = cached;
	exports.nullish = nullish;
	exports.cleanRegex = cleanRegex;
	exports.floatSafeRemainder = floatSafeRemainder;
	exports.defineLazy = defineLazy;
	exports.objectClone = objectClone;
	exports.assignProp = assignProp;
	exports.mergeDefs = mergeDefs;
	exports.cloneDef = cloneDef;
	exports.getElementAtPath = getElementAtPath;
	exports.promiseAllObject = promiseAllObject;
	exports.randomString = randomString;
	exports.esc = esc;
	exports.slugify = slugify;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.shallowClone = shallowClone;
	exports.numKeys = numKeys;
	exports.escapeRegex = escapeRegex;
	exports.clone = clone;
	exports.normalizeParams = normalizeParams;
	exports.createTransparentProxy = createTransparentProxy;
	exports.stringifyPrimitive = stringifyPrimitive;
	exports.optionalKeys = optionalKeys;
	exports.pick = pick;
	exports.omit = omit;
	exports.extend = extend;
	exports.safeExtend = safeExtend;
	exports.merge = merge;
	exports.partial = partial;
	exports.required = required;
	exports.aborted = aborted;
	exports.explicitlyAborted = explicitlyAborted;
	exports.prefixIssues = prefixIssues;
	exports.unwrapMessage = unwrapMessage;
	exports.finalizeIssue = finalizeIssue;
	exports.getSizableOrigin = getSizableOrigin;
	exports.getLengthableOrigin = getLengthableOrigin;
	exports.parsedType = parsedType;
	exports.issue = issue;
	exports.cleanEnum = cleanEnum;
	exports.base64ToUint8Array = base64ToUint8Array;
	exports.uint8ArrayToBase64 = uint8ArrayToBase64;
	exports.base64urlToUint8Array = base64urlToUint8Array;
	exports.uint8ArrayToBase64url = uint8ArrayToBase64url;
	exports.hexToUint8Array = hexToUint8Array;
	exports.uint8ArrayToHex = uint8ArrayToHex;
	var core_js_1 = require_core$1();
	function assertEqual(val) {
		return val;
	}
	function assertNotEqual(val) {
		return val;
	}
	function assertIs(_arg) {}
	function assertNever(_x) {
		throw new Error("Unexpected value in exhaustive check");
	}
	function assert(_) {}
	function getEnumValues(entries) {
		const numericValues = Object.values(entries).filter((v) => typeof v === "number");
		return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
	}
	function joinValues(array, separator = "|") {
		return array.map((val) => stringifyPrimitive(val)).join(separator);
	}
	function jsonStringifyReplacer(_, value) {
		if (typeof value === "bigint") return value.toString();
		return value;
	}
	function cached(getter) {
		return { get value() {
			{
				const value = getter();
				Object.defineProperty(this, "value", { value });
				return value;
			}
		} };
	}
	function nullish(input) {
		return input === null || input === void 0;
	}
	function cleanRegex(source) {
		const start = source.startsWith("^") ? 1 : 0;
		const end = source.endsWith("$") ? source.length - 1 : source.length;
		return source.slice(start, end);
	}
	function floatSafeRemainder(val, step) {
		const ratio = val / step;
		const roundedRatio = Math.round(ratio);
		const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
		if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
		return ratio - roundedRatio;
	}
	var EVALUATING = /* @__PURE__*/ Symbol("evaluating");
	function defineLazy(object, key, getter) {
		let value = void 0;
		Object.defineProperty(object, key, {
			get() {
				if (value === EVALUATING) return;
				if (value === void 0) {
					value = EVALUATING;
					value = getter();
				}
				return value;
			},
			set(v) {
				Object.defineProperty(object, key, { value: v });
			},
			configurable: true
		});
	}
	function objectClone(obj) {
		return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
	}
	function assignProp(target, prop, value) {
		Object.defineProperty(target, prop, {
			value,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}
	function mergeDefs(...defs) {
		const mergedDescriptors = {};
		for (const def of defs) {
			const descriptors = Object.getOwnPropertyDescriptors(def);
			Object.assign(mergedDescriptors, descriptors);
		}
		return Object.defineProperties({}, mergedDescriptors);
	}
	function cloneDef(schema) {
		return mergeDefs(schema._zod.def);
	}
	function getElementAtPath(obj, path) {
		if (!path) return obj;
		return path.reduce((acc, key) => acc?.[key], obj);
	}
	function promiseAllObject(promisesObj) {
		const keys = Object.keys(promisesObj);
		const promises = keys.map((key) => promisesObj[key]);
		return Promise.all(promises).then((results) => {
			const resolvedObj = {};
			for (let i = 0; i < keys.length; i++) resolvedObj[keys[i]] = results[i];
			return resolvedObj;
		});
	}
	function randomString(length = 10) {
		const chars = "abcdefghijklmnopqrstuvwxyz";
		let str = "";
		for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * 26)];
		return str;
	}
	function esc(str) {
		return JSON.stringify(str);
	}
	function slugify(input) {
		return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
	}
	exports.captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
	function isObject(data) {
		return typeof data === "object" && data !== null && !Array.isArray(data);
	}
	exports.allowsEval = cached(() => {
		if (core_js_1.globalConfig.jitless) return false;
		if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
		try {
			new Function("");
			return true;
		} catch (_) {
			return false;
		}
	});
	function isPlainObject(o) {
		if (isObject(o) === false) return false;
		const ctor = o.constructor;
		if (ctor === void 0) return true;
		if (typeof ctor !== "function") return true;
		const prot = ctor.prototype;
		if (isObject(prot) === false) return false;
		if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
		return true;
	}
	function shallowClone(o) {
		if (isPlainObject(o)) return { ...o };
		if (Array.isArray(o)) return [...o];
		if (o instanceof Map) return new Map(o);
		if (o instanceof Set) return new Set(o);
		return o;
	}
	function numKeys(data) {
		let keyCount = 0;
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) keyCount++;
		return keyCount;
	}
	var getParsedType = (data) => {
		const t = typeof data;
		switch (t) {
			case "undefined": return "undefined";
			case "string": return "string";
			case "number": return Number.isNaN(data) ? "nan" : "number";
			case "boolean": return "boolean";
			case "function": return "function";
			case "bigint": return "bigint";
			case "symbol": return "symbol";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return "promise";
				if (typeof Map !== "undefined" && data instanceof Map) return "map";
				if (typeof Set !== "undefined" && data instanceof Set) return "set";
				if (typeof Date !== "undefined" && data instanceof Date) return "date";
				if (typeof File !== "undefined" && data instanceof File) return "file";
				return "object";
			default: throw new Error(`Unknown data type: ${t}`);
		}
	};
	exports.getParsedType = getParsedType;
	exports.propertyKeyTypes = /* @__PURE__ */ new Set([
		"string",
		"number",
		"symbol"
	]);
	exports.primitiveTypes = /* @__PURE__ */ new Set([
		"string",
		"number",
		"bigint",
		"boolean",
		"symbol",
		"undefined"
	]);
	function escapeRegex(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	function clone(inst, def, params) {
		const cl = new inst._zod.constr(def ?? inst._zod.def);
		if (!def || params?.parent) cl._zod.parent = inst;
		return cl;
	}
	function normalizeParams(_params) {
		const params = _params;
		if (!params) return {};
		if (typeof params === "string") return { error: () => params };
		if (params?.message !== void 0) {
			if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
			params.error = params.message;
		}
		delete params.message;
		if (typeof params.error === "string") return {
			...params,
			error: () => params.error
		};
		return params;
	}
	function createTransparentProxy(getter) {
		let target;
		return new Proxy({}, {
			get(_, prop, receiver) {
				target ?? (target = getter());
				return Reflect.get(target, prop, receiver);
			},
			set(_, prop, value, receiver) {
				target ?? (target = getter());
				return Reflect.set(target, prop, value, receiver);
			},
			has(_, prop) {
				target ?? (target = getter());
				return Reflect.has(target, prop);
			},
			deleteProperty(_, prop) {
				target ?? (target = getter());
				return Reflect.deleteProperty(target, prop);
			},
			ownKeys(_) {
				target ?? (target = getter());
				return Reflect.ownKeys(target);
			},
			getOwnPropertyDescriptor(_, prop) {
				target ?? (target = getter());
				return Reflect.getOwnPropertyDescriptor(target, prop);
			},
			defineProperty(_, prop, descriptor) {
				target ?? (target = getter());
				return Reflect.defineProperty(target, prop, descriptor);
			}
		});
	}
	function stringifyPrimitive(value) {
		if (typeof value === "bigint") return value.toString() + "n";
		if (typeof value === "string") return `"${value}"`;
		return `${value}`;
	}
	function optionalKeys(shape) {
		return Object.keys(shape).filter((k) => {
			return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
		});
	}
	exports.NUMBER_FORMAT_RANGES = {
		safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	};
	exports.BIGINT_FORMAT_RANGES = {
		int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
		uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
	};
	function pick(schema, mask) {
		const currDef = schema._zod.def;
		const checks = currDef.checks;
		if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
		return clone(schema, mergeDefs(schema._zod.def, {
			get shape() {
				const newShape = {};
				for (const key in mask) {
					if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					newShape[key] = currDef.shape[key];
				}
				assignProp(this, "shape", newShape);
				return newShape;
			},
			checks: []
		}));
	}
	function omit(schema, mask) {
		const currDef = schema._zod.def;
		const checks = currDef.checks;
		if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
		return clone(schema, mergeDefs(schema._zod.def, {
			get shape() {
				const newShape = { ...schema._zod.def.shape };
				for (const key in mask) {
					if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					delete newShape[key];
				}
				assignProp(this, "shape", newShape);
				return newShape;
			},
			checks: []
		}));
	}
	function extend(schema, shape) {
		if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
		const checks = schema._zod.def.checks;
		if (checks && checks.length > 0) {
			const existingShape = schema._zod.def.shape;
			for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
		}
		return clone(schema, mergeDefs(schema._zod.def, { get shape() {
			const _shape = {
				...schema._zod.def.shape,
				...shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		} }));
	}
	function safeExtend(schema, shape) {
		if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
		return clone(schema, mergeDefs(schema._zod.def, { get shape() {
			const _shape = {
				...schema._zod.def.shape,
				...shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		} }));
	}
	function merge(a, b) {
		if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
		return clone(a, mergeDefs(a._zod.def, {
			get shape() {
				const _shape = {
					...a._zod.def.shape,
					...b._zod.def.shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			},
			get catchall() {
				return b._zod.def.catchall;
			},
			checks: b._zod.def.checks ?? []
		}));
	}
	function partial(Class, schema, mask) {
		const checks = schema._zod.def.checks;
		if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
		return clone(schema, mergeDefs(schema._zod.def, {
			get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
				}
				else for (const key in oldShape) shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
				assignProp(this, "shape", shape);
				return shape;
			},
			checks: []
		}));
	}
	function required(Class, schema, mask) {
		return clone(schema, mergeDefs(schema._zod.def, { get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
			}
			else for (const key in oldShape) shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
			assignProp(this, "shape", shape);
			return shape;
		} }));
	}
	function aborted(x, startIndex = 0) {
		if (x.aborted === true) return true;
		for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
		return false;
	}
	function explicitlyAborted(x, startIndex = 0) {
		if (x.aborted === true) return true;
		for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
		return false;
	}
	function prefixIssues(path, issues) {
		return issues.map((iss) => {
			var _a;
			(_a = iss).path ?? (_a.path = []);
			iss.path.unshift(path);
			return iss;
		});
	}
	function unwrapMessage(message) {
		return typeof message === "string" ? message : message?.message;
	}
	function finalizeIssue(iss, ctx, config) {
		const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
		const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
		rest.path ?? (rest.path = []);
		rest.message = message;
		if (ctx?.reportInput) rest.input = _input;
		return rest;
	}
	function getSizableOrigin(input) {
		if (input instanceof Set) return "set";
		if (input instanceof Map) return "map";
		if (input instanceof File) return "file";
		return "unknown";
	}
	function getLengthableOrigin(input) {
		if (Array.isArray(input)) return "array";
		if (typeof input === "string") return "string";
		return "unknown";
	}
	function parsedType(data) {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "nan" : "number";
			case "object": {
				if (data === null) return "null";
				if (Array.isArray(data)) return "array";
				const obj = data;
				if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
			}
		}
		return t;
	}
	function issue(...args) {
		const [iss, input, inst] = args;
		if (typeof iss === "string") return {
			message: iss,
			code: "custom",
			input,
			inst
		};
		return { ...iss };
	}
	function cleanEnum(obj) {
		return Object.entries(obj).filter(([k, _]) => {
			return Number.isNaN(Number.parseInt(k, 10));
		}).map((el) => el[1]);
	}
	function base64ToUint8Array(base64) {
		const binaryString = atob(base64);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
		return bytes;
	}
	function uint8ArrayToBase64(bytes) {
		let binaryString = "";
		for (let i = 0; i < bytes.length; i++) binaryString += String.fromCharCode(bytes[i]);
		return btoa(binaryString);
	}
	function base64urlToUint8Array(base64url) {
		const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
		return base64ToUint8Array(base64 + "=".repeat((4 - base64.length % 4) % 4));
	}
	function uint8ArrayToBase64url(bytes) {
		return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	}
	function hexToUint8Array(hex) {
		const cleanHex = hex.replace(/^0x/, "");
		if (cleanHex.length % 2 !== 0) throw new Error("Invalid hex string length");
		const bytes = new Uint8Array(cleanHex.length / 2);
		for (let i = 0; i < cleanHex.length; i += 2) bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
		return bytes;
	}
	function uint8ArrayToHex(bytes) {
		return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
	}
	var Class = class {
		constructor(..._args) {}
	};
	exports.Class = Class;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/errors.cjs
var require_errors$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.$ZodRealError = exports.$ZodError = void 0;
	exports.flattenError = flattenError;
	exports.formatError = formatError;
	exports.treeifyError = treeifyError;
	exports.toDotPath = toDotPath;
	exports.prettifyError = prettifyError;
	var core_js_1 = require_core$1();
	var util = __importStar(require_util());
	var initializer = (inst, def) => {
		inst.name = "$ZodError";
		Object.defineProperty(inst, "_zod", {
			value: inst._zod,
			enumerable: false
		});
		Object.defineProperty(inst, "issues", {
			value: def,
			enumerable: false
		});
		inst.message = JSON.stringify(def, util.jsonStringifyReplacer, 2);
		Object.defineProperty(inst, "toString", {
			value: () => inst.message,
			enumerable: false
		});
	};
	exports.$ZodError = (0, core_js_1.$constructor)("$ZodError", initializer);
	exports.$ZodRealError = (0, core_js_1.$constructor)("$ZodError", initializer, { Parent: Error });
	function flattenError(error, mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of error.issues) if (sub.path.length > 0) {
			fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
			fieldErrors[sub.path[0]].push(mapper(sub));
		} else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	function formatError(error, mapper = (issue) => issue.message) {
		const fieldErrors = { _errors: [] };
		const processError = (error, path = []) => {
			for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
			else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else {
				const fullpath = [...path, ...issue.path];
				if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
				else {
					let curr = fieldErrors;
					let i = 0;
					while (i < fullpath.length) {
						const el = fullpath[i];
						if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
						else {
							curr[el] = curr[el] || { _errors: [] };
							curr[el]._errors.push(mapper(issue));
						}
						curr = curr[el];
						i++;
					}
				}
			}
		};
		processError(error);
		return fieldErrors;
	}
	function treeifyError(error, mapper = (issue) => issue.message) {
		const result = { errors: [] };
		const processError = (error, path = []) => {
			var _a, _b;
			for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
			else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
			else {
				const fullpath = [...path, ...issue.path];
				if (fullpath.length === 0) {
					result.errors.push(mapper(issue));
					continue;
				}
				let curr = result;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					const terminal = i === fullpath.length - 1;
					if (typeof el === "string") {
						curr.properties ?? (curr.properties = {});
						(_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
						curr = curr.properties[el];
					} else {
						curr.items ?? (curr.items = []);
						(_b = curr.items)[el] ?? (_b[el] = { errors: [] });
						curr = curr.items[el];
					}
					if (terminal) curr.errors.push(mapper(issue));
					i++;
				}
			}
		};
		processError(error);
		return result;
	}
	/** Format a ZodError as a human-readable string in the following form.
	*
	* From
	*
	* ```ts
	* ZodError {
	*   issues: [
	*     {
	*       expected: 'string',
	*       code: 'invalid_type',
	*       path: [ 'username' ],
	*       message: 'Invalid input: expected string'
	*     },
	*     {
	*       expected: 'number',
	*       code: 'invalid_type',
	*       path: [ 'favoriteNumbers', 1 ],
	*       message: 'Invalid input: expected number'
	*     }
	*   ];
	* }
	* ```
	*
	* to
	*
	* ```
	* username
	*   ✖ Expected number, received string at "username
	* favoriteNumbers[0]
	*   ✖ Invalid input: expected number
	* ```
	*/
	function toDotPath(_path) {
		const segs = [];
		const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
		for (const seg of path) if (typeof seg === "number") segs.push(`[${seg}]`);
		else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`);
		else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`);
		else {
			if (segs.length) segs.push(".");
			segs.push(seg);
		}
		return segs.join("");
	}
	function prettifyError(error) {
		const lines = [];
		const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
		for (const issue of issues) {
			lines.push(`✖ ${issue.message}`);
			if (issue.path?.length) lines.push(`  → at ${toDotPath(issue.path)}`);
		}
		return lines.join("\n");
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/parse.cjs
var require_parse$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.safeDecodeAsync = exports._safeDecodeAsync = exports.safeEncodeAsync = exports._safeEncodeAsync = exports.safeDecode = exports._safeDecode = exports.safeEncode = exports._safeEncode = exports.decodeAsync = exports._decodeAsync = exports.encodeAsync = exports._encodeAsync = exports.decode = exports._decode = exports.encode = exports._encode = exports.safeParseAsync = exports._safeParseAsync = exports.safeParse = exports._safeParse = exports.parseAsync = exports._parseAsync = exports.parse = exports._parse = void 0;
	var core = __importStar(require_core$1());
	var errors = __importStar(require_errors$1());
	var util = __importStar(require_util());
	var _parse = (_Err) => (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new core.$ZodAsyncError();
		if (result.issues.length) {
			const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
			util.captureStackTrace(e, _params?.callee);
			throw e;
		}
		return result.value;
	};
	exports._parse = _parse;
	exports.parse = (0, exports._parse)(errors.$ZodRealError);
	var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true
		} : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		if (result.issues.length) {
			const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())));
			util.captureStackTrace(e, params?.callee);
			throw e;
		}
		return result.value;
	};
	exports._parseAsync = _parseAsync;
	exports.parseAsync = (0, exports._parseAsync)(errors.$ZodRealError);
	var _safeParse = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new core.$ZodAsyncError();
		return result.issues.length ? {
			success: false,
			error: new (_Err ?? errors.$ZodError)(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
		} : {
			success: true,
			data: result.value
		};
	};
	exports._safeParse = _safeParse;
	exports.safeParse = (0, exports._safeParse)(errors.$ZodRealError);
	var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true
		} : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		return result.issues.length ? {
			success: false,
			error: new _Err(result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
		} : {
			success: true,
			data: result.value
		};
	};
	exports._safeParseAsync = _safeParseAsync;
	exports.safeParseAsync = (0, exports._safeParseAsync)(errors.$ZodRealError);
	var _encode = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return (0, exports._parse)(_Err)(schema, value, ctx);
	};
	exports._encode = _encode;
	exports.encode = (0, exports._encode)(errors.$ZodRealError);
	var _decode = (_Err) => (schema, value, _ctx) => {
		return (0, exports._parse)(_Err)(schema, value, _ctx);
	};
	exports._decode = _decode;
	exports.decode = (0, exports._decode)(errors.$ZodRealError);
	var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return (0, exports._parseAsync)(_Err)(schema, value, ctx);
	};
	exports._encodeAsync = _encodeAsync;
	exports.encodeAsync = (0, exports._encodeAsync)(errors.$ZodRealError);
	var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
		return (0, exports._parseAsync)(_Err)(schema, value, _ctx);
	};
	exports._decodeAsync = _decodeAsync;
	exports.decodeAsync = (0, exports._decodeAsync)(errors.$ZodRealError);
	var _safeEncode = (_Err) => (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return (0, exports._safeParse)(_Err)(schema, value, ctx);
	};
	exports._safeEncode = _safeEncode;
	exports.safeEncode = (0, exports._safeEncode)(errors.$ZodRealError);
	var _safeDecode = (_Err) => (schema, value, _ctx) => {
		return (0, exports._safeParse)(_Err)(schema, value, _ctx);
	};
	exports._safeDecode = _safeDecode;
	exports.safeDecode = (0, exports._safeDecode)(errors.$ZodRealError);
	var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return (0, exports._safeParseAsync)(_Err)(schema, value, ctx);
	};
	exports._safeEncodeAsync = _safeEncodeAsync;
	exports.safeEncodeAsync = (0, exports._safeEncodeAsync)(errors.$ZodRealError);
	var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
		return (0, exports._safeParseAsync)(_Err)(schema, value, _ctx);
	};
	exports._safeDecodeAsync = _safeDecodeAsync;
	exports.safeDecodeAsync = (0, exports._safeDecodeAsync)(errors.$ZodRealError);
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/regexes.cjs
var require_regexes = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sha256_base64url = exports.sha256_base64 = exports.sha256_hex = exports.sha1_base64url = exports.sha1_base64 = exports.sha1_hex = exports.md5_base64url = exports.md5_base64 = exports.md5_hex = exports.hex = exports.uppercase = exports.lowercase = exports.undefined = exports.null = exports.boolean = exports.number = exports.integer = exports.bigint = exports.string = exports.date = exports.e164 = exports.httpProtocol = exports.domain = exports.hostname = exports.base64url = exports.base64 = exports.cidrv6 = exports.cidrv4 = exports.mac = exports.ipv6 = exports.ipv4 = exports.browserEmail = exports.idnEmail = exports.unicodeEmail = exports.rfc5322Email = exports.html5Email = exports.email = exports.uuid7 = exports.uuid6 = exports.uuid4 = exports.uuid = exports.guid = exports.extendedDuration = exports.duration = exports.nanoid = exports.ksuid = exports.xid = exports.ulid = exports.cuid2 = exports.cuid = void 0;
	exports.sha512_base64url = exports.sha512_base64 = exports.sha512_hex = exports.sha384_base64url = exports.sha384_base64 = exports.sha384_hex = void 0;
	exports.emoji = emoji;
	exports.time = time;
	exports.datetime = datetime;
	var util = __importStar(require_util());
	/**
	* @deprecated CUID v1 is deprecated by its authors due to information leakage
	* (timestamps embedded in the id). Use {@link cuid2} instead.
	* See https://github.com/paralleldrive/cuid.
	*/
	exports.cuid = /^[cC][0-9a-z]{6,}$/;
	exports.cuid2 = /^[0-9a-z]+$/;
	exports.ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
	exports.xid = /^[0-9a-vA-V]{20}$/;
	exports.ksuid = /^[A-Za-z0-9]{27}$/;
	exports.nanoid = /^[a-zA-Z0-9_-]{21}$/;
	/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
	exports.duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
	/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
	exports.extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
	/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
	exports.guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
	/** Returns a regex for validating an RFC 9562/4122 UUID.
	*
	* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
	var uuid = (version) => {
		if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
		return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
	};
	exports.uuid = uuid;
	exports.uuid4 = (0, exports.uuid)(4);
	exports.uuid6 = (0, exports.uuid)(6);
	exports.uuid7 = (0, exports.uuid)(7);
	/** Practical email validation */
	exports.email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
	/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
	exports.html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	/** The classic emailregex.com regex for RFC 5322-compliant emails */
	exports.rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
	exports.unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
	exports.idnEmail = exports.unicodeEmail;
	exports.browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
	function emoji() {
		return new RegExp(_emoji, "u");
	}
	exports.ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
	exports.ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
	var mac = (delimiter) => {
		const escapedDelim = util.escapeRegex(delimiter ?? ":");
		return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
	};
	exports.mac = mac;
	exports.cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
	exports.cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
	exports.base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
	exports.base64url = /^[A-Za-z0-9_-]*$/;
	exports.hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
	exports.domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
	exports.httpProtocol = /^https?$/;
	exports.e164 = /^\+[1-9]\d{6,14}$/;
	var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
	exports.date = new RegExp(`^${dateSource}$`);
	function timeSource(args) {
		const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
		return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
	}
	function time(args) {
		return new RegExp(`^${timeSource(args)}$`);
	}
	function datetime(args) {
		const time = timeSource({ precision: args.precision });
		const opts = ["Z"];
		if (args.local) opts.push("");
		if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
		const timeRegex = `${time}(?:${opts.join("|")})`;
		return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
	}
	var string = (params) => {
		const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
		return new RegExp(`^${regex}$`);
	};
	exports.string = string;
	exports.bigint = /^-?\d+n?$/;
	exports.integer = /^-?\d+$/;
	exports.number = /^-?\d+(?:\.\d+)?$/;
	exports.boolean = /^(?:true|false)$/i;
	exports.null = /^null$/i;
	exports.undefined = /^undefined$/i;
	exports.lowercase = /^[^A-Z]*$/;
	exports.uppercase = /^[^a-z]*$/;
	exports.hex = /^[0-9a-fA-F]*$/;
	function fixedBase64(bodyLength, padding) {
		return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
	}
	function fixedBase64url(length) {
		return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
	}
	exports.md5_hex = /^[0-9a-fA-F]{32}$/;
	exports.md5_base64 = fixedBase64(22, "==");
	exports.md5_base64url = fixedBase64url(22);
	exports.sha1_hex = /^[0-9a-fA-F]{40}$/;
	exports.sha1_base64 = fixedBase64(27, "=");
	exports.sha1_base64url = fixedBase64url(27);
	exports.sha256_hex = /^[0-9a-fA-F]{64}$/;
	exports.sha256_base64 = fixedBase64(43, "=");
	exports.sha256_base64url = fixedBase64url(43);
	exports.sha384_hex = /^[0-9a-fA-F]{96}$/;
	exports.sha384_base64 = fixedBase64(64, "");
	exports.sha384_base64url = fixedBase64url(64);
	exports.sha512_hex = /^[0-9a-fA-F]{128}$/;
	exports.sha512_base64 = fixedBase64(86, "==");
	exports.sha512_base64url = fixedBase64url(86);
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/checks.cjs
var require_checks$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.$ZodCheckOverwrite = exports.$ZodCheckMimeType = exports.$ZodCheckProperty = exports.$ZodCheckEndsWith = exports.$ZodCheckStartsWith = exports.$ZodCheckIncludes = exports.$ZodCheckUpperCase = exports.$ZodCheckLowerCase = exports.$ZodCheckRegex = exports.$ZodCheckStringFormat = exports.$ZodCheckLengthEquals = exports.$ZodCheckMinLength = exports.$ZodCheckMaxLength = exports.$ZodCheckSizeEquals = exports.$ZodCheckMinSize = exports.$ZodCheckMaxSize = exports.$ZodCheckBigIntFormat = exports.$ZodCheckNumberFormat = exports.$ZodCheckMultipleOf = exports.$ZodCheckGreaterThan = exports.$ZodCheckLessThan = exports.$ZodCheck = void 0;
	var core = __importStar(require_core$1());
	var regexes = __importStar(require_regexes());
	var util = __importStar(require_util());
	exports.$ZodCheck = core.$constructor("$ZodCheck", (inst, def) => {
		var _a;
		inst._zod ?? (inst._zod = {});
		inst._zod.def = def;
		(_a = inst._zod).onattach ?? (_a.onattach = []);
	});
	var numericOriginMap = {
		number: "number",
		bigint: "bigint",
		object: "date"
	};
	exports.$ZodCheckLessThan = core.$constructor("$ZodCheckLessThan", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
			if (def.value < curr) {
				if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			}
		});
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
			payload.issues.push({
				origin,
				code: "too_big",
				maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckGreaterThan = core.$constructor("$ZodCheckGreaterThan", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const origin = numericOriginMap[typeof def.value];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
			if (def.value > curr) {
				if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			}
		});
		inst._zod.check = (payload) => {
			if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
			payload.issues.push({
				origin,
				code: "too_small",
				minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
				input: payload.value,
				inclusive: def.inclusive,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckMultipleOf = /*@__PURE__*/ core.$constructor("$ZodCheckMultipleOf", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		inst._zod.onattach.push((inst) => {
			var _a;
			(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
		});
		inst._zod.check = (payload) => {
			if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
			if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : util.floatSafeRemainder(payload.value, def.value) === 0) return;
			payload.issues.push({
				origin: typeof payload.value,
				code: "not_multiple_of",
				divisor: def.value,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckNumberFormat = core.$constructor("$ZodCheckNumberFormat", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		def.format = def.format || "float64";
		const isInt = def.format?.includes("int");
		const origin = isInt ? "int" : "number";
		const [minimum, maximum] = util.NUMBER_FORMAT_RANGES[def.format];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.format = def.format;
			bag.minimum = minimum;
			bag.maximum = maximum;
			if (isInt) bag.pattern = regexes.integer;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (isInt) {
				if (!Number.isInteger(input)) {
					payload.issues.push({
						expected: origin,
						format: def.format,
						code: "invalid_type",
						continue: false,
						input,
						inst
					});
					return;
				}
				if (!Number.isSafeInteger(input)) {
					if (input > 0) payload.issues.push({
						input,
						code: "too_big",
						maximum: Number.MAX_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					else payload.issues.push({
						input,
						code: "too_small",
						minimum: Number.MIN_SAFE_INTEGER,
						note: "Integers must be within the safe integer range.",
						inst,
						origin,
						inclusive: true,
						continue: !def.abort
					});
					return;
				}
			}
			if (input < minimum) payload.issues.push({
				origin: "number",
				input,
				code: "too_small",
				minimum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
			if (input > maximum) payload.issues.push({
				origin: "number",
				input,
				code: "too_big",
				maximum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckBigIntFormat = core.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const [minimum, maximum] = util.BIGINT_FORMAT_RANGES[def.format];
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.format = def.format;
			bag.minimum = minimum;
			bag.maximum = maximum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input < minimum) payload.issues.push({
				origin: "bigint",
				input,
				code: "too_small",
				minimum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
			if (input > maximum) payload.issues.push({
				origin: "bigint",
				input,
				code: "too_big",
				maximum,
				inclusive: true,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckMaxSize = core.$constructor("$ZodCheckMaxSize", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.size !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
			if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.size <= def.maximum) return;
			payload.issues.push({
				origin: util.getSizableOrigin(input),
				code: "too_big",
				maximum: def.maximum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckMinSize = core.$constructor("$ZodCheckMinSize", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.size !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
			if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.size >= def.minimum) return;
			payload.issues.push({
				origin: util.getSizableOrigin(input),
				code: "too_small",
				minimum: def.minimum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckSizeEquals = core.$constructor("$ZodCheckSizeEquals", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.size !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.minimum = def.size;
			bag.maximum = def.size;
			bag.size = def.size;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			const size = input.size;
			if (size === def.size) return;
			const tooBig = size > def.size;
			payload.issues.push({
				origin: util.getSizableOrigin(input),
				...tooBig ? {
					code: "too_big",
					maximum: def.size
				} : {
					code: "too_small",
					minimum: def.size
				},
				inclusive: true,
				exact: true,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckMaxLength = core.$constructor("$ZodCheckMaxLength", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
			if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.length <= def.maximum) return;
			const origin = util.getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_big",
				maximum: def.maximum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckMinLength = core.$constructor("$ZodCheckMinLength", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
			if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			if (input.length >= def.minimum) return;
			const origin = util.getLengthableOrigin(input);
			payload.issues.push({
				origin,
				code: "too_small",
				minimum: def.minimum,
				inclusive: true,
				input,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckLengthEquals = core.$constructor("$ZodCheckLengthEquals", (inst, def) => {
		var _a;
		exports.$ZodCheck.init(inst, def);
		(_a = inst._zod.def).when ?? (_a.when = (payload) => {
			const val = payload.value;
			return !util.nullish(val) && val.length !== void 0;
		});
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.minimum = def.length;
			bag.maximum = def.length;
			bag.length = def.length;
		});
		inst._zod.check = (payload) => {
			const input = payload.value;
			const length = input.length;
			if (length === def.length) return;
			const origin = util.getLengthableOrigin(input);
			const tooBig = length > def.length;
			payload.issues.push({
				origin,
				...tooBig ? {
					code: "too_big",
					maximum: def.length
				} : {
					code: "too_small",
					minimum: def.length
				},
				inclusive: true,
				exact: true,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckStringFormat = core.$constructor("$ZodCheckStringFormat", (inst, def) => {
		var _a, _b;
		exports.$ZodCheck.init(inst, def);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.format = def.format;
			if (def.pattern) {
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(def.pattern);
			}
		});
		if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: def.format,
				input: payload.value,
				...def.pattern ? { pattern: def.pattern.toString() } : {},
				inst,
				continue: !def.abort
			});
		});
		else (_b = inst._zod).check ?? (_b.check = () => {});
	});
	exports.$ZodCheckRegex = core.$constructor("$ZodCheckRegex", (inst, def) => {
		exports.$ZodCheckStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			def.pattern.lastIndex = 0;
			if (def.pattern.test(payload.value)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: payload.value,
				pattern: def.pattern.toString(),
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckLowerCase = core.$constructor("$ZodCheckLowerCase", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.lowercase);
		exports.$ZodCheckStringFormat.init(inst, def);
	});
	exports.$ZodCheckUpperCase = core.$constructor("$ZodCheckUpperCase", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.uppercase);
		exports.$ZodCheckStringFormat.init(inst, def);
	});
	exports.$ZodCheckIncludes = core.$constructor("$ZodCheckIncludes", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const escapedRegex = util.escapeRegex(def.includes);
		const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
		def.pattern = pattern;
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.includes(def.includes, def.position)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: def.includes,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckStartsWith = core.$constructor("$ZodCheckStartsWith", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const pattern = new RegExp(`^${util.escapeRegex(def.prefix)}.*`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.startsWith(def.prefix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: def.prefix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckEndsWith = core.$constructor("$ZodCheckEndsWith", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const pattern = new RegExp(`.*${util.escapeRegex(def.suffix)}$`);
		def.pattern ?? (def.pattern = pattern);
		inst._zod.onattach.push((inst) => {
			const bag = inst._zod.bag;
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(pattern);
		});
		inst._zod.check = (payload) => {
			if (payload.value.endsWith(def.suffix)) return;
			payload.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: def.suffix,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	function handleCheckPropertyResult(result, payload, property) {
		if (result.issues.length) payload.issues.push(...util.prefixIssues(property, result.issues));
	}
	exports.$ZodCheckProperty = core.$constructor("$ZodCheckProperty", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		inst._zod.check = (payload) => {
			const result = def.schema._zod.run({
				value: payload.value[def.property],
				issues: []
			}, {});
			if (result instanceof Promise) return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
			handleCheckPropertyResult(result, payload, def.property);
		};
	});
	exports.$ZodCheckMimeType = core.$constructor("$ZodCheckMimeType", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		const mimeSet = new Set(def.mime);
		inst._zod.onattach.push((inst) => {
			inst._zod.bag.mime = def.mime;
		});
		inst._zod.check = (payload) => {
			if (mimeSet.has(payload.value.type)) return;
			payload.issues.push({
				code: "invalid_value",
				values: def.mime,
				input: payload.value.type,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCheckOverwrite = core.$constructor("$ZodCheckOverwrite", (inst, def) => {
		exports.$ZodCheck.init(inst, def);
		inst._zod.check = (payload) => {
			payload.value = def.tx(payload.value);
		};
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/doc.cjs
var require_doc = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Doc = void 0;
	var Doc = class {
		constructor(args = []) {
			this.content = [];
			this.indent = 0;
			if (this) this.args = args;
		}
		indented(fn) {
			this.indent += 1;
			fn(this);
			this.indent -= 1;
		}
		write(arg) {
			if (typeof arg === "function") {
				arg(this, { execution: "sync" });
				arg(this, { execution: "async" });
				return;
			}
			const lines = arg.split("\n").filter((x) => x);
			const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
			const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
			for (const line of dedented) this.content.push(line);
		}
		compile() {
			const F = Function;
			const args = this?.args;
			const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
			return new F(...args, lines.join("\n"));
		}
	};
	exports.Doc = Doc;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/versions.cjs
var require_versions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.version = void 0;
	exports.version = {
		major: 4,
		minor: 4,
		patch: 3
	};
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/schemas.cjs
var require_schemas$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.$ZodTuple = exports.$ZodIntersection = exports.$ZodDiscriminatedUnion = exports.$ZodXor = exports.$ZodUnion = exports.$ZodObjectJIT = exports.$ZodObject = exports.$ZodArray = exports.$ZodDate = exports.$ZodVoid = exports.$ZodNever = exports.$ZodUnknown = exports.$ZodAny = exports.$ZodNull = exports.$ZodUndefined = exports.$ZodSymbol = exports.$ZodBigIntFormat = exports.$ZodBigInt = exports.$ZodBoolean = exports.$ZodNumberFormat = exports.$ZodNumber = exports.$ZodCustomStringFormat = exports.$ZodJWT = exports.$ZodE164 = exports.$ZodBase64URL = exports.$ZodBase64 = exports.$ZodCIDRv6 = exports.$ZodCIDRv4 = exports.$ZodMAC = exports.$ZodIPv6 = exports.$ZodIPv4 = exports.$ZodISODuration = exports.$ZodISOTime = exports.$ZodISODate = exports.$ZodISODateTime = exports.$ZodKSUID = exports.$ZodXID = exports.$ZodULID = exports.$ZodCUID2 = exports.$ZodCUID = exports.$ZodNanoID = exports.$ZodEmoji = exports.$ZodURL = exports.$ZodEmail = exports.$ZodUUID = exports.$ZodGUID = exports.$ZodStringFormat = exports.$ZodString = exports.clone = exports.$ZodType = void 0;
	exports.$ZodCustom = exports.$ZodLazy = exports.$ZodPromise = exports.$ZodFunction = exports.$ZodTemplateLiteral = exports.$ZodReadonly = exports.$ZodPreprocess = exports.$ZodCodec = exports.$ZodPipe = exports.$ZodNaN = exports.$ZodCatch = exports.$ZodSuccess = exports.$ZodNonOptional = exports.$ZodPrefault = exports.$ZodDefault = exports.$ZodNullable = exports.$ZodExactOptional = exports.$ZodOptional = exports.$ZodTransform = exports.$ZodFile = exports.$ZodLiteral = exports.$ZodEnum = exports.$ZodSet = exports.$ZodMap = exports.$ZodRecord = void 0;
	exports.isValidBase64 = isValidBase64;
	exports.isValidBase64URL = isValidBase64URL;
	exports.isValidJWT = isValidJWT;
	var checks = __importStar(require_checks$1());
	var core = __importStar(require_core$1());
	var doc_js_1 = require_doc();
	var parse_js_1 = require_parse$1();
	var regexes = __importStar(require_regexes());
	var util = __importStar(require_util());
	var versions_js_1 = require_versions();
	exports.$ZodType = core.$constructor("$ZodType", (inst, def) => {
		var _a;
		inst ?? (inst = {});
		inst._zod.def = def;
		inst._zod.bag = inst._zod.bag || {};
		inst._zod.version = versions_js_1.version;
		const checks = [...inst._zod.def.checks ?? []];
		if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
		for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
		if (checks.length === 0) {
			(_a = inst._zod).deferred ?? (_a.deferred = []);
			inst._zod.deferred?.push(() => {
				inst._zod.run = inst._zod.parse;
			});
		} else {
			const runChecks = (payload, checks, ctx) => {
				let isAborted = util.aborted(payload);
				let asyncResult;
				for (const ch of checks) {
					if (ch._zod.def.when) {
						if (util.explicitlyAborted(payload)) continue;
						if (!ch._zod.def.when(payload)) continue;
					} else if (isAborted) continue;
					const currLen = payload.issues.length;
					const _ = ch._zod.check(payload);
					if (_ instanceof Promise && ctx?.async === false) throw new core.$ZodAsyncError();
					if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
						await _;
						if (payload.issues.length === currLen) return;
						if (!isAborted) isAborted = util.aborted(payload, currLen);
					});
					else {
						if (payload.issues.length === currLen) continue;
						if (!isAborted) isAborted = util.aborted(payload, currLen);
					}
				}
				if (asyncResult) return asyncResult.then(() => {
					return payload;
				});
				return payload;
			};
			const handleCanaryResult = (canary, payload, ctx) => {
				if (util.aborted(canary)) {
					canary.aborted = true;
					return canary;
				}
				const checkResult = runChecks(payload, checks, ctx);
				if (checkResult instanceof Promise) {
					if (ctx.async === false) throw new core.$ZodAsyncError();
					return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
				}
				return inst._zod.parse(checkResult, ctx);
			};
			inst._zod.run = (payload, ctx) => {
				if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
				if (ctx.direction === "backward") {
					const canary = inst._zod.parse({
						value: payload.value,
						issues: []
					}, {
						...ctx,
						skipChecks: true
					});
					if (canary instanceof Promise) return canary.then((canary) => {
						return handleCanaryResult(canary, payload, ctx);
					});
					return handleCanaryResult(canary, payload, ctx);
				}
				const result = inst._zod.parse(payload, ctx);
				if (result instanceof Promise) {
					if (ctx.async === false) throw new core.$ZodAsyncError();
					return result.then((result) => runChecks(result, checks, ctx));
				}
				return runChecks(result, checks, ctx);
			};
		}
		util.defineLazy(inst, "~standard", () => ({
			validate: (value) => {
				try {
					const r = (0, parse_js_1.safeParse)(inst, value);
					return r.success ? { value: r.data } : { issues: r.error?.issues };
				} catch (_) {
					return (0, parse_js_1.safeParseAsync)(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
				}
			},
			vendor: "zod",
			version: 1
		}));
	});
	var util_js_1 = require_util();
	Object.defineProperty(exports, "clone", {
		enumerable: true,
		get: function() {
			return util_js_1.clone;
		}
	});
	exports.$ZodString = core.$constructor("$ZodString", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? regexes.string(inst._zod.bag);
		inst._zod.parse = (payload, _) => {
			if (def.coerce) try {
				payload.value = String(payload.value);
			} catch (_) {}
			if (typeof payload.value === "string") return payload;
			payload.issues.push({
				expected: "string",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	exports.$ZodStringFormat = core.$constructor("$ZodStringFormat", (inst, def) => {
		checks.$ZodCheckStringFormat.init(inst, def);
		exports.$ZodString.init(inst, def);
	});
	exports.$ZodGUID = core.$constructor("$ZodGUID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.guid);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodUUID = core.$constructor("$ZodUUID", (inst, def) => {
		if (def.version) {
			const v = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[def.version];
			if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
			def.pattern ?? (def.pattern = regexes.uuid(v));
		} else def.pattern ?? (def.pattern = regexes.uuid());
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodEmail = core.$constructor("$ZodEmail", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.email);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodURL = core.$constructor("$ZodURL", (inst, def) => {
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			try {
				const trimmed = payload.value.trim();
				if (!def.normalize && def.protocol?.source === regexes.httpProtocol.source) {
					if (!/^https?:\/\//i.test(trimmed)) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: payload.value,
							inst,
							continue: !def.abort
						});
						return;
					}
				}
				const url = new URL(trimmed);
				if (def.hostname) {
					def.hostname.lastIndex = 0;
					if (!def.hostname.test(url.hostname)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid hostname",
						pattern: def.hostname.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
				if (def.protocol) {
					def.protocol.lastIndex = 0;
					if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid protocol",
						pattern: def.protocol.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
				if (def.normalize) payload.value = url.href;
				else payload.value = trimmed;
				return;
			} catch (_) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	exports.$ZodEmoji = core.$constructor("$ZodEmoji", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.emoji());
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodNanoID = core.$constructor("$ZodNanoID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.nanoid);
		exports.$ZodStringFormat.init(inst, def);
	});
	/**
	* @deprecated CUID v1 is deprecated by its authors due to information leakage
	* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
	* See https://github.com/paralleldrive/cuid.
	*/
	exports.$ZodCUID = core.$constructor("$ZodCUID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.cuid);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodCUID2 = core.$constructor("$ZodCUID2", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.cuid2);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodULID = core.$constructor("$ZodULID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.ulid);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodXID = core.$constructor("$ZodXID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.xid);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodKSUID = core.$constructor("$ZodKSUID", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.ksuid);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODateTime = core.$constructor("$ZodISODateTime", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.datetime(def));
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODate = core.$constructor("$ZodISODate", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.date);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISOTime = core.$constructor("$ZodISOTime", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.time(def));
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodISODuration = core.$constructor("$ZodISODuration", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.duration);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodIPv4 = core.$constructor("$ZodIPv4", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.ipv4);
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.bag.format = `ipv4`;
	});
	exports.$ZodIPv6 = core.$constructor("$ZodIPv6", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.ipv6);
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.bag.format = `ipv6`;
		inst._zod.check = (payload) => {
			try {
				new URL(`http://[${payload.value}]`);
			} catch {
				payload.issues.push({
					code: "invalid_format",
					format: "ipv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	exports.$ZodMAC = core.$constructor("$ZodMAC", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.mac(def.delimiter));
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.bag.format = `mac`;
	});
	exports.$ZodCIDRv4 = core.$constructor("$ZodCIDRv4", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.cidrv4);
		exports.$ZodStringFormat.init(inst, def);
	});
	exports.$ZodCIDRv6 = core.$constructor("$ZodCIDRv6", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.cidrv6);
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			const parts = payload.value.split("/");
			try {
				if (parts.length !== 2) throw new Error();
				const [address, prefix] = parts;
				if (!prefix) throw new Error();
				const prefixNum = Number(prefix);
				if (`${prefixNum}` !== prefix) throw new Error();
				if (prefixNum < 0 || prefixNum > 128) throw new Error();
				new URL(`http://[${address}]`);
			} catch {
				payload.issues.push({
					code: "invalid_format",
					format: "cidrv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
		};
	});
	function isValidBase64(data) {
		if (data === "") return true;
		if (/\s/.test(data)) return false;
		if (data.length % 4 !== 0) return false;
		try {
			atob(data);
			return true;
		} catch {
			return false;
		}
	}
	exports.$ZodBase64 = core.$constructor("$ZodBase64", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.base64);
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.bag.contentEncoding = "base64";
		inst._zod.check = (payload) => {
			if (isValidBase64(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	function isValidBase64URL(data) {
		if (!regexes.base64url.test(data)) return false;
		const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
		return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
	}
	exports.$ZodBase64URL = core.$constructor("$ZodBase64URL", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.base64url);
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.bag.contentEncoding = "base64url";
		inst._zod.check = (payload) => {
			if (isValidBase64URL(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodE164 = core.$constructor("$ZodE164", (inst, def) => {
		def.pattern ?? (def.pattern = regexes.e164);
		exports.$ZodStringFormat.init(inst, def);
	});
	function isValidJWT(token, algorithm = null) {
		try {
			const tokensParts = token.split(".");
			if (tokensParts.length !== 3) return false;
			const [header] = tokensParts;
			if (!header) return false;
			const parsedHeader = JSON.parse(atob(header));
			if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
			if (!parsedHeader.alg) return false;
			if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
			return true;
		} catch {
			return false;
		}
	}
	exports.$ZodJWT = core.$constructor("$ZodJWT", (inst, def) => {
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (isValidJWT(payload.value, def.alg)) return;
			payload.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodCustomStringFormat = core.$constructor("$ZodCustomStringFormat", (inst, def) => {
		exports.$ZodStringFormat.init(inst, def);
		inst._zod.check = (payload) => {
			if (def.fn(payload.value)) return;
			payload.issues.push({
				code: "invalid_format",
				format: def.format,
				input: payload.value,
				inst,
				continue: !def.abort
			});
		};
	});
	exports.$ZodNumber = core.$constructor("$ZodNumber", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = inst._zod.bag.pattern ?? regexes.number;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Number(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
			const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
			payload.issues.push({
				expected: "number",
				code: "invalid_type",
				input,
				inst,
				...received ? { received } : {}
			});
			return payload;
		};
	});
	exports.$ZodNumberFormat = core.$constructor("$ZodNumberFormat", (inst, def) => {
		checks.$ZodCheckNumberFormat.init(inst, def);
		exports.$ZodNumber.init(inst, def);
	});
	exports.$ZodBoolean = core.$constructor("$ZodBoolean", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = regexes.boolean;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = Boolean(payload.value);
			} catch (_) {}
			const input = payload.value;
			if (typeof input === "boolean") return payload;
			payload.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodBigInt = core.$constructor("$ZodBigInt", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = regexes.bigint;
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = BigInt(payload.value);
			} catch (_) {}
			if (typeof payload.value === "bigint") return payload;
			payload.issues.push({
				expected: "bigint",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	exports.$ZodBigIntFormat = core.$constructor("$ZodBigIntFormat", (inst, def) => {
		checks.$ZodCheckBigIntFormat.init(inst, def);
		exports.$ZodBigInt.init(inst, def);
	});
	exports.$ZodSymbol = core.$constructor("$ZodSymbol", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (typeof input === "symbol") return payload;
			payload.issues.push({
				expected: "symbol",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodUndefined = core.$constructor("$ZodUndefined", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = regexes.undefined;
		inst._zod.values = /* @__PURE__ */ new Set([void 0]);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (typeof input === "undefined") return payload;
			payload.issues.push({
				expected: "undefined",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodNull = core.$constructor("$ZodNull", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.pattern = regexes.null;
		inst._zod.values = /* @__PURE__ */ new Set([null]);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (input === null) return payload;
			payload.issues.push({
				expected: "null",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodAny = core.$constructor("$ZodAny", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload) => payload;
	});
	exports.$ZodUnknown = core.$constructor("$ZodUnknown", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload) => payload;
	});
	exports.$ZodNever = core.$constructor("$ZodNever", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			payload.issues.push({
				expected: "never",
				code: "invalid_type",
				input: payload.value,
				inst
			});
			return payload;
		};
	});
	exports.$ZodVoid = core.$constructor("$ZodVoid", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (typeof input === "undefined") return payload;
			payload.issues.push({
				expected: "void",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodDate = core.$constructor("$ZodDate", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			if (def.coerce) try {
				payload.value = new Date(payload.value);
			} catch (_err) {}
			const input = payload.value;
			const isDate = input instanceof Date;
			if (isDate && !Number.isNaN(input.getTime())) return payload;
			payload.issues.push({
				expected: "date",
				code: "invalid_type",
				input,
				...isDate ? { received: "Invalid Date" } : {},
				inst
			});
			return payload;
		};
	});
	function handleArrayResult(result, final, index) {
		if (result.issues.length) final.issues.push(...util.prefixIssues(index, result.issues));
		final.value[index] = result.value;
	}
	exports.$ZodArray = core.$constructor("$ZodArray", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!Array.isArray(input)) {
				payload.issues.push({
					expected: "array",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = Array(input.length);
			const proms = [];
			for (let i = 0; i < input.length; i++) {
				const item = input[i];
				const result = def.element._zod.run({
					value: item,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
				else handleArrayResult(result, payload, i);
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
		const isPresent = key in input;
		if (result.issues.length) {
			if (isOptionalIn && isOptionalOut && !isPresent) return;
			final.issues.push(...util.prefixIssues(key, result.issues));
		}
		if (!isPresent && !isOptionalIn) {
			if (!result.issues.length) final.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [key]
			});
			return;
		}
		if (result.value === void 0) {
			if (isPresent) final.value[key] = void 0;
		} else final.value[key] = result.value;
	}
	function normalizeDef(def) {
		const keys = Object.keys(def.shape);
		for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
		const okeys = util.optionalKeys(def.shape);
		return {
			...def,
			keys,
			keySet: new Set(keys),
			numKeys: keys.length,
			optionalKeys: new Set(okeys)
		};
	}
	function handleCatchall(proms, input, payload, ctx, def, inst) {
		const unrecognized = [];
		const keySet = def.keySet;
		const _catchall = def.catchall._zod;
		const t = _catchall.def.type;
		const isOptionalIn = _catchall.optin === "optional";
		const isOptionalOut = _catchall.optout === "optional";
		for (const key in input) {
			if (key === "__proto__") continue;
			if (keySet.has(key)) continue;
			if (t === "never") {
				unrecognized.push(key);
				continue;
			}
			const r = _catchall.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		}
		if (unrecognized.length) payload.issues.push({
			code: "unrecognized_keys",
			keys: unrecognized,
			input,
			inst
		});
		if (!proms.length) return payload;
		return Promise.all(proms).then(() => {
			return payload;
		});
	}
	exports.$ZodObject = core.$constructor("$ZodObject", (inst, def) => {
		exports.$ZodType.init(inst, def);
		if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
			const sh = def.shape;
			Object.defineProperty(def, "shape", { get: () => {
				const newSh = { ...sh };
				Object.defineProperty(def, "shape", { value: newSh });
				return newSh;
			} });
		}
		const _normalized = util.cached(() => normalizeDef(def));
		util.defineLazy(inst._zod, "propValues", () => {
			const shape = def.shape;
			const propValues = {};
			for (const key in shape) {
				const field = shape[key]._zod;
				if (field.values) {
					propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
					for (const v of field.values) propValues[key].add(v);
				}
			}
			return propValues;
		});
		const isObject = util.isObject;
		const catchall = def.catchall;
		let value;
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			payload.value = {};
			const proms = [];
			const shape = value.shape;
			for (const key of value.keys) {
				const el = shape[key];
				const isOptionalIn = el._zod.optin === "optional";
				const isOptionalOut = el._zod.optout === "optional";
				const r = el._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
			return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
		};
	});
	exports.$ZodObjectJIT = core.$constructor("$ZodObjectJIT", (inst, def) => {
		exports.$ZodObject.init(inst, def);
		const superParse = inst._zod.parse;
		const _normalized = util.cached(() => normalizeDef(def));
		const generateFastpass = (shape) => {
			const doc = new doc_js_1.Doc([
				"shape",
				"payload",
				"ctx"
			]);
			const normalized = _normalized.value;
			const parseStr = (key) => {
				const k = util.esc(key);
				return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
			};
			doc.write(`const input = payload.value;`);
			const ids = Object.create(null);
			let counter = 0;
			for (const key of normalized.keys) ids[key] = `key_${counter++}`;
			doc.write(`const newResult = {};`);
			for (const key of normalized.keys) {
				const id = ids[key];
				const k = util.esc(key);
				const schema = shape[key];
				const isOptionalIn = schema?._zod?.optin === "optional";
				const isOptionalOut = schema?._zod?.optout === "optional";
				doc.write(`const ${id} = ${parseStr(key)};`);
				if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
				else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			}
			doc.write(`payload.value = newResult;`);
			doc.write(`return payload;`);
			const fn = doc.compile();
			return (payload, ctx) => fn(shape, payload, ctx);
		};
		let fastpass;
		const isObject = util.isObject;
		const jit = !core.globalConfig.jitless;
		const allowsEval = util.allowsEval;
		const fastEnabled = jit && allowsEval.value;
		const catchall = def.catchall;
		let value;
		inst._zod.parse = (payload, ctx) => {
			value ?? (value = _normalized.value);
			const input = payload.value;
			if (!isObject(input)) {
				payload.issues.push({
					expected: "object",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
				if (!fastpass) fastpass = generateFastpass(def.shape);
				payload = fastpass(payload, ctx);
				if (!catchall) return payload;
				return handleCatchall([], input, payload, ctx, value, inst);
			}
			return superParse(payload, ctx);
		};
	});
	function handleUnionResults(results, final, inst, ctx) {
		for (const result of results) if (result.issues.length === 0) {
			final.value = result.value;
			return final;
		}
		const nonaborted = results.filter((r) => !util.aborted(r));
		if (nonaborted.length === 1) {
			final.value = nonaborted[0].value;
			return nonaborted[0];
		}
		final.issues.push({
			code: "invalid_union",
			input: final.value,
			inst,
			errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
		});
		return final;
	}
	exports.$ZodUnion = core.$constructor("$ZodUnion", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
		util.defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
		util.defineLazy(inst._zod, "values", () => {
			if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
		});
		util.defineLazy(inst._zod, "pattern", () => {
			if (def.options.every((o) => o._zod.pattern)) {
				const patterns = def.options.map((o) => o._zod.pattern);
				return new RegExp(`^(${patterns.map((p) => util.cleanRegex(p.source)).join("|")})$`);
			}
		});
		const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		inst._zod.parse = (payload, ctx) => {
			if (first) return first(payload, ctx);
			let async = false;
			const results = [];
			for (const option of def.options) {
				const result = option._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) {
					results.push(result);
					async = true;
				} else {
					if (result.issues.length === 0) return result;
					results.push(result);
				}
			}
			if (!async) return handleUnionResults(results, payload, inst, ctx);
			return Promise.all(results).then((results) => {
				return handleUnionResults(results, payload, inst, ctx);
			});
		};
	});
	function handleExclusiveUnionResults(results, final, inst, ctx) {
		const successes = results.filter((r) => r.issues.length === 0);
		if (successes.length === 1) {
			final.value = successes[0].value;
			return final;
		}
		if (successes.length === 0) final.issues.push({
			code: "invalid_union",
			input: final.value,
			inst,
			errors: results.map((result) => result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())))
		});
		else final.issues.push({
			code: "invalid_union",
			input: final.value,
			inst,
			errors: [],
			inclusive: false
		});
		return final;
	}
	exports.$ZodXor = core.$constructor("$ZodXor", (inst, def) => {
		exports.$ZodUnion.init(inst, def);
		def.inclusive = false;
		const first = def.options.length === 1 ? def.options[0]._zod.run : null;
		inst._zod.parse = (payload, ctx) => {
			if (first) return first(payload, ctx);
			let async = false;
			const results = [];
			for (const option of def.options) {
				const result = option._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) {
					results.push(result);
					async = true;
				} else results.push(result);
			}
			if (!async) return handleExclusiveUnionResults(results, payload, inst, ctx);
			return Promise.all(results).then((results) => {
				return handleExclusiveUnionResults(results, payload, inst, ctx);
			});
		};
	});
	exports.$ZodDiscriminatedUnion = /*@__PURE__*/ core.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
		def.inclusive = false;
		exports.$ZodUnion.init(inst, def);
		const _super = inst._zod.parse;
		util.defineLazy(inst._zod, "propValues", () => {
			const propValues = {};
			for (const option of def.options) {
				const pv = option._zod.propValues;
				if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
				for (const [k, v] of Object.entries(pv)) {
					if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
					for (const val of v) propValues[k].add(val);
				}
			}
			return propValues;
		});
		const disc = util.cached(() => {
			const opts = def.options;
			const map = /* @__PURE__ */ new Map();
			for (const o of opts) {
				const values = o._zod.propValues?.[def.discriminator];
				if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
				for (const v of values) {
					if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
					map.set(v, o);
				}
			}
			return map;
		});
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!util.isObject(input)) {
				payload.issues.push({
					code: "invalid_type",
					expected: "object",
					input,
					inst
				});
				return payload;
			}
			const opt = disc.value.get(input?.[def.discriminator]);
			if (opt) return opt._zod.run(payload, ctx);
			if (def.unionFallback || ctx.direction === "backward") return _super(payload, ctx);
			payload.issues.push({
				code: "invalid_union",
				errors: [],
				note: "No matching discriminator",
				discriminator: def.discriminator,
				options: Array.from(disc.value.keys()),
				input,
				path: [def.discriminator],
				inst
			});
			return payload;
		};
	});
	exports.$ZodIntersection = core.$constructor("$ZodIntersection", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			const left = def.left._zod.run({
				value: input,
				issues: []
			}, ctx);
			const right = def.right._zod.run({
				value: input,
				issues: []
			}, ctx);
			if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
				return handleIntersectionResults(payload, left, right);
			});
			return handleIntersectionResults(payload, left, right);
		};
	});
	function mergeValues(a, b) {
		if (a === b) return {
			valid: true,
			data: a
		};
		if (a instanceof Date && b instanceof Date && +a === +b) return {
			valid: true,
			data: a
		};
		if (util.isPlainObject(a) && util.isPlainObject(b)) {
			const bKeys = Object.keys(b);
			const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
			const newObj = {
				...a,
				...b
			};
			for (const key of sharedKeys) {
				const sharedValue = mergeValues(a[key], b[key]);
				if (!sharedValue.valid) return {
					valid: false,
					mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
				};
				newObj[key] = sharedValue.data;
			}
			return {
				valid: true,
				data: newObj
			};
		}
		if (Array.isArray(a) && Array.isArray(b)) {
			if (a.length !== b.length) return {
				valid: false,
				mergeErrorPath: []
			};
			const newArray = [];
			for (let index = 0; index < a.length; index++) {
				const itemA = a[index];
				const itemB = b[index];
				const sharedValue = mergeValues(itemA, itemB);
				if (!sharedValue.valid) return {
					valid: false,
					mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
				};
				newArray.push(sharedValue.data);
			}
			return {
				valid: true,
				data: newArray
			};
		}
		return {
			valid: false,
			mergeErrorPath: []
		};
	}
	function handleIntersectionResults(result, left, right) {
		const unrecKeys = /* @__PURE__ */ new Map();
		let unrecIssue;
		for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
			unrecIssue ?? (unrecIssue = iss);
			for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).l = true;
			}
		} else result.issues.push(iss);
		for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).r = true;
		}
		else result.issues.push(iss);
		const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
		if (bothKeys.length && unrecIssue) result.issues.push({
			...unrecIssue,
			keys: bothKeys
		});
		if (util.aborted(result)) return result;
		const merged = mergeValues(left.value, right.value);
		if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
		result.value = merged.data;
		return result;
	}
	exports.$ZodTuple = core.$constructor("$ZodTuple", (inst, def) => {
		exports.$ZodType.init(inst, def);
		const items = def.items;
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!Array.isArray(input)) {
				payload.issues.push({
					input,
					inst,
					expected: "tuple",
					code: "invalid_type"
				});
				return payload;
			}
			payload.value = [];
			const proms = [];
			const optinStart = getTupleOptStart(items, "optin");
			const optoutStart = getTupleOptStart(items, "optout");
			if (!def.rest) {
				if (input.length < optinStart) {
					payload.issues.push({
						code: "too_small",
						minimum: optinStart,
						inclusive: true,
						input,
						inst,
						origin: "array"
					});
					return payload;
				}
				if (input.length > items.length) payload.issues.push({
					code: "too_big",
					maximum: items.length,
					inclusive: true,
					input,
					inst,
					origin: "array"
				});
			}
			const itemResults = new Array(items.length);
			for (let i = 0; i < items.length; i++) {
				const r = items[i]._zod.run({
					value: input[i],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((rr) => {
					itemResults[i] = rr;
				}));
				else itemResults[i] = r;
			}
			if (def.rest) {
				let i = items.length - 1;
				const rest = input.slice(items.length);
				for (const el of rest) {
					i++;
					const result = def.rest._zod.run({
						value: el,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((r) => handleTupleResult(r, payload, i)));
					else handleTupleResult(result, payload, i);
				}
			}
			if (proms.length) return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
			return handleTupleResults(itemResults, payload, items, input, optoutStart);
		};
	});
	function getTupleOptStart(items, key) {
		for (let i = items.length - 1; i >= 0; i--) if (items[i]._zod[key] !== "optional") return i + 1;
		return 0;
	}
	function handleTupleResult(result, final, index) {
		if (result.issues.length) final.issues.push(...util.prefixIssues(index, result.issues));
		final.value[index] = result.value;
	}
	function handleTupleResults(itemResults, final, items, input, optoutStart) {
		for (let i = 0; i < items.length; i++) {
			const r = itemResults[i];
			const isPresent = i < input.length;
			if (r.issues.length) {
				if (!isPresent && i >= optoutStart) {
					final.value.length = i;
					break;
				}
				final.issues.push(...util.prefixIssues(i, r.issues));
			}
			final.value[i] = r.value;
		}
		for (let i = final.value.length - 1; i >= input.length; i--) if (items[i]._zod.optout === "optional" && final.value[i] === void 0) final.value.length = i;
		else break;
		return final;
	}
	exports.$ZodRecord = core.$constructor("$ZodRecord", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!util.isPlainObject(input)) {
				payload.issues.push({
					expected: "record",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			const proms = [];
			const values = def.keyType._zod.values;
			if (values) {
				payload.value = {};
				const recordKeys = /* @__PURE__ */ new Set();
				for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
					recordKeys.add(typeof key === "number" ? key.toString() : key);
					const keyResult = def.keyType._zod.run({
						value: key,
						issues: []
					}, ctx);
					if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (keyResult.issues.length) {
						payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
							input: key,
							path: [key],
							inst
						});
						continue;
					}
					const outKey = keyResult.value;
					const result = def.valueType._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => {
						if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
						payload.value[outKey] = result.value;
					}));
					else {
						if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
						payload.value[outKey] = result.value;
					}
				}
				let unrecognized;
				for (const key in input) if (!recordKeys.has(key)) {
					unrecognized = unrecognized ?? [];
					unrecognized.push(key);
				}
				if (unrecognized && unrecognized.length > 0) payload.issues.push({
					code: "unrecognized_keys",
					input,
					inst,
					keys: unrecognized
				});
			} else {
				payload.value = {};
				for (const key of Reflect.ownKeys(input)) {
					if (key === "__proto__") continue;
					if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
					let keyResult = def.keyType._zod.run({
						value: key,
						issues: []
					}, ctx);
					if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (typeof key === "string" && regexes.number.test(key) && keyResult.issues.length) {
						const retryResult = def.keyType._zod.run({
							value: Number(key),
							issues: []
						}, ctx);
						if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (retryResult.issues.length === 0) keyResult = retryResult;
					}
					if (keyResult.issues.length) {
						if (def.mode === "loose") payload.value[key] = input[key];
						else payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())),
							input: key,
							path: [key],
							inst
						});
						continue;
					}
					const result = def.valueType._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => {
						if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
						payload.value[keyResult.value] = result.value;
					}));
					else {
						if (result.issues.length) payload.issues.push(...util.prefixIssues(key, result.issues));
						payload.value[keyResult.value] = result.value;
					}
				}
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	exports.$ZodMap = core.$constructor("$ZodMap", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!(input instanceof Map)) {
				payload.issues.push({
					expected: "map",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			}
			const proms = [];
			payload.value = /* @__PURE__ */ new Map();
			for (const [key, value] of input) {
				const keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				const valueResult = def.valueType._zod.run({
					value,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise || valueResult instanceof Promise) proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
					handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
				}));
				else handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
		if (keyResult.issues.length) {
			if (util.propertyKeyTypes.has(typeof key)) final.issues.push(...util.prefixIssues(key, keyResult.issues));
			else final.issues.push({
				code: "invalid_key",
				origin: "map",
				input,
				inst,
				issues: keyResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))
			});
		}
		if (valueResult.issues.length) {
			if (util.propertyKeyTypes.has(typeof key)) final.issues.push(...util.prefixIssues(key, valueResult.issues));
			else final.issues.push({
				origin: "map",
				code: "invalid_element",
				input,
				inst,
				key,
				issues: valueResult.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config()))
			});
		}
		final.value.set(keyResult.value, valueResult.value);
	}
	exports.$ZodSet = core.$constructor("$ZodSet", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			const input = payload.value;
			if (!(input instanceof Set)) {
				payload.issues.push({
					input,
					inst,
					expected: "set",
					code: "invalid_type"
				});
				return payload;
			}
			const proms = [];
			payload.value = /* @__PURE__ */ new Set();
			for (const item of input) {
				const result = def.valueType._zod.run({
					value: item,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => handleSetResult(result, payload)));
				else handleSetResult(result, payload);
			}
			if (proms.length) return Promise.all(proms).then(() => payload);
			return payload;
		};
	});
	function handleSetResult(result, final) {
		if (result.issues.length) final.issues.push(...result.issues);
		final.value.add(result.value);
	}
	exports.$ZodEnum = core.$constructor("$ZodEnum", (inst, def) => {
		exports.$ZodType.init(inst, def);
		const values = util.getEnumValues(def.entries);
		const valuesSet = new Set(values);
		inst._zod.values = valuesSet;
		inst._zod.pattern = new RegExp(`^(${values.filter((k) => util.propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? util.escapeRegex(o) : o.toString()).join("|")})$`);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (valuesSet.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values,
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodLiteral = core.$constructor("$ZodLiteral", (inst, def) => {
		exports.$ZodType.init(inst, def);
		if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
		const values = new Set(def.values);
		inst._zod.values = values;
		inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? util.escapeRegex(o) : o ? util.escapeRegex(o.toString()) : String(o)).join("|")})$`);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (values.has(input)) return payload;
			payload.issues.push({
				code: "invalid_value",
				values: def.values,
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodFile = core.$constructor("$ZodFile", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			const input = payload.value;
			if (input instanceof File) return payload;
			payload.issues.push({
				expected: "file",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		};
	});
	exports.$ZodTransform = core.$constructor("$ZodTransform", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") throw new core.$ZodEncodeError(inst.constructor.name);
			const _out = def.transform(payload.value, payload);
			if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
				payload.value = output;
				payload.fallback = true;
				return payload;
			});
			if (_out instanceof Promise) throw new core.$ZodAsyncError();
			payload.value = _out;
			payload.fallback = true;
			return payload;
		};
	});
	function handleOptionalResult(result, input) {
		if (input === void 0 && (result.issues.length || result.fallback)) return {
			issues: [],
			value: void 0
		};
		return result;
	}
	exports.$ZodOptional = core.$constructor("$ZodOptional", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		inst._zod.optout = "optional";
		util.defineLazy(inst._zod, "values", () => {
			return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
		});
		util.defineLazy(inst._zod, "pattern", () => {
			const pattern = def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)})?$`) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (def.innerType._zod.optin === "optional") {
				const input = payload.value;
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
				return handleOptionalResult(result, input);
			}
			if (payload.value === void 0) return payload;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	exports.$ZodExactOptional = core.$constructor("$ZodExactOptional", (inst, def) => {
		exports.$ZodOptional.init(inst, def);
		util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		util.defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
		inst._zod.parse = (payload, ctx) => {
			return def.innerType._zod.run(payload, ctx);
		};
	});
	exports.$ZodNullable = core.$constructor("$ZodNullable", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
		util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		util.defineLazy(inst._zod, "pattern", () => {
			const pattern = def.innerType._zod.pattern;
			return pattern ? new RegExp(`^(${util.cleanRegex(pattern.source)}|null)$`) : void 0;
		});
		util.defineLazy(inst._zod, "values", () => {
			return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			if (payload.value === null) return payload;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	exports.$ZodDefault = core.$constructor("$ZodDefault", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) {
				payload.value = def.defaultValue;
				/**
				* $ZodDefault returns the default value immediately in forward direction.
				* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
				return payload;
			}
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
			return handleDefaultResult(result, def);
		};
	});
	function handleDefaultResult(payload, def) {
		if (payload.value === void 0) payload.value = def.defaultValue;
		return payload;
	}
	exports.$ZodPrefault = core.$constructor("$ZodPrefault", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			if (payload.value === void 0) payload.value = def.defaultValue;
			return def.innerType._zod.run(payload, ctx);
		};
	});
	exports.$ZodNonOptional = core.$constructor("$ZodNonOptional", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "values", () => {
			const v = def.innerType._zod.values;
			return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
		});
		inst._zod.parse = (payload, ctx) => {
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
			return handleNonOptionalResult(result, inst);
		};
	});
	function handleNonOptionalResult(payload, inst) {
		if (!payload.issues.length && payload.value === void 0) payload.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: payload.value,
			inst
		});
		return payload;
	}
	exports.$ZodSuccess = core.$constructor("$ZodSuccess", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") throw new core.$ZodEncodeError("ZodSuccess");
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => {
				payload.value = result.issues.length === 0;
				return payload;
			});
			payload.value = result.issues.length === 0;
			return payload;
		};
	});
	exports.$ZodCatch = core.$constructor("$ZodCatch", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.optin = "optional";
		util.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
		util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((result) => {
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			});
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => util.finalizeIssue(iss, ctx, core.config())) },
					input: payload.value
				});
				payload.issues = [];
				payload.fallback = true;
			}
			return payload;
		};
	});
	exports.$ZodNaN = core.$constructor("$ZodNaN", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _ctx) => {
			if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
				payload.issues.push({
					input: payload.value,
					inst,
					expected: "nan",
					code: "invalid_type"
				});
				return payload;
			}
			return payload;
		};
	});
	exports.$ZodPipe = core.$constructor("$ZodPipe", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "values", () => def.in._zod.values);
		util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") {
				const right = def.out._zod.run(payload, ctx);
				if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
				return handlePipeResult(right, def.in, ctx);
			}
			const left = def.in._zod.run(payload, ctx);
			if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
			return handlePipeResult(left, def.out, ctx);
		};
	});
	function handlePipeResult(left, next, ctx) {
		if (left.issues.length) {
			left.aborted = true;
			return left;
		}
		return next._zod.run({
			value: left.value,
			issues: left.issues,
			fallback: left.fallback
		}, ctx);
	}
	exports.$ZodCodec = core.$constructor("$ZodCodec", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "values", () => def.in._zod.values);
		util.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
		util.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
		util.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
		inst._zod.parse = (payload, ctx) => {
			if ((ctx.direction || "forward") === "forward") {
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handleCodecAResult(left, def, ctx));
				return handleCodecAResult(left, def, ctx);
			} else {
				const right = def.out._zod.run(payload, ctx);
				if (right instanceof Promise) return right.then((right) => handleCodecAResult(right, def, ctx));
				return handleCodecAResult(right, def, ctx);
			}
		};
	});
	function handleCodecAResult(result, def, ctx) {
		if (result.issues.length) {
			result.aborted = true;
			return result;
		}
		if ((ctx.direction || "forward") === "forward") {
			const transformed = def.transform(result.value, result);
			if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
			return handleCodecTxResult(result, transformed, def.out, ctx);
		} else {
			const transformed = def.reverseTransform(result.value, result);
			if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
			return handleCodecTxResult(result, transformed, def.in, ctx);
		}
	}
	function handleCodecTxResult(left, value, nextSchema, ctx) {
		if (left.issues.length) {
			left.aborted = true;
			return left;
		}
		return nextSchema._zod.run({
			value,
			issues: left.issues
		}, ctx);
	}
	exports.$ZodPreprocess = core.$constructor("$ZodPreprocess", (inst, def) => {
		exports.$ZodPipe.init(inst, def);
	});
	exports.$ZodReadonly = core.$constructor("$ZodReadonly", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
		util.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
		util.defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
		util.defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
		inst._zod.parse = (payload, ctx) => {
			if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then(handleReadonlyResult);
			return handleReadonlyResult(result);
		};
	});
	function handleReadonlyResult(payload) {
		payload.value = Object.freeze(payload.value);
		return payload;
	}
	exports.$ZodTemplateLiteral = core.$constructor("$ZodTemplateLiteral", (inst, def) => {
		exports.$ZodType.init(inst, def);
		const regexParts = [];
		for (const part of def.parts) if (typeof part === "object" && part !== null) {
			if (!part._zod.pattern) throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
			const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
			if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			regexParts.push(source.slice(start, end));
		} else if (part === null || util.primitiveTypes.has(typeof part)) regexParts.push(util.escapeRegex(`${part}`));
		else throw new Error(`Invalid template literal part: ${part}`);
		inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
		inst._zod.parse = (payload, _ctx) => {
			if (typeof payload.value !== "string") {
				payload.issues.push({
					input: payload.value,
					inst,
					expected: "string",
					code: "invalid_type"
				});
				return payload;
			}
			inst._zod.pattern.lastIndex = 0;
			if (!inst._zod.pattern.test(payload.value)) {
				payload.issues.push({
					input: payload.value,
					inst,
					code: "invalid_format",
					format: def.format ?? "template_literal",
					pattern: inst._zod.pattern.source
				});
				return payload;
			}
			return payload;
		};
	});
	exports.$ZodFunction = core.$constructor("$ZodFunction", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._def = def;
		inst._zod.def = def;
		inst.implement = (func) => {
			if (typeof func !== "function") throw new Error("implement() must be called with a function");
			return function(...args) {
				const parsedArgs = inst._def.input ? (0, parse_js_1.parse)(inst._def.input, args) : args;
				const result = Reflect.apply(func, this, parsedArgs);
				if (inst._def.output) return (0, parse_js_1.parse)(inst._def.output, result);
				return result;
			};
		};
		inst.implementAsync = (func) => {
			if (typeof func !== "function") throw new Error("implementAsync() must be called with a function");
			return async function(...args) {
				const parsedArgs = inst._def.input ? await (0, parse_js_1.parseAsync)(inst._def.input, args) : args;
				const result = await Reflect.apply(func, this, parsedArgs);
				if (inst._def.output) return await (0, parse_js_1.parseAsync)(inst._def.output, result);
				return result;
			};
		};
		inst._zod.parse = (payload, _ctx) => {
			if (typeof payload.value !== "function") {
				payload.issues.push({
					code: "invalid_type",
					expected: "function",
					input: payload.value,
					inst
				});
				return payload;
			}
			if (inst._def.output && inst._def.output._zod.def.type === "promise") payload.value = inst.implementAsync(payload.value);
			else payload.value = inst.implement(payload.value);
			return payload;
		};
		inst.input = (...args) => {
			const F = inst.constructor;
			if (Array.isArray(args[0])) return new F({
				type: "function",
				input: new exports.$ZodTuple({
					type: "tuple",
					items: args[0],
					rest: args[1]
				}),
				output: inst._def.output
			});
			return new F({
				type: "function",
				input: args[0],
				output: inst._def.output
			});
		};
		inst.output = (output) => {
			const F = inst.constructor;
			return new F({
				type: "function",
				input: inst._def.input,
				output
			});
		};
		return inst;
	});
	exports.$ZodPromise = core.$constructor("$ZodPromise", (inst, def) => {
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, ctx) => {
			return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({
				value: inner,
				issues: []
			}, ctx));
		};
	});
	exports.$ZodLazy = core.$constructor("$ZodLazy", (inst, def) => {
		exports.$ZodType.init(inst, def);
		util.defineLazy(inst._zod, "innerType", () => {
			const d = def;
			if (!d._cachedInner) d._cachedInner = def.getter();
			return d._cachedInner;
		});
		util.defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
		util.defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
		util.defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
		util.defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
		inst._zod.parse = (payload, ctx) => {
			return inst._zod.innerType._zod.run(payload, ctx);
		};
	});
	exports.$ZodCustom = core.$constructor("$ZodCustom", (inst, def) => {
		checks.$ZodCheck.init(inst, def);
		exports.$ZodType.init(inst, def);
		inst._zod.parse = (payload, _) => {
			return payload;
		};
		inst._zod.check = (payload) => {
			const input = payload.value;
			const r = def.fn(input);
			if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
			handleRefineResult(r, payload, input, inst);
		};
	});
	function handleRefineResult(result, payload, input, inst) {
		if (!result) {
			const _iss = {
				code: "custom",
				input,
				inst,
				path: [...inst._zod.def.path ?? []],
				continue: !inst._zod.def.abort
			};
			if (inst._zod.def.params) _iss.params = inst._zod.def.params;
			payload.issues.push(util.issue(_iss));
		}
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ar.cjs
var require_ar = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "حرف",
				verb: "أن يحوي"
			},
			file: {
				unit: "بايت",
				verb: "أن يحوي"
			},
			array: {
				unit: "عنصر",
				verb: "أن يحوي"
			},
			set: {
				unit: "عنصر",
				verb: "أن يحوي"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "مدخل",
			email: "بريد إلكتروني",
			url: "رابط",
			emoji: "إيموجي",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "تاريخ ووقت بمعيار ISO",
			date: "تاريخ بمعيار ISO",
			time: "وقت بمعيار ISO",
			duration: "مدة بمعيار ISO",
			ipv4: "عنوان IPv4",
			ipv6: "عنوان IPv6",
			cidrv4: "مدى عناوين بصيغة IPv4",
			cidrv6: "مدى عناوين بصيغة IPv6",
			base64: "نَص بترميز base64-encoded",
			base64url: "نَص بترميز base64url-encoded",
			json_string: "نَص على هيئة JSON",
			e164: "رقم هاتف بمعيار E.164",
			jwt: "JWT",
			template_literal: "مدخل"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue.expected}، ولكن تم إدخال ${received}`;
					return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `مدخلات غير مقبولة: يفترض إدخال ${util.stringifyPrimitive(issue.values[0])}`;
					return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
					return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
					return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
					if (_issue.format === "ends_with") return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
					if (_issue.format === "includes") return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
					if (_issue.format === "regex") return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} غير مقبول`;
				}
				case "not_multiple_of": return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
				case "unrecognized_keys": return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${util.joinValues(issue.keys, "، ")}`;
				case "invalid_key": return `معرف غير مقبول في ${issue.origin}`;
				case "invalid_union": return "مدخل غير مقبول";
				case "invalid_element": return `مدخل غير مقبول في ${issue.origin}`;
				default: return "مدخل غير مقبول";
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/az.cjs
var require_az = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "simvol",
				verb: "olmalıdır"
			},
			file: {
				unit: "bayt",
				verb: "olmalıdır"
			},
			array: {
				unit: "element",
				verb: "olmalıdır"
			},
			set: {
				unit: "element",
				verb: "olmalıdır"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Yanlış dəyər: gözlənilən instanceof ${issue.expected}, daxil olan ${received}`;
					return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Yanlış dəyər: gözlənilən ${util.stringifyPrimitive(issue.values[0])}`;
					return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
					return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
					if (_issue.format === "ends_with") return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
					if (_issue.format === "includes") return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
					if (_issue.format === "regex") return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
					return `Yanlış ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
				case "unrecognized_keys": return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} daxilində yanlış açar`;
				case "invalid_union": return "Yanlış dəyər";
				case "invalid_element": return `${issue.origin} daxilində yanlış dəyər`;
				default: return `Yanlış dəyər`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/be.cjs
var require_be = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	function getBelarusianPlural(count, one, few, many) {
		const absCount = Math.abs(count);
		const lastDigit = absCount % 10;
		const lastTwoDigits = absCount % 100;
		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
		if (lastDigit === 1) return one;
		if (lastDigit >= 2 && lastDigit <= 4) return few;
		return many;
	}
	var error = () => {
		const Sizable = {
			string: {
				unit: {
					one: "сімвал",
					few: "сімвалы",
					many: "сімвалаў"
				},
				verb: "мець"
			},
			array: {
				unit: {
					one: "элемент",
					few: "элементы",
					many: "элементаў"
				},
				verb: "мець"
			},
			set: {
				unit: {
					one: "элемент",
					few: "элементы",
					many: "элементаў"
				},
				verb: "мець"
			},
			file: {
				unit: {
					one: "байт",
					few: "байты",
					many: "байтаў"
				},
				verb: "мець"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "увод",
			email: "email адрас",
			url: "URL",
			emoji: "эмодзі",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO дата і час",
			date: "ISO дата",
			time: "ISO час",
			duration: "ISO працягласць",
			ipv4: "IPv4 адрас",
			ipv6: "IPv6 адрас",
			cidrv4: "IPv4 дыяпазон",
			cidrv6: "IPv6 дыяпазон",
			base64: "радок у фармаце base64",
			base64url: "радок у фармаце base64url",
			json_string: "JSON радок",
			e164: "нумар E.164",
			jwt: "JWT",
			template_literal: "увод"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "лік",
			array: "масіў"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Няправільны ўвод: чакаўся instanceof ${issue.expected}, атрымана ${received}`;
					return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Няправільны ўвод: чакалася ${util.stringifyPrimitive(issue.values[0])}`;
					return `Няправільны варыянт: чакаўся адзін з ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getBelarusianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
						return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
					}
					return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getBelarusianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
						return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
					}
					return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
					if (_issue.format === "regex") return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
					return `Няправільны ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
				case "unrecognized_keys": return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Няправільны ключ у ${issue.origin}`;
				case "invalid_union": return "Няправільны ўвод";
				case "invalid_element": return `Няправільнае значэнне ў ${issue.origin}`;
				default: return `Няправільны ўвод`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/bg.cjs
var require_bg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "символа",
				verb: "да съдържа"
			},
			file: {
				unit: "байта",
				verb: "да съдържа"
			},
			array: {
				unit: "елемента",
				verb: "да съдържа"
			},
			set: {
				unit: "елемента",
				verb: "да съдържа"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "вход",
			email: "имейл адрес",
			url: "URL",
			emoji: "емоджи",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO време",
			date: "ISO дата",
			time: "ISO време",
			duration: "ISO продължителност",
			ipv4: "IPv4 адрес",
			ipv6: "IPv6 адрес",
			cidrv4: "IPv4 диапазон",
			cidrv6: "IPv6 диапазон",
			base64: "base64-кодиран низ",
			base64url: "base64url-кодиран низ",
			json_string: "JSON низ",
			e164: "E.164 номер",
			jwt: "JWT",
			template_literal: "вход"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "число",
			array: "масив"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Невалиден вход: очакван instanceof ${issue.expected}, получен ${received}`;
					return `Невалиден вход: очакван ${expected}, получен ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Невалиден вход: очакван ${util.stringifyPrimitive(issue.values[0])}`;
					return `Невалидна опция: очаквано едно от ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да съдържа ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елемента"}`;
					return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да бъде ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Твърде малко: очаква се ${issue.origin} да съдържа ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Твърде малко: очаква се ${issue.origin} да бъде ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Невалиден низ: трябва да включва "${_issue.includes}"`;
					if (_issue.format === "regex") return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
					let invalid_adj = "Невалиден";
					if (_issue.format === "emoji") invalid_adj = "Невалидно";
					if (_issue.format === "datetime") invalid_adj = "Невалидно";
					if (_issue.format === "date") invalid_adj = "Невалидна";
					if (_issue.format === "time") invalid_adj = "Невалидно";
					if (_issue.format === "duration") invalid_adj = "Невалидна";
					return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Невалидно число: трябва да бъде кратно на ${issue.divisor}`;
				case "unrecognized_keys": return `Неразпознат${issue.keys.length > 1 ? "и" : ""} ключ${issue.keys.length > 1 ? "ове" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Невалиден ключ в ${issue.origin}`;
				case "invalid_union": return "Невалиден вход";
				case "invalid_element": return `Невалидна стойност в ${issue.origin}`;
				default: return `Невалиден вход`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ca.cjs
var require_ca = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caràcters",
				verb: "contenir"
			},
			file: {
				unit: "bytes",
				verb: "contenir"
			},
			array: {
				unit: "elements",
				verb: "contenir"
			},
			set: {
				unit: "elements",
				verb: "contenir"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "entrada",
			email: "adreça electrònica",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "data i hora ISO",
			date: "data ISO",
			time: "hora ISO",
			duration: "durada ISO",
			ipv4: "adreça IPv4",
			ipv6: "adreça IPv6",
			cidrv4: "rang IPv4",
			cidrv6: "rang IPv6",
			base64: "cadena codificada en base64",
			base64url: "cadena codificada en base64url",
			json_string: "cadena JSON",
			e164: "número E.164",
			jwt: "JWT",
			template_literal: "entrada"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Tipus invàlid: s'esperava instanceof ${issue.expected}, s'ha rebut ${received}`;
					return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Valor invàlid: s'esperava ${util.stringifyPrimitive(issue.values[0])}`;
					return `Opció invàlida: s'esperava una de ${util.joinValues(issue.values, " o ")}`;
				case "too_big": {
					const adj = issue.inclusive ? "com a màxim" : "menys de";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
					return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? "com a mínim" : "més de";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
					return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Format invàlid: ha d'incloure "${_issue.includes}"`;
					if (_issue.format === "regex") return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
					return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
				case "unrecognized_keys": return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Clau invàlida a ${issue.origin}`;
				case "invalid_union": return "Entrada invàlida";
				case "invalid_element": return `Element invàlid a ${issue.origin}`;
				default: return `Entrada invàlida`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/cs.cjs
var require_cs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "znaků",
				verb: "mít"
			},
			file: {
				unit: "bajtů",
				verb: "mít"
			},
			array: {
				unit: "prvků",
				verb: "mít"
			},
			set: {
				unit: "prvků",
				verb: "mít"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "regulární výraz",
			email: "e-mailová adresa",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "datum a čas ve formátu ISO",
			date: "datum ve formátu ISO",
			time: "čas ve formátu ISO",
			duration: "doba trvání ISO",
			ipv4: "IPv4 adresa",
			ipv6: "IPv6 adresa",
			cidrv4: "rozsah IPv4",
			cidrv6: "rozsah IPv6",
			base64: "řetězec zakódovaný ve formátu base64",
			base64url: "řetězec zakódovaný ve formátu base64url",
			json_string: "řetězec ve formátu JSON",
			e164: "číslo E.164",
			jwt: "JWT",
			template_literal: "vstup"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "číslo",
			string: "řetězec",
			function: "funkce",
			array: "pole"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Neplatný vstup: očekáváno instanceof ${issue.expected}, obdrženo ${received}`;
					return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Neplatný vstup: očekáváno ${util.stringifyPrimitive(issue.values[0])}`;
					return `Neplatná možnost: očekávána jedna z hodnot ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
					return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
					return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
					if (_issue.format === "regex") return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
					return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
				case "unrecognized_keys": return `Neznámé klíče: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Neplatný klíč v ${issue.origin}`;
				case "invalid_union": return "Neplatný vstup";
				case "invalid_element": return `Neplatná hodnota v ${issue.origin}`;
				default: return `Neplatný vstup`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/da.cjs
var require_da = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "tegn",
				verb: "havde"
			},
			file: {
				unit: "bytes",
				verb: "havde"
			},
			array: {
				unit: "elementer",
				verb: "indeholdt"
			},
			set: {
				unit: "elementer",
				verb: "indeholdt"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "e-mailadresse",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO dato- og klokkeslæt",
			date: "ISO-dato",
			time: "ISO-klokkeslæt",
			duration: "ISO-varighed",
			ipv4: "IPv4-område",
			ipv6: "IPv6-område",
			cidrv4: "IPv4-spektrum",
			cidrv6: "IPv6-spektrum",
			base64: "base64-kodet streng",
			base64url: "base64url-kodet streng",
			json_string: "JSON-streng",
			e164: "E.164-nummer",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = {
			nan: "NaN",
			string: "streng",
			number: "tal",
			boolean: "boolean",
			array: "liste",
			object: "objekt",
			set: "sæt",
			file: "fil"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ugyldigt input: forventede instanceof ${issue.expected}, fik ${received}`;
					return `Ugyldigt input: forventede ${expected}, fik ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ugyldig værdi: forventede ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ugyldigt valg: forventede en af følgende ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
					return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
					return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
					if (_issue.format === "regex") return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
					return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Ugyldig nøgle i ${issue.origin}`;
				case "invalid_union": return "Ugyldigt input: matcher ingen af de tilladte typer";
				case "invalid_element": return `Ugyldig værdi i ${issue.origin}`;
				default: return `Ugyldigt input`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/de.cjs
var require_de = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "Zeichen",
				verb: "zu haben"
			},
			file: {
				unit: "Bytes",
				verb: "zu haben"
			},
			array: {
				unit: "Elemente",
				verb: "zu haben"
			},
			set: {
				unit: "Elemente",
				verb: "zu haben"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "Eingabe",
			email: "E-Mail-Adresse",
			url: "URL",
			emoji: "Emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO-Datum und -Uhrzeit",
			date: "ISO-Datum",
			time: "ISO-Uhrzeit",
			duration: "ISO-Dauer",
			ipv4: "IPv4-Adresse",
			ipv6: "IPv6-Adresse",
			cidrv4: "IPv4-Bereich",
			cidrv6: "IPv6-Bereich",
			base64: "Base64-codierter String",
			base64url: "Base64-URL-codierter String",
			json_string: "JSON-String",
			e164: "E.164-Nummer",
			jwt: "JWT",
			template_literal: "Eingabe"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "Zahl",
			array: "Array"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ungültige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}`;
					return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ungültige Eingabe: erwartet ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ungültige Option: erwartet eine von ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
					return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
					return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
					if (_issue.format === "ends_with") return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
					if (_issue.format === "includes") return `Ungültiger String: muss "${_issue.includes}" enthalten`;
					if (_issue.format === "regex") return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
					return `Ungültig: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Ungültiger Schlüssel in ${issue.origin}`;
				case "invalid_union": return "Ungültige Eingabe";
				case "invalid_element": return `Ungültiger Wert in ${issue.origin}`;
				default: return `Ungültige Eingabe`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/el.cjs
var require_el = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "χαρακτήρες",
				verb: "να έχει"
			},
			file: {
				unit: "bytes",
				verb: "να έχει"
			},
			array: {
				unit: "στοιχεία",
				verb: "να έχει"
			},
			set: {
				unit: "στοιχεία",
				verb: "να έχει"
			},
			map: {
				unit: "καταχωρήσεις",
				verb: "να έχει"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "είσοδος",
			email: "διεύθυνση email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO ημερομηνία και ώρα",
			date: "ISO ημερομηνία",
			time: "ISO ώρα",
			duration: "ISO διάρκεια",
			ipv4: "διεύθυνση IPv4",
			ipv6: "διεύθυνση IPv6",
			mac: "διεύθυνση MAC",
			cidrv4: "εύρος IPv4",
			cidrv6: "εύρος IPv6",
			base64: "συμβολοσειρά κωδικοποιημένη σε base64",
			base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
			json_string: "συμβολοσειρά JSON",
			e164: "αριθμός E.164",
			jwt: "JWT",
			template_literal: "είσοδος"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (typeof issue.expected === "string" && /^[A-Z]/.test(issue.expected)) return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue.expected}, λήφθηκε ${received}`;
					return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Μη έγκυρη είσοδος: αναμενόταν ${util.stringifyPrimitive(issue.values[0])}`;
					return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να έχει ${adj}${issue.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
					return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να είναι ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Πολύ μικρό: αναμενόταν ${issue.origin} να έχει ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Πολύ μικρό: αναμενόταν ${issue.origin} να είναι ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
					if (_issue.format === "regex") return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
					return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue.divisor}`;
				case "unrecognized_keys": return `Άγνωστ${issue.keys.length > 1 ? "α" : "ο"} κλειδ${issue.keys.length > 1 ? "ιά" : "ί"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Μη έγκυρο κλειδί στο ${issue.origin}`;
				case "invalid_union": return "Μη έγκυρη είσοδος";
				case "invalid_element": return `Μη έγκυρη τιμή στο ${issue.origin}`;
				default: return `Μη έγκυρη είσοδος`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/en.cjs
var require_en = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "characters",
				verb: "to have"
			},
			file: {
				unit: "bytes",
				verb: "to have"
			},
			array: {
				unit: "items",
				verb: "to have"
			},
			set: {
				unit: "items",
				verb: "to have"
			},
			map: {
				unit: "entries",
				verb: "to have"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					return `Invalid input: expected ${expected}, received ${TypeDictionary[receivedType] ?? receivedType}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
					return `Invalid option: expected one of ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
					return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
					if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
					return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
				case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${issue.origin}`;
				case "invalid_union":
					if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
					return "Invalid input";
				case "invalid_element": return `Invalid value in ${issue.origin}`;
				default: return `Invalid input`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/eo.cjs
var require_eo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "karaktrojn",
				verb: "havi"
			},
			file: {
				unit: "bajtojn",
				verb: "havi"
			},
			array: {
				unit: "elementojn",
				verb: "havi"
			},
			set: {
				unit: "elementojn",
				verb: "havi"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "enigo",
			email: "retadreso",
			url: "URL",
			emoji: "emoĝio",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO-datotempo",
			date: "ISO-dato",
			time: "ISO-tempo",
			duration: "ISO-daŭro",
			ipv4: "IPv4-adreso",
			ipv6: "IPv6-adreso",
			cidrv4: "IPv4-rango",
			cidrv6: "IPv6-rango",
			base64: "64-ume kodita karaktraro",
			base64url: "URL-64-ume kodita karaktraro",
			json_string: "JSON-karaktraro",
			e164: "E.164-nombro",
			jwt: "JWT",
			template_literal: "enigo"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "nombro",
			array: "tabelo",
			null: "senvalora"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Nevalida enigo: atendiĝis instanceof ${issue.expected}, riceviĝis ${received}`;
					return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Nevalida enigo: atendiĝis ${util.stringifyPrimitive(issue.values[0])}`;
					return `Nevalida opcio: atendiĝis unu el ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
					return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
					if (_issue.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
					return `Nevalida ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
				case "unrecognized_keys": return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Nevalida ŝlosilo en ${issue.origin}`;
				case "invalid_union": return "Nevalida enigo";
				case "invalid_element": return `Nevalida valoro en ${issue.origin}`;
				default: return `Nevalida enigo`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/es.cjs
var require_es = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caracteres",
				verb: "tener"
			},
			file: {
				unit: "bytes",
				verb: "tener"
			},
			array: {
				unit: "elementos",
				verb: "tener"
			},
			set: {
				unit: "elementos",
				verb: "tener"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "entrada",
			email: "dirección de correo electrónico",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "fecha y hora ISO",
			date: "fecha ISO",
			time: "hora ISO",
			duration: "duración ISO",
			ipv4: "dirección IPv4",
			ipv6: "dirección IPv6",
			cidrv4: "rango IPv4",
			cidrv6: "rango IPv6",
			base64: "cadena codificada en base64",
			base64url: "URL codificada en base64",
			json_string: "cadena JSON",
			e164: "número E.164",
			jwt: "JWT",
			template_literal: "entrada"
		};
		const TypeDictionary = {
			nan: "NaN",
			string: "texto",
			number: "número",
			boolean: "booleano",
			array: "arreglo",
			object: "objeto",
			set: "conjunto",
			file: "archivo",
			date: "fecha",
			bigint: "número grande",
			symbol: "símbolo",
			undefined: "indefinido",
			null: "nulo",
			function: "función",
			map: "mapa",
			record: "registro",
			tuple: "tupla",
			enum: "enumeración",
			union: "unión",
			literal: "literal",
			promise: "promesa",
			void: "vacío",
			never: "nunca",
			unknown: "desconocido",
			any: "cualquiera"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Entrada inválida: se esperaba instanceof ${issue.expected}, recibido ${received}`;
					return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Entrada inválida: se esperaba ${util.stringifyPrimitive(issue.values[0])}`;
					return `Opción inválida: se esperaba una de ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
					return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Cadena inválida: debe incluir "${_issue.includes}"`;
					if (_issue.format === "regex") return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
					return `Inválido ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
				case "unrecognized_keys": return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Llave inválida en ${TypeDictionary[issue.origin] ?? issue.origin}`;
				case "invalid_union": return "Entrada inválida";
				case "invalid_element": return `Valor inválido en ${TypeDictionary[issue.origin] ?? issue.origin}`;
				default: return `Entrada inválida`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/fa.cjs
var require_fa = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "کاراکتر",
				verb: "داشته باشد"
			},
			file: {
				unit: "بایت",
				verb: "داشته باشد"
			},
			array: {
				unit: "آیتم",
				verb: "داشته باشد"
			},
			set: {
				unit: "آیتم",
				verb: "داشته باشد"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ورودی",
			email: "آدرس ایمیل",
			url: "URL",
			emoji: "ایموجی",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "تاریخ و زمان ایزو",
			date: "تاریخ ایزو",
			time: "زمان ایزو",
			duration: "مدت زمان ایزو",
			ipv4: "IPv4 آدرس",
			ipv6: "IPv6 آدرس",
			cidrv4: "IPv4 دامنه",
			cidrv6: "IPv6 دامنه",
			base64: "base64-encoded رشته",
			base64url: "base64url-encoded رشته",
			json_string: "JSON رشته",
			e164: "E.164 عدد",
			jwt: "JWT",
			template_literal: "ورودی"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "عدد",
			array: "آرایه"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `ورودی نامعتبر: می‌بایست instanceof ${issue.expected} می‌بود، ${received} دریافت شد`;
					return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `ورودی نامعتبر: می‌بایست ${util.stringifyPrimitive(issue.values[0])} می‌بود`;
					return `گزینه نامعتبر: می‌بایست یکی از ${util.joinValues(issue.values, "|")} می‌بود`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
					return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
					return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
					if (_issue.format === "ends_with") return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
					if (_issue.format === "includes") return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
					if (_issue.format === "regex") return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
					return `${FormatDictionary[_issue.format] ?? issue.format} نامعتبر`;
				}
				case "not_multiple_of": return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
				case "unrecognized_keys": return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `کلید ناشناس در ${issue.origin}`;
				case "invalid_union": return `ورودی نامعتبر`;
				case "invalid_element": return `مقدار نامعتبر در ${issue.origin}`;
				default: return `ورودی نامعتبر`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/fi.cjs
var require_fi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "merkkiä",
				subject: "merkkijonon"
			},
			file: {
				unit: "tavua",
				subject: "tiedoston"
			},
			array: {
				unit: "alkiota",
				subject: "listan"
			},
			set: {
				unit: "alkiota",
				subject: "joukon"
			},
			number: {
				unit: "",
				subject: "luvun"
			},
			bigint: {
				unit: "",
				subject: "suuren kokonaisluvun"
			},
			int: {
				unit: "",
				subject: "kokonaisluvun"
			},
			date: {
				unit: "",
				subject: "päivämäärän"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "säännöllinen lauseke",
			email: "sähköpostiosoite",
			url: "URL-osoite",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO-aikaleima",
			date: "ISO-päivämäärä",
			time: "ISO-aika",
			duration: "ISO-kesto",
			ipv4: "IPv4-osoite",
			ipv6: "IPv6-osoite",
			cidrv4: "IPv4-alue",
			cidrv6: "IPv6-alue",
			base64: "base64-koodattu merkkijono",
			base64url: "base64url-koodattu merkkijono",
			json_string: "JSON-merkkijono",
			e164: "E.164-luku",
			jwt: "JWT",
			template_literal: "templaattimerkkijono"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Virheellinen tyyppi: odotettiin instanceof ${issue.expected}, oli ${received}`;
					return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Virheellinen syöte: täytyy olla ${util.stringifyPrimitive(issue.values[0])}`;
					return `Virheellinen valinta: täytyy olla yksi seuraavista: ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
					return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
					return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
					if (_issue.format === "regex") return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
					return `Virheellinen ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return "Virheellinen avain tietueessa";
				case "invalid_union": return "Virheellinen unioni";
				case "invalid_element": return "Virheellinen arvo joukossa";
				default: return `Virheellinen syöte`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/fr.cjs
var require_fr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caractères",
				verb: "avoir"
			},
			file: {
				unit: "octets",
				verb: "avoir"
			},
			array: {
				unit: "éléments",
				verb: "avoir"
			},
			set: {
				unit: "éléments",
				verb: "avoir"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "entrée",
			email: "adresse e-mail",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "date et heure ISO",
			date: "date ISO",
			time: "heure ISO",
			duration: "durée ISO",
			ipv4: "adresse IPv4",
			ipv6: "adresse IPv6",
			cidrv4: "plage IPv4",
			cidrv6: "plage IPv6",
			base64: "chaîne encodée en base64",
			base64url: "chaîne encodée en base64url",
			json_string: "chaîne JSON",
			e164: "numéro E.164",
			jwt: "JWT",
			template_literal: "entrée"
		};
		const TypeDictionary = {
			string: "chaîne",
			number: "nombre",
			int: "entier",
			boolean: "booléen",
			bigint: "grand entier",
			symbol: "symbole",
			undefined: "indéfini",
			null: "null",
			never: "jamais",
			void: "vide",
			date: "date",
			array: "tableau",
			object: "objet",
			tuple: "tuple",
			record: "enregistrement",
			map: "carte",
			set: "ensemble",
			file: "fichier",
			nonoptional: "non-optionnel",
			nan: "NaN",
			function: "fonction"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : instanceof ${issue.expected} attendu, ${received} reçu`;
					return `Entrée invalide : ${expected} attendu, ${received} reçu`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Entrée invalide : ${util.stringifyPrimitive(issue.values[0])} attendu`;
					return `Option invalide : une valeur parmi ${util.joinValues(issue.values, "|")} attendue`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
					return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
					if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
				}
				case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
				case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Clé invalide dans ${issue.origin}`;
				case "invalid_union": return "Entrée invalide";
				case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
				default: return `Entrée invalide`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/fr-CA.cjs
var require_fr_CA = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caractères",
				verb: "avoir"
			},
			file: {
				unit: "octets",
				verb: "avoir"
			},
			array: {
				unit: "éléments",
				verb: "avoir"
			},
			set: {
				unit: "éléments",
				verb: "avoir"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "entrée",
			email: "adresse courriel",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "date-heure ISO",
			date: "date ISO",
			time: "heure ISO",
			duration: "durée ISO",
			ipv4: "adresse IPv4",
			ipv6: "adresse IPv6",
			cidrv4: "plage IPv4",
			cidrv6: "plage IPv6",
			base64: "chaîne encodée en base64",
			base64url: "chaîne encodée en base64url",
			json_string: "chaîne JSON",
			e164: "numéro E.164",
			jwt: "JWT",
			template_literal: "entrée"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : attendu instanceof ${issue.expected}, reçu ${received}`;
					return `Entrée invalide : attendu ${expected}, reçu ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Entrée invalide : attendu ${util.stringifyPrimitive(issue.values[0])}`;
					return `Option invalide : attendu l'une des valeurs suivantes ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "≤" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
					return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? "≥" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
					if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
				}
				case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
				case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Clé invalide dans ${issue.origin}`;
				case "invalid_union": return "Entrée invalide";
				case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
				default: return `Entrée invalide`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/he.cjs
var require_he = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const TypeNames = {
			string: {
				label: "מחרוזת",
				gender: "f"
			},
			number: {
				label: "מספר",
				gender: "m"
			},
			boolean: {
				label: "ערך בוליאני",
				gender: "m"
			},
			bigint: {
				label: "BigInt",
				gender: "m"
			},
			date: {
				label: "תאריך",
				gender: "m"
			},
			array: {
				label: "מערך",
				gender: "m"
			},
			object: {
				label: "אובייקט",
				gender: "m"
			},
			null: {
				label: "ערך ריק (null)",
				gender: "m"
			},
			undefined: {
				label: "ערך לא מוגדר (undefined)",
				gender: "m"
			},
			symbol: {
				label: "סימבול (Symbol)",
				gender: "m"
			},
			function: {
				label: "פונקציה",
				gender: "f"
			},
			map: {
				label: "מפה (Map)",
				gender: "f"
			},
			set: {
				label: "קבוצה (Set)",
				gender: "f"
			},
			file: {
				label: "קובץ",
				gender: "m"
			},
			promise: {
				label: "Promise",
				gender: "m"
			},
			NaN: {
				label: "NaN",
				gender: "m"
			},
			unknown: {
				label: "ערך לא ידוע",
				gender: "m"
			},
			value: {
				label: "ערך",
				gender: "m"
			}
		};
		const Sizable = {
			string: {
				unit: "תווים",
				shortLabel: "קצר",
				longLabel: "ארוך"
			},
			file: {
				unit: "בייטים",
				shortLabel: "קטן",
				longLabel: "גדול"
			},
			array: {
				unit: "פריטים",
				shortLabel: "קטן",
				longLabel: "גדול"
			},
			set: {
				unit: "פריטים",
				shortLabel: "קטן",
				longLabel: "גדול"
			},
			number: {
				unit: "",
				shortLabel: "קטן",
				longLabel: "גדול"
			}
		};
		const typeEntry = (t) => t ? TypeNames[t] : void 0;
		const typeLabel = (t) => {
			const e = typeEntry(t);
			if (e) return e.label;
			return t ?? TypeNames.unknown.label;
		};
		const withDefinite = (t) => `ה${typeLabel(t)}`;
		const verbFor = (t) => {
			return (typeEntry(t)?.gender ?? "m") === "f" ? "צריכה להיות" : "צריך להיות";
		};
		const getSizing = (origin) => {
			if (!origin) return null;
			return Sizable[origin] ?? null;
		};
		const FormatDictionary = {
			regex: {
				label: "קלט",
				gender: "m"
			},
			email: {
				label: "כתובת אימייל",
				gender: "f"
			},
			url: {
				label: "כתובת רשת",
				gender: "f"
			},
			emoji: {
				label: "אימוג'י",
				gender: "m"
			},
			uuid: {
				label: "UUID",
				gender: "m"
			},
			nanoid: {
				label: "nanoid",
				gender: "m"
			},
			guid: {
				label: "GUID",
				gender: "m"
			},
			cuid: {
				label: "cuid",
				gender: "m"
			},
			cuid2: {
				label: "cuid2",
				gender: "m"
			},
			ulid: {
				label: "ULID",
				gender: "m"
			},
			xid: {
				label: "XID",
				gender: "m"
			},
			ksuid: {
				label: "KSUID",
				gender: "m"
			},
			datetime: {
				label: "תאריך וזמן ISO",
				gender: "m"
			},
			date: {
				label: "תאריך ISO",
				gender: "m"
			},
			time: {
				label: "זמן ISO",
				gender: "m"
			},
			duration: {
				label: "משך זמן ISO",
				gender: "m"
			},
			ipv4: {
				label: "כתובת IPv4",
				gender: "f"
			},
			ipv6: {
				label: "כתובת IPv6",
				gender: "f"
			},
			cidrv4: {
				label: "טווח IPv4",
				gender: "m"
			},
			cidrv6: {
				label: "טווח IPv6",
				gender: "m"
			},
			base64: {
				label: "מחרוזת בבסיס 64",
				gender: "f"
			},
			base64url: {
				label: "מחרוזת בבסיס 64 לכתובות רשת",
				gender: "f"
			},
			json_string: {
				label: "מחרוזת JSON",
				gender: "f"
			},
			e164: {
				label: "מספר E.164",
				gender: "m"
			},
			jwt: {
				label: "JWT",
				gender: "m"
			},
			ends_with: {
				label: "קלט",
				gender: "m"
			},
			includes: {
				label: "קלט",
				gender: "m"
			},
			lowercase: {
				label: "קלט",
				gender: "m"
			},
			starts_with: {
				label: "קלט",
				gender: "m"
			},
			uppercase: {
				label: "קלט",
				gender: "m"
			}
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expectedKey = issue.expected;
					const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
					return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
				}
				case "invalid_value": {
					if (issue.values.length === 1) return `ערך לא תקין: הערך חייב להיות ${util.stringifyPrimitive(issue.values[0])}`;
					const stringified = issue.values.map((v) => util.stringifyPrimitive(v));
					if (issue.values.length === 2) return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
					const lastValue = stringified[stringified.length - 1];
					return `ערך לא תקין: האפשרויות המתאימות הן ${stringified.slice(0, -1).join(", ")} או ${lastValue}`;
				}
				case "too_big": {
					const sizing = getSizing(issue.origin);
					const subject = withDefinite(issue.origin ?? "value");
					if (issue.origin === "string") return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
					if (issue.origin === "number") return `גדול מדי: ${subject} צריך להיות ${issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`}`;
					if (issue.origin === "array" || issue.origin === "set") return `גדול מדי: ${subject} ${issue.origin === "set" ? "צריכה" : "צריך"} להכיל ${issue.inclusive ? `${issue.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue.maximum} ${sizing?.unit ?? ""}`}`.trim();
					const adj = issue.inclusive ? "<=" : "<";
					const be = verbFor(issue.origin ?? "value");
					if (sizing?.unit) return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
					return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const sizing = getSizing(issue.origin);
					const subject = withDefinite(issue.origin ?? "value");
					if (issue.origin === "string") return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
					if (issue.origin === "number") return `קטן מדי: ${subject} צריך להיות ${issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`}`;
					if (issue.origin === "array" || issue.origin === "set") {
						const verb = issue.origin === "set" ? "צריכה" : "צריך";
						if (issue.minimum === 1 && issue.inclusive) return `קטן מדי: ${subject} ${verb} להכיל ${issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד"}`;
						return `קטן מדי: ${subject} ${verb} להכיל ${issue.inclusive ? `${issue.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue.minimum} ${sizing?.unit ?? ""}`}`.trim();
					}
					const adj = issue.inclusive ? ">=" : ">";
					const be = verbFor(issue.origin ?? "value");
					if (sizing?.unit) return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
					if (_issue.format === "includes") return `המחרוזת חייבת לכלול "${_issue.includes}"`;
					if (_issue.format === "regex") return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
					const nounEntry = FormatDictionary[_issue.format];
					return `${nounEntry?.label ?? _issue.format} לא ${(nounEntry?.gender ?? "m") === "f" ? "תקינה" : "תקין"}`;
				}
				case "not_multiple_of": return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
				case "unrecognized_keys": return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `שדה לא תקין באובייקט`;
				case "invalid_union": return "קלט לא תקין";
				case "invalid_element": return `ערך לא תקין ב${withDefinite(issue.origin ?? "array")}`;
				default: return `קלט לא תקין`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/hr.cjs
var require_hr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "znakova",
				verb: "imati"
			},
			file: {
				unit: "bajtova",
				verb: "imati"
			},
			array: {
				unit: "stavki",
				verb: "imati"
			},
			set: {
				unit: "stavki",
				verb: "imati"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "unos",
			email: "email adresa",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datum i vrijeme",
			date: "ISO datum",
			time: "ISO vrijeme",
			duration: "ISO trajanje",
			ipv4: "IPv4 adresa",
			ipv6: "IPv6 adresa",
			cidrv4: "IPv4 raspon",
			cidrv6: "IPv6 raspon",
			base64: "base64 kodirani tekst",
			base64url: "base64url kodirani tekst",
			json_string: "JSON tekst",
			e164: "E.164 broj",
			jwt: "JWT",
			template_literal: "unos"
		};
		const TypeDictionary = {
			nan: "NaN",
			string: "tekst",
			number: "broj",
			boolean: "boolean",
			array: "niz",
			object: "objekt",
			set: "skup",
			file: "datoteka",
			date: "datum",
			bigint: "bigint",
			symbol: "simbol",
			undefined: "undefined",
			null: "null",
			function: "funkcija",
			map: "mapa"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Neispravan unos: očekuje se instanceof ${issue.expected}, a primljeno je ${received}`;
					return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Neispravna vrijednost: očekivano ${util.stringifyPrimitive(issue.values[0])}`;
					return `Neispravna opcija: očekivano jedno od ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
					return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					if (sizing) return `Premalo: očekivano da ${origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Premalo: očekivano da ${origin} bude ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
					if (_issue.format === "regex") return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
					return `Neispravna ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Neispravan broj: mora biti višekratnik od ${issue.divisor}`;
				case "unrecognized_keys": return `Neprepoznat${issue.keys.length > 1 ? "i ključevi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Neispravan ključ u ${TypeDictionary[issue.origin] ?? issue.origin}`;
				case "invalid_union": return "Neispravan unos";
				case "invalid_element": return `Neispravna vrijednost u ${TypeDictionary[issue.origin] ?? issue.origin}`;
				default: return `Neispravan unos`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/hu.cjs
var require_hu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "karakter",
				verb: "legyen"
			},
			file: {
				unit: "byte",
				verb: "legyen"
			},
			array: {
				unit: "elem",
				verb: "legyen"
			},
			set: {
				unit: "elem",
				verb: "legyen"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "bemenet",
			email: "email cím",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO időbélyeg",
			date: "ISO dátum",
			time: "ISO idő",
			duration: "ISO időintervallum",
			ipv4: "IPv4 cím",
			ipv6: "IPv6 cím",
			cidrv4: "IPv4 tartomány",
			cidrv6: "IPv6 tartomány",
			base64: "base64-kódolt string",
			base64url: "base64url-kódolt string",
			json_string: "JSON string",
			e164: "E.164 szám",
			jwt: "JWT",
			template_literal: "bemenet"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "szám",
			array: "tömb"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Érvénytelen bemenet: a várt érték instanceof ${issue.expected}, a kapott érték ${received}`;
					return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Érvénytelen bemenet: a várt érték ${util.stringifyPrimitive(issue.values[0])}`;
					return `Érvénytelen opció: valamelyik érték várt ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
					return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
					if (_issue.format === "ends_with") return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
					if (_issue.format === "includes") return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
					if (_issue.format === "regex") return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
					return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
				case "unrecognized_keys": return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Érvénytelen kulcs ${issue.origin}`;
				case "invalid_union": return "Érvénytelen bemenet";
				case "invalid_element": return `Érvénytelen érték: ${issue.origin}`;
				default: return `Érvénytelen bemenet`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/hy.cjs
var require_hy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	function getArmenianPlural(count, one, many) {
		return Math.abs(count) === 1 ? one : many;
	}
	function withDefiniteArticle(word) {
		if (!word) return "";
		const vowels = [
			"ա",
			"ե",
			"ը",
			"ի",
			"ո",
			"ու",
			"օ"
		];
		const lastChar = word[word.length - 1];
		return word + (vowels.includes(lastChar) ? "ն" : "ը");
	}
	var error = () => {
		const Sizable = {
			string: {
				unit: {
					one: "նշան",
					many: "նշաններ"
				},
				verb: "ունենալ"
			},
			file: {
				unit: {
					one: "բայթ",
					many: "բայթեր"
				},
				verb: "ունենալ"
			},
			array: {
				unit: {
					one: "տարր",
					many: "տարրեր"
				},
				verb: "ունենալ"
			},
			set: {
				unit: {
					one: "տարր",
					many: "տարրեր"
				},
				verb: "ունենալ"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "մուտք",
			email: "էլ. հասցե",
			url: "URL",
			emoji: "էմոջի",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO ամսաթիվ և ժամ",
			date: "ISO ամսաթիվ",
			time: "ISO ժամ",
			duration: "ISO տևողություն",
			ipv4: "IPv4 հասցե",
			ipv6: "IPv6 հասցե",
			cidrv4: "IPv4 միջակայք",
			cidrv6: "IPv6 միջակայք",
			base64: "base64 ձևաչափով տող",
			base64url: "base64url ձևաչափով տող",
			json_string: "JSON տող",
			e164: "E.164 համար",
			jwt: "JWT",
			template_literal: "մուտք"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "թիվ",
			array: "զանգված"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue.expected}, ստացվել է ${received}`;
					return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Սխալ մուտքագրում․ սպասվում էր ${util.stringifyPrimitive(issue.values[1])}`;
					return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getArmenianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.many);
						return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} կունենա ${adj}${issue.maximum.toString()} ${unit}`;
					}
					return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} լինի ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getArmenianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.many);
						return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} կունենա ${adj}${issue.minimum.toString()} ${unit}`;
					}
					return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} լինի ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
					if (_issue.format === "ends_with") return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
					if (_issue.format === "includes") return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
					if (_issue.format === "regex") return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
					return `Սխալ ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue.divisor}-ի`;
				case "unrecognized_keys": return `Չճանաչված բանալի${issue.keys.length > 1 ? "ներ" : ""}. ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Սխալ բանալի ${withDefiniteArticle(issue.origin)}-ում`;
				case "invalid_union": return "Սխալ մուտքագրում";
				case "invalid_element": return `Սխալ արժեք ${withDefiniteArticle(issue.origin)}-ում`;
				default: return `Սխալ մուտքագրում`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/id.cjs
var require_id = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "karakter",
				verb: "memiliki"
			},
			file: {
				unit: "byte",
				verb: "memiliki"
			},
			array: {
				unit: "item",
				verb: "memiliki"
			},
			set: {
				unit: "item",
				verb: "memiliki"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "alamat email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "tanggal dan waktu format ISO",
			date: "tanggal format ISO",
			time: "jam format ISO",
			duration: "durasi format ISO",
			ipv4: "alamat IPv4",
			ipv6: "alamat IPv6",
			cidrv4: "rentang alamat IPv4",
			cidrv6: "rentang alamat IPv6",
			base64: "string dengan enkode base64",
			base64url: "string dengan enkode base64url",
			json_string: "string JSON",
			e164: "angka E.164",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Input tidak valid: diharapkan instanceof ${issue.expected}, diterima ${received}`;
					return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Input tidak valid: diharapkan ${util.stringifyPrimitive(issue.values[0])}`;
					return `Pilihan tidak valid: diharapkan salah satu dari ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
					return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
					if (_issue.format === "includes") return `String tidak valid: harus menyertakan "${_issue.includes}"`;
					if (_issue.format === "regex") return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} tidak valid`;
				}
				case "not_multiple_of": return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
				case "unrecognized_keys": return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Kunci tidak valid di ${issue.origin}`;
				case "invalid_union": return "Input tidak valid";
				case "invalid_element": return `Nilai tidak valid di ${issue.origin}`;
				default: return `Input tidak valid`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/is.cjs
var require_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "stafi",
				verb: "að hafa"
			},
			file: {
				unit: "bæti",
				verb: "að hafa"
			},
			array: {
				unit: "hluti",
				verb: "að hafa"
			},
			set: {
				unit: "hluti",
				verb: "að hafa"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "gildi",
			email: "netfang",
			url: "vefslóð",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO dagsetning og tími",
			date: "ISO dagsetning",
			time: "ISO tími",
			duration: "ISO tímalengd",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded strengur",
			base64url: "base64url-encoded strengur",
			json_string: "JSON strengur",
			e164: "E.164 tölugildi",
			jwt: "JWT",
			template_literal: "gildi"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "númer",
			array: "fylki"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue.expected}`;
					return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Rangt gildi: gert ráð fyrir ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ógilt val: má vera eitt af eftirfarandi ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
					return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
					if (_issue.format === "regex") return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
					return `Rangt ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
				case "unrecognized_keys": return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Rangur lykill í ${issue.origin}`;
				case "invalid_union": return "Rangt gildi";
				case "invalid_element": return `Rangt gildi í ${issue.origin}`;
				default: return `Rangt gildi`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/it.cjs
var require_it = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caratteri",
				verb: "avere"
			},
			file: {
				unit: "byte",
				verb: "avere"
			},
			array: {
				unit: "elementi",
				verb: "avere"
			},
			set: {
				unit: "elementi",
				verb: "avere"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "indirizzo email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "data e ora ISO",
			date: "data ISO",
			time: "ora ISO",
			duration: "durata ISO",
			ipv4: "indirizzo IPv4",
			ipv6: "indirizzo IPv6",
			cidrv4: "intervallo IPv4",
			cidrv6: "intervallo IPv6",
			base64: "stringa codificata in base64",
			base64url: "URL codificata in base64",
			json_string: "stringa JSON",
			e164: "numero E.164",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "numero",
			array: "vettore"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Input non valido: atteso instanceof ${issue.expected}, ricevuto ${received}`;
					return `Input non valido: atteso ${expected}, ricevuto ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Input non valido: atteso ${util.stringifyPrimitive(issue.values[0])}`;
					return `Opzione non valida: atteso uno tra ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
					return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Stringa non valida: deve includere "${_issue.includes}"`;
					if (_issue.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
					return `Input non valido: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
				case "unrecognized_keys": return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Chiave non valida in ${issue.origin}`;
				case "invalid_union": return "Input non valido";
				case "invalid_element": return `Valore non valido in ${issue.origin}`;
				default: return `Input non valido`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ja.cjs
var require_ja = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "文字",
				verb: "である"
			},
			file: {
				unit: "バイト",
				verb: "である"
			},
			array: {
				unit: "要素",
				verb: "である"
			},
			set: {
				unit: "要素",
				verb: "である"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "入力値",
			email: "メールアドレス",
			url: "URL",
			emoji: "絵文字",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO日時",
			date: "ISO日付",
			time: "ISO時刻",
			duration: "ISO期間",
			ipv4: "IPv4アドレス",
			ipv6: "IPv6アドレス",
			cidrv4: "IPv4範囲",
			cidrv6: "IPv6範囲",
			base64: "base64エンコード文字列",
			base64url: "base64urlエンコード文字列",
			json_string: "JSON文字列",
			e164: "E.164番号",
			jwt: "JWT",
			template_literal: "入力値"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "数値",
			array: "配列"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `無効な入力: instanceof ${issue.expected}が期待されましたが、${received}が入力されました`;
					return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `無効な入力: ${util.stringifyPrimitive(issue.values[0])}が期待されました`;
					return `無効な選択: ${util.joinValues(issue.values, "、")}のいずれかである必要があります`;
				case "too_big": {
					const adj = issue.inclusive ? "以下である" : "より小さい";
					const sizing = getSizing(issue.origin);
					if (sizing) return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
					return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
				}
				case "too_small": {
					const adj = issue.inclusive ? "以上である" : "より大きい";
					const sizing = getSizing(issue.origin);
					if (sizing) return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
					return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
					if (_issue.format === "ends_with") return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
					if (_issue.format === "includes") return `無効な文字列: "${_issue.includes}"を含む必要があります`;
					if (_issue.format === "regex") return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
					return `無効な${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `無効な数値: ${issue.divisor}の倍数である必要があります`;
				case "unrecognized_keys": return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${util.joinValues(issue.keys, "、")}`;
				case "invalid_key": return `${issue.origin}内の無効なキー`;
				case "invalid_union": return "無効な入力";
				case "invalid_element": return `${issue.origin}内の無効な値`;
				default: return `無効な入力`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ka.cjs
var require_ka = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "სიმბოლო",
				verb: "უნდა შეიცავდეს"
			},
			file: {
				unit: "ბაიტი",
				verb: "უნდა შეიცავდეს"
			},
			array: {
				unit: "ელემენტი",
				verb: "უნდა შეიცავდეს"
			},
			set: {
				unit: "ელემენტი",
				verb: "უნდა შეიცავდეს"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "შეყვანა",
			email: "ელ-ფოსტის მისამართი",
			url: "URL",
			emoji: "ემოჯი",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "თარიღი-დრო",
			date: "თარიღი",
			time: "დრო",
			duration: "ხანგრძლივობა",
			ipv4: "IPv4 მისამართი",
			ipv6: "IPv6 მისამართი",
			cidrv4: "IPv4 დიაპაზონი",
			cidrv6: "IPv6 დიაპაზონი",
			base64: "base64-კოდირებული ველი",
			base64url: "base64url-კოდირებული ველი",
			json_string: "JSON ველი",
			e164: "E.164 ნომერი",
			jwt: "JWT",
			template_literal: "შეყვანა"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "რიცხვი",
			string: "ველი",
			boolean: "ბულეანი",
			function: "ფუნქცია",
			array: "მასივი"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue.expected}, მიღებული ${received}`;
					return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `არასწორი შეყვანა: მოსალოდნელი ${util.stringifyPrimitive(issue.values[0])}`;
					return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${util.joinValues(issue.values, "|")}-დან`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
					return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} იყოს ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
					if (_issue.format === "ends_with") return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
					if (_issue.format === "includes") return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
					if (_issue.format === "regex") return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
					return `არასწორი ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `არასწორი რიცხვი: უნდა იყოს ${issue.divisor}-ის ჯერადი`;
				case "unrecognized_keys": return `უცნობი გასაღებ${issue.keys.length > 1 ? "ები" : "ი"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `არასწორი გასაღები ${issue.origin}-ში`;
				case "invalid_union": return "არასწორი შეყვანა";
				case "invalid_element": return `არასწორი მნიშვნელობა ${issue.origin}-ში`;
				default: return `არასწორი შეყვანა`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/km.cjs
var require_km = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "តួអក្សរ",
				verb: "គួរមាន"
			},
			file: {
				unit: "បៃ",
				verb: "គួរមាន"
			},
			array: {
				unit: "ធាតុ",
				verb: "គួរមាន"
			},
			set: {
				unit: "ធាតុ",
				verb: "គួរមាន"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ទិន្នន័យបញ្ចូល",
			email: "អាសយដ្ឋានអ៊ីមែល",
			url: "URL",
			emoji: "សញ្ញាអារម្មណ៍",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
			date: "កាលបរិច្ឆេទ ISO",
			time: "ម៉ោង ISO",
			duration: "រយៈពេល ISO",
			ipv4: "អាសយដ្ឋាន IPv4",
			ipv6: "អាសយដ្ឋាន IPv6",
			cidrv4: "ដែនអាសយដ្ឋាន IPv4",
			cidrv6: "ដែនអាសយដ្ឋាន IPv6",
			base64: "ខ្សែអក្សរអ៊ិកូដ base64",
			base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
			json_string: "ខ្សែអក្សរ JSON",
			e164: "លេខ E.164",
			jwt: "JWT",
			template_literal: "ទិន្នន័យបញ្ចូល"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "លេខ",
			array: "អារេ (Array)",
			null: "គ្មានតម្លៃ (null)"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue.expected} ប៉ុន្តែទទួលបាន ${received}`;
					return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${util.stringifyPrimitive(issue.values[0])}`;
					return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
					return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
					return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
					if (_issue.format === "includes") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
					if (_issue.format === "regex") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
					return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
				case "unrecognized_keys": return `រកឃើញសោមិនស្គាល់៖ ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
				case "invalid_union": return `ទិន្នន័យមិនត្រឹមត្រូវ`;
				case "invalid_element": return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
				default: return `ទិន្នន័យមិនត្រឹមត្រូវ`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/kh.cjs
var require_kh = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var km_js_1 = __importDefault(require_km());
	/** @deprecated Use `km` instead. */
	function default_1() {
		return (0, km_js_1.default)();
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ko.cjs
var require_ko = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "문자",
				verb: "to have"
			},
			file: {
				unit: "바이트",
				verb: "to have"
			},
			array: {
				unit: "개",
				verb: "to have"
			},
			set: {
				unit: "개",
				verb: "to have"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "입력",
			email: "이메일 주소",
			url: "URL",
			emoji: "이모지",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO 날짜시간",
			date: "ISO 날짜",
			time: "ISO 시간",
			duration: "ISO 기간",
			ipv4: "IPv4 주소",
			ipv6: "IPv6 주소",
			cidrv4: "IPv4 범위",
			cidrv6: "IPv6 범위",
			base64: "base64 인코딩 문자열",
			base64url: "base64url 인코딩 문자열",
			json_string: "JSON 문자열",
			e164: "E.164 번호",
			jwt: "JWT",
			template_literal: "입력"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `잘못된 입력: 예상 타입은 instanceof ${issue.expected}, 받은 타입은 ${received}입니다`;
					return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `잘못된 입력: 값은 ${util.stringifyPrimitive(issue.values[0])} 이어야 합니다`;
					return `잘못된 옵션: ${util.joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
				case "too_big": {
					const adj = issue.inclusive ? "이하" : "미만";
					const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
					const sizing = getSizing(issue.origin);
					const unit = sizing?.unit ?? "요소";
					if (sizing) return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
					return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? "이상" : "초과";
					const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
					const sizing = getSizing(issue.origin);
					const unit = sizing?.unit ?? "요소";
					if (sizing) return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
					return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
					if (_issue.format === "ends_with") return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
					if (_issue.format === "includes") return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
					if (_issue.format === "regex") return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
					return `잘못된 ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
				case "unrecognized_keys": return `인식할 수 없는 키: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `잘못된 키: ${issue.origin}`;
				case "invalid_union": return `잘못된 입력`;
				case "invalid_element": return `잘못된 값: ${issue.origin}`;
				default: return `잘못된 입력`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/lt.cjs
var require_lt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var capitalizeFirstCharacter = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};
	function getUnitTypeFromNumber(number) {
		const abs = Math.abs(number);
		const last = abs % 10;
		const last2 = abs % 100;
		if (last2 >= 11 && last2 <= 19 || last === 0) return "many";
		if (last === 1) return "one";
		return "few";
	}
	var error = () => {
		const Sizable = {
			string: {
				unit: {
					one: "simbolis",
					few: "simboliai",
					many: "simbolių"
				},
				verb: {
					smaller: {
						inclusive: "turi būti ne ilgesnė kaip",
						notInclusive: "turi būti trumpesnė kaip"
					},
					bigger: {
						inclusive: "turi būti ne trumpesnė kaip",
						notInclusive: "turi būti ilgesnė kaip"
					}
				}
			},
			file: {
				unit: {
					one: "baitas",
					few: "baitai",
					many: "baitų"
				},
				verb: {
					smaller: {
						inclusive: "turi būti ne didesnis kaip",
						notInclusive: "turi būti mažesnis kaip"
					},
					bigger: {
						inclusive: "turi būti ne mažesnis kaip",
						notInclusive: "turi būti didesnis kaip"
					}
				}
			},
			array: {
				unit: {
					one: "elementą",
					few: "elementus",
					many: "elementų"
				},
				verb: {
					smaller: {
						inclusive: "turi turėti ne daugiau kaip",
						notInclusive: "turi turėti mažiau kaip"
					},
					bigger: {
						inclusive: "turi turėti ne mažiau kaip",
						notInclusive: "turi turėti daugiau kaip"
					}
				}
			},
			set: {
				unit: {
					one: "elementą",
					few: "elementus",
					many: "elementų"
				},
				verb: {
					smaller: {
						inclusive: "turi turėti ne daugiau kaip",
						notInclusive: "turi turėti mažiau kaip"
					},
					bigger: {
						inclusive: "turi turėti ne mažiau kaip",
						notInclusive: "turi turėti daugiau kaip"
					}
				}
			}
		};
		function getSizing(origin, unitType, inclusive, targetShouldBe) {
			const result = Sizable[origin] ?? null;
			if (result === null) return result;
			return {
				unit: result.unit[unitType],
				verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
			};
		}
		const FormatDictionary = {
			regex: "įvestis",
			email: "el. pašto adresas",
			url: "URL",
			emoji: "jaustukas",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO data ir laikas",
			date: "ISO data",
			time: "ISO laikas",
			duration: "ISO trukmė",
			ipv4: "IPv4 adresas",
			ipv6: "IPv6 adresas",
			cidrv4: "IPv4 tinklo prefiksas (CIDR)",
			cidrv6: "IPv6 tinklo prefiksas (CIDR)",
			base64: "base64 užkoduota eilutė",
			base64url: "base64url užkoduota eilutė",
			json_string: "JSON eilutė",
			e164: "E.164 numeris",
			jwt: "JWT",
			template_literal: "įvestis"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "skaičius",
			bigint: "sveikasis skaičius",
			string: "eilutė",
			boolean: "loginė reikšmė",
			undefined: "neapibrėžta reikšmė",
			function: "funkcija",
			symbol: "simbolis",
			array: "masyvas",
			object: "objektas",
			null: "nulinė reikšmė"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue.expected}`;
					return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Privalo būti ${util.stringifyPrimitive(issue.values[0])}`;
					return `Privalo būti vienas iš ${util.joinValues(issue.values, "|")} pasirinkimų`;
				case "too_big": {
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.maximum)), issue.inclusive ?? false, "smaller");
					if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.maximum.toString()} ${sizing.unit ?? "elementų"}`;
					const adj = issue.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
					return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.maximum.toString()} ${sizing?.unit}`;
				}
				case "too_small": {
					const origin = TypeDictionary[issue.origin] ?? issue.origin;
					const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.minimum)), issue.inclusive ?? false, "bigger");
					if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.minimum.toString()} ${sizing.unit ?? "elementų"}`;
					const adj = issue.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
					return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.minimum.toString()} ${sizing?.unit}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Eilutė privalo prasidėti "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Eilutė privalo įtraukti "${_issue.includes}"`;
					if (_issue.format === "regex") return `Eilutė privalo atitikti ${_issue.pattern}`;
					return `Neteisingas ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Skaičius privalo būti ${issue.divisor} kartotinis.`;
				case "unrecognized_keys": return `Neatpažint${issue.keys.length > 1 ? "i" : "as"} rakt${issue.keys.length > 1 ? "ai" : "as"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return "Rastas klaidingas raktas";
				case "invalid_union": return "Klaidinga įvestis";
				case "invalid_element": return `${capitalizeFirstCharacter(TypeDictionary[issue.origin] ?? issue.origin ?? issue.origin ?? "reikšmė")} turi klaidingą įvestį`;
				default: return "Klaidinga įvestis";
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/mk.cjs
var require_mk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "знаци",
				verb: "да имаат"
			},
			file: {
				unit: "бајти",
				verb: "да имаат"
			},
			array: {
				unit: "ставки",
				verb: "да имаат"
			},
			set: {
				unit: "ставки",
				verb: "да имаат"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "внес",
			email: "адреса на е-пошта",
			url: "URL",
			emoji: "емоџи",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO датум и време",
			date: "ISO датум",
			time: "ISO време",
			duration: "ISO времетраење",
			ipv4: "IPv4 адреса",
			ipv6: "IPv6 адреса",
			cidrv4: "IPv4 опсег",
			cidrv6: "IPv6 опсег",
			base64: "base64-енкодирана низа",
			base64url: "base64url-енкодирана низа",
			json_string: "JSON низа",
			e164: "E.164 број",
			jwt: "JWT",
			template_literal: "внес"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "број",
			array: "низа"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Грешен внес: се очекува instanceof ${issue.expected}, примено ${received}`;
					return `Грешен внес: се очекува ${expected}, примено ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Invalid input: expected ${util.stringifyPrimitive(issue.values[0])}`;
					return `Грешана опција: се очекува една ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
					return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
					if (_issue.format === "regex") return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
					return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Грешен број: мора да биде делив со ${issue.divisor}`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Грешен клуч во ${issue.origin}`;
				case "invalid_union": return "Грешен внес";
				case "invalid_element": return `Грешна вредност во ${issue.origin}`;
				default: return `Грешен внес`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ms.cjs
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "aksara",
				verb: "mempunyai"
			},
			file: {
				unit: "bait",
				verb: "mempunyai"
			},
			array: {
				unit: "elemen",
				verb: "mempunyai"
			},
			set: {
				unit: "elemen",
				verb: "mempunyai"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "alamat e-mel",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "tarikh masa ISO",
			date: "tarikh ISO",
			time: "masa ISO",
			duration: "tempoh ISO",
			ipv4: "alamat IPv4",
			ipv6: "alamat IPv6",
			cidrv4: "julat IPv4",
			cidrv6: "julat IPv6",
			base64: "string dikodkan base64",
			base64url: "string dikodkan base64url",
			json_string: "string JSON",
			e164: "nombor E.164",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "nombor"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Input tidak sah: dijangka instanceof ${issue.expected}, diterima ${received}`;
					return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Input tidak sah: dijangka ${util.stringifyPrimitive(issue.values[0])}`;
					return `Pilihan tidak sah: dijangka salah satu daripada ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
					return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
					if (_issue.format === "includes") return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
					if (_issue.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} tidak sah`;
				}
				case "not_multiple_of": return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
				case "unrecognized_keys": return `Kunci tidak dikenali: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Kunci tidak sah dalam ${issue.origin}`;
				case "invalid_union": return "Input tidak sah";
				case "invalid_element": return `Nilai tidak sah dalam ${issue.origin}`;
				default: return `Input tidak sah`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/nl.cjs
var require_nl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "tekens",
				verb: "heeft"
			},
			file: {
				unit: "bytes",
				verb: "heeft"
			},
			array: {
				unit: "elementen",
				verb: "heeft"
			},
			set: {
				unit: "elementen",
				verb: "heeft"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "invoer",
			email: "emailadres",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datum en tijd",
			date: "ISO datum",
			time: "ISO tijd",
			duration: "ISO duur",
			ipv4: "IPv4-adres",
			ipv6: "IPv6-adres",
			cidrv4: "IPv4-bereik",
			cidrv6: "IPv6-bereik",
			base64: "base64-gecodeerde tekst",
			base64url: "base64 URL-gecodeerde tekst",
			json_string: "JSON string",
			e164: "E.164-nummer",
			jwt: "JWT",
			template_literal: "invoer"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "getal"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}`;
					return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ongeldige invoer: verwacht ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ongeldige optie: verwacht één van ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					const longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";
					if (sizing) return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
					return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					const shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";
					if (sizing) return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
					return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
					if (_issue.format === "ends_with") return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
					if (_issue.format === "includes") return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
					if (_issue.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
					return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
				case "unrecognized_keys": return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Ongeldige key in ${issue.origin}`;
				case "invalid_union": return "Ongeldige invoer";
				case "invalid_element": return `Ongeldige waarde in ${issue.origin}`;
				default: return `Ongeldige invoer`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/no.cjs
var require_no = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "tegn",
				verb: "å ha"
			},
			file: {
				unit: "bytes",
				verb: "å ha"
			},
			array: {
				unit: "elementer",
				verb: "å inneholde"
			},
			set: {
				unit: "elementer",
				verb: "å inneholde"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "input",
			email: "e-postadresse",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO dato- og klokkeslett",
			date: "ISO-dato",
			time: "ISO-klokkeslett",
			duration: "ISO-varighet",
			ipv4: "IPv4-område",
			ipv6: "IPv6-område",
			cidrv4: "IPv4-spekter",
			cidrv6: "IPv6-spekter",
			base64: "base64-enkodet streng",
			base64url: "base64url-enkodet streng",
			json_string: "JSON-streng",
			e164: "E.164-nummer",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "tall",
			array: "liste"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ugyldig input: forventet instanceof ${issue.expected}, fikk ${received}`;
					return `Ugyldig input: forventet ${expected}, fikk ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ugyldig verdi: forventet ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ugyldig valg: forventet en av ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
					return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ugyldig streng: må starte med "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Ugyldig streng: må ende med "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Ugyldig streng: må inneholde "${_issue.includes}"`;
					if (_issue.format === "regex") return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
					return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Ugyldig nøkkel i ${issue.origin}`;
				case "invalid_union": return "Ugyldig input";
				case "invalid_element": return `Ugyldig verdi i ${issue.origin}`;
				default: return `Ugyldig input`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ota.cjs
var require_ota = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "harf",
				verb: "olmalıdır"
			},
			file: {
				unit: "bayt",
				verb: "olmalıdır"
			},
			array: {
				unit: "unsur",
				verb: "olmalıdır"
			},
			set: {
				unit: "unsur",
				verb: "olmalıdır"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "giren",
			email: "epostagâh",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO hengâmı",
			date: "ISO tarihi",
			time: "ISO zamanı",
			duration: "ISO müddeti",
			ipv4: "IPv4 nişânı",
			ipv6: "IPv6 nişânı",
			cidrv4: "IPv4 menzili",
			cidrv6: "IPv6 menzili",
			base64: "base64-şifreli metin",
			base64url: "base64url-şifreli metin",
			json_string: "JSON metin",
			e164: "E.164 sayısı",
			jwt: "JWT",
			template_literal: "giren"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "numara",
			array: "saf",
			null: "gayb"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Fâsit giren: umulan instanceof ${issue.expected}, alınan ${received}`;
					return `Fâsit giren: umulan ${expected}, alınan ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Fâsit giren: umulan ${util.stringifyPrimitive(issue.values[0])}`;
					return `Fâsit tercih: mûteberler ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
					return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
					return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
					if (_issue.format === "ends_with") return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
					if (_issue.format === "includes") return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
					if (_issue.format === "regex") return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
					return `Fâsit ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
				case "unrecognized_keys": return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} için tanınmayan anahtar var.`;
				case "invalid_union": return "Giren tanınamadı.";
				case "invalid_element": return `${issue.origin} için tanınmayan kıymet var.`;
				default: return `Kıymet tanınamadı.`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ps.cjs
var require_ps = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "توکي",
				verb: "ولري"
			},
			file: {
				unit: "بایټس",
				verb: "ولري"
			},
			array: {
				unit: "توکي",
				verb: "ولري"
			},
			set: {
				unit: "توکي",
				verb: "ولري"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ورودي",
			email: "بریښنالیک",
			url: "یو آر ال",
			emoji: "ایموجي",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "نیټه او وخت",
			date: "نېټه",
			time: "وخت",
			duration: "موده",
			ipv4: "د IPv4 پته",
			ipv6: "د IPv6 پته",
			cidrv4: "د IPv4 ساحه",
			cidrv6: "د IPv6 ساحه",
			base64: "base64-encoded متن",
			base64url: "base64url-encoded متن",
			json_string: "JSON متن",
			e164: "د E.164 شمېره",
			jwt: "JWT",
			template_literal: "ورودي"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "عدد",
			array: "ارې"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `ناسم ورودي: باید instanceof ${issue.expected} وای, مګر ${received} ترلاسه شو`;
					return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `ناسم ورودي: باید ${util.stringifyPrimitive(issue.values[0])} وای`;
					return `ناسم انتخاب: باید یو له ${util.joinValues(issue.values, "|")} څخه وای`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
					return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
					return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
					if (_issue.format === "ends_with") return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
					if (_issue.format === "includes") return `ناسم متن: باید "${_issue.includes}" ولري`;
					if (_issue.format === "regex") return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
					return `${FormatDictionary[_issue.format] ?? issue.format} ناسم دی`;
				}
				case "not_multiple_of": return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
				case "unrecognized_keys": return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `ناسم کلیډ په ${issue.origin} کې`;
				case "invalid_union": return `ناسمه ورودي`;
				case "invalid_element": return `ناسم عنصر په ${issue.origin} کې`;
				default: return `ناسمه ورودي`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/pl.cjs
var require_pl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "znaków",
				verb: "mieć"
			},
			file: {
				unit: "bajtów",
				verb: "mieć"
			},
			array: {
				unit: "elementów",
				verb: "mieć"
			},
			set: {
				unit: "elementów",
				verb: "mieć"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "wyrażenie",
			email: "adres email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "data i godzina w formacie ISO",
			date: "data w formacie ISO",
			time: "godzina w formacie ISO",
			duration: "czas trwania ISO",
			ipv4: "adres IPv4",
			ipv6: "adres IPv6",
			cidrv4: "zakres IPv4",
			cidrv6: "zakres IPv6",
			base64: "ciąg znaków zakodowany w formacie base64",
			base64url: "ciąg znaków zakodowany w formacie base64url",
			json_string: "ciąg znaków w formacie JSON",
			e164: "liczba E.164",
			jwt: "JWT",
			template_literal: "wejście"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "liczba",
			array: "tablica"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue.expected}, otrzymano ${received}`;
					return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Nieprawidłowe dane wejściowe: oczekiwano ${util.stringifyPrimitive(issue.values[0])}`;
					return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
					return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
					return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
					if (_issue.format === "regex") return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
					return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
				case "unrecognized_keys": return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Nieprawidłowy klucz w ${issue.origin}`;
				case "invalid_union": return "Nieprawidłowe dane wejściowe";
				case "invalid_element": return `Nieprawidłowa wartość w ${issue.origin}`;
				default: return `Nieprawidłowe dane wejściowe`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/pt.cjs
var require_pt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caracteres",
				verb: "ter"
			},
			file: {
				unit: "bytes",
				verb: "ter"
			},
			array: {
				unit: "itens",
				verb: "ter"
			},
			set: {
				unit: "itens",
				verb: "ter"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "padrão",
			email: "endereço de e-mail",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "data e hora ISO",
			date: "data ISO",
			time: "hora ISO",
			duration: "duração ISO",
			ipv4: "endereço IPv4",
			ipv6: "endereço IPv6",
			cidrv4: "faixa de IPv4",
			cidrv6: "faixa de IPv6",
			base64: "texto codificado em base64",
			base64url: "URL codificada em base64",
			json_string: "texto JSON",
			e164: "número E.164",
			jwt: "JWT",
			template_literal: "entrada"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "número",
			null: "nulo"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Tipo inválido: esperado instanceof ${issue.expected}, recebido ${received}`;
					return `Tipo inválido: esperado ${expected}, recebido ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Entrada inválida: esperado ${util.stringifyPrimitive(issue.values[0])}`;
					return `Opção inválida: esperada uma das ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Muito grande: esperado que ${issue.origin ?? "valor"} tivesse ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
					return `Muito grande: esperado que ${issue.origin ?? "valor"} fosse ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Muito pequeno: esperado que ${issue.origin} tivesse ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Muito pequeno: esperado que ${issue.origin} fosse ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Texto inválido: deve começar com "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Texto inválido: deve terminar com "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Texto inválido: deve incluir "${_issue.includes}"`;
					if (_issue.format === "regex") return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} inválido`;
				}
				case "not_multiple_of": return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
				case "unrecognized_keys": return `Chave${issue.keys.length > 1 ? "s" : ""} desconhecida${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Chave inválida em ${issue.origin}`;
				case "invalid_union": return "Entrada inválida";
				case "invalid_element": return `Valor inválido em ${issue.origin}`;
				default: return `Campo inválido`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ro.cjs
var require_ro = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "caractere",
				verb: "să aibă"
			},
			file: {
				unit: "octeți",
				verb: "să aibă"
			},
			array: {
				unit: "elemente",
				verb: "să aibă"
			},
			set: {
				unit: "elemente",
				verb: "să aibă"
			},
			map: {
				unit: "intrări",
				verb: "să aibă"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "intrare",
			email: "adresă de email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "dată și oră ISO",
			date: "dată ISO",
			time: "oră ISO",
			duration: "durată ISO",
			ipv4: "adresă IPv4",
			ipv6: "adresă IPv6",
			mac: "adresă MAC",
			cidrv4: "interval IPv4",
			cidrv6: "interval IPv6",
			base64: "șir codat base64",
			base64url: "șir codat base64url",
			json_string: "șir JSON",
			e164: "număr E.164",
			jwt: "JWT",
			template_literal: "intrare"
		};
		const TypeDictionary = {
			nan: "NaN",
			string: "șir",
			number: "număr",
			boolean: "boolean",
			function: "funcție",
			array: "matrice",
			object: "obiect",
			undefined: "nedefinit",
			symbol: "simbol",
			bigint: "număr mare",
			void: "void",
			never: "never",
			map: "hartă",
			set: "set"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					return `Intrare invalidă: așteptat ${expected}, primit ${TypeDictionary[receivedType] ?? receivedType}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Intrare invalidă: așteptat ${util.stringifyPrimitive(issue.values[0])}`;
					return `Opțiune invalidă: așteptat una dintre ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemente"}`;
					return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} să fie ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Prea mic: așteptat ca ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Prea mic: așteptat ca ${issue.origin} să fie ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Șir invalid: trebuie să includă "${_issue.includes}"`;
					if (_issue.format === "regex") return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
					return `Format invalid: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Număr invalid: trebuie să fie multiplu de ${issue.divisor}`;
				case "unrecognized_keys": return `Chei nerecunoscute: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Cheie invalidă în ${issue.origin}`;
				case "invalid_union": return "Intrare invalidă";
				case "invalid_element": return `Valoare invalidă în ${issue.origin}`;
				default: return `Intrare invalidă`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ru.cjs
var require_ru = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	function getRussianPlural(count, one, few, many) {
		const absCount = Math.abs(count);
		const lastDigit = absCount % 10;
		const lastTwoDigits = absCount % 100;
		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
		if (lastDigit === 1) return one;
		if (lastDigit >= 2 && lastDigit <= 4) return few;
		return many;
	}
	var error = () => {
		const Sizable = {
			string: {
				unit: {
					one: "символ",
					few: "символа",
					many: "символов"
				},
				verb: "иметь"
			},
			file: {
				unit: {
					one: "байт",
					few: "байта",
					many: "байт"
				},
				verb: "иметь"
			},
			array: {
				unit: {
					one: "элемент",
					few: "элемента",
					many: "элементов"
				},
				verb: "иметь"
			},
			set: {
				unit: {
					one: "элемент",
					few: "элемента",
					many: "элементов"
				},
				verb: "иметь"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ввод",
			email: "email адрес",
			url: "URL",
			emoji: "эмодзи",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO дата и время",
			date: "ISO дата",
			time: "ISO время",
			duration: "ISO длительность",
			ipv4: "IPv4 адрес",
			ipv6: "IPv6 адрес",
			cidrv4: "IPv4 диапазон",
			cidrv6: "IPv6 диапазон",
			base64: "строка в формате base64",
			base64url: "строка в формате base64url",
			json_string: "JSON строка",
			e164: "номер E.164",
			jwt: "JWT",
			template_literal: "ввод"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "число",
			array: "массив"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Неверный ввод: ожидалось instanceof ${issue.expected}, получено ${received}`;
					return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Неверный ввод: ожидалось ${util.stringifyPrimitive(issue.values[0])}`;
					return `Неверный вариант: ожидалось одно из ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getRussianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
						return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
					}
					return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) {
						const unit = getRussianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
						return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
					}
					return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Неверная строка: должна содержать "${_issue.includes}"`;
					if (_issue.format === "regex") return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
					return `Неверный ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Неверное число: должно быть кратным ${issue.divisor}`;
				case "unrecognized_keys": return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Неверный ключ в ${issue.origin}`;
				case "invalid_union": return "Неверные входные данные";
				case "invalid_element": return `Неверное значение в ${issue.origin}`;
				default: return `Неверные входные данные`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/sl.cjs
var require_sl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "znakov",
				verb: "imeti"
			},
			file: {
				unit: "bajtov",
				verb: "imeti"
			},
			array: {
				unit: "elementov",
				verb: "imeti"
			},
			set: {
				unit: "elementov",
				verb: "imeti"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "vnos",
			email: "e-poštni naslov",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datum in čas",
			date: "ISO datum",
			time: "ISO čas",
			duration: "ISO trajanje",
			ipv4: "IPv4 naslov",
			ipv6: "IPv6 naslov",
			cidrv4: "obseg IPv4",
			cidrv6: "obseg IPv6",
			base64: "base64 kodiran niz",
			base64url: "base64url kodiran niz",
			json_string: "JSON niz",
			e164: "E.164 številka",
			jwt: "JWT",
			template_literal: "vnos"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "število",
			array: "tabela"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Neveljaven vnos: pričakovano instanceof ${issue.expected}, prejeto ${received}`;
					return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Neveljaven vnos: pričakovano ${util.stringifyPrimitive(issue.values[0])}`;
					return `Neveljavna možnost: pričakovano eno izmed ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
					return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
					if (_issue.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
					return `Neveljaven ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
				case "unrecognized_keys": return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Neveljaven ključ v ${issue.origin}`;
				case "invalid_union": return "Neveljaven vnos";
				case "invalid_element": return `Neveljavna vrednost v ${issue.origin}`;
				default: return "Neveljaven vnos";
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/sv.cjs
var require_sv = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "tecken",
				verb: "att ha"
			},
			file: {
				unit: "bytes",
				verb: "att ha"
			},
			array: {
				unit: "objekt",
				verb: "att innehålla"
			},
			set: {
				unit: "objekt",
				verb: "att innehålla"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "reguljärt uttryck",
			email: "e-postadress",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO-datum och tid",
			date: "ISO-datum",
			time: "ISO-tid",
			duration: "ISO-varaktighet",
			ipv4: "IPv4-intervall",
			ipv6: "IPv6-intervall",
			cidrv4: "IPv4-spektrum",
			cidrv6: "IPv6-spektrum",
			base64: "base64-kodad sträng",
			base64url: "base64url-kodad sträng",
			json_string: "JSON-sträng",
			e164: "E.164-nummer",
			jwt: "JWT",
			template_literal: "mall-literal"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "antal",
			array: "lista"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ogiltig inmatning: förväntat instanceof ${issue.expected}, fick ${received}`;
					return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ogiltig inmatning: förväntat ${util.stringifyPrimitive(issue.values[0])}`;
					return `Ogiltigt val: förväntade en av ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
					return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
					if (_issue.format === "regex") return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
					return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
				case "unrecognized_keys": return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
				case "invalid_union": return "Ogiltig input";
				case "invalid_element": return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
				default: return `Ogiltig input`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ta.cjs
var require_ta = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "எழுத்துக்கள்",
				verb: "கொண்டிருக்க வேண்டும்"
			},
			file: {
				unit: "பைட்டுகள்",
				verb: "கொண்டிருக்க வேண்டும்"
			},
			array: {
				unit: "உறுப்புகள்",
				verb: "கொண்டிருக்க வேண்டும்"
			},
			set: {
				unit: "உறுப்புகள்",
				verb: "கொண்டிருக்க வேண்டும்"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "உள்ளீடு",
			email: "மின்னஞ்சல் முகவரி",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO தேதி நேரம்",
			date: "ISO தேதி",
			time: "ISO நேரம்",
			duration: "ISO கால அளவு",
			ipv4: "IPv4 முகவரி",
			ipv6: "IPv6 முகவரி",
			cidrv4: "IPv4 வரம்பு",
			cidrv6: "IPv6 வரம்பு",
			base64: "base64-encoded சரம்",
			base64url: "base64url-encoded சரம்",
			json_string: "JSON சரம்",
			e164: "E.164 எண்",
			jwt: "JWT",
			template_literal: "input"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "எண்",
			array: "அணி",
			null: "வெறுமை"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue.expected}, பெறப்பட்டது ${received}`;
					return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${util.stringifyPrimitive(issue.values[0])}`;
					return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${util.joinValues(issue.values, "|")} இல் ஒன்று`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
					return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
					return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
					if (_issue.format === "ends_with") return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
					if (_issue.format === "includes") return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
					if (_issue.format === "regex") return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
					return `தவறான ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
				case "unrecognized_keys": return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} இல் தவறான விசை`;
				case "invalid_union": return "தவறான உள்ளீடு";
				case "invalid_element": return `${issue.origin} இல் தவறான மதிப்பு`;
				default: return `தவறான உள்ளீடு`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/th.cjs
var require_th = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "ตัวอักษร",
				verb: "ควรมี"
			},
			file: {
				unit: "ไบต์",
				verb: "ควรมี"
			},
			array: {
				unit: "รายการ",
				verb: "ควรมี"
			},
			set: {
				unit: "รายการ",
				verb: "ควรมี"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ข้อมูลที่ป้อน",
			email: "ที่อยู่อีเมล",
			url: "URL",
			emoji: "อิโมจิ",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "วันที่เวลาแบบ ISO",
			date: "วันที่แบบ ISO",
			time: "เวลาแบบ ISO",
			duration: "ช่วงเวลาแบบ ISO",
			ipv4: "ที่อยู่ IPv4",
			ipv6: "ที่อยู่ IPv6",
			cidrv4: "ช่วง IP แบบ IPv4",
			cidrv6: "ช่วง IP แบบ IPv6",
			base64: "ข้อความแบบ Base64",
			base64url: "ข้อความแบบ Base64 สำหรับ URL",
			json_string: "ข้อความแบบ JSON",
			e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
			jwt: "โทเคน JWT",
			template_literal: "ข้อมูลที่ป้อน"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "ตัวเลข",
			array: "อาร์เรย์ (Array)",
			null: "ไม่มีค่า (null)"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue.expected} แต่ได้รับ ${received}`;
					return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `ค่าไม่ถูกต้อง: ควรเป็น ${util.stringifyPrimitive(issue.values[0])}`;
					return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
					const sizing = getSizing(issue.origin);
					if (sizing) return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
					return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
					const sizing = getSizing(issue.origin);
					if (sizing) return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
					return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
					if (_issue.format === "includes") return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
					if (_issue.format === "regex") return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
					return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
				case "unrecognized_keys": return `พบคีย์ที่ไม่รู้จัก: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
				case "invalid_union": return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
				case "invalid_element": return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
				default: return `ข้อมูลไม่ถูกต้อง`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/tr.cjs
var require_tr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "karakter",
				verb: "olmalı"
			},
			file: {
				unit: "bayt",
				verb: "olmalı"
			},
			array: {
				unit: "öğe",
				verb: "olmalı"
			},
			set: {
				unit: "öğe",
				verb: "olmalı"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "girdi",
			email: "e-posta adresi",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO tarih ve saat",
			date: "ISO tarih",
			time: "ISO saat",
			duration: "ISO süre",
			ipv4: "IPv4 adresi",
			ipv6: "IPv6 adresi",
			cidrv4: "IPv4 aralığı",
			cidrv6: "IPv6 aralığı",
			base64: "base64 ile şifrelenmiş metin",
			base64url: "base64url ile şifrelenmiş metin",
			json_string: "JSON dizesi",
			e164: "E.164 sayısı",
			jwt: "JWT",
			template_literal: "Şablon dizesi"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Geçersiz değer: beklenen instanceof ${issue.expected}, alınan ${received}`;
					return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Geçersiz değer: beklenen ${util.stringifyPrimitive(issue.values[0])}`;
					return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
					return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
					if (_issue.format === "ends_with") return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
					if (_issue.format === "includes") return `Geçersiz metin: "${_issue.includes}" içermeli`;
					if (_issue.format === "regex") return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
					return `Geçersiz ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
				case "unrecognized_keys": return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} içinde geçersiz anahtar`;
				case "invalid_union": return "Geçersiz değer";
				case "invalid_element": return `${issue.origin} içinde geçersiz değer`;
				default: return `Geçersiz değer`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/uk.cjs
var require_uk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "символів",
				verb: "матиме"
			},
			file: {
				unit: "байтів",
				verb: "матиме"
			},
			array: {
				unit: "елементів",
				verb: "матиме"
			},
			set: {
				unit: "елементів",
				verb: "матиме"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "вхідні дані",
			email: "адреса електронної пошти",
			url: "URL",
			emoji: "емодзі",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "дата та час ISO",
			date: "дата ISO",
			time: "час ISO",
			duration: "тривалість ISO",
			ipv4: "адреса IPv4",
			ipv6: "адреса IPv6",
			cidrv4: "діапазон IPv4",
			cidrv6: "діапазон IPv6",
			base64: "рядок у кодуванні base64",
			base64url: "рядок у кодуванні base64url",
			json_string: "рядок JSON",
			e164: "номер E.164",
			jwt: "JWT",
			template_literal: "вхідні дані"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "число",
			array: "масив"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Неправильні вхідні дані: очікується instanceof ${issue.expected}, отримано ${received}`;
					return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Неправильні вхідні дані: очікується ${util.stringifyPrimitive(issue.values[0])}`;
					return `Неправильна опція: очікується одне з ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
					return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Неправильний рядок: повинен містити "${_issue.includes}"`;
					if (_issue.format === "regex") return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
					return `Неправильний ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Неправильне число: повинно бути кратним ${issue.divisor}`;
				case "unrecognized_keys": return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Неправильний ключ у ${issue.origin}`;
				case "invalid_union": return "Неправильні вхідні дані";
				case "invalid_element": return `Неправильне значення у ${issue.origin}`;
				default: return `Неправильні вхідні дані`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ua.cjs
var require_ua = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var uk_js_1 = __importDefault(require_uk());
	/** @deprecated Use `uk` instead. */
	function default_1() {
		return (0, uk_js_1.default)();
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/ur.cjs
var require_ur = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "حروف",
				verb: "ہونا"
			},
			file: {
				unit: "بائٹس",
				verb: "ہونا"
			},
			array: {
				unit: "آئٹمز",
				verb: "ہونا"
			},
			set: {
				unit: "آئٹمز",
				verb: "ہونا"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ان پٹ",
			email: "ای میل ایڈریس",
			url: "یو آر ایل",
			emoji: "ایموجی",
			uuid: "یو یو آئی ڈی",
			uuidv4: "یو یو آئی ڈی وی 4",
			uuidv6: "یو یو آئی ڈی وی 6",
			nanoid: "نینو آئی ڈی",
			guid: "جی یو آئی ڈی",
			cuid: "سی یو آئی ڈی",
			cuid2: "سی یو آئی ڈی 2",
			ulid: "یو ایل آئی ڈی",
			xid: "ایکس آئی ڈی",
			ksuid: "کے ایس یو آئی ڈی",
			datetime: "آئی ایس او ڈیٹ ٹائم",
			date: "آئی ایس او تاریخ",
			time: "آئی ایس او وقت",
			duration: "آئی ایس او مدت",
			ipv4: "آئی پی وی 4 ایڈریس",
			ipv6: "آئی پی وی 6 ایڈریس",
			cidrv4: "آئی پی وی 4 رینج",
			cidrv6: "آئی پی وی 6 رینج",
			base64: "بیس 64 ان کوڈڈ سٹرنگ",
			base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
			json_string: "جے ایس او این سٹرنگ",
			e164: "ای 164 نمبر",
			jwt: "جے ڈبلیو ٹی",
			template_literal: "ان پٹ"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "نمبر",
			array: "آرے",
			null: "نل"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `غلط ان پٹ: instanceof ${issue.expected} متوقع تھا، ${received} موصول ہوا`;
					return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `غلط ان پٹ: ${util.stringifyPrimitive(issue.values[0])} متوقع تھا`;
					return `غلط آپشن: ${util.joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
					return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
					return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
					if (_issue.format === "ends_with") return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
					if (_issue.format === "includes") return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
					if (_issue.format === "regex") return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
					return `غلط ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
				case "unrecognized_keys": return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${util.joinValues(issue.keys, "، ")}`;
				case "invalid_key": return `${issue.origin} میں غلط کی`;
				case "invalid_union": return "غلط ان پٹ";
				case "invalid_element": return `${issue.origin} میں غلط ویلیو`;
				default: return `غلط ان پٹ`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/uz.cjs
var require_uz = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "belgi",
				verb: "bo‘lishi kerak"
			},
			file: {
				unit: "bayt",
				verb: "bo‘lishi kerak"
			},
			array: {
				unit: "element",
				verb: "bo‘lishi kerak"
			},
			set: {
				unit: "element",
				verb: "bo‘lishi kerak"
			},
			map: {
				unit: "yozuv",
				verb: "bo‘lishi kerak"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "kirish",
			email: "elektron pochta manzili",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO sana va vaqti",
			date: "ISO sana",
			time: "ISO vaqt",
			duration: "ISO davomiylik",
			ipv4: "IPv4 manzil",
			ipv6: "IPv6 manzil",
			mac: "MAC manzil",
			cidrv4: "IPv4 diapazon",
			cidrv6: "IPv6 diapazon",
			base64: "base64 kodlangan satr",
			base64url: "base64url kodlangan satr",
			json_string: "JSON satr",
			e164: "E.164 raqam",
			jwt: "JWT",
			template_literal: "kirish"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "raqam",
			array: "massiv"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Noto‘g‘ri kirish: kutilgan instanceof ${issue.expected}, qabul qilingan ${received}`;
					return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Noto‘g‘ri kirish: kutilgan ${util.stringifyPrimitive(issue.values[0])}`;
					return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
					return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
					return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
					if (_issue.format === "ends_with") return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
					if (_issue.format === "includes") return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
					if (_issue.format === "regex") return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
					return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Noto‘g‘ri raqam: ${issue.divisor} ning karralisi bo‘lishi kerak`;
				case "unrecognized_keys": return `Noma’lum kalit${issue.keys.length > 1 ? "lar" : ""}: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} dagi kalit noto‘g‘ri`;
				case "invalid_union": return "Noto‘g‘ri kirish";
				case "invalid_element": return `${issue.origin} da noto‘g‘ri qiymat`;
				default: return `Noto‘g‘ri kirish`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/vi.cjs
var require_vi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "ký tự",
				verb: "có"
			},
			file: {
				unit: "byte",
				verb: "có"
			},
			array: {
				unit: "phần tử",
				verb: "có"
			},
			set: {
				unit: "phần tử",
				verb: "có"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "đầu vào",
			email: "địa chỉ email",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ngày giờ ISO",
			date: "ngày ISO",
			time: "giờ ISO",
			duration: "khoảng thời gian ISO",
			ipv4: "địa chỉ IPv4",
			ipv6: "địa chỉ IPv6",
			cidrv4: "dải IPv4",
			cidrv6: "dải IPv6",
			base64: "chuỗi mã hóa base64",
			base64url: "chuỗi mã hóa base64url",
			json_string: "chuỗi JSON",
			e164: "số E.164",
			jwt: "JWT",
			template_literal: "đầu vào"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "số",
			array: "mảng"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Đầu vào không hợp lệ: mong đợi instanceof ${issue.expected}, nhận được ${received}`;
					return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Đầu vào không hợp lệ: mong đợi ${util.stringifyPrimitive(issue.values[0])}`;
					return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
					return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
					if (_issue.format === "regex") return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
					return `${FormatDictionary[_issue.format] ?? issue.format} không hợp lệ`;
				}
				case "not_multiple_of": return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
				case "unrecognized_keys": return `Khóa không được nhận dạng: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Khóa không hợp lệ trong ${issue.origin}`;
				case "invalid_union": return "Đầu vào không hợp lệ";
				case "invalid_element": return `Giá trị không hợp lệ trong ${issue.origin}`;
				default: return `Đầu vào không hợp lệ`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/zh-CN.cjs
var require_zh_CN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "字符",
				verb: "包含"
			},
			file: {
				unit: "字节",
				verb: "包含"
			},
			array: {
				unit: "项",
				verb: "包含"
			},
			set: {
				unit: "项",
				verb: "包含"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "输入",
			email: "电子邮件",
			url: "URL",
			emoji: "表情符号",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO日期时间",
			date: "ISO日期",
			time: "ISO时间",
			duration: "ISO时长",
			ipv4: "IPv4地址",
			ipv6: "IPv6地址",
			cidrv4: "IPv4网段",
			cidrv6: "IPv6网段",
			base64: "base64编码字符串",
			base64url: "base64url编码字符串",
			json_string: "JSON字符串",
			e164: "E.164号码",
			jwt: "JWT",
			template_literal: "输入"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "数字",
			array: "数组",
			null: "空值(null)"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `无效输入：期望 instanceof ${issue.expected}，实际接收 ${received}`;
					return `无效输入：期望 ${expected}，实际接收 ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `无效输入：期望 ${util.stringifyPrimitive(issue.values[0])}`;
					return `无效选项：期望以下之一 ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
					return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `无效字符串：必须以 "${_issue.prefix}" 开头`;
					if (_issue.format === "ends_with") return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
					if (_issue.format === "includes") return `无效字符串：必须包含 "${_issue.includes}"`;
					if (_issue.format === "regex") return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
					return `无效${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `无效数字：必须是 ${issue.divisor} 的倍数`;
				case "unrecognized_keys": return `出现未知的键(key): ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `${issue.origin} 中的键(key)无效`;
				case "invalid_union": return "无效输入";
				case "invalid_element": return `${issue.origin} 中包含无效值(value)`;
				default: return `无效输入`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/zh-TW.cjs
var require_zh_TW = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "字元",
				verb: "擁有"
			},
			file: {
				unit: "位元組",
				verb: "擁有"
			},
			array: {
				unit: "項目",
				verb: "擁有"
			},
			set: {
				unit: "項目",
				verb: "擁有"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "輸入",
			email: "郵件地址",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO 日期時間",
			date: "ISO 日期",
			time: "ISO 時間",
			duration: "ISO 期間",
			ipv4: "IPv4 位址",
			ipv6: "IPv6 位址",
			cidrv4: "IPv4 範圍",
			cidrv6: "IPv6 範圍",
			base64: "base64 編碼字串",
			base64url: "base64url 編碼字串",
			json_string: "JSON 字串",
			e164: "E.164 數值",
			jwt: "JWT",
			template_literal: "輸入"
		};
		const TypeDictionary = { nan: "NaN" };
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `無效的輸入值：預期為 instanceof ${issue.expected}，但收到 ${received}`;
					return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `無效的輸入值：預期為 ${util.stringifyPrimitive(issue.values[0])}`;
					return `無效的選項：預期為以下其中之一 ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
					return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
					return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
					if (_issue.format === "ends_with") return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
					if (_issue.format === "includes") return `無效的字串：必須包含 "${_issue.includes}"`;
					if (_issue.format === "regex") return `無效的字串：必須符合格式 ${_issue.pattern}`;
					return `無效的 ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `無效的數字：必須為 ${issue.divisor} 的倍數`;
				case "unrecognized_keys": return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${util.joinValues(issue.keys, "、")}`;
				case "invalid_key": return `${issue.origin} 中有無效的鍵值`;
				case "invalid_union": return "無效的輸入值";
				case "invalid_element": return `${issue.origin} 中有無效的值`;
				default: return `無效的輸入值`;
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/yo.cjs
var require_yo = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var util = __importStar(require_util());
	var error = () => {
		const Sizable = {
			string: {
				unit: "àmi",
				verb: "ní"
			},
			file: {
				unit: "bytes",
				verb: "ní"
			},
			array: {
				unit: "nkan",
				verb: "ní"
			},
			set: {
				unit: "nkan",
				verb: "ní"
			}
		};
		function getSizing(origin) {
			return Sizable[origin] ?? null;
		}
		const FormatDictionary = {
			regex: "ẹ̀rọ ìbáwọlé",
			email: "àdírẹ́sì ìmẹ́lì",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "àkókò ISO",
			date: "ọjọ́ ISO",
			time: "àkókò ISO",
			duration: "àkókò tó pé ISO",
			ipv4: "àdírẹ́sì IPv4",
			ipv6: "àdírẹ́sì IPv6",
			cidrv4: "àgbègbè IPv4",
			cidrv6: "àgbègbè IPv6",
			base64: "ọ̀rọ̀ tí a kọ́ ní base64",
			base64url: "ọ̀rọ̀ base64url",
			json_string: "ọ̀rọ̀ JSON",
			e164: "nọ́mbà E.164",
			jwt: "JWT",
			template_literal: "ẹ̀rọ ìbáwọlé"
		};
		const TypeDictionary = {
			nan: "NaN",
			number: "nọ́mbà",
			array: "akopọ"
		};
		return (issue) => {
			switch (issue.code) {
				case "invalid_type": {
					const expected = TypeDictionary[issue.expected] ?? issue.expected;
					const receivedType = util.parsedType(issue.input);
					const received = TypeDictionary[receivedType] ?? receivedType;
					if (/^[A-Z]/.test(issue.expected)) return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue.expected}, àmọ̀ a rí ${received}`;
					return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
				}
				case "invalid_value":
					if (issue.values.length === 1) return `Ìbáwọlé aṣìṣe: a ní láti fi ${util.stringifyPrimitive(issue.values[0])}`;
					return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${util.joinValues(issue.values, "|")}`;
				case "too_big": {
					const adj = issue.inclusive ? "<=" : "<";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
					return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
				}
				case "too_small": {
					const adj = issue.inclusive ? ">=" : ">";
					const sizing = getSizing(issue.origin);
					if (sizing) return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
					return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
				}
				case "invalid_format": {
					const _issue = issue;
					if (_issue.format === "starts_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
					if (_issue.format === "ends_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
					if (_issue.format === "includes") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
					if (_issue.format === "regex") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
					return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue.format}`;
				}
				case "not_multiple_of": return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
				case "unrecognized_keys": return `Bọtìnì àìmọ̀: ${util.joinValues(issue.keys, ", ")}`;
				case "invalid_key": return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
				case "invalid_union": return "Ìbáwọlé aṣìṣe";
				case "invalid_element": return `Iye aṣìṣe nínú ${issue.origin}`;
				default: return "Ìbáwọlé aṣìṣe";
			}
		};
	};
	function default_1() {
		return { localeError: error() };
	}
	module.exports = exports.default;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/locales/index.cjs
var require_locales = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.zhCN = exports.vi = exports.uz = exports.ur = exports.uk = exports.ua = exports.tr = exports.th = exports.ta = exports.sv = exports.sl = exports.ru = exports.ro = exports.pt = exports.pl = exports.ps = exports.ota = exports.no = exports.nl = exports.ms = exports.mk = exports.lt = exports.ko = exports.km = exports.kh = exports.ka = exports.ja = exports.it = exports.is = exports.id = exports.hy = exports.hu = exports.hr = exports.he = exports.frCA = exports.fr = exports.fi = exports.fa = exports.es = exports.eo = exports.en = exports.el = exports.de = exports.da = exports.cs = exports.ca = exports.bg = exports.be = exports.az = exports.ar = void 0;
	exports.yo = exports.zhTW = void 0;
	var ar_js_1 = require_ar();
	Object.defineProperty(exports, "ar", {
		enumerable: true,
		get: function() {
			return __importDefault(ar_js_1).default;
		}
	});
	var az_js_1 = require_az();
	Object.defineProperty(exports, "az", {
		enumerable: true,
		get: function() {
			return __importDefault(az_js_1).default;
		}
	});
	var be_js_1 = require_be();
	Object.defineProperty(exports, "be", {
		enumerable: true,
		get: function() {
			return __importDefault(be_js_1).default;
		}
	});
	var bg_js_1 = require_bg();
	Object.defineProperty(exports, "bg", {
		enumerable: true,
		get: function() {
			return __importDefault(bg_js_1).default;
		}
	});
	var ca_js_1 = require_ca();
	Object.defineProperty(exports, "ca", {
		enumerable: true,
		get: function() {
			return __importDefault(ca_js_1).default;
		}
	});
	var cs_js_1 = require_cs();
	Object.defineProperty(exports, "cs", {
		enumerable: true,
		get: function() {
			return __importDefault(cs_js_1).default;
		}
	});
	var da_js_1 = require_da();
	Object.defineProperty(exports, "da", {
		enumerable: true,
		get: function() {
			return __importDefault(da_js_1).default;
		}
	});
	var de_js_1 = require_de();
	Object.defineProperty(exports, "de", {
		enumerable: true,
		get: function() {
			return __importDefault(de_js_1).default;
		}
	});
	var el_js_1 = require_el();
	Object.defineProperty(exports, "el", {
		enumerable: true,
		get: function() {
			return __importDefault(el_js_1).default;
		}
	});
	var en_js_1 = require_en();
	Object.defineProperty(exports, "en", {
		enumerable: true,
		get: function() {
			return __importDefault(en_js_1).default;
		}
	});
	var eo_js_1 = require_eo();
	Object.defineProperty(exports, "eo", {
		enumerable: true,
		get: function() {
			return __importDefault(eo_js_1).default;
		}
	});
	var es_js_1 = require_es();
	Object.defineProperty(exports, "es", {
		enumerable: true,
		get: function() {
			return __importDefault(es_js_1).default;
		}
	});
	var fa_js_1 = require_fa();
	Object.defineProperty(exports, "fa", {
		enumerable: true,
		get: function() {
			return __importDefault(fa_js_1).default;
		}
	});
	var fi_js_1 = require_fi();
	Object.defineProperty(exports, "fi", {
		enumerable: true,
		get: function() {
			return __importDefault(fi_js_1).default;
		}
	});
	var fr_js_1 = require_fr();
	Object.defineProperty(exports, "fr", {
		enumerable: true,
		get: function() {
			return __importDefault(fr_js_1).default;
		}
	});
	var fr_CA_js_1 = require_fr_CA();
	Object.defineProperty(exports, "frCA", {
		enumerable: true,
		get: function() {
			return __importDefault(fr_CA_js_1).default;
		}
	});
	var he_js_1 = require_he();
	Object.defineProperty(exports, "he", {
		enumerable: true,
		get: function() {
			return __importDefault(he_js_1).default;
		}
	});
	var hr_js_1 = require_hr();
	Object.defineProperty(exports, "hr", {
		enumerable: true,
		get: function() {
			return __importDefault(hr_js_1).default;
		}
	});
	var hu_js_1 = require_hu();
	Object.defineProperty(exports, "hu", {
		enumerable: true,
		get: function() {
			return __importDefault(hu_js_1).default;
		}
	});
	var hy_js_1 = require_hy();
	Object.defineProperty(exports, "hy", {
		enumerable: true,
		get: function() {
			return __importDefault(hy_js_1).default;
		}
	});
	var id_js_1 = require_id();
	Object.defineProperty(exports, "id", {
		enumerable: true,
		get: function() {
			return __importDefault(id_js_1).default;
		}
	});
	var is_js_1 = require_is();
	Object.defineProperty(exports, "is", {
		enumerable: true,
		get: function() {
			return __importDefault(is_js_1).default;
		}
	});
	var it_js_1 = require_it();
	Object.defineProperty(exports, "it", {
		enumerable: true,
		get: function() {
			return __importDefault(it_js_1).default;
		}
	});
	var ja_js_1 = require_ja();
	Object.defineProperty(exports, "ja", {
		enumerable: true,
		get: function() {
			return __importDefault(ja_js_1).default;
		}
	});
	var ka_js_1 = require_ka();
	Object.defineProperty(exports, "ka", {
		enumerable: true,
		get: function() {
			return __importDefault(ka_js_1).default;
		}
	});
	var kh_js_1 = require_kh();
	Object.defineProperty(exports, "kh", {
		enumerable: true,
		get: function() {
			return __importDefault(kh_js_1).default;
		}
	});
	var km_js_1 = require_km();
	Object.defineProperty(exports, "km", {
		enumerable: true,
		get: function() {
			return __importDefault(km_js_1).default;
		}
	});
	var ko_js_1 = require_ko();
	Object.defineProperty(exports, "ko", {
		enumerable: true,
		get: function() {
			return __importDefault(ko_js_1).default;
		}
	});
	var lt_js_1 = require_lt();
	Object.defineProperty(exports, "lt", {
		enumerable: true,
		get: function() {
			return __importDefault(lt_js_1).default;
		}
	});
	var mk_js_1 = require_mk();
	Object.defineProperty(exports, "mk", {
		enumerable: true,
		get: function() {
			return __importDefault(mk_js_1).default;
		}
	});
	var ms_js_1 = require_ms();
	Object.defineProperty(exports, "ms", {
		enumerable: true,
		get: function() {
			return __importDefault(ms_js_1).default;
		}
	});
	var nl_js_1 = require_nl();
	Object.defineProperty(exports, "nl", {
		enumerable: true,
		get: function() {
			return __importDefault(nl_js_1).default;
		}
	});
	var no_js_1 = require_no();
	Object.defineProperty(exports, "no", {
		enumerable: true,
		get: function() {
			return __importDefault(no_js_1).default;
		}
	});
	var ota_js_1 = require_ota();
	Object.defineProperty(exports, "ota", {
		enumerable: true,
		get: function() {
			return __importDefault(ota_js_1).default;
		}
	});
	var ps_js_1 = require_ps();
	Object.defineProperty(exports, "ps", {
		enumerable: true,
		get: function() {
			return __importDefault(ps_js_1).default;
		}
	});
	var pl_js_1 = require_pl();
	Object.defineProperty(exports, "pl", {
		enumerable: true,
		get: function() {
			return __importDefault(pl_js_1).default;
		}
	});
	var pt_js_1 = require_pt();
	Object.defineProperty(exports, "pt", {
		enumerable: true,
		get: function() {
			return __importDefault(pt_js_1).default;
		}
	});
	var ro_js_1 = require_ro();
	Object.defineProperty(exports, "ro", {
		enumerable: true,
		get: function() {
			return __importDefault(ro_js_1).default;
		}
	});
	var ru_js_1 = require_ru();
	Object.defineProperty(exports, "ru", {
		enumerable: true,
		get: function() {
			return __importDefault(ru_js_1).default;
		}
	});
	var sl_js_1 = require_sl();
	Object.defineProperty(exports, "sl", {
		enumerable: true,
		get: function() {
			return __importDefault(sl_js_1).default;
		}
	});
	var sv_js_1 = require_sv();
	Object.defineProperty(exports, "sv", {
		enumerable: true,
		get: function() {
			return __importDefault(sv_js_1).default;
		}
	});
	var ta_js_1 = require_ta();
	Object.defineProperty(exports, "ta", {
		enumerable: true,
		get: function() {
			return __importDefault(ta_js_1).default;
		}
	});
	var th_js_1 = require_th();
	Object.defineProperty(exports, "th", {
		enumerable: true,
		get: function() {
			return __importDefault(th_js_1).default;
		}
	});
	var tr_js_1 = require_tr();
	Object.defineProperty(exports, "tr", {
		enumerable: true,
		get: function() {
			return __importDefault(tr_js_1).default;
		}
	});
	var ua_js_1 = require_ua();
	Object.defineProperty(exports, "ua", {
		enumerable: true,
		get: function() {
			return __importDefault(ua_js_1).default;
		}
	});
	var uk_js_1 = require_uk();
	Object.defineProperty(exports, "uk", {
		enumerable: true,
		get: function() {
			return __importDefault(uk_js_1).default;
		}
	});
	var ur_js_1 = require_ur();
	Object.defineProperty(exports, "ur", {
		enumerable: true,
		get: function() {
			return __importDefault(ur_js_1).default;
		}
	});
	var uz_js_1 = require_uz();
	Object.defineProperty(exports, "uz", {
		enumerable: true,
		get: function() {
			return __importDefault(uz_js_1).default;
		}
	});
	var vi_js_1 = require_vi();
	Object.defineProperty(exports, "vi", {
		enumerable: true,
		get: function() {
			return __importDefault(vi_js_1).default;
		}
	});
	var zh_CN_js_1 = require_zh_CN();
	Object.defineProperty(exports, "zhCN", {
		enumerable: true,
		get: function() {
			return __importDefault(zh_CN_js_1).default;
		}
	});
	var zh_TW_js_1 = require_zh_TW();
	Object.defineProperty(exports, "zhTW", {
		enumerable: true,
		get: function() {
			return __importDefault(zh_TW_js_1).default;
		}
	});
	var yo_js_1 = require_yo();
	Object.defineProperty(exports, "yo", {
		enumerable: true,
		get: function() {
			return __importDefault(yo_js_1).default;
		}
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/registries.cjs
var require_registries = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.globalRegistry = exports.$ZodRegistry = exports.$input = exports.$output = void 0;
	exports.registry = registry;
	exports.$output = Symbol("ZodOutput");
	exports.$input = Symbol("ZodInput");
	var $ZodRegistry = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
		}
		add(schema, ..._meta) {
			const meta = _meta[0];
			this._map.set(schema, meta);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
			return this;
		}
		clear() {
			this._map = /* @__PURE__ */ new WeakMap();
			this._idmap = /* @__PURE__ */ new Map();
			return this;
		}
		remove(schema) {
			const meta = this._map.get(schema);
			if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
			this._map.delete(schema);
			return this;
		}
		get(schema) {
			const p = schema._zod.parent;
			if (p) {
				const pm = { ...this.get(p) ?? {} };
				delete pm.id;
				const f = {
					...pm,
					...this._map.get(schema)
				};
				return Object.keys(f).length ? f : void 0;
			}
			return this._map.get(schema);
		}
		has(schema) {
			return this._map.has(schema);
		}
	};
	exports.$ZodRegistry = $ZodRegistry;
	function registry() {
		return new $ZodRegistry();
	}
	(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
	exports.globalRegistry = globalThis.__zod_globalRegistry;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/api.cjs
var require_api = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TimePrecision = void 0;
	exports._string = _string;
	exports._coercedString = _coercedString;
	exports._email = _email;
	exports._guid = _guid;
	exports._uuid = _uuid;
	exports._uuidv4 = _uuidv4;
	exports._uuidv6 = _uuidv6;
	exports._uuidv7 = _uuidv7;
	exports._url = _url;
	exports._emoji = _emoji;
	exports._nanoid = _nanoid;
	exports._cuid = _cuid;
	exports._cuid2 = _cuid2;
	exports._ulid = _ulid;
	exports._xid = _xid;
	exports._ksuid = _ksuid;
	exports._ipv4 = _ipv4;
	exports._ipv6 = _ipv6;
	exports._mac = _mac;
	exports._cidrv4 = _cidrv4;
	exports._cidrv6 = _cidrv6;
	exports._base64 = _base64;
	exports._base64url = _base64url;
	exports._e164 = _e164;
	exports._jwt = _jwt;
	exports._isoDateTime = _isoDateTime;
	exports._isoDate = _isoDate;
	exports._isoTime = _isoTime;
	exports._isoDuration = _isoDuration;
	exports._number = _number;
	exports._coercedNumber = _coercedNumber;
	exports._int = _int;
	exports._float32 = _float32;
	exports._float64 = _float64;
	exports._int32 = _int32;
	exports._uint32 = _uint32;
	exports._boolean = _boolean;
	exports._coercedBoolean = _coercedBoolean;
	exports._bigint = _bigint;
	exports._coercedBigint = _coercedBigint;
	exports._int64 = _int64;
	exports._uint64 = _uint64;
	exports._symbol = _symbol;
	exports._undefined = _undefined;
	exports._null = _null;
	exports._any = _any;
	exports._unknown = _unknown;
	exports._never = _never;
	exports._void = _void;
	exports._date = _date;
	exports._coercedDate = _coercedDate;
	exports._nan = _nan;
	exports._lt = _lt;
	exports._lte = _lte;
	exports._max = _lte;
	exports._lte = _lte;
	exports._max = _lte;
	exports._gt = _gt;
	exports._gte = _gte;
	exports._min = _gte;
	exports._gte = _gte;
	exports._min = _gte;
	exports._positive = _positive;
	exports._negative = _negative;
	exports._nonpositive = _nonpositive;
	exports._nonnegative = _nonnegative;
	exports._multipleOf = _multipleOf;
	exports._maxSize = _maxSize;
	exports._minSize = _minSize;
	exports._size = _size;
	exports._maxLength = _maxLength;
	exports._minLength = _minLength;
	exports._length = _length;
	exports._regex = _regex;
	exports._lowercase = _lowercase;
	exports._uppercase = _uppercase;
	exports._includes = _includes;
	exports._startsWith = _startsWith;
	exports._endsWith = _endsWith;
	exports._property = _property;
	exports._mime = _mime;
	exports._overwrite = _overwrite;
	exports._normalize = _normalize;
	exports._trim = _trim;
	exports._toLowerCase = _toLowerCase;
	exports._toUpperCase = _toUpperCase;
	exports._slugify = _slugify;
	exports._array = _array;
	exports._union = _union;
	exports._xor = _xor;
	exports._discriminatedUnion = _discriminatedUnion;
	exports._intersection = _intersection;
	exports._tuple = _tuple;
	exports._record = _record;
	exports._map = _map;
	exports._set = _set;
	exports._enum = _enum;
	exports._nativeEnum = _nativeEnum;
	exports._literal = _literal;
	exports._file = _file;
	exports._transform = _transform;
	exports._optional = _optional;
	exports._nullable = _nullable;
	exports._default = _default;
	exports._nonoptional = _nonoptional;
	exports._success = _success;
	exports._catch = _catch;
	exports._pipe = _pipe;
	exports._readonly = _readonly;
	exports._templateLiteral = _templateLiteral;
	exports._lazy = _lazy;
	exports._promise = _promise;
	exports._custom = _custom;
	exports._refine = _refine;
	exports._superRefine = _superRefine;
	exports._check = _check;
	exports.describe = describe;
	exports.meta = meta;
	exports._stringbool = _stringbool;
	exports._stringFormat = _stringFormat;
	var checks = __importStar(require_checks$1());
	var registries = __importStar(require_registries());
	var schemas = __importStar(require_schemas$1());
	var util = __importStar(require_util());
	// @__NO_SIDE_EFFECTS__
	function _string(Class, params) {
		return new Class({
			type: "string",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _coercedString(Class, params) {
		return new Class({
			type: "string",
			coerce: true,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _email(Class, params) {
		return new Class({
			type: "string",
			format: "email",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _guid(Class, params) {
		return new Class({
			type: "string",
			format: "guid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uuid(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uuidv4(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v4",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uuidv6(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v6",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uuidv7(Class, params) {
		return new Class({
			type: "string",
			format: "uuid",
			check: "string_format",
			abort: false,
			version: "v7",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _url(Class, params) {
		return new Class({
			type: "string",
			format: "url",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _emoji(Class, params) {
		return new Class({
			type: "string",
			format: "emoji",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _nanoid(Class, params) {
		return new Class({
			type: "string",
			format: "nanoid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	/**
	* @deprecated CUID v1 is deprecated by its authors due to information leakage
	* (timestamps embedded in the id). Use {@link _cuid2} instead.
	* See https://github.com/paralleldrive/cuid.
	*/
	// @__NO_SIDE_EFFECTS__
	function _cuid(Class, params) {
		return new Class({
			type: "string",
			format: "cuid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _cuid2(Class, params) {
		return new Class({
			type: "string",
			format: "cuid2",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _ulid(Class, params) {
		return new Class({
			type: "string",
			format: "ulid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _xid(Class, params) {
		return new Class({
			type: "string",
			format: "xid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _ksuid(Class, params) {
		return new Class({
			type: "string",
			format: "ksuid",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _ipv4(Class, params) {
		return new Class({
			type: "string",
			format: "ipv4",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _ipv6(Class, params) {
		return new Class({
			type: "string",
			format: "ipv6",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _mac(Class, params) {
		return new Class({
			type: "string",
			format: "mac",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _cidrv4(Class, params) {
		return new Class({
			type: "string",
			format: "cidrv4",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _cidrv6(Class, params) {
		return new Class({
			type: "string",
			format: "cidrv6",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _base64(Class, params) {
		return new Class({
			type: "string",
			format: "base64",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _base64url(Class, params) {
		return new Class({
			type: "string",
			format: "base64url",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _e164(Class, params) {
		return new Class({
			type: "string",
			format: "e164",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _jwt(Class, params) {
		return new Class({
			type: "string",
			format: "jwt",
			check: "string_format",
			abort: false,
			...util.normalizeParams(params)
		});
	}
	exports.TimePrecision = {
		Any: null,
		Minute: -1,
		Second: 0,
		Millisecond: 3,
		Microsecond: 6
	};
	// @__NO_SIDE_EFFECTS__
	function _isoDateTime(Class, params) {
		return new Class({
			type: "string",
			format: "datetime",
			check: "string_format",
			offset: false,
			local: false,
			precision: null,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _isoDate(Class, params) {
		return new Class({
			type: "string",
			format: "date",
			check: "string_format",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _isoTime(Class, params) {
		return new Class({
			type: "string",
			format: "time",
			check: "string_format",
			precision: null,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _isoDuration(Class, params) {
		return new Class({
			type: "string",
			format: "duration",
			check: "string_format",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _number(Class, params) {
		return new Class({
			type: "number",
			checks: [],
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _coercedNumber(Class, params) {
		return new Class({
			type: "number",
			coerce: true,
			checks: [],
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _int(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "safeint",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _float32(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "float32",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _float64(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "float64",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _int32(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "int32",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uint32(Class, params) {
		return new Class({
			type: "number",
			check: "number_format",
			abort: false,
			format: "uint32",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _boolean(Class, params) {
		return new Class({
			type: "boolean",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _coercedBoolean(Class, params) {
		return new Class({
			type: "boolean",
			coerce: true,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _bigint(Class, params) {
		return new Class({
			type: "bigint",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _coercedBigint(Class, params) {
		return new Class({
			type: "bigint",
			coerce: true,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _int64(Class, params) {
		return new Class({
			type: "bigint",
			check: "bigint_format",
			abort: false,
			format: "int64",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uint64(Class, params) {
		return new Class({
			type: "bigint",
			check: "bigint_format",
			abort: false,
			format: "uint64",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _symbol(Class, params) {
		return new Class({
			type: "symbol",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _undefined(Class, params) {
		return new Class({
			type: "undefined",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _null(Class, params) {
		return new Class({
			type: "null",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _any(Class) {
		return new Class({ type: "any" });
	}
	// @__NO_SIDE_EFFECTS__
	function _unknown(Class) {
		return new Class({ type: "unknown" });
	}
	// @__NO_SIDE_EFFECTS__
	function _never(Class, params) {
		return new Class({
			type: "never",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _void(Class, params) {
		return new Class({
			type: "void",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _date(Class, params) {
		return new Class({
			type: "date",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _coercedDate(Class, params) {
		return new Class({
			type: "date",
			coerce: true,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _nan(Class, params) {
		return new Class({
			type: "nan",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _lt(value, params) {
		return new checks.$ZodCheckLessThan({
			check: "less_than",
			...util.normalizeParams(params),
			value,
			inclusive: false
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _lte(value, params) {
		return new checks.$ZodCheckLessThan({
			check: "less_than",
			...util.normalizeParams(params),
			value,
			inclusive: true
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _gt(value, params) {
		return new checks.$ZodCheckGreaterThan({
			check: "greater_than",
			...util.normalizeParams(params),
			value,
			inclusive: false
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _gte(value, params) {
		return new checks.$ZodCheckGreaterThan({
			check: "greater_than",
			...util.normalizeParams(params),
			value,
			inclusive: true
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _positive(params) {
		return /* @__PURE__ */ _gt(0, params);
	}
	// @__NO_SIDE_EFFECTS__
	function _negative(params) {
		return /* @__PURE__ */ _lt(0, params);
	}
	// @__NO_SIDE_EFFECTS__
	function _nonpositive(params) {
		return /* @__PURE__ */ _lte(0, params);
	}
	// @__NO_SIDE_EFFECTS__
	function _nonnegative(params) {
		return /* @__PURE__ */ _gte(0, params);
	}
	// @__NO_SIDE_EFFECTS__
	function _multipleOf(value, params) {
		return new checks.$ZodCheckMultipleOf({
			check: "multiple_of",
			...util.normalizeParams(params),
			value
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _maxSize(maximum, params) {
		return new checks.$ZodCheckMaxSize({
			check: "max_size",
			...util.normalizeParams(params),
			maximum
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _minSize(minimum, params) {
		return new checks.$ZodCheckMinSize({
			check: "min_size",
			...util.normalizeParams(params),
			minimum
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _size(size, params) {
		return new checks.$ZodCheckSizeEquals({
			check: "size_equals",
			...util.normalizeParams(params),
			size
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _maxLength(maximum, params) {
		return new checks.$ZodCheckMaxLength({
			check: "max_length",
			...util.normalizeParams(params),
			maximum
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _minLength(minimum, params) {
		return new checks.$ZodCheckMinLength({
			check: "min_length",
			...util.normalizeParams(params),
			minimum
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _length(length, params) {
		return new checks.$ZodCheckLengthEquals({
			check: "length_equals",
			...util.normalizeParams(params),
			length
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _regex(pattern, params) {
		return new checks.$ZodCheckRegex({
			check: "string_format",
			format: "regex",
			...util.normalizeParams(params),
			pattern
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _lowercase(params) {
		return new checks.$ZodCheckLowerCase({
			check: "string_format",
			format: "lowercase",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _uppercase(params) {
		return new checks.$ZodCheckUpperCase({
			check: "string_format",
			format: "uppercase",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _includes(includes, params) {
		return new checks.$ZodCheckIncludes({
			check: "string_format",
			format: "includes",
			...util.normalizeParams(params),
			includes
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _startsWith(prefix, params) {
		return new checks.$ZodCheckStartsWith({
			check: "string_format",
			format: "starts_with",
			...util.normalizeParams(params),
			prefix
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _endsWith(suffix, params) {
		return new checks.$ZodCheckEndsWith({
			check: "string_format",
			format: "ends_with",
			...util.normalizeParams(params),
			suffix
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _property(property, schema, params) {
		return new checks.$ZodCheckProperty({
			check: "property",
			property,
			schema,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _mime(types, params) {
		return new checks.$ZodCheckMimeType({
			check: "mime_type",
			mime: types,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _overwrite(tx) {
		return new checks.$ZodCheckOverwrite({
			check: "overwrite",
			tx
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _normalize(form) {
		return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
	}
	// @__NO_SIDE_EFFECTS__
	function _trim() {
		return /* @__PURE__ */ _overwrite((input) => input.trim());
	}
	// @__NO_SIDE_EFFECTS__
	function _toLowerCase() {
		return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
	}
	// @__NO_SIDE_EFFECTS__
	function _toUpperCase() {
		return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
	}
	// @__NO_SIDE_EFFECTS__
	function _slugify() {
		return /* @__PURE__ */ _overwrite((input) => util.slugify(input));
	}
	// @__NO_SIDE_EFFECTS__
	function _array(Class, element, params) {
		return new Class({
			type: "array",
			element,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _union(Class, options, params) {
		return new Class({
			type: "union",
			options,
			...util.normalizeParams(params)
		});
	}
	function _xor(Class, options, params) {
		return new Class({
			type: "union",
			options,
			inclusive: false,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _discriminatedUnion(Class, discriminator, options, params) {
		return new Class({
			type: "union",
			options,
			discriminator,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _intersection(Class, left, right) {
		return new Class({
			type: "intersection",
			left,
			right
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _tuple(Class, items, _paramsOrRest, _params) {
		const hasRest = _paramsOrRest instanceof schemas.$ZodType;
		const params = hasRest ? _params : _paramsOrRest;
		return new Class({
			type: "tuple",
			items,
			rest: hasRest ? _paramsOrRest : null,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _record(Class, keyType, valueType, params) {
		return new Class({
			type: "record",
			keyType,
			valueType,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _map(Class, keyType, valueType, params) {
		return new Class({
			type: "map",
			keyType,
			valueType,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _set(Class, valueType, params) {
		return new Class({
			type: "set",
			valueType,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _enum(Class, values, params) {
		return new Class({
			type: "enum",
			entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
			...util.normalizeParams(params)
		});
	}
	/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
	*
	* ```ts
	* enum Colors { red, green, blue }
	* z.enum(Colors);
	* ```
	*/
	// @__NO_SIDE_EFFECTS__
	function _nativeEnum(Class, entries, params) {
		return new Class({
			type: "enum",
			entries,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _literal(Class, value, params) {
		return new Class({
			type: "literal",
			values: Array.isArray(value) ? value : [value],
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _file(Class, params) {
		return new Class({
			type: "file",
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _transform(Class, fn) {
		return new Class({
			type: "transform",
			transform: fn
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _optional(Class, innerType) {
		return new Class({
			type: "optional",
			innerType
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _nullable(Class, innerType) {
		return new Class({
			type: "nullable",
			innerType
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _default(Class, innerType, defaultValue) {
		return new Class({
			type: "default",
			innerType,
			get defaultValue() {
				return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
			}
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _nonoptional(Class, innerType, params) {
		return new Class({
			type: "nonoptional",
			innerType,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _success(Class, innerType) {
		return new Class({
			type: "success",
			innerType
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _catch(Class, innerType, catchValue) {
		return new Class({
			type: "catch",
			innerType,
			catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _pipe(Class, in_, out) {
		return new Class({
			type: "pipe",
			in: in_,
			out
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _readonly(Class, innerType) {
		return new Class({
			type: "readonly",
			innerType
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _templateLiteral(Class, parts, params) {
		return new Class({
			type: "template_literal",
			parts,
			...util.normalizeParams(params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _lazy(Class, getter) {
		return new Class({
			type: "lazy",
			getter
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _promise(Class, innerType) {
		return new Class({
			type: "promise",
			innerType
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _custom(Class, fn, _params) {
		const norm = util.normalizeParams(_params);
		norm.abort ?? (norm.abort = true);
		return new Class({
			type: "custom",
			check: "custom",
			fn,
			...norm
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _refine(Class, fn, _params) {
		return new Class({
			type: "custom",
			check: "custom",
			fn,
			...util.normalizeParams(_params)
		});
	}
	// @__NO_SIDE_EFFECTS__
	function _superRefine(fn, params) {
		const ch = /* @__PURE__ */ _check((payload) => {
			payload.addIssue = (issue) => {
				if (typeof issue === "string") payload.issues.push(util.issue(issue, payload.value, ch._zod.def));
				else {
					const _issue = issue;
					if (_issue.fatal) _issue.continue = false;
					_issue.code ?? (_issue.code = "custom");
					_issue.input ?? (_issue.input = payload.value);
					_issue.inst ?? (_issue.inst = ch);
					_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
					payload.issues.push(util.issue(_issue));
				}
			};
			return fn(payload.value, payload);
		}, params);
		return ch;
	}
	// @__NO_SIDE_EFFECTS__
	function _check(fn, params) {
		const ch = new checks.$ZodCheck({
			check: "custom",
			...util.normalizeParams(params)
		});
		ch._zod.check = fn;
		return ch;
	}
	// @__NO_SIDE_EFFECTS__
	function describe(description) {
		const ch = new checks.$ZodCheck({ check: "describe" });
		ch._zod.onattach = [(inst) => {
			const existing = registries.globalRegistry.get(inst) ?? {};
			registries.globalRegistry.add(inst, {
				...existing,
				description
			});
		}];
		ch._zod.check = () => {};
		return ch;
	}
	// @__NO_SIDE_EFFECTS__
	function meta(metadata) {
		const ch = new checks.$ZodCheck({ check: "meta" });
		ch._zod.onattach = [(inst) => {
			const existing = registries.globalRegistry.get(inst) ?? {};
			registries.globalRegistry.add(inst, {
				...existing,
				...metadata
			});
		}];
		ch._zod.check = () => {};
		return ch;
	}
	// @__NO_SIDE_EFFECTS__
	function _stringbool(Classes, _params) {
		const params = util.normalizeParams(_params);
		let truthyArray = params.truthy ?? [
			"true",
			"1",
			"yes",
			"on",
			"y",
			"enabled"
		];
		let falsyArray = params.falsy ?? [
			"false",
			"0",
			"no",
			"off",
			"n",
			"disabled"
		];
		if (params.case !== "sensitive") {
			truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
			falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
		}
		const truthySet = new Set(truthyArray);
		const falsySet = new Set(falsyArray);
		const _Codec = Classes.Codec ?? schemas.$ZodCodec;
		const _Boolean = Classes.Boolean ?? schemas.$ZodBoolean;
		const codec = new _Codec({
			type: "pipe",
			in: new (Classes.String ?? schemas.$ZodString)({
				type: "string",
				error: params.error
			}),
			out: new _Boolean({
				type: "boolean",
				error: params.error
			}),
			transform: ((input, payload) => {
				let data = input;
				if (params.case !== "sensitive") data = data.toLowerCase();
				if (truthySet.has(data)) return true;
				else if (falsySet.has(data)) return false;
				else {
					payload.issues.push({
						code: "invalid_value",
						expected: "stringbool",
						values: [...truthySet, ...falsySet],
						input: payload.value,
						inst: codec,
						continue: false
					});
					return {};
				}
			}),
			reverseTransform: ((input, _payload) => {
				if (input === true) return truthyArray[0] || "true";
				else return falsyArray[0] || "false";
			}),
			error: params.error
		});
		return codec;
	}
	// @__NO_SIDE_EFFECTS__
	function _stringFormat(Class, format, fnOrRegex, _params = {}) {
		const params = util.normalizeParams(_params);
		const def = {
			...util.normalizeParams(_params),
			check: "string_format",
			type: "string",
			format,
			fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
			...params
		};
		if (fnOrRegex instanceof RegExp) def.pattern = fnOrRegex;
		return new Class(def);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/to-json-schema.cjs
var require_to_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createStandardJSONSchemaMethod = exports.createToJSONSchemaMethod = void 0;
	exports.initializeContext = initializeContext;
	exports.process = process;
	exports.extractDefs = extractDefs;
	exports.finalize = finalize;
	var registries_js_1 = require_registries();
	function initializeContext(params) {
		let target = params?.target ?? "draft-2020-12";
		if (target === "draft-4") target = "draft-04";
		if (target === "draft-7") target = "draft-07";
		return {
			processors: params.processors ?? {},
			metadataRegistry: params?.metadata ?? registries_js_1.globalRegistry,
			target,
			unrepresentable: params?.unrepresentable ?? "throw",
			override: params?.override ?? (() => {}),
			io: params?.io ?? "output",
			counter: 0,
			seen: /* @__PURE__ */ new Map(),
			cycles: params?.cycles ?? "ref",
			reused: params?.reused ?? "inline",
			external: params?.external ?? void 0
		};
	}
	function process(schema, ctx, _params = {
		path: [],
		schemaPath: []
	}) {
		var _a;
		const def = schema._zod.def;
		const seen = ctx.seen.get(schema);
		if (seen) {
			seen.count++;
			if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
			return seen.schema;
		}
		const result = {
			schema: {},
			count: 1,
			cycle: void 0,
			path: _params.path
		};
		ctx.seen.set(schema, result);
		const overrideSchema = schema._zod.toJSONSchema?.();
		if (overrideSchema) result.schema = overrideSchema;
		else {
			const params = {
				..._params,
				schemaPath: [..._params.schemaPath, schema],
				path: _params.path
			};
			if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
			else {
				const _json = result.schema;
				const processor = ctx.processors[def.type];
				if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
				processor(schema, ctx, _json, params);
			}
			const parent = schema._zod.parent;
			if (parent) {
				if (!result.ref) result.ref = parent;
				process(parent, ctx, params);
				ctx.seen.get(parent).isParent = true;
			}
		}
		const meta = ctx.metadataRegistry.get(schema);
		if (meta) Object.assign(result.schema, meta);
		if (ctx.io === "input" && isTransforming(schema)) {
			delete result.schema.examples;
			delete result.schema.default;
		}
		if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
		delete result.schema._prefault;
		return ctx.seen.get(schema).schema;
	}
	function extractDefs(ctx, schema) {
		const root = ctx.seen.get(schema);
		if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
		const idToSchema = /* @__PURE__ */ new Map();
		for (const entry of ctx.seen.entries()) {
			const id = ctx.metadataRegistry.get(entry[0])?.id;
			if (id) {
				const existing = idToSchema.get(id);
				if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
				idToSchema.set(id, entry[0]);
			}
		}
		const makeURI = (entry) => {
			const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
			if (ctx.external) {
				const externalId = ctx.external.registry.get(entry[0])?.id;
				const uriGenerator = ctx.external.uri ?? ((id) => id);
				if (externalId) return { ref: uriGenerator(externalId) };
				const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
				entry[1].defId = id;
				return {
					defId: id,
					ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
				};
			}
			if (entry[1] === root) return { ref: "#" };
			const defUriPrefix = `#/${defsSegment}/`;
			const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
			return {
				defId,
				ref: defUriPrefix + defId
			};
		};
		const extractToDef = (entry) => {
			if (entry[1].schema.$ref) return;
			const seen = entry[1];
			const { ref, defId } = makeURI(entry);
			seen.def = { ...seen.schema };
			if (defId) seen.defId = defId;
			const schema = seen.schema;
			for (const key in schema) delete schema[key];
			schema.$ref = ref;
		};
		if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
		for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (schema === entry[0]) {
				extractToDef(entry);
				continue;
			}
			if (ctx.external) {
				const ext = ctx.external.registry.get(entry[0])?.id;
				if (schema !== entry[0] && ext) {
					extractToDef(entry);
					continue;
				}
			}
			if (ctx.metadataRegistry.get(entry[0])?.id) {
				extractToDef(entry);
				continue;
			}
			if (seen.cycle) {
				extractToDef(entry);
				continue;
			}
			if (seen.count > 1) {
				if (ctx.reused === "ref") {
					extractToDef(entry);
					continue;
				}
			}
		}
	}
	function finalize(ctx, schema) {
		const root = ctx.seen.get(schema);
		if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
		const flattenRef = (zodSchema) => {
			const seen = ctx.seen.get(zodSchema);
			if (seen.ref === null) return;
			const schema = seen.def ?? seen.schema;
			const _cached = { ...schema };
			const ref = seen.ref;
			seen.ref = null;
			if (ref) {
				flattenRef(ref);
				const refSeen = ctx.seen.get(ref);
				const refSchema = refSeen.schema;
				if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
					schema.allOf = schema.allOf ?? [];
					schema.allOf.push(refSchema);
				} else Object.assign(schema, refSchema);
				Object.assign(schema, _cached);
				if (zodSchema._zod.parent === ref) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (!(key in _cached)) delete schema[key];
				}
				if (refSchema.$ref && refSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
				}
			}
			const parent = zodSchema._zod.parent;
			if (parent && parent !== ref) {
				flattenRef(parent);
				const parentSeen = ctx.seen.get(parent);
				if (parentSeen?.schema.$ref) {
					schema.$ref = parentSeen.schema.$ref;
					if (parentSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
					}
				}
			}
			ctx.override({
				zodSchema,
				jsonSchema: schema,
				path: seen.path ?? []
			});
		};
		for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
		const result = {};
		if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
		else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
		else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
		else if (ctx.target === "openapi-3.0") {}
		if (ctx.external?.uri) {
			const id = ctx.external.registry.get(schema)?.id;
			if (!id) throw new Error("Schema is missing an `id` property");
			result.$id = ctx.external.uri(id);
		}
		Object.assign(result, root.def ?? root.schema);
		const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
		if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
		const defs = ctx.external?.defs ?? {};
		for (const entry of ctx.seen.entries()) {
			const seen = entry[1];
			if (seen.def && seen.defId) {
				if (seen.def.id === seen.defId) delete seen.def.id;
				defs[seen.defId] = seen.def;
			}
		}
		if (ctx.external) {} else if (Object.keys(defs).length > 0) {
			if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
		}
		try {
			const finalized = JSON.parse(JSON.stringify(result));
			Object.defineProperty(finalized, "~standard", {
				value: {
					...schema["~standard"],
					jsonSchema: {
						input: (0, exports.createStandardJSONSchemaMethod)(schema, "input", ctx.processors),
						output: (0, exports.createStandardJSONSchemaMethod)(schema, "output", ctx.processors)
					}
				},
				enumerable: false,
				writable: false
			});
			return finalized;
		} catch (_err) {
			throw new Error("Error converting schema to JSON.");
		}
	}
	function isTransforming(_schema, _ctx) {
		const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
		if (ctx.seen.has(_schema)) return false;
		ctx.seen.add(_schema);
		const def = _schema._zod.def;
		if (def.type === "transform") return true;
		if (def.type === "array") return isTransforming(def.element, ctx);
		if (def.type === "set") return isTransforming(def.valueType, ctx);
		if (def.type === "lazy") return isTransforming(def.getter(), ctx);
		if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
		if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
		if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		if (def.type === "pipe") {
			if (_schema._zod.traits.has("$ZodCodec")) return true;
			return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
		}
		if (def.type === "object") {
			for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
			return false;
		}
		if (def.type === "union") {
			for (const option of def.options) if (isTransforming(option, ctx)) return true;
			return false;
		}
		if (def.type === "tuple") {
			for (const item of def.items) if (isTransforming(item, ctx)) return true;
			if (def.rest && isTransforming(def.rest, ctx)) return true;
			return false;
		}
		return false;
	}
	/**
	* Creates a toJSONSchema method for a schema instance.
	* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
	*/
	var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
		const ctx = initializeContext({
			...params,
			processors
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
	exports.createToJSONSchemaMethod = createToJSONSchemaMethod;
	var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
		const { libraryOptions, target } = params ?? {};
		const ctx = initializeContext({
			...libraryOptions ?? {},
			target,
			io,
			processors
		});
		process(schema, ctx);
		extractDefs(ctx, schema);
		return finalize(ctx, schema);
	};
	exports.createStandardJSONSchemaMethod = createStandardJSONSchemaMethod;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/json-schema-processors.cjs
var require_json_schema_processors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.allProcessors = exports.lazyProcessor = exports.optionalProcessor = exports.promiseProcessor = exports.readonlyProcessor = exports.pipeProcessor = exports.catchProcessor = exports.prefaultProcessor = exports.defaultProcessor = exports.nonoptionalProcessor = exports.nullableProcessor = exports.recordProcessor = exports.tupleProcessor = exports.intersectionProcessor = exports.unionProcessor = exports.objectProcessor = exports.arrayProcessor = exports.setProcessor = exports.mapProcessor = exports.transformProcessor = exports.functionProcessor = exports.customProcessor = exports.successProcessor = exports.fileProcessor = exports.templateLiteralProcessor = exports.nanProcessor = exports.literalProcessor = exports.enumProcessor = exports.dateProcessor = exports.unknownProcessor = exports.anyProcessor = exports.neverProcessor = exports.voidProcessor = exports.undefinedProcessor = exports.nullProcessor = exports.symbolProcessor = exports.bigintProcessor = exports.booleanProcessor = exports.numberProcessor = exports.stringProcessor = void 0;
	exports.toJSONSchema = toJSONSchema;
	var to_json_schema_js_1 = require_to_json_schema();
	var util_js_1 = require_util();
	var formatMap = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	};
	var stringProcessor = (schema, ctx, _json, _params) => {
		const json = _json;
		json.type = "string";
		const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
		if (typeof minimum === "number") json.minLength = minimum;
		if (typeof maximum === "number") json.maxLength = maximum;
		if (format) {
			json.format = formatMap[format] ?? format;
			if (json.format === "") delete json.format;
			if (format === "time") delete json.format;
		}
		if (contentEncoding) json.contentEncoding = contentEncoding;
		if (patterns && patterns.size > 0) {
			const regexes = [...patterns];
			if (regexes.length === 1) json.pattern = regexes[0].source;
			else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
				...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: regex.source
			}))];
		}
	};
	exports.stringProcessor = stringProcessor;
	var numberProcessor = (schema, ctx, _json, _params) => {
		const json = _json;
		const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
		if (typeof format === "string" && format.includes("int")) json.type = "integer";
		else json.type = "number";
		const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
		const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
		const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
		if (exMin) {
			if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
		} else if (typeof minimum === "number") json.minimum = minimum;
		if (exMax) {
			if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
		} else if (typeof maximum === "number") json.maximum = maximum;
		if (typeof multipleOf === "number") json.multipleOf = multipleOf;
	};
	exports.numberProcessor = numberProcessor;
	var booleanProcessor = (_schema, _ctx, json, _params) => {
		json.type = "boolean";
	};
	exports.booleanProcessor = booleanProcessor;
	var bigintProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
	};
	exports.bigintProcessor = bigintProcessor;
	var symbolProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
	};
	exports.symbolProcessor = symbolProcessor;
	var nullProcessor = (_schema, ctx, json, _params) => {
		if (ctx.target === "openapi-3.0") {
			json.type = "string";
			json.nullable = true;
			json.enum = [null];
		} else json.type = "null";
	};
	exports.nullProcessor = nullProcessor;
	var undefinedProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
	};
	exports.undefinedProcessor = undefinedProcessor;
	var voidProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
	};
	exports.voidProcessor = voidProcessor;
	var neverProcessor = (_schema, _ctx, json, _params) => {
		json.not = {};
	};
	exports.neverProcessor = neverProcessor;
	var anyProcessor = (_schema, _ctx, _json, _params) => {};
	exports.anyProcessor = anyProcessor;
	var unknownProcessor = (_schema, _ctx, _json, _params) => {};
	exports.unknownProcessor = unknownProcessor;
	var dateProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
	};
	exports.dateProcessor = dateProcessor;
	var enumProcessor = (schema, _ctx, json, _params) => {
		const def = schema._zod.def;
		const values = (0, util_js_1.getEnumValues)(def.entries);
		if (values.every((v) => typeof v === "number")) json.type = "number";
		if (values.every((v) => typeof v === "string")) json.type = "string";
		json.enum = values;
	};
	exports.enumProcessor = enumProcessor;
	var literalProcessor = (schema, ctx, json, _params) => {
		const def = schema._zod.def;
		const vals = [];
		for (const val of def.values) if (val === void 0) {
			if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
		} else if (typeof val === "bigint") {
			if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
		} else vals.push(val);
		if (vals.length === 0) {} else if (vals.length === 1) {
			const val = vals[0];
			json.type = val === null ? "null" : typeof val;
			if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
			else json.const = val;
		} else {
			if (vals.every((v) => typeof v === "number")) json.type = "number";
			if (vals.every((v) => typeof v === "string")) json.type = "string";
			if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
			if (vals.every((v) => v === null)) json.type = "null";
			json.enum = vals;
		}
	};
	exports.literalProcessor = literalProcessor;
	var nanProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
	};
	exports.nanProcessor = nanProcessor;
	var templateLiteralProcessor = (schema, _ctx, json, _params) => {
		const _json = json;
		const pattern = schema._zod.pattern;
		if (!pattern) throw new Error("Pattern not found in template literal");
		_json.type = "string";
		_json.pattern = pattern.source;
	};
	exports.templateLiteralProcessor = templateLiteralProcessor;
	var fileProcessor = (schema, _ctx, json, _params) => {
		const _json = json;
		const file = {
			type: "string",
			format: "binary",
			contentEncoding: "binary"
		};
		const { minimum, maximum, mime } = schema._zod.bag;
		if (minimum !== void 0) file.minLength = minimum;
		if (maximum !== void 0) file.maxLength = maximum;
		if (mime) {
			if (mime.length === 1) {
				file.contentMediaType = mime[0];
				Object.assign(_json, file);
			} else {
				Object.assign(_json, file);
				_json.anyOf = mime.map((m) => ({ contentMediaType: m }));
			}
		} else Object.assign(_json, file);
	};
	exports.fileProcessor = fileProcessor;
	var successProcessor = (_schema, _ctx, json, _params) => {
		json.type = "boolean";
	};
	exports.successProcessor = successProcessor;
	var customProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
	};
	exports.customProcessor = customProcessor;
	var functionProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Function types cannot be represented in JSON Schema");
	};
	exports.functionProcessor = functionProcessor;
	var transformProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
	};
	exports.transformProcessor = transformProcessor;
	var mapProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
	};
	exports.mapProcessor = mapProcessor;
	var setProcessor = (_schema, ctx, _json, _params) => {
		if (ctx.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
	};
	exports.setProcessor = setProcessor;
	var arrayProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		const { minimum, maximum } = schema._zod.bag;
		if (typeof minimum === "number") json.minItems = minimum;
		if (typeof maximum === "number") json.maxItems = maximum;
		json.type = "array";
		json.items = (0, to_json_schema_js_1.process)(def.element, ctx, {
			...params,
			path: [...params.path, "items"]
		});
	};
	exports.arrayProcessor = arrayProcessor;
	var objectProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		json.type = "object";
		json.properties = {};
		const shape = def.shape;
		for (const key in shape) json.properties[key] = (0, to_json_schema_js_1.process)(shape[key], ctx, {
			...params,
			path: [
				...params.path,
				"properties",
				key
			]
		});
		const allKeys = new Set(Object.keys(shape));
		const requiredKeys = new Set([...allKeys].filter((key) => {
			const v = def.shape[key]._zod;
			if (ctx.io === "input") return v.optin === void 0;
			else return v.optout === void 0;
		}));
		if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
		if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
		else if (!def.catchall) {
			if (ctx.io === "output") json.additionalProperties = false;
		} else if (def.catchall) json.additionalProperties = (0, to_json_schema_js_1.process)(def.catchall, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	};
	exports.objectProcessor = objectProcessor;
	var unionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const isExclusive = def.inclusive === false;
		const options = def.options.map((x, i) => (0, to_json_schema_js_1.process)(x, ctx, {
			...params,
			path: [
				...params.path,
				isExclusive ? "oneOf" : "anyOf",
				i
			]
		}));
		if (isExclusive) json.oneOf = options;
		else json.anyOf = options;
	};
	exports.unionProcessor = unionProcessor;
	var intersectionProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const a = (0, to_json_schema_js_1.process)(def.left, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				0
			]
		});
		const b = (0, to_json_schema_js_1.process)(def.right, ctx, {
			...params,
			path: [
				...params.path,
				"allOf",
				1
			]
		});
		const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
		json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
	};
	exports.intersectionProcessor = intersectionProcessor;
	var tupleProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		json.type = "array";
		const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
		const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
		const prefixItems = def.items.map((x, i) => (0, to_json_schema_js_1.process)(x, ctx, {
			...params,
			path: [
				...params.path,
				prefixPath,
				i
			]
		}));
		const rest = def.rest ? (0, to_json_schema_js_1.process)(def.rest, ctx, {
			...params,
			path: [
				...params.path,
				restPath,
				...ctx.target === "openapi-3.0" ? [def.items.length] : []
			]
		}) : null;
		if (ctx.target === "draft-2020-12") {
			json.prefixItems = prefixItems;
			if (rest) json.items = rest;
		} else if (ctx.target === "openapi-3.0") {
			json.items = { anyOf: prefixItems };
			if (rest) json.items.anyOf.push(rest);
			json.minItems = prefixItems.length;
			if (!rest) json.maxItems = prefixItems.length;
		} else {
			json.items = prefixItems;
			if (rest) json.additionalItems = rest;
		}
		const { minimum, maximum } = schema._zod.bag;
		if (typeof minimum === "number") json.minItems = minimum;
		if (typeof maximum === "number") json.maxItems = maximum;
	};
	exports.tupleProcessor = tupleProcessor;
	var recordProcessor = (schema, ctx, _json, params) => {
		const json = _json;
		const def = schema._zod.def;
		json.type = "object";
		const keyType = def.keyType;
		const patterns = keyType._zod.bag?.patterns;
		if (def.mode === "loose" && patterns && patterns.size > 0) {
			const valueSchema = (0, to_json_schema_js_1.process)(def.valueType, ctx, {
				...params,
				path: [
					...params.path,
					"patternProperties",
					"*"
				]
			});
			json.patternProperties = {};
			for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
		} else {
			if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = (0, to_json_schema_js_1.process)(def.keyType, ctx, {
				...params,
				path: [...params.path, "propertyNames"]
			});
			json.additionalProperties = (0, to_json_schema_js_1.process)(def.valueType, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		}
		const keyValues = keyType._zod.values;
		if (keyValues) {
			const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
			if (validKeyValues.length > 0) json.required = validKeyValues;
		}
	};
	exports.recordProcessor = recordProcessor;
	var nullableProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		const inner = (0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		if (ctx.target === "openapi-3.0") {
			seen.ref = def.innerType;
			json.nullable = true;
		} else json.anyOf = [inner, { type: "null" }];
	};
	exports.nullableProcessor = nullableProcessor;
	var nonoptionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	exports.nonoptionalProcessor = nonoptionalProcessor;
	var defaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		json.default = JSON.parse(JSON.stringify(def.defaultValue));
	};
	exports.defaultProcessor = defaultProcessor;
	var prefaultProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
	};
	exports.prefaultProcessor = prefaultProcessor;
	var catchProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		let catchValue;
		try {
			catchValue = def.catchValue(void 0);
		} catch {
			throw new Error("Dynamic catch values are not supported in JSON Schema");
		}
		json.default = catchValue;
	};
	exports.catchProcessor = catchProcessor;
	var pipeProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		const inIsTransform = def.in._zod.traits.has("$ZodTransform");
		const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
		(0, to_json_schema_js_1.process)(innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = innerType;
	};
	exports.pipeProcessor = pipeProcessor;
	var readonlyProcessor = (schema, ctx, json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
		json.readOnly = true;
	};
	exports.readonlyProcessor = readonlyProcessor;
	var promiseProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	exports.promiseProcessor = promiseProcessor;
	var optionalProcessor = (schema, ctx, _json, params) => {
		const def = schema._zod.def;
		(0, to_json_schema_js_1.process)(def.innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = def.innerType;
	};
	exports.optionalProcessor = optionalProcessor;
	var lazyProcessor = (schema, ctx, _json, params) => {
		const innerType = schema._zod.innerType;
		(0, to_json_schema_js_1.process)(innerType, ctx, params);
		const seen = ctx.seen.get(schema);
		seen.ref = innerType;
	};
	exports.lazyProcessor = lazyProcessor;
	exports.allProcessors = {
		string: exports.stringProcessor,
		number: exports.numberProcessor,
		boolean: exports.booleanProcessor,
		bigint: exports.bigintProcessor,
		symbol: exports.symbolProcessor,
		null: exports.nullProcessor,
		undefined: exports.undefinedProcessor,
		void: exports.voidProcessor,
		never: exports.neverProcessor,
		any: exports.anyProcessor,
		unknown: exports.unknownProcessor,
		date: exports.dateProcessor,
		enum: exports.enumProcessor,
		literal: exports.literalProcessor,
		nan: exports.nanProcessor,
		template_literal: exports.templateLiteralProcessor,
		file: exports.fileProcessor,
		success: exports.successProcessor,
		custom: exports.customProcessor,
		function: exports.functionProcessor,
		transform: exports.transformProcessor,
		map: exports.mapProcessor,
		set: exports.setProcessor,
		array: exports.arrayProcessor,
		object: exports.objectProcessor,
		union: exports.unionProcessor,
		intersection: exports.intersectionProcessor,
		tuple: exports.tupleProcessor,
		record: exports.recordProcessor,
		nullable: exports.nullableProcessor,
		nonoptional: exports.nonoptionalProcessor,
		default: exports.defaultProcessor,
		prefault: exports.prefaultProcessor,
		catch: exports.catchProcessor,
		pipe: exports.pipeProcessor,
		readonly: exports.readonlyProcessor,
		promise: exports.promiseProcessor,
		optional: exports.optionalProcessor,
		lazy: exports.lazyProcessor
	};
	function toJSONSchema(input, params) {
		if ("_idmap" in input) {
			const registry = input;
			const ctx = (0, to_json_schema_js_1.initializeContext)({
				...params,
				processors: exports.allProcessors
			});
			const defs = {};
			for (const entry of registry._idmap.entries()) {
				const [_, schema] = entry;
				(0, to_json_schema_js_1.process)(schema, ctx);
			}
			const schemas = {};
			ctx.external = {
				registry,
				uri: params?.uri,
				defs
			};
			for (const entry of registry._idmap.entries()) {
				const [key, schema] = entry;
				(0, to_json_schema_js_1.extractDefs)(ctx, schema);
				schemas[key] = (0, to_json_schema_js_1.finalize)(ctx, schema);
			}
			if (Object.keys(defs).length > 0) schemas.__shared = { [ctx.target === "draft-2020-12" ? "$defs" : "definitions"]: defs };
			return { schemas };
		}
		const ctx = (0, to_json_schema_js_1.initializeContext)({
			...params,
			processors: exports.allProcessors
		});
		(0, to_json_schema_js_1.process)(input, ctx);
		(0, to_json_schema_js_1.extractDefs)(ctx, input);
		return (0, to_json_schema_js_1.finalize)(ctx, input);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/json-schema-generator.cjs
var require_json_schema_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONSchemaGenerator = void 0;
	var json_schema_processors_js_1 = require_json_schema_processors();
	var to_json_schema_js_1 = require_to_json_schema();
	/**
	* Legacy class-based interface for JSON Schema generation.
	* This class wraps the new functional implementation to provide backward compatibility.
	*
	* @deprecated Use the `toJSONSchema` function instead for new code.
	*
	* @example
	* ```typescript
	* // Legacy usage (still supported)
	* const gen = new JSONSchemaGenerator({ target: "draft-07" });
	* gen.process(schema);
	* const result = gen.emit(schema);
	*
	* // Preferred modern usage
	* const result = toJSONSchema(schema, { target: "draft-07" });
	* ```
	*/
	var JSONSchemaGenerator = class {
		/** @deprecated Access via ctx instead */
		get metadataRegistry() {
			return this.ctx.metadataRegistry;
		}
		/** @deprecated Access via ctx instead */
		get target() {
			return this.ctx.target;
		}
		/** @deprecated Access via ctx instead */
		get unrepresentable() {
			return this.ctx.unrepresentable;
		}
		/** @deprecated Access via ctx instead */
		get override() {
			return this.ctx.override;
		}
		/** @deprecated Access via ctx instead */
		get io() {
			return this.ctx.io;
		}
		/** @deprecated Access via ctx instead */
		get counter() {
			return this.ctx.counter;
		}
		set counter(value) {
			this.ctx.counter = value;
		}
		/** @deprecated Access via ctx instead */
		get seen() {
			return this.ctx.seen;
		}
		constructor(params) {
			let normalizedTarget = params?.target ?? "draft-2020-12";
			if (normalizedTarget === "draft-4") normalizedTarget = "draft-04";
			if (normalizedTarget === "draft-7") normalizedTarget = "draft-07";
			this.ctx = (0, to_json_schema_js_1.initializeContext)({
				processors: json_schema_processors_js_1.allProcessors,
				target: normalizedTarget,
				...params?.metadata && { metadata: params.metadata },
				...params?.unrepresentable && { unrepresentable: params.unrepresentable },
				...params?.override && { override: params.override },
				...params?.io && { io: params.io }
			});
		}
		/**
		* Process a schema to prepare it for JSON Schema generation.
		* This must be called before emit().
		*/
		process(schema, _params = {
			path: [],
			schemaPath: []
		}) {
			return (0, to_json_schema_js_1.process)(schema, this.ctx, _params);
		}
		/**
		* Emit the final JSON Schema after processing.
		* Must call process() first.
		*/
		emit(schema, _params) {
			if (_params) {
				if (_params.cycles) this.ctx.cycles = _params.cycles;
				if (_params.reused) this.ctx.reused = _params.reused;
				if (_params.external) this.ctx.external = _params.external;
			}
			(0, to_json_schema_js_1.extractDefs)(this.ctx, schema);
			const { "~standard": _, ...plainResult } = (0, to_json_schema_js_1.finalize)(this.ctx, schema);
			return plainResult;
		}
	};
	exports.JSONSchemaGenerator = JSONSchemaGenerator;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/json-schema.cjs
var require_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/core/index.cjs
var require_core = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __exportStar = exports && exports.__exportStar || function(m, exports$3) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$3, p)) __createBinding(exports$3, m, p);
	};
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONSchema = exports.JSONSchemaGenerator = exports.toJSONSchema = exports.locales = exports.regexes = exports.util = void 0;
	__exportStar(require_core$1(), exports);
	__exportStar(require_parse$1(), exports);
	__exportStar(require_errors$1(), exports);
	__exportStar(require_schemas$1(), exports);
	__exportStar(require_checks$1(), exports);
	__exportStar(require_versions(), exports);
	exports.util = __importStar(require_util());
	exports.regexes = __importStar(require_regexes());
	exports.locales = __importStar(require_locales());
	__exportStar(require_registries(), exports);
	__exportStar(require_doc(), exports);
	__exportStar(require_api(), exports);
	__exportStar(require_to_json_schema(), exports);
	var json_schema_processors_js_1 = require_json_schema_processors();
	Object.defineProperty(exports, "toJSONSchema", {
		enumerable: true,
		get: function() {
			return json_schema_processors_js_1.toJSONSchema;
		}
	});
	var json_schema_generator_js_1 = require_json_schema_generator();
	Object.defineProperty(exports, "JSONSchemaGenerator", {
		enumerable: true,
		get: function() {
			return json_schema_generator_js_1.JSONSchemaGenerator;
		}
	});
	exports.JSONSchema = __importStar(require_json_schema());
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/checks.cjs
var require_checks = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.slugify = exports.toUpperCase = exports.toLowerCase = exports.trim = exports.normalize = exports.overwrite = exports.mime = exports.property = exports.endsWith = exports.startsWith = exports.includes = exports.uppercase = exports.lowercase = exports.regex = exports.length = exports.minLength = exports.maxLength = exports.size = exports.minSize = exports.maxSize = exports.multipleOf = exports.nonnegative = exports.nonpositive = exports.negative = exports.positive = exports.gte = exports.gt = exports.lte = exports.lt = void 0;
	var index_js_1 = require_core();
	Object.defineProperty(exports, "lt", {
		enumerable: true,
		get: function() {
			return index_js_1._lt;
		}
	});
	Object.defineProperty(exports, "lte", {
		enumerable: true,
		get: function() {
			return index_js_1._lte;
		}
	});
	Object.defineProperty(exports, "gt", {
		enumerable: true,
		get: function() {
			return index_js_1._gt;
		}
	});
	Object.defineProperty(exports, "gte", {
		enumerable: true,
		get: function() {
			return index_js_1._gte;
		}
	});
	Object.defineProperty(exports, "positive", {
		enumerable: true,
		get: function() {
			return index_js_1._positive;
		}
	});
	Object.defineProperty(exports, "negative", {
		enumerable: true,
		get: function() {
			return index_js_1._negative;
		}
	});
	Object.defineProperty(exports, "nonpositive", {
		enumerable: true,
		get: function() {
			return index_js_1._nonpositive;
		}
	});
	Object.defineProperty(exports, "nonnegative", {
		enumerable: true,
		get: function() {
			return index_js_1._nonnegative;
		}
	});
	Object.defineProperty(exports, "multipleOf", {
		enumerable: true,
		get: function() {
			return index_js_1._multipleOf;
		}
	});
	Object.defineProperty(exports, "maxSize", {
		enumerable: true,
		get: function() {
			return index_js_1._maxSize;
		}
	});
	Object.defineProperty(exports, "minSize", {
		enumerable: true,
		get: function() {
			return index_js_1._minSize;
		}
	});
	Object.defineProperty(exports, "size", {
		enumerable: true,
		get: function() {
			return index_js_1._size;
		}
	});
	Object.defineProperty(exports, "maxLength", {
		enumerable: true,
		get: function() {
			return index_js_1._maxLength;
		}
	});
	Object.defineProperty(exports, "minLength", {
		enumerable: true,
		get: function() {
			return index_js_1._minLength;
		}
	});
	Object.defineProperty(exports, "length", {
		enumerable: true,
		get: function() {
			return index_js_1._length;
		}
	});
	Object.defineProperty(exports, "regex", {
		enumerable: true,
		get: function() {
			return index_js_1._regex;
		}
	});
	Object.defineProperty(exports, "lowercase", {
		enumerable: true,
		get: function() {
			return index_js_1._lowercase;
		}
	});
	Object.defineProperty(exports, "uppercase", {
		enumerable: true,
		get: function() {
			return index_js_1._uppercase;
		}
	});
	Object.defineProperty(exports, "includes", {
		enumerable: true,
		get: function() {
			return index_js_1._includes;
		}
	});
	Object.defineProperty(exports, "startsWith", {
		enumerable: true,
		get: function() {
			return index_js_1._startsWith;
		}
	});
	Object.defineProperty(exports, "endsWith", {
		enumerable: true,
		get: function() {
			return index_js_1._endsWith;
		}
	});
	Object.defineProperty(exports, "property", {
		enumerable: true,
		get: function() {
			return index_js_1._property;
		}
	});
	Object.defineProperty(exports, "mime", {
		enumerable: true,
		get: function() {
			return index_js_1._mime;
		}
	});
	Object.defineProperty(exports, "overwrite", {
		enumerable: true,
		get: function() {
			return index_js_1._overwrite;
		}
	});
	Object.defineProperty(exports, "normalize", {
		enumerable: true,
		get: function() {
			return index_js_1._normalize;
		}
	});
	Object.defineProperty(exports, "trim", {
		enumerable: true,
		get: function() {
			return index_js_1._trim;
		}
	});
	Object.defineProperty(exports, "toLowerCase", {
		enumerable: true,
		get: function() {
			return index_js_1._toLowerCase;
		}
	});
	Object.defineProperty(exports, "toUpperCase", {
		enumerable: true,
		get: function() {
			return index_js_1._toUpperCase;
		}
	});
	Object.defineProperty(exports, "slugify", {
		enumerable: true,
		get: function() {
			return index_js_1._slugify;
		}
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/iso.cjs
var require_iso = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = void 0;
	exports.datetime = datetime;
	exports.date = date;
	exports.time = time;
	exports.duration = duration;
	var core = __importStar(require_core());
	var schemas = __importStar(require_schemas());
	exports.ZodISODateTime = core.$constructor("ZodISODateTime", (inst, def) => {
		core.$ZodISODateTime.init(inst, def);
		schemas.ZodStringFormat.init(inst, def);
	});
	function datetime(params) {
		return core._isoDateTime(exports.ZodISODateTime, params);
	}
	exports.ZodISODate = core.$constructor("ZodISODate", (inst, def) => {
		core.$ZodISODate.init(inst, def);
		schemas.ZodStringFormat.init(inst, def);
	});
	function date(params) {
		return core._isoDate(exports.ZodISODate, params);
	}
	exports.ZodISOTime = core.$constructor("ZodISOTime", (inst, def) => {
		core.$ZodISOTime.init(inst, def);
		schemas.ZodStringFormat.init(inst, def);
	});
	function time(params) {
		return core._isoTime(exports.ZodISOTime, params);
	}
	exports.ZodISODuration = core.$constructor("ZodISODuration", (inst, def) => {
		core.$ZodISODuration.init(inst, def);
		schemas.ZodStringFormat.init(inst, def);
	});
	function duration(params) {
		return core._isoDuration(exports.ZodISODuration, params);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/errors.cjs
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodRealError = exports.ZodError = void 0;
	var core = __importStar(require_core());
	var index_js_1 = require_core();
	var util = __importStar(require_util());
	var initializer = (inst, issues) => {
		index_js_1.$ZodError.init(inst, issues);
		inst.name = "ZodError";
		Object.defineProperties(inst, {
			format: { value: (mapper) => core.formatError(inst, mapper) },
			flatten: { value: (mapper) => core.flattenError(inst, mapper) },
			addIssue: { value: (issue) => {
				inst.issues.push(issue);
				inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
			} },
			addIssues: { value: (issues) => {
				inst.issues.push(...issues);
				inst.message = JSON.stringify(inst.issues, util.jsonStringifyReplacer, 2);
			} },
			isEmpty: { get() {
				return inst.issues.length === 0;
			} }
		});
	};
	exports.ZodError = core.$constructor("ZodError", initializer);
	exports.ZodRealError = core.$constructor("ZodError", initializer, { Parent: Error });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/parse.cjs
var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.safeDecodeAsync = exports.safeEncodeAsync = exports.safeDecode = exports.safeEncode = exports.decodeAsync = exports.encodeAsync = exports.decode = exports.encode = exports.safeParseAsync = exports.safeParse = exports.parseAsync = exports.parse = void 0;
	var core = __importStar(require_core());
	var errors_js_1 = require_errors();
	exports.parse = core._parse(errors_js_1.ZodRealError);
	exports.parseAsync = core._parseAsync(errors_js_1.ZodRealError);
	exports.safeParse = core._safeParse(errors_js_1.ZodRealError);
	exports.safeParseAsync = core._safeParseAsync(errors_js_1.ZodRealError);
	exports.encode = core._encode(errors_js_1.ZodRealError);
	exports.decode = core._decode(errors_js_1.ZodRealError);
	exports.encodeAsync = core._encodeAsync(errors_js_1.ZodRealError);
	exports.decodeAsync = core._decodeAsync(errors_js_1.ZodRealError);
	exports.safeEncode = core._safeEncode(errors_js_1.ZodRealError);
	exports.safeDecode = core._safeDecode(errors_js_1.ZodRealError);
	exports.safeEncodeAsync = core._safeEncodeAsync(errors_js_1.ZodRealError);
	exports.safeDecodeAsync = core._safeDecodeAsync(errors_js_1.ZodRealError);
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/schemas.cjs
var require_schemas = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodLiteral = exports.ZodEnum = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodXor = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodDate = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodBigIntFormat = exports.ZodBigInt = exports.ZodBoolean = exports.ZodNumberFormat = exports.ZodNumber = exports.ZodCustomStringFormat = exports.ZodJWT = exports.ZodE164 = exports.ZodBase64URL = exports.ZodBase64 = exports.ZodCIDRv6 = exports.ZodCIDRv4 = exports.ZodIPv6 = exports.ZodMAC = exports.ZodIPv4 = exports.ZodKSUID = exports.ZodXID = exports.ZodULID = exports.ZodCUID2 = exports.ZodCUID = exports.ZodNanoID = exports.ZodEmoji = exports.ZodURL = exports.ZodUUID = exports.ZodGUID = exports.ZodEmail = exports.ZodStringFormat = exports.ZodString = exports._ZodString = exports.ZodType = void 0;
	exports.stringbool = exports.meta = exports.describe = exports.ZodCustom = exports.ZodFunction = exports.ZodPromise = exports.ZodLazy = exports.ZodTemplateLiteral = exports.ZodReadonly = exports.ZodPreprocess = exports.ZodCodec = exports.ZodPipe = exports.ZodNaN = exports.ZodCatch = exports.ZodSuccess = exports.ZodNonOptional = exports.ZodPrefault = exports.ZodDefault = exports.ZodNullable = exports.ZodExactOptional = exports.ZodOptional = exports.ZodTransform = exports.ZodFile = void 0;
	exports.string = string;
	exports.email = email;
	exports.guid = guid;
	exports.uuid = uuid;
	exports.uuidv4 = uuidv4;
	exports.uuidv6 = uuidv6;
	exports.uuidv7 = uuidv7;
	exports.url = url;
	exports.httpUrl = httpUrl;
	exports.emoji = emoji;
	exports.nanoid = nanoid;
	exports.cuid = cuid;
	exports.cuid2 = cuid2;
	exports.ulid = ulid;
	exports.xid = xid;
	exports.ksuid = ksuid;
	exports.ipv4 = ipv4;
	exports.mac = mac;
	exports.ipv6 = ipv6;
	exports.cidrv4 = cidrv4;
	exports.cidrv6 = cidrv6;
	exports.base64 = base64;
	exports.base64url = base64url;
	exports.e164 = e164;
	exports.jwt = jwt;
	exports.stringFormat = stringFormat;
	exports.hostname = hostname;
	exports.hex = hex;
	exports.hash = hash;
	exports.number = number;
	exports.int = int;
	exports.float32 = float32;
	exports.float64 = float64;
	exports.int32 = int32;
	exports.uint32 = uint32;
	exports.boolean = boolean;
	exports.bigint = bigint;
	exports.int64 = int64;
	exports.uint64 = uint64;
	exports.symbol = symbol;
	exports.undefined = _undefined;
	exports.null = _null;
	exports.any = any;
	exports.unknown = unknown;
	exports.never = never;
	exports.void = _void;
	exports.date = date;
	exports.array = array;
	exports.keyof = keyof;
	exports.object = object;
	exports.strictObject = strictObject;
	exports.looseObject = looseObject;
	exports.union = union;
	exports.xor = xor;
	exports.discriminatedUnion = discriminatedUnion;
	exports.intersection = intersection;
	exports.tuple = tuple;
	exports.record = record;
	exports.partialRecord = partialRecord;
	exports.looseRecord = looseRecord;
	exports.map = map;
	exports.set = set;
	exports.enum = _enum;
	exports.nativeEnum = nativeEnum;
	exports.literal = literal;
	exports.file = file;
	exports.transform = transform;
	exports.optional = optional;
	exports.exactOptional = exactOptional;
	exports.nullable = nullable;
	exports.nullish = nullish;
	exports._default = _default;
	exports.prefault = prefault;
	exports.nonoptional = nonoptional;
	exports.success = success;
	exports.catch = _catch;
	exports.nan = nan;
	exports.pipe = pipe;
	exports.codec = codec;
	exports.invertCodec = invertCodec;
	exports.readonly = readonly;
	exports.templateLiteral = templateLiteral;
	exports.lazy = lazy;
	exports.promise = promise;
	exports._function = _function;
	exports.function = _function;
	exports._function = _function;
	exports.function = _function;
	exports.check = check;
	exports.custom = custom;
	exports.refine = refine;
	exports.superRefine = superRefine;
	exports.instanceof = _instanceof;
	exports.json = json;
	exports.preprocess = preprocess;
	var core = __importStar(require_core());
	var index_js_1 = require_core();
	var processors = __importStar(require_json_schema_processors());
	var to_json_schema_js_1 = require_to_json_schema();
	var checks = __importStar(require_checks());
	var iso = __importStar(require_iso());
	var parse = __importStar(require_parse());
	var _installedGroups = /* @__PURE__ */ new WeakMap();
	function _installLazyMethods(inst, group, methods) {
		const proto = Object.getPrototypeOf(inst);
		let installed = _installedGroups.get(proto);
		if (!installed) {
			installed = /* @__PURE__ */ new Set();
			_installedGroups.set(proto, installed);
		}
		if (installed.has(group)) return;
		installed.add(group);
		for (const key in methods) {
			const fn = methods[key];
			Object.defineProperty(proto, key, {
				configurable: true,
				enumerable: false,
				get() {
					const bound = fn.bind(this);
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						enumerable: true,
						value: bound
					});
					return bound;
				},
				set(v) {
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						enumerable: true,
						value: v
					});
				}
			});
		}
	}
	exports.ZodType = core.$constructor("ZodType", (inst, def) => {
		core.$ZodType.init(inst, def);
		Object.assign(inst["~standard"], { jsonSchema: {
			input: (0, to_json_schema_js_1.createStandardJSONSchemaMethod)(inst, "input"),
			output: (0, to_json_schema_js_1.createStandardJSONSchemaMethod)(inst, "output")
		} });
		inst.toJSONSchema = (0, to_json_schema_js_1.createToJSONSchemaMethod)(inst, {});
		inst.def = def;
		inst.type = def.type;
		Object.defineProperty(inst, "_def", { value: def });
		inst.parse = (data, params) => parse.parse(inst, data, params, { callee: inst.parse });
		inst.safeParse = (data, params) => parse.safeParse(inst, data, params);
		inst.parseAsync = async (data, params) => parse.parseAsync(inst, data, params, { callee: inst.parseAsync });
		inst.safeParseAsync = async (data, params) => parse.safeParseAsync(inst, data, params);
		inst.spa = inst.safeParseAsync;
		inst.encode = (data, params) => parse.encode(inst, data, params);
		inst.decode = (data, params) => parse.decode(inst, data, params);
		inst.encodeAsync = async (data, params) => parse.encodeAsync(inst, data, params);
		inst.decodeAsync = async (data, params) => parse.decodeAsync(inst, data, params);
		inst.safeEncode = (data, params) => parse.safeEncode(inst, data, params);
		inst.safeDecode = (data, params) => parse.safeDecode(inst, data, params);
		inst.safeEncodeAsync = async (data, params) => parse.safeEncodeAsync(inst, data, params);
		inst.safeDecodeAsync = async (data, params) => parse.safeDecodeAsync(inst, data, params);
		_installLazyMethods(inst, "ZodType", {
			check(...chks) {
				const def = this.def;
				return this.clone(index_js_1.util.mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
					check: ch,
					def: { check: "custom" },
					onattach: []
				} } : ch)] }), { parent: true });
			},
			with(...chks) {
				return this.check(...chks);
			},
			clone(def, params) {
				return core.clone(this, def, params);
			},
			brand() {
				return this;
			},
			register(reg, meta) {
				reg.add(this, meta);
				return this;
			},
			refine(check, params) {
				return this.check(refine(check, params));
			},
			superRefine(refinement, params) {
				return this.check(superRefine(refinement, params));
			},
			overwrite(fn) {
				return this.check(checks.overwrite(fn));
			},
			optional() {
				return optional(this);
			},
			exactOptional() {
				return exactOptional(this);
			},
			nullable() {
				return nullable(this);
			},
			nullish() {
				return optional(nullable(this));
			},
			nonoptional(params) {
				return nonoptional(this, params);
			},
			array() {
				return array(this);
			},
			or(arg) {
				return union([this, arg]);
			},
			and(arg) {
				return intersection(this, arg);
			},
			transform(tx) {
				return pipe(this, transform(tx));
			},
			default(d) {
				return _default(this, d);
			},
			prefault(d) {
				return prefault(this, d);
			},
			catch(params) {
				return _catch(this, params);
			},
			pipe(target) {
				return pipe(this, target);
			},
			readonly() {
				return readonly(this);
			},
			describe(description) {
				const cl = this.clone();
				core.globalRegistry.add(cl, { description });
				return cl;
			},
			meta(...args) {
				if (args.length === 0) return core.globalRegistry.get(this);
				const cl = this.clone();
				core.globalRegistry.add(cl, args[0]);
				return cl;
			},
			isOptional() {
				return this.safeParse(void 0).success;
			},
			isNullable() {
				return this.safeParse(null).success;
			},
			apply(fn) {
				return fn(this);
			}
		});
		Object.defineProperty(inst, "description", {
			get() {
				return core.globalRegistry.get(inst)?.description;
			},
			configurable: true
		});
		return inst;
	});
	/** @internal */
	exports._ZodString = core.$constructor("_ZodString", (inst, def) => {
		core.$ZodString.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.stringProcessor(inst, ctx, json, params);
		const bag = inst._zod.bag;
		inst.format = bag.format ?? null;
		inst.minLength = bag.minimum ?? null;
		inst.maxLength = bag.maximum ?? null;
		_installLazyMethods(inst, "_ZodString", {
			regex(...args) {
				return this.check(checks.regex(...args));
			},
			includes(...args) {
				return this.check(checks.includes(...args));
			},
			startsWith(...args) {
				return this.check(checks.startsWith(...args));
			},
			endsWith(...args) {
				return this.check(checks.endsWith(...args));
			},
			min(...args) {
				return this.check(checks.minLength(...args));
			},
			max(...args) {
				return this.check(checks.maxLength(...args));
			},
			length(...args) {
				return this.check(checks.length(...args));
			},
			nonempty(...args) {
				return this.check(checks.minLength(1, ...args));
			},
			lowercase(params) {
				return this.check(checks.lowercase(params));
			},
			uppercase(params) {
				return this.check(checks.uppercase(params));
			},
			trim() {
				return this.check(checks.trim());
			},
			normalize(...args) {
				return this.check(checks.normalize(...args));
			},
			toLowerCase() {
				return this.check(checks.toLowerCase());
			},
			toUpperCase() {
				return this.check(checks.toUpperCase());
			},
			slugify() {
				return this.check(checks.slugify());
			}
		});
	});
	exports.ZodString = core.$constructor("ZodString", (inst, def) => {
		core.$ZodString.init(inst, def);
		exports._ZodString.init(inst, def);
		inst.email = (params) => inst.check(core._email(exports.ZodEmail, params));
		inst.url = (params) => inst.check(core._url(exports.ZodURL, params));
		inst.jwt = (params) => inst.check(core._jwt(exports.ZodJWT, params));
		inst.emoji = (params) => inst.check(core._emoji(exports.ZodEmoji, params));
		inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
		inst.uuid = (params) => inst.check(core._uuid(exports.ZodUUID, params));
		inst.uuidv4 = (params) => inst.check(core._uuidv4(exports.ZodUUID, params));
		inst.uuidv6 = (params) => inst.check(core._uuidv6(exports.ZodUUID, params));
		inst.uuidv7 = (params) => inst.check(core._uuidv7(exports.ZodUUID, params));
		inst.nanoid = (params) => inst.check(core._nanoid(exports.ZodNanoID, params));
		inst.guid = (params) => inst.check(core._guid(exports.ZodGUID, params));
		inst.cuid = (params) => inst.check(core._cuid(exports.ZodCUID, params));
		inst.cuid2 = (params) => inst.check(core._cuid2(exports.ZodCUID2, params));
		inst.ulid = (params) => inst.check(core._ulid(exports.ZodULID, params));
		inst.base64 = (params) => inst.check(core._base64(exports.ZodBase64, params));
		inst.base64url = (params) => inst.check(core._base64url(exports.ZodBase64URL, params));
		inst.xid = (params) => inst.check(core._xid(exports.ZodXID, params));
		inst.ksuid = (params) => inst.check(core._ksuid(exports.ZodKSUID, params));
		inst.ipv4 = (params) => inst.check(core._ipv4(exports.ZodIPv4, params));
		inst.ipv6 = (params) => inst.check(core._ipv6(exports.ZodIPv6, params));
		inst.cidrv4 = (params) => inst.check(core._cidrv4(exports.ZodCIDRv4, params));
		inst.cidrv6 = (params) => inst.check(core._cidrv6(exports.ZodCIDRv6, params));
		inst.e164 = (params) => inst.check(core._e164(exports.ZodE164, params));
		inst.datetime = (params) => inst.check(iso.datetime(params));
		inst.date = (params) => inst.check(iso.date(params));
		inst.time = (params) => inst.check(iso.time(params));
		inst.duration = (params) => inst.check(iso.duration(params));
	});
	function string(params) {
		return core._string(exports.ZodString, params);
	}
	exports.ZodStringFormat = core.$constructor("ZodStringFormat", (inst, def) => {
		core.$ZodStringFormat.init(inst, def);
		exports._ZodString.init(inst, def);
	});
	exports.ZodEmail = core.$constructor("ZodEmail", (inst, def) => {
		core.$ZodEmail.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function email(params) {
		return core._email(exports.ZodEmail, params);
	}
	exports.ZodGUID = core.$constructor("ZodGUID", (inst, def) => {
		core.$ZodGUID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function guid(params) {
		return core._guid(exports.ZodGUID, params);
	}
	exports.ZodUUID = core.$constructor("ZodUUID", (inst, def) => {
		core.$ZodUUID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function uuid(params) {
		return core._uuid(exports.ZodUUID, params);
	}
	function uuidv4(params) {
		return core._uuidv4(exports.ZodUUID, params);
	}
	function uuidv6(params) {
		return core._uuidv6(exports.ZodUUID, params);
	}
	function uuidv7(params) {
		return core._uuidv7(exports.ZodUUID, params);
	}
	exports.ZodURL = core.$constructor("ZodURL", (inst, def) => {
		core.$ZodURL.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function url(params) {
		return core._url(exports.ZodURL, params);
	}
	function httpUrl(params) {
		return core._url(exports.ZodURL, {
			protocol: core.regexes.httpProtocol,
			hostname: core.regexes.domain,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodEmoji = core.$constructor("ZodEmoji", (inst, def) => {
		core.$ZodEmoji.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function emoji(params) {
		return core._emoji(exports.ZodEmoji, params);
	}
	exports.ZodNanoID = core.$constructor("ZodNanoID", (inst, def) => {
		core.$ZodNanoID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function nanoid(params) {
		return core._nanoid(exports.ZodNanoID, params);
	}
	/**
	* @deprecated CUID v1 is deprecated by its authors due to information leakage
	* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
	* See https://github.com/paralleldrive/cuid.
	*/
	exports.ZodCUID = core.$constructor("ZodCUID", (inst, def) => {
		core.$ZodCUID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	/**
	* Validates a CUID v1 string.
	*
	* @deprecated CUID v1 is deprecated by its authors due to information leakage
	* (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
	* See https://github.com/paralleldrive/cuid.
	*/
	function cuid(params) {
		return core._cuid(exports.ZodCUID, params);
	}
	exports.ZodCUID2 = core.$constructor("ZodCUID2", (inst, def) => {
		core.$ZodCUID2.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function cuid2(params) {
		return core._cuid2(exports.ZodCUID2, params);
	}
	exports.ZodULID = core.$constructor("ZodULID", (inst, def) => {
		core.$ZodULID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function ulid(params) {
		return core._ulid(exports.ZodULID, params);
	}
	exports.ZodXID = core.$constructor("ZodXID", (inst, def) => {
		core.$ZodXID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function xid(params) {
		return core._xid(exports.ZodXID, params);
	}
	exports.ZodKSUID = core.$constructor("ZodKSUID", (inst, def) => {
		core.$ZodKSUID.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function ksuid(params) {
		return core._ksuid(exports.ZodKSUID, params);
	}
	exports.ZodIPv4 = core.$constructor("ZodIPv4", (inst, def) => {
		core.$ZodIPv4.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function ipv4(params) {
		return core._ipv4(exports.ZodIPv4, params);
	}
	exports.ZodMAC = core.$constructor("ZodMAC", (inst, def) => {
		core.$ZodMAC.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function mac(params) {
		return core._mac(exports.ZodMAC, params);
	}
	exports.ZodIPv6 = core.$constructor("ZodIPv6", (inst, def) => {
		core.$ZodIPv6.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function ipv6(params) {
		return core._ipv6(exports.ZodIPv6, params);
	}
	exports.ZodCIDRv4 = core.$constructor("ZodCIDRv4", (inst, def) => {
		core.$ZodCIDRv4.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function cidrv4(params) {
		return core._cidrv4(exports.ZodCIDRv4, params);
	}
	exports.ZodCIDRv6 = core.$constructor("ZodCIDRv6", (inst, def) => {
		core.$ZodCIDRv6.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function cidrv6(params) {
		return core._cidrv6(exports.ZodCIDRv6, params);
	}
	exports.ZodBase64 = core.$constructor("ZodBase64", (inst, def) => {
		core.$ZodBase64.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function base64(params) {
		return core._base64(exports.ZodBase64, params);
	}
	exports.ZodBase64URL = core.$constructor("ZodBase64URL", (inst, def) => {
		core.$ZodBase64URL.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function base64url(params) {
		return core._base64url(exports.ZodBase64URL, params);
	}
	exports.ZodE164 = core.$constructor("ZodE164", (inst, def) => {
		core.$ZodE164.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function e164(params) {
		return core._e164(exports.ZodE164, params);
	}
	exports.ZodJWT = core.$constructor("ZodJWT", (inst, def) => {
		core.$ZodJWT.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function jwt(params) {
		return core._jwt(exports.ZodJWT, params);
	}
	exports.ZodCustomStringFormat = core.$constructor("ZodCustomStringFormat", (inst, def) => {
		core.$ZodCustomStringFormat.init(inst, def);
		exports.ZodStringFormat.init(inst, def);
	});
	function stringFormat(format, fnOrRegex, _params = {}) {
		return core._stringFormat(exports.ZodCustomStringFormat, format, fnOrRegex, _params);
	}
	function hostname(_params) {
		return core._stringFormat(exports.ZodCustomStringFormat, "hostname", core.regexes.hostname, _params);
	}
	function hex(_params) {
		return core._stringFormat(exports.ZodCustomStringFormat, "hex", core.regexes.hex, _params);
	}
	function hash(alg, params) {
		const format = `${alg}_${params?.enc ?? "hex"}`;
		const regex = core.regexes[format];
		if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
		return core._stringFormat(exports.ZodCustomStringFormat, format, regex, params);
	}
	exports.ZodNumber = core.$constructor("ZodNumber", (inst, def) => {
		core.$ZodNumber.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.numberProcessor(inst, ctx, json, params);
		_installLazyMethods(inst, "ZodNumber", {
			gt(value, params) {
				return this.check(checks.gt(value, params));
			},
			gte(value, params) {
				return this.check(checks.gte(value, params));
			},
			min(value, params) {
				return this.check(checks.gte(value, params));
			},
			lt(value, params) {
				return this.check(checks.lt(value, params));
			},
			lte(value, params) {
				return this.check(checks.lte(value, params));
			},
			max(value, params) {
				return this.check(checks.lte(value, params));
			},
			int(params) {
				return this.check(int(params));
			},
			safe(params) {
				return this.check(int(params));
			},
			positive(params) {
				return this.check(checks.gt(0, params));
			},
			nonnegative(params) {
				return this.check(checks.gte(0, params));
			},
			negative(params) {
				return this.check(checks.lt(0, params));
			},
			nonpositive(params) {
				return this.check(checks.lte(0, params));
			},
			multipleOf(value, params) {
				return this.check(checks.multipleOf(value, params));
			},
			step(value, params) {
				return this.check(checks.multipleOf(value, params));
			},
			finite() {
				return this;
			}
		});
		const bag = inst._zod.bag;
		inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
		inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
		inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
		inst.isFinite = true;
		inst.format = bag.format ?? null;
	});
	function number(params) {
		return core._number(exports.ZodNumber, params);
	}
	exports.ZodNumberFormat = core.$constructor("ZodNumberFormat", (inst, def) => {
		core.$ZodNumberFormat.init(inst, def);
		exports.ZodNumber.init(inst, def);
	});
	function int(params) {
		return core._int(exports.ZodNumberFormat, params);
	}
	function float32(params) {
		return core._float32(exports.ZodNumberFormat, params);
	}
	function float64(params) {
		return core._float64(exports.ZodNumberFormat, params);
	}
	function int32(params) {
		return core._int32(exports.ZodNumberFormat, params);
	}
	function uint32(params) {
		return core._uint32(exports.ZodNumberFormat, params);
	}
	exports.ZodBoolean = core.$constructor("ZodBoolean", (inst, def) => {
		core.$ZodBoolean.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.booleanProcessor(inst, ctx, json, params);
	});
	function boolean(params) {
		return core._boolean(exports.ZodBoolean, params);
	}
	exports.ZodBigInt = core.$constructor("ZodBigInt", (inst, def) => {
		core.$ZodBigInt.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.bigintProcessor(inst, ctx, json, params);
		inst.gte = (value, params) => inst.check(checks.gte(value, params));
		inst.min = (value, params) => inst.check(checks.gte(value, params));
		inst.gt = (value, params) => inst.check(checks.gt(value, params));
		inst.gte = (value, params) => inst.check(checks.gte(value, params));
		inst.min = (value, params) => inst.check(checks.gte(value, params));
		inst.lt = (value, params) => inst.check(checks.lt(value, params));
		inst.lte = (value, params) => inst.check(checks.lte(value, params));
		inst.max = (value, params) => inst.check(checks.lte(value, params));
		inst.positive = (params) => inst.check(checks.gt(BigInt(0), params));
		inst.negative = (params) => inst.check(checks.lt(BigInt(0), params));
		inst.nonpositive = (params) => inst.check(checks.lte(BigInt(0), params));
		inst.nonnegative = (params) => inst.check(checks.gte(BigInt(0), params));
		inst.multipleOf = (value, params) => inst.check(checks.multipleOf(value, params));
		const bag = inst._zod.bag;
		inst.minValue = bag.minimum ?? null;
		inst.maxValue = bag.maximum ?? null;
		inst.format = bag.format ?? null;
	});
	function bigint(params) {
		return core._bigint(exports.ZodBigInt, params);
	}
	exports.ZodBigIntFormat = core.$constructor("ZodBigIntFormat", (inst, def) => {
		core.$ZodBigIntFormat.init(inst, def);
		exports.ZodBigInt.init(inst, def);
	});
	function int64(params) {
		return core._int64(exports.ZodBigIntFormat, params);
	}
	function uint64(params) {
		return core._uint64(exports.ZodBigIntFormat, params);
	}
	exports.ZodSymbol = core.$constructor("ZodSymbol", (inst, def) => {
		core.$ZodSymbol.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.symbolProcessor(inst, ctx, json, params);
	});
	function symbol(params) {
		return core._symbol(exports.ZodSymbol, params);
	}
	exports.ZodUndefined = core.$constructor("ZodUndefined", (inst, def) => {
		core.$ZodUndefined.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.undefinedProcessor(inst, ctx, json, params);
	});
	function _undefined(params) {
		return core._undefined(exports.ZodUndefined, params);
	}
	exports.ZodNull = core.$constructor("ZodNull", (inst, def) => {
		core.$ZodNull.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.nullProcessor(inst, ctx, json, params);
	});
	function _null(params) {
		return core._null(exports.ZodNull, params);
	}
	exports.ZodAny = core.$constructor("ZodAny", (inst, def) => {
		core.$ZodAny.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.anyProcessor(inst, ctx, json, params);
	});
	function any() {
		return core._any(exports.ZodAny);
	}
	exports.ZodUnknown = core.$constructor("ZodUnknown", (inst, def) => {
		core.$ZodUnknown.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.unknownProcessor(inst, ctx, json, params);
	});
	function unknown() {
		return core._unknown(exports.ZodUnknown);
	}
	exports.ZodNever = core.$constructor("ZodNever", (inst, def) => {
		core.$ZodNever.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.neverProcessor(inst, ctx, json, params);
	});
	function never(params) {
		return core._never(exports.ZodNever, params);
	}
	exports.ZodVoid = core.$constructor("ZodVoid", (inst, def) => {
		core.$ZodVoid.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.voidProcessor(inst, ctx, json, params);
	});
	function _void(params) {
		return core._void(exports.ZodVoid, params);
	}
	exports.ZodDate = core.$constructor("ZodDate", (inst, def) => {
		core.$ZodDate.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.dateProcessor(inst, ctx, json, params);
		inst.min = (value, params) => inst.check(checks.gte(value, params));
		inst.max = (value, params) => inst.check(checks.lte(value, params));
		const c = inst._zod.bag;
		inst.minDate = c.minimum ? new Date(c.minimum) : null;
		inst.maxDate = c.maximum ? new Date(c.maximum) : null;
	});
	function date(params) {
		return core._date(exports.ZodDate, params);
	}
	exports.ZodArray = core.$constructor("ZodArray", (inst, def) => {
		core.$ZodArray.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.arrayProcessor(inst, ctx, json, params);
		inst.element = def.element;
		_installLazyMethods(inst, "ZodArray", {
			min(n, params) {
				return this.check(checks.minLength(n, params));
			},
			nonempty(params) {
				return this.check(checks.minLength(1, params));
			},
			max(n, params) {
				return this.check(checks.maxLength(n, params));
			},
			length(n, params) {
				return this.check(checks.length(n, params));
			},
			unwrap() {
				return this.element;
			}
		});
	});
	function array(element, params) {
		return core._array(exports.ZodArray, element, params);
	}
	function keyof(schema) {
		const shape = schema._zod.def.shape;
		return _enum(Object.keys(shape));
	}
	exports.ZodObject = core.$constructor("ZodObject", (inst, def) => {
		core.$ZodObjectJIT.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.objectProcessor(inst, ctx, json, params);
		index_js_1.util.defineLazy(inst, "shape", () => {
			return def.shape;
		});
		_installLazyMethods(inst, "ZodObject", {
			keyof() {
				return _enum(Object.keys(this._zod.def.shape));
			},
			catchall(catchall) {
				return this.clone({
					...this._zod.def,
					catchall
				});
			},
			passthrough() {
				return this.clone({
					...this._zod.def,
					catchall: unknown()
				});
			},
			loose() {
				return this.clone({
					...this._zod.def,
					catchall: unknown()
				});
			},
			strict() {
				return this.clone({
					...this._zod.def,
					catchall: never()
				});
			},
			strip() {
				return this.clone({
					...this._zod.def,
					catchall: void 0
				});
			},
			extend(incoming) {
				return index_js_1.util.extend(this, incoming);
			},
			safeExtend(incoming) {
				return index_js_1.util.safeExtend(this, incoming);
			},
			merge(other) {
				return index_js_1.util.merge(this, other);
			},
			pick(mask) {
				return index_js_1.util.pick(this, mask);
			},
			omit(mask) {
				return index_js_1.util.omit(this, mask);
			},
			partial(...args) {
				return index_js_1.util.partial(exports.ZodOptional, this, args[0]);
			},
			required(...args) {
				return index_js_1.util.required(exports.ZodNonOptional, this, args[0]);
			}
		});
	});
	function object(shape, params) {
		const def = {
			type: "object",
			shape: shape ?? {},
			...index_js_1.util.normalizeParams(params)
		};
		return new exports.ZodObject(def);
	}
	function strictObject(shape, params) {
		return new exports.ZodObject({
			type: "object",
			shape,
			catchall: never(),
			...index_js_1.util.normalizeParams(params)
		});
	}
	function looseObject(shape, params) {
		return new exports.ZodObject({
			type: "object",
			shape,
			catchall: unknown(),
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodUnion = core.$constructor("ZodUnion", (inst, def) => {
		core.$ZodUnion.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
		inst.options = def.options;
	});
	function union(options, params) {
		return new exports.ZodUnion({
			type: "union",
			options,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodXor = core.$constructor("ZodXor", (inst, def) => {
		exports.ZodUnion.init(inst, def);
		core.$ZodXor.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
		inst.options = def.options;
	});
	/** Creates an exclusive union (XOR) where exactly one option must match.
	* Unlike regular unions that succeed when any option matches, xor fails if
	* zero or more than one option matches the input. */
	function xor(options, params) {
		return new exports.ZodXor({
			type: "union",
			options,
			inclusive: false,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodDiscriminatedUnion = core.$constructor("ZodDiscriminatedUnion", (inst, def) => {
		exports.ZodUnion.init(inst, def);
		core.$ZodDiscriminatedUnion.init(inst, def);
	});
	function discriminatedUnion(discriminator, options, params) {
		return new exports.ZodDiscriminatedUnion({
			type: "union",
			options,
			discriminator,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodIntersection = core.$constructor("ZodIntersection", (inst, def) => {
		core.$ZodIntersection.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.intersectionProcessor(inst, ctx, json, params);
	});
	function intersection(left, right) {
		return new exports.ZodIntersection({
			type: "intersection",
			left,
			right
		});
	}
	exports.ZodTuple = core.$constructor("ZodTuple", (inst, def) => {
		core.$ZodTuple.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.tupleProcessor(inst, ctx, json, params);
		inst.rest = (rest) => inst.clone({
			...inst._zod.def,
			rest
		});
	});
	function tuple(items, _paramsOrRest, _params) {
		const hasRest = _paramsOrRest instanceof core.$ZodType;
		const params = hasRest ? _params : _paramsOrRest;
		const rest = hasRest ? _paramsOrRest : null;
		return new exports.ZodTuple({
			type: "tuple",
			items,
			rest,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodRecord = core.$constructor("ZodRecord", (inst, def) => {
		core.$ZodRecord.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.recordProcessor(inst, ctx, json, params);
		inst.keyType = def.keyType;
		inst.valueType = def.valueType;
	});
	function record(keyType, valueType, params) {
		if (!valueType || !valueType._zod) return new exports.ZodRecord({
			type: "record",
			keyType: string(),
			valueType: keyType,
			...index_js_1.util.normalizeParams(valueType)
		});
		return new exports.ZodRecord({
			type: "record",
			keyType,
			valueType,
			...index_js_1.util.normalizeParams(params)
		});
	}
	function partialRecord(keyType, valueType, params) {
		const k = core.clone(keyType);
		k._zod.values = void 0;
		return new exports.ZodRecord({
			type: "record",
			keyType: k,
			valueType,
			...index_js_1.util.normalizeParams(params)
		});
	}
	function looseRecord(keyType, valueType, params) {
		return new exports.ZodRecord({
			type: "record",
			keyType,
			valueType,
			mode: "loose",
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodMap = core.$constructor("ZodMap", (inst, def) => {
		core.$ZodMap.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.mapProcessor(inst, ctx, json, params);
		inst.keyType = def.keyType;
		inst.valueType = def.valueType;
		inst.min = (...args) => inst.check(core._minSize(...args));
		inst.nonempty = (params) => inst.check(core._minSize(1, params));
		inst.max = (...args) => inst.check(core._maxSize(...args));
		inst.size = (...args) => inst.check(core._size(...args));
	});
	function map(keyType, valueType, params) {
		return new exports.ZodMap({
			type: "map",
			keyType,
			valueType,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodSet = core.$constructor("ZodSet", (inst, def) => {
		core.$ZodSet.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.setProcessor(inst, ctx, json, params);
		inst.min = (...args) => inst.check(core._minSize(...args));
		inst.nonempty = (params) => inst.check(core._minSize(1, params));
		inst.max = (...args) => inst.check(core._maxSize(...args));
		inst.size = (...args) => inst.check(core._size(...args));
	});
	function set(valueType, params) {
		return new exports.ZodSet({
			type: "set",
			valueType,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodEnum = core.$constructor("ZodEnum", (inst, def) => {
		core.$ZodEnum.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.enumProcessor(inst, ctx, json, params);
		inst.enum = def.entries;
		inst.options = Object.values(def.entries);
		const keys = new Set(Object.keys(def.entries));
		inst.extract = (values, params) => {
			const newEntries = {};
			for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new exports.ZodEnum({
				...def,
				checks: [],
				...index_js_1.util.normalizeParams(params),
				entries: newEntries
			});
		};
		inst.exclude = (values, params) => {
			const newEntries = { ...def.entries };
			for (const value of values) if (keys.has(value)) delete newEntries[value];
			else throw new Error(`Key ${value} not found in enum`);
			return new exports.ZodEnum({
				...def,
				checks: [],
				...index_js_1.util.normalizeParams(params),
				entries: newEntries
			});
		};
	});
	function _enum(values, params) {
		const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
		return new exports.ZodEnum({
			type: "enum",
			entries,
			...index_js_1.util.normalizeParams(params)
		});
	}
	/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
	*
	* ```ts
	* enum Colors { red, green, blue }
	* z.enum(Colors);
	* ```
	*/
	function nativeEnum(entries, params) {
		return new exports.ZodEnum({
			type: "enum",
			entries,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodLiteral = core.$constructor("ZodLiteral", (inst, def) => {
		core.$ZodLiteral.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.literalProcessor(inst, ctx, json, params);
		inst.values = new Set(def.values);
		Object.defineProperty(inst, "value", { get() {
			if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return def.values[0];
		} });
	});
	function literal(value, params) {
		return new exports.ZodLiteral({
			type: "literal",
			values: Array.isArray(value) ? value : [value],
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodFile = core.$constructor("ZodFile", (inst, def) => {
		core.$ZodFile.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.fileProcessor(inst, ctx, json, params);
		inst.min = (size, params) => inst.check(core._minSize(size, params));
		inst.max = (size, params) => inst.check(core._maxSize(size, params));
		inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
	});
	function file(params) {
		return core._file(exports.ZodFile, params);
	}
	exports.ZodTransform = core.$constructor("ZodTransform", (inst, def) => {
		core.$ZodTransform.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.transformProcessor(inst, ctx, json, params);
		inst._zod.parse = (payload, _ctx) => {
			if (_ctx.direction === "backward") throw new core.$ZodEncodeError(inst.constructor.name);
			payload.addIssue = (issue) => {
				if (typeof issue === "string") payload.issues.push(index_js_1.util.issue(issue, payload.value, def));
				else {
					const _issue = issue;
					if (_issue.fatal) _issue.continue = false;
					_issue.code ?? (_issue.code = "custom");
					_issue.input ?? (_issue.input = payload.value);
					_issue.inst ?? (_issue.inst = inst);
					payload.issues.push(index_js_1.util.issue(_issue));
				}
			};
			const output = def.transform(payload.value, payload);
			if (output instanceof Promise) return output.then((output) => {
				payload.value = output;
				payload.fallback = true;
				return payload;
			});
			payload.value = output;
			payload.fallback = true;
			return payload;
		};
	});
	function transform(fn) {
		return new exports.ZodTransform({
			type: "transform",
			transform: fn
		});
	}
	exports.ZodOptional = core.$constructor("ZodOptional", (inst, def) => {
		core.$ZodOptional.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function optional(innerType) {
		return new exports.ZodOptional({
			type: "optional",
			innerType
		});
	}
	exports.ZodExactOptional = core.$constructor("ZodExactOptional", (inst, def) => {
		core.$ZodExactOptional.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function exactOptional(innerType) {
		return new exports.ZodExactOptional({
			type: "optional",
			innerType
		});
	}
	exports.ZodNullable = core.$constructor("ZodNullable", (inst, def) => {
		core.$ZodNullable.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.nullableProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function nullable(innerType) {
		return new exports.ZodNullable({
			type: "nullable",
			innerType
		});
	}
	function nullish(innerType) {
		return optional(nullable(innerType));
	}
	exports.ZodDefault = core.$constructor("ZodDefault", (inst, def) => {
		core.$ZodDefault.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.defaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeDefault = inst.unwrap;
	});
	function _default(innerType, defaultValue) {
		return new exports.ZodDefault({
			type: "default",
			innerType,
			get defaultValue() {
				return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
			}
		});
	}
	exports.ZodPrefault = core.$constructor("ZodPrefault", (inst, def) => {
		core.$ZodPrefault.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.prefaultProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function prefault(innerType, defaultValue) {
		return new exports.ZodPrefault({
			type: "prefault",
			innerType,
			get defaultValue() {
				return typeof defaultValue === "function" ? defaultValue() : index_js_1.util.shallowClone(defaultValue);
			}
		});
	}
	exports.ZodNonOptional = core.$constructor("ZodNonOptional", (inst, def) => {
		core.$ZodNonOptional.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.nonoptionalProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function nonoptional(innerType, params) {
		return new exports.ZodNonOptional({
			type: "nonoptional",
			innerType,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodSuccess = core.$constructor("ZodSuccess", (inst, def) => {
		core.$ZodSuccess.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.successProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function success(innerType) {
		return new exports.ZodSuccess({
			type: "success",
			innerType
		});
	}
	exports.ZodCatch = core.$constructor("ZodCatch", (inst, def) => {
		core.$ZodCatch.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.catchProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
		inst.removeCatch = inst.unwrap;
	});
	function _catch(innerType, catchValue) {
		return new exports.ZodCatch({
			type: "catch",
			innerType,
			catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
		});
	}
	exports.ZodNaN = core.$constructor("ZodNaN", (inst, def) => {
		core.$ZodNaN.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.nanProcessor(inst, ctx, json, params);
	});
	function nan(params) {
		return core._nan(exports.ZodNaN, params);
	}
	exports.ZodPipe = core.$constructor("ZodPipe", (inst, def) => {
		core.$ZodPipe.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.pipeProcessor(inst, ctx, json, params);
		inst.in = def.in;
		inst.out = def.out;
	});
	function pipe(in_, out) {
		return new exports.ZodPipe({
			type: "pipe",
			in: in_,
			out
		});
	}
	exports.ZodCodec = core.$constructor("ZodCodec", (inst, def) => {
		exports.ZodPipe.init(inst, def);
		core.$ZodCodec.init(inst, def);
	});
	function codec(in_, out, params) {
		return new exports.ZodCodec({
			type: "pipe",
			in: in_,
			out,
			transform: params.decode,
			reverseTransform: params.encode
		});
	}
	function invertCodec(codec) {
		const def = codec._zod.def;
		return new exports.ZodCodec({
			type: "pipe",
			in: def.out,
			out: def.in,
			transform: def.reverseTransform,
			reverseTransform: def.transform
		});
	}
	exports.ZodPreprocess = core.$constructor("ZodPreprocess", (inst, def) => {
		exports.ZodPipe.init(inst, def);
		core.$ZodPreprocess.init(inst, def);
	});
	exports.ZodReadonly = core.$constructor("ZodReadonly", (inst, def) => {
		core.$ZodReadonly.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.readonlyProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function readonly(innerType) {
		return new exports.ZodReadonly({
			type: "readonly",
			innerType
		});
	}
	exports.ZodTemplateLiteral = core.$constructor("ZodTemplateLiteral", (inst, def) => {
		core.$ZodTemplateLiteral.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.templateLiteralProcessor(inst, ctx, json, params);
	});
	function templateLiteral(parts, params) {
		return new exports.ZodTemplateLiteral({
			type: "template_literal",
			parts,
			...index_js_1.util.normalizeParams(params)
		});
	}
	exports.ZodLazy = core.$constructor("ZodLazy", (inst, def) => {
		core.$ZodLazy.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.lazyProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.getter();
	});
	function lazy(getter) {
		return new exports.ZodLazy({
			type: "lazy",
			getter
		});
	}
	exports.ZodPromise = core.$constructor("ZodPromise", (inst, def) => {
		core.$ZodPromise.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.promiseProcessor(inst, ctx, json, params);
		inst.unwrap = () => inst._zod.def.innerType;
	});
	function promise(innerType) {
		return new exports.ZodPromise({
			type: "promise",
			innerType
		});
	}
	exports.ZodFunction = core.$constructor("ZodFunction", (inst, def) => {
		core.$ZodFunction.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.functionProcessor(inst, ctx, json, params);
	});
	function _function(params) {
		return new exports.ZodFunction({
			type: "function",
			input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
			output: params?.output ?? unknown()
		});
	}
	exports.ZodCustom = core.$constructor("ZodCustom", (inst, def) => {
		core.$ZodCustom.init(inst, def);
		exports.ZodType.init(inst, def);
		inst._zod.processJSONSchema = (ctx, json, params) => processors.customProcessor(inst, ctx, json, params);
	});
	function check(fn) {
		const ch = new core.$ZodCheck({ check: "custom" });
		ch._zod.check = fn;
		return ch;
	}
	function custom(fn, _params) {
		return core._custom(exports.ZodCustom, fn ?? (() => true), _params);
	}
	function refine(fn, _params = {}) {
		return core._refine(exports.ZodCustom, fn, _params);
	}
	function superRefine(fn, params) {
		return core._superRefine(fn, params);
	}
	exports.describe = core.describe;
	exports.meta = core.meta;
	function _instanceof(cls, params = {}) {
		const inst = new exports.ZodCustom({
			type: "custom",
			check: "custom",
			fn: (data) => data instanceof cls,
			abort: true,
			...index_js_1.util.normalizeParams(params)
		});
		inst._zod.bag.Class = cls;
		inst._zod.check = (payload) => {
			if (!(payload.value instanceof cls)) payload.issues.push({
				code: "invalid_type",
				expected: cls.name,
				input: payload.value,
				inst,
				path: [...inst._zod.def.path ?? []]
			});
		};
		return inst;
	}
	var stringbool = (...args) => core._stringbool({
		Codec: exports.ZodCodec,
		Boolean: exports.ZodBoolean,
		String: exports.ZodString
	}, ...args);
	exports.stringbool = stringbool;
	function json(params) {
		const jsonSchema = lazy(() => {
			return union([
				string(params),
				number(),
				boolean(),
				_null(),
				array(jsonSchema),
				record(string(), jsonSchema)
			]);
		});
		return jsonSchema;
	}
	function preprocess(fn, schema) {
		return new exports.ZodPreprocess({
			type: "pipe",
			in: transform(fn),
			out: schema
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/compat.cjs
var require_compat = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ZodFirstPartyTypeKind = exports.config = exports.$brand = exports.ZodIssueCode = void 0;
	exports.setErrorMap = setErrorMap;
	exports.getErrorMap = getErrorMap;
	var core = __importStar(require_core());
	/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
	exports.ZodIssueCode = {
		invalid_type: "invalid_type",
		too_big: "too_big",
		too_small: "too_small",
		invalid_format: "invalid_format",
		not_multiple_of: "not_multiple_of",
		unrecognized_keys: "unrecognized_keys",
		invalid_union: "invalid_union",
		invalid_key: "invalid_key",
		invalid_element: "invalid_element",
		invalid_value: "invalid_value",
		custom: "custom"
	};
	var index_js_1 = require_core();
	Object.defineProperty(exports, "$brand", {
		enumerable: true,
		get: function() {
			return index_js_1.$brand;
		}
	});
	Object.defineProperty(exports, "config", {
		enumerable: true,
		get: function() {
			return index_js_1.config;
		}
	});
	/** @deprecated Use `z.config(params)` instead. */
	function setErrorMap(map) {
		core.config({ customError: map });
	}
	/** @deprecated Use `z.config()` instead. */
	function getErrorMap() {
		return core.config().customError;
	}
	/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
	var ZodFirstPartyTypeKind;
	ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/from-json-schema.cjs
var require_from_json_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fromJSONSchema = fromJSONSchema;
	var registries_js_1 = require_registries();
	var _checks = __importStar(require_checks());
	var _iso = __importStar(require_iso());
	var z = {
		...__importStar(require_schemas()),
		..._checks,
		iso: _iso
	};
	var RECOGNIZED_KEYS = /*@__PURE__*/ new Set([
		"$schema",
		"$ref",
		"$defs",
		"definitions",
		"$id",
		"id",
		"$comment",
		"$anchor",
		"$vocabulary",
		"$dynamicRef",
		"$dynamicAnchor",
		"type",
		"enum",
		"const",
		"anyOf",
		"oneOf",
		"allOf",
		"not",
		"properties",
		"required",
		"additionalProperties",
		"patternProperties",
		"propertyNames",
		"minProperties",
		"maxProperties",
		"items",
		"prefixItems",
		"additionalItems",
		"minItems",
		"maxItems",
		"uniqueItems",
		"contains",
		"minContains",
		"maxContains",
		"minLength",
		"maxLength",
		"pattern",
		"format",
		"minimum",
		"maximum",
		"exclusiveMinimum",
		"exclusiveMaximum",
		"multipleOf",
		"description",
		"default",
		"contentEncoding",
		"contentMediaType",
		"contentSchema",
		"unevaluatedItems",
		"unevaluatedProperties",
		"if",
		"then",
		"else",
		"dependentSchemas",
		"dependentRequired",
		"nullable",
		"readOnly"
	]);
	function detectVersion(schema, defaultTarget) {
		const $schema = schema.$schema;
		if ($schema === "https://json-schema.org/draft/2020-12/schema") return "draft-2020-12";
		if ($schema === "http://json-schema.org/draft-07/schema#") return "draft-7";
		if ($schema === "http://json-schema.org/draft-04/schema#") return "draft-4";
		return defaultTarget ?? "draft-2020-12";
	}
	function resolveRef(ref, ctx) {
		if (!ref.startsWith("#")) throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
		const path = ref.slice(1).split("/").filter(Boolean);
		if (path.length === 0) return ctx.rootSchema;
		const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
		if (path[0] === defsKey) {
			const key = path[1];
			if (!key || !ctx.defs[key]) throw new Error(`Reference not found: ${ref}`);
			return ctx.defs[key];
		}
		throw new Error(`Reference not found: ${ref}`);
	}
	function convertBaseSchema(schema, ctx) {
		if (schema.not !== void 0) {
			if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) return z.never();
			throw new Error("not is not supported in Zod (except { not: {} } for never)");
		}
		if (schema.unevaluatedItems !== void 0) throw new Error("unevaluatedItems is not supported");
		if (schema.unevaluatedProperties !== void 0) throw new Error("unevaluatedProperties is not supported");
		if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) throw new Error("Conditional schemas (if/then/else) are not supported");
		if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) throw new Error("dependentSchemas and dependentRequired are not supported");
		if (schema.$ref) {
			const refPath = schema.$ref;
			if (ctx.refs.has(refPath)) return ctx.refs.get(refPath);
			if (ctx.processing.has(refPath)) return z.lazy(() => {
				if (!ctx.refs.has(refPath)) throw new Error(`Circular reference not resolved: ${refPath}`);
				return ctx.refs.get(refPath);
			});
			ctx.processing.add(refPath);
			const zodSchema = convertSchema(resolveRef(refPath, ctx), ctx);
			ctx.refs.set(refPath, zodSchema);
			ctx.processing.delete(refPath);
			return zodSchema;
		}
		if (schema.enum !== void 0) {
			const enumValues = schema.enum;
			if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) return z.null();
			if (enumValues.length === 0) return z.never();
			if (enumValues.length === 1) return z.literal(enumValues[0]);
			if (enumValues.every((v) => typeof v === "string")) return z.enum(enumValues);
			const literalSchemas = enumValues.map((v) => z.literal(v));
			if (literalSchemas.length < 2) return literalSchemas[0];
			return z.union([
				literalSchemas[0],
				literalSchemas[1],
				...literalSchemas.slice(2)
			]);
		}
		if (schema.const !== void 0) return z.literal(schema.const);
		const type = schema.type;
		if (Array.isArray(type)) {
			const typeSchemas = type.map((t) => {
				return convertBaseSchema({
					...schema,
					type: t
				}, ctx);
			});
			if (typeSchemas.length === 0) return z.never();
			if (typeSchemas.length === 1) return typeSchemas[0];
			return z.union(typeSchemas);
		}
		if (!type) return z.any();
		let zodSchema;
		switch (type) {
			case "string": {
				let stringSchema = z.string();
				if (schema.format) {
					const format = schema.format;
					if (format === "email") stringSchema = stringSchema.check(z.email());
					else if (format === "uri" || format === "uri-reference") stringSchema = stringSchema.check(z.url());
					else if (format === "uuid" || format === "guid") stringSchema = stringSchema.check(z.uuid());
					else if (format === "date-time") stringSchema = stringSchema.check(z.iso.datetime());
					else if (format === "date") stringSchema = stringSchema.check(z.iso.date());
					else if (format === "time") stringSchema = stringSchema.check(z.iso.time());
					else if (format === "duration") stringSchema = stringSchema.check(z.iso.duration());
					else if (format === "ipv4") stringSchema = stringSchema.check(z.ipv4());
					else if (format === "ipv6") stringSchema = stringSchema.check(z.ipv6());
					else if (format === "mac") stringSchema = stringSchema.check(z.mac());
					else if (format === "cidr") stringSchema = stringSchema.check(z.cidrv4());
					else if (format === "cidr-v6") stringSchema = stringSchema.check(z.cidrv6());
					else if (format === "base64") stringSchema = stringSchema.check(z.base64());
					else if (format === "base64url") stringSchema = stringSchema.check(z.base64url());
					else if (format === "e164") stringSchema = stringSchema.check(z.e164());
					else if (format === "jwt") stringSchema = stringSchema.check(z.jwt());
					else if (format === "emoji") stringSchema = stringSchema.check(z.emoji());
					else if (format === "nanoid") stringSchema = stringSchema.check(z.nanoid());
					else if (format === "cuid") stringSchema = stringSchema.check(z.cuid());
					else if (format === "cuid2") stringSchema = stringSchema.check(z.cuid2());
					else if (format === "ulid") stringSchema = stringSchema.check(z.ulid());
					else if (format === "xid") stringSchema = stringSchema.check(z.xid());
					else if (format === "ksuid") stringSchema = stringSchema.check(z.ksuid());
				}
				if (typeof schema.minLength === "number") stringSchema = stringSchema.min(schema.minLength);
				if (typeof schema.maxLength === "number") stringSchema = stringSchema.max(schema.maxLength);
				if (schema.pattern) stringSchema = stringSchema.regex(new RegExp(schema.pattern));
				zodSchema = stringSchema;
				break;
			}
			case "number":
			case "integer": {
				let numberSchema = type === "integer" ? z.number().int() : z.number();
				if (typeof schema.minimum === "number") numberSchema = numberSchema.min(schema.minimum);
				if (typeof schema.maximum === "number") numberSchema = numberSchema.max(schema.maximum);
				if (typeof schema.exclusiveMinimum === "number") numberSchema = numberSchema.gt(schema.exclusiveMinimum);
				else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") numberSchema = numberSchema.gt(schema.minimum);
				if (typeof schema.exclusiveMaximum === "number") numberSchema = numberSchema.lt(schema.exclusiveMaximum);
				else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") numberSchema = numberSchema.lt(schema.maximum);
				if (typeof schema.multipleOf === "number") numberSchema = numberSchema.multipleOf(schema.multipleOf);
				zodSchema = numberSchema;
				break;
			}
			case "boolean":
				zodSchema = z.boolean();
				break;
			case "null":
				zodSchema = z.null();
				break;
			case "object": {
				const shape = {};
				const properties = schema.properties || {};
				const requiredSet = new Set(schema.required || []);
				for (const [key, propSchema] of Object.entries(properties)) {
					const propZodSchema = convertSchema(propSchema, ctx);
					shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
				}
				if (schema.propertyNames) {
					const keySchema = convertSchema(schema.propertyNames, ctx);
					const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
					if (Object.keys(shape).length === 0) {
						zodSchema = z.record(keySchema, valueSchema);
						break;
					}
					const objectSchema = z.object(shape).passthrough();
					const recordSchema = z.looseRecord(keySchema, valueSchema);
					zodSchema = z.intersection(objectSchema, recordSchema);
					break;
				}
				if (schema.patternProperties) {
					const patternProps = schema.patternProperties;
					const patternKeys = Object.keys(patternProps);
					const looseRecords = [];
					for (const pattern of patternKeys) {
						const patternValue = convertSchema(patternProps[pattern], ctx);
						const keySchema = z.string().regex(new RegExp(pattern));
						looseRecords.push(z.looseRecord(keySchema, patternValue));
					}
					const schemasToIntersect = [];
					if (Object.keys(shape).length > 0) schemasToIntersect.push(z.object(shape).passthrough());
					schemasToIntersect.push(...looseRecords);
					if (schemasToIntersect.length === 0) zodSchema = z.object({}).passthrough();
					else if (schemasToIntersect.length === 1) zodSchema = schemasToIntersect[0];
					else {
						let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
						for (let i = 2; i < schemasToIntersect.length; i++) result = z.intersection(result, schemasToIntersect[i]);
						zodSchema = result;
					}
					break;
				}
				const objectSchema = z.object(shape);
				if (schema.additionalProperties === false) zodSchema = objectSchema.strict();
				else if (typeof schema.additionalProperties === "object") zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
				else zodSchema = objectSchema.passthrough();
				break;
			}
			case "array": {
				const prefixItems = schema.prefixItems;
				const items = schema.items;
				if (prefixItems && Array.isArray(prefixItems)) {
					const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
					const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
					if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
					else zodSchema = z.tuple(tupleItems);
					if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
					if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
				} else if (Array.isArray(items)) {
					const tupleItems = items.map((item) => convertSchema(item, ctx));
					const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
					if (rest) zodSchema = z.tuple(tupleItems).rest(rest);
					else zodSchema = z.tuple(tupleItems);
					if (typeof schema.minItems === "number") zodSchema = zodSchema.check(z.minLength(schema.minItems));
					if (typeof schema.maxItems === "number") zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
				} else if (items !== void 0) {
					const element = convertSchema(items, ctx);
					let arraySchema = z.array(element);
					if (typeof schema.minItems === "number") arraySchema = arraySchema.min(schema.minItems);
					if (typeof schema.maxItems === "number") arraySchema = arraySchema.max(schema.maxItems);
					zodSchema = arraySchema;
				} else zodSchema = z.array(z.any());
				break;
			}
			default: throw new Error(`Unsupported type: ${type}`);
		}
		return zodSchema;
	}
	function convertSchema(schema, ctx) {
		if (typeof schema === "boolean") return schema ? z.any() : z.never();
		let baseSchema = convertBaseSchema(schema, ctx);
		const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
		if (schema.anyOf && Array.isArray(schema.anyOf)) {
			const options = schema.anyOf.map((s) => convertSchema(s, ctx));
			const anyOfUnion = z.union(options);
			baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
		}
		if (schema.oneOf && Array.isArray(schema.oneOf)) {
			const options = schema.oneOf.map((s) => convertSchema(s, ctx));
			const oneOfUnion = z.xor(options);
			baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
		}
		if (schema.allOf && Array.isArray(schema.allOf)) {
			if (schema.allOf.length === 0) baseSchema = hasExplicitType ? baseSchema : z.any();
			else {
				let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
				const startIdx = hasExplicitType ? 0 : 1;
				for (let i = startIdx; i < schema.allOf.length; i++) result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
				baseSchema = result;
			}
		}
		if (schema.nullable === true && ctx.version === "openapi-3.0") baseSchema = z.nullable(baseSchema);
		if (schema.readOnly === true) baseSchema = z.readonly(baseSchema);
		if (schema.default !== void 0) baseSchema = baseSchema.default(schema.default);
		const extraMeta = {};
		for (const key of [
			"$id",
			"id",
			"$comment",
			"$anchor",
			"$vocabulary",
			"$dynamicRef",
			"$dynamicAnchor"
		]) if (key in schema) extraMeta[key] = schema[key];
		for (const key of [
			"contentEncoding",
			"contentMediaType",
			"contentSchema"
		]) if (key in schema) extraMeta[key] = schema[key];
		for (const key of Object.keys(schema)) if (!RECOGNIZED_KEYS.has(key)) extraMeta[key] = schema[key];
		if (Object.keys(extraMeta).length > 0) ctx.registry.add(baseSchema, extraMeta);
		if (schema.description) baseSchema = baseSchema.describe(schema.description);
		return baseSchema;
	}
	/**
	* Converts a JSON Schema to a Zod schema. This function should be considered semi-experimental. It's behavior is liable to change. */
	function fromJSONSchema(schema, params) {
		if (typeof schema === "boolean") return schema ? z.any() : z.never();
		let normalized;
		try {
			normalized = JSON.parse(JSON.stringify(schema));
		} catch {
			throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
		}
		const ctx = {
			version: detectVersion(normalized, params?.defaultTarget),
			defs: normalized.$defs || normalized.definitions || {},
			refs: /* @__PURE__ */ new Map(),
			processing: /* @__PURE__ */ new Set(),
			rootSchema: normalized,
			registry: params?.registry ?? registries_js_1.globalRegistry
		};
		return convertSchema(normalized, ctx);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/coerce.cjs
var require_coerce = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.string = string;
	exports.number = number;
	exports.boolean = boolean;
	exports.bigint = bigint;
	exports.date = date;
	var core = __importStar(require_core());
	var schemas = __importStar(require_schemas());
	function string(params) {
		return core._coercedString(schemas.ZodString, params);
	}
	function number(params) {
		return core._coercedNumber(schemas.ZodNumber, params);
	}
	function boolean(params) {
		return core._coercedBoolean(schemas.ZodBoolean, params);
	}
	function bigint(params) {
		return core._coercedBigint(schemas.ZodBigInt, params);
	}
	function date(params) {
		return core._coercedDate(schemas.ZodDate, params);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/v4/classic/external.cjs
var require_external = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __exportStar = exports && exports.__exportStar || function(m, exports$2) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
	};
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.coerce = exports.iso = exports.ZodISODuration = exports.ZodISOTime = exports.ZodISODate = exports.ZodISODateTime = exports.locales = exports.fromJSONSchema = exports.toJSONSchema = exports.NEVER = exports.util = exports.TimePrecision = exports.flattenError = exports.formatError = exports.prettifyError = exports.treeifyError = exports.regexes = exports.clone = exports.$brand = exports.$input = exports.$output = exports.config = exports.registry = exports.globalRegistry = exports.core = void 0;
	exports.core = __importStar(require_core());
	__exportStar(require_schemas(), exports);
	__exportStar(require_checks(), exports);
	__exportStar(require_errors(), exports);
	__exportStar(require_parse(), exports);
	__exportStar(require_compat(), exports);
	var index_js_1 = require_core();
	var en_js_1 = __importDefault(require_en());
	(0, index_js_1.config)((0, en_js_1.default)());
	var index_js_2 = require_core();
	Object.defineProperty(exports, "globalRegistry", {
		enumerable: true,
		get: function() {
			return index_js_2.globalRegistry;
		}
	});
	Object.defineProperty(exports, "registry", {
		enumerable: true,
		get: function() {
			return index_js_2.registry;
		}
	});
	Object.defineProperty(exports, "config", {
		enumerable: true,
		get: function() {
			return index_js_2.config;
		}
	});
	Object.defineProperty(exports, "$output", {
		enumerable: true,
		get: function() {
			return index_js_2.$output;
		}
	});
	Object.defineProperty(exports, "$input", {
		enumerable: true,
		get: function() {
			return index_js_2.$input;
		}
	});
	Object.defineProperty(exports, "$brand", {
		enumerable: true,
		get: function() {
			return index_js_2.$brand;
		}
	});
	Object.defineProperty(exports, "clone", {
		enumerable: true,
		get: function() {
			return index_js_2.clone;
		}
	});
	Object.defineProperty(exports, "regexes", {
		enumerable: true,
		get: function() {
			return index_js_2.regexes;
		}
	});
	Object.defineProperty(exports, "treeifyError", {
		enumerable: true,
		get: function() {
			return index_js_2.treeifyError;
		}
	});
	Object.defineProperty(exports, "prettifyError", {
		enumerable: true,
		get: function() {
			return index_js_2.prettifyError;
		}
	});
	Object.defineProperty(exports, "formatError", {
		enumerable: true,
		get: function() {
			return index_js_2.formatError;
		}
	});
	Object.defineProperty(exports, "flattenError", {
		enumerable: true,
		get: function() {
			return index_js_2.flattenError;
		}
	});
	Object.defineProperty(exports, "TimePrecision", {
		enumerable: true,
		get: function() {
			return index_js_2.TimePrecision;
		}
	});
	Object.defineProperty(exports, "util", {
		enumerable: true,
		get: function() {
			return index_js_2.util;
		}
	});
	Object.defineProperty(exports, "NEVER", {
		enumerable: true,
		get: function() {
			return index_js_2.NEVER;
		}
	});
	var json_schema_processors_js_1 = require_json_schema_processors();
	Object.defineProperty(exports, "toJSONSchema", {
		enumerable: true,
		get: function() {
			return json_schema_processors_js_1.toJSONSchema;
		}
	});
	var from_json_schema_js_1 = require_from_json_schema();
	Object.defineProperty(exports, "fromJSONSchema", {
		enumerable: true,
		get: function() {
			return from_json_schema_js_1.fromJSONSchema;
		}
	});
	exports.locales = __importStar(require_locales());
	var iso_js_1 = require_iso();
	Object.defineProperty(exports, "ZodISODateTime", {
		enumerable: true,
		get: function() {
			return iso_js_1.ZodISODateTime;
		}
	});
	Object.defineProperty(exports, "ZodISODate", {
		enumerable: true,
		get: function() {
			return iso_js_1.ZodISODate;
		}
	});
	Object.defineProperty(exports, "ZodISOTime", {
		enumerable: true,
		get: function() {
			return iso_js_1.ZodISOTime;
		}
	});
	Object.defineProperty(exports, "ZodISODuration", {
		enumerable: true,
		get: function() {
			return iso_js_1.ZodISODuration;
		}
	});
	exports.iso = __importStar(require_iso());
	exports.coerce = __importStar(require_coerce());
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/node_modules/zod/index.cjs
var require_zod = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.z = void 0;
	var z = __importStar(require_external());
	exports.z = z;
	__exportStar(require_external(), exports);
	exports.default = z;
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SMAOptionsSchema.js
var require_SMAOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SMAOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Simple Moving Average (SMA) calculation options
	*/
	exports.SMAOptionsSchema = zod_1.z.object({
		/**
		* Array of price values (typically closing prices)
		*/
		prices: zod_1.z.array(zod_1.z.number()).min(1, "Prices array must contain at least one value"),
		/**
		* Period for the moving average calculation
		* Must be positive and not exceed the length of prices array
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/trend/calculateSMA.js
var require_calculateSMA = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSMA = calculateSMA;
	var SMAOptionsSchema_1 = require_SMAOptionsSchema();
	/**
	* Calculate Simple Moving Average (SMA)
	*
	* SMA is a trend-following indicator that smooths price data by creating
	* a constantly updated average price over a specified time period.
	*
	* @param options - SMA calculation options
	* @returns SMA calculation result
	*
	* @example
	* ```typescript
	* const prices = [10, 12, 11, 13, 14, 12, 15, 16, 14, 13];
	* const result = calculateSMA({ prices, period: 3 });
	* console.log(result.sma); // [11, 12, 12.67, 13, 13.67, 14.33, 15, 14.33]
	* ```
	*/
	function calculateSMA(options) {
		const { prices, period } = SMAOptionsSchema_1.SMAOptionsSchema.parse(options);
		if (period > prices.length) throw new Error("Period cannot exceed the length of prices array");
		const sma = [];
		const indices = [];
		for (let i = period - 1; i < prices.length; i++) {
			let sum = 0;
			for (let j = i - period + 1; j <= i; j++) sum += prices[j];
			const average = sum / period;
			sma.push(average);
			indices.push(i);
		}
		return {
			sma,
			period,
			count: sma.length,
			indices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/EMAOptionsSchema.js
var require_EMAOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EMAOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Exponential Moving Average (EMA) calculation options
	*/
	exports.EMAOptionsSchema = zod_1.z.object({
		/**
		* Array of price values (typically closing prices)
		*/
		prices: zod_1.z.array(zod_1.z.number()).min(1, "Prices array must contain at least one value"),
		/**
		* Period for the EMA calculation
		* Must be positive and not exceed the length of prices array
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/trend/calculateEMA.js
var require_calculateEMA = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateEMA = calculateEMA;
	var EMAOptionsSchema_1 = require_EMAOptionsSchema();
	/**
	* Calculate Exponential Moving Average (EMA)
	*
	* EMA is a trend-following indicator that gives more weight to recent prices
	* and responds more quickly to price changes than SMA. It uses exponential
	* smoothing to reduce lag.
	*
	* Formula: EMA = (Price - Previous EMA) * Smoothing Factor + Previous EMA
	* Smoothing Factor = 2 / (Period + 1)
	*
	* @param options - EMA calculation options
	* @returns EMA calculation result
	*
	* @example
	* ```typescript
	* const prices = [10, 12, 11, 13, 14, 12, 15, 16, 14, 13];
	* const result = calculateEMA({ prices, period: 3 });
	* console.log(result.ema); // [10, 11, 10.67, 11.83, 12.92, 12.46, 13.73, 14.87, 14.43, 13.72]
	* ```
	*/
	function calculateEMA(options) {
		const { prices, period } = EMAOptionsSchema_1.EMAOptionsSchema.parse(options);
		if (period > prices.length) throw new Error("Period cannot exceed the length of prices array");
		const ema = new Array(prices.length);
		const smoothingFactor = 2 / (period + 1);
		ema[0] = prices[0];
		for (let i = 1; i < prices.length; i++) ema[i] = (prices[i] - ema[i - 1]) * smoothingFactor + ema[i - 1];
		return {
			ema,
			period,
			smoothingFactor,
			count: ema.length
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/MACDOptionsSchema.js
var require_MACDOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MACDOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for MACD (Moving Average Convergence Divergence) calculation options
	*/
	exports.MACDOptionsSchema = zod_1.z.object({
		/**
		* Array of price values (typically closing prices)
		*/
		prices: zod_1.z.array(zod_1.z.number()).min(1, "Prices array must contain at least one value"),
		/**
		* Fast EMA period (typically 12)
		*/
		fastPeriod: zod_1.z.number().int("Fast period must be an integer").positive("Fast period must be positive").default(12),
		/**
		* Slow EMA period (typically 26)
		*/
		slowPeriod: zod_1.z.number().int("Slow period must be an integer").positive("Slow period must be positive").default(26),
		/**
		* Signal line EMA period (typically 9)
		*/
		signalPeriod: zod_1.z.number().int("Signal period must be an integer").positive("Signal period must be positive").default(9)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/trend/calculateMACD.js
var require_calculateMACD = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateMACD = calculateMACD;
	var MACDOptionsSchema_1 = require_MACDOptionsSchema();
	/**
	* Calculate MACD (Moving Average Convergence Divergence)
	*
	* MACD is a trend-following momentum indicator that shows the relationship between two moving averages.
	* It consists of three components:
	* 1. MACD Line = Fast EMA - Slow EMA
	* 2. Signal Line = EMA of MACD Line
	* 3. Histogram = MACD Line - Signal Line
	*
	* @param options - MACD calculation options
	* @returns MACD result with macdLine, signalLine, histogram, and metadata
	*
	* @example
	* ```typescript
	* const result = calculateMACD({
	*   prices: [100, 102, 101, 103, 105, 104, 106, 108, 107, 109],
	*   fastPeriod: 12,
	*   slowPeriod: 26,
	*   signalPeriod: 9
	* });
	*
	* console.log(result.macdLine);    // MACD line values
	* console.log(result.signalLine);  // Signal line values
	* console.log(result.histogram);   // Histogram values
	* ```
	*/
	function calculateMACD(options) {
		const { prices, fastPeriod, slowPeriod, signalPeriod } = MACDOptionsSchema_1.MACDOptionsSchema.parse(options);
		if (slowPeriod <= fastPeriod) throw new Error("Slow period must be greater than fast period");
		const minRequiredLength = slowPeriod + signalPeriod - 1;
		if (prices.length < minRequiredLength) throw new Error(`At least ${minRequiredLength} prices are required for MACD calculation`);
		const fastEMA = calculateEMA(prices, fastPeriod);
		const slowEMA = calculateEMA(prices, slowPeriod);
		const macdLine = [];
		const macdIndices = [];
		const startIndex = slowPeriod - 1;
		for (let i = startIndex; i < prices.length; i++) {
			const fastEMAValue = fastEMA[i];
			const slowEMAValue = slowEMA[i];
			macdLine.push(fastEMAValue - slowEMAValue);
			macdIndices.push(i);
		}
		const signalLine = calculateEMA(macdLine, signalPeriod);
		const histogram = [];
		const resultIndices = [];
		const histogramStartIndex = signalPeriod - 1;
		for (let i = histogramStartIndex; i < macdLine.length; i++) {
			histogram.push(macdLine[i] - signalLine[i]);
			resultIndices.push(macdIndices[i]);
		}
		return {
			macdLine: macdLine.slice(histogramStartIndex),
			signalLine: signalLine.slice(histogramStartIndex),
			histogram,
			fastPeriod,
			slowPeriod,
			signalPeriod,
			count: histogram.length,
			indices: resultIndices
		};
	}
	/**
	* Helper function to calculate EMA
	*/
	function calculateEMA(prices, period) {
		const ema = new Array(prices.length);
		const smoothingFactor = 2 / (period + 1);
		ema[0] = prices[0];
		for (let i = 1; i < prices.length; i++) ema[i] = prices[i] * smoothingFactor + ema[i - 1] * (1 - smoothingFactor);
		return ema;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/RSIOptionsSchema.js
var require_RSIOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RSIOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Relative Strength Index (RSI) calculation options
	*/
	exports.RSIOptionsSchema = zod_1.z.object({
		/**
		* Array of price values (typically closing prices)
		*/
		prices: zod_1.z.array(zod_1.z.number()).min(1, "Prices array must contain at least one value"),
		/**
		* Period for the RSI calculation
		* Must be positive and not exceed (prices.length - 1)
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/momentum/calculateRSI.js
var require_calculateRSI = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateRSI = calculateRSI;
	var RSIOptionsSchema_1 = require_RSIOptionsSchema();
	/**
	* Calculate Relative Strength Index (RSI)
	*
	* RSI is a momentum oscillator that measures the speed and magnitude of price changes.
	* It oscillates between 0 and 100 and is used to identify overbought (>70) and
	* oversold (<30) conditions.
	*
	* Formula:
	* 1. Calculate price changes: change = price[i] - price[i-1]
	* 2. Separate gains and losses: gain = max(change, 0), loss = max(-change, 0)
	* 3. Calculate average gains and losses using exponential smoothing
	* 4. Calculate RS = averageGain / averageLoss
	* 5. Calculate RSI = 100 - (100 / (1 + RS))
	*
	* @param options - RSI calculation options
	* @returns RSI calculation result
	*
	* @example
	* ```typescript
	* const prices = [10, 12, 11, 13, 14, 12, 15, 16, 14, 13];
	* const result = calculateRSI({ prices, period: 3 });
	* console.log(result.rsi); // [100, 33.33, 66.67, 75, 25, 66.67, 75, 25, 33.33]
	* ```
	*/
	function calculateRSI(options) {
		const { prices, period } = RSIOptionsSchema_1.RSIOptionsSchema.parse(options);
		if (prices.length < 2) throw new Error("At least 2 prices are required for RSI calculation");
		if (period > prices.length - 1) throw new Error("Period cannot exceed (prices.length - 1)");
		const priceChanges = [];
		const gains = [];
		const losses = [];
		const averageGains = [];
		const averageLosses = [];
		const rsi = [];
		const indices = [];
		for (let i = 1; i < prices.length; i++) {
			const change = prices[i] - prices[i - 1];
			priceChanges.push(change);
			gains.push(Math.max(change, 0));
			losses.push(Math.max(-change, 0));
		}
		let avgGain = 0;
		let avgLoss = 0;
		for (let i = 0; i < period && i < gains.length; i++) {
			avgGain += gains[i];
			avgLoss += losses[i];
		}
		avgGain /= Math.min(period, gains.length);
		avgLoss /= Math.min(period, losses.length);
		for (let i = 0; i < gains.length; i++) {
			if (i < period) {
				averageGains.push(avgGain);
				averageLosses.push(avgLoss);
			} else {
				avgGain = (avgGain * (period - 1) + gains[i]) / period;
				avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
				averageGains.push(avgGain);
				averageLosses.push(avgLoss);
			}
			if (averageLosses[i] === 0) rsi.push(100);
			else {
				const rs = averageGains[i] / averageLosses[i];
				rsi.push(100 - 100 / (1 + rs));
			}
			indices.push(i + 1);
		}
		return {
			rsi,
			priceChanges,
			gains,
			losses,
			averageGains,
			averageLosses,
			period,
			count: rsi.length,
			indices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/StochasticOptionsSchema.js
var require_StochasticOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StochasticOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Stochastic Oscillator calculation options
	*/
	exports.StochasticOptionsSchema = zod_1.z.object({
		/**
		* Array of high prices
		*/
		high: zod_1.z.array(zod_1.z.number()).min(1, "High prices array must contain at least one value"),
		/**
		* Array of low prices
		*/
		low: zod_1.z.array(zod_1.z.number()).min(1, "Low prices array must contain at least one value"),
		/**
		* Array of closing prices
		*/
		close: zod_1.z.array(zod_1.z.number()).min(1, "Close prices array must contain at least one value"),
		/**
		* Period for %K calculation (typically 14)
		*/
		kPeriod: zod_1.z.number().int("K period must be an integer").positive("K period must be positive").default(14),
		/**
		* Period for %D calculation (typically 3)
		*/
		dPeriod: zod_1.z.number().int("D period must be an integer").positive("D period must be positive").default(3)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/momentum/calculateStochastic.js
var require_calculateStochastic = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateStochastic = calculateStochastic;
	var StochasticOptionsSchema_1 = require_StochasticOptionsSchema();
	/**
	* Calculate Stochastic Oscillator
	*
	* The Stochastic Oscillator compares the closing price to the price range over a given period.
	* It consists of two lines:
	* 1. %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) * 100
	* 2. %D = Simple Moving Average of %K
	*
	* Values range from 0 to 100:
	* - Above 80: Overbought (potential sell signal)
	* - Below 20: Oversold (potential buy signal)
	*
	* @param options - Stochastic calculation options
	* @returns Stochastic result with %K, %D, highest highs, lowest lows, and metadata
	*
	* @example
	* ```typescript
	* const result = calculateStochastic({
	*   high: [102, 103, 101, 104, 105],
	*   low: [98, 99, 97, 100, 101],
	*   close: [100, 102, 100, 103, 104],
	*   kPeriod: 14,
	*   dPeriod: 3
	* });
	*
	* console.log(result.percentK);  // %K values (0-100)
	* console.log(result.percentD);  // %D values (0-100)
	* ```
	*/
	function calculateStochastic(options) {
		const { high, low, close, kPeriod, dPeriod } = StochasticOptionsSchema_1.StochasticOptionsSchema.parse(options);
		const minLength = Math.min(high.length, low.length, close.length);
		if (high.length !== minLength || low.length !== minLength || close.length !== minLength) throw new Error("All price arrays (high, low, close) must have the same length");
		const minRequiredLength = Math.max(kPeriod, dPeriod);
		if (minLength < minRequiredLength) throw new Error(`At least ${minRequiredLength} prices are required for Stochastic calculation`);
		const percentK = [];
		const highestHigh = [];
		const lowestLow = [];
		const indices = [];
		for (let i = kPeriod - 1; i < minLength; i++) {
			const highWindow = high.slice(i - kPeriod + 1, i + 1);
			const lowWindow = low.slice(i - kPeriod + 1, i + 1);
			const currentHighestHigh = Math.max(...highWindow);
			const currentLowestLow = Math.min(...lowWindow);
			const numerator = close[i] - currentLowestLow;
			const denominator = currentHighestHigh - currentLowestLow;
			const percentKValue = denominator === 0 ? 50 : numerator / denominator * 100;
			percentK.push(Math.max(0, Math.min(100, percentKValue)));
			highestHigh.push(currentHighestHigh);
			lowestLow.push(currentLowestLow);
			indices.push(i);
		}
		const percentD = [];
		for (let i = dPeriod - 1; i < percentK.length; i++) {
			const dAverage = percentK.slice(i - dPeriod + 1, i + 1).reduce((sum, val) => sum + val, 0) / dPeriod;
			percentD.push(dAverage);
		}
		const finalIndices = indices.slice(dPeriod - 1);
		return {
			percentK: percentK.slice(dPeriod - 1),
			percentD,
			highestHigh: highestHigh.slice(dPeriod - 1),
			lowestLow: lowestLow.slice(dPeriod - 1),
			kPeriod,
			dPeriod,
			count: percentD.length,
			indices: finalIndices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/WilliamsROptionsSchema.js
var require_WilliamsROptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WilliamsROptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Williams %R calculation options
	*/
	exports.WilliamsROptionsSchema = zod_1.z.object({
		/**
		* Array of high prices
		*/
		high: zod_1.z.array(zod_1.z.number()).min(1, "High prices array must contain at least one value"),
		/**
		* Array of low prices
		*/
		low: zod_1.z.array(zod_1.z.number()).min(1, "Low prices array must contain at least one value"),
		/**
		* Array of closing prices
		*/
		close: zod_1.z.array(zod_1.z.number()).min(1, "Close prices array must contain at least one value"),
		/**
		* Period for Williams %R calculation (typically 14)
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive").default(14)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/momentum/calculateWilliamsR.js
var require_calculateWilliamsR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateWilliamsR = calculateWilliamsR;
	var WilliamsROptionsSchema_1 = require_WilliamsROptionsSchema();
	/**
	* Calculate Williams %R
	*
	* Williams %R is a momentum oscillator that measures overbought/oversold levels.
	* It is similar to the Stochastic Oscillator but uses a different scale.
	*
	* Formula: %R = ((Highest High - Current Close) / (Highest High - Lowest Low)) * -100
	*
	* Values range from -100 to 0:
	* - Above -20: Overbought (potential sell signal)
	* - Below -80: Oversold (potential buy signal)
	*
	* @param options - Williams %R calculation options
	* @returns Williams %R result with values, highest highs, lowest lows, and metadata
	*
	* @example
	* ```typescript
	* const result = calculateWilliamsR({
	*   high: [102, 103, 101, 104, 105],
	*   low: [98, 99, 97, 100, 101],
	*   close: [100, 102, 100, 103, 104],
	*   period: 14
	* });
	*
	* console.log(result.williamsR);  // Williams %R values (-100 to 0)
	* ```
	*/
	function calculateWilliamsR(options) {
		const { high, low, close, period } = WilliamsROptionsSchema_1.WilliamsROptionsSchema.parse(options);
		const minLength = Math.min(high.length, low.length, close.length);
		if (high.length !== minLength || low.length !== minLength || close.length !== minLength) throw new Error("All price arrays (high, low, close) must have the same length");
		if (minLength < period) throw new Error(`At least ${period} prices are required for Williams %R calculation`);
		const williamsR = [];
		const highestHigh = [];
		const lowestLow = [];
		const indices = [];
		for (let i = period - 1; i < minLength; i++) {
			const highWindow = high.slice(i - period + 1, i + 1);
			const lowWindow = low.slice(i - period + 1, i + 1);
			const currentHighestHigh = Math.max(...highWindow);
			const currentLowestLow = Math.min(...lowWindow);
			const numerator = currentHighestHigh - close[i];
			const denominator = currentHighestHigh - currentLowestLow;
			const williamsRValue = denominator === 0 ? -50 : numerator / denominator * -100;
			williamsR.push(Math.max(-100, Math.min(0, williamsRValue)));
			highestHigh.push(currentHighestHigh);
			lowestLow.push(currentLowestLow);
			indices.push(i);
		}
		return {
			williamsR,
			highestHigh,
			lowestLow,
			period,
			count: williamsR.length,
			indices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/BollingerBandsOptionsSchema.js
var require_BollingerBandsOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BollingerBandsOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Bollinger Bands calculation options
	*/
	exports.BollingerBandsOptionsSchema = zod_1.z.object({
		/**
		* Array of price values (typically closing prices)
		*/
		prices: zod_1.z.array(zod_1.z.number()).min(1, "Prices array must contain at least one value"),
		/**
		* Period for the moving average and standard deviation calculation
		* Must be positive and not exceed the length of prices array
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive"),
		/**
		* Standard deviation multiplier (typically 2)
		* Must be positive
		*/
		stdDevMultiplier: zod_1.z.number().positive("Standard deviation multiplier must be positive").default(2)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/volatility/calculateBollingerBands.js
var require_calculateBollingerBands = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateBollingerBands = calculateBollingerBands;
	var BollingerBandsOptionsSchema_1 = require_BollingerBandsOptionsSchema();
	/**
	* Calculate Bollinger Bands
	*
	* Bollinger Bands consist of three lines:
	* - Middle Band: Simple Moving Average (SMA)
	* - Upper Band: SMA + (Standard Deviation × Multiplier)
	* - Lower Band: SMA - (Standard Deviation × Multiplier)
	*
	* Bollinger Bands are used to identify:
	* - Overbought conditions (price near upper band)
	* - Oversold conditions (price near lower band)
	* - Volatility expansion/contraction (bandwidth changes)
	*
	* @param options - Bollinger Bands calculation options
	* @returns Bollinger Bands calculation result
	*
	* @example
	* ```typescript
	* const prices = [10, 12, 11, 13, 14, 12, 15, 16, 14, 13];
	* const result = calculateBollingerBands({ prices, period: 3, stdDevMultiplier: 2 });
	* console.log(result.upperBand); // [14.16, 15.16, 16.16, ...]
	* console.log(result.middleBand); // [11, 12, 13, ...]
	* console.log(result.lowerBand); // [7.84, 8.84, 9.84, ...]
	* ```
	*/
	function calculateBollingerBands(options) {
		const { prices, period, stdDevMultiplier } = BollingerBandsOptionsSchema_1.BollingerBandsOptionsSchema.parse(options);
		if (period > prices.length) throw new Error("Period cannot exceed the length of prices array");
		const upperBand = [];
		const middleBand = [];
		const lowerBand = [];
		const bandwidth = [];
		const percentB = [];
		const indices = [];
		for (let i = period - 1; i < prices.length; i++) {
			const priceWindow = prices.slice(i - period + 1, i + 1);
			const sma = priceWindow.reduce((acc, price) => acc + price, 0) / period;
			const variance = priceWindow.reduce((acc, price) => acc + Math.pow(price - sma, 2), 0) / period;
			const stdDev = Math.sqrt(variance);
			const upper = sma + stdDev * stdDevMultiplier;
			const lower = sma - stdDev * stdDevMultiplier;
			const currentPrice = prices[i];
			const percentBValue = upper - lower === 0 ? 1 : (currentPrice - lower) / (upper - lower);
			upperBand.push(upper);
			middleBand.push(sma);
			lowerBand.push(lower);
			bandwidth.push(upper - lower);
			percentB.push(percentBValue);
			indices.push(i);
		}
		return {
			upperBand,
			middleBand,
			lowerBand,
			bandwidth,
			percentB,
			period,
			stdDevMultiplier,
			count: upperBand.length,
			indices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/ATROptionsSchema.js
var require_ATROptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ATROptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Schema for Average True Range (ATR) calculation options
	*/
	exports.ATROptionsSchema = zod_1.z.object({
		/**
		* Array of high prices
		*/
		high: zod_1.z.array(zod_1.z.number()).min(1, "High prices array must contain at least one value"),
		/**
		* Array of low prices
		*/
		low: zod_1.z.array(zod_1.z.number()).min(1, "Low prices array must contain at least one value"),
		/**
		* Array of closing prices
		*/
		close: zod_1.z.array(zod_1.z.number()).min(1, "Close prices array must contain at least one value"),
		/**
		* Period for the ATR calculation
		* Must be positive and not exceed the length of price arrays
		*/
		period: zod_1.z.number().int("Period must be an integer").positive("Period must be positive")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/indicators/volatility/calculateATR.js
var require_calculateATR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateATR = calculateATR;
	var ATROptionsSchema_1 = require_ATROptionsSchema();
	/**
	* Calculate Average True Range (ATR)
	*
	* ATR is a volatility indicator that measures the degree of price volatility.
	* It shows the average range of price movement over a specified period.
	*
	* True Range is the greatest of:
	* 1. Current High - Current Low
	* 2. |Current High - Previous Close|
	* 3. |Current Low - Previous Close|
	*
	* ATR is calculated as the moving average of True Range values.
	*
	* @param options - ATR calculation options
	* @returns ATR calculation result
	*
	* @example
	* ```typescript
	* const high = [12, 13, 14, 15, 16, 15, 14, 13, 12, 11];
	* const low = [10, 11, 12, 13, 14, 13, 12, 11, 10, 9];
	* const close = [11, 12, 13, 14, 15, 14, 13, 12, 11, 10];
	* const result = calculateATR({ high, low, close, period: 3 });
	* console.log(result.atr); // [1.33, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33, 1.33]
	* ```
	*/
	function calculateATR(options) {
		const { high, low, close, period } = ATROptionsSchema_1.ATROptionsSchema.parse(options);
		const minLength = Math.min(high.length, low.length, close.length);
		if (high.length !== minLength || low.length !== minLength || close.length !== minLength) throw new Error("All price arrays (high, low, close) must have the same length");
		if (period > minLength) throw new Error("Period cannot exceed the length of price arrays");
		const trueRange = [];
		const atr = [];
		const indices = [];
		for (let i = 0; i < minLength; i++) {
			let tr;
			if (i === 0) tr = high[i] - low[i];
			else {
				const hl = high[i] - low[i];
				const hc = Math.abs(high[i] - close[i - 1]);
				const lc = Math.abs(low[i] - close[i - 1]);
				tr = Math.max(hl, hc, lc);
			}
			trueRange.push(tr);
		}
		let sum = 0;
		const initialPeriod = Math.min(period, trueRange.length);
		for (let i = 0; i < initialPeriod; i++) sum += trueRange[i];
		let currentATR = sum / initialPeriod;
		for (let i = 0; i < trueRange.length; i++) {
			if (i < period) atr.push(currentATR);
			else {
				currentATR = (currentATR * (period - 1) + trueRange[i]) / period;
				atr.push(currentATR);
			}
			indices.push(i);
		}
		return {
			trueRange,
			atr,
			period,
			count: atr.length,
			indices
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/AlphaOptionsSchema.js
var require_AlphaOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AlphaOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.AlphaOptionsSchema = zod_1.z.object({
		assetReturns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 asset returns"),
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 benchmark returns"),
		riskFreeRate: zod_1.z.number().default(0),
		annualizationFactor: zod_1.z.number().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/AlphaResultSchema.js
var require_AlphaResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AlphaResultSchema = void 0;
	var zod_1 = require_zod();
	exports.AlphaResultSchema = zod_1.z.object({
		alpha: zod_1.z.number(),
		annualizedAlpha: zod_1.z.number(),
		beta: zod_1.z.number(),
		assetReturn: zod_1.z.number(),
		benchmarkReturn: zod_1.z.number(),
		expectedReturn: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/BetaOptionsSchema.js
var require_BetaOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BetaOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.BetaOptionsSchema = zod_1.z.object({
		assetReturns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 asset returns"),
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 benchmark returns")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/BetaResultSchema.js
var require_BetaResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BetaResultSchema = void 0;
	var zod_1 = require_zod();
	exports.BetaResultSchema = zod_1.z.object({
		beta: zod_1.z.number(),
		covariance: zod_1.z.number(),
		benchmarkVariance: zod_1.z.number(),
		correlation: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateBeta.js
var require_calculateBeta = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateBeta = calculateBeta;
	var BetaOptionsSchema_1 = require_BetaOptionsSchema();
	var BetaResultSchema_1 = require_BetaResultSchema();
	/**
	* Calculate Beta (β)
	*
	* β = Cov(asset, benchmark) / Var(benchmark)
	*
	* Measures systematic risk relative to market/benchmark.
	* β = 1: moves with market
	* β > 1: more volatile than market
	* β < 1: less volatile than market
	*
	* @param options - Asset returns and benchmark returns
	* @returns Beta, covariance, variance, correlation
	*/
	function calculateBeta(options) {
		const { assetReturns, benchmarkReturns } = BetaOptionsSchema_1.BetaOptionsSchema.parse(options);
		if (assetReturns.length !== benchmarkReturns.length) throw new Error("Asset and benchmark returns must have same length");
		const n = assetReturns.length;
		const assetMean = assetReturns.reduce((sum, r) => sum + r, 0) / n;
		const benchmarkMean = benchmarkReturns.reduce((sum, r) => sum + r, 0) / n;
		let covariance = 0;
		for (let i = 0; i < n; i++) covariance += (assetReturns[i] - assetMean) * (benchmarkReturns[i] - benchmarkMean);
		covariance /= n - 1;
		let benchmarkVariance = 0;
		for (let i = 0; i < n; i++) benchmarkVariance += Math.pow(benchmarkReturns[i] - benchmarkMean, 2);
		benchmarkVariance /= n - 1;
		const beta = benchmarkVariance !== 0 ? covariance / benchmarkVariance : 0;
		let assetVariance = 0;
		for (let i = 0; i < n; i++) assetVariance += Math.pow(assetReturns[i] - assetMean, 2);
		assetVariance /= n - 1;
		const assetStdDev = Math.sqrt(assetVariance);
		const benchmarkStdDev = Math.sqrt(benchmarkVariance);
		const correlation = assetStdDev !== 0 && benchmarkStdDev !== 0 ? covariance / (assetStdDev * benchmarkStdDev) : 0;
		return BetaResultSchema_1.BetaResultSchema.parse({
			beta,
			covariance,
			benchmarkVariance,
			correlation
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateAlpha.js
var require_calculateAlpha = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateAlpha = calculateAlpha;
	var AlphaOptionsSchema_1 = require_AlphaOptionsSchema();
	var AlphaResultSchema_1 = require_AlphaResultSchema();
	var calculateBeta_1 = require_calculateBeta();
	/**
	* Calculate Alpha (α) using CAPM
	*
	* α = Actual Return - Expected Return
	* Expected Return = Rf + β × (Rm - Rf)
	*
	* Positive α: outperformance vs. market-adjusted expectations
	* Negative α: underperformance
	*
	* @param options - Asset returns, benchmark returns, risk-free rate
	* @returns Alpha, beta, returns, expected return
	*/
	function calculateAlpha(options) {
		const { assetReturns, benchmarkReturns, riskFreeRate, annualizationFactor } = AlphaOptionsSchema_1.AlphaOptionsSchema.parse(options);
		if (assetReturns.length !== benchmarkReturns.length) throw new Error("Asset and benchmark returns must have same length");
		if (annualizationFactor <= 0) throw new Error("Annualization factor must be positive");
		const { beta } = (0, calculateBeta_1.calculateBeta)({
			assetReturns,
			benchmarkReturns
		});
		const assetMeanReturn = assetReturns.reduce((sum, r) => sum + r, 0) / assetReturns.length;
		const benchmarkMeanReturn = benchmarkReturns.reduce((sum, r) => sum + r, 0) / benchmarkReturns.length;
		const assetReturn = assetMeanReturn * annualizationFactor;
		const benchmarkReturn = benchmarkMeanReturn * annualizationFactor;
		const expectedReturn = riskFreeRate + beta * (benchmarkReturn - riskFreeRate);
		const annualizedAlpha = assetReturn - expectedReturn;
		const alpha = annualizedAlpha / annualizationFactor;
		return AlphaResultSchema_1.AlphaResultSchema.parse({
			alpha,
			annualizedAlpha,
			beta,
			assetReturn,
			benchmarkReturn,
			expectedReturn
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CalmarRatioOptionsSchema.js
var require_CalmarRatioOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CalmarRatioOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.CalmarRatioOptionsSchema = zod_1.z.object({
		prices: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 prices"),
		returns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 returns"),
		annualizationFactor: zod_1.z.number().default(252),
		lookbackPeriod: zod_1.z.number().default(36).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CalmarRatioResultSchema.js
var require_CalmarRatioResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CalmarRatioResultSchema = void 0;
	var zod_1 = require_zod();
	exports.CalmarRatioResultSchema = zod_1.z.object({
		calmarRatio: zod_1.z.number(),
		annualizedReturn: zod_1.z.number(),
		maxDrawdownPercent: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/MaxDrawdownOptionsSchema.js
var require_MaxDrawdownOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MaxDrawdownOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.MaxDrawdownOptionsSchema = zod_1.z.object({ prices: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 prices") });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/MaxDrawdownResultSchema.js
var require_MaxDrawdownResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MaxDrawdownResultSchema = void 0;
	var zod_1 = require_zod();
	exports.MaxDrawdownResultSchema = zod_1.z.object({
		maxDrawdown: zod_1.z.number(),
		maxDrawdownPercent: zod_1.z.number(),
		peakIndex: zod_1.z.number(),
		troughIndex: zod_1.z.number(),
		peakValue: zod_1.z.number(),
		troughValue: zod_1.z.number(),
		recoveryIndex: zod_1.z.number().nullable(),
		drawdownDuration: zod_1.z.number(),
		recoveryDuration: zod_1.z.number().nullable()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateMaxDrawdown.js
var require_calculateMaxDrawdown = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateMaxDrawdown = calculateMaxDrawdown;
	var MaxDrawdownOptionsSchema_1 = require_MaxDrawdownOptionsSchema();
	var MaxDrawdownResultSchema_1 = require_MaxDrawdownResultSchema();
	/**
	* Calculate Maximum Drawdown (MDD)
	*
	* MDD = max(0, (Peak - Trough) / Peak)
	*
	* @param options - Prices array
	* @returns MDD metrics including peak, trough, duration, recovery
	*/
	function calculateMaxDrawdown(options) {
		const { prices } = MaxDrawdownOptionsSchema_1.MaxDrawdownOptionsSchema.parse(options);
		let peak = prices[0];
		let peakIndex = 0;
		let maxDrawdown = 0;
		let maxDrawdownPercent = 0;
		let troughIndex = 0;
		let troughValue = prices[0];
		let peakValue = prices[0];
		let recoveryIndex = null;
		for (let i = 1; i < prices.length; i++) {
			const current = prices[i];
			if (current > peak) {
				peak = current;
				peakIndex = i;
			}
			const drawdown = peak - current;
			const drawdownPercent = drawdown / peak;
			if (drawdownPercent > maxDrawdownPercent) {
				maxDrawdown = drawdown;
				maxDrawdownPercent = drawdownPercent;
				troughIndex = i;
				troughValue = current;
				peakValue = peak;
				recoveryIndex = null;
			}
			if (i > troughIndex && current >= peakValue && recoveryIndex === null) recoveryIndex = i;
		}
		const drawdownDuration = troughIndex - peakIndex;
		const recoveryDuration = recoveryIndex !== null ? recoveryIndex - troughIndex : null;
		return MaxDrawdownResultSchema_1.MaxDrawdownResultSchema.parse({
			maxDrawdown,
			maxDrawdownPercent,
			peakIndex,
			troughIndex,
			peakValue,
			troughValue,
			recoveryIndex,
			drawdownDuration,
			recoveryDuration
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateCalmarRatio.js
var require_calculateCalmarRatio = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateCalmarRatio = calculateCalmarRatio;
	var CalmarRatioOptionsSchema_1 = require_CalmarRatioOptionsSchema();
	var CalmarRatioResultSchema_1 = require_CalmarRatioResultSchema();
	var calculateMaxDrawdown_1 = require_calculateMaxDrawdown();
	/**
	* Calculate Calmar Ratio
	*
	* Calmar = Annualized Return / Max Drawdown
	*
	* Measures return per unit of downside risk (drawdown).
	* Higher is better; typically calculated over 36 months.
	*
	* @param options - Prices, returns, annualization factor
	* @returns Calmar Ratio and components
	*/
	function calculateCalmarRatio(options) {
		const { prices, returns, annualizationFactor } = CalmarRatioOptionsSchema_1.CalmarRatioOptionsSchema.parse(options);
		const annualizedReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length * annualizationFactor;
		const { maxDrawdownPercent } = (0, calculateMaxDrawdown_1.calculateMaxDrawdown)({ prices });
		const calmarRatio = maxDrawdownPercent !== 0 ? annualizedReturn / Math.abs(maxDrawdownPercent) : 0;
		return CalmarRatioResultSchema_1.CalmarRatioResultSchema.parse({
			calmarRatio,
			annualizedReturn,
			maxDrawdownPercent
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CorrelationMatrixOptionsSchema.js
var require_CorrelationMatrixOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CorrelationMatrixOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.CorrelationMatrixOptionsSchema = zod_1.z.object({
		returns: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(2, "Need at least 2 return series"),
		labels: zod_1.z.array(zod_1.z.string()).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CorrelationMatrixResultSchema.js
var require_CorrelationMatrixResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CorrelationMatrixResultSchema = void 0;
	var zod_1 = require_zod();
	exports.CorrelationMatrixResultSchema = zod_1.z.object({
		matrix: zod_1.z.array(zod_1.z.array(zod_1.z.number())),
		labels: zod_1.z.array(zod_1.z.string()),
		averageCorrelation: zod_1.z.number(),
		maxCorrelation: zod_1.z.number(),
		minCorrelation: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateCorrelationMatrix.js
var require_calculateCorrelationMatrix = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateCorrelationMatrix = calculateCorrelationMatrix;
	var CorrelationMatrixOptionsSchema_1 = require_CorrelationMatrixOptionsSchema();
	var CorrelationMatrixResultSchema_1 = require_CorrelationMatrixResultSchema();
	/**
	* Calculate Correlation Matrix
	*
	* Pearson correlation coefficient between all pairs of return series.
	* ρ(X,Y) = Cov(X,Y) / (σ_X × σ_Y)
	*
	* Range: [-1, 1]
	* +1: perfect positive correlation
	* 0: no correlation
	* -1: perfect negative correlation
	*
	* @param options - Array of return series and optional labels
	* @returns Correlation matrix with stats
	*/
	function calculateCorrelationMatrix(options) {
		const { returns, labels } = CorrelationMatrixOptionsSchema_1.CorrelationMatrixOptionsSchema.parse(options);
		const n = returns.length;
		const seriesLength = returns[0].length;
		if (returns.some((series) => series.length !== seriesLength)) throw new Error("All return series must have the same length");
		if (seriesLength < 2) throw new Error("Each return series must have at least 2 data points");
		const finalLabels = labels && labels.length === n ? labels : Array.from({ length: n }, (_, i) => `Asset ${i + 1}`);
		const means = returns.map((series) => series.reduce((sum, r) => sum + r, 0) / seriesLength);
		const stdDevs = returns.map((series, i) => {
			const variance = series.reduce((sum, r) => sum + Math.pow(r - means[i], 2), 0) / (seriesLength - 1);
			return Math.sqrt(variance);
		});
		const matrix = Array.from({ length: n }, () => Array(n).fill(0));
		for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i === j) matrix[i][j] = 1;
		else {
			let covariance = 0;
			for (let k = 0; k < seriesLength; k++) covariance += (returns[i][k] - means[i]) * (returns[j][k] - means[j]);
			covariance /= seriesLength - 1;
			const correlation = stdDevs[i] !== 0 && stdDevs[j] !== 0 ? covariance / (stdDevs[i] * stdDevs[j]) : 0;
			matrix[i][j] = correlation;
		}
		const offDiagonal = [];
		for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) offDiagonal.push(matrix[i][j]);
		const averageCorrelation = offDiagonal.length > 0 ? offDiagonal.reduce((sum, c) => sum + c, 0) / offDiagonal.length : 0;
		const maxCorrelation = offDiagonal.length > 0 ? Math.max(...offDiagonal) : 1;
		const minCorrelation = offDiagonal.length > 0 ? Math.min(...offDiagonal) : 1;
		return CorrelationMatrixResultSchema_1.CorrelationMatrixResultSchema.parse({
			matrix,
			labels: finalLabels,
			averageCorrelation,
			maxCorrelation,
			minCorrelation
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CovarianceMatrixOptionsSchema.js
var require_CovarianceMatrixOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CovarianceMatrixOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.CovarianceMatrixOptionsSchema = zod_1.z.object({
		returns: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(2, "Need at least 2 return series"),
		labels: zod_1.z.array(zod_1.z.string()).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/CovarianceMatrixResultSchema.js
var require_CovarianceMatrixResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CovarianceMatrixResultSchema = void 0;
	var zod_1 = require_zod();
	exports.CovarianceMatrixResultSchema = zod_1.z.object({
		matrix: zod_1.z.array(zod_1.z.array(zod_1.z.number())),
		labels: zod_1.z.array(zod_1.z.string()),
		variances: zod_1.z.array(zod_1.z.number()),
		averageCovariance: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateCovarianceMatrix.js
var require_calculateCovarianceMatrix = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateCovarianceMatrix = calculateCovarianceMatrix;
	var CovarianceMatrixOptionsSchema_1 = require_CovarianceMatrixOptionsSchema();
	var CovarianceMatrixResultSchema_1 = require_CovarianceMatrixResultSchema();
	/**
	* Calculate Covariance Matrix
	*
	* Cov(X,Y) = E[(X - μ_X)(Y - μ_Y)]
	*
	* Measures how two variables move together.
	* Diagonal = variances
	* Off-diagonal = covariances
	*
	* @param options - Array of return series and optional labels
	* @returns Covariance matrix with variances
	*/
	function calculateCovarianceMatrix(options) {
		const { returns, labels } = CovarianceMatrixOptionsSchema_1.CovarianceMatrixOptionsSchema.parse(options);
		const n = returns.length;
		const seriesLength = returns[0].length;
		if (returns.some((series) => series.length !== seriesLength)) throw new Error("All return series must have the same length");
		if (seriesLength < 2) throw new Error("Each return series must have at least 2 data points");
		const finalLabels = labels && labels.length === n ? labels : Array.from({ length: n }, (_, i) => `Asset ${i + 1}`);
		const means = returns.map((series) => series.reduce((sum, r) => sum + r, 0) / seriesLength);
		const matrix = Array.from({ length: n }, () => Array(n).fill(0));
		for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
			let covariance = 0;
			for (let k = 0; k < seriesLength; k++) covariance += (returns[i][k] - means[i]) * (returns[j][k] - means[j]);
			covariance /= seriesLength - 1;
			matrix[i][j] = covariance;
		}
		const variances = matrix.map((row, i) => row[i]);
		const offDiagonal = [];
		for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) offDiagonal.push(matrix[i][j]);
		const averageCovariance = offDiagonal.length > 0 ? offDiagonal.reduce((sum, c) => sum + c, 0) / offDiagonal.length : 0;
		return CovarianceMatrixResultSchema_1.CovarianceMatrixResultSchema.parse({
			matrix,
			labels: finalLabels,
			variances,
			averageCovariance
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateEWMAVolatility.js
var require_calculateEWMAVolatility = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateEWMAVolatility = calculateEWMAVolatility;
	/**
	* Exponentially Weighted Moving Average (EWMA) volatility
	* More weight on recent observations
	*
	* @param returns Historical returns
	* @param lambda Decay factor (typically 0.94 for RiskMetrics)
	*/
	function calculateEWMAVolatility(returns, lambda) {
		if (lambda <= 0 || lambda >= 1) throw new Error("Lambda must be between 0 and 1");
		let variance = Math.pow(returns[0], 2);
		for (let i = 1; i < returns.length; i++) variance = lambda * variance + (1 - lambda) * Math.pow(returns[i], 2);
		return Math.sqrt(variance);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateGarmanKlassVolatility.js
var require_calculateGarmanKlassVolatility = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateGarmanKlassVolatility = calculateGarmanKlassVolatility;
	/**
	* Garman-Klass volatility estimator
	* Uses OHLC data, most efficient unbiased estimator
	*
	* Garman, M. B., & Klass, M. J. (1980). "On the Estimation of Security Price Volatilities
	* from Historical Data"
	*/
	function calculateGarmanKlassVolatility(openPrices, highPrices, lowPrices, closePrices) {
		const n = openPrices.length;
		if (n === 0) throw new Error("Price arrays cannot be empty");
		if (n !== highPrices.length || n !== lowPrices.length || n !== closePrices.length) throw new Error("All price arrays must have equal length");
		let sum = 0;
		for (let i = 0; i < n; i++) {
			if (openPrices[i] <= 0 || highPrices[i] <= 0 || lowPrices[i] <= 0 || closePrices[i] <= 0) throw new Error("All prices must be positive");
			if (highPrices[i] < lowPrices[i]) throw new Error("High price must be greater than or equal to low price");
			const hlRatio = Math.log(highPrices[i] / lowPrices[i]);
			const coRatio = Math.log(closePrices[i] / openPrices[i]);
			sum += .5 * Math.pow(hlRatio, 2) - (2 * Math.log(2) - 1) * Math.pow(coRatio, 2);
		}
		const variance = sum / n;
		if (variance < 0) return 0;
		return Math.sqrt(variance);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateHistoricalExpectedShortfall.js
var require_calculateHistoricalExpectedShortfall = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateHistoricalExpectedShortfall = calculateHistoricalExpectedShortfall;
	/**
	* Calculate Expected Shortfall using historical method
	*
	* @param returns Array of historical returns
	* @param options Calculation options
	* @returns Expected Shortfall value (negative = potential loss)
	*/
	function calculateHistoricalExpectedShortfall(returns, options) {
		if (returns.length === 0) throw new Error("Returns array cannot be empty");
		const sorted = [...returns].sort((a, b) => a - b);
		const cutoffIndex = Math.floor(returns.length * (1 - options.confidenceLevel));
		const tailLosses = sorted.slice(0, cutoffIndex);
		if (tailLosses.length === 0) return sorted[0];
		return tailLosses.reduce((sum, val) => sum + val, 0) / tailLosses.length;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateHistoricalVaR.js
var require_calculateHistoricalVaR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateHistoricalVaR = calculateHistoricalVaR;
	/**
	* Historical VaR - Uses empirical distribution of returns
	*/
	function calculateHistoricalVaR(returns, confidenceLevel) {
		const sorted = [...returns].sort((a, b) => a - b);
		const index = Math.floor((1 - confidenceLevel) * sorted.length);
		const varValue = Math.abs(sorted[index]);
		const tailLosses = sorted.slice(0, index + 1);
		return {
			value: varValue,
			confidenceLevel,
			method: "historical",
			cvar: Math.abs(tailLosses.reduce((sum, val) => sum + val, 0) / tailLosses.length)
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateKurtosis.js
var require_calculateKurtosis = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateKurtosis = calculateKurtosis;
	/**
	* Calculate Kurtosis (Fourth Moment) of a dataset
	*
	* Kurtosis measures the "tailedness" of the distribution:
	* - Excess Kurtosis > 0: Heavy tails (leptokurtic) - more extreme values than normal distribution
	* - Excess Kurtosis < 0: Light tails (platykurtic) - fewer extreme values than normal distribution
	* - Excess Kurtosis = 0: Normal distribution (mesokurtic)
	*
	* This function returns the excess kurtosis (kurtosis - 3), which is commonly used in finance.
	*
	* Formula: Excess Kurtosis = E[(X - μ)⁴] / σ⁴ - 3
	* Where:
	* - μ = mean
	* - σ = standard deviation
	* - E[(X - μ)⁴] = fourth central moment
	* - The -3 makes excess kurtosis = 0 for normal distribution
	*
	* @param data Array of numbers to calculate kurtosis for
	* @returns Excess kurtosis value
	*
	* @example
	* ```typescript
	* const returns = [0.01, 0.02, -0.01, 0.03, -0.02, -0.05, 0.01];
	* const kurtosis = calculateKurtosis(returns);
	* console.log('Excess Kurtosis:', kurtosis); // 2.45 (fat tails)
	* ```
	*/
	function calculateKurtosis(data) {
		if (data.length === 0) throw new Error("Data array cannot be empty");
		if (data.length < 4) throw new Error("At least 4 data points are required to calculate kurtosis");
		const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
		const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
		const standardDeviation = Math.sqrt(variance);
		if (standardDeviation === 0) return -3;
		return data.reduce((sum, value) => sum + Math.pow(value - mean, 4), 0) / data.length / Math.pow(standardDeviation, 4) - 3;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateMonteCarloVaR.js
var require_calculateMonteCarloVaR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateMonteCarloVaR = calculateMonteCarloVaR;
	var calculateHistoricalVaR_1 = require_calculateHistoricalVaR();
	/**
	* Monte Carlo VaR - Simulates future returns
	*/
	function calculateMonteCarloVaR(returns, confidenceLevel, simulations) {
		const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
		const variance = returns.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (returns.length - 1);
		const stdDev = Math.sqrt(variance);
		const simulatedReturns = [];
		for (let i = 0; i < simulations; i++) {
			const u1 = Math.random();
			const u2 = Math.random();
			const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
			simulatedReturns.push(mean + z * stdDev);
		}
		return (0, calculateHistoricalVaR_1.calculateHistoricalVaR)(simulatedReturns, confidenceLevel);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateParkinsonVolatility.js
var require_calculateParkinsonVolatility = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateParkinsonVolatility = calculateParkinsonVolatility;
	/**
	* Parkinson volatility estimator
	* Uses high-low range, more efficient than close-to-close
	*
	* Parkinson, M. (1980). "The Extreme Value Method for Estimating the Variance of the Rate of Return"
	*/
	function calculateParkinsonVolatility(highPrices, lowPrices) {
		if (highPrices.length !== lowPrices.length) throw new Error("High and low price arrays must have equal length");
		const n = highPrices.length;
		let sum = 0;
		for (let i = 0; i < n; i++) {
			if (lowPrices[i] <= 0 || highPrices[i] <= 0) throw new Error("Prices must be positive");
			const ratio = Math.log(highPrices[i] / lowPrices[i]);
			sum += Math.pow(ratio, 2);
		}
		const variance = sum / (n * 4 * Math.log(2));
		return Math.sqrt(variance);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateStandardDeviation.js
var require_calculateStandardDeviation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateStandardDeviation = calculateStandardDeviation;
	/**
	* Standard deviation (classic volatility)
	*/
	function calculateStandardDeviation(returns) {
		const n = returns.length;
		const mean = returns.reduce((sum, r) => sum + r, 0) / n;
		const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (n - 1);
		return Math.sqrt(variance);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateVolatility.js
var require_calculateVolatility = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateVolatility = calculateVolatility;
	var calculateEWMAVolatility_1 = require_calculateEWMAVolatility();
	var calculateGarmanKlassVolatility_1 = require_calculateGarmanKlassVolatility();
	var calculateParkinsonVolatility_1 = require_calculateParkinsonVolatility();
	var calculateStandardDeviation_1 = require_calculateStandardDeviation();
	/**
	* Calculate volatility using various methods
	*
	* @param returns Array of log returns
	* @param options Volatility calculation options
	* @returns Volatility result with value and metadata
	*/
	function calculateVolatility(returns, options) {
		if (returns.length < 2) throw new Error("At least 2 returns required for volatility calculation");
		let value;
		switch (options.method) {
			case "standard":
				value = (0, calculateStandardDeviation_1.calculateStandardDeviation)(returns);
				break;
			case "exponential":
				value = (0, calculateEWMAVolatility_1.calculateEWMAVolatility)(returns, options.lambda ?? .94);
				break;
			case "parkinson":
				if (!options.highPrices || !options.lowPrices) throw new Error("High and low prices required for Parkinson method");
				value = (0, calculateParkinsonVolatility_1.calculateParkinsonVolatility)(options.highPrices, options.lowPrices);
				break;
			case "garman-klass":
				if (!options.highPrices || !options.lowPrices || !options.openPrices || !options.closePrices) throw new Error("OHLC prices required for Garman-Klass method");
				value = (0, calculateGarmanKlassVolatility_1.calculateGarmanKlassVolatility)(options.openPrices, options.highPrices, options.lowPrices, options.closePrices);
				break;
			default: throw new Error(`Unknown volatility method: ${options.method}`);
		}
		const result = {
			value,
			method: options.method
		};
		if (options.annualizationFactor) result.annualized = value * Math.sqrt(options.annualizationFactor);
		return result;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/inverseErf.js
var require_inverseErf = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.inverseErf = inverseErf;
	/**
	* Inverse error function approximation
	*/
	function inverseErf(x) {
		const a = .147;
		const b = 2 / (Math.PI * a) + Math.log(1 - x * x) / 2;
		const sqrt1 = Math.sqrt(b * b - Math.log(1 - x * x) / a);
		return Math.sqrt(sqrt1 - b) * Math.sign(x);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateParametricExpectedShortfall.js
var require_calculateParametricExpectedShortfall = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateParametricExpectedShortfall = calculateParametricExpectedShortfall;
	var calculateVolatility_1 = require_calculateVolatility();
	var inverseErf_1 = require_inverseErf();
	/**
	* Calculate Expected Shortfall using parametric (normal distribution) method
	*
	* @param returns Array of historical returns
	* @param options Calculation options
	* @returns Expected Shortfall value (negative = potential loss)
	*/
	function calculateParametricExpectedShortfall(returns, options) {
		if (returns.length === 0) throw new Error("Returns array cannot be empty");
		const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
		const sigma = (0, calculateVolatility_1.calculateVolatility)(returns, { method: "standard" }).value;
		const z = Math.sqrt(2) * (0, inverseErf_1.inverseErf)(2 * options.confidenceLevel - 1);
		return mean - sigma * (1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * z * z)) / (1 - options.confidenceLevel);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/getZScore.js
var require_getZScore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getZScore = getZScore;
	/**
	* Get Z-score for a given confidence level (standard normal distribution)
	*/
	function getZScore(confidenceLevel) {
		const p = 1 - confidenceLevel;
		const t = Math.sqrt(-2 * Math.log(p));
		return t - (2.515517 + .802853 * t + .010328 * t * t) / (1 + 1.432788 * t + .189269 * t * t + .001308 * t * t * t);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateParametricVaR.js
var require_calculateParametricVaR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateParametricVaR = calculateParametricVaR;
	var getZScore_1 = require_getZScore();
	/**
	* Parametric VaR - Assumes normal distribution
	*/
	function calculateParametricVaR(returns, confidenceLevel) {
		const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
		const variance = returns.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (returns.length - 1);
		const stdDev = Math.sqrt(variance);
		const zScore = (0, getZScore_1.getZScore)(confidenceLevel);
		return {
			value: Math.abs(mean - zScore * stdDev),
			confidenceLevel,
			method: "parametric",
			cvar: Math.abs(mean - stdDev * (Math.exp(-Math.pow(zScore, 2) / 2) / (Math.sqrt(2 * Math.PI) * (1 - confidenceLevel))))
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioVolatilityOptionsSchema.js
var require_PortfolioVolatilityOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioVolatilityOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioVolatilityOptionsSchema = zod_1.z.object({
		weights: zod_1.z.array(zod_1.z.number()).refine((w) => Math.abs(w.reduce((sum, x) => sum + x, 0) - 1) < 1e-4, { message: "Weights must sum to 1" }),
		returns: zod_1.z.array(zod_1.z.array(zod_1.z.number())),
		annualizationFactor: zod_1.z.number().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioVolatilityResultSchema.js
var require_PortfolioVolatilityResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioVolatilityResultSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioVolatilityResultSchema = zod_1.z.object({
		volatility: zod_1.z.number(),
		annualizedVolatility: zod_1.z.number(),
		variance: zod_1.z.number(),
		covarianceMatrix: zod_1.z.array(zod_1.z.array(zod_1.z.number()))
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculatePortfolioVolatility.js
var require_calculatePortfolioVolatility = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculatePortfolioVolatility = calculatePortfolioVolatility;
	var PortfolioVolatilityOptionsSchema_1 = require_PortfolioVolatilityOptionsSchema();
	var PortfolioVolatilityResultSchema_1 = require_PortfolioVolatilityResultSchema();
	var calculateCovarianceMatrix_1 = require_calculateCovarianceMatrix();
	/**
	* Calculate Portfolio Volatility
	*
	* σ_p = √(w^T × Σ × w)
	* where:
	* w = weight vector
	* Σ = covariance matrix
	*
	* Accounts for correlations between assets.
	*
	* @param options - Weights, return series, annualization factor
	* @returns Portfolio volatility (period and annualized)
	*/
	function calculatePortfolioVolatility(options) {
		const { weights, returns, annualizationFactor } = PortfolioVolatilityOptionsSchema_1.PortfolioVolatilityOptionsSchema.parse(options);
		if (weights.length !== returns.length) throw new Error("Weights and returns arrays must have same length");
		const { matrix: covarianceMatrix } = (0, calculateCovarianceMatrix_1.calculateCovarianceMatrix)({ returns });
		let variance = 0;
		for (let i = 0; i < weights.length; i++) for (let j = 0; j < weights.length; j++) variance += weights[i] * weights[j] * covarianceMatrix[i][j];
		const volatility = Math.sqrt(variance);
		const annualizedVolatility = volatility * Math.sqrt(annualizationFactor);
		return PortfolioVolatilityResultSchema_1.PortfolioVolatilityResultSchema.parse({
			volatility,
			annualizedVolatility,
			variance,
			covarianceMatrix
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SemideviationOptionsSchema.js
var require_SemideviationOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SemideviationOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.SemideviationOptionsSchema = zod_1.z.object({
		/**
		* Array of returns to calculate semideviation for
		*/
		returns: zod_1.z.array(zod_1.z.number()).min(2, "At least 2 returns are required"),
		/**
		* Threshold for downside returns (default: 0 for zero threshold)
		*/
		threshold: zod_1.z.number().optional().default(0),
		/**
		* Annualization factor for converting to annualized values (default: 252 for daily data)
		*/
		annualizationFactor: zod_1.z.number().positive().optional().default(252),
		/**
		* Whether to return annualized semideviation (default: true)
		*/
		annualized: zod_1.z.boolean().optional().default(true)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SemideviationResultSchema.js
var require_SemideviationResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SemideviationResultSchema = void 0;
	var zod_1 = require_zod();
	exports.SemideviationResultSchema = zod_1.z.object({
		/**
		* Semideviation value (period-based)
		*/
		semideviation: zod_1.z.number(),
		/**
		* Annualized semideviation value
		*/
		annualizedSemideviation: zod_1.z.number(),
		/**
		* Number of downside returns (returns below threshold)
		*/
		downsideCount: zod_1.z.number().int().min(0),
		/**
		* Total number of returns
		*/
		totalCount: zod_1.z.number().int().positive(),
		/**
		* Percentage of returns that are downside returns
		*/
		downsidePercentage: zod_1.z.number().min(0).max(100),
		/**
		* Threshold used for calculation
		*/
		threshold: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Mean return of the dataset
		*/
		meanReturn: zod_1.z.number(),
		/**
		* Standard deviation of the dataset (for comparison)
		*/
		standardDeviation: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateSemideviation.js
var require_calculateSemideviation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSemideviation = calculateSemideviation;
	var SemideviationOptionsSchema_1 = require_SemideviationOptionsSchema();
	var SemideviationResultSchema_1 = require_SemideviationResultSchema();
	var calculateStandardDeviation_1 = require_calculateStandardDeviation();
	/**
	* Calculate Semideviation (Downside Deviation)
	*
	* Semideviation measures the volatility of returns below a specified threshold.
	* It's a key risk metric that focuses only on downside risk, ignoring positive volatility.
	*
	* Formula: σ⁻ = √(Σ(min(ri - threshold, 0)²) / n)
	* Where:
	* - ri = individual return
	* - threshold = minimum acceptable return (typically 0 or mean)
	* - n = total number of observations
	*
	* @param options - Returns, threshold, annualization factor
	* @returns Semideviation metrics including period and annualized values
	*
	* @example
	* ```typescript
	* const semideviation = calculateSemideviation({
	*   returns: [0.01, -0.02, 0.03, -0.01, -0.05, 0.02],
	*   threshold: 0, // Zero threshold
	*   annualizationFactor: 252
	* });
	*
	* console.log('Semideviation:', semideviation.semideviation);
	* console.log('Annualized:', semideviation.annualizedSemideviation);
	* console.log('Downside %:', semideviation.downsidePercentage); // 50%
	* ```
	*/
	function calculateSemideviation(options) {
		const { returns, threshold, annualizationFactor, annualized } = SemideviationOptionsSchema_1.SemideviationOptionsSchema.parse(options);
		if (returns.length < 2) throw new Error("At least 2 returns are required to calculate semideviation");
		const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
		const standardDeviation = (0, calculateStandardDeviation_1.calculateStandardDeviation)(returns);
		const downsideReturns = returns.filter((r) => r < threshold);
		const downsideCount = downsideReturns.length;
		const totalCount = returns.length;
		const downsidePercentage = downsideCount / totalCount * 100;
		let semideviation = 0;
		if (downsideCount > 0) {
			const downsideVariance = downsideReturns.reduce((sum, r) => sum + Math.pow(r - threshold, 2), 0) / totalCount;
			semideviation = Math.sqrt(downsideVariance);
		}
		const annualizedSemideviation = annualized ? semideviation * Math.sqrt(annualizationFactor) : semideviation;
		return SemideviationResultSchema_1.SemideviationResultSchema.parse({
			semideviation,
			annualizedSemideviation,
			downsideCount,
			totalCount,
			downsidePercentage,
			threshold,
			annualizationFactor,
			meanReturn,
			standardDeviation
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SharpeRatioOptionsSchema.js
var require_SharpeRatioOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SharpeRatioOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.SharpeRatioOptionsSchema = zod_1.z.object({
		returns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 returns"),
		riskFreeRate: zod_1.z.number().default(0),
		annualizationFactor: zod_1.z.number().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SharpeRatioResultSchema.js
var require_SharpeRatioResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SharpeRatioResultSchema = void 0;
	var zod_1 = require_zod();
	exports.SharpeRatioResultSchema = zod_1.z.object({
		sharpeRatio: zod_1.z.number(),
		annualizedReturn: zod_1.z.number(),
		annualizedVolatility: zod_1.z.number(),
		excessReturn: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateSharpeRatio.js
var require_calculateSharpeRatio = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSharpeRatio = calculateSharpeRatio;
	var SharpeRatioOptionsSchema_1 = require_SharpeRatioOptionsSchema();
	var SharpeRatioResultSchema_1 = require_SharpeRatioResultSchema();
	var calculateStandardDeviation_1 = require_calculateStandardDeviation();
	/**
	* Calculate Sharpe Ratio
	*
	* Sharpe = (Mean Return - Risk-Free Rate) / StdDev
	*
	* @param options - Returns, risk-free rate, annualization factor
	* @returns Sharpe Ratio and related metrics
	*/
	function calculateSharpeRatio(options) {
		const { returns, riskFreeRate, annualizationFactor } = SharpeRatioOptionsSchema_1.SharpeRatioOptionsSchema.parse(options);
		const annualizedReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length * annualizationFactor;
		const annualizedVolatility = (0, calculateStandardDeviation_1.calculateStandardDeviation)(returns) * Math.sqrt(annualizationFactor);
		const excessReturn = annualizedReturn - riskFreeRate;
		const sharpeRatio = annualizedVolatility !== 0 ? excessReturn / annualizedVolatility : 0;
		return SharpeRatioResultSchema_1.SharpeRatioResultSchema.parse({
			sharpeRatio,
			annualizedReturn,
			annualizedVolatility,
			excessReturn
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateSkewness.js
var require_calculateSkewness = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSkewness = calculateSkewness;
	/**
	* Calculate Skewness (Third Moment) of a dataset
	*
	* Skewness measures the asymmetry of the distribution:
	* - Positive skewness: Distribution is skewed to the right (long right tail)
	* - Negative skewness: Distribution is skewed to the left (long left tail)
	* - Zero skewness: Symmetric distribution
	*
	* Formula: Skewness = E[(X - μ)³] / σ³
	* Where:
	* - μ = mean
	* - σ = standard deviation
	* - E[(X - μ)³] = third central moment
	*
	* @param data Array of numbers to calculate skewness for
	* @returns Skewness value
	*
	* @example
	* ```typescript
	* const returns = [0.01, 0.02, -0.01, 0.03, -0.02, -0.05, 0.01];
	* const skewness = calculateSkewness(returns);
	* console.log('Skewness:', skewness); // -0.234
	* ```
	*/
	function calculateSkewness(data) {
		if (data.length === 0) throw new Error("Data array cannot be empty");
		if (data.length < 3) throw new Error("At least 3 data points are required to calculate skewness");
		const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
		const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
		const standardDeviation = Math.sqrt(variance);
		if (standardDeviation === 0) return 0;
		return data.reduce((sum, value) => sum + Math.pow(value - mean, 3), 0) / data.length / Math.pow(standardDeviation, 3);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SortinoRatioOptionsSchema.js
var require_SortinoRatioOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SortinoRatioOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.SortinoRatioOptionsSchema = zod_1.z.object({
		returns: zod_1.z.array(zod_1.z.number()).min(2, "Need at least 2 returns"),
		riskFreeRate: zod_1.z.number().default(0),
		targetReturn: zod_1.z.number().default(0),
		annualizationFactor: zod_1.z.number().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/SortinoRatioResultSchema.js
var require_SortinoRatioResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SortinoRatioResultSchema = void 0;
	var zod_1 = require_zod();
	exports.SortinoRatioResultSchema = zod_1.z.object({
		sortinoRatio: zod_1.z.number(),
		annualizedReturn: zod_1.z.number(),
		downsideDeviation: zod_1.z.number(),
		annualizedDownsideDeviation: zod_1.z.number(),
		excessReturn: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateSortinoRatio.js
var require_calculateSortinoRatio = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateSortinoRatio = calculateSortinoRatio;
	var SortinoRatioOptionsSchema_1 = require_SortinoRatioOptionsSchema();
	var SortinoRatioResultSchema_1 = require_SortinoRatioResultSchema();
	/**
	* Calculate Sortino Ratio
	*
	* Sortino = (Mean Return - Target Return) / Downside Deviation
	*
	* Unlike Sharpe, only penalizes downside volatility (returns < target).
	*
	* @param options - Returns, target return, risk-free rate, annualization
	* @returns Sortino Ratio and downside deviation metrics
	*/
	function calculateSortinoRatio(options) {
		const { returns, riskFreeRate, targetReturn, annualizationFactor } = SortinoRatioOptionsSchema_1.SortinoRatioOptionsSchema.parse(options);
		const annualizedReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length * annualizationFactor;
		const downsideReturns = returns.filter((r) => r < targetReturn);
		if (downsideReturns.length === 0) return SortinoRatioResultSchema_1.SortinoRatioResultSchema.parse({
			sortinoRatio: 999999,
			annualizedReturn,
			downsideDeviation: 0,
			annualizedDownsideDeviation: 0,
			excessReturn: annualizedReturn - riskFreeRate
		});
		const downsideVariance = downsideReturns.reduce((sum, r) => sum + Math.pow(r - targetReturn, 2), 0) / returns.length;
		const downsideDeviation = Math.sqrt(downsideVariance);
		const annualizedDownsideDeviation = downsideDeviation * Math.sqrt(annualizationFactor);
		const excessReturn = annualizedReturn - riskFreeRate;
		const sortinoRatio = annualizedDownsideDeviation !== 0 ? excessReturn / annualizedDownsideDeviation : 0;
		return SortinoRatioResultSchema_1.SortinoRatioResultSchema.parse({
			sortinoRatio,
			annualizedReturn,
			downsideDeviation,
			annualizedDownsideDeviation,
			excessReturn
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/VaROptionsSchema.js
var require_VaROptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VaROptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for VaR calculation options
	*/
	exports.VaROptionsSchema = zod_1.z.object({
		/** Confidence level (e.g., 0.95 for 95%) */
		confidenceLevel: zod_1.z.number().min(0).max(1).describe("Confidence level between 0 and 1"),
		/** Method to use for calculation */
		method: zod_1.z.enum([
			"historical",
			"parametric",
			"monteCarlo"
		]).optional().default("historical"),
		/** Number of simulations for Monte Carlo (if applicable) */
		simulations: zod_1.z.number().int().positive().optional().default(1e4)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateVaR.js
var require_calculateVaR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateVaR = calculateVaR;
	var VaROptionsSchema_1 = require_VaROptionsSchema();
	var calculateHistoricalVaR_1 = require_calculateHistoricalVaR();
	var calculateMonteCarloVaR_1 = require_calculateMonteCarloVaR();
	var calculateParametricVaR_1 = require_calculateParametricVaR();
	/**
	* Calculate Value at Risk using historical method
	*
	* @param returns - Array of historical returns (e.g., daily returns)
	* @param options - VaR calculation options
	* @returns VaR result with value and metadata
	*
	* @example
	* ```typescript
	* const returns = [-0.02, 0.01, -0.015, 0.03, -0.01];
	* const var95 = calculateVaR(returns, { confidenceLevel: 0.95 });
	* console.log(`95% VaR: ${var95.value}`);
	* ```
	*/
	function calculateVaR(returns, options) {
		const { confidenceLevel, method, simulations } = VaROptionsSchema_1.VaROptionsSchema.parse(options);
		if (returns.length === 0) throw new Error("Returns array cannot be empty");
		if (confidenceLevel <= 0 || confidenceLevel >= 1) throw new Error("Confidence level must be between 0 and 1");
		switch (method) {
			case "historical": return (0, calculateHistoricalVaR_1.calculateHistoricalVaR)(returns, confidenceLevel);
			case "parametric": return (0, calculateParametricVaR_1.calculateParametricVaR)(returns, confidenceLevel);
			case "monteCarlo": return (0, calculateMonteCarloVaR_1.calculateMonteCarloVaR)(returns, confidenceLevel, simulations);
			default: throw new Error(`Unknown VaR method: ${method}`);
		}
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateVaR95.js
var require_calculateVaR95 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateVaR95 = calculateVaR95;
	var calculateVaR_1 = require_calculateVaR();
	/**
	* Convenience function for 95% VaR
	*/
	function calculateVaR95(returns) {
		return (0, calculateVaR_1.calculateVaR)(returns, { confidenceLevel: .95 }).value;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/risk/calculateVaR99.js
var require_calculateVaR99 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateVaR99 = calculateVaR99;
	var calculateVaR_1 = require_calculateVaR();
	/**
	* Convenience function for 99% VaR
	*/
	function calculateVaR99(returns) {
		return (0, calculateVaR_1.calculateVaR)(returns, { confidenceLevel: .99 }).value;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/TimeWeightedReturnOptionsSchema.js
var require_TimeWeightedReturnOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TimeWeightedReturnOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.TimeWeightedReturnOptionsSchema = zod_1.z.object({
		/**
		* Array of portfolio values at the end of each period
		*/
		portfolioValues: zod_1.z.array(zod_1.z.number().positive()).min(2),
		/**
		* Array of cash flows (positive for inflows, negative for outflows)
		* Must have same length as portfolioValues
		*/
		cashFlows: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/TimeWeightedReturnResultSchema.js
var require_TimeWeightedReturnResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TimeWeightedReturnResultSchema = void 0;
	var zod_1 = require_zod();
	exports.TimeWeightedReturnResultSchema = zod_1.z.object({
		/**
		* Time-weighted return (period)
		*/
		twr: zod_1.z.number(),
		/**
		* Annualized time-weighted return
		*/
		annualizedTWR: zod_1.z.number(),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number(),
		/**
		* Individual period returns
		*/
		periodReturns: zod_1.z.array(zod_1.z.number())
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateTimeWeightedReturn.js
var require_calculateTimeWeightedReturn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateTimeWeightedReturn = calculateTimeWeightedReturn;
	var TimeWeightedReturnOptionsSchema_1 = require_TimeWeightedReturnOptionsSchema();
	var TimeWeightedReturnResultSchema_1 = require_TimeWeightedReturnResultSchema();
	/**
	* Calculate Time-Weighted Return (TWR)
	*
	* TWR measures portfolio performance independent of cash flows.
	* It eliminates the impact of timing and size of contributions/withdrawals.
	*
	* Formula: TWR = ∏(1 + r_i) - 1
	* where r_i = (V_i - V_{i-1} - CF_i) / (V_{i-1} + CF_i)
	*
	* @param options - Portfolio values, cash flows, and annualization factor
	* @returns TWR result with period and annualized returns
	*
	* @example
	* ```typescript
	* const twr = calculateTimeWeightedReturn({
	*   portfolioValues: [1000, 1100, 1200, 1150],
	*   cashFlows: [0, 100, -50, 0],
	*   annualizationFactor: 252
	* });
	* ```
	*/
	function calculateTimeWeightedReturn(options) {
		const { portfolioValues, cashFlows, annualizationFactor } = TimeWeightedReturnOptionsSchema_1.TimeWeightedReturnOptionsSchema.parse(options);
		if (portfolioValues.length !== cashFlows.length) throw new Error("Portfolio values and cash flows must have same length");
		if (portfolioValues.length < 2) throw new Error("At least 2 periods required for TWR calculation");
		const periodReturns = [];
		for (let i = 1; i < portfolioValues.length; i++) {
			const currentValue = portfolioValues[i];
			const previousValue = portfolioValues[i - 1];
			const cashFlow = cashFlows[i];
			const numerator = currentValue - previousValue - cashFlow;
			const denominator = previousValue + cashFlow;
			if (denominator <= 0) throw new Error(`Invalid denominator for period ${i}: ${denominator}. Check cash flows.`);
			const periodReturn = numerator / denominator;
			periodReturns.push(periodReturn);
		}
		const twr = periodReturns.reduce((product, return_) => product * (1 + return_), 1) - 1;
		const periods = periodReturns.length;
		const annualizedTWR = Math.pow(1 + twr, annualizationFactor / periods) - 1;
		return TimeWeightedReturnResultSchema_1.TimeWeightedReturnResultSchema.parse({
			twr,
			annualizedTWR,
			periods,
			periodReturns
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/MoneyWeightedReturnOptionsSchema.js
var require_MoneyWeightedReturnOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MoneyWeightedReturnOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.MoneyWeightedReturnOptionsSchema = zod_1.z.object({
		/**
		* Array of cash flows (positive for inflows, negative for outflows)
		*/
		cashFlows: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Array of dates corresponding to each cash flow
		*/
		dates: zod_1.z.array(zod_1.z.date()).min(2),
		/**
		* Final portfolio value
		*/
		finalValue: zod_1.z.number().positive(),
		/**
		* Initial portfolio value (optional, defaults to 0)
		*/
		initialValue: zod_1.z.number().nonnegative().default(0),
		/**
		* Maximum number of iterations for IRR calculation
		*/
		maxIterations: zod_1.z.number().positive().optional(),
		/**
		* Tolerance for IRR convergence
		*/
		tolerance: zod_1.z.number().positive().optional()
	}).transform((data) => ({
		...data,
		maxIterations: data.maxIterations ?? 100,
		tolerance: data.tolerance ?? 1e-6
	}));
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/MoneyWeightedReturnResultSchema.js
var require_MoneyWeightedReturnResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MoneyWeightedReturnResultSchema = void 0;
	var zod_1 = require_zod();
	exports.MoneyWeightedReturnResultSchema = zod_1.z.object({
		/**
		* Money-weighted return (period)
		*/
		mwr: zod_1.z.number(),
		/**
		* Annualized money-weighted return
		*/
		annualizedMWR: zod_1.z.number(),
		/**
		* Number of cash flows
		*/
		cashFlowCount: zod_1.z.number(),
		/**
		* Total time period in years
		*/
		timePeriodYears: zod_1.z.number(),
		/**
		* Net present value at calculated rate
		*/
		npv: zod_1.z.number(),
		/**
		* Number of iterations used for convergence
		*/
		iterations: zod_1.z.number(),
		/**
		* Method used for IRR calculation ('newton-raphson' or 'bisection')
		*/
		method: zod_1.z.enum(["newton-raphson", "bisection"]).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateInitialGuess.js
var require_calculateInitialGuess = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateInitialGuess = calculateInitialGuess;
	/**
	* Calculate improved initial guess for IRR calculation
	*
	* Uses a simple approximation based on total cash flows to provide
	* a better starting point than a fixed value, which can improve
	* convergence speed and stability.
	*
	* @param cashFlows - Array of cash flows (positive for inflows, negative for outflows)
	* @returns Initial guess for discount rate (as decimal)
	*/
	function calculateInitialGuess(cashFlows) {
		if (cashFlows.length === 0) return .1;
		const totalInflows = cashFlows.reduce((sum, cf) => sum + Math.max(0, cf), 0);
		const totalOutflows = Math.abs(cashFlows.reduce((sum, cf) => sum + Math.min(0, cf), 0));
		const finalValue = cashFlows[cashFlows.length - 1];
		if (totalOutflows > 0 && totalInflows > 0) {
			const approxReturn = (finalValue - totalOutflows) / (totalInflows + totalOutflows);
			if (approxReturn > -.99 && approxReturn < 10) return approxReturn;
		}
		if (finalValue < totalOutflows) return -.1;
		return .1;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateNPV.js
var require_calculateNPV = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateNPV = calculateNPV;
	/**
	* Calculate Net Present Value (NPV) of cash flows
	*
	* NPV = Σ(CF_i / (1 + r)^t_i)
	*
	* @param cashFlows - Array of cash flows (positive for inflows, negative for outflows)
	* @param timePeriods - Array of time periods in years corresponding to each cash flow
	* @param rate - Discount rate (as decimal, e.g., 0.1 for 10%)
	* @returns Net Present Value
	*/
	function calculateNPV(cashFlows, timePeriods, rate) {
		if (cashFlows.length !== timePeriods.length) throw new Error("Cash flows and time periods must have same length");
		if (rate <= -1) throw new Error("Discount rate must be greater than -1");
		return cashFlows.reduce((sum, cf, index) => {
			const time = timePeriods[index];
			if (time < 0) throw new Error("Time periods must be non-negative");
			return sum + cf / Math.pow(1 + rate, time);
		}, 0);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateNPVDerivative.js
var require_calculateNPVDerivative = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateNPVDerivative = calculateNPVDerivative;
	/**
	* Calculate derivative of Net Present Value (NPV) with respect to discount rate
	*
	* NPV' = -Σ(CF_i * t_i / (1 + r)^(t_i + 1))
	*
	* This is used in the Newton-Raphson method for IRR calculation.
	*
	* @param cashFlows - Array of cash flows (positive for inflows, negative for outflows)
	* @param timePeriods - Array of time periods in years corresponding to each cash flow
	* @param rate - Discount rate (as decimal, e.g., 0.1 for 10%)
	* @returns Derivative of NPV with respect to rate
	*/
	function calculateNPVDerivative(cashFlows, timePeriods, rate) {
		if (cashFlows.length !== timePeriods.length) throw new Error("Cash flows and time periods must have same length");
		if (rate <= -1) throw new Error("Discount rate must be greater than -1");
		return cashFlows.reduce((sum, cf, index) => {
			const time = timePeriods[index];
			if (time < 0) throw new Error("Time periods must be non-negative");
			return sum - cf * time / Math.pow(1 + rate, time + 1);
		}, 0);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateIRRWithNewtonRaphson.js
var require_calculateIRRWithNewtonRaphson = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateIRRWithNewtonRaphson = calculateIRRWithNewtonRaphson;
	var calculateNPV_1 = require_calculateNPV();
	var calculateNPVDerivative_1 = require_calculateNPVDerivative();
	/**
	* Calculate IRR using Damped Newton-Raphson method with step size limiting and backtracking
	*
	* This is a robust implementation that includes:
	* - Step size limiting to prevent divergence
	* - Damping factor for stability
	* - Backtracking line search
	* - Automatic fallback triggers
	*
	* @param cashFlows - Array of cash flows
	* @param timePeriods - Array of time periods in years
	* @param initialRate - Initial guess for discount rate
	* @param maxIterations - Maximum number of iterations
	* @param tolerance - Convergence tolerance
	* @returns IRR result with rate, iterations, and method used
	* @throws Error if convergence fails or derivative becomes too small
	*/
	function calculateIRRWithNewtonRaphson(cashFlows, timePeriods, initialRate, maxIterations, tolerance) {
		let rate = initialRate;
		let previousNPV = Infinity;
		let worseningCount = 0;
		for (let i = 0; i < maxIterations; i++) {
			const npv = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, rate);
			const npvDerivative = (0, calculateNPVDerivative_1.calculateNPVDerivative)(cashFlows, timePeriods, rate);
			if (Math.abs(npv) < tolerance) return {
				rate,
				iterations: i + 1,
				method: "newton-raphson"
			};
			if (Math.abs(npvDerivative) < 1e-8) throw new Error("Derivative too small, switching to bisection");
			const step = npv / npvDerivative;
			const maxStep = Math.min(Math.abs(rate) * .5, .1);
			let dampingFactor = Math.min(1, maxStep / Math.max(Math.abs(step), 1e-10));
			const initialNewRate = rate - dampingFactor * step;
			let bestRate = initialNewRate;
			let bestNPV = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, initialNewRate);
			for (let backtrack = 0; backtrack < 5; backtrack++) {
				const testRate = rate - dampingFactor * step;
				if (testRate < -.99 || testRate > 10) {
					dampingFactor *= .5;
					continue;
				}
				const testNPV = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testRate);
				if (Math.abs(testNPV) <= Math.abs(npv) * 1.1) {
					bestRate = testRate;
					bestNPV = testNPV;
					break;
				}
				dampingFactor *= .5;
			}
			const stepSize = Math.abs(bestRate - rate);
			if (stepSize > 10 * Math.abs(rate)) throw new Error("Newton-Raphson diverging, switching to bisection");
			if (stepSize < tolerance && Math.abs(bestNPV) < tolerance) return {
				rate: bestRate,
				iterations: i + 1,
				method: "newton-raphson"
			};
			if (stepSize < tolerance && Math.abs(bestNPV) > tolerance * 1e3) throw new Error("Step size small but NPV still large, switching to bisection");
			if (Math.abs(bestNPV) > Math.abs(previousNPV) * 1.1) {
				worseningCount++;
				if (worseningCount >= 3) throw new Error("NPV worsening repeatedly, switching to bisection");
			} else worseningCount = 0;
			rate = Math.max(-.99, Math.min(10, bestRate));
			previousNPV = bestNPV;
		}
		throw new Error(`Newton-Raphson did not converge after ${maxIterations} iterations`);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateIRRWithBisection.js
var require_calculateIRRWithBisection = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateIRRWithBisection = calculateIRRWithBisection;
	var calculateNPV_1 = require_calculateNPV();
	/**
	* Calculate IRR using Bisection method (robust fallback)
	*
	* Bisection is a robust root-finding method that guarantees convergence
	* if a sign change exists in the interval. It's slower than Newton-Raphson
	* but more stable for difficult cases.
	*
	* @param cashFlows - Array of cash flows
	* @param timePeriods - Array of time periods in years
	* @param maxIterations - Maximum number of iterations
	* @param tolerance - Convergence tolerance
	* @returns IRR result with rate, iterations, and method used
	* @throws Error if no sign change found in reasonable interval
	*/
	function calculateIRRWithBisection(cashFlows, timePeriods, maxIterations, tolerance) {
		let a = -.99;
		let b = 10;
		let npvA = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, a);
		let npvB = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, b);
		if (npvA * npvB > 0) {
			const intervals = [
				[-.99, -.5],
				[-.5, 0],
				[0, .5],
				[.5, 2],
				[2, 5],
				[5, 10]
			];
			let foundInterval = false;
			for (const [testA, testB] of intervals) {
				const testNpvA = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testA);
				const testNpvB = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testB);
				if (testNpvA * testNpvB < 0) {
					a = testA;
					b = testB;
					npvA = testNpvA;
					npvB = testNpvB;
					foundInterval = true;
					break;
				}
			}
			if (!foundInterval) for (let testRate = -.99; testRate <= 10; testRate += .1) {
				const testNPV = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testRate);
				if (Math.abs(testNPV) < tolerance) return {
					rate: testRate,
					iterations: 0,
					method: "bisection"
				};
				if (testRate > -.99) {
					const prevNPV = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testRate - .1);
					if (testNPV * prevNPV < 0) {
						a = testRate - .1;
						b = testRate;
						npvA = prevNPV;
						npvB = testNPV;
						foundInterval = true;
						break;
					}
				}
			}
			if (!foundInterval) {
				let bestRate = .1;
				let bestNPV = Math.abs((0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, bestRate));
				for (let testRate = -.99; testRate <= 10; testRate += .01) {
					const testNPV = Math.abs((0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, testRate));
					if (testNPV < bestNPV) {
						bestNPV = testNPV;
						bestRate = testRate;
					}
				}
				if (bestNPV < tolerance * 100) return {
					rate: bestRate,
					iterations: 0,
					method: "bisection"
				};
				throw new Error("Bisection failed: no sign change found in reasonable interval");
			}
		}
		for (let i = 0; i < maxIterations; i++) {
			const c = (a + b) / 2;
			const npvC = (0, calculateNPV_1.calculateNPV)(cashFlows, timePeriods, c);
			if (Math.abs(npvC) < tolerance || Math.abs(b - a) < tolerance) return {
				rate: c,
				iterations: i + 1,
				method: "bisection"
			};
			if (npvA * npvC < 0) {
				b = c;
				npvB = npvC;
			} else {
				a = c;
				npvA = npvC;
			}
		}
		return {
			rate: (a + b) / 2,
			iterations: maxIterations,
			method: "bisection"
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/irr/calculateIRR.js
var require_calculateIRR = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateIRR = calculateIRR;
	var calculateInitialGuess_1 = require_calculateInitialGuess();
	var calculateIRRWithNewtonRaphson_1 = require_calculateIRRWithNewtonRaphson();
	var calculateIRRWithBisection_1 = require_calculateIRRWithBisection();
	/**
	* Calculate Internal Rate of Return (IRR) using improved Newton-Raphson with Bisection fallback
	*
	* This function attempts to use the fast Newton-Raphson method first, and automatically
	* falls back to the robust Bisection method if Newton-Raphson encounters problems
	* (e.g., small derivatives, divergence, or repeated worsening).
	*
	* @param cashFlows - Array of cash flows (positive for inflows, negative for outflows)
	* @param timePeriods - Array of time periods in years corresponding to each cash flow
	* @param maxIterations - Maximum number of iterations for convergence
	* @param tolerance - Convergence tolerance (default: 1e-6)
	* @returns IRR result with rate, iterations, and method used
	*/
	function calculateIRR(cashFlows, timePeriods, maxIterations, tolerance) {
		if (cashFlows.length !== timePeriods.length) throw new Error("Cash flows and time periods must have same length");
		if (cashFlows.length < 2) throw new Error("At least 2 cash flows required for IRR calculation");
		const initialRate = (0, calculateInitialGuess_1.calculateInitialGuess)(cashFlows);
		try {
			return (0, calculateIRRWithNewtonRaphson_1.calculateIRRWithNewtonRaphson)(cashFlows, timePeriods, initialRate, maxIterations, tolerance);
		} catch (error) {
			return (0, calculateIRRWithBisection_1.calculateIRRWithBisection)(cashFlows, timePeriods, maxIterations, tolerance);
		}
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateMoneyWeightedReturn.js
var require_calculateMoneyWeightedReturn = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateMoneyWeightedReturn = calculateMoneyWeightedReturn;
	var MoneyWeightedReturnOptionsSchema_1 = require_MoneyWeightedReturnOptionsSchema();
	var MoneyWeightedReturnResultSchema_1 = require_MoneyWeightedReturnResultSchema();
	var calculateIRR_1 = require_calculateIRR();
	var calculateNPV_1 = require_calculateNPV();
	/**
	* Calculate Money-Weighted Return (MWR) using Internal Rate of Return (IRR)
	*
	* MWR measures the actual return earned by an investor based on their
	* specific cash flow timing and amounts. It's also known as Internal Rate of Return.
	*
	* The MWR is the discount rate that makes the NPV of all cash flows equal to zero:
	* NPV = CF₀ + CF₁/(1+r) + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ = 0
	*
	* @param options - Cash flows, dates, final value, and IRR calculation parameters
	* @returns MWR result with period and annualized returns
	*
	* @example
	* ```typescript
	* const mwr = calculateMoneyWeightedReturn({
	*   cashFlows: [-1000, 100, -50],
	*   dates: [new Date('2023-01-01'), new Date('2023-06-01'), new Date('2023-12-01')],
	*   finalValue: 1200,
	*   initialValue: 0
	* });
	* ```
	*/
	function calculateMoneyWeightedReturn(options) {
		const { cashFlows, dates, finalValue, initialValue, maxIterations, tolerance } = MoneyWeightedReturnOptionsSchema_1.MoneyWeightedReturnOptionsSchema.parse(options);
		if (cashFlows.length !== dates.length) throw new Error("Cash flows and dates must have same length");
		if (cashFlows.length < 2) throw new Error("At least 2 cash flows required for MWR calculation");
		const allCashFlows = [];
		const allDates = [];
		if (initialValue > 0) {
			allCashFlows.push(-initialValue);
			allDates.push(dates[0]);
		}
		for (let i = 0; i < cashFlows.length; i++) {
			allCashFlows.push(cashFlows[i]);
			allDates.push(dates[i]);
		}
		const lastDate = dates[dates.length - 1];
		const lastDateInAllDates = allDates[allDates.length - 1];
		if (lastDate.getTime() === lastDateInAllDates.getTime()) allCashFlows[allCashFlows.length - 1] += finalValue;
		else {
			allCashFlows.push(finalValue);
			allDates.push(lastDate);
		}
		const startDate = allDates[0];
		const timePeriods = allDates.map((date) => {
			return (date.getTime() - startDate.getTime()) / 315576e5;
		});
		const irrResult = (0, calculateIRR_1.calculateIRR)(allCashFlows, timePeriods, maxIterations, tolerance);
		const totalTimeYears = timePeriods[timePeriods.length - 1];
		const annualizedMWR = Math.pow(1 + irrResult.rate, 1 / totalTimeYears) - 1;
		const npv = (0, calculateNPV_1.calculateNPV)(allCashFlows, timePeriods, irrResult.rate);
		return MoneyWeightedReturnResultSchema_1.MoneyWeightedReturnResultSchema.parse({
			mwr: irrResult.rate,
			annualizedMWR,
			cashFlowCount: allCashFlows.length,
			timePeriodYears: totalTimeYears,
			npv,
			iterations: irrResult.iterations,
			method: irrResult.method
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioMetricsOptionsSchema.js
var require_PortfolioMetricsOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioMetricsOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioMetricsOptionsSchema = zod_1.z.object({
		/**
		* Portfolio values over time (e.g., [100000, 105000, 108000, 102000])
		*/
		portfolioValues: zod_1.z.array(zod_1.z.number().positive()).min(2),
		/**
		* Optional: Dates corresponding to each portfolio value
		*/
		dates: zod_1.z.array(zod_1.z.date()).optional(),
		/**
		* Optional: Cash flows (contributions/withdrawals) at each period
		* Positive for contributions, negative for withdrawals
		*/
		cashFlows: zod_1.z.array(zod_1.z.number()).optional(),
		/**
		* Risk-free rate for risk-adjusted metrics
		*/
		riskFreeRate: zod_1.z.number().default(.02),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252),
		/**
		* Confidence level for Value at Risk calculations (e.g., 0.05 for 5%)
		*/
		confidenceLevel: zod_1.z.number().min(0).max(1).default(.05)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioMetricsResultSchema.js
var require_PortfolioMetricsResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioMetricsResultSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioMetricsResultSchema = zod_1.z.object({
		/**
		* Total return over the entire period
		*/
		totalReturn: zod_1.z.number(),
		/**
		* Compound Annual Growth Rate (CAGR)
		*/
		cagr: zod_1.z.number(),
		/**
		* Maximum drawdown (largest peak-to-trough decline)
		*/
		maxDrawdown: zod_1.z.number(),
		/**
		* Maximum drawdown as a percentage
		*/
		maxDrawdownPercent: zod_1.z.number(),
		/**
		* Current drawdown (current decline from peak)
		*/
		currentDrawdown: zod_1.z.number(),
		/**
		* Current drawdown as a percentage
		*/
		currentDrawdownPercent: zod_1.z.number(),
		/**
		* Sharpe ratio (risk-adjusted return)
		*/
		sharpeRatio: zod_1.z.number(),
		/**
		* Sortino ratio (downside risk-adjusted return)
		*/
		sortinoRatio: zod_1.z.number(),
		/**
		* Value at Risk (VaR) at specified confidence level
		*/
		valueAtRisk: zod_1.z.number(),
		/**
		* Expected Shortfall (Conditional VaR) at specified confidence level
		*/
		expectedShortfall: zod_1.z.number(),
		/**
		* Volatility (annualized standard deviation of returns)
		*/
		volatility: zod_1.z.number(),
		/**
		* Mean return (annualized)
		*/
		meanReturn: zod_1.z.number(),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number().int().positive(),
		/**
		* Number of years (calculated from periods and annualization factor)
		*/
		years: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Risk-free rate used
		*/
		riskFreeRate: zod_1.z.number(),
		/**
		* Confidence level used for VaR/ES calculations
		*/
		confidenceLevel: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculatePortfolioMetrics.js
var require_calculatePortfolioMetrics = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculatePortfolioMetrics = calculatePortfolioMetrics;
	var PortfolioMetricsOptionsSchema_1 = require_PortfolioMetricsOptionsSchema();
	var PortfolioMetricsResultSchema_1 = require_PortfolioMetricsResultSchema();
	var calculateParametricExpectedShortfall_1 = require_calculateParametricExpectedShortfall();
	var calculateParametricVaR_1 = require_calculateParametricVaR();
	var calculateStandardDeviation_1 = require_calculateStandardDeviation();
	/**
	* Calculate Portfolio-Level Metrics
	*
	* Calculates comprehensive portfolio performance and risk metrics:
	*
	* 1. Total Return: (Final Value - Initial Value) / Initial Value
	* 2. CAGR: Compound Annual Growth Rate
	* 3. Max Drawdown: Largest peak-to-trough decline
	* 4. Sharpe Ratio: (Mean Return - Risk-Free Rate) / Volatility
	* 5. Sortino Ratio: (Mean Return - Risk-Free Rate) / Downside Deviation
	* 6. Value at Risk (VaR): Potential loss at confidence level
	* 7. Expected Shortfall: Expected loss beyond VaR
	* 8. Volatility: Annualized standard deviation of returns
	*
	* @param options - Portfolio values, dates, cash flows, and calculation parameters
	* @returns Comprehensive portfolio metrics
	*
	* @example
	* ```typescript
	* const metrics = calculatePortfolioMetrics({
	*   portfolioValues: [100000, 105000, 108000, 102000, 110000],
	*   dates: [new Date('2023-01-01'), new Date('2023-02-01'), new Date('2023-03-01'), new Date('2023-04-01'), new Date('2023-05-01')],
	*   riskFreeRate: 0.02,
	*   annualizationFactor: 12 // Monthly data
	* });
	* ```
	*/
	function calculatePortfolioMetrics(options) {
		const { portfolioValues, riskFreeRate, annualizationFactor, confidenceLevel } = PortfolioMetricsOptionsSchema_1.PortfolioMetricsOptionsSchema.parse(options);
		const periods = portfolioValues.length;
		const initialValue = portfolioValues[0];
		const finalValue = portfolioValues[periods - 1];
		const returns = [];
		for (let i = 1; i < periods; i++) returns.push((portfolioValues[i] - portfolioValues[i - 1]) / portfolioValues[i - 1]);
		const totalReturn = (finalValue - initialValue) / initialValue;
		const years = (periods - 1) / annualizationFactor;
		const cagr = years > 0 ? Math.pow(1 + totalReturn, 1 / years) - 1 : 0;
		let maxDrawdown = 0;
		let maxDrawdownPercent = 0;
		let peak = portfolioValues[0];
		for (let i = 0; i < periods; i++) {
			if (portfolioValues[i] > peak) peak = portfolioValues[i];
			const drawdown = peak - portfolioValues[i];
			const drawdownPercent = drawdown / peak;
			if (drawdown > maxDrawdown) {
				maxDrawdown = drawdown;
				maxDrawdownPercent = drawdownPercent;
			}
		}
		const currentPeak = Math.max(...portfolioValues);
		const currentDrawdown = currentPeak - finalValue;
		const currentDrawdownPercent = currentDrawdown / currentPeak;
		const meanReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length * annualizationFactor;
		const volatility = returns.length > 1 ? (0, calculateStandardDeviation_1.calculateStandardDeviation)(returns) * Math.sqrt(annualizationFactor) : 0;
		const sharpeRatio = volatility > 0 ? (meanReturn - riskFreeRate) / volatility : 0;
		const downsideReturns = returns.filter((r) => r < 0);
		const downsideDeviation = downsideReturns.length > 0 ? (0, calculateStandardDeviation_1.calculateStandardDeviation)(downsideReturns) * Math.sqrt(annualizationFactor) : 0;
		const sortinoRatio = downsideDeviation > 0 ? (meanReturn - riskFreeRate) / downsideDeviation : 0;
		let varValue = 0;
		let esValue = 0;
		if (returns.length >= 2) try {
			const varResult = (0, calculateParametricVaR_1.calculateParametricVaR)(returns, confidenceLevel);
			const esResult = (0, calculateParametricExpectedShortfall_1.calculateParametricExpectedShortfall)(returns, {
				confidenceLevel,
				method: "parametric",
				simulations: 1e4
			});
			varValue = -varResult.value;
			esValue = isNaN(esResult) ? 0 : -esResult;
		} catch (error) {
			varValue = 0;
			esValue = 0;
		}
		return PortfolioMetricsResultSchema_1.PortfolioMetricsResultSchema.parse({
			totalReturn,
			cagr,
			maxDrawdown,
			maxDrawdownPercent,
			currentDrawdown,
			currentDrawdownPercent,
			sharpeRatio,
			sortinoRatio,
			valueAtRisk: varValue,
			expectedShortfall: esValue,
			volatility,
			meanReturn,
			periods,
			years,
			annualizationFactor,
			riskFreeRate,
			confidenceLevel
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PerformanceAttributionOptionsSchema.js
var require_PerformanceAttributionOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PerformanceAttributionOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.PerformanceAttributionOptionsSchema = zod_1.z.object({
		/**
		* Portfolio returns for each period
		*/
		portfolioReturns: zod_1.z.array(zod_1.z.number()).min(1),
		/**
		* Benchmark returns for each period
		*/
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).min(1),
		/**
		* Asset returns for each asset and period (asset x period matrix)
		*/
		assetReturns: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(1),
		/**
		* Portfolio weights for each asset and period (asset x period matrix)
		*/
		portfolioWeights: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(1),
		/**
		* Benchmark weights for each asset and period (asset x period matrix)
		*/
		benchmarkWeights: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(1),
		/**
		* Attribution method
		* - 'brinson': Brinson attribution model
		* - 'arithmetic': Arithmetic attribution
		*/
		method: zod_1.z.enum(["brinson", "arithmetic"]).default("brinson"),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PerformanceAttributionResultSchema.js
var require_PerformanceAttributionResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PerformanceAttributionResultSchema = void 0;
	var zod_1 = require_zod();
	exports.PerformanceAttributionResultSchema = zod_1.z.object({
		/**
		* Total portfolio return
		*/
		portfolioReturn: zod_1.z.number(),
		/**
		* Total benchmark return
		*/
		benchmarkReturn: zod_1.z.number(),
		/**
		* Total excess return (portfolio - benchmark)
		*/
		excessReturn: zod_1.z.number(),
		/**
		* Asset allocation effect (sector/asset selection)
		*/
		allocationEffect: zod_1.z.number(),
		/**
		* Security selection effect (stock picking)
		*/
		selectionEffect: zod_1.z.number(),
		/**
		* Interaction effect (allocation × selection)
		*/
		interactionEffect: zod_1.z.number(),
		/**
		* Asset-level attribution breakdown
		*/
		assetAttribution: zod_1.z.array(zod_1.z.object({
			assetIndex: zod_1.z.number(),
			allocationEffect: zod_1.z.number(),
			selectionEffect: zod_1.z.number(),
			interactionEffect: zod_1.z.number(),
			totalEffect: zod_1.z.number()
		})),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number(),
		/**
		* Number of assets
		*/
		assets: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Attribution method used
		*/
		method: zod_1.z.enum(["brinson", "arithmetic"])
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculatePerformanceAttribution.js
var require_calculatePerformanceAttribution = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculatePerformanceAttribution = calculatePerformanceAttribution;
	var PerformanceAttributionOptionsSchema_1 = require_PerformanceAttributionOptionsSchema();
	var PerformanceAttributionResultSchema_1 = require_PerformanceAttributionResultSchema();
	/**
	* Calculate Performance Attribution
	*
	* Performance attribution decomposes excess returns into three components:
	* 1. Asset Allocation Effect: Returns from overweighting/underweighting sectors/assets
	* 2. Security Selection Effect: Returns from picking better/worse securities within sectors
	* 3. Interaction Effect: Returns from the combination of allocation and selection
	*
	* Brinson Model Formula:
	* - Allocation Effect = Σ(w_p - w_b) × r_b
	* - Selection Effect = Σ(w_b × (r_p - r_b))
	* - Interaction Effect = Σ(w_p - w_b) × (r_p - r_b)
	*
	* Where:
	* - w_p = portfolio weights, w_b = benchmark weights
	* - r_p = portfolio returns, r_b = benchmark returns
	*
	* @param options - Portfolio returns, benchmark returns, asset returns, and weights
	* @returns Performance attribution breakdown
	*
	* @example
	* ```typescript
	* const attribution = calculatePerformanceAttribution({
	*   portfolioReturns: [0.05, 0.03, 0.07],
	*   benchmarkReturns: [0.04, 0.03, 0.06],
	*   assetReturns: [
	*     [0.06, 0.04, 0.08], // Asset 1 returns
	*     [0.04, 0.02, 0.06]  // Asset 2 returns
	*   ],
	*   portfolioWeights: [
	*     [0.6, 0.5, 0.7], // Portfolio weights over time
	*     [0.4, 0.5, 0.3]
	*   ],
	*   benchmarkWeights: [
	*     [0.5, 0.5, 0.5], // Benchmark weights over time
	*     [0.5, 0.5, 0.5]
	*   ],
	*   method: 'brinson'
	* });
	* ```
	*/
	function calculatePerformanceAttribution(options) {
		const { portfolioReturns, benchmarkReturns, assetReturns, portfolioWeights, benchmarkWeights, method, annualizationFactor } = PerformanceAttributionOptionsSchema_1.PerformanceAttributionOptionsSchema.parse(options);
		const periods = portfolioReturns.length;
		const assets = assetReturns.length;
		if (benchmarkReturns.length !== periods) throw new Error("Benchmark returns length must match portfolio returns length");
		if (portfolioWeights.length !== assets || benchmarkWeights.length !== assets) throw new Error("Weight matrices must have same number of assets as asset returns");
		for (let i = 0; i < assets; i++) if (portfolioWeights[i].length !== periods || benchmarkWeights[i].length !== periods) throw new Error("Weight matrices must have same number of periods as returns");
		const portfolioReturn = portfolioReturns.reduce((sum, return_) => sum + return_, 0) / periods;
		const benchmarkReturn = benchmarkReturns.reduce((sum, return_) => sum + return_, 0) / periods;
		const excessReturn = portfolioReturn - benchmarkReturn;
		let allocationEffect = 0;
		let selectionEffect = 0;
		let interactionEffect = 0;
		const assetAttribution = [];
		for (let assetIndex = 0; assetIndex < assets; assetIndex++) {
			let assetAllocationEffect = 0;
			let assetSelectionEffect = 0;
			let assetInteractionEffect = 0;
			for (let periodIndex = 0; periodIndex < periods; periodIndex++) {
				const portfolioWeight = portfolioWeights[assetIndex][periodIndex];
				const benchmarkWeight = benchmarkWeights[assetIndex][periodIndex];
				const assetReturn = assetReturns[assetIndex][periodIndex];
				const benchmarkReturnPeriod = benchmarkReturns[periodIndex];
				if (method === "brinson") {
					const allocation = (portfolioWeight - benchmarkWeight) * benchmarkReturnPeriod;
					const selection = benchmarkWeight * (assetReturn - benchmarkReturnPeriod);
					const interaction = (portfolioWeight - benchmarkWeight) * (assetReturn - benchmarkReturnPeriod);
					assetAllocationEffect += allocation;
					assetSelectionEffect += selection;
					assetInteractionEffect += interaction;
				} else {
					const allocation = (portfolioWeight - benchmarkWeight) * assetReturn;
					const selection = benchmarkWeight * (assetReturn - benchmarkReturnPeriod);
					const interaction = 0;
					assetAllocationEffect += allocation;
					assetSelectionEffect += selection;
					assetInteractionEffect += interaction;
				}
			}
			assetAllocationEffect /= periods;
			assetSelectionEffect /= periods;
			assetInteractionEffect /= periods;
			const totalEffect = assetAllocationEffect + assetSelectionEffect + assetInteractionEffect;
			assetAttribution.push({
				assetIndex,
				allocationEffect: assetAllocationEffect,
				selectionEffect: assetSelectionEffect,
				interactionEffect: assetInteractionEffect,
				totalEffect
			});
			allocationEffect += assetAllocationEffect;
			selectionEffect += assetSelectionEffect;
			interactionEffect += assetInteractionEffect;
		}
		return PerformanceAttributionResultSchema_1.PerformanceAttributionResultSchema.parse({
			portfolioReturn,
			benchmarkReturn,
			excessReturn,
			allocationEffect,
			selectionEffect,
			interactionEffect,
			assetAttribution,
			periods,
			assets,
			annualizationFactor,
			method
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioOptimizationOptionsSchema.js
var require_PortfolioOptimizationOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioOptimizationOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioOptimizationOptionsSchema = zod_1.z.object({
		/**
		* Array of expected returns for each asset
		*/
		expectedReturns: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Covariance matrix (n x n) for the assets
		*/
		covarianceMatrix: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(1),
		/**
		* Risk-free rate (optional, required for Sharpe ratio optimization)
		*/
		riskFreeRate: zod_1.z.number().optional(),
		/**
		* Target return (optional, required for target return optimization)
		*/
		targetReturn: zod_1.z.number().optional(),
		/**
		* Minimum weight per asset (optional, defaults to 0)
		*/
		minWeight: zod_1.z.number().min(0).default(0),
		/**
		* Maximum weight per asset (optional, defaults to 1)
		*/
		maxWeight: zod_1.z.number().max(1).default(1),
		/**
		* Whether weights should sum to 1 (portfolio constraint)
		*/
		sumTo1: zod_1.z.boolean().default(true)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioOptimizationResultSchema.js
var require_PortfolioOptimizationResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioOptimizationResultSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioOptimizationResultSchema = zod_1.z.object({
		/**
		* Optimal weights for each asset
		*/
		weights: zod_1.z.array(zod_1.z.number()),
		/**
		* Expected portfolio return
		*/
		expectedReturn: zod_1.z.number(),
		/**
		* Portfolio variance
		*/
		variance: zod_1.z.number(),
		/**
		* Portfolio volatility (standard deviation)
		*/
		volatility: zod_1.z.number(),
		/**
		* Sharpe ratio (if risk-free rate provided)
		*/
		sharpeRatio: zod_1.z.number().optional(),
		/**
		* Optimization method used
		*/
		method: zod_1.z.enum([
			"minimumVariance",
			"maximumSharpe",
			"targetReturn"
		]),
		/**
		* Convergence information
		*/
		converged: zod_1.z.boolean(),
		iterations: zod_1.z.number().optional(),
		/**
		* Lagrange multipliers for constraints
		*/
		lagrangeMultipliers: zod_1.z.array(zod_1.z.number()).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/QuadraticProgramOptionsSchema.js
var require_QuadraticProgramOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.QuadraticProgramOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Options for Quadratic Programming optimization
	*/
	exports.QuadraticProgramOptionsSchema = zod_1.z.object({
		/**
		* Equality constraints: Ax = b
		*/
		equalityConstraints: zod_1.z.object({
			/**
			* Constraint matrix (m×n)
			*/
			A: zod_1.z.array(zod_1.z.array(zod_1.z.number())),
			/**
			* Constraint vector (m×1)
			*/
			b: zod_1.z.array(zod_1.z.number())
		}).optional(),
		/**
		* Non-negativity constraints: x ≥ 0
		*/
		nonNegative: zod_1.z.boolean().default(false),
		/**
		* Maximum number of iterations
		*/
		maxIterations: zod_1.z.number().int().positive().default(1e3),
		/**
		* Convergence tolerance
		*/
		tolerance: zod_1.z.number().positive().default(.001),
		/**
		* Initial guess for solution vector
		*/
		initialGuess: zod_1.z.array(zod_1.z.number()).optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/QuadraticProgramResultSchema.js
var require_QuadraticProgramResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.QuadraticProgramResultSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Result of Quadratic Programming optimization
	*/
	exports.QuadraticProgramResultSchema = zod_1.z.object({
		/**
		* Solution vector
		*/
		solution: zod_1.z.array(zod_1.z.number()),
		/**
		* Final objective value
		*/
		objectiveValue: zod_1.z.number(),
		/**
		* Whether optimization converged
		*/
		converged: zod_1.z.boolean(),
		/**
		* Number of iterations performed
		*/
		iterations: zod_1.z.number().int().min(0),
		/**
		* Final gradient norm
		*/
		gradientNorm: zod_1.z.number().min(0),
		/**
		* Constraint violation (if any)
		*/
		constraintViolation: zod_1.z.number().min(0)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/vectorOperations.js
var require_vectorOperations = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Vector Operations Utilities
	*
	* Collection of utility functions for vector operations commonly used in
	* mathematical optimization and portfolio analysis.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.vectorNorm = vectorNorm;
	exports.vectorAdd = vectorAdd;
	exports.vectorSubtract = vectorSubtract;
	exports.vectorScale = vectorScale;
	exports.vectorDot = vectorDot;
	exports.vectorCross = vectorCross;
	exports.vectorNormalize = vectorNormalize;
	exports.vectorDistance = vectorDistance;
	exports.vectorEquals = vectorEquals;
	exports.createZeroVector = createZeroVector;
	exports.createConstantVector = createConstantVector;
	/**
	* Calculate the Euclidean norm (magnitude) of a vector
	*
	* @param v - Input vector
	* @returns Euclidean norm of the vector
	*
	* @example
	* ```typescript
	* const norm = vectorNorm([3, 4]); // 5
	* const norm2 = vectorNorm([1, 1, 1]); // √3 ≈ 1.732
	* ```
	*/
	function vectorNorm(v) {
		return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
	}
	/**
	* Add two vectors element-wise
	*
	* @param a - First vector
	* @param b - Second vector
	* @returns Vector sum a + b
	*
	* @example
	* ```typescript
	* const sum = vectorAdd([1, 2, 3], [4, 5, 6]); // [5, 7, 9]
	* ```
	*/
	function vectorAdd(a, b) {
		if (a.length !== b.length) throw new Error("Vectors must have the same length");
		return a.map((val, i) => val + b[i]);
	}
	/**
	* Subtract two vectors element-wise
	*
	* @param a - First vector (minuend)
	* @param b - Second vector (subtrahend)
	* @returns Vector difference a - b
	*
	* @example
	* ```typescript
	* const diff = vectorSubtract([5, 7, 9], [1, 2, 3]); // [4, 5, 6]
	* ```
	*/
	function vectorSubtract(a, b) {
		if (a.length !== b.length) throw new Error("Vectors must have the same length");
		return a.map((val, i) => val - b[i]);
	}
	/**
	* Scale a vector by a scalar value
	*
	* @param v - Input vector
	* @param scalar - Scalar multiplier
	* @returns Scaled vector
	*
	* @example
	* ```typescript
	* const scaled = vectorScale([1, 2, 3], 2); // [2, 4, 6]
	* const scaled2 = vectorScale([1, 2, 3], -1); // [-1, -2, -3]
	* ```
	*/
	function vectorScale(v, scalar) {
		return v.map((val) => val * scalar);
	}
	/**
	* Calculate the dot product (inner product) of two vectors
	*
	* @param a - First vector
	* @param b - Second vector
	* @returns Dot product a · b
	*
	* @example
	* ```typescript
	* const dot = vectorDot([1, 2, 3], [4, 5, 6]); // 1*4 + 2*5 + 3*6 = 32
	* ```
	*/
	function vectorDot(a, b) {
		if (a.length !== b.length) throw new Error("Vectors must have the same length");
		return a.reduce((sum, val, i) => sum + val * b[i], 0);
	}
	/**
	* Calculate the cross product of two 3D vectors
	*
	* @param a - First 3D vector
	* @param b - Second 3D vector
	* @returns Cross product a × b
	*
	* @example
	* ```typescript
	* const cross = vectorCross([1, 0, 0], [0, 1, 0]); // [0, 0, 1]
	* ```
	*/
	function vectorCross(a, b) {
		if (a.length !== 3 || b.length !== 3) throw new Error("Cross product is only defined for 3D vectors");
		return [
			a[1] * b[2] - a[2] * b[1],
			a[2] * b[0] - a[0] * b[2],
			a[0] * b[1] - a[1] * b[0]
		];
	}
	/**
	* Normalize a vector to unit length
	*
	* @param v - Input vector
	* @returns Normalized vector (unit vector)
	*
	* @example
	* ```typescript
	* const normalized = vectorNormalize([3, 4]); // [0.6, 0.8]
	* ```
	*/
	function vectorNormalize(v) {
		const norm = vectorNorm(v);
		if (norm === 0) throw new Error("Cannot normalize zero vector");
		return vectorScale(v, 1 / norm);
	}
	/**
	* Calculate the distance between two vectors
	*
	* @param a - First vector
	* @param b - Second vector
	* @returns Euclidean distance between vectors
	*
	* @example
	* ```typescript
	* const distance = vectorDistance([0, 0], [3, 4]); // 5
	* ```
	*/
	function vectorDistance(a, b) {
		return vectorNorm(vectorSubtract(a, b));
	}
	/**
	* Check if two vectors are approximately equal within tolerance
	*
	* @param a - First vector
	* @param b - Second vector
	* @param tolerance - Tolerance for comparison (default: 1e-12)
	* @returns True if vectors are approximately equal
	*
	* @example
	* ```typescript
	* const equal = vectorEquals([1.0000001, 2], [1, 2.0000001], 1e-6); // true
	* ```
	*/
	function vectorEquals(a, b, tolerance = 1e-12) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (Math.abs(a[i] - b[i]) > tolerance) return false;
		return true;
	}
	/**
	* Create a zero vector of specified length
	*
	* @param length - Length of the vector
	* @returns Zero vector
	*
	* @example
	* ```typescript
	* const zero = createZeroVector(3); // [0, 0, 0]
	* ```
	*/
	function createZeroVector(length) {
		return new Array(length).fill(0);
	}
	/**
	* Create a vector filled with a constant value
	*
	* @param length - Length of the vector
	* @param value - Value to fill
	* @returns Vector filled with constant value
	*
	* @example
	* ```typescript
	* const ones = createConstantVector(3, 1); // [1, 1, 1]
	* ```
	*/
	function createConstantVector(length, value) {
		return new Array(length).fill(value);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/matrixOperations.js
var require_matrixOperations = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Matrix Operations Utilities
	*
	* Collection of utility functions for matrix operations commonly used in
	* mathematical optimization and portfolio analysis.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.matrixVectorMultiply = matrixVectorMultiply;
	exports.matrixTranspose = matrixTranspose;
	exports.matrixMatrixMultiply = matrixMatrixMultiply;
	exports.matrixTrace = matrixTrace;
	exports.isMatrixSymmetric = isMatrixSymmetric;
	exports.isMatrixPositiveDefinite = isMatrixPositiveDefinite;
	exports.createIdentityMatrix = createIdentityMatrix;
	exports.createZeroMatrix = createZeroMatrix;
	exports.matrixDiagonal = matrixDiagonal;
	exports.matrixFrobeniusNorm = matrixFrobeniusNorm;
	var vectorOperations_1 = require_vectorOperations();
	/**
	* Multiply a matrix by a vector
	*
	* @param A - Matrix (m×n)
	* @param x - Vector (n×1)
	* @returns Result vector (m×1)
	*
	* @example
	* ```typescript
	* const A = [[1, 2], [3, 4]];
	* const x = [5, 6];
	* const result = matrixVectorMultiply(A, x); // [17, 39]
	* ```
	*/
	function matrixVectorMultiply(A, x) {
		if (A.length === 0 || A[0].length !== x.length) throw new Error("Matrix columns must match vector length");
		return A.map((row) => (0, vectorOperations_1.vectorDot)(row, x));
	}
	/**
	* Calculate the transpose of a matrix
	*
	* @param A - Input matrix (m×n)
	* @returns Transpose matrix (n×m)
	*
	* @example
	* ```typescript
	* const A = [[1, 2, 3], [4, 5, 6]];
	* const At = matrixTranspose(A); // [[1, 4], [2, 5], [3, 6]]
	* ```
	*/
	function matrixTranspose(A) {
		if (A.length === 0) return [];
		const rows = A.length;
		const cols = A[0].length;
		const result = [];
		for (let j = 0; j < cols; j++) {
			result[j] = [];
			for (let i = 0; i < rows; i++) result[j][i] = A[i][j];
		}
		return result;
	}
	/**
	* Multiply two matrices
	*
	* @param A - First matrix (m×k)
	* @param B - Second matrix (k×n)
	* @returns Result matrix (m×n)
	*
	* @example
	* ```typescript
	* const A = [[1, 2], [3, 4]];
	* const B = [[5, 6], [7, 8]];
	* const result = matrixMatrixMultiply(A, B); // [[19, 22], [43, 50]]
	* ```
	*/
	function matrixMatrixMultiply(A, B) {
		if (A.length === 0 || B.length === 0) throw new Error("Cannot multiply empty matrices");
		const rows = A.length;
		const cols = B[0].length;
		const inner = B.length;
		if (A[0].length !== inner) throw new Error("Matrix dimensions must be compatible for multiplication");
		const result = [];
		for (let i = 0; i < rows; i++) {
			result[i] = [];
			for (let j = 0; j < cols; j++) {
				let sum = 0;
				for (let k = 0; k < inner; k++) sum += A[i][k] * B[k][j];
				result[i][j] = sum;
			}
		}
		return result;
	}
	/**
	* Calculate the trace of a square matrix
	*
	* @param A - Square matrix (n×n)
	* @returns Trace (sum of diagonal elements)
	*
	* @example
	* ```typescript
	* const A = [[1, 2], [3, 4]];
	* const trace = matrixTrace(A); // 5
	* ```
	*/
	function matrixTrace(A) {
		if (A.length === 0 || A.length !== A[0].length) throw new Error("Matrix must be square");
		let trace = 0;
		for (let i = 0; i < A.length; i++) trace += A[i][i];
		return trace;
	}
	/**
	* Check if a matrix is symmetric
	*
	* @param A - Matrix to check
	* @param tolerance - Tolerance for comparison (default: 1e-12)
	* @returns True if matrix is symmetric
	*
	* @example
	* ```typescript
	* const A = [[1, 2], [2, 3]];
	* const symmetric = isMatrixSymmetric(A); // true
	* ```
	*/
	function isMatrixSymmetric(A, tolerance = 1e-12) {
		if (A.length === 0 || A.length !== A[0].length) return false;
		for (let i = 0; i < A.length; i++) for (let j = 0; j < A.length; j++) if (Math.abs(A[i][j] - A[j][i]) > tolerance) return false;
		return true;
	}
	/**
	* Check if a matrix is positive definite (simplified check)
	*
	* @param A - Square matrix to check
	* @returns True if matrix appears to be positive definite
	*
	* @example
	* ```typescript
	* const A = [[2, -1], [-1, 2]]; // Positive definite
	* const pd = isMatrixPositiveDefinite(A); // true
	* ```
	*/
	function isMatrixPositiveDefinite(A) {
		if (A.length === 0 || A.length !== A[0].length) return false;
		if (!isMatrixSymmetric(A)) return false;
		for (let i = 0; i < A.length; i++) if (A[i][i] <= 0) return false;
		if (A.length === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0] > 0;
		return true;
	}
	/**
	* Create an identity matrix of specified size
	*
	* @param size - Size of the identity matrix
	* @returns Identity matrix (n×n)
	*
	* @example
	* ```typescript
	* const I = createIdentityMatrix(3);
	* // [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	* ```
	*/
	function createIdentityMatrix(size) {
		const I = [];
		for (let i = 0; i < size; i++) {
			I[i] = [];
			for (let j = 0; j < size; j++) I[i][j] = i === j ? 1 : 0;
		}
		return I;
	}
	/**
	* Create a zero matrix of specified dimensions
	*
	* @param rows - Number of rows
	* @param cols - Number of columns
	* @returns Zero matrix (m×n)
	*
	* @example
	* ```typescript
	* const Z = createZeroMatrix(2, 3);
	* // [[0, 0, 0], [0, 0, 0]]
	* ```
	*/
	function createZeroMatrix(rows, cols) {
		const Z = [];
		for (let i = 0; i < rows; i++) Z[i] = new Array(cols).fill(0);
		return Z;
	}
	/**
	* Extract diagonal elements from a square matrix
	*
	* @param A - Square matrix
	* @returns Array of diagonal elements
	*
	* @example
	* ```typescript
	* const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
	* const diag = matrixDiagonal(A); // [1, 5, 9]
	* ```
	*/
	function matrixDiagonal(A) {
		if (A.length === 0 || A.length !== A[0].length) throw new Error("Matrix must be square");
		const diagonal = [];
		for (let i = 0; i < A.length; i++) diagonal.push(A[i][i]);
		return diagonal;
	}
	/**
	* Calculate the Frobenius norm of a matrix
	*
	* @param A - Matrix
	* @returns Frobenius norm (square root of sum of squares of all elements)
	*
	* @example
	* ```typescript
	* const A = [[1, 2], [3, 4]];
	* const norm = matrixFrobeniusNorm(A); // √30 ≈ 5.477
	* ```
	*/
	function matrixFrobeniusNorm(A) {
		let sum = 0;
		for (let i = 0; i < A.length; i++) for (let j = 0; j < A[i].length; j++) sum += A[i][j] * A[i][j];
		return Math.sqrt(sum);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/linearSystemSolver.js
var require_linearSystemSolver = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Linear System Solver Utilities
	*
	* Collection of utility functions for solving linear systems of equations,
	* commonly used in mathematical optimization and portfolio analysis.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.solveLinearSystem = solveLinearSystem;
	exports.solveMultipleLinearSystems = solveMultipleLinearSystems;
	exports.matrixDeterminant = matrixDeterminant;
	exports.luDecomposition = luDecomposition;
	exports.isMatrixInvertible = isMatrixInvertible;
	exports.matrixConditionNumber = matrixConditionNumber;
	/**
	* Solve a linear system Ax = b using Gaussian elimination with partial pivoting
	*
	* @param A - Coefficient matrix (n×n)
	* @param b - Right-hand side vector (n×1)
	* @returns Solution vector x
	*
	* @example
	* ```typescript
	* const A = [[2, 1], [1, 3]];
	* const b = [5, 8];
	* const x = solveLinearSystem(A, b); // [1, 3]
	* ```
	*/
	function solveLinearSystem(A, b) {
		const n = A.length;
		if (n === 0) throw new Error("Matrix A cannot be empty");
		if (A[0].length !== n) throw new Error("Matrix A must be square");
		if (b.length !== n) throw new Error("Vector b must match matrix dimensions");
		const augmented = A.map((row, i) => [...row, b[i]]);
		for (let i = 0; i < n; i++) {
			let maxRow = i;
			for (let k = i + 1; k < n; k++) if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) maxRow = k;
			if (maxRow !== i) [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
			if (Math.abs(augmented[i][i]) < 1e-12) return new Array(n).fill(0);
			for (let k = i + 1; k < n; k++) {
				const factor = augmented[k][i] / augmented[i][i];
				for (let j = i; j <= n; j++) augmented[k][j] -= factor * augmented[i][j];
			}
		}
		const x = new Array(n);
		for (let i = n - 1; i >= 0; i--) {
			x[i] = augmented[i][n];
			for (let j = i + 1; j < n; j++) x[i] -= augmented[i][j] * x[j];
			x[i] /= augmented[i][i];
		}
		return x;
	}
	/**
	* Solve multiple linear systems with the same coefficient matrix
	*
	* @param A - Coefficient matrix (n×n)
	* @param B - Matrix of right-hand sides (n×m)
	* @returns Matrix of solutions (n×m)
	*
	* @example
	* ```typescript
	* const A = [[2, 1], [1, 3]];
	* const B = [[5, 1], [8, 2]];
	* const X = solveMultipleLinearSystems(A, B);
	* ```
	*/
	function solveMultipleLinearSystems(A, B) {
		const n = A.length;
		const m = B[0].length;
		if (n === 0) throw new Error("Matrix A cannot be empty");
		if (B.length !== n) throw new Error("Matrix B must have same number of rows as A");
		const solutions = [];
		for (let j = 0; j < m; j++) {
			const b = B.map((row) => row[j]);
			solutions.push(solveLinearSystem(A, b));
		}
		const result = [];
		for (let i = 0; i < n; i++) {
			result[i] = [];
			for (let j = 0; j < m; j++) result[i][j] = solutions[j][i];
		}
		return result;
	}
	/**
	* Calculate the determinant of a square matrix using LU decomposition
	*
	* @param A - Square matrix (n×n)
	* @returns Determinant of the matrix
	*
	* @example
	* ```typescript
	* const A = [[2, 1], [1, 3]];
	* const det = matrixDeterminant(A); // 5
	* ```
	*/
	function matrixDeterminant(A) {
		const n = A.length;
		if (n === 0) throw new Error("Matrix cannot be empty");
		if (A[0].length !== n) throw new Error("Matrix must be square");
		if (n === 1) return A[0][0];
		if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
		const { U, sign } = luDecomposition(A);
		let det = sign;
		for (let i = 0; i < n; i++) det *= U[i][i];
		return det;
	}
	/**
	* Perform LU decomposition of a matrix
	*
	* @param A - Square matrix (n×n)
	* @returns Object containing L, U matrices and permutation sign
	*
	* @example
	* ```typescript
	* const A = [[2, 1, 0], [1, 2, 1], [0, 1, 2]];
	* const { L, U, sign } = luDecomposition(A);
	* ```
	*/
	function luDecomposition(A) {
		const n = A.length;
		if (n === 0 || A[0].length !== n) throw new Error("Matrix must be square");
		const U = A.map((row) => [...row]);
		const L = Array(n).fill(null).map(() => new Array(n).fill(0));
		const P = Array(n).fill(0).map((_, i) => i);
		let sign = 1;
		for (let i = 0; i < n; i++) L[i][i] = 1;
		for (let i = 0; i < n; i++) {
			let maxRow = i;
			for (let k = i + 1; k < n; k++) if (Math.abs(U[k][i]) > Math.abs(U[maxRow][i])) maxRow = k;
			if (maxRow !== i) {
				[U[i], U[maxRow]] = [U[maxRow], U[i]];
				for (let j = 0; j < i; j++) [L[i][j], L[maxRow][j]] = [L[maxRow][j], L[i][j]];
				[P[i], P[maxRow]] = [P[maxRow], P[i]];
				sign *= -1;
			}
			for (let k = i + 1; k < n; k++) {
				if (Math.abs(U[i][i]) < 1e-12) throw new Error("Matrix is singular");
				const factor = U[k][i] / U[i][i];
				L[k][i] = factor;
				for (let j = i; j < n; j++) U[k][j] -= factor * U[i][j];
			}
		}
		return {
			L,
			U,
			sign
		};
	}
	/**
	* Check if a matrix is invertible (non-singular)
	*
	* @param A - Square matrix (n×n)
	* @param tolerance - Tolerance for determinant check (default: 1e-12)
	* @returns True if matrix is invertible
	*
	* @example
	* ```typescript
	* const A = [[2, 1], [1, 3]];
	* const invertible = isMatrixInvertible(A); // true
	* ```
	*/
	function isMatrixInvertible(A, tolerance = 1e-12) {
		try {
			const det = matrixDeterminant(A);
			return Math.abs(det) > tolerance;
		} catch {
			return false;
		}
	}
	/**
	* Calculate the condition number of a matrix (ratio of largest to smallest singular value)
	* Simplified implementation for 2x2 matrices
	*
	* @param A - Square matrix (n×n)
	* @returns Condition number
	*
	* @example
	* ```typescript
	* const A = [[2, 1], [1, 3]];
	* const cond = matrixConditionNumber(A);
	* ```
	*/
	function matrixConditionNumber(A) {
		const n = A.length;
		if (n === 0 || A[0].length !== n) throw new Error("Matrix must be square");
		if (n === 1) return 1;
		if (n === 2) {
			const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
			const trace = a + d;
			const det = a * d - b * c;
			if (Math.abs(det) < 1e-12) return Infinity;
			const discriminant = trace * trace - 4 * det;
			if (discriminant < 0) return Infinity;
			const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
			const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
			const maxEigenval = Math.max(Math.abs(lambda1), Math.abs(lambda2));
			const minEigenval = Math.min(Math.abs(lambda1), Math.abs(lambda2));
			return minEigenval > 1e-12 ? maxEigenval / minEigenval : Infinity;
		}
		return 1;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/constraintProjection.js
var require_constraintProjection = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Constraint Projection Utilities
	*
	* Collection of utility functions for projecting solutions onto constraint sets,
	* commonly used in mathematical optimization and portfolio analysis.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.projectOntoEqualityConstraints = projectOntoEqualityConstraints;
	exports.projectOntoNonNegativityConstraints = projectOntoNonNegativityConstraints;
	exports.projectOntoBoxConstraints = projectOntoBoxConstraints;
	exports.projectOntoSimplex = projectOntoSimplex;
	exports.projectGradientOntoEqualityConstraints = projectGradientOntoEqualityConstraints;
	exports.projectGradientOntoNonNegativityConstraints = projectGradientOntoNonNegativityConstraints;
	exports.calculateEqualityConstraintViolation = calculateEqualityConstraintViolation;
	exports.calculateInequalityConstraintViolation = calculateInequalityConstraintViolation;
	exports.isSolutionFeasible = isSolutionFeasible;
	var matrixOperations_1 = require_matrixOperations();
	var vectorOperations_1 = require_vectorOperations();
	var linearSystemSolver_1 = require_linearSystemSolver();
	/**
	* Project a solution vector onto equality constraints Ax = b
	*
	* @param x - Current solution vector
	* @param A - Constraint matrix (m×n)
	* @param b - Right-hand side vector (m×1)
	* @returns Projected solution vector
	*
	* @example
	* ```typescript
	* const x = [0.5, 0.3, 0.2];
	* const A = [[1, 1, 1]];
	* const b = [1];
	* const projected = projectOntoEqualityConstraints(x, A, b);
	* ```
	*/
	function projectOntoEqualityConstraints(x, A, b) {
		const m = A.length;
		if (m === 0) return x;
		if (m === 1 && A[0].every((val) => Math.abs(val - 1) < 1e-12)) {
			const currentSum = x.reduce((sum, val) => sum + val, 0);
			const targetSum = b[0];
			if (Math.abs(currentSum) > 1e-12) {
				const scale = targetSum / currentSum;
				return x.map((val) => val * scale);
			}
		}
		let result = [...x];
		const maxIter = 10;
		for (let iter = 0; iter < maxIter; iter++) {
			let maxViolation = 0;
			for (let i = 0; i < m; i++) {
				const violation = (0, vectorOperations_1.vectorDot)(A[i], result) - b[i];
				if (Math.abs(violation) > Math.abs(maxViolation)) maxViolation = violation;
				const constraintNorm = (0, vectorOperations_1.vectorDot)(A[i], A[i]);
				if (constraintNorm > 1e-12) {
					const adjustment = violation / constraintNorm;
					result = (0, vectorOperations_1.vectorSubtract)(result, (0, vectorOperations_1.vectorScale)(A[i], adjustment));
				}
			}
			if (Math.abs(maxViolation) < 1e-8) break;
		}
		return result;
	}
	/**
	* Project a solution vector onto non-negativity constraints x ≥ 0
	*
	* @param x - Current solution vector
	* @returns Projected solution vector with non-negative elements
	*
	* @example
	* ```typescript
	* const x = [-0.1, 0.5, -0.2];
	* const projected = projectOntoNonNegativityConstraints(x); // [0, 0.5, 0]
	* ```
	*/
	function projectOntoNonNegativityConstraints(x) {
		return x.map((val) => Math.max(0, val));
	}
	/**
	* Project a solution vector onto box constraints l ≤ x ≤ u
	*
	* @param x - Current solution vector
	* @param lowerBounds - Lower bounds (n×1)
	* @param upperBounds - Upper bounds (n×1)
	* @returns Projected solution vector within bounds
	*
	* @example
	* ```typescript
	* const x = [0.1, 0.8, 0.05];
	* const lower = [0.1, 0.1, 0.1];
	* const upper = [0.5, 0.5, 0.5];
	* const projected = projectOntoBoxConstraints(x, lower, upper);
	* ```
	*/
	function projectOntoBoxConstraints(x, lowerBounds, upperBounds) {
		if (x.length !== lowerBounds.length || x.length !== upperBounds.length) throw new Error("All vectors must have the same length");
		return x.map((val, i) => {
			return Math.max(lowerBounds[i], Math.min(upperBounds[i], val));
		});
	}
	/**
	* Project a solution vector onto the unit simplex (x ≥ 0, sum(x) = 1)
	*
	* @param x - Current solution vector
	* @returns Projected solution vector on unit simplex
	*
	* @example
	* ```typescript
	* const x = [0.5, 0.3, 0.4];
	* const projected = projectOntoSimplex(x); // [0.416, 0.25, 0.333]
	* ```
	*/
	function projectOntoSimplex(x) {
		let result = projectOntoNonNegativityConstraints(x);
		const currentSum = result.reduce((sum, val) => sum + val, 0);
		if (Math.abs(currentSum) > 1e-12) {
			const scale = 1 / currentSum;
			result = result.map((val) => val * scale);
		}
		return result;
	}
	/**
	* Project a gradient onto the null space of equality constraints
	*
	* @param gradient - Gradient vector
	* @param A - Constraint matrix (m×n)
	* @returns Projected gradient
	*
	* @example
	* ```typescript
	* const gradient = [1, 2, 3];
	* const A = [[1, 1, 1]];
	* const projected = projectGradientOntoEqualityConstraints(gradient, A);
	* ```
	*/
	function projectGradientOntoEqualityConstraints(gradient, A) {
		if (A.length === 0) return gradient;
		const At = (0, matrixOperations_1.matrixTranspose)(A);
		const AAt = (0, matrixOperations_1.matrixMatrixMultiply)(A, At);
		try {
			const Ag = (0, matrixOperations_1.matrixVectorMultiply)(A, gradient);
			const y = (0, linearSystemSolver_1.solveLinearSystem)(AAt, Ag);
			const At_y = (0, matrixOperations_1.matrixVectorMultiply)(At, y);
			return (0, vectorOperations_1.vectorSubtract)(gradient, At_y);
		} catch {
			return gradient;
		}
	}
	/**
	* Project a gradient onto non-negativity constraints
	*
	* @param gradient - Gradient vector
	* @param x - Current solution vector
	* @returns Projected gradient respecting non-negativity constraints
	*
	* @example
	* ```typescript
	* const gradient = [1, -2, 3];
	* const x = [0.1, 0, 0.5];
	* const projected = projectGradientOntoNonNegativityConstraints(gradient, x);
	* ```
	*/
	function projectGradientOntoNonNegativityConstraints(gradient, x) {
		if (gradient.length !== x.length) throw new Error("Gradient and solution vectors must have the same length");
		return gradient.map((g, i) => {
			if (x[i] <= 1e-12 && g < 0) return 0;
			return g;
		});
	}
	/**
	* Calculate constraint violation for equality constraints
	*
	* @param x - Solution vector
	* @param A - Constraint matrix (m×n)
	* @param b - Right-hand side vector (m×1)
	* @returns Maximum constraint violation
	*
	* @example
	* ```typescript
	* const x = [0.5, 0.3, 0.4];
	* const A = [[1, 1, 1]];
	* const b = [1];
	* const violation = calculateEqualityConstraintViolation(x, A, b);
	* ```
	*/
	function calculateEqualityConstraintViolation(x, A, b) {
		if (A.length === 0) return 0;
		let maxViolation = 0;
		for (let i = 0; i < A.length; i++) {
			const constraintValue = (0, vectorOperations_1.vectorDot)(A[i], x);
			const violation = Math.abs(constraintValue - b[i]);
			maxViolation = Math.max(maxViolation, violation);
		}
		return maxViolation;
	}
	/**
	* Calculate constraint violation for inequality constraints
	*
	* @param x - Solution vector
	* @param G - Inequality constraint matrix (m×n)
	* @param h - Right-hand side vector (m×1)
	* @returns Maximum constraint violation (positive if violated)
	*
	* @example
	* ```typescript
	* const x = [0.5, 0.3];
	* const G = [[1, 0], [0, 1]]; // x ≥ 0
	* const h = [0, 0];
	* const violation = calculateInequalityConstraintViolation(x, G, h);
	* ```
	*/
	function calculateInequalityConstraintViolation(x, G, h) {
		if (G.length === 0) return 0;
		let maxViolation = 0;
		for (let i = 0; i < G.length; i++) {
			const constraintValue = (0, vectorOperations_1.vectorDot)(G[i], x);
			const violation = Math.max(0, constraintValue - h[i]);
			maxViolation = Math.max(maxViolation, violation);
		}
		return maxViolation;
	}
	/**
	* Check if a solution is feasible with respect to constraints
	*
	* @param x - Solution vector
	* @param equalityConstraints - Equality constraints {A, b}
	* @param inequalityConstraints - Inequality constraints {G, h}
	* @param tolerance - Feasibility tolerance (default: 1e-6)
	* @returns True if solution is feasible
	*
	* @example
	* ```typescript
	* const x = [0.3, 0.3, 0.4];
	* const eq = { A: [[1, 1, 1]], b: [1] };
	* const ineq = { G: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], h: [0, 0, 0] };
	* const feasible = isSolutionFeasible(x, eq, ineq);
	* ```
	*/
	function isSolutionFeasible(x, equalityConstraints, inequalityConstraints, tolerance = 1e-6) {
		if (equalityConstraints) {
			if (calculateEqualityConstraintViolation(x, equalityConstraints.A, equalityConstraints.b) > tolerance) return false;
		}
		if (inequalityConstraints) {
			if (calculateInequalityConstraintViolation(x, inequalityConstraints.G, inequalityConstraints.h) > tolerance) return false;
		}
		return true;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/utils/solveQuadraticProgram.js
var require_solveQuadraticProgram = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Solve Quadratic Programming Problem (Simplified Implementation)
	*
	* Minimizes: ½xᵀQx + cᵀx
	* Subject to: Ax = b (equality constraints)
	*             x ≥ 0   (non-negativity constraints)
	*
	* Uses a simplified gradient descent with constraint projection.
	* This is a practical implementation suitable for portfolio optimization.
	*
	* @param Q - Quadratic coefficient matrix (n×n, symmetric, positive semi-definite)
	* @param c - Linear coefficient vector (n×1)
	* @param options - Solver options and constraints
	* @returns Optimization result with solution vector and metadata
	*
	* @example
	* ```typescript
	* // Portfolio optimization: min wᵀΣw subject to wᵀ1=1, w≥0
	* const result = solveQuadraticProgram(
	*   covarianceMatrix,  // Q = Σ
	*   [0, 0, 0],        // c = 0 (minimum variance)
	*   {
	*     equalityConstraints: { A: [[1,1,1]], b: [1] },  // wᵀ1 = 1
	*     nonNegative: true,                              // w ≥ 0
	*     maxIterations: 1000,
	*     tolerance: 1e-6
	*   }
	* );
	* ```
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.solveQuadraticProgram = solveQuadraticProgram;
	var QuadraticProgramOptionsSchema_1 = require_QuadraticProgramOptionsSchema();
	var QuadraticProgramResultSchema_1 = require_QuadraticProgramResultSchema();
	var constraintProjection_1 = require_constraintProjection();
	var vectorOperations_1 = require_vectorOperations();
	var matrixOperations_1 = require_matrixOperations();
	function solveQuadraticProgram(Q, c, options = {}) {
		const { equalityConstraints, nonNegative, maxIterations, tolerance, initialGuess } = QuadraticProgramOptionsSchema_1.QuadraticProgramOptionsSchema.parse(options);
		const n = Q.length;
		if (Q.length !== n || Q[0].length !== n) throw new Error("Quadratic matrix Q must be square");
		if (c.length !== n) throw new Error("Linear coefficient vector c must match Q dimensions");
		let x = initialGuess ? [...initialGuess] : initializeSolution(n, equalityConstraints);
		if (x.length !== n) throw new Error("Initial guess must match problem dimensions");
		let converged = false;
		let iterations = 0;
		let gradientNorm = Infinity;
		let constraintViolation = 0;
		for (iterations = 0; iterations < maxIterations; iterations++) {
			const gradient = calculateGradient(Q, c, x);
			const stepSize = .1 / (1 + iterations * .01);
			x = (0, vectorOperations_1.vectorSubtract)(x, (0, vectorOperations_1.vectorScale)(gradient, stepSize));
			x = projectOntoConstraints(x, equalityConstraints, nonNegative);
			gradientNorm = (0, vectorOperations_1.vectorNorm)(gradient);
			constraintViolation = (0, constraintProjection_1.calculateEqualityConstraintViolation)(x, equalityConstraints?.A || [], equalityConstraints?.b || []);
			if (gradientNorm < tolerance && constraintViolation < tolerance) {
				converged = true;
				break;
			}
		}
		const objectiveValue = calculateObjective(Q, c, x);
		return QuadraticProgramResultSchema_1.QuadraticProgramResultSchema.parse({
			solution: x,
			objectiveValue,
			converged,
			iterations,
			gradientNorm,
			constraintViolation: constraintViolation || 0
		});
	}
	/**
	* Initialize solution vector
	*/
	function initializeSolution(n, equalityConstraints) {
		if (equalityConstraints && equalityConstraints.A.length > 0) return findFeasibleSolution(equalityConstraints.A, equalityConstraints.b, n);
		return new Array(n).fill(1 / n);
	}
	/**
	* Find feasible solution for equality constraints
	*/
	function findFeasibleSolution(A, b, n) {
		const m = A.length;
		if (m === 0) return new Array(n).fill(1 / n);
		if (m === 1 && A[0].every((val) => Math.abs(val - A[0][0]) < 1e-12)) {
			const coefficient = A[0][0];
			const value = b[0] / (coefficient * n);
			return new Array(n).fill(value);
		}
		return new Array(n).fill(1 / n);
	}
	/**
	* Calculate gradient: ∇f = Qx + c
	*/
	function calculateGradient(Q, c, x) {
		const Qx = (0, matrixOperations_1.matrixVectorMultiply)(Q, x);
		return (0, vectorOperations_1.vectorAdd)(Qx, c);
	}
	/**
	* Project solution onto constraints
	*/
	function projectOntoConstraints(x, equalityConstraints, nonNegative) {
		let result = [...x];
		if (equalityConstraints && equalityConstraints.A.length > 0) result = (0, constraintProjection_1.projectOntoEqualityConstraints)(result, equalityConstraints.A, equalityConstraints.b);
		if (nonNegative) result = (0, constraintProjection_1.projectOntoNonNegativityConstraints)(result);
		return result;
	}
	/**
	* Calculate objective value: f(x) = ½xᵀQx + cᵀx
	*/
	function calculateObjective(Q, c, x) {
		return .5 * (0, vectorOperations_1.vectorDot)((0, matrixOperations_1.matrixVectorMultiply)(Q, x), x) + (0, vectorOperations_1.vectorDot)(c, x);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculatePortfolioOptimization.js
var require_calculatePortfolioOptimization = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculatePortfolioOptimization = calculatePortfolioOptimization;
	var PortfolioOptimizationOptionsSchema_1 = require_PortfolioOptimizationOptionsSchema();
	var PortfolioOptimizationResultSchema_1 = require_PortfolioOptimizationResultSchema();
	var solveQuadraticProgram_1 = require_solveQuadraticProgram();
	/**
	* Calculate Markowitz Mean-Variance Portfolio Optimization
	*
	* Implements the classic Markowitz portfolio theory for optimal asset allocation.
	* Supports three optimization objectives:
	* 1. Minimum Variance Portfolio
	* 2. Maximum Sharpe Ratio Portfolio
	* 3. Target Return Portfolio
	*
	* Mathematical Framework:
	* - Objective: min w^T Σ w (variance) or max (w^T μ - rf) / √(w^T Σ w) (Sharpe)
	* - Constraints: w^T 1 = 1 (weights sum to 1), w_min ≤ w ≤ w_max
	*
	* @param options - Expected returns, covariance matrix, constraints, and optimization target
	* @returns Optimal portfolio weights and performance metrics
	*
	* @example
	* ```typescript
	* const result = calculatePortfolioOptimization({
	*   expectedReturns: [0.08, 0.12, 0.06],
	*   covarianceMatrix: [
	*     [0.04, 0.02, 0.01],
	*     [0.02, 0.09, 0.03],
	*     [0.01, 0.03, 0.02]
	*   ],
	*   riskFreeRate: 0.03,
	*   method: 'maximumSharpe'
	* });
	* ```
	*/
	function calculatePortfolioOptimization(options) {
		const { expectedReturns, covarianceMatrix, riskFreeRate, targetReturn, minWeight, maxWeight, sumTo1 } = PortfolioOptimizationOptionsSchema_1.PortfolioOptimizationOptionsSchema.parse(options);
		const n = expectedReturns.length;
		if (covarianceMatrix.length !== n || covarianceMatrix[0].length !== n) throw new Error("Covariance matrix dimensions must match expected returns length");
		if (!isValidCovarianceMatrix(covarianceMatrix)) throw new Error("Covariance matrix must be symmetric and positive semi-definite");
		let method;
		if (targetReturn !== void 0) method = "targetReturn";
		else if (riskFreeRate !== void 0) method = "maximumSharpe";
		else method = "minimumVariance";
		let result;
		switch (method) {
			case "minimumVariance":
				result = optimizeMinimumVariance(expectedReturns, covarianceMatrix, minWeight, maxWeight, sumTo1);
				break;
			case "maximumSharpe":
				result = optimizeMaximumSharpe(expectedReturns, covarianceMatrix, riskFreeRate, minWeight, maxWeight, sumTo1);
				break;
			case "targetReturn": result = optimizeTargetReturn(expectedReturns, covarianceMatrix, targetReturn, minWeight, maxWeight, sumTo1);
		}
		return PortfolioOptimizationResultSchema_1.PortfolioOptimizationResultSchema.parse(result);
	}
	/**
	* Optimize for minimum variance portfolio
	*/
	function optimizeMinimumVariance(expectedReturns, covarianceMatrix, minWeight, maxWeight, sumTo1) {
		const n = expectedReturns.length;
		return solveQuadraticProgramming(covarianceMatrix, new Array(n).fill(0), expectedReturns, void 0, minWeight, maxWeight, sumTo1);
	}
	/**
	* Optimize for maximum Sharpe ratio portfolio
	*/
	function optimizeMaximumSharpe(expectedReturns, covarianceMatrix, riskFreeRate, minWeight, maxWeight, sumTo1) {
		return solveQuadraticProgramming(covarianceMatrix, expectedReturns.map((r) => r - riskFreeRate), expectedReturns, void 0, minWeight, maxWeight, sumTo1, "maximize");
	}
	/**
	* Optimize for target return portfolio
	*/
	function optimizeTargetReturn(expectedReturns, covarianceMatrix, targetReturn, minWeight, maxWeight, sumTo1) {
		return solveQuadraticProgramming(covarianceMatrix, new Array(expectedReturns.length).fill(0), expectedReturns, targetReturn, minWeight, maxWeight, sumTo1);
	}
	/**
	* Solve quadratic programming problem using the integrated QP solver
	*/
	function solveQuadraticProgramming(covarianceMatrix, linearTerm, expectedReturns, targetReturn, minWeight, maxWeight, sumTo1, objective = "minimize") {
		const n = expectedReturns.length;
		try {
			const qpResult = (0, solveQuadraticProgram_1.solveQuadraticProgram)(covarianceMatrix, linearTerm, {
				equalityConstraints: sumTo1 ? {
					A: [new Array(n).fill(1)],
					b: [1]
				} : void 0,
				nonNegative: minWeight >= 0,
				maxIterations: 1e3,
				tolerance: 1e-4
			});
			let weights = qpResult.solution;
			weights = weights.map((w) => Math.max(minWeight, Math.min(maxWeight, w)));
			if (sumTo1) {
				const currentSum = weights.reduce((sum, w) => sum + w, 0);
				if (Math.abs(currentSum) > 1e-12) weights = weights.map((w) => w / currentSum);
			}
			const variance = calculatePortfolioVariance(weights, covarianceMatrix);
			const volatility = Math.sqrt(variance);
			const portfolioReturn = weights.reduce((sum, w, i) => sum + w * expectedReturns[i], 0);
			const result = {
				weights,
				expectedReturn: portfolioReturn,
				variance,
				volatility,
				method: targetReturn ? "targetReturn" : objective === "maximize" ? "maximumSharpe" : "minimumVariance",
				converged: qpResult.converged,
				iterations: qpResult.iterations
			};
			if (objective === "maximize") {
				const riskFreeRate = linearTerm[0] !== void 0 ? expectedReturns[0] - linearTerm[0] : 0;
				result.sharpeRatio = volatility > 0 ? (portfolioReturn - riskFreeRate) / volatility : 0;
			}
			return result;
		} catch (error) {
			console.warn("QP solver failed, falling back to equal weights:", error);
			let weights = new Array(n).fill(1 / n);
			weights = applyConstraints(weights, minWeight, maxWeight, sumTo1);
			const variance = calculatePortfolioVariance(weights, covarianceMatrix);
			const volatility = Math.sqrt(variance);
			const portfolioReturn = weights.reduce((sum, w, i) => sum + w * expectedReturns[i], 0);
			return {
				weights,
				expectedReturn: portfolioReturn,
				variance,
				volatility,
				method: targetReturn ? "targetReturn" : objective === "maximize" ? "maximumSharpe" : "minimumVariance",
				converged: false,
				iterations: 0
			};
		}
	}
	/**
	* Apply weight constraints
	*/
	function applyConstraints(weights, minWeight, maxWeight, sumTo1) {
		let constrainedWeights = [...weights];
		constrainedWeights = constrainedWeights.map((w) => Math.max(minWeight, Math.min(maxWeight, w)));
		if (sumTo1) {
			const sum = constrainedWeights.reduce((s, w) => s + w, 0);
			if (sum > 0) constrainedWeights = constrainedWeights.map((w) => w / sum);
		}
		return constrainedWeights;
	}
	/**
	* Calculate portfolio variance: w^T * Σ * w
	*/
	function calculatePortfolioVariance(weights, covarianceMatrix) {
		let variance = 0;
		const n = weights.length;
		for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) variance += weights[i] * weights[j] * covarianceMatrix[i][j];
		return variance;
	}
	/**
	* Validate covariance matrix properties
	*/
	function isValidCovarianceMatrix(matrix) {
		const n = matrix.length;
		for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (Math.abs(matrix[i][j] - matrix[j][i]) > 1e-10) return false;
		for (let i = 0; i < n; i++) if (matrix[i][i] < 0) return false;
		return true;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioRebalancingOptionsSchema.js
var require_PortfolioRebalancingOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioRebalancingOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioRebalancingOptionsSchema = zod_1.z.object({
		/**
		* Current portfolio weights
		*/
		currentWeights: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Target portfolio weights
		*/
		targetWeights: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Current portfolio value
		*/
		portfolioValue: zod_1.z.number().positive(),
		/**
		* Rebalancing method
		* - 'proportional': Scale all weights proportionally
		* - 'fixed': Rebalance to exact target weights
		*/
		method: zod_1.z.enum(["proportional", "fixed"]).default("fixed"),
		/**
		* Minimum trade size (as percentage of portfolio value)
		*/
		minTradeSize: zod_1.z.number().min(0).max(1).default(.001),
		/**
		* Transaction costs (as percentage of trade value)
		*/
		transactionCosts: zod_1.z.number().min(0).max(1).default(0),
		/**
		* Whether to consider transaction costs in calculations
		*/
		includeTransactionCosts: zod_1.z.boolean().default(false)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/PortfolioRebalancingResultSchema.js
var require_PortfolioRebalancingResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PortfolioRebalancingResultSchema = void 0;
	var zod_1 = require_zod();
	exports.PortfolioRebalancingResultSchema = zod_1.z.object({
		/**
		* New portfolio weights after rebalancing
		*/
		newWeights: zod_1.z.array(zod_1.z.number()),
		/**
		* Trade amounts for each asset (positive = buy, negative = sell)
		*/
		tradeAmounts: zod_1.z.array(zod_1.z.number()),
		/**
		* Trade amounts as percentage of portfolio value
		*/
		tradePercentages: zod_1.z.array(zod_1.z.number()),
		/**
		* Total absolute trade amount
		*/
		totalTradeAmount: zod_1.z.number(),
		/**
		* Total transaction costs
		*/
		totalTransactionCosts: zod_1.z.number(),
		/**
		* Portfolio value after transaction costs
		*/
		portfolioValueAfterCosts: zod_1.z.number(),
		/**
		* Number of assets that need rebalancing
		*/
		assetsToRebalance: zod_1.z.number(),
		/**
		* Rebalancing method used
		*/
		method: zod_1.z.enum(["proportional", "fixed"]),
		/**
		* Whether rebalancing was actually needed
		*/
		rebalancingNeeded: zod_1.z.boolean(),
		/**
		* Portfolio turnover (sum of absolute trades / 2)
		*/
		turnover: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculatePortfolioRebalancing.js
var require_calculatePortfolioRebalancing = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculatePortfolioRebalancing = calculatePortfolioRebalancing;
	var PortfolioRebalancingOptionsSchema_1 = require_PortfolioRebalancingOptionsSchema();
	var PortfolioRebalancingResultSchema_1 = require_PortfolioRebalancingResultSchema();
	/**
	* Calculate Portfolio Rebalancing
	*
	* Portfolio rebalancing is the process of bringing portfolio weights back to their
	* target allocations. This can be done through proportional scaling or fixed rebalancing.
	*
	* Methods:
	* - Proportional: Scale all weights proportionally while maintaining relative ratios
	* - Fixed: Rebalance to exact target weights
	*
	* @param options - Current weights, target weights, portfolio value, and rebalancing parameters
	* @returns Rebalancing result with trade amounts and costs
	*
	* @example
	* ```typescript
	* // Fixed rebalancing to target weights
	* const rebalancing = calculatePortfolioRebalancing({
	*   currentWeights: [0.6, 0.4],
	*   targetWeights: [0.5, 0.5],
	*   portfolioValue: 100000,
	*   method: 'fixed'
	* });
	*
	* // Proportional rebalancing with transaction costs
	* const proportionalRebalancing = calculatePortfolioRebalancing({
	*   currentWeights: [0.55, 0.45],
	*   targetWeights: [0.5, 0.5],
	*   portfolioValue: 100000,
	*   method: 'proportional',
	*   transactionCosts: 0.001, // 0.1%
	*   includeTransactionCosts: true
	* });
	* ```
	*/
	function calculatePortfolioRebalancing(options) {
		const { currentWeights, targetWeights, portfolioValue, method, minTradeSize, transactionCosts, includeTransactionCosts } = PortfolioRebalancingOptionsSchema_1.PortfolioRebalancingOptionsSchema.parse(options);
		if (currentWeights.length !== targetWeights.length) throw new Error("Current and target weights must have same length");
		if (currentWeights.length < 2) throw new Error("At least 2 assets required for rebalancing");
		const currentSum = currentWeights.reduce((sum, weight) => sum + weight, 0);
		const targetSum = targetWeights.reduce((sum, weight) => sum + weight, 0);
		if (Math.abs(currentSum - 1) > 1e-6) throw new Error(`Current weights sum to ${currentSum.toFixed(6)}, expected 1`);
		if (Math.abs(targetSum - 1) > 1e-6) throw new Error(`Target weights sum to ${targetSum.toFixed(6)}, expected 1`);
		let newWeights;
		let tradeAmounts;
		if (method === "proportional") {
			const totalCurrentWeight = currentWeights.reduce((sum, weight) => sum + weight, 0);
			const scaleFactor = targetWeights.reduce((sum, weight) => sum + weight, 0) / totalCurrentWeight;
			newWeights = currentWeights.map((weight) => weight * scaleFactor);
			tradeAmounts = newWeights.map((newWeight, i) => {
				const currentValue = currentWeights[i] * portfolioValue;
				return newWeight * portfolioValue - currentValue;
			});
		} else {
			newWeights = [...targetWeights];
			tradeAmounts = newWeights.map((targetWeight, i) => {
				const currentValue = currentWeights[i] * portfolioValue;
				return targetWeight * portfolioValue - currentValue;
			});
		}
		const tradePercentages = tradeAmounts.map((amount) => amount / portfolioValue);
		const filteredTradeAmounts = tradeAmounts.map((amount, i) => {
			if (Math.abs(tradePercentages[i]) < minTradeSize) return 0;
			return amount;
		});
		const adjustedNewWeights = currentWeights.map((currentWeight, i) => {
			const tradeAmount = filteredTradeAmounts[i];
			return (currentWeight * portfolioValue + tradeAmount) / portfolioValue;
		});
		const adjustedSum = adjustedNewWeights.reduce((sum, weight) => sum + weight, 0);
		const finalWeights = adjustedNewWeights.map((weight) => weight / adjustedSum);
		const finalTradeAmounts = finalWeights.map((finalWeight, i) => {
			const currentValue = currentWeights[i] * portfolioValue;
			return finalWeight * portfolioValue - currentValue;
		});
		let totalTransactionCosts = 0;
		if (includeTransactionCosts && transactionCosts > 0) totalTransactionCosts = finalTradeAmounts.reduce((total, amount) => {
			return total + Math.abs(amount) * transactionCosts;
		}, 0);
		const portfolioValueAfterCosts = portfolioValue - totalTransactionCosts;
		const totalTradeAmount = finalTradeAmounts.reduce((total, amount) => {
			return total + Math.abs(amount);
		}, 0);
		const turnover = totalTradeAmount / 2 / portfolioValue;
		const assetsToRebalance = finalTradeAmounts.filter((amount) => Math.abs(amount) > 0).length;
		const rebalancingNeeded = assetsToRebalance > 0;
		return PortfolioRebalancingResultSchema_1.PortfolioRebalancingResultSchema.parse({
			newWeights: finalWeights,
			tradeAmounts: finalTradeAmounts,
			tradePercentages: finalTradeAmounts.map((amount) => amount / portfolioValue),
			totalTradeAmount,
			totalTransactionCosts,
			portfolioValueAfterCosts,
			assetsToRebalance,
			method,
			rebalancingNeeded,
			turnover
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/EqualWeightOptionsSchema.js
var require_EqualWeightOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EqualWeightOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.EqualWeightOptionsSchema = zod_1.z.object({
		/**
		* Number of assets in the portfolio
		*/
		numberOfAssets: zod_1.z.number().int().min(2),
		/**
		* Optional constraint: minimum weight per asset
		*/
		minWeight: zod_1.z.number().min(0).max(1).optional(),
		/**
		* Optional constraint: maximum weight per asset
		*/
		maxWeight: zod_1.z.number().min(0).max(1).optional(),
		/**
		* Whether weights should sum to exactly 1
		*/
		sumTo1: zod_1.z.boolean().default(true)
	}).refine((data) => {
		if (data.minWeight !== void 0 && data.maxWeight !== void 0) return data.minWeight <= data.maxWeight;
		return true;
	}, {
		message: "minWeight must be less than or equal to maxWeight",
		path: ["minWeight", "maxWeight"]
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/EqualWeightResultSchema.js
var require_EqualWeightResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EqualWeightResultSchema = void 0;
	var zod_1 = require_zod();
	exports.EqualWeightResultSchema = zod_1.z.object({
		/**
		* Equal weight for each asset (1/N)
		*/
		equalWeight: zod_1.z.number(),
		/**
		* Array of portfolio weights
		*/
		weights: zod_1.z.array(zod_1.z.number()),
		/**
		* Number of assets
		*/
		numberOfAssets: zod_1.z.number(),
		/**
		* Sum of all weights
		*/
		totalWeight: zod_1.z.number(),
		/**
		* Whether weights sum to exactly 1
		*/
		sumTo1: zod_1.z.boolean()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateEqualWeightPortfolio.js
var require_calculateEqualWeightPortfolio = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateEqualWeightPortfolio = calculateEqualWeightPortfolio;
	var EqualWeightOptionsSchema_1 = require_EqualWeightOptionsSchema();
	var EqualWeightResultSchema_1 = require_EqualWeightResultSchema();
	/**
	* Calculate Equal Weight Portfolio (1/N Portfolio)
	*
	* The equal weight portfolio assigns the same weight to each asset: w_i = 1/N
	* where N is the number of assets. This is one of the simplest portfolio construction
	* methods and serves as a common benchmark.
	*
	* Properties:
	* - No optimization required
	* - No historical data needed
	* - Naturally diversified
	* - Easy to rebalance
	*
	* @param options - Number of assets and optional constraints
	* @returns Equal weight portfolio result
	*
	* @example
	* ```typescript
	* // Basic equal weight portfolio
	* const equalWeight = calculateEqualWeightPortfolio({
	*   numberOfAssets: 5
	* });
	*
	* // Equal weight with constraints
	* const constrainedEqualWeight = calculateEqualWeightPortfolio({
	*   numberOfAssets: 10,
	*   minWeight: 0.05,  // 5% minimum
	*   maxWeight: 0.15   // 15% maximum
	* });
	* ```
	*/
	function calculateEqualWeightPortfolio(options) {
		const { numberOfAssets, minWeight, maxWeight, sumTo1 } = EqualWeightOptionsSchema_1.EqualWeightOptionsSchema.parse(options);
		const baseWeight = 1 / numberOfAssets;
		const weights = new Array(numberOfAssets).fill(baseWeight);
		if (minWeight !== void 0 || maxWeight !== void 0) {
			for (let i = 0; i < numberOfAssets; i++) {
				if (minWeight !== void 0 && weights[i] < minWeight) weights[i] = minWeight;
				if (maxWeight !== void 0 && weights[i] > maxWeight) weights[i] = maxWeight;
			}
			if (sumTo1) {
				const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
				if (Math.abs(totalWeight - 1) > 1e-10) {
					const scaleFactor = 1 / totalWeight;
					for (let i = 0; i < numberOfAssets; i++) weights[i] *= scaleFactor;
				}
			}
		}
		const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
		return EqualWeightResultSchema_1.EqualWeightResultSchema.parse({
			equalWeight: baseWeight,
			weights,
			numberOfAssets,
			totalWeight,
			sumTo1: Math.abs(totalWeight - 1) < 1e-10
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/ReturnCalculationOptionsSchema.js
var require_ReturnCalculationOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReturnCalculationOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.ReturnCalculationOptionsSchema = zod_1.z.object({
		/**
		* Array of asset prices
		*/
		prices: zod_1.z.array(zod_1.z.number().positive()).min(2),
		/**
		* Return calculation method
		* - 'simple': (P_t - P_{t-1}) / P_{t-1}
		* - 'log': ln(P_t / P_{t-1})
		*/
		method: zod_1.z.enum(["simple", "log"]).default("simple"),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252),
		/**
		* Whether to annualize the returns
		*/
		annualize: zod_1.z.boolean().default(false)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/ReturnCalculationResultSchema.js
var require_ReturnCalculationResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ReturnCalculationResultSchema = void 0;
	var zod_1 = require_zod();
	exports.ReturnCalculationResultSchema = zod_1.z.object({
		/**
		* Array of calculated returns
		*/
		returns: zod_1.z.array(zod_1.z.number()),
		/**
		* Return calculation method used
		*/
		method: zod_1.z.enum(["simple", "log"]),
		/**
		* Number of returns calculated
		*/
		periods: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Whether returns are annualized
		*/
		annualized: zod_1.z.boolean(),
		/**
		* Mean return (period)
		*/
		meanReturn: zod_1.z.number(),
		/**
		* Mean return (annualized, if applicable)
		*/
		meanReturnAnnualized: zod_1.z.number().optional(),
		/**
		* Standard deviation of returns (period)
		*/
		standardDeviation: zod_1.z.number(),
		/**
		* Standard deviation of returns (annualized, if applicable)
		*/
		standardDeviationAnnualized: zod_1.z.number().optional(),
		/**
		* Total cumulative return (simple method only)
		*/
		totalReturn: zod_1.z.number().optional(),
		/**
		* Total cumulative return (log method only)
		*/
		totalLogReturn: zod_1.z.number().optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateReturns.js
var require_calculateReturns = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateReturns = calculateReturns;
	var ReturnCalculationOptionsSchema_1 = require_ReturnCalculationOptionsSchema();
	var ReturnCalculationResultSchema_1 = require_ReturnCalculationResultSchema();
	/**
	* Calculate Returns from Price Data
	*
	* Calculates either simple returns or logarithmic returns from a series of asset prices.
	*
	* Simple Returns:
	* - Formula: r_t = (P_t - P_{t-1}) / P_{t-1}
	* - Additive property: Total return = (1 + r_1) * (1 + r_2) * ... * (1 + r_n) - 1
	* - Used for: Portfolio performance, benchmark comparisons, money-weighted returns
	*
	* Logarithmic Returns:
	* - Formula: r_t = ln(P_t / P_{t-1})
	* - Additive property: Total return = r_1 + r_2 + ... + r_n
	* - Used for: Statistical analysis, volatility calculations, risk models
	*
	* @param options - Price data, calculation method, and annualization parameters
	* @returns Calculated returns with statistics
	*
	* @example
	* ```typescript
	* // Simple returns for portfolio performance
	* const simpleReturns = calculateReturns({
	*   prices: [100, 105, 110, 108, 115],
	*   method: 'simple',
	*   annualize: true,
	*   annualizationFactor: 252
	* });
	*
	* // Log returns for volatility analysis
	* const logReturns = calculateReturns({
	*   prices: [100, 105, 110, 108, 115],
	*   method: 'log',
	*   annualize: true,
	*   annualizationFactor: 252
	* });
	* ```
	*/
	function calculateReturns(options) {
		const { prices, method, annualizationFactor, annualize } = ReturnCalculationOptionsSchema_1.ReturnCalculationOptionsSchema.parse(options);
		if (prices.length < 2) throw new Error("At least 2 prices required for return calculation");
		const periods = prices.length - 1;
		const returns = [];
		for (let i = 1; i < prices.length; i++) {
			const currentPrice = prices[i];
			const previousPrice = prices[i - 1];
			if (previousPrice <= 0) throw new Error(`Invalid price at index ${i - 1}: ${previousPrice}. Prices must be positive.`);
			if (method === "simple") {
				const simpleReturn = (currentPrice - previousPrice) / previousPrice;
				returns.push(simpleReturn);
			} else {
				const logReturn = Math.log(currentPrice / previousPrice);
				returns.push(logReturn);
			}
		}
		const meanReturn = returns.reduce((sum, return_) => sum + return_, 0) / periods;
		const variance = returns.reduce((sum, return_) => sum + Math.pow(return_ - meanReturn, 2), 0) / periods;
		const standardDeviation = Math.sqrt(variance);
		let meanReturnAnnualized;
		let standardDeviationAnnualized;
		if (annualize) {
			if (method === "simple") meanReturnAnnualized = Math.pow(1 + meanReturn, annualizationFactor) - 1;
			else meanReturnAnnualized = meanReturn * annualizationFactor;
			standardDeviationAnnualized = standardDeviation * Math.sqrt(annualizationFactor);
		}
		let totalReturn;
		let totalLogReturn;
		if (method === "simple") totalReturn = returns.reduce((product, return_) => product * (1 + return_), 1) - 1;
		else totalLogReturn = returns.reduce((sum, return_) => sum + return_, 0);
		return ReturnCalculationResultSchema_1.ReturnCalculationResultSchema.parse({
			returns,
			method,
			periods,
			annualizationFactor,
			annualized: annualize,
			meanReturn,
			meanReturnAnnualized,
			standardDeviation,
			standardDeviationAnnualized,
			totalReturn,
			totalLogReturn
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/RiskMetricsOptionsSchema.js
var require_RiskMetricsOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RiskMetricsOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.RiskMetricsOptionsSchema = zod_1.z.object({
		/**
		* Asset returns for each asset and period (asset x period matrix)
		*/
		assetReturns: zod_1.z.array(zod_1.z.array(zod_1.z.number())).min(1),
		/**
		* Benchmark returns for each period (optional for some metrics)
		*/
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).optional(),
		/**
		* Risk-free rate (optional, for beta calculation)
		*/
		riskFreeRate: zod_1.z.number().optional(),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252),
		/**
		* Confidence level for downside deviation (e.g., 0.05 for 5%)
		*/
		confidenceLevel: zod_1.z.number().min(0).max(1).default(.05)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/RiskMetricsResultSchema.js
var require_RiskMetricsResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RiskMetricsResultSchema = void 0;
	var zod_1 = require_zod();
	exports.RiskMetricsResultSchema = zod_1.z.object({
		/**
		* Beta for each asset relative to benchmark (NaN if no benchmark or insufficient data)
		*/
		betas: zod_1.z.array(zod_1.z.number()),
		/**
		* Correlation matrix between all assets (NaN if insufficient data)
		*/
		correlationMatrix: zod_1.z.array(zod_1.z.array(zod_1.z.number())),
		/**
		* Downside deviation for each asset
		*/
		downsideDeviations: zod_1.z.array(zod_1.z.number()),
		/**
		* Annualized downside deviation for each asset
		*/
		downsideDeviationsAnnualized: zod_1.z.array(zod_1.z.number()),
		/**
		* Number of assets
		*/
		assets: zod_1.z.number(),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Confidence level used for downside deviation
		*/
		confidenceLevel: zod_1.z.number(),
		/**
		* Risk-free rate used (if provided)
		*/
		riskFreeRate: zod_1.z.number().optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateRiskMetrics.js
var require_calculateRiskMetrics = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateRiskMetrics = calculateRiskMetrics;
	var RiskMetricsOptionsSchema_1 = require_RiskMetricsOptionsSchema();
	var RiskMetricsResultSchema_1 = require_RiskMetricsResultSchema();
	/**
	* Calculate Risk Metrics (Beta, Correlation, Downside Deviation)
	*
	* Calculates comprehensive risk metrics for portfolio analysis:
	*
	* 1. Beta: Measures systematic risk relative to benchmark
	*    Formula: β = Cov(Asset, Benchmark) / Var(Benchmark)
	*
	* 2. Correlation Matrix: Measures relationships between assets
	*    Formula: ρ = Cov(Asset1, Asset2) / (σ1 × σ2)
	*
	* 3. Downside Deviation: Measures volatility of negative returns
	*    Formula: DD = √(Σ(min(r_i, 0))² / n) × √(annualization_factor)
	*
	* @param options - Asset returns, benchmark returns, and calculation parameters
	* @returns Risk metrics including beta, correlation, and downside deviation
	*
	* @example
	* ```typescript
	* const riskMetrics = calculateRiskMetrics({
	*   assetReturns: [
	*     [0.05, 0.03, 0.07, 0.02], // Asset 1 returns
	*     [0.04, 0.02, 0.06, 0.01], // Asset 2 returns
	*     [0.06, 0.04, 0.08, 0.03]  // Asset 3 returns
	*   ],
	*   benchmarkReturns: [0.04, 0.03, 0.06, 0.02],
	*   riskFreeRate: 0.02,
	*   annualizationFactor: 252
	* });
	* ```
	*/
	function calculateRiskMetrics(options) {
		const { assetReturns, benchmarkReturns, riskFreeRate, annualizationFactor, confidenceLevel } = RiskMetricsOptionsSchema_1.RiskMetricsOptionsSchema.parse(options);
		const assets = assetReturns.length;
		const periods = assetReturns[0].length;
		for (let i = 0; i < assets; i++) if (assetReturns[i].length !== periods) throw new Error(`Asset ${i} returns length must match other assets`);
		if (benchmarkReturns && benchmarkReturns.length !== periods) throw new Error("Benchmark returns length must match asset returns length");
		const betas = [];
		if (benchmarkReturns) for (let i = 0; i < assets; i++) {
			const beta = calculateBeta(assetReturns[i], benchmarkReturns);
			betas.push(isNaN(beta) ? 0 : beta);
		}
		else betas.push(...new Array(assets).fill(0));
		const correlationMatrix = [];
		for (let i = 0; i < assets; i++) {
			correlationMatrix[i] = [];
			for (let j = 0; j < assets; j++) if (i === j) correlationMatrix[i][j] = 1;
			else {
				const correlation = calculateCorrelation(assetReturns[i], assetReturns[j]);
				correlationMatrix[i][j] = isNaN(correlation) ? 0 : correlation;
			}
		}
		const downsideDeviations = [];
		const downsideDeviationsAnnualized = [];
		for (let i = 0; i < assets; i++) {
			const downsideDev = calculateDownsideDeviation(assetReturns[i], confidenceLevel);
			downsideDeviations.push(downsideDev);
			downsideDeviationsAnnualized.push(downsideDev * Math.sqrt(annualizationFactor));
		}
		return RiskMetricsResultSchema_1.RiskMetricsResultSchema.parse({
			betas,
			correlationMatrix,
			downsideDeviations,
			downsideDeviationsAnnualized,
			assets,
			periods,
			annualizationFactor,
			confidenceLevel,
			riskFreeRate
		});
	}
	/**
	* Calculate Beta (systematic risk)
	*/
	function calculateBeta(assetReturns, benchmarkReturns) {
		const n = assetReturns.length;
		const assetMean = assetReturns.reduce((sum, r) => sum + r, 0) / n;
		const benchmarkMean = benchmarkReturns.reduce((sum, r) => sum + r, 0) / n;
		let covariance = 0;
		for (let i = 0; i < n; i++) covariance += (assetReturns[i] - assetMean) * (benchmarkReturns[i] - benchmarkMean);
		covariance /= n - 1;
		let benchmarkVariance = 0;
		for (let i = 0; i < n; i++) benchmarkVariance += Math.pow(benchmarkReturns[i] - benchmarkMean, 2);
		benchmarkVariance /= n - 1;
		if (benchmarkVariance === 0) return 0;
		return covariance / benchmarkVariance;
	}
	/**
	* Calculate Correlation between two assets
	*/
	function calculateCorrelation(returns1, returns2) {
		const n = returns1.length;
		const mean1 = returns1.reduce((sum, r) => sum + r, 0) / n;
		const mean2 = returns2.reduce((sum, r) => sum + r, 0) / n;
		let covariance = 0;
		for (let i = 0; i < n; i++) covariance += (returns1[i] - mean1) * (returns2[i] - mean2);
		covariance /= n - 1;
		let variance1 = 0;
		let variance2 = 0;
		for (let i = 0; i < n; i++) {
			variance1 += Math.pow(returns1[i] - mean1, 2);
			variance2 += Math.pow(returns2[i] - mean2, 2);
		}
		variance1 /= n - 1;
		variance2 /= n - 1;
		const stdDev1 = Math.sqrt(variance1);
		const stdDev2 = Math.sqrt(variance2);
		if (stdDev1 === 0 || stdDev2 === 0) return 0;
		return covariance / (stdDev1 * stdDev2);
	}
	/**
	* Calculate Downside Deviation
	*/
	function calculateDownsideDeviation(returns, confidenceLevel) {
		const threshold = confidenceLevel;
		let downsideSum = 0;
		let downsideCount = 0;
		for (const return_ of returns) if (return_ < threshold) {
			downsideSum += Math.pow(return_ - threshold, 2);
			downsideCount++;
		}
		if (downsideCount === 0) return 0;
		const downsideVariance = downsideSum / downsideCount;
		return Math.sqrt(downsideVariance);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/InformationRatioOptionsSchema.js
var require_InformationRatioOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InformationRatioOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.InformationRatioOptionsSchema = zod_1.z.object({
		/**
		* Array of portfolio returns
		*/
		portfolioReturns: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Array of benchmark returns (must match portfolio returns length)
		*/
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252),
		/**
		* Method for calculating standard deviation
		* - 'population': Use population standard deviation (N)
		* - 'sample': Use sample standard deviation (N-1)
		*/
		method: zod_1.z.enum(["population", "sample"]).default("sample")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/InformationRatioResultSchema.js
var require_InformationRatioResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InformationRatioResultSchema = void 0;
	var zod_1 = require_zod();
	exports.InformationRatioResultSchema = zod_1.z.object({
		/**
		* Information ratio (annualized)
		*/
		informationRatio: zod_1.z.number().finite(),
		/**
		* Information ratio (period)
		*/
		informationRatioPeriod: zod_1.z.number().finite(),
		/**
		* Mean excess return (annualized)
		*/
		meanExcessReturn: zod_1.z.number(),
		/**
		* Mean excess return (period)
		*/
		meanExcessReturnPeriod: zod_1.z.number(),
		/**
		* Tracking error (annualized)
		*/
		trackingError: zod_1.z.number(),
		/**
		* Tracking error (period)
		*/
		trackingErrorPeriod: zod_1.z.number(),
		/**
		* Array of excess returns (portfolio - benchmark)
		*/
		excessReturns: zod_1.z.array(zod_1.z.number()),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Standard deviation method used
		*/
		method: zod_1.z.enum(["population", "sample"])
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateInformationRatio.js
var require_calculateInformationRatio = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateInformationRatio = calculateInformationRatio;
	var InformationRatioOptionsSchema_1 = require_InformationRatioOptionsSchema();
	var InformationRatioResultSchema_1 = require_InformationRatioResultSchema();
	/**
	* Calculate Information Ratio
	*
	* Information Ratio measures the efficiency of a portfolio manager's ability to generate
	* excess returns relative to a benchmark. It's the ratio of mean excess return to tracking error.
	*
	* Formula:
	* - Excess Returns: r_excess = r_portfolio - r_benchmark
	* - Mean Excess Return: μ_excess = Σ(r_excess) / n
	* - Tracking Error: TE = √(Σ(r_excess - μ_excess)² / (n-1)) * √(annualization_factor)
	* - Information Ratio: IR = μ_excess / TE
	*
	* Where:
	* - n = number of periods
	* - μ_excess = mean of excess returns
	*
	* @param options - Portfolio returns, benchmark returns, and calculation parameters
	* @returns Information ratio result with period and annualized values
	*
	* @example
	* ```typescript
	* const informationRatio = calculateInformationRatio({
	*   portfolioReturns: [0.05, 0.03, 0.07, 0.02],
	*   benchmarkReturns: [0.04, 0.03, 0.06, 0.02],
	*   annualizationFactor: 252
	* });
	* ```
	*/
	function calculateInformationRatio(options) {
		const { portfolioReturns, benchmarkReturns, annualizationFactor, method } = InformationRatioOptionsSchema_1.InformationRatioOptionsSchema.parse(options);
		if (portfolioReturns.length !== benchmarkReturns.length) throw new Error("Portfolio and benchmark returns must have same length");
		if (portfolioReturns.length < 2) throw new Error("At least 2 periods required for information ratio calculation");
		const periods = portfolioReturns.length;
		const excessReturns = [];
		for (let i = 0; i < periods; i++) excessReturns.push(portfolioReturns[i] - benchmarkReturns[i]);
		const meanExcessReturnPeriod = excessReturns.reduce((sum, excess) => sum + excess, 0) / periods;
		let variance = 0;
		for (const excess of excessReturns) variance += Math.pow(excess - meanExcessReturnPeriod, 2);
		const denominator = method === "sample" ? periods - 1 : periods;
		variance /= denominator;
		const trackingErrorPeriod = Math.sqrt(variance);
		const meanExcessReturn = meanExcessReturnPeriod * annualizationFactor;
		const trackingError = trackingErrorPeriod * Math.sqrt(annualizationFactor);
		let informationRatio;
		let informationRatioPeriod;
		if (trackingErrorPeriod === 0) {
			if (meanExcessReturnPeriod === 0) {
				informationRatio = 0;
				informationRatioPeriod = 0;
			} else {
				informationRatio = meanExcessReturn > 0 ? 1e6 : -1e6;
				informationRatioPeriod = meanExcessReturnPeriod > 0 ? 1e6 : -1e6;
			}
		} else {
			informationRatioPeriod = meanExcessReturnPeriod / trackingErrorPeriod;
			informationRatio = meanExcessReturn / trackingError;
		}
		return InformationRatioResultSchema_1.InformationRatioResultSchema.parse({
			informationRatio,
			informationRatioPeriod,
			meanExcessReturn,
			meanExcessReturnPeriod,
			trackingError,
			trackingErrorPeriod,
			excessReturns,
			periods,
			annualizationFactor,
			method
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/TrackingErrorOptionsSchema.js
var require_TrackingErrorOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TrackingErrorOptionsSchema = void 0;
	var zod_1 = require_zod();
	exports.TrackingErrorOptionsSchema = zod_1.z.object({
		/**
		* Array of portfolio returns
		*/
		portfolioReturns: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Array of benchmark returns (must match portfolio returns length)
		*/
		benchmarkReturns: zod_1.z.array(zod_1.z.number()).min(2),
		/**
		* Annualization factor (e.g., 252 for daily, 12 for monthly, 1 for annual)
		*/
		annualizationFactor: zod_1.z.number().positive().default(252),
		/**
		* Method for calculating standard deviation
		* - 'population': Use population standard deviation (N)
		* - 'sample': Use sample standard deviation (N-1)
		*/
		method: zod_1.z.enum(["population", "sample"]).default("sample")
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/schemas/TrackingErrorResultSchema.js
var require_TrackingErrorResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TrackingErrorResultSchema = void 0;
	var zod_1 = require_zod();
	exports.TrackingErrorResultSchema = zod_1.z.object({
		/**
		* Tracking error (annualized)
		*/
		trackingError: zod_1.z.number(),
		/**
		* Tracking error (period)
		*/
		trackingErrorPeriod: zod_1.z.number(),
		/**
		* Array of excess returns (portfolio - benchmark)
		*/
		excessReturns: zod_1.z.array(zod_1.z.number()),
		/**
		* Mean excess return
		*/
		meanExcessReturn: zod_1.z.number(),
		/**
		* Number of periods
		*/
		periods: zod_1.z.number(),
		/**
		* Annualization factor used
		*/
		annualizationFactor: zod_1.z.number(),
		/**
		* Standard deviation method used
		*/
		method: zod_1.z.enum(["population", "sample"])
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/portfolio/calculateTrackingError.js
var require_calculateTrackingError = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateTrackingError = calculateTrackingError;
	var TrackingErrorOptionsSchema_1 = require_TrackingErrorOptionsSchema();
	var TrackingErrorResultSchema_1 = require_TrackingErrorResultSchema();
	/**
	* Calculate Tracking Error
	*
	* Tracking Error measures the standard deviation of excess returns (portfolio return - benchmark return).
	* It quantifies how much a portfolio's returns deviate from its benchmark over time.
	*
	* Formula:
	* - Excess Returns: r_excess = r_portfolio - r_benchmark
	* - Tracking Error: TE = √(Σ(r_excess - μ_excess)² / (n-1)) * √(annualization_factor)
	*
	* Where:
	* - μ_excess = mean of excess returns
	* - n = number of periods
	*
	* @param options - Portfolio returns, benchmark returns, and calculation parameters
	* @returns Tracking error result with period and annualized values
	*
	* @example
	* ```typescript
	* const trackingError = calculateTrackingError({
	*   portfolioReturns: [0.05, 0.03, 0.07, 0.02],
	*   benchmarkReturns: [0.04, 0.03, 0.06, 0.02],
	*   annualizationFactor: 252
	* });
	* ```
	*/
	function calculateTrackingError(options) {
		const { portfolioReturns, benchmarkReturns, annualizationFactor, method } = TrackingErrorOptionsSchema_1.TrackingErrorOptionsSchema.parse(options);
		if (portfolioReturns.length !== benchmarkReturns.length) throw new Error("Portfolio and benchmark returns must have same length");
		if (portfolioReturns.length < 2) throw new Error("At least 2 periods required for tracking error calculation");
		const periods = portfolioReturns.length;
		const excessReturns = [];
		for (let i = 0; i < periods; i++) excessReturns.push(portfolioReturns[i] - benchmarkReturns[i]);
		const meanExcessReturn = excessReturns.reduce((sum, excess) => sum + excess, 0) / periods;
		let variance = 0;
		for (const excess of excessReturns) variance += Math.pow(excess - meanExcessReturn, 2);
		const denominator = method === "sample" ? periods - 1 : periods;
		variance /= denominator;
		const trackingErrorPeriod = Math.sqrt(variance);
		const trackingError = trackingErrorPeriod * Math.sqrt(annualizationFactor);
		return TrackingErrorResultSchema_1.TrackingErrorResultSchema.parse({
			trackingError,
			trackingErrorPeriod,
			excessReturns,
			meanExcessReturn,
			periods,
			annualizationFactor,
			method
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/RegimeDetectionOptionsSchema.js
var require_RegimeDetectionOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RegimeDetectionOptionsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for regime detection options
	*/
	exports.RegimeDetectionOptionsSchema = zod_1.z.object({
		numStates: zod_1.z.number().int().positive().default(3),
		features: zod_1.z.union([
			zod_1.z.literal("default"),
			zod_1.z.array(zod_1.z.enum([
				"returns",
				"volatility",
				"rsi",
				"macd",
				"ema"
			])),
			zod_1.z.array(zod_1.z.array(zod_1.z.number()))
		]).default("default"),
		featureWindow: zod_1.z.number().int().positive().default(20),
		maxIterations: zod_1.z.number().int().positive().default(100),
		convergenceTolerance: zod_1.z.number().positive().default(1e-6),
		stateLabels: zod_1.z.array(zod_1.z.string()).optional()
	}).refine((data) => {
		if (data.stateLabels && data.stateLabels.length !== data.numStates) return false;
		return true;
	}, { message: "stateLabels length must match numStates" });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/EmissionParamsSchema.js
var require_EmissionParamsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EmissionParamsSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for Gaussian emission parameters
	*/
	exports.EmissionParamsSchema = zod_1.z.object({
		means: zod_1.z.array(zod_1.z.number()).min(1),
		variances: zod_1.z.array(zod_1.z.number().positive()).min(1)
	}).refine((data) => data.means.length === data.variances.length, { message: "Means and variances arrays must have the same length" });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/HMMModelSchema.js
var require_HMMModelSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HMMModelSchema = void 0;
	var zod_1 = require_zod();
	var EmissionParamsSchema_1 = require_EmissionParamsSchema();
	/**
	* Zod schema for HMM model
	*/
	exports.HMMModelSchema = zod_1.z.object({
		numStates: zod_1.z.number().int().positive(),
		numFeatures: zod_1.z.number().int().positive(),
		transitionMatrix: zod_1.z.array(zod_1.z.array(zod_1.z.number().min(0).max(1))),
		emissionParams: zod_1.z.array(EmissionParamsSchema_1.EmissionParamsSchema),
		initialProbs: zod_1.z.array(zod_1.z.number().min(0).max(1)),
		logLikelihood: zod_1.z.number().optional()
	}).refine((data) => {
		if (data.transitionMatrix.length !== data.numStates) return false;
		if (!data.transitionMatrix.every((row) => row.length === data.numStates)) return false;
		if (data.emissionParams.length !== data.numStates) return false;
		if (data.initialProbs.length !== data.numStates) return false;
		return true;
	}, { message: "Model dimensions must be consistent" });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/RegimeDetectionResultSchema.js
var require_RegimeDetectionResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RegimeDetectionResultSchema = void 0;
	var zod_1 = require_zod();
	var HMMModelSchema_1 = require_HMMModelSchema();
	/**
	* Zod schema for regime detection result
	*/
	exports.RegimeDetectionResultSchema = zod_1.z.object({
		currentRegime: zod_1.z.string(),
		regimes: zod_1.z.array(zod_1.z.string()),
		stateSequence: zod_1.z.array(zod_1.z.number().int().nonnegative()),
		stateProbabilities: zod_1.z.array(zod_1.z.array(zod_1.z.number().min(0).max(1))),
		model: HMMModelSchema_1.HMMModelSchema,
		confidence: zod_1.z.number().min(0).max(1)
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/utils/validationUtils.js
var require_validationUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Validation Utility Functions for Machine Learning
	*
	* Provides input validation helpers for ML algorithms
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validatePriceArray = validatePriceArray;
	exports.validateFeatureMatrix = validateFeatureMatrix;
	exports.validateHMMParameters = validateHMMParameters;
	exports.validateNumStates = validateNumStates;
	/**
	* Validate price array
	*
	* @param prices - Array of prices
	* @throws Error if validation fails
	*/
	function validatePriceArray(prices) {
		if (!Array.isArray(prices)) throw new Error("Prices must be an array");
		if (prices.length < 2) throw new Error("At least 2 prices required");
		if (!prices.every((p) => typeof p === "number" && isFinite(p))) throw new Error("All prices must be finite numbers");
		if (!prices.every((p) => p > 0)) throw new Error("All prices must be positive");
	}
	/**
	* Validate feature matrix
	*
	* @param features - T x D matrix of features
	* @throws Error if validation fails
	*/
	function validateFeatureMatrix(features) {
		if (!Array.isArray(features)) throw new Error("Features must be an array");
		if (features.length === 0) throw new Error("Features array cannot be empty");
		const numFeatures = features[0].length;
		if (numFeatures === 0) throw new Error("Each observation must have at least one feature");
		for (let t = 0; t < features.length; t++) {
			if (!Array.isArray(features[t])) throw new Error(`Observation at index ${t} is not an array`);
			if (features[t].length !== numFeatures) throw new Error(`All observations must have the same number of features. Expected ${numFeatures}, got ${features[t].length} at index ${t}`);
			if (!features[t].every((f) => typeof f === "number" && isFinite(f))) throw new Error(`All features must be finite numbers at observation ${t}`);
		}
	}
	/**
	* Validate HMM parameters
	*
	* @param model - HMM model to validate
	* @throws Error if validation fails
	*/
	function validateHMMParameters(model) {
		const { numStates, transitionMatrix, emissionParams, initialProbs } = model;
		if (transitionMatrix.length !== numStates) throw new Error(`Transition matrix must have ${numStates} rows`);
		if (!transitionMatrix.every((row) => row.length === numStates)) throw new Error(`All rows in transition matrix must have ${numStates} columns`);
		if (emissionParams.length !== numStates) throw new Error(`Must have ${numStates} emission parameter sets`);
		if (initialProbs.length !== numStates) throw new Error(`Initial probabilities must have ${numStates} elements`);
		const validateProbabilities = (probs, name) => {
			if (!probs.every((p) => p >= 0 && p <= 1)) throw new Error(`${name} must be between 0 and 1`);
			const sum = probs.reduce((acc, p) => acc + p, 0);
			if (Math.abs(sum - 1) > 1e-6) throw new Error(`${name} must sum to 1 (sum = ${sum})`);
		};
		transitionMatrix.forEach((row, i) => {
			validateProbabilities(row, `Transition matrix row ${i}`);
		});
		validateProbabilities(initialProbs, "Initial probabilities");
		emissionParams.forEach((params, i) => {
			if (params.means.length !== params.variances.length) throw new Error(`Emission params ${i}: means and variances must have same length`);
			if (!params.variances.every((v) => v > 0)) throw new Error(`Emission params ${i}: all variances must be positive`);
		});
	}
	/**
	* Validate number of states
	*
	* @param numStates - Number of states
	* @param observations - Observation matrix
	* @throws Error if validation fails
	*/
	function validateNumStates(numStates, observations) {
		if (!Number.isInteger(numStates) || numStates < 2) throw new Error("Number of states must be an integer >= 2");
		if (numStates > observations.length) throw new Error(`Number of states (${numStates}) cannot exceed number of observations (${observations.length})`);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/utils/statisticsUtils.js
var require_statisticsUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Statistical Utility Functions for Machine Learning
	*
	* Provides statistical functions commonly used in ML algorithms
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.gaussianPDF = gaussianPDF;
	exports.logGaussianPDF = logGaussianPDF;
	exports.calculateMean = calculateMean;
	exports.calculateVariance = calculateVariance;
	exports.standardize = standardize;
	exports.multivariateGaussianPDF = multivariateGaussianPDF;
	exports.logMultivariateGaussianPDF = logMultivariateGaussianPDF;
	/**
	* Calculate Gaussian Probability Density Function
	*
	* @param x - Value to evaluate
	* @param mean - Mean of the Gaussian
	* @param variance - Variance of the Gaussian
	* @returns PDF value
	*
	* @example
	* ```typescript
	* const pdf = gaussianPDF(1.0, 0.0, 1.0); // Standard normal at x=1
	* ```
	*/
	function gaussianPDF(x, mean, variance) {
		if (variance <= 0) throw new Error("Variance must be positive");
		const coefficient = 1 / Math.sqrt(2 * Math.PI * variance);
		const exponent = -Math.pow(x - mean, 2) / (2 * variance);
		return coefficient * Math.exp(exponent);
	}
	/**
	* Calculate log of Gaussian PDF for numerical stability
	*
	* @param x - Value to evaluate
	* @param mean - Mean of the Gaussian
	* @param variance - Variance of the Gaussian
	* @returns Log PDF value
	*/
	function logGaussianPDF(x, mean, variance) {
		if (variance <= 0) throw new Error("Variance must be positive");
		return -.5 * Math.log(2 * Math.PI * variance) + -Math.pow(x - mean, 2) / (2 * variance);
	}
	/**
	* Calculate mean of values
	*
	* @param values - Array of numbers
	* @returns Mean value
	*
	* @example
	* ```typescript
	* const mean = calculateMean([1, 2, 3, 4, 5]); // 3
	* ```
	*/
	function calculateMean(values) {
		if (values.length === 0) throw new Error("Cannot calculate mean of empty array");
		return values.reduce((sum, val) => sum + val, 0) / values.length;
	}
	/**
	* Calculate variance of values
	*
	* @param values - Array of numbers
	* @param mean - Pre-computed mean (optional)
	* @returns Variance
	*
	* @example
	* ```typescript
	* const variance = calculateVariance([1, 2, 3, 4, 5]); // 2
	* ```
	*/
	function calculateVariance(values, mean) {
		if (values.length === 0) throw new Error("Cannot calculate variance of empty array");
		const mu = mean !== void 0 ? mean : calculateMean(values);
		return values.map((val) => Math.pow(val - mu, 2)).reduce((sum, val) => sum + val, 0) / values.length;
	}
	/**
	* Standardize values (z-score normalization)
	*
	* Transforms values to have mean=0 and variance=1
	*
	* @param values - Array of numbers
	* @returns Standardized values
	*
	* @example
	* ```typescript
	* const standardized = standardize([1, 2, 3, 4, 5]);
	* ```
	*/
	function standardize(values) {
		if (values.length === 0) return [];
		const mean = calculateMean(values);
		const variance = calculateVariance(values, mean);
		if (variance === 0) return values.map(() => 0);
		const stdDev = Math.sqrt(variance);
		return values.map((val) => (val - mean) / stdDev);
	}
	/**
	* Calculate multivariate Gaussian PDF
	*
	* For a feature vector x with independent features
	*
	* @param x - Feature vector
	* @param means - Mean for each feature
	* @param variances - Variance for each feature
	* @returns PDF value
	*/
	function multivariateGaussianPDF(x, means, variances) {
		if (x.length !== means.length || x.length !== variances.length) throw new Error("Dimension mismatch in multivariate Gaussian PDF");
		let product = 1;
		for (let i = 0; i < x.length; i++) product *= gaussianPDF(x[i], means[i], variances[i]);
		return product;
	}
	/**
	* Calculate log of multivariate Gaussian PDF for numerical stability
	*
	* @param x - Feature vector
	* @param means - Mean for each feature
	* @param variances - Variance for each feature
	* @returns Log PDF value
	*/
	function logMultivariateGaussianPDF(x, means, variances) {
		if (x.length !== means.length || x.length !== variances.length) throw new Error("Dimension mismatch in multivariate Gaussian PDF");
		let sum = 0;
		for (let i = 0; i < x.length; i++) sum += logGaussianPDF(x[i], means[i], variances[i]);
		return sum;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/core/extractFeatures.js
var require_extractFeatures = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Feature Extraction for Regime Detection
	*
	* Extracts features from price data for HMM training
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.extractFeatures = extractFeatures;
	var validationUtils_1 = require_validationUtils();
	var calculateEMA_1 = require_calculateEMA();
	var calculateMACD_1 = require_calculateMACD();
	var calculateRSI_1 = require_calculateRSI();
	var calculateVolatility_1 = require_calculateVolatility();
	var statisticsUtils_1 = require_statisticsUtils();
	/**
	* Extract features from price data
	*
	* @param prices - Array of prices
	* @param options - Feature extraction options
	* @returns T x D matrix of standardized features
	*
	* @example
	* ```typescript
	* // Default: returns + volatility
	* const features = extractFeatures(prices, { features: 'default', window: 20 });
	*
	* // Advanced: custom feature set
	* const features = extractFeatures(prices, {
	*   features: ['returns', 'volatility', 'rsi'],
	*   window: 20
	* });
	*
	* // Custom: provide your own features
	* const features = extractFeatures(prices, {
	*   features: myCustomFeatureMatrix,
	*   window: 20
	* });
	* ```
	*/
	function extractFeatures(prices, options) {
		(0, validationUtils_1.validatePriceArray)(prices);
		const { features, window } = options;
		if (Array.isArray(features) && Array.isArray(features[0]) && typeof features[0][0] === "number") {
			const customFeatures = features;
			(0, validationUtils_1.validateFeatureMatrix)(customFeatures);
			return standardizeFeatureMatrix(customFeatures);
		}
		let featureList;
		if (features === "default") featureList = ["returns", "volatility"];
		else featureList = features;
		const featureArrays = {};
		if (featureList.includes("returns")) featureArrays.returns = calculateReturns(prices);
		if (featureList.includes("volatility")) featureArrays.volatility = calculateRollingVolatility(prices, window);
		if (featureList.includes("rsi")) featureArrays.rsi = (0, calculateRSI_1.calculateRSI)({
			prices,
			period: Math.min(14, window)
		}).rsi;
		if (featureList.includes("macd")) featureArrays.macd = (0, calculateMACD_1.calculateMACD)({
			prices,
			fastPeriod: 12,
			slowPeriod: 26,
			signalPeriod: 9
		}).macdLine;
		if (featureList.includes("ema")) featureArrays.ema = (0, calculateEMA_1.calculateEMA)({
			prices,
			period: window
		}).ema;
		const lengths = Object.values(featureArrays).map((arr) => arr.length);
		const minLength = Math.min(...lengths);
		if (minLength === 0) throw new Error("Not enough data to extract features");
		const alignedFeatures = {};
		for (const [name, values] of Object.entries(featureArrays)) {
			const trimStart = values.length - minLength;
			alignedFeatures[name] = values.slice(trimStart);
		}
		const featureNames = featureList.filter((name) => alignedFeatures[name]);
		const featureMatrix = [];
		for (let t = 0; t < minLength; t++) {
			const observation = [];
			for (const name of featureNames) observation.push(alignedFeatures[name][t]);
			featureMatrix.push(observation);
		}
		return standardizeFeatureMatrix(featureMatrix);
	}
	/**
	* Calculate simple returns
	*/
	function calculateReturns(prices) {
		const returns = [];
		for (let i = 1; i < prices.length; i++) returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
		return returns;
	}
	/**
	* Calculate rolling volatility
	*/
	function calculateRollingVolatility(prices, window) {
		const returns = calculateReturns(prices);
		const volatilities = [];
		for (let i = window - 1; i < returns.length; i++) {
			const windowReturns = returns.slice(i - window + 1, i + 1);
			const volatility = (0, calculateVolatility_1.calculateVolatility)(windowReturns, { method: "standard" });
			volatilities.push(volatility.value);
		}
		return volatilities;
	}
	/**
	* Standardize feature matrix (each column has mean=0, std=1)
	*/
	function standardizeFeatureMatrix(features) {
		if (features.length === 0 || features[0].length === 0) return features;
		const T = features.length;
		const D = features[0].length;
		const columns = [];
		for (let d = 0; d < D; d++) {
			const column = [];
			for (let t = 0; t < T; t++) column.push(features[t][d]);
			columns.push(column);
		}
		const standardizedColumns = columns.map((col) => (0, statisticsUtils_1.standardize)(col));
		const standardizedFeatures = [];
		for (let t = 0; t < T; t++) {
			const observation = [];
			for (let d = 0; d < D; d++) observation.push(standardizedColumns[d][t]);
			standardizedFeatures.push(observation);
		}
		return standardizedFeatures;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/ForwardResultSchema.js
var require_ForwardResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ForwardResultSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for forward algorithm result
	*/
	exports.ForwardResultSchema = zod_1.z.object({
		alpha: zod_1.z.array(zod_1.z.array(zod_1.z.number().nonnegative())),
		scalingFactors: zod_1.z.array(zod_1.z.number().positive()),
		logLikelihood: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/algorithms/forward.js
var require_forward = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Forward Algorithm for Hidden Markov Models
	*
	* Computes forward probabilities α(t,i) = P(o₁...oₜ, qₜ=i | λ)
	* Uses scaling for numerical stability
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.forward = forward;
	var ForwardResultSchema_1 = require_ForwardResultSchema();
	var statisticsUtils_1 = require_statisticsUtils();
	/**
	* Forward Algorithm with scaling
	*
	* @param observations - T x D matrix of observations
	* @param transitionMatrix - N x N transition probability matrix
	* @param emissionParams - Emission parameters for each state
	* @param initialProbs - Initial state probabilities
	* @returns Forward probabilities and scaling factors
	*
	* @example
	* ```typescript
	* const result = forward(observations, transitionMatrix, emissionParams, initialProbs);
	* console.log(result.logLikelihood); // Log-likelihood of observations
	* ```
	*/
	function forward(observations, transitionMatrix, emissionParams, initialProbs) {
		const T = observations.length;
		const N = initialProbs.length;
		const alpha = Array(T).fill(0).map(() => Array(N).fill(0));
		const scalingFactors = Array(T).fill(0);
		for (let i = 0; i < N; i++) {
			const emissionProb = Math.exp((0, statisticsUtils_1.logMultivariateGaussianPDF)(observations[0], emissionParams[i].means, emissionParams[i].variances));
			alpha[0][i] = initialProbs[i] * emissionProb;
		}
		scalingFactors[0] = alpha[0].reduce((sum, val) => sum + val, 0);
		if (scalingFactors[0] > 0) for (let i = 0; i < N; i++) alpha[0][i] /= scalingFactors[0];
		for (let t = 1; t < T; t++) {
			for (let j = 0; j < N; j++) {
				let sum = 0;
				for (let i = 0; i < N; i++) sum += alpha[t - 1][i] * transitionMatrix[i][j];
				const emissionProb = Math.exp((0, statisticsUtils_1.logMultivariateGaussianPDF)(observations[t], emissionParams[j].means, emissionParams[j].variances));
				alpha[t][j] = sum * emissionProb;
			}
			scalingFactors[t] = alpha[t].reduce((sum, val) => sum + val, 0);
			if (scalingFactors[t] > 0) for (let j = 0; j < N; j++) alpha[t][j] /= scalingFactors[t];
		}
		let logLikelihood = 0;
		for (let t = 0; t < T; t++) if (scalingFactors[t] > 0) logLikelihood += Math.log(scalingFactors[t]);
		return ForwardResultSchema_1.ForwardResultSchema.parse({
			alpha,
			scalingFactors,
			logLikelihood
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/TrainHMMOptionsSchema.js
var require_TrainHMMOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TrainHMMOptionsSchema = void 0;
	var zod_1 = require_zod();
	var HMMModelSchema_1 = require_HMMModelSchema();
	/**
	* Zod schema for HMM training options
	*/
	exports.TrainHMMOptionsSchema = zod_1.z.object({
		numStates: zod_1.z.number().int().positive(),
		maxIterations: zod_1.z.number().int().positive().default(100),
		convergenceTolerance: zod_1.z.number().positive().default(1e-6),
		initialModel: HMMModelSchema_1.HMMModelSchema.optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/BaumWelchOptionsSchema.js
var require_BaumWelchOptionsSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BaumWelchOptionsSchema = void 0;
	var zod_1 = require_zod();
	var HMMModelSchema_1 = require_HMMModelSchema();
	/**
	* Zod schema for Baum-Welch training algorithm options
	*/
	exports.BaumWelchOptionsSchema = zod_1.z.object({
		maxIterations: zod_1.z.number().int().positive(),
		convergenceTolerance: zod_1.z.number().positive(),
		initialModel: HMMModelSchema_1.HMMModelSchema.optional()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/utils/matrixUtils.js
var require_matrixUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Matrix Utility Functions for Machine Learning
	*
	* Provides numerically stable operations for ML algorithms
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.logSumExp = logSumExp;
	exports.normalizeRows = normalizeRows;
	exports.normalizeArray = normalizeArray;
	exports.addNoise = addNoise;
	/**
	* Log-Sum-Exp trick for numerical stability
	*
	* Computes log(sum(exp(logValues))) in a numerically stable way
	*
	* @param logValues - Array of log values
	* @returns log(sum(exp(logValues)))
	*
	* @example
	* ```typescript
	* const result = logSumExp([-1000, -999, -1001]); // ≈ -998.59
	* ```
	*/
	function logSumExp(logValues) {
		if (logValues.length === 0) return -Infinity;
		const maxLogValue = Math.max(...logValues);
		if (!isFinite(maxLogValue)) return maxLogValue;
		let sum = 0;
		for (const logValue of logValues) sum += Math.exp(logValue - maxLogValue);
		return maxLogValue + Math.log(sum);
	}
	/**
	* Normalize rows of a matrix (each row sums to 1)
	*
	* @param matrix - Input matrix
	* @returns Matrix with normalized rows
	*
	* @example
	* ```typescript
	* const matrix = [[1, 2, 3], [4, 5, 6]];
	* const normalized = normalizeRows(matrix);
	* // [[0.167, 0.333, 0.5], [0.267, 0.333, 0.4]]
	* ```
	*/
	function normalizeRows(matrix) {
		return matrix.map((row) => {
			const sum = row.reduce((acc, val) => acc + val, 0);
			if (sum === 0 || !isFinite(sum)) return row.map(() => 1 / row.length);
			return row.map((val) => val / sum);
		});
	}
	/**
	* Normalize an array (values sum to 1)
	*
	* @param arr - Input array
	* @returns Normalized array
	*
	* @example
	* ```typescript
	* const arr = [1, 2, 3, 4];
	* const normalized = normalizeArray(arr); // [0.1, 0.2, 0.3, 0.4]
	* ```
	*/
	function normalizeArray(arr) {
		const sum = arr.reduce((acc, val) => acc + val, 0);
		if (sum === 0) return arr.map(() => 1 / arr.length);
		return arr.map((val) => val / sum);
	}
	/**
	* Add small noise to break symmetry
	*
	* @param matrix - Input matrix
	* @param noiseLevel - Level of noise (default: 1e-4)
	* @returns Matrix with added noise
	*/
	function addNoise(matrix, noiseLevel = 1e-4) {
		return matrix.map((row) => row.map((val) => val + (Math.random() - .5) * noiseLevel));
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/BackwardResultSchema.js
var require_BackwardResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BackwardResultSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for backward algorithm result
	*/
	exports.BackwardResultSchema = zod_1.z.object({ beta: zod_1.z.array(zod_1.z.array(zod_1.z.number().nonnegative())) });
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/algorithms/backward.js
var require_backward = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Backward Algorithm for Hidden Markov Models
	*
	* Computes backward probabilities β(t,i) = P(oₜ₊₁...oₜ | qₜ=i, λ)
	* Uses same scaling factors as forward algorithm for consistency
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.backward = backward;
	var BackwardResultSchema_1 = require_BackwardResultSchema();
	var statisticsUtils_1 = require_statisticsUtils();
	/**
	* Backward Algorithm with scaling
	*
	* @param observations - T x D matrix of observations
	* @param transitionMatrix - N x N transition probability matrix
	* @param emissionParams - Emission parameters for each state
	* @param scalingFactors - Scaling factors from forward algorithm
	* @returns Backward probabilities
	*
	* @example
	* ```typescript
	* const forwardResult = forward(observations, transitionMatrix, emissionParams, initialProbs);
	* const backwardResult = backward(observations, transitionMatrix, emissionParams, forwardResult.scalingFactors);
	* ```
	*/
	function backward(observations, transitionMatrix, emissionParams, scalingFactors) {
		const T = observations.length;
		const N = transitionMatrix.length;
		const beta = Array(T).fill(0).map(() => Array(N).fill(0));
		for (let i = 0; i < N; i++) beta[T - 1][i] = 1;
		if (scalingFactors[T - 1] > 0) for (let i = 0; i < N; i++) beta[T - 1][i] /= scalingFactors[T - 1];
		for (let t = T - 2; t >= 0; t--) {
			for (let i = 0; i < N; i++) {
				let sum = 0;
				for (let j = 0; j < N; j++) {
					const emissionProb = Math.exp((0, statisticsUtils_1.logMultivariateGaussianPDF)(observations[t + 1], emissionParams[j].means, emissionParams[j].variances));
					sum += transitionMatrix[i][j] * emissionProb * beta[t + 1][j];
				}
				beta[t][i] = sum;
			}
			if (scalingFactors[t] > 0) for (let i = 0; i < N; i++) beta[t][i] /= scalingFactors[t];
		}
		return BackwardResultSchema_1.BackwardResultSchema.parse({ beta });
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/algorithms/baumWelch.js
var require_baumWelch = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Baum-Welch Algorithm (EM) for Hidden Markov Models
	*
	* Learns HMM parameters from observations using Expectation-Maximization
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.baumWelch = baumWelch;
	var BaumWelchOptionsSchema_1 = require_BaumWelchOptionsSchema();
	var HMMModelSchema_1 = require_HMMModelSchema();
	var matrixUtils_1 = require_matrixUtils();
	var validationUtils_1 = require_validationUtils();
	var backward_1 = require_backward();
	var forward_1 = require_forward();
	/**
	* Baum-Welch Algorithm
	*
	* @param observations - T x D matrix of observations
	* @param numStates - Number of hidden states
	* @param options - Training options (maxIterations, tolerance, initial model)
	* @returns Trained HMM model
	*
	* @example
	* ```typescript
	* const model = baumWelch(observations, 3, {
	*   maxIterations: 100,
	*   convergenceTolerance: 1e-6
	* });
	* ```
	*/
	function baumWelch(observations, numStates, options) {
		(0, validationUtils_1.validateFeatureMatrix)(observations);
		(0, validationUtils_1.validateNumStates)(numStates, observations);
		const validatedOptions = BaumWelchOptionsSchema_1.BaumWelchOptionsSchema.parse(options);
		const T = observations.length;
		const N = numStates;
		const D = observations[0].length;
		const { maxIterations, convergenceTolerance, initialModel } = validatedOptions;
		let model;
		if (initialModel) model = initialModel;
		else model = initializeModelUniform(N, D);
		let prevLogLikelihood = -Infinity;
		for (let iter = 0; iter < maxIterations; iter++) {
			const forwardResult = (0, forward_1.forward)(observations, model.transitionMatrix, model.emissionParams, model.initialProbs);
			const backwardResult = (0, backward_1.backward)(observations, model.transitionMatrix, model.emissionParams, forwardResult.scalingFactors);
			const { alpha } = forwardResult;
			const { beta } = backwardResult;
			const gamma = Array(T).fill(0).map(() => Array(N).fill(0));
			for (let t = 0; t < T; t++) {
				let sum = 0;
				for (let i = 0; i < N; i++) {
					gamma[t][i] = alpha[t][i] * beta[t][i];
					sum += gamma[t][i];
				}
				if (sum > 0) for (let i = 0; i < N; i++) gamma[t][i] /= sum;
			}
			model.initialProbs = gamma[0].slice();
			const newTransitionMatrix = Array(N).fill(0).map(() => Array(N).fill(1e-10));
			for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
				let numerator = 0;
				let denominator = 0;
				for (let t = 0; t < T - 1; t++) {
					const xi = computeXi(t, i, j, alpha, beta, model, observations);
					numerator += xi;
					denominator += gamma[t][i];
				}
				if (denominator > 0) newTransitionMatrix[i][j] = numerator / denominator;
			}
			model.transitionMatrix = (0, matrixUtils_1.normalizeRows)(newTransitionMatrix);
			for (let i = 0; i < N; i++) {
				const newMeans = Array(D).fill(0);
				const newVariances = Array(D).fill(0);
				let gammaSum = 0;
				for (let t = 0; t < T; t++) gammaSum += gamma[t][i];
				if (gammaSum > 0) {
					for (let d = 0; d < D; d++) {
						let sum = 0;
						for (let t = 0; t < T; t++) sum += gamma[t][i] * observations[t][d];
						newMeans[d] = sum / gammaSum;
					}
					for (let d = 0; d < D; d++) {
						let sum = 0;
						for (let t = 0; t < T; t++) sum += gamma[t][i] * Math.pow(observations[t][d] - newMeans[d], 2);
						newVariances[d] = Math.max(sum / gammaSum, 1e-6);
					}
					model.emissionParams[i] = {
						means: newMeans,
						variances: newVariances
					};
				}
			}
			const logLikelihood = forwardResult.logLikelihood;
			model.logLikelihood = logLikelihood;
			if (Math.abs(logLikelihood - prevLogLikelihood) < convergenceTolerance) break;
			prevLogLikelihood = logLikelihood;
		}
		return HMMModelSchema_1.HMMModelSchema.parse(model);
	}
	/**
	* Initialize model with uniform parameters
	*/
	function initializeModelUniform(numStates, numFeatures) {
		const N = numStates;
		const D = numFeatures;
		const transitionMatrix = Array(N).fill(0).map(() => Array(N).fill(1 / N).map((p) => p + (Math.random() - .5) * .01));
		return {
			numStates: N,
			numFeatures: D,
			transitionMatrix: (0, matrixUtils_1.normalizeRows)(transitionMatrix),
			emissionParams: Array(N).fill(0).map(() => ({
				means: Array(D).fill(0).map(() => (Math.random() - .5) * .1),
				variances: Array(D).fill(1)
			})),
			initialProbs: (0, matrixUtils_1.normalizeArray)(Array(N).fill(1))
		};
	}
	/**
	* Compute xi: ξ(t,i,j) = P(qₜ=i, qₜ₊₁=j | O, λ)
	*/
	function computeXi(t, i, j, alpha, beta, model, observations) {
		let emissionProb = 1;
		for (let d = 0; d < observations[t + 1].length; d++) {
			const mean = model.emissionParams[j].means[d];
			const variance = model.emissionParams[j].variances[d];
			const x = observations[t + 1][d];
			const coeff = 1 / Math.sqrt(2 * Math.PI * variance);
			const exp = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
			emissionProb *= coeff * exp;
		}
		return alpha[t][i] * model.transitionMatrix[i][j] * emissionProb * beta[t + 1][j];
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/core/initializeHMM.js
var require_initializeHMM = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* HMM Model Initialization
	*
	* Initialize HMM parameters using K-means-like clustering
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.initializeHMM = initializeHMM;
	var matrixUtils_1 = require_matrixUtils();
	var statisticsUtils_1 = require_statisticsUtils();
	var validationUtils_1 = require_validationUtils();
	/**
	* Initialize HMM model using K-means-like clustering
	*
	* @param observations - T x D matrix of observations
	* @param numStates - Number of hidden states
	* @returns Initialized HMM model
	*
	* @example
	* ```typescript
	* const model = initializeHMM(features, 3);
	* ```
	*/
	function initializeHMM(observations, numStates) {
		(0, validationUtils_1.validateFeatureMatrix)(observations);
		(0, validationUtils_1.validateNumStates)(numStates, observations);
		const T = observations.length;
		const N = numStates;
		const D = observations[0].length;
		const segmentSize = Math.floor(T / N);
		const stateAssignments = [];
		for (let t = 0; t < T; t++) {
			const state = Math.min(Math.floor(t / segmentSize), N - 1);
			stateAssignments.push(state);
		}
		const emissionParams = [];
		for (let i = 0; i < N; i++) {
			const stateObservations = observations.filter((_, t) => stateAssignments[t] === i);
			if (stateObservations.length === 0) {
				emissionParams.push({
					means: Array(D).fill(0).map(() => (Math.random() - .5) * .1),
					variances: Array(D).fill(1)
				});
				continue;
			}
			const means = [];
			const variances = [];
			for (let d = 0; d < D; d++) {
				const featureValues = stateObservations.map((obs) => obs[d]);
				means.push((0, statisticsUtils_1.calculateMean)(featureValues));
				variances.push(Math.max((0, statisticsUtils_1.calculateVariance)(featureValues), 1e-6));
			}
			emissionParams.push({
				means,
				variances
			});
		}
		const transitionCounts = Array(N).fill(0).map(() => Array(N).fill(1));
		for (let t = 0; t < T - 1; t++) {
			const currentState = stateAssignments[t];
			const nextState = stateAssignments[t + 1];
			transitionCounts[currentState][nextState]++;
		}
		let transitionMatrix = (0, matrixUtils_1.normalizeRows)(transitionCounts);
		transitionMatrix = (0, matrixUtils_1.addNoise)(transitionMatrix, .01);
		transitionMatrix = (0, matrixUtils_1.normalizeRows)(transitionMatrix);
		const initialCounts = Array(N).fill(1);
		for (const state of stateAssignments.slice(0, Math.min(10, T))) initialCounts[state]++;
		let initialProbs = (0, matrixUtils_1.normalizeArray)(initialCounts);
		initialProbs = initialProbs.map((p) => p + (Math.random() - .5) * .01);
		initialProbs = (0, matrixUtils_1.normalizeArray)(initialProbs);
		return {
			numStates: N,
			numFeatures: D,
			transitionMatrix,
			emissionParams,
			initialProbs
		};
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/core/trainHMM.js
var require_trainHMM = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* High-Level HMM Training Wrapper
	*
	* Combines initialization and Baum-Welch training
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.trainHMM = trainHMM;
	var HMMModelSchema_1 = require_HMMModelSchema();
	var TrainHMMOptionsSchema_1 = require_TrainHMMOptionsSchema();
	var validationUtils_1 = require_validationUtils();
	var baumWelch_1 = require_baumWelch();
	var initializeHMM_1 = require_initializeHMM();
	/**
	* Train HMM model on observations
	*
	* @param observations - T x D matrix of observations
	* @param options - Training options
	* @returns Trained HMM model
	*
	* @example
	* ```typescript
	* const model = trainHMM(features, {
	*   numStates: 3,
	*   maxIterations: 100,
	*   convergenceTolerance: 1e-6
	* });
	* ```
	*/
	function trainHMM(observations, options) {
		(0, validationUtils_1.validateFeatureMatrix)(observations);
		const validatedOptions = TrainHMMOptionsSchema_1.TrainHMMOptionsSchema.parse(options);
		(0, validationUtils_1.validateNumStates)(validatedOptions.numStates, observations);
		const { numStates, maxIterations, convergenceTolerance, initialModel } = validatedOptions;
		const initModel = initialModel || (0, initializeHMM_1.initializeHMM)(observations, numStates);
		const trainedModel = (0, baumWelch_1.baumWelch)(observations, numStates, {
			maxIterations,
			convergenceTolerance,
			initialModel: initModel
		});
		return HMMModelSchema_1.HMMModelSchema.parse(trainedModel);
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/schemas/ViterbiResultSchema.js
var require_ViterbiResultSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ViterbiResultSchema = void 0;
	var zod_1 = require_zod();
	/**
	* Zod schema for Viterbi algorithm result
	*/
	exports.ViterbiResultSchema = zod_1.z.object({
		path: zod_1.z.array(zod_1.z.number().int().nonnegative()),
		logProbability: zod_1.z.number()
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/algorithms/viterbi.js
var require_viterbi = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Viterbi Algorithm for Hidden Markov Models
	*
	* Finds the most likely sequence of hidden states given observations
	* Uses log probabilities for numerical stability
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.viterbi = viterbi;
	var ViterbiResultSchema_1 = require_ViterbiResultSchema();
	var statisticsUtils_1 = require_statisticsUtils();
	/**
	* Viterbi Algorithm
	*
	* @param observations - T x D matrix of observations
	* @param transitionMatrix - N x N transition probability matrix
	* @param emissionParams - Emission parameters for each state
	* @param initialProbs - Initial state probabilities
	* @returns Most likely state sequence and its log probability
	*
	* @example
	* ```typescript
	* const result = viterbi(observations, transitionMatrix, emissionParams, initialProbs);
	* console.log(result.path); // [0, 1, 2, 1, 0, ...]
	* ```
	*/
	function viterbi(observations, transitionMatrix, emissionParams, initialProbs) {
		const T = observations.length;
		const N = initialProbs.length;
		const logInitialProbs = initialProbs.map((p) => Math.log(Math.max(p, 1e-300)));
		const logTransitionMatrix = transitionMatrix.map((row) => row.map((p) => Math.log(Math.max(p, 1e-300))));
		const delta = Array(T).fill(0).map(() => Array(N).fill(-Infinity));
		const psi = Array(T).fill(0).map(() => Array(N).fill(0));
		for (let i = 0; i < N; i++) {
			const logEmissionProb = (0, statisticsUtils_1.logMultivariateGaussianPDF)(observations[0], emissionParams[i].means, emissionParams[i].variances);
			delta[0][i] = logInitialProbs[i] + logEmissionProb;
		}
		for (let t = 1; t < T; t++) for (let j = 0; j < N; j++) {
			let maxProb = -Infinity;
			let maxState = 0;
			for (let i = 0; i < N; i++) {
				const prob = delta[t - 1][i] + logTransitionMatrix[i][j];
				if (prob > maxProb) {
					maxProb = prob;
					maxState = i;
				}
			}
			const logEmissionProb = (0, statisticsUtils_1.logMultivariateGaussianPDF)(observations[t], emissionParams[j].means, emissionParams[j].variances);
			delta[t][j] = maxProb + logEmissionProb;
			psi[t][j] = maxState;
		}
		let maxProb = -Infinity;
		let bestFinalState = 0;
		for (let i = 0; i < N; i++) if (delta[T - 1][i] > maxProb) {
			maxProb = delta[T - 1][i];
			bestFinalState = i;
		}
		const path = Array(T).fill(0);
		path[T - 1] = bestFinalState;
		for (let t = T - 2; t >= 0; t--) path[t] = psi[t + 1][path[t + 1]];
		return ViterbiResultSchema_1.ViterbiResultSchema.parse({
			path,
			logProbability: maxProb
		});
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/detectRegime.js
var require_detectRegime = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Regime Detection using Hidden Markov Models
	*
	* High-Level API for detecting market regimes from price data
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.detectRegime = detectRegime;
	var RegimeDetectionOptionsSchema_1 = require_RegimeDetectionOptionsSchema();
	var RegimeDetectionResultSchema_1 = require_RegimeDetectionResultSchema();
	var extractFeatures_1 = require_extractFeatures();
	var forward_1 = require_forward();
	var trainHMM_1 = require_trainHMM();
	var validationUtils_1 = require_validationUtils();
	var viterbi_1 = require_viterbi();
	/**
	* Detect market regimes from price data
	*
	* Uses Hidden Markov Models to identify different market regimes
	* (bullish, bearish, neutral by default)
	*
	* @param prices - Array of prices
	* @param options - Regime detection options
	* @returns Regime detection result with labeled regimes and model
	*
	* @example
	* ```typescript
	* // Simple usage with defaults (3 states: bearish, neutral, bullish)
	* const result = detectRegime(prices);
	* console.log(result.currentRegime); // 'bullish'
	* console.log(result.confidence); // 0.85
	*
	* // Advanced usage with custom features
	* const result = detectRegime(prices, {
	*   numStates: 4,
	*   features: ['returns', 'volatility', 'rsi'],
	*   stateLabels: ['strong_bearish', 'weak_bearish', 'weak_bullish', 'strong_bullish']
	* });
	*
	* // With custom feature matrix
	* const result = detectRegime(prices, {
	*   features: myCustomFeatures,
	*   numStates: 3
	* });
	* ```
	*/
	function detectRegime(prices, options) {
		(0, validationUtils_1.validatePriceArray)(prices);
		const { numStates, features, featureWindow, maxIterations, convergenceTolerance, stateLabels } = RegimeDetectionOptionsSchema_1.RegimeDetectionOptionsSchema.parse(options || {});
		const labels = stateLabels || getDefaultStateLabels(numStates);
		if (labels.length !== numStates) throw new Error(`stateLabels length (${labels.length}) must match numStates (${numStates})`);
		const featureMatrix = (0, extractFeatures_1.extractFeatures)(prices, {
			features,
			window: featureWindow
		});
		if (featureMatrix.length < numStates * 2) throw new Error(`Not enough observations (${featureMatrix.length}) for ${numStates} states. Need at least ${numStates * 2} observations.`);
		const model = (0, trainHMM_1.trainHMM)(featureMatrix, {
			numStates,
			maxIterations,
			convergenceTolerance
		});
		const stateSequence = (0, viterbi_1.viterbi)(featureMatrix, model.transitionMatrix, model.emissionParams, model.initialProbs).path;
		const stateToLabelMap = createStateLabelMapping(sortStatesByMeanReturn(model), labels);
		const regimes = stateSequence.map((state) => stateToLabelMap[state]);
		const currentRegime = regimes[regimes.length - 1];
		const stateProbabilities = (0, forward_1.forward)(featureMatrix, model.transitionMatrix, model.emissionParams, model.initialProbs).alpha.map((alphaRow) => {
			const sum = alphaRow.reduce((acc, val) => acc + val, 0);
			return alphaRow.map((val) => sum > 0 ? val / sum : 1 / numStates);
		});
		const result = {
			currentRegime,
			regimes,
			stateSequence,
			stateProbabilities,
			model,
			confidence: calculateConfidence(stateProbabilities)
		};
		return RegimeDetectionResultSchema_1.RegimeDetectionResultSchema.parse(result);
	}
	/**
	* Get default state labels based on number of states
	*/
	function getDefaultStateLabels(numStates) {
		if (numStates === 2) return ["bearish", "bullish"];
		else if (numStates === 3) return [
			"bearish",
			"neutral",
			"bullish"
		];
		else if (numStates === 4) return [
			"strong_bearish",
			"weak_bearish",
			"weak_bullish",
			"strong_bullish"
		];
		else return Array.from({ length: numStates }, (_, i) => `state_${i}`);
	}
	/**
	* Sort states by their mean return (first feature dimension)
	*
	* Returns array of [stateIndex, meanReturn] sorted by meanReturn
	*/
	function sortStatesByMeanReturn(model) {
		const numStates = model.numStates;
		const stateMeans = [];
		for (let i = 0; i < numStates; i++) stateMeans.push(model.emissionParams[i].means[0]);
		const indexedMeans = stateMeans.map((mean, idx) => [idx, mean]);
		indexedMeans.sort((a, b) => a[1] - b[1]);
		return indexedMeans;
	}
	/**
	* Create mapping from state index to label
	*
	* States are mapped to labels based on their mean return:
	* - Lowest mean return → most bearish label
	* - Highest mean return → most bullish label
	*/
	function createStateLabelMapping(sortedStates, labels) {
		const mapping = {};
		for (let i = 0; i < sortedStates.length; i++) {
			const stateIndex = sortedStates[i][0];
			mapping[stateIndex] = labels[i];
		}
		return mapping;
	}
	/**
	* Calculate confidence as mean of maximum state probabilities
	*/
	function calculateConfidence(stateProbabilities) {
		if (stateProbabilities.length === 0) return 0;
		const maxProbs = stateProbabilities.map((probs) => Math.max(...probs));
		return maxProbs.reduce((sum, p) => sum + p, 0) / maxProbs.length;
	}
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/hmm/index.js
var require_hmm = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Hidden Markov Model for Regime Detection
	*
	* Provides both high-level and low-level APIs for HMM-based regime detection
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.baumWelch = exports.viterbi = exports.backward = exports.forward = exports.initializeHMM = exports.extractFeatures = exports.trainHMM = exports.detectRegime = void 0;
	var detectRegime_1 = require_detectRegime();
	Object.defineProperty(exports, "detectRegime", {
		enumerable: true,
		get: function() {
			return detectRegime_1.detectRegime;
		}
	});
	var trainHMM_1 = require_trainHMM();
	Object.defineProperty(exports, "trainHMM", {
		enumerable: true,
		get: function() {
			return trainHMM_1.trainHMM;
		}
	});
	var extractFeatures_1 = require_extractFeatures();
	Object.defineProperty(exports, "extractFeatures", {
		enumerable: true,
		get: function() {
			return extractFeatures_1.extractFeatures;
		}
	});
	var initializeHMM_1 = require_initializeHMM();
	Object.defineProperty(exports, "initializeHMM", {
		enumerable: true,
		get: function() {
			return initializeHMM_1.initializeHMM;
		}
	});
	var forward_1 = require_forward();
	Object.defineProperty(exports, "forward", {
		enumerable: true,
		get: function() {
			return forward_1.forward;
		}
	});
	var backward_1 = require_backward();
	Object.defineProperty(exports, "backward", {
		enumerable: true,
		get: function() {
			return backward_1.backward;
		}
	});
	var viterbi_1 = require_viterbi();
	Object.defineProperty(exports, "viterbi", {
		enumerable: true,
		get: function() {
			return viterbi_1.viterbi;
		}
	});
	var baumWelch_1 = require_baumWelch();
	Object.defineProperty(exports, "baumWelch", {
		enumerable: true,
		get: function() {
			return baumWelch_1.baumWelch;
		}
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/ml/utils/index.js
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Machine Learning Utility Functions
	*
	* Reusable utilities for ML algorithms
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateNumStates = exports.validateHMMParameters = exports.validateFeatureMatrix = exports.validatePriceArray = exports.logMultivariateGaussianPDF = exports.multivariateGaussianPDF = exports.standardize = exports.calculateVariance = exports.calculateMean = exports.logGaussianPDF = exports.gaussianPDF = exports.addNoise = exports.normalizeArray = exports.normalizeRows = exports.logSumExp = void 0;
	var matrixUtils_1 = require_matrixUtils();
	Object.defineProperty(exports, "logSumExp", {
		enumerable: true,
		get: function() {
			return matrixUtils_1.logSumExp;
		}
	});
	Object.defineProperty(exports, "normalizeRows", {
		enumerable: true,
		get: function() {
			return matrixUtils_1.normalizeRows;
		}
	});
	Object.defineProperty(exports, "normalizeArray", {
		enumerable: true,
		get: function() {
			return matrixUtils_1.normalizeArray;
		}
	});
	Object.defineProperty(exports, "addNoise", {
		enumerable: true,
		get: function() {
			return matrixUtils_1.addNoise;
		}
	});
	var statisticsUtils_1 = require_statisticsUtils();
	Object.defineProperty(exports, "gaussianPDF", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.gaussianPDF;
		}
	});
	Object.defineProperty(exports, "logGaussianPDF", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.logGaussianPDF;
		}
	});
	Object.defineProperty(exports, "calculateMean", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.calculateMean;
		}
	});
	Object.defineProperty(exports, "calculateVariance", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.calculateVariance;
		}
	});
	Object.defineProperty(exports, "standardize", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.standardize;
		}
	});
	Object.defineProperty(exports, "multivariateGaussianPDF", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.multivariateGaussianPDF;
		}
	});
	Object.defineProperty(exports, "logMultivariateGaussianPDF", {
		enumerable: true,
		get: function() {
			return statisticsUtils_1.logMultivariateGaussianPDF;
		}
	});
	var validationUtils_1 = require_validationUtils();
	Object.defineProperty(exports, "validatePriceArray", {
		enumerable: true,
		get: function() {
			return validationUtils_1.validatePriceArray;
		}
	});
	Object.defineProperty(exports, "validateFeatureMatrix", {
		enumerable: true,
		get: function() {
			return validationUtils_1.validateFeatureMatrix;
		}
	});
	Object.defineProperty(exports, "validateHMMParameters", {
		enumerable: true,
		get: function() {
			return validationUtils_1.validateHMMParameters;
		}
	});
	Object.defineProperty(exports, "validateNumStates", {
		enumerable: true,
		get: function() {
			return validationUtils_1.validateNumStates;
		}
	});
}));
//#endregion
//#region node_modules/@railpath/finance-toolkit/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.vectorSubtract = exports.vectorAdd = exports.vectorNorm = exports.solveQuadraticProgram = exports.inverseErf = exports.getZScore = exports.calculateTrackingError = exports.calculateInformationRatio = exports.calculateRiskMetrics = exports.calculateReturns = exports.calculateEqualWeightPortfolio = exports.calculatePortfolioRebalancing = exports.calculatePortfolioOptimization = exports.calculatePerformanceAttribution = exports.calculatePortfolioMetrics = exports.calculateMoneyWeightedReturn = exports.calculateTimeWeightedReturn = exports.calculateVolatility = exports.calculateVaR99 = exports.calculateVaR95 = exports.calculateVaR = exports.calculateStandardDeviation = exports.calculateSortinoRatio = exports.calculateSkewness = exports.calculateSharpeRatio = exports.calculateSemideviation = exports.calculatePortfolioVolatility = exports.calculateParkinsonVolatility = exports.calculateParametricVaR = exports.calculateParametricExpectedShortfall = exports.calculateMonteCarloVaR = exports.calculateMaxDrawdown = exports.calculateKurtosis = exports.calculateHistoricalVaR = exports.calculateHistoricalExpectedShortfall = exports.calculateGarmanKlassVolatility = exports.calculateEWMAVolatility = exports.calculateCovarianceMatrix = exports.calculateCorrelationMatrix = exports.calculateCalmarRatio = exports.calculateBeta = exports.calculateAlpha = exports.calculateATR = exports.calculateBollingerBands = exports.calculateWilliamsR = exports.calculateStochastic = exports.calculateRSI = exports.calculateMACD = exports.calculateEMA = exports.calculateSMA = void 0;
	exports.standardize = exports.calculateVariance = exports.calculateMean = exports.logGaussianPDF = exports.gaussianPDF = exports.addNoise = exports.normalizeArray = exports.normalizeRows = exports.logSumExp = exports.baumWelch = exports.viterbi = exports.backward = exports.forward = exports.initializeHMM = exports.extractFeatures = exports.trainHMM = exports.detectRegime = exports.isSolutionFeasible = exports.calculateInequalityConstraintViolation = exports.calculateEqualityConstraintViolation = exports.projectGradientOntoNonNegativityConstraints = exports.projectGradientOntoEqualityConstraints = exports.projectOntoSimplex = exports.projectOntoBoxConstraints = exports.projectOntoNonNegativityConstraints = exports.projectOntoEqualityConstraints = exports.matrixConditionNumber = exports.isMatrixInvertible = exports.luDecomposition = exports.matrixDeterminant = exports.solveMultipleLinearSystems = exports.solveLinearSystem = exports.matrixFrobeniusNorm = exports.matrixDiagonal = exports.createZeroMatrix = exports.createIdentityMatrix = exports.isMatrixPositiveDefinite = exports.isMatrixSymmetric = exports.matrixTrace = exports.matrixMatrixMultiply = exports.matrixTranspose = exports.matrixVectorMultiply = exports.createConstantVector = exports.createZeroVector = exports.vectorEquals = exports.vectorDistance = exports.vectorNormalize = exports.vectorCross = exports.vectorDot = exports.vectorScale = void 0;
	exports.validateNumStates = exports.validateHMMParameters = exports.validateFeatureMatrix = exports.validatePriceArray = exports.logMultivariateGaussianPDF = exports.multivariateGaussianPDF = void 0;
	var calculateSMA_1 = require_calculateSMA();
	Object.defineProperty(exports, "calculateSMA", {
		enumerable: true,
		get: function() {
			return calculateSMA_1.calculateSMA;
		}
	});
	var calculateEMA_1 = require_calculateEMA();
	Object.defineProperty(exports, "calculateEMA", {
		enumerable: true,
		get: function() {
			return calculateEMA_1.calculateEMA;
		}
	});
	var calculateMACD_1 = require_calculateMACD();
	Object.defineProperty(exports, "calculateMACD", {
		enumerable: true,
		get: function() {
			return calculateMACD_1.calculateMACD;
		}
	});
	var calculateRSI_1 = require_calculateRSI();
	Object.defineProperty(exports, "calculateRSI", {
		enumerable: true,
		get: function() {
			return calculateRSI_1.calculateRSI;
		}
	});
	var calculateStochastic_1 = require_calculateStochastic();
	Object.defineProperty(exports, "calculateStochastic", {
		enumerable: true,
		get: function() {
			return calculateStochastic_1.calculateStochastic;
		}
	});
	var calculateWilliamsR_1 = require_calculateWilliamsR();
	Object.defineProperty(exports, "calculateWilliamsR", {
		enumerable: true,
		get: function() {
			return calculateWilliamsR_1.calculateWilliamsR;
		}
	});
	var calculateBollingerBands_1 = require_calculateBollingerBands();
	Object.defineProperty(exports, "calculateBollingerBands", {
		enumerable: true,
		get: function() {
			return calculateBollingerBands_1.calculateBollingerBands;
		}
	});
	var calculateATR_1 = require_calculateATR();
	Object.defineProperty(exports, "calculateATR", {
		enumerable: true,
		get: function() {
			return calculateATR_1.calculateATR;
		}
	});
	var calculateAlpha_1 = require_calculateAlpha();
	Object.defineProperty(exports, "calculateAlpha", {
		enumerable: true,
		get: function() {
			return calculateAlpha_1.calculateAlpha;
		}
	});
	var calculateBeta_1 = require_calculateBeta();
	Object.defineProperty(exports, "calculateBeta", {
		enumerable: true,
		get: function() {
			return calculateBeta_1.calculateBeta;
		}
	});
	var calculateCalmarRatio_1 = require_calculateCalmarRatio();
	Object.defineProperty(exports, "calculateCalmarRatio", {
		enumerable: true,
		get: function() {
			return calculateCalmarRatio_1.calculateCalmarRatio;
		}
	});
	var calculateCorrelationMatrix_1 = require_calculateCorrelationMatrix();
	Object.defineProperty(exports, "calculateCorrelationMatrix", {
		enumerable: true,
		get: function() {
			return calculateCorrelationMatrix_1.calculateCorrelationMatrix;
		}
	});
	var calculateCovarianceMatrix_1 = require_calculateCovarianceMatrix();
	Object.defineProperty(exports, "calculateCovarianceMatrix", {
		enumerable: true,
		get: function() {
			return calculateCovarianceMatrix_1.calculateCovarianceMatrix;
		}
	});
	var calculateEWMAVolatility_1 = require_calculateEWMAVolatility();
	Object.defineProperty(exports, "calculateEWMAVolatility", {
		enumerable: true,
		get: function() {
			return calculateEWMAVolatility_1.calculateEWMAVolatility;
		}
	});
	var calculateGarmanKlassVolatility_1 = require_calculateGarmanKlassVolatility();
	Object.defineProperty(exports, "calculateGarmanKlassVolatility", {
		enumerable: true,
		get: function() {
			return calculateGarmanKlassVolatility_1.calculateGarmanKlassVolatility;
		}
	});
	var calculateHistoricalExpectedShortfall_1 = require_calculateHistoricalExpectedShortfall();
	Object.defineProperty(exports, "calculateHistoricalExpectedShortfall", {
		enumerable: true,
		get: function() {
			return calculateHistoricalExpectedShortfall_1.calculateHistoricalExpectedShortfall;
		}
	});
	var calculateHistoricalVaR_1 = require_calculateHistoricalVaR();
	Object.defineProperty(exports, "calculateHistoricalVaR", {
		enumerable: true,
		get: function() {
			return calculateHistoricalVaR_1.calculateHistoricalVaR;
		}
	});
	var calculateKurtosis_1 = require_calculateKurtosis();
	Object.defineProperty(exports, "calculateKurtosis", {
		enumerable: true,
		get: function() {
			return calculateKurtosis_1.calculateKurtosis;
		}
	});
	var calculateMaxDrawdown_1 = require_calculateMaxDrawdown();
	Object.defineProperty(exports, "calculateMaxDrawdown", {
		enumerable: true,
		get: function() {
			return calculateMaxDrawdown_1.calculateMaxDrawdown;
		}
	});
	var calculateMonteCarloVaR_1 = require_calculateMonteCarloVaR();
	Object.defineProperty(exports, "calculateMonteCarloVaR", {
		enumerable: true,
		get: function() {
			return calculateMonteCarloVaR_1.calculateMonteCarloVaR;
		}
	});
	var calculateParametricExpectedShortfall_1 = require_calculateParametricExpectedShortfall();
	Object.defineProperty(exports, "calculateParametricExpectedShortfall", {
		enumerable: true,
		get: function() {
			return calculateParametricExpectedShortfall_1.calculateParametricExpectedShortfall;
		}
	});
	var calculateParametricVaR_1 = require_calculateParametricVaR();
	Object.defineProperty(exports, "calculateParametricVaR", {
		enumerable: true,
		get: function() {
			return calculateParametricVaR_1.calculateParametricVaR;
		}
	});
	var calculateParkinsonVolatility_1 = require_calculateParkinsonVolatility();
	Object.defineProperty(exports, "calculateParkinsonVolatility", {
		enumerable: true,
		get: function() {
			return calculateParkinsonVolatility_1.calculateParkinsonVolatility;
		}
	});
	var calculatePortfolioVolatility_1 = require_calculatePortfolioVolatility();
	Object.defineProperty(exports, "calculatePortfolioVolatility", {
		enumerable: true,
		get: function() {
			return calculatePortfolioVolatility_1.calculatePortfolioVolatility;
		}
	});
	var calculateSemideviation_1 = require_calculateSemideviation();
	Object.defineProperty(exports, "calculateSemideviation", {
		enumerable: true,
		get: function() {
			return calculateSemideviation_1.calculateSemideviation;
		}
	});
	var calculateSharpeRatio_1 = require_calculateSharpeRatio();
	Object.defineProperty(exports, "calculateSharpeRatio", {
		enumerable: true,
		get: function() {
			return calculateSharpeRatio_1.calculateSharpeRatio;
		}
	});
	var calculateSkewness_1 = require_calculateSkewness();
	Object.defineProperty(exports, "calculateSkewness", {
		enumerable: true,
		get: function() {
			return calculateSkewness_1.calculateSkewness;
		}
	});
	var calculateSortinoRatio_1 = require_calculateSortinoRatio();
	Object.defineProperty(exports, "calculateSortinoRatio", {
		enumerable: true,
		get: function() {
			return calculateSortinoRatio_1.calculateSortinoRatio;
		}
	});
	var calculateStandardDeviation_1 = require_calculateStandardDeviation();
	Object.defineProperty(exports, "calculateStandardDeviation", {
		enumerable: true,
		get: function() {
			return calculateStandardDeviation_1.calculateStandardDeviation;
		}
	});
	var calculateVaR_1 = require_calculateVaR();
	Object.defineProperty(exports, "calculateVaR", {
		enumerable: true,
		get: function() {
			return calculateVaR_1.calculateVaR;
		}
	});
	var calculateVaR95_1 = require_calculateVaR95();
	Object.defineProperty(exports, "calculateVaR95", {
		enumerable: true,
		get: function() {
			return calculateVaR95_1.calculateVaR95;
		}
	});
	var calculateVaR99_1 = require_calculateVaR99();
	Object.defineProperty(exports, "calculateVaR99", {
		enumerable: true,
		get: function() {
			return calculateVaR99_1.calculateVaR99;
		}
	});
	var calculateVolatility_1 = require_calculateVolatility();
	Object.defineProperty(exports, "calculateVolatility", {
		enumerable: true,
		get: function() {
			return calculateVolatility_1.calculateVolatility;
		}
	});
	var calculateTimeWeightedReturn_1 = require_calculateTimeWeightedReturn();
	Object.defineProperty(exports, "calculateTimeWeightedReturn", {
		enumerable: true,
		get: function() {
			return calculateTimeWeightedReturn_1.calculateTimeWeightedReturn;
		}
	});
	var calculateMoneyWeightedReturn_1 = require_calculateMoneyWeightedReturn();
	Object.defineProperty(exports, "calculateMoneyWeightedReturn", {
		enumerable: true,
		get: function() {
			return calculateMoneyWeightedReturn_1.calculateMoneyWeightedReturn;
		}
	});
	var calculatePortfolioMetrics_1 = require_calculatePortfolioMetrics();
	Object.defineProperty(exports, "calculatePortfolioMetrics", {
		enumerable: true,
		get: function() {
			return calculatePortfolioMetrics_1.calculatePortfolioMetrics;
		}
	});
	var calculatePerformanceAttribution_1 = require_calculatePerformanceAttribution();
	Object.defineProperty(exports, "calculatePerformanceAttribution", {
		enumerable: true,
		get: function() {
			return calculatePerformanceAttribution_1.calculatePerformanceAttribution;
		}
	});
	var calculatePortfolioOptimization_1 = require_calculatePortfolioOptimization();
	Object.defineProperty(exports, "calculatePortfolioOptimization", {
		enumerable: true,
		get: function() {
			return calculatePortfolioOptimization_1.calculatePortfolioOptimization;
		}
	});
	var calculatePortfolioRebalancing_1 = require_calculatePortfolioRebalancing();
	Object.defineProperty(exports, "calculatePortfolioRebalancing", {
		enumerable: true,
		get: function() {
			return calculatePortfolioRebalancing_1.calculatePortfolioRebalancing;
		}
	});
	var calculateEqualWeightPortfolio_1 = require_calculateEqualWeightPortfolio();
	Object.defineProperty(exports, "calculateEqualWeightPortfolio", {
		enumerable: true,
		get: function() {
			return calculateEqualWeightPortfolio_1.calculateEqualWeightPortfolio;
		}
	});
	var calculateReturns_1 = require_calculateReturns();
	Object.defineProperty(exports, "calculateReturns", {
		enumerable: true,
		get: function() {
			return calculateReturns_1.calculateReturns;
		}
	});
	var calculateRiskMetrics_1 = require_calculateRiskMetrics();
	Object.defineProperty(exports, "calculateRiskMetrics", {
		enumerable: true,
		get: function() {
			return calculateRiskMetrics_1.calculateRiskMetrics;
		}
	});
	var calculateInformationRatio_1 = require_calculateInformationRatio();
	Object.defineProperty(exports, "calculateInformationRatio", {
		enumerable: true,
		get: function() {
			return calculateInformationRatio_1.calculateInformationRatio;
		}
	});
	var calculateTrackingError_1 = require_calculateTrackingError();
	Object.defineProperty(exports, "calculateTrackingError", {
		enumerable: true,
		get: function() {
			return calculateTrackingError_1.calculateTrackingError;
		}
	});
	var getZScore_1 = require_getZScore();
	Object.defineProperty(exports, "getZScore", {
		enumerable: true,
		get: function() {
			return getZScore_1.getZScore;
		}
	});
	var inverseErf_1 = require_inverseErf();
	Object.defineProperty(exports, "inverseErf", {
		enumerable: true,
		get: function() {
			return inverseErf_1.inverseErf;
		}
	});
	var solveQuadraticProgram_1 = require_solveQuadraticProgram();
	Object.defineProperty(exports, "solveQuadraticProgram", {
		enumerable: true,
		get: function() {
			return solveQuadraticProgram_1.solveQuadraticProgram;
		}
	});
	var vectorOperations_1 = require_vectorOperations();
	Object.defineProperty(exports, "vectorNorm", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorNorm;
		}
	});
	Object.defineProperty(exports, "vectorAdd", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorAdd;
		}
	});
	Object.defineProperty(exports, "vectorSubtract", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorSubtract;
		}
	});
	Object.defineProperty(exports, "vectorScale", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorScale;
		}
	});
	Object.defineProperty(exports, "vectorDot", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorDot;
		}
	});
	Object.defineProperty(exports, "vectorCross", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorCross;
		}
	});
	Object.defineProperty(exports, "vectorNormalize", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorNormalize;
		}
	});
	Object.defineProperty(exports, "vectorDistance", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorDistance;
		}
	});
	Object.defineProperty(exports, "vectorEquals", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.vectorEquals;
		}
	});
	Object.defineProperty(exports, "createZeroVector", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.createZeroVector;
		}
	});
	Object.defineProperty(exports, "createConstantVector", {
		enumerable: true,
		get: function() {
			return vectorOperations_1.createConstantVector;
		}
	});
	var matrixOperations_1 = require_matrixOperations();
	Object.defineProperty(exports, "matrixVectorMultiply", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixVectorMultiply;
		}
	});
	Object.defineProperty(exports, "matrixTranspose", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixTranspose;
		}
	});
	Object.defineProperty(exports, "matrixMatrixMultiply", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixMatrixMultiply;
		}
	});
	Object.defineProperty(exports, "matrixTrace", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixTrace;
		}
	});
	Object.defineProperty(exports, "isMatrixSymmetric", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.isMatrixSymmetric;
		}
	});
	Object.defineProperty(exports, "isMatrixPositiveDefinite", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.isMatrixPositiveDefinite;
		}
	});
	Object.defineProperty(exports, "createIdentityMatrix", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.createIdentityMatrix;
		}
	});
	Object.defineProperty(exports, "createZeroMatrix", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.createZeroMatrix;
		}
	});
	Object.defineProperty(exports, "matrixDiagonal", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixDiagonal;
		}
	});
	Object.defineProperty(exports, "matrixFrobeniusNorm", {
		enumerable: true,
		get: function() {
			return matrixOperations_1.matrixFrobeniusNorm;
		}
	});
	var linearSystemSolver_1 = require_linearSystemSolver();
	Object.defineProperty(exports, "solveLinearSystem", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.solveLinearSystem;
		}
	});
	Object.defineProperty(exports, "solveMultipleLinearSystems", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.solveMultipleLinearSystems;
		}
	});
	Object.defineProperty(exports, "matrixDeterminant", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.matrixDeterminant;
		}
	});
	Object.defineProperty(exports, "luDecomposition", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.luDecomposition;
		}
	});
	Object.defineProperty(exports, "isMatrixInvertible", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.isMatrixInvertible;
		}
	});
	Object.defineProperty(exports, "matrixConditionNumber", {
		enumerable: true,
		get: function() {
			return linearSystemSolver_1.matrixConditionNumber;
		}
	});
	var constraintProjection_1 = require_constraintProjection();
	Object.defineProperty(exports, "projectOntoEqualityConstraints", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectOntoEqualityConstraints;
		}
	});
	Object.defineProperty(exports, "projectOntoNonNegativityConstraints", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectOntoNonNegativityConstraints;
		}
	});
	Object.defineProperty(exports, "projectOntoBoxConstraints", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectOntoBoxConstraints;
		}
	});
	Object.defineProperty(exports, "projectOntoSimplex", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectOntoSimplex;
		}
	});
	Object.defineProperty(exports, "projectGradientOntoEqualityConstraints", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectGradientOntoEqualityConstraints;
		}
	});
	Object.defineProperty(exports, "projectGradientOntoNonNegativityConstraints", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.projectGradientOntoNonNegativityConstraints;
		}
	});
	Object.defineProperty(exports, "calculateEqualityConstraintViolation", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.calculateEqualityConstraintViolation;
		}
	});
	Object.defineProperty(exports, "calculateInequalityConstraintViolation", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.calculateInequalityConstraintViolation;
		}
	});
	Object.defineProperty(exports, "isSolutionFeasible", {
		enumerable: true,
		get: function() {
			return constraintProjection_1.isSolutionFeasible;
		}
	});
	var detectRegime_1 = require_detectRegime();
	Object.defineProperty(exports, "detectRegime", {
		enumerable: true,
		get: function() {
			return detectRegime_1.detectRegime;
		}
	});
	var hmm_1 = require_hmm();
	Object.defineProperty(exports, "trainHMM", {
		enumerable: true,
		get: function() {
			return hmm_1.trainHMM;
		}
	});
	Object.defineProperty(exports, "extractFeatures", {
		enumerable: true,
		get: function() {
			return hmm_1.extractFeatures;
		}
	});
	Object.defineProperty(exports, "initializeHMM", {
		enumerable: true,
		get: function() {
			return hmm_1.initializeHMM;
		}
	});
	Object.defineProperty(exports, "forward", {
		enumerable: true,
		get: function() {
			return hmm_1.forward;
		}
	});
	Object.defineProperty(exports, "backward", {
		enumerable: true,
		get: function() {
			return hmm_1.backward;
		}
	});
	Object.defineProperty(exports, "viterbi", {
		enumerable: true,
		get: function() {
			return hmm_1.viterbi;
		}
	});
	Object.defineProperty(exports, "baumWelch", {
		enumerable: true,
		get: function() {
			return hmm_1.baumWelch;
		}
	});
	var utils_1 = require_utils();
	Object.defineProperty(exports, "logSumExp", {
		enumerable: true,
		get: function() {
			return utils_1.logSumExp;
		}
	});
	Object.defineProperty(exports, "normalizeRows", {
		enumerable: true,
		get: function() {
			return utils_1.normalizeRows;
		}
	});
	Object.defineProperty(exports, "normalizeArray", {
		enumerable: true,
		get: function() {
			return utils_1.normalizeArray;
		}
	});
	Object.defineProperty(exports, "addNoise", {
		enumerable: true,
		get: function() {
			return utils_1.addNoise;
		}
	});
	Object.defineProperty(exports, "gaussianPDF", {
		enumerable: true,
		get: function() {
			return utils_1.gaussianPDF;
		}
	});
	Object.defineProperty(exports, "logGaussianPDF", {
		enumerable: true,
		get: function() {
			return utils_1.logGaussianPDF;
		}
	});
	Object.defineProperty(exports, "calculateMean", {
		enumerable: true,
		get: function() {
			return utils_1.calculateMean;
		}
	});
	Object.defineProperty(exports, "calculateVariance", {
		enumerable: true,
		get: function() {
			return utils_1.calculateVariance;
		}
	});
	Object.defineProperty(exports, "standardize", {
		enumerable: true,
		get: function() {
			return utils_1.standardize;
		}
	});
	Object.defineProperty(exports, "multivariateGaussianPDF", {
		enumerable: true,
		get: function() {
			return utils_1.multivariateGaussianPDF;
		}
	});
	Object.defineProperty(exports, "logMultivariateGaussianPDF", {
		enumerable: true,
		get: function() {
			return utils_1.logMultivariateGaussianPDF;
		}
	});
	Object.defineProperty(exports, "validatePriceArray", {
		enumerable: true,
		get: function() {
			return utils_1.validatePriceArray;
		}
	});
	Object.defineProperty(exports, "validateFeatureMatrix", {
		enumerable: true,
		get: function() {
			return utils_1.validateFeatureMatrix;
		}
	});
	Object.defineProperty(exports, "validateHMMParameters", {
		enumerable: true,
		get: function() {
			return utils_1.validateHMMParameters;
		}
	});
	Object.defineProperty(exports, "validateNumStates", {
		enumerable: true,
		get: function() {
			return utils_1.validateNumStates;
		}
	});
}));
//#endregion
export { require_dist as t };
