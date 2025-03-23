/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/BaseComponent.js":
/*!*****************************************!*\
  !*** ./src/components/BaseComponent.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BaseComponent)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseComponent = /*#__PURE__*/function () {
  function BaseComponent(template, parentElement) {
    _classCallCheck(this, BaseComponent);
    this.template = template;
    this.parentElement = parentElement;
    this.listeners = [];
  }
  return _createClass(BaseComponent, [{
    key: "render",
    value: function render() {
      if (this.parentElement.innerHTML == '') {
        this.parentElement.innerHTML = this.template;
        this.attachListeners();
        return;
      }
      this.parentElement.insertAdjacentHTML('beforeend', this.template);
      this.attachListeners();
    }
  }, {
    key: "getRenderedComponent",
    value: function getRenderedComponent() {
      return this.parentElement.innerHTML;
    }
  }, {
    key: "addListener",
    value: function addListener(eventType, selector, callback) {
      this.listeners.push({
        eventType: eventType,
        selector: selector,
        callback: callback
      });
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      var _this = this;
      this.listeners.forEach(function (listener) {
        _this.parentElement.querySelector(listener.selector).removeEventListener(listener.eventType, listener.callback);
      });
      this.listeners = [];
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this2 = this;
      this.listeners.forEach(function (listener) {
        var element = _this2.parentElement.querySelector(listener.selector);
        if (element) {
          element.addEventListener(listener.eventType, listener.callback);
        }
      });
    }
  }]);
}();


/***/ }),

/***/ "./src/components/Store.js":
/*!*********************************!*\
  !*** ./src/components/Store.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Класс хранилища (Store) реализует паттерн Singleton для управления состоянием приложения.
 */
var Store = /*#__PURE__*/function () {
  /**
   * Создаёт экземпляр хранилища или возвращает уже существующий.
   */
  function Store() {
    _classCallCheck(this, Store);
    if (Store.instance) {
      return Store.instance;
    }
    this.state = {};
    this.listeners = {};
    Store.instance = this;
  }

  /**
   * Устанавливает значение состояния и уведомляет подписчиков.
   * @param {string} key - Ключ состояния.
   * @param {*} value - Значение состояния.
   */
  return _createClass(Store, [{
    key: "setState",
    value: function setState(key, value) {
      this.state[key] = value;
      this.notify(key);
    }

    /**
     * Получает значение состояния по ключу.
     * @param {string} key - Ключ состояния.
     * @returns {*} Значение состояния.
     */
  }, {
    key: "getState",
    value: function getState(key) {
      return this.state[key];
    }

    /**
     * Подписывает коллбэк на изменение состояния по указанному ключу.
     * @param {string} key - Ключ состояния.
     * @param {Function} callback - Функция-обработчик изменений.
     */
  }, {
    key: "subscribe",
    value: function subscribe(key, callback) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(callback);
    }

    /**
     * Уведомляет всех подписчиков о изменении состояния по ключу.
     * @param {string} key - Ключ состояния.
     */
  }, {
    key: "notify",
    value: function notify(key) {
      var _this = this;
      if (this.listeners[key]) {
        this.listeners[key].forEach(function (callback) {
          return callback(_this.state[key]);
        });
      }
    }
  }]);
}();
/**
 * Экземпляр хранилища.
 * @constant {Store}
 */
var store = new Store();
store.setState('notif_layer', document.getElementById('notif_layer'));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./src/components/compound/authCard/authCard.js":
/*!******************************************************!*\
  !*** ./src/components/compound/authCard/authCard.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthCard)
/* harmony export */ });
/* harmony import */ var _pattern_formCard_formCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/formCard/formCard.js */ "./src/components/pattern/formCard/formCard.js");
/* harmony import */ var _simple_progressBar_progressBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simple/progressBar/progressBar.js */ "./src/components/simple/progressBar/progressBar.js");
/* harmony import */ var _simple_loginInput_loginInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../simple/loginInput/loginInput.js */ "./src/components/simple/loginInput/loginInput.js");
/* harmony import */ var _simple_passwordInput_passwordInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../simple/passwordInput/passwordInput.js */ "./src/components/simple/passwordInput/passwordInput.js");
/* harmony import */ var _simple_linkToLogin_linkToLogin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../simple/linkToLogin/linkToLogin.js */ "./src/components/simple/linkToLogin/linkToLogin.js");
/* harmony import */ var _simple_authButton_authButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../simple/authButton/authButton.js */ "./src/components/simple/authButton/authButton.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







// Подтягивать из стора
var AuthCard = /*#__PURE__*/function (_FormCard) {
  function AuthCard(parentElement) {
    var _this;
    _classCallCheck(this, AuthCard);
    var componentConfigs = [{
      key: 'progressBar',
      "class": _simple_progressBar_progressBar_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      options: {
        progressPercent: 100
      }
    }, {
      key: 'linkToPage',
      "class": _simple_linkToLogin_linkToLogin_js__WEBPACK_IMPORTED_MODULE_4__["default"]
    }, {
      key: 'loginInput',
      "class": _simple_loginInput_loginInput_js__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
      key: 'passwordInput',
      "class": _simple_passwordInput_passwordInput_js__WEBPACK_IMPORTED_MODULE_3__["default"]
    }, {
      key: 'authButton',
      "class": _simple_authButton_authButton_js__WEBPACK_IMPORTED_MODULE_5__["default"]
    }];
    var components = {};
    for (var _i = 0, _componentConfigs = componentConfigs; _i < _componentConfigs.length; _i++) {
      var _componentConfigs$_i = _componentConfigs[_i],
        key = _componentConfigs$_i.key,
        ComponentClass = _componentConfigs$_i["class"],
        options = _componentConfigs$_i.options;
      components[key] = new ComponentClass(parentElement, options);
    }
    _this = _callSuper(this, AuthCard, [parentElement, {
      progressBar: components.progressBar.template,
      cardTitle: 'Продолжи свой поиск ❤️',
      linkToPage: components.linkToPage.template,
      fields: [components.loginInput.template, components.passwordInput.template],
      button: components.authButton.template
    }]);
    _this.components = components;
    return _this;
  }
  _inherits(AuthCard, _FormCard);
  return _createClass(AuthCard, [{
    key: "render",
    value: function render() {
      _superPropGet(AuthCard, "render", this, 3)([]);
      Object.values(this.components).forEach(function (component) {
        return component.attachListeners();
      });
    }
  }]);
}(_pattern_formCard_formCard_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/compound/headerGreeting/headerGreeting.js":
/*!******************************************************************!*\
  !*** ./src/components/compound/headerGreeting/headerGreeting.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderGreeting)
/* harmony export */ });
/* harmony import */ var _pattern_logo_logo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/logo/logo.js */ "./src/components/pattern/logo/logo.js");
/* harmony import */ var _pattern_header_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pattern/header/header.js */ "./src/components/pattern/header/header.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var HeaderGreeting = /*#__PURE__*/function (_Header) {
  function HeaderGreeting(parentElement) {
    _classCallCheck(this, HeaderGreeting);
    var DEFAULT_COMPONENTS = {
      logotype: new _pattern_logo_logo_js__WEBPACK_IMPORTED_MODULE_0__["default"](parentElement).template,
      profile: '',
      isGreeting: true
    };
    return _callSuper(this, HeaderGreeting, [parentElement, DEFAULT_COMPONENTS]);
  }
  _inherits(HeaderGreeting, _Header);
  return _createClass(HeaderGreeting);
}(_pattern_header_header_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/components/compound/headerMain/headerMain.js":
/*!**********************************************************!*\
  !*** ./src/components/compound/headerMain/headerMain.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderMain)
/* harmony export */ });
/* harmony import */ var _simple_logoMain_logoMain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simple/logoMain/logoMain.js */ "./src/components/simple/logoMain/logoMain.js");
/* harmony import */ var _simple_profile_profile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simple/profile/profile.js */ "./src/components/simple/profile/profile.js");
/* harmony import */ var _pattern_header_header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pattern/header/header.js */ "./src/components/pattern/header/header.js");
/* harmony import */ var _simple_logoutButton_logoutButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../simple/logoutButton/logoutButton.js */ "./src/components/simple/logoutButton/logoutButton.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





var HeaderMain = /*#__PURE__*/function (_Header) {
  function HeaderMain(parentElement) {
    var _this;
    _classCallCheck(this, HeaderMain);
    console.log(_Store_js__WEBPACK_IMPORTED_MODULE_4__["default"].getState("myID"));
    var componentConfigs = [{
      key: 'logotype',
      "class": _simple_logoMain_logoMain_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    }, {
      key: 'logoutSessionBtn',
      "class": _simple_logoutButton_logoutButton_js__WEBPACK_IMPORTED_MODULE_3__["default"]
    }, {
      key: 'profile',
      "class": _simple_profile_profile_js__WEBPACK_IMPORTED_MODULE_1__["default"]
    }];
    var components = {};
    for (var _i = 0, _componentConfigs = componentConfigs; _i < _componentConfigs.length; _i++) {
      var _componentConfigs$_i = _componentConfigs[_i],
        key = _componentConfigs$_i.key,
        ComponentClass = _componentConfigs$_i["class"],
        options = _componentConfigs$_i.options;
      components[key] = new ComponentClass(parentElement, options);
    }
    _this = _callSuper(this, HeaderMain, [parentElement, {
      logotype: components.logotype.template,
      logoutSessionBtn: components.logoutSessionBtn.template,
      profile: components.profile.template,
      isGreeting: false
    }]);
    _this.components = components;
    return _this;
  }
  _inherits(HeaderMain, _Header);
  return _createClass(HeaderMain, [{
    key: "render",
    value: function render() {
      _superPropGet(HeaderMain, "render", this, 3)([]);
      Object.values(this.components).forEach(function (component) {
        var _component$attachList;
        return (_component$attachList = component.attachListeners) === null || _component$attachList === void 0 ? void 0 : _component$attachList.call(component);
      });
    }
  }]);
}(_pattern_header_header_js__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./src/components/compound/loginCard/loginCard.js":
/*!********************************************************!*\
  !*** ./src/components/compound/loginCard/loginCard.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginCard)
/* harmony export */ });
/* harmony import */ var _pattern_formCard_formCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/formCard/formCard.js */ "./src/components/pattern/formCard/formCard.js");
/* harmony import */ var _simple_progressBar_progressBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simple/progressBar/progressBar.js */ "./src/components/simple/progressBar/progressBar.js");
/* harmony import */ var _simple_loginInput_loginInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../simple/loginInput/loginInput.js */ "./src/components/simple/loginInput/loginInput.js");
/* harmony import */ var _simple_passwordInput_passwordInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../simple/passwordInput/passwordInput.js */ "./src/components/simple/passwordInput/passwordInput.js");
/* harmony import */ var _simple_linkToAuth_linkToAuth_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../simple/linkToAuth/linkToAuth.js */ "./src/components/simple/linkToAuth/linkToAuth.js");
/* harmony import */ var _simple_loginButton_loginButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../simple/loginButton/loginButton.js */ "./src/components/simple/loginButton/loginButton.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../modules/validation.js */ "./src/modules/validation.js");
/* harmony import */ var _simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../simple/notification/notification.js */ "./src/components/simple/notification/notification.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }









var LoginCard = /*#__PURE__*/function (_FormCard) {
  function LoginCard(parentElement) {
    var _this;
    _classCallCheck(this, LoginCard);
    var componentConfigs = [{
      key: 'progressBar',
      "class": _simple_progressBar_progressBar_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      options: {
        progressPercent: 0
      }
    }, {
      key: 'linkToPage',
      "class": _simple_linkToAuth_linkToAuth_js__WEBPACK_IMPORTED_MODULE_4__["default"]
    }, {
      key: 'loginInput',
      "class": _simple_loginInput_loginInput_js__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
      key: 'passwordInput',
      "class": _simple_passwordInput_passwordInput_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      options: {
        typeInput: 'password',
        nameInput: 'password',
        idInput: 'passwordInput_01',
        labelText: 'Пароль',
        autocompleteInput: 'new-password',
        listenInput: {
          eventType: 'input',
          selector: '#passwordInput_01',
          callback: function callback(event) {
            if (_Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].getState('passwordInput') != event.target.value) {
              event.target.parentElement.nextElementSibling.classList.remove('incorrect');
              event.target.parentElement.classList.remove('incorrect');
            }
            _Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].setState('passwordInput', event.target.value);
          }
        },
        listenFocus: {
          eventType: 'blur',
          selector: '#passwordInput_01',
          callback: function callback() {
            var passwordValue = _Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].getState('passwordInput');
            var passwordElement = document.querySelectorAll('.inputContainer')[1];
            var passwordValidation = (0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_7__.validator)(passwordValue, _modules_validation_js__WEBPACK_IMPORTED_MODULE_7__.PASSWORD_BRIEF_RULES);
            if (!passwordValidation.isOK && passwordValue != '') {
              var error = new _simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
                isWarning: true,
                isWithButton: true,
                title: passwordValidation.message
              });
              error.render();
              passwordElement.classList.add('incorrect');
            } else {
              passwordElement.classList.remove('incorrect');
            }
          }
        }
      }
    }, {
      key: 'repeatPasswordInput',
      "class": _simple_passwordInput_passwordInput_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      options: {
        nameInput: 'repeatPassword',
        idInput: 'passwordInput_02',
        labelText: 'Повторите пароль',
        autocompleteInput: 'new-password',
        listenInput: {
          eventType: 'input',
          selector: '#passwordInput_02',
          callback: function callback(event) {
            if (_Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].getState('passwordInputAgain') != event.target.value) {
              event.target.parentElement.previousElementSibling.classList.remove('incorrect');
              event.target.parentElement.classList.remove('incorrect');
            }
            _Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].setState('passwordInputAgain', event.target.value);
          }
        },
        listenFocus: {
          eventType: 'blur',
          selector: '#passwordInput_02',
          callback: function callback() {
            var passwordValue = _Store_js__WEBPACK_IMPORTED_MODULE_6__["default"].getState('passwordInputAgain');
            var passwordElement = document.querySelectorAll('.inputContainer')[2];
            var passwordValidation = (0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_7__.validator)(passwordValue, _modules_validation_js__WEBPACK_IMPORTED_MODULE_7__.PASSWORD_BRIEF_RULES);
            if (!passwordValidation.isOK && passwordValue != '') {
              var error = new _simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
                isWarning: true,
                isWithButton: true,
                title: passwordValidation.message
              });
              error.render();
              passwordElement.classList.add('incorrect');
            } else {
              passwordElement.classList.remove('incorrect');
            }
          }
        }
      }
    }, {
      key: 'authButton',
      "class": _simple_loginButton_loginButton_js__WEBPACK_IMPORTED_MODULE_5__["default"]
    }];
    var components = {};
    for (var _i = 0, _componentConfigs = componentConfigs; _i < _componentConfigs.length; _i++) {
      var _componentConfigs$_i = _componentConfigs[_i],
        key = _componentConfigs$_i.key,
        ComponentClass = _componentConfigs$_i["class"],
        _componentConfigs$_i$ = _componentConfigs$_i.options,
        options = _componentConfigs$_i$ === void 0 ? {} : _componentConfigs$_i$;
      components[key] = new ComponentClass(parentElement, options);
    }
    var LOGIN_CARD_PARAMS_CARD = {
      progressBar: components.progressBar.template,
      cardTitle: 'Настроим твой вход 🔑',
      linkToPage: components.linkToPage.template,
      fields: [components.loginInput.template, components.passwordInput.template, components.repeatPasswordInput.template],
      button: components.authButton.template
    };
    _this = _callSuper(this, LoginCard, [parentElement, LOGIN_CARD_PARAMS_CARD]);
    _this.components = components;
    return _this;
  }
  _inherits(LoginCard, _FormCard);
  return _createClass(LoginCard, [{
    key: "render",
    value: function render() {
      _superPropGet(LoginCard, "render", this, 3)([]);
      Object.values(this.components).forEach(function (component) {
        return component.attachListeners();
      });
    }
  }]);
}(_pattern_formCard_formCard_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/compound/peopleCards/peopleCards.js":
/*!************************************************************!*\
  !*** ./src/components/compound/peopleCards/peopleCards.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PeopleCards)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
/* harmony import */ var _personCard_personCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../personCard/personCard.js */ "./src/components/compound/personCard/personCard.js");
/* harmony import */ var _modules_network_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/network.js */ "./src/modules/network.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var currentYear = new Date().getFullYear();
var PeopleCards = /*#__PURE__*/function (_BaseComponent) {
  function PeopleCards(parentElement) {
    var _this;
    _classCallCheck(this, PeopleCards);
    _this = _callSuper(this, PeopleCards, ['', parentElement]);
    _this.currentIndex = 0;
    _this.CARDS = [];
    _this.isDataLoaded = false;
    return _this;
  }
  _inherits(PeopleCards, _BaseComponent);
  return _createClass(PeopleCards, [{
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (this.isDataLoaded) {
                _context.next = 6;
                break;
              }
              _context.next = 3;
              return _modules_network_js__WEBPACK_IMPORTED_MODULE_2__["default"].getProfiles(_Store_js__WEBPACK_IMPORTED_MODULE_3__["default"].getState("myID"));
            case 3:
              response = _context.sent;
              this.CARDS = response.data || [];
              this.isDataLoaded = true;
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadData() {
        return _loadData.apply(this, arguments);
      }
      return loadData;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;
        var _document$getElementB, LISTENERS_ACTION_BTNS;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.currentCard) {
                console.log(this.currentCard, this.parentElement);
                (_document$getElementB = document.getElementById('idPersonCard')) === null || _document$getElementB === void 0 || _document$getElementB.remove();
              }
              _context2.next = 3;
              return this.loadData();
            case 3:
              LISTENERS_ACTION_BTNS = [{
                event: 'click',
                selector: '#dislikeButton',
                callback: function callback() {
                  return _this2.handleDislike();
                }
              }, {
                event: 'click',
                selector: '#likeButton',
                callback: function callback() {
                  return _this2.handleLike();
                }
              }, {
                event: 'click',
                selector: '#repeatButton',
                callback: function callback() {
                  return _this2.handleRepeat();
                }
              }, {
                event: 'click',
                selector: '#starButton',
                callback: function callback() {
                  return _this2.handleStar();
                }
              }, {
                event: 'click',
                selector: '#lightningButton',
                callback: function callback() {
                  return _this2.handleLightning();
                }
              }];
              this.currentCard = new _personCard_personCard_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.parentElement, {
                personName: this.CARDS[this.currentIndex].firstName,
                personAge: currentYear - Number(this.CARDS[this.currentIndex].Birthday.year),
                personDescription: this.CARDS[this.currentIndex].description,
                srcPersonPicture: this.CARDS[this.currentIndex].card !== _modules_network_js__WEBPACK_IMPORTED_MODULE_2__["default"].BASE_URL ? this.CARDS[this.currentIndex].card : ''
              }, LISTENERS_ACTION_BTNS);
              this.currentCard.render();
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function render() {
        return _render.apply(this, arguments);
      }
      return render;
    }()
  }, {
    key: "handleDislike",
    value: function handleDislike() {
      this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
      console.log('Тык дизлайк');
      this.render();
    }
  }, {
    key: "handleLike",
    value: function handleLike() {
      this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
      console.log('Тык лайк');
      this.render();
    }
  }, {
    key: "handleRepeat",
    value: function handleRepeat() {
      console.log('Тык повторить');
    }
  }, {
    key: "handleStar",
    value: function handleStar() {
      console.log('Тык звезда');
    }
  }, {
    key: "handleLightning",
    value: function handleLightning() {
      console.log('Тык молния');
    }
  }]);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]); // const MOCK_PERSON_CARDS = [
// 	{
// 		srcPersonPicture: '/mock/girl.jpg',
// 		personName: 'Катя',
// 		personAge: 19,
// 		personDescription: 'Ого...',
// 	},
// 	{
// 		srcPersonPicture: '/mock/pudg.jpg',
// 		personName: 'Макс',
// 		personAge: 21,
// 		personDescription: 'Люблю путешествовать и играть в игры.',
// 	},
// 	{
// 		srcPersonPicture: '/mock/sofia.jpg',
// 		personName: 'Анна',
// 		personAge: 25,
// 		personDescription: 'Фотографирую закаты и пеку вкусные пироги.',
// 	}
// ];


/***/ }),

/***/ "./src/components/compound/personCard/personCard.js":
/*!**********************************************************!*\
  !*** ./src/components/compound/personCard/personCard.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PersonCard)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_PERSON_CARD = {
  srcPersonPictureError: 'media/error/400x600.jpg',
  srcPersonPicture: '',
  personName: 'Имя',
  personAge: 16,
  personDescription: 'Краткое описание человека...'
};
var PersonCard = /*#__PURE__*/function (_BaseComponent) {
  function PersonCard(parentElement) {
    var _this;
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    _classCallCheck(this, PersonCard);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_PERSON_CARD), paramsHBS);
    var templateHBS = Handlebars.templates['personCard.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    _this = _callSuper(this, PersonCard, [templateHTML, parentElement]);
    _this.callbacks = callbacks;
    return _this;
  }
  _inherits(PersonCard, _BaseComponent);
  return _createClass(PersonCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      _superPropGet(PersonCard, "render", this, 3)([]);
      this.callbacks.forEach(function (callback) {
        _this2.addListener(callback.event, callback.selector, callback.callback);
      });
      this.attachListeners();
    }
  }]);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/button/button.js":
/*!*************************************************!*\
  !*** ./src/components/pattern/button/button.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_BUTTON = {
  idButton: '',
  buttonText: 'Кнопка'
};
DEFAULT_PARAMS_BUTTON.listenButton = {
  eventType: '',
  selector: '',
  callback: function callback() {}
};
var Button = /*#__PURE__*/function (_BaseComponent) {
  function Button(parentElement) {
    var _this;
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Button);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_BUTTON), paramsHBS);
    if (finalParamsHBS.idButton) {
      finalParamsHBS.listenButton.selector = "#".concat(finalParamsHBS.idButton);
    }
    var templateHBS = Handlebars.templates['button.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    _this = _callSuper(this, Button, [templateHTML, parentElement]);
    _this.addListener(finalParamsHBS.listenButton.eventType, finalParamsHBS.listenButton.selector, finalParamsHBS.listenButton.callback);
    return _this;
  }
  _inherits(Button, _BaseComponent);
  return _createClass(Button);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/formCard/formCard.js":
/*!*****************************************************!*\
  !*** ./src/components/pattern/formCard/formCard.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormCard)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_FORM_CARD = {
  progressBar: '',
  linkToPage: '',
  cardTitle: 'Заголовок',
  fields: [],
  button: ''
};
var FormCard = /*#__PURE__*/function (_BaseComponent) {
  function FormCard(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, FormCard);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_FORM_CARD), paramsHBS);
    var templateHBS = Handlebars.templates['formCard.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    return _callSuper(this, FormCard, [templateHTML, parentElement]);
  }
  _inherits(FormCard, _BaseComponent);
  return _createClass(FormCard);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/header/header.js":
/*!*************************************************!*\
  !*** ./src/components/pattern/header/header.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_COMPONENTS = {
  logotype: '',
  profile: '',
  isGreeting: false
};
var Header = /*#__PURE__*/function (_BaseComponent) {
  function Header(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Header);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_COMPONENTS), paramsHBS);
    var templateHBS = Handlebars.templates['header.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    return _callSuper(this, Header, [templateHTML, parentElement]);
  }
  _inherits(Header, _BaseComponent);
  return _createClass(Header);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/input/input.js":
/*!***********************************************!*\
  !*** ./src/components/pattern/input/input.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var DEFAULT_PARAMS_INPUT = {
  typeInput: 'text',
  idInput: '',
  nameInput: '',
  labelText: 'Поле ввода',
  autocompleteInput: 'off'
};
DEFAULT_PARAMS_INPUT.listenInput = {
  eventType: '',
  selector: '',
  callback: function callback() {}
};
DEFAULT_PARAMS_INPUT.listenFocus = {
  eventType: '',
  selector: '',
  callback: function callback() {}
};
var Input = /*#__PURE__*/function (_BaseComponent) {
  function Input(parentElement) {
    var _this;
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Input);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_INPUT), paramsHBS);
    var templateHBS = Handlebars.templates['input.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    _this = _callSuper(this, Input, [templateHTML, parentElement]);
    _this.addListener(finalParamsHBS.listenInput.eventType, finalParamsHBS.listenInput.selector, finalParamsHBS.listenInput.callback);
    _this.addListener(finalParamsHBS.listenFocus.eventType, finalParamsHBS.listenFocus.selector, finalParamsHBS.listenFocus.callback);
    return _this;
  }
  _inherits(Input, _BaseComponent);
  return _createClass(Input);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/linkTo/linkTo.js":
/*!*************************************************!*\
  !*** ./src/components/pattern/linkTo/linkTo.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkTo)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_LINK = {
  idLink: '',
  linkText: 'Ссылка'
};
DEFAULT_PARAMS_LINK.listenRoute = {
  eventType: '',
  selector: '',
  callback: function callback() {}
};
var LinkTo = /*#__PURE__*/function (_BaseComponent) {
  function LinkTo(parentElement) {
    var _this;
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LinkTo);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_LINK), paramsHBS);
    if (finalParamsHBS.idLink) {
      finalParamsHBS.listenRoute.selector = "#".concat(finalParamsHBS.idLink);
    }
    var templateHBS = Handlebars.templates['linkTo.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    _this = _callSuper(this, LinkTo, [templateHTML, parentElement]);
    _this.addListener(finalParamsHBS.listenRoute.eventType, finalParamsHBS.listenRoute.selector, finalParamsHBS.listenRoute.callback);
    return _this;
  }
  _inherits(LinkTo, _BaseComponent);
  return _createClass(LinkTo);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/pattern/logo/logo.js":
/*!*********************************************!*\
  !*** ./src/components/pattern/logo/logo.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_BUTTON = {
  type: 'white',
  png_name: 'Icon 50.png'
};
var Logo = /*#__PURE__*/function (_BaseComponent) {
  function Logo(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PARAMS_BUTTON;
    _classCallCheck(this, Logo);
    var templateHBS = Handlebars.templates['logo.hbs'];
    var templateHTML = templateHBS(paramsHBS);
    return _callSuper(this, Logo, [templateHTML, parentElement]);
  }
  _inherits(Logo, _BaseComponent);
  return _createClass(Logo);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/authButton/authButton.js":
/*!********************************************************!*\
  !*** ./src/components/simple/authButton/authButton.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthButton)
/* harmony export */ });
/* harmony import */ var _pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/button/button.js */ "./src/components/pattern/button/button.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/validation.js */ "./src/modules/validation.js");
/* harmony import */ var _modules_network_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/network.js */ "./src/modules/network.js");
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/router.js */ "./src/modules/router.js");
/* harmony import */ var _notification_notification_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../notification/notification.js */ "./src/components/simple/notification/notification.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






var DEFAULT_AUTH_PARAMS_BUTTON = {
  buttonText: 'Войти'
};
DEFAULT_AUTH_PARAMS_BUTTON.listenButton = {
  eventType: 'click',
  selector: '.button',
  callback: function callback() {
    var loginValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('loginInput');
    var passwordValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('passwordInput');
    if ((0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_2__.checkAuth)(loginValue, passwordValue)) {
      _modules_network_js__WEBPACK_IMPORTED_MODULE_3__["default"].authUser(loginValue, passwordValue).then(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(respond) {
          var error;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!respond.success) {
                  _context.next = 7;
                  break;
                }
                _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].setState('myID', respond.data.id);
                _context.next = 4;
                return _modules_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].navigateTo('feed');
              case 4:
                _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].setState('profile_name', loginValue);
                _context.next = 9;
                break;
              case 7:
                // const answer = JSON.parse(respond.message);
                error = new _notification_notification_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
                  isWarning: true,
                  isWithButton: true,
                  title: respond.message || 'Invalid credentials'
                });
                error.render();
              case 9:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function (error) {
        var Error = new _notification_notification_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
          isWarning: true,
          isWithButton: true,
          title: error
        });
        Error.render();
      });
    }
  }
};
var AuthButton = /*#__PURE__*/function (_Button) {
  function AuthButton(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, AuthButton);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_AUTH_PARAMS_BUTTON), paramsHBS);
    return _callSuper(this, AuthButton, [parentElement, finalParamsHBS]);
  }
  _inherits(AuthButton, _Button);
  return _createClass(AuthButton);
}(_pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/linkToAuth/linkToAuth.js":
/*!********************************************************!*\
  !*** ./src/components/simple/linkToAuth/linkToAuth.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkToLogin)
/* harmony export */ });
/* harmony import */ var _pattern_linkTo_linkTo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/linkTo/linkTo.js */ "./src/components/pattern/linkTo/linkTo.js");
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../modules/router.js */ "./src/modules/router.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON = {
  idLink: 'linkToAuth',
  linkText: 'Уже есть аккаунт? Войти'
};
DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON.listenRoute = {
  eventType: 'click',
  selector: "#".concat(DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON.idLink),
  callback: function callback() {
    _modules_router_js__WEBPACK_IMPORTED_MODULE_1__["default"].navigateTo('auth');
  }
};
var LinkToLogin = /*#__PURE__*/function (_LinkTo) {
  function LinkToLogin(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LinkToLogin);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON), paramsHBS);
    return _callSuper(this, LinkToLogin, [parentElement, finalParamsHBS]);
  }
  _inherits(LinkToLogin, _LinkTo);
  return _createClass(LinkToLogin);
}(_pattern_linkTo_linkTo_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/linkToLogin/linkToLogin.js":
/*!**********************************************************!*\
  !*** ./src/components/simple/linkToLogin/linkToLogin.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkToLogin)
/* harmony export */ });
/* harmony import */ var _pattern_linkTo_linkTo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/linkTo/linkTo.js */ "./src/components/pattern/linkTo/linkTo.js");
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../modules/router.js */ "./src/modules/router.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON = {
  idLink: 'linkToLogin',
  linkText: 'Создать аккаунт'
};
DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON.listenRoute = {
  eventType: 'click',
  selector: "#".concat(DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON.idLink),
  callback: function callback() {
    _modules_router_js__WEBPACK_IMPORTED_MODULE_1__["default"].navigateTo('login');
  }
};
var LinkToLogin = /*#__PURE__*/function (_LinkTo) {
  function LinkToLogin(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LinkToLogin);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON), paramsHBS);
    return _callSuper(this, LinkToLogin, [parentElement, finalParamsHBS]);
  }
  _inherits(LinkToLogin, _LinkTo);
  return _createClass(LinkToLogin);
}(_pattern_linkTo_linkTo_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/loginButton/loginButton.js":
/*!**********************************************************!*\
  !*** ./src/components/simple/loginButton/loginButton.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginButton)
/* harmony export */ });
/* harmony import */ var _pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/button/button.js */ "./src/components/pattern/button/button.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/validation.js */ "./src/modules/validation.js");
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/router.js */ "./src/modules/router.js");
/* harmony import */ var _modules_network_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/network.js */ "./src/modules/network.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





var DEFAULT_LOGIN_PARAMS_BUTTON = {
  buttonText: 'Продолжить'
};
DEFAULT_LOGIN_PARAMS_BUTTON.listenButton = {
  eventType: 'click',
  selector: '.button',
  callback: function callback() {
    var loginValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('loginInput');
    var passwordValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('passwordInput');
    var passwordAgainValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('passwordInputAgain');
    if ((0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_2__.checkLogin)(loginValue, passwordValue, passwordAgainValue)) {
      _modules_network_js__WEBPACK_IMPORTED_MODULE_4__["default"].loginUser(loginValue, passwordValue).then(function (respond) {
        if (respond.success) {
          _modules_router_js__WEBPACK_IMPORTED_MODULE_3__["default"].navigateTo('auth');
          _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].setState("my_new_login", loginValue);
        } else {
          var error = new Notification({
            isWarning: true,
            isWithButton: true,
            title: respond.message || 'Invalid credentials'
          });
          error.render();
        }
      })["catch"](function (error) {
        var Error = new Notification({
          isWarning: true,
          isWithButton: true,
          title: error
        });
        Error.render();
      });
    }
  }
};
var LoginButton = /*#__PURE__*/function (_Button) {
  function LoginButton(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LoginButton);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_LOGIN_PARAMS_BUTTON), paramsHBS);
    return _callSuper(this, LoginButton, [parentElement, finalParamsHBS]);
  }
  _inherits(LoginButton, _Button);
  return _createClass(LoginButton);
}(_pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/loginInput/loginInput.js":
/*!********************************************************!*\
  !*** ./src/components/simple/loginInput/loginInput.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginInput)
/* harmony export */ });
/* harmony import */ var _pattern_input_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/input/input.js */ "./src/components/pattern/input/input.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
/* harmony import */ var _notification_notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../notification/notification.js */ "./src/components/simple/notification/notification.js");
/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/validation.js */ "./src/modules/validation.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var DEFAULT_LOGIN_PARAMS_INPUT = {
  typeInput: 'text',
  idInput: 'loginInput_01',
  nameInput: 'login',
  labelText: 'Логин',
  autocompleteInput: 'username'
};
DEFAULT_LOGIN_PARAMS_INPUT.listenInput = {
  eventType: 'input',
  selector: "#".concat(DEFAULT_LOGIN_PARAMS_INPUT.idInput),
  callback: function callback(event) {
    if (_Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('loginInput') != event.target.value) {
      event.target.parentElement.classList.remove('incorrect');
    }
    _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].setState('loginInput', event.target.value);
  }
};
DEFAULT_LOGIN_PARAMS_INPUT.listenFocus = {
  eventType: 'blur',
  selector: "#".concat(DEFAULT_LOGIN_PARAMS_INPUT.idInput),
  callback: function callback() {
    var loginValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('loginInput');
    var loginElement = document.querySelectorAll('.inputContainer')[0];
    var loginValidation = (0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_3__.validator)(loginValue, _modules_validation_js__WEBPACK_IMPORTED_MODULE_3__.LOGIN_BRIEF_RULES);
    if (!loginValidation.isOK && loginValue != '') {
      var error = new _notification_notification_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
        isWarning: true,
        isWithButton: true,
        title: loginValidation.message
      });
      error.render();
      loginElement.classList.add('incorrect');
    } else {
      loginElement.classList.remove('incorrect');
    }
  }
};
var LoginInput = /*#__PURE__*/function (_Input) {
  function LoginInput(parentElement) {
    var _this;
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LoginInput);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_LOGIN_PARAMS_INPUT), paramsHBS);
    _this = _callSuper(this, LoginInput, [parentElement, finalParamsHBS]);
    _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe("my_new_login", function (data) {
      document.querySelector("#loginInput_01").value = data;
    });
    return _this;
  }
  _inherits(LoginInput, _Input);
  return _createClass(LoginInput);
}(_pattern_input_input_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/logoMain/logoMain.js":
/*!****************************************************!*\
  !*** ./src/components/simple/logoMain/logoMain.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogoMain)
/* harmony export */ });
/* harmony import */ var _pattern_logo_logo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/logo/logo.js */ "./src/components/pattern/logo/logo.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var LOGO_MAIN = {
  type: 'main',
  png_name: 'logo main 50.png'
};
var LogoMain = /*#__PURE__*/function (_Logo) {
  function LogoMain(parentElement) {
    _classCallCheck(this, LogoMain);
    return _callSuper(this, LogoMain, [parentElement, LOGO_MAIN]);
  }
  _inherits(LogoMain, _Logo);
  return _createClass(LogoMain);
}(_pattern_logo_logo_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/logoutButton/logoutButton.js":
/*!************************************************************!*\
  !*** ./src/components/simple/logoutButton/logoutButton.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogoutButton)
/* harmony export */ });
/* harmony import */ var _pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/button/button.js */ "./src/components/pattern/button/button.js");
/* harmony import */ var _modules_network_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../modules/network.js */ "./src/modules/network.js");
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/router.js */ "./src/modules/router.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var DEFAULT_LOGOUT_PARAMS_BUTTON = {
  idButton: 'logoutButton',
  buttonText: 'Выйти'
};
DEFAULT_LOGOUT_PARAMS_BUTTON.listenButton = {
  eventType: 'click',
  selector: "#".concat(DEFAULT_LOGOUT_PARAMS_BUTTON.idButton),
  callback: function callback() {
    _modules_network_js__WEBPACK_IMPORTED_MODULE_1__["default"].logoutUser().then(function (response) {
      console.log('Выход выполнен успешно:', response);
      _modules_router_js__WEBPACK_IMPORTED_MODULE_2__["default"].navigateTo('auth');
    })["catch"](function (error) {
      console.error('Ошибка при выходе:', error);
    });
  }
};
var LogoutButton = /*#__PURE__*/function (_Button) {
  function LogoutButton(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LogoutButton);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_LOGOUT_PARAMS_BUTTON), paramsHBS);
    return _callSuper(this, LogoutButton, [parentElement, finalParamsHBS]);
  }
  _inherits(LogoutButton, _Button);
  return _createClass(LogoutButton);
}(_pattern_button_button_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/notification/notification.js":
/*!************************************************************!*\
  !*** ./src/components/simple/notification/notification.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Notification = /*#__PURE__*/function (_BaseComponent) {
  function Notification(paramsHBS) {
    var _this;
    _classCallCheck(this, Notification);
    var templateHBS = Handlebars.templates['notification.hbs'];
    var templateHTML = templateHBS(paramsHBS);
    _this = _callSuper(this, Notification, [templateHTML, _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('notif_layer')]);
    _this.addListener('click', '.cross', function (event) {
      event.target.parentElement.parentElement.remove();
    });
    return _this;
  }
  _inherits(Notification, _BaseComponent);
  return _createClass(Notification, [{
    key: "render",
    value: function render() {
      this.parentElement.innerHTML = this.template;
      this.attachListeners();
    }
  }]);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/passwordInput/passwordInput.js":
/*!**************************************************************!*\
  !*** ./src/components/simple/passwordInput/passwordInput.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasswordInput)
/* harmony export */ });
/* harmony import */ var _pattern_input_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pattern/input/input.js */ "./src/components/pattern/input/input.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
/* harmony import */ var _notification_notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../notification/notification.js */ "./src/components/simple/notification/notification.js");
/* harmony import */ var _modules_validation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/validation.js */ "./src/modules/validation.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var DEFAULT_PASSWORD_PARAMS_INPUT = {
  typeInput: 'password',
  nameInput: 'password',
  idInput: 'passwordInput_01',
  labelText: 'Пароль',
  autocompleteInput: 'current-password'
};
DEFAULT_PASSWORD_PARAMS_INPUT.listenInput = {
  eventType: 'input',
  selector: "#".concat(DEFAULT_PASSWORD_PARAMS_INPUT.idInput),
  callback: function callback(event) {
    if (_Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('passwordInput') != event.target.value) {
      event.target.parentElement.classList.remove('incorrect');
    }
    _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].setState('passwordInput', event.target.value);
  }
};
DEFAULT_PASSWORD_PARAMS_INPUT.listenFocus = {
  eventType: 'blur',
  selector: "#".concat(DEFAULT_PASSWORD_PARAMS_INPUT.idInput),
  callback: function callback() {
    var passwordValue = _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].getState('passwordInput');
    var passwordElement = document.querySelectorAll('.inputContainer')[1];
    var passwordValidation = (0,_modules_validation_js__WEBPACK_IMPORTED_MODULE_3__.validator)(passwordValue, _modules_validation_js__WEBPACK_IMPORTED_MODULE_3__.PASSWORD_BRIEF_RULES);
    if (!passwordValidation.isOK && passwordValue != '') {
      var error = new _notification_notification_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
        isWarning: true,
        isWithButton: true,
        title: passwordValidation.message
      });
      error.render();
      passwordElement.classList.add('incorrect');
    } else {
      passwordElement.classList.remove('incorrect');
    }
  }
};
var PasswordInput = /*#__PURE__*/function (_Input) {
  function PasswordInput(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, PasswordInput);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PASSWORD_PARAMS_INPUT), paramsHBS);
    return _callSuper(this, PasswordInput, [parentElement, finalParamsHBS]);
  }
  _inherits(PasswordInput, _Input);
  return _createClass(PasswordInput);
}(_pattern_input_input_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/profile/profile.js":
/*!**************************************************!*\
  !*** ./src/components/simple/profile/profile.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Profile)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
/* harmony import */ var _Store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var DEFAULT_PARAMS_PROGRESS_BAR = {
  profile_name: 'Имя человека',
  path: 'media/logo/Icon 50.png'
};
var Profile = /*#__PURE__*/function (_BaseComponent) {
  function Profile(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PARAMS_PROGRESS_BAR;
    _classCallCheck(this, Profile);
    var templateHBS = Handlebars.templates['profile.hbs'];
    _Store_js__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe("profile_name", function (newName) {
      document.querySelector(".profile").children[0].innerHTML = newName;
    });
    var templateHTML = templateHBS(paramsHBS);
    return _callSuper(this, Profile, [templateHTML, parentElement]);
  }
  _inherits(Profile, _BaseComponent);
  return _createClass(Profile);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/components/simple/progressBar/progressBar.js":
/*!**********************************************************!*\
  !*** ./src/components/simple/progressBar/progressBar.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseComponent.js */ "./src/components/BaseComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var DEFAULT_PARAMS_PROGRESS_BAR = {
  progressPercent: 0
};
var ProgressBar = /*#__PURE__*/function (_BaseComponent) {
  function ProgressBar(parentElement) {
    var paramsHBS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ProgressBar);
    var finalParamsHBS = _objectSpread(_objectSpread({}, DEFAULT_PARAMS_PROGRESS_BAR), paramsHBS);
    var templateHBS = Handlebars.templates['progressBar.hbs'];
    var templateHTML = templateHBS(finalParamsHBS);
    return _callSuper(this, ProgressBar, [templateHTML, parentElement]);
  }
  _inherits(ProgressBar, _BaseComponent);
  return _createClass(ProgressBar);
}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/network.js":
/*!********************************!*\
  !*** ./src/modules/network.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Базовый URL API
 * @constant {string}
 */
var BASE_URL = 'http://213.219.214.83:8080';

/**
 * Отправляет HTTP-запрос на указанный URL
 * @async
 * @param {string} url - URL запроса
 * @param {string} method - HTTP-метод (GET, POST, DELETE и т. д.)
 * @param {Object} [data=null] - Тело запроса (если требуется)
 * @returns {Promise<Object>} Объект с результатом запроса { success: boolean, data?: any, message?: string }
 */
function sendRequest(_x, _x2) {
  return _sendRequest.apply(this, arguments);
}
/**
 * Регистрирует нового пользователя
 * @async
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<Object>} Результат запроса
 */
function _sendRequest() {
  _sendRequest = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, method) {
    var data,
      options,
      response,
      responseData,
      errorText,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          _context.prev = 1;
          options = {
            method: method,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          };
          if (data) {
            options.body = JSON.stringify(data);
          }
          _context.next = 6;
          return fetch(url, options);
        case 6:
          response = _context.sent;
          if (!response.ok) {
            _context.next = 12;
            break;
          }
          _context.next = 10;
          return response.json();
        case 10:
          responseData = _context.sent;
          return _context.abrupt("return", {
            success: true,
            data: responseData
          });
        case 12:
          _context.next = 14;
          return response.text();
        case 14:
          errorText = _context.sent;
          return _context.abrupt("return", {
            success: false,
            message: errorText
          });
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", {
            success: false,
            message: _context.t0.message
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 18]]);
  }));
  return _sendRequest.apply(this, arguments);
}
function loginUser(_x3, _x4) {
  return _loginUser.apply(this, arguments);
}
/**
 * Авторизует пользователя
 * @async
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<Object>} Результат запроса
 */
function _loginUser() {
  _loginUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(login, password) {
    var url;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = "".concat(BASE_URL, "/users");
          _context2.next = 3;
          return sendRequest(url, 'POST', {
            login: login,
            password: password
          });
        case 3:
          return _context2.abrupt("return", _context2.sent);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loginUser.apply(this, arguments);
}
function authUser(_x5, _x6) {
  return _authUser.apply(this, arguments);
}
/**
 * Получает список профилей, связанных с пользователем
 * @async
 * @param {number} id - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
function _authUser() {
  _authUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(login, password) {
    var url;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          url = "".concat(BASE_URL, "/users/login");
          _context3.next = 3;
          return sendRequest(url, 'POST', {
            login: login,
            password: password
          });
        case 3:
          return _context3.abrupt("return", _context3.sent);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _authUser.apply(this, arguments);
}
function getProfiles(_x7) {
  return _getProfiles.apply(this, arguments);
}
/**
 * Получает профиль конкретного пользователя
 * @async
 * @param {number} userId - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
function _getProfiles() {
  _getProfiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
    var url;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          url = "".concat(BASE_URL, "/profiles?forUser=").concat(id);
          _context4.next = 3;
          return sendRequest(url, 'GET');
        case 3:
          return _context4.abrupt("return", _context4.sent);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getProfiles.apply(this, arguments);
}
function getProfile(_x8) {
  return _getProfile.apply(this, arguments);
}
/**
 * Выходит из системы
 * @async
 * @returns {Promise<Object>} Результат запроса
 */
function _getProfile() {
  _getProfile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(userId) {
    var url;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          url = "".concat(BASE_URL, "/profiles/").concat(userId);
          _context5.next = 3;
          return sendRequest(url, 'GET');
        case 3:
          return _context5.abrupt("return", _context5.sent);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getProfile.apply(this, arguments);
}
function logoutUser() {
  return _logoutUser.apply(this, arguments);
}
/**
 * Удаляет пользователя
 * @async
 * @param {number} userId - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
function _logoutUser() {
  _logoutUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var url;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          url = "".concat(BASE_URL, "/users/logout");
          _context6.next = 3;
          return sendRequest(url, 'POST');
        case 3:
          return _context6.abrupt("return", _context6.sent);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _logoutUser.apply(this, arguments);
}
function deleteUser(_x9) {
  return _deleteUser.apply(this, arguments);
}
/**
 * Проверяет, активна ли сессия пользователя
 * @async
 * @returns {Promise<Object>} Результат запроса
 */
function _deleteUser() {
  _deleteUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(userId) {
    var url;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          url = "".concat(BASE_URL, "/users/").concat(userId);
          _context7.next = 3;
          return sendRequest(url, 'DELETE');
        case 3:
          return _context7.abrupt("return", _context7.sent);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _deleteUser.apply(this, arguments);
}
function checkSession() {
  return _checkSession.apply(this, arguments);
}
function _checkSession() {
  _checkSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var url;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          url = "".concat(BASE_URL, "/users/checkSession");
          _context8.next = 3;
          return sendRequest(url, 'GET');
        case 3:
          return _context8.abrupt("return", _context8.sent);
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _checkSession.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  BASE_URL: BASE_URL,
  getProfiles: getProfiles,
  authUser: authUser,
  loginUser: loginUser,
  getProfile: getProfile,
  logoutUser: logoutUser,
  deleteUser: deleteUser,
  checkSession: checkSession
});

/***/ }),

/***/ "./src/modules/router.js":
/*!*******************************!*\
  !*** ./src/modules/router.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_loginPage_loginPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/loginPage/loginPage.js */ "./src/pages/loginPage/loginPage.js");
/* harmony import */ var _pages_authPage_authPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/authPage/authPage.js */ "./src/pages/authPage/authPage.js");
/* harmony import */ var _pages_feedPage_feedPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/feedPage/feedPage.js */ "./src/pages/feedPage/feedPage.js");
/* harmony import */ var _network_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./network.js */ "./src/modules/network.js");
/* harmony import */ var _components_Store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var Router = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
    this.root = document.getElementById('root');
    this.authPage = new _pages_authPage_authPage_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.root);
    this.loginPage = new _pages_loginPage_loginPage_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.root);
    this.feedPage = new _pages_feedPage_feedPage_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.root);
    // this.isLogin = false;
  }
  return _createClass(Router, [{
    key: "navigateTo",
    value: function () {
      var _navigateTo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(page) {
        var sessionResult;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _network_js__WEBPACK_IMPORTED_MODULE_3__["default"].checkSession();
            case 2:
              sessionResult = _context.sent;
              console.log(sessionResult);
              if (!sessionResult.data.inSession) {
                _context.next = 9;
                break;
              }
              _components_Store_js__WEBPACK_IMPORTED_MODULE_4__["default"].setState('myID', sessionResult.data.id);
              this.root.classList.remove('greeting');
              this.feedPage.rerender();
              return _context.abrupt("return");
            case 9:
              _context.t0 = page;
              _context.next = _context.t0 === 'auth' ? 12 : _context.t0 === 'login' ? 15 : _context.t0 === 'feed' ? 18 : 21;
              break;
            case 12:
              this.root.classList.add('greeting');
              this.authPage.rerender();
              return _context.abrupt("break", 23);
            case 15:
              this.root.classList.add('greeting');
              this.loginPage.rerender();
              return _context.abrupt("break", 23);
            case 18:
              this.root.classList.remove('greeting');
              this.feedPage.rerender();
              return _context.abrupt("break", 23);
            case 21:
              alert('Такой страницы нет. Перенаправляю на логин');
              this.loginPage.rerender();
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function navigateTo(_x) {
        return _navigateTo.apply(this, arguments);
      }
      return navigateTo;
    }()
  }]);
}();
var router = new Router();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./src/modules/validation.js":
/*!***********************************!*\
  !*** ./src/modules/validation.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LOGIN_BRIEF_RULES: () => (/* binding */ LOGIN_BRIEF_RULES),
/* harmony export */   LOGIN_RULES: () => (/* binding */ LOGIN_RULES),
/* harmony export */   PASSWORD_BRIEF_RULES: () => (/* binding */ PASSWORD_BRIEF_RULES),
/* harmony export */   PASSWORD_RULES: () => (/* binding */ PASSWORD_RULES),
/* harmony export */   checkAuth: () => (/* binding */ checkAuth),
/* harmony export */   checkLogin: () => (/* binding */ checkLogin),
/* harmony export */   validator: () => (/* binding */ validator)
/* harmony export */ });
/* harmony import */ var _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/simple/notification/notification.js */ "./src/components/simple/notification/notification.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var validator = function validator(data, rules) {
  var error = '';
  var _iterator = _createForOfIteratorHelper(rules),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      if (!rule.reg.test(data)) error = rule.message;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return error == '' ? {
    isOK: true,
    message: null
  } : {
    isOK: false,
    message: error
  };
};
var checkLogin = function checkLogin(loginValue, passwordValue, passwordAgainValue) {
  var loginValidation = validator(loginValue, LOGIN_RULES);
  var passwordValidation = validator(passwordValue, PASSWORD_RULES);
  var loginElement = document.querySelectorAll('.inputContainer')[0];
  var passwordElement = document.querySelectorAll('.inputContainer')[1];
  var passwordAgainElement = document.querySelectorAll('.inputContainer')[2];
  if (passwordValue != passwordAgainValue) {
    var error = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: 'Пароли не совпадают!'
    });
    error.render();
    passwordElement.classList.add('incorrect');
    passwordAgainElement.classList.add('incorrect');
    return false;
  }
  passwordElement.classList.remove('incorrect');
  passwordAgainElement.classList.remove('incorrect');
  if (loginValue == undefined) {
    var _error = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: 'Логин не может быть пустым!'
    });
    _error.render();
    loginElement.classList.add('incorrect');
    return false;
  }
  if (passwordValue == undefined) {
    var _error2 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: 'Пароль не может быть пустым!'
    });
    _error2.render();
    passwordElement.classList.add('incorrect');
    return false;
  }
  if (!loginValidation.isOK) {
    var _error3 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: loginValidation.message
    });
    _error3.render();
    loginElement.classList.add('incorrect');
    return false;
  } else if (!passwordValidation.isOK) {
    var _error4 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: passwordValidation.message
    });
    _error4.render();
    passwordElement.classList.add('incorrect');
    return false;
  } else {
    loginElement.classList.remove('incorrect');
    passwordElement.classList.remove('incorrect');
    passwordAgainElement.classList.remove('incorrect');
    return true;
  }
};
var checkAuth = function checkAuth(loginValue, passwordValue) {
  var loginValidation = validator(loginValue, LOGIN_RULES);
  var passwordValidation = validator(passwordValue, PASSWORD_RULES);
  var loginElement = document.querySelectorAll('.inputContainer')[0];
  var passwordElement = document.querySelectorAll('.inputContainer')[1];
  if (loginValue == undefined) {
    var error = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: 'Логин не может быть пустым!'
    });
    error.render();
    loginElement.classList.add('incorrect');
    return false;
  }
  if (passwordValue == undefined) {
    var _error5 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: 'Пароль не может быть пустым!'
    });
    _error5.render();
    passwordElement.classList.add('incorrect');
    return false;
  }
  if (!loginValidation.isOK) {
    var _error6 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: loginValidation.message
    });
    _error6.render();
    loginElement.classList.add('incorrect');
    return false;
  } else if (!passwordValidation.isOK) {
    var _error7 = new _components_simple_notification_notification_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      isWarning: true,
      isWithButton: true,
      title: passwordValidation.message
    });
    _error7.render();
    passwordElement.classList.add('incorrect');
    return false;
  } else {
    loginElement.classList.remove('incorrect');
    passwordElement.classList.remove('incorrect');
    return true;
  }
};
var EMOJI = /^(?:[\0-\xA8\xAA-\xAD\xAF-\u203B\u203D-\u2048\u204A-\u2121\u2123-\u2138\u213A-\u2193\u219A-\u21A8\u21AB-\u2319\u231C-\u2327\u2329-\u2387\u2389-\u23CE\u23D0-\u23E8\u23F4-\u23F7\u23FB-\u24C1\u24C3-\u25A9\u25AC-\u25B5\u25B7-\u25BF\u25C1-\u25FA\u25FF\u2606\u2613\u2686-\u268F\u2706\u2707\u2713\u2715\u2717-\u271C\u271E-\u2720\u2722-\u2727\u2729-\u2732\u2735-\u2743\u2745\u2746\u2748-\u274B\u274D\u274F-\u2752\u2756\u2758-\u2762\u2768-\u2794\u2798-\u27A0\u27A2-\u27AF\u27B1-\u27BE\u27C0-\u2933\u2936-\u2B04\u2B08-\u2B1A\u2B1D-\u2B4F\u2B51-\u2B54\u2B56-\u302F\u3031-\u303C\u303E-\u3296\u3298\u329A-\uD7FF\uE000-\uFFFF]|[\uD800-\uD83B\uD840-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDD00-\uDD0C\uDD10-\uDD2E\uDD30-\uDD6B\uDD72-\uDD7D\uDD80-\uDD8D\uDD8F\uDD90\uDD9B-\uDDAC\uDDE6-\uDE00\uDE10-\uDE19\uDE1B-\uDE2E\uDE30\uDE31\uDE3B\uDE40-\uDE48\uDFFB-\uDFFF]|\uD83D[\uDD3E-\uDD45\uDE50-\uDE7F\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD00-\uDD0B\uDD3B\uDD46\uDF00-\uDFFF]|\uD83F[\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*$/;
var LOGIN_RULES = [{
  reg: /^[a-zA-Z0-9._]+$/,
  message: 'Логин может содержать только латинские буква, цифры, точку и нижнее подчеркивание!'
}, {
  reg: EMOJI,
  message: 'Логин не может содержать эмоджи!'
}, {
  reg: /^.{7,}$/,
  message: 'Логин не может быть меньше 7 символов!'
}, {
  reg: /^.{1,15}$/,
  message: 'Логин не может быть больше 15 символов!'
}, {
  reg: /^[a-zA-Z]/,
  message: 'Перый символ должен быть латинской буквой!'
}];
var LOGIN_BRIEF_RULES = [{
  reg: /^[a-zA-Z0-9._]+$/,
  message: 'Логин может содержать только латинские буква, цифры, точку и нижнее подчеркивание!'
}, {
  reg: EMOJI,
  message: 'Логин не может содержать эмоджи!'
}, {
  reg: /^.{1,15}$/,
  message: 'Логин не может быть больше 15 символов!'
}, {
  reg: /^[a-zA-Z]/,
  message: 'Перый символ должен быть латинской буквой!'
}];
var PASSWORD_RULES = [{
  message: 'Пароль должен содержать только латинские буквы и цифры',
  reg: /^[a-zA-Z0-9]*$/
}, {
  reg: EMOJI,
  message: 'Пароль не может содержать эмоджи!'
}, {
  reg: /^.{8,}$/,
  message: 'Пароль не может быть меньше 8 символов!'
}, {
  reg: /^.{1,64}$/,
  message: 'Пароль не может быть больше 64 символов!'
}];
var PASSWORD_BRIEF_RULES = [{
  message: 'Пароль должен содержать только латинские буквы и цифры',
  reg: /^[a-zA-Z0-9]*$/
}, {
  reg: EMOJI,
  message: 'Пароль не может содержать эмоджи!'
}, {
  reg: /^.{1,64}$/,
  message: 'Пароль не может быть больше 64 символов!'
}];

/***/ }),

/***/ "./src/pages/BasePage.js":
/*!*******************************!*\
  !*** ./src/pages/BasePage.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasePage)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BasePage = /*#__PURE__*/function () {
  function BasePage(parentElement) {
    _classCallCheck(this, BasePage);
    this.parentElement = parentElement;
  }
  return _createClass(BasePage, [{
    key: "render",
    value: function render() {
      throw new Error('Метод render() должен быть реализован в дочернем классе');
    }
  }, {
    key: "rerender",
    value: function rerender() {
      this.parentElement.innerHTML = '';
      this.render();
    }
  }]);
}();


/***/ }),

/***/ "./src/pages/authPage/authPage.js":
/*!****************************************!*\
  !*** ./src/pages/authPage/authPage.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthPage)
/* harmony export */ });
/* harmony import */ var _BasePage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePage.js */ "./src/pages/BasePage.js");
/* harmony import */ var _components_compound_authCard_authCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/compound/authCard/authCard.js */ "./src/components/compound/authCard/authCard.js");
/* harmony import */ var _components_compound_headerGreeting_headerGreeting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/compound/headerGreeting/headerGreeting.js */ "./src/components/compound/headerGreeting/headerGreeting.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var AuthPage = /*#__PURE__*/function (_BasePage) {
  function AuthPage(parentElement) {
    var _this;
    _classCallCheck(this, AuthPage);
    _this = _callSuper(this, AuthPage, [parentElement]);
    _this.components = [new _components_compound_headerGreeting_headerGreeting_js__WEBPACK_IMPORTED_MODULE_2__["default"](parentElement), new _components_compound_authCard_authCard_js__WEBPACK_IMPORTED_MODULE_1__["default"](parentElement)];
    return _this;
  }
  _inherits(AuthPage, _BasePage);
  return _createClass(AuthPage, [{
    key: "render",
    value: function render() {
      this.components.forEach(function (component) {
        return component.render();
      });
    }
  }]);
}(_BasePage_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/feedPage/feedPage.js":
/*!****************************************!*\
  !*** ./src/pages/feedPage/feedPage.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FeedPage)
/* harmony export */ });
/* harmony import */ var _BasePage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePage.js */ "./src/pages/BasePage.js");
/* harmony import */ var _components_compound_peopleCards_peopleCards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/compound/peopleCards/peopleCards.js */ "./src/components/compound/peopleCards/peopleCards.js");
/* harmony import */ var _components_compound_headerMain_headerMain_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/compound/headerMain/headerMain.js */ "./src/components/compound/headerMain/headerMain.js");
/* harmony import */ var _components_Store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Store.js */ "./src/components/Store.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var FeedPage = /*#__PURE__*/function (_BasePage) {
  function FeedPage(parentElement) {
    var _this;
    _classCallCheck(this, FeedPage);
    _this = _callSuper(this, FeedPage, [parentElement]);
    _this.components = [new _components_compound_headerMain_headerMain_js__WEBPACK_IMPORTED_MODULE_2__["default"](parentElement), new _components_compound_peopleCards_peopleCards_js__WEBPACK_IMPORTED_MODULE_1__["default"](parentElement)];
    return _this;
  }
  _inherits(FeedPage, _BasePage);
  return _createClass(FeedPage, [{
    key: "render",
    value: function render() {
      console.log(_components_Store_js__WEBPACK_IMPORTED_MODULE_3__["default"].getState("myID"));
      this.components.forEach(function (component) {
        return component.render();
      });
    }
  }]);
}(_BasePage_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/pages/loginPage/loginPage.js":
/*!******************************************!*\
  !*** ./src/pages/loginPage/loginPage.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _BasePage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BasePage.js */ "./src/pages/BasePage.js");
/* harmony import */ var _components_compound_loginCard_loginCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/compound/loginCard/loginCard.js */ "./src/components/compound/loginCard/loginCard.js");
/* harmony import */ var _components_compound_headerGreeting_headerGreeting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/compound/headerGreeting/headerGreeting.js */ "./src/components/compound/headerGreeting/headerGreeting.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var LoginPage = /*#__PURE__*/function (_BasePage) {
  function LoginPage(parentElement) {
    var _this;
    _classCallCheck(this, LoginPage);
    _this = _callSuper(this, LoginPage, [parentElement]);
    _this.components = [new _components_compound_headerGreeting_headerGreeting_js__WEBPACK_IMPORTED_MODULE_2__["default"](parentElement), new _components_compound_loginCard_loginCard_js__WEBPACK_IMPORTED_MODULE_1__["default"](parentElement)];
    return _this;
  }
  _inherits(LoginPage, _BasePage);
  return _createClass(LoginPage, [{
    key: "render",
    value: function render() {
      this.components.forEach(function (component) {
        return component.render();
      });
    }
  }]);
}(_BasePage_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/router.js */ "./src/modules/router.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ "./src/index.css");


_modules_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigateTo('auth');
})();

/******/ })()
;
//# sourceMappingURL=app.309fa72cd4fe357e8382.js.map