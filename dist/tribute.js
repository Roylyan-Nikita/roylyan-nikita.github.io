(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                iframe: iframe,

                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return function () {
                        return '<li>No match!</li>';
                    }.bind(_this);
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace
            }];
        } else if (collection) {
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: '<span>',
                    post: '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;

                var ul = _this2.menu.querySelector('ul');

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');
                    li.setAttribute('data-index', index);
                    li.addEventListener('mouseenter', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        _this2.events.setActiveLi(index);
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                    ul.appendChild(li);
                });

                _this2.range.positionMenuAtCaret(scrollTo);
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number') return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports["default"];

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.addEventListener('keydown', this.keydown.bind(element, this), false);
            element.addEventListener('keyup', this.keyup.bind(element, this), false);
            element.addEventListener('input', this.input.bind(element, this), false);
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.isActive) {
                var keyCode = instance.getKeyCode(instance, this, event);

                if (isNaN(keyCode) || !keyCode) return;

                var trigger = instance.tribute.triggers().find(function (trigger) {
                    return trigger.charCodeAt(0) === keyCode;
                });

                if (typeof trigger !== 'undefined') {
                    instance.callbacks().triggerChar(event, this, trigger);
                }
            }

            if (instance.tribute.current.trigger && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, false, true, tribute.allowSpaces);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            // get heights
            var menuFullHeight = this.getFullHeight(this.tribute.menu),
                liHeight = this.getFullHeight(lis[0]);

            if (index) this.tribute.menuSelected = index;

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    var offset = liHeight * (i + 1);
                    var scrollTop = this.tribute.menu.scrollTop;
                    var totalScroll = scrollTop + menuFullHeight;

                    if (offset > totalScroll) {
                        this.tribute.menu.scrollTop += liHeight;
                    } else if (offset < totalScroll) {
                        this.tribute.menu.scrollTop -= liHeight;
                    }

                    li.className = this.tribute.current.collection.selectClass;
                } else {
                    li.className = '';
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            menu.addEventListener('keydown', this.tribute.events.keydown.bind(this.menu, this), false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.tribute.events.click.bind(null, this), false);
            window.addEventListener('resize', this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false));

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false), false);
            } else {
                window.onscroll = this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var _this = this;

            var context = this.tribute.current,
                coordinates = void 0;

            var info = this.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

            if (typeof info !== 'undefined') {
                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.getDocument().activeElement, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                setTimeout(function () {
                    _this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                         left: ' + coordinates.left + 'px;\n                                         position: absolute;\n                                         zIndex: 10000;\n                                         display: block;';

                    if (scrollTo) _this.scrollIntoView();
                }, 0);
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }

        // TODO: this may not be necessary anymore as we are using mouseup instead of click

    }, {
        key: 'resetSelection',
        value: function resetSelection(targetElement, path, offset) {
            if (!this.isContentEditable(targetElement)) {
                if (targetElement !== this.getDocument().activeElement) {
                    targetElement.focus();
                }
            } else {
                this.selectElement(targetElement, path, offset);
            }
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var context = this.tribute.current;
            // TODO: this may not be necessary anymore as we are using mouseup instead of click
            // this.resetSelection(context.element, context.selectedPath, context.selectedOffset)

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.getDocument().activeElement;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
                    text += _textSuffix;
                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + 1);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath(ctx) {
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;

            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;

                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.tribute.current.element;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
                    }
                }
            }

            return text;
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces) {
            var _this2 = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.getDocument().activeElement;
            } else {
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

                    if (idx > mostRecentTriggerCharPos) {
                        mostRecentTriggerCharPos = idx;
                        triggerChar = c;
                        requireLeadingSpace = config.requireLeadingSpace;
                    }
                });

                if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                    var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                    triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                    var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                    var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                    if (hasTrailingSpace) {
                        currentTriggerSnippet = currentTriggerSnippet.trim();
                    }

                    var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                    if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
                        return {
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            this.getDocument().body.removeChild(div);

            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;
            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = this.menu;

            if (typeof e === 'undefined') return;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate socre and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports["default"];

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFlRztBQUFBOztBQUFBLCtCQWRDLE1BY0Q7QUFBQSxZQWRDLE1BY0QsK0JBZFUsSUFjVjtBQUFBLCtCQWJDLE1BYUQ7QUFBQSxZQWJDLE1BYUQsK0JBYlUsSUFhVjtBQUFBLG9DQVpDLFdBWUQ7QUFBQSxZQVpDLFdBWUQsb0NBWmUsV0FZZjtBQUFBLGdDQVhDLE9BV0Q7QUFBQSxZQVhDLE9BV0QsZ0NBWFcsR0FXWDtBQUFBLHVDQVZDLGNBVUQ7QUFBQSxZQVZDLGNBVUQsdUNBVmtCLElBVWxCO0FBQUEseUNBVEMsZ0JBU0Q7QUFBQSxZQVRDLGdCQVNELHlDQVRvQixJQVNwQjtBQUFBLCtCQVJDLE1BUUQ7QUFBQSxZQVJDLE1BUUQsK0JBUlUsS0FRVjtBQUFBLGlDQVBDLFFBT0Q7QUFBQSxZQVBDLFFBT0QsaUNBUFksT0FPWjtBQUFBLG1DQU5DLFVBTUQ7QUFBQSxZQU5DLFVBTUQsbUNBTmMsSUFNZDtBQUFBLHNDQUxDLGFBS0Q7QUFBQSxZQUxDLGFBS0Qsc0NBTGlCLElBS2pCO0FBQUEsd0NBSkMsZUFJRDtBQUFBLFlBSkMsZUFJRCx3Q0FKbUIsSUFJbkI7QUFBQSx5Q0FIQyxtQkFHRDtBQUFBLFlBSEMsbUJBR0QseUNBSHVCLElBR3ZCO0FBQUEsb0NBRkMsV0FFRDtBQUFBLFlBRkMsV0FFRCxvQ0FGZSxLQUVmO0FBQUEseUNBREMsaUJBQ0Q7QUFBQSxZQURDLGlC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SSxTQUFTLEtBQUssTUFBTCxLQUFnQixDQUE3QjtBQUNBLFlBQUksVUFBVSxVQUFVLENBQVYsQ0FBZDtBQUNBLFlBQUksS0FBSjs7QUFFQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBcEIsRUFBNEIsR0FBNUIsRUFBaUM7QUFDN0Isb0JBQVEsS0FBSyxDQUFMLENBQVI7QUFDQSxnQkFBSSxVQUFVLElBQVYsQ0FBZSxPQUFmLEVBQXdCLEtBQXhCLEVBQStCLENBQS9CLEVBQWtDLElBQWxDLENBQUosRUFBNkM7QUFDekMsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLFNBQVA7QUFDSCxLQW5CRDtBQW9CSDs7QUFFRCxJQUFJLFVBQVUsT0FBTyxPQUFPLFdBQWQsS0FBOEIsVUFBNUMsRUFBd0Q7QUFBQSxRQUM3QyxXQUQ2QyxHQUN0RCxTQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsRUFBb0M7QUFDbEMsaUJBQVMsVUFBVTtBQUNqQixxQkFBUyxLQURRO0FBRWpCLHdCQUFZLEtBRks7QUFHakIsb0JBQVE7QUFIUyxTQUFuQjtBQUtBLFlBQUksTUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVjtBQUNBLFlBQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQWxDLEVBQTJDLE9BQU8sVUFBbEQsRUFBOEQsT0FBTyxNQUFyRTtBQUNBLGVBQU8sR0FBUDtBQUNELEtBVnFEOztBQVl2RCxRQUFJLE9BQU8sT0FBTyxLQUFkLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLG9CQUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7QUFDRDs7QUFFQSxXQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVHJpYnV0ZVV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgVHJpYnV0ZUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlRXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZU1lbnVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZU1lbnVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlUmFuZ2UgZnJvbSBcIi4vVHJpYnV0ZVJhbmdlXCI7XG5pbXBvcnQgVHJpYnV0ZVNlYXJjaCBmcm9tIFwiLi9UcmlidXRlU2VhcmNoXCI7XG5cbmNsYXNzIFRyaWJ1dGUge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgdmFsdWVzID0gbnVsbCxcbiAgICAgICAgaWZyYW1lID0gbnVsbCxcbiAgICAgICAgc2VsZWN0Q2xhc3MgPSAnaGlnaGxpZ2h0JyxcbiAgICAgICAgdHJpZ2dlciA9ICdAJyxcbiAgICAgICAgc2VsZWN0VGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBtZW51SXRlbVRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbG9va3VwID0gJ2tleScsXG4gICAgICAgIGZpbGxBdHRyID0gJ3ZhbHVlJyxcbiAgICAgICAgY29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgIG1lbnVDb250YWluZXIgPSBudWxsLFxuICAgICAgICBub01hdGNoVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gdHJ1ZSxcbiAgICAgICAgYWxsb3dTcGFjZXMgPSBmYWxzZSxcbiAgICAgICAgcmVwbGFjZVRleHRTdWZmaXggPSBudWxsLFxuICAgIH0pIHtcblxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRTdWZmaXggPSByZXBsYWNlVGV4dFN1ZmZpeFxuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWUsXG5cbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogc2VsZWN0Q2xhc3MsXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgb24gc2VsZWN0IHRoYXQgcmV0dW5zIHRoZSBjb250ZW50IHRvIGluc2VydFxuICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgdGhhdCByZXR1cm5zIGNvbnRlbnQgZm9yIGFuIGl0ZW1cbiAgICAgICAgICAgICAgICBtZW51SXRlbVRlbXBsYXRlOiAobWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtyZXR1cm4gJzxsaT5ObyBtYXRjaCE8L2xpPid9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRvIHNlYXJjaCBhZ2FpbnN0IGluIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICBsb29rdXA6IGxvb2t1cCxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0aGF0IGNvbnRhaW5zIHRoZSBjb250ZW50IHRvIGluc2VydCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgZmlsbEF0dHI6IGZpbGxBdHRyLFxuXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBvciBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG5cbiAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlOiByZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaChlbCkge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBlbnN1cmVFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChUcmlidXRlLmlucHV0VHlwZXMoKS5pbmRleE9mKGVsZW1lbnQubm9kZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIENhbm5vdCBiaW5kIHRvICcgKyBlbGVtZW50Lm5vZGVOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTWVudSgpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICB1bCA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAndHJpYnV0ZS1jb250YWluZXInXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgfVxuXG4gICAgc2hvd01lbnVGb3IoZWxlbWVudCwgc2Nyb2xsVG8pIHtcbiAgICAgICAgLy8gT25seSBwcm9jZWVkIGlmIG1lbnUgaXNuJ3QgYWxyZWFkeSBzaG93biBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudCAmIG1lbnRpb25UZXh0XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmIHRoaXMuY3VycmVudC5lbGVtZW50ID09PSBlbGVtZW50ICYmIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9PT0gdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QgPSB0aGlzLmN1cnJlbnQubWVudGlvblRleHRcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIG1lbnUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudSgpXG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMuYmluZCh0aGlzLm1lbnUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcblxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5tZW50aW9uVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAvLyBUcmlidXRlIG1heSBub3QgYmUgYWN0aXZlIGFueSBtb3JlIGJ5IHRoZSB0aW1lIHRoZSB2YWx1ZSBjYWxsYmFjayByZXR1cm5zXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zZWFyY2guZmlsdGVyKHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCwgdmFsdWVzLCB7XG4gICAgICAgICAgICAgICAgcHJlOiAnPHNwYW4+JyxcbiAgICAgICAgICAgICAgICBwb3N0OiAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxvb2t1cCBhdHRyaWJ1dGUsIGxvb2t1cCBtdXN0IGJlIHN0cmluZyBvciBmdW5jdGlvbi4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXMgPSBpdGVtc1xuXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGkgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVTZWxlY3RlZCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IHRydWVcbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmluc2VydEF0Q2FyZXQoZWxlbWVudCwgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcblxuICAgICAgICB0aGlzLnNob3dNZW51Rm9yKGVsZW1lbnQpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgd29ya3MgZm9yIGlucHV0cy90ZXh0YXJlYXNcbiAgICBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBjb250ZW50ZWRpdGFibGVcbiAgICBpbnNlcnRUZXh0QXRDdXJzb3IodGV4dCkge1xuICAgICAgICB2YXIgc2VsLCByYW5nZSwgaHRtbDtcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0Tm9kZSlcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgfVxuXG4gICAgLy8gZm9yIHJlZ3VsYXIgaW5wdXRzXG4gICAgaW5zZXJ0QXRDYXJldCh0ZXh0YXJlYSwgdGV4dCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICB2YXIgZnJvbnQgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZygwLCBjYXJldFBvcyk7XG4gICAgICAgIHZhciBiYWNrID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodGV4dGFyZWEuc2VsZWN0aW9uRW5kLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEl0ZW1BdEluZGV4KGluZGV4LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm5cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtc1tpbmRleF1cbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RUZW1wbGF0ZShpdGVtKVxuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgcmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLnJhbmdlLnJlcGxhY2VUcmlnZ2VyVGV4dChjb250ZW50LCB0cnVlLCB0cnVlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIF9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGFwcGVuZCB0byB2YWx1ZXMsIGFzIGl0IGlzIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfSBlbHNlIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBjb2xsZWN0aW9uLnZhbHVlcy5jb25jYXQobmV3VmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZChjb2xsZWN0aW9uSW5kZXgsIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChjb2xsZWN0aW9uSW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGFuIGluZGV4IGZvciB0aGUgY29sbGVjdGlvbiB0byB1cGRhdGUuJylcblxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltpbmRleF1cblxuICAgICAgICB0aGlzLl9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnQobmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHN0YXRlLiBQbGVhc2UgdXNlIGFwcGVuZCBpbnN0ZWFkIGFuZCBwYXNzIGFuIGluZGV4LicpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJjbGFzcyBUcmlidXRlRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cyA9IHRoaXNcbiAgICB9XG5cbiAgICBzdGF0aWMga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICBrZXk6IDksXG4gICAgICAgICAgICB2YWx1ZTogJ1RBQidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiA4LFxuICAgICAgICAgICAgdmFsdWU6ICdERUxFVEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMTMsXG4gICAgICAgICAgICB2YWx1ZTogJ0VOVEVSJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDI3LFxuICAgICAgICAgICAgdmFsdWU6ICdFU0NBUEUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMzgsXG4gICAgICAgICAgICB2YWx1ZTogJ1VQJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDQwLFxuICAgICAgICAgICAgdmFsdWU6ICdET1dOJ1xuICAgICAgICB9XVxuICAgIH1cblxuICAgIGJpbmQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgdGhpcy5rZXlkb3duLmJpbmQoZWxlbWVudCwgdGhpcyksIGZhbHNlKVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJyxcbiAgICAgICAgICAgIHRoaXMua2V5dXAuYmluZChlbGVtZW50LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLFxuICAgICAgICAgICAgdGhpcy5pbnB1dC5iaW5kKGVsZW1lbnQsIHRoaXMpLCBmYWxzZSlcbiAgICB9XG5cbiAgICBrZXlkb3duKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc2hvdWxkRGVhY3RpdmF0ZShldmVudCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHtcbiAgICAgICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICBpZiAoIWxpIHx8IGxpID09PSB0cmlidXRlLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZmluZCB0aGUgPGxpPiBjb250YWluZXIgZm9yIHRoZSBjbGljaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleChsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgZXZlbnQpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcblxuICAgICAgICAvLyBUT0RPOiBzaG91bGQgZmlyZSB3aXRoIGV4dGVybmFsVHJpZ2dlciBhbmQgdGFyZ2V0IGlzIG91dHNpZGUgb2YgbWVudVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWJ1dGUuY3VycmVudC5lbGVtZW50ICYmICF0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyKSB7XG4gICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpYnV0ZS5oaWRlTWVudSgpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5dXAoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHJldHVyblxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgbGV0IGtleUNvZGUgPSBpbnN0YW5jZS5nZXRLZXlDb2RlKGluc3RhbmNlLCB0aGlzLCBldmVudClcblxuICAgICAgICAgICAgaWYgKGlzTmFOKGtleUNvZGUpIHx8ICFrZXlDb2RlKSByZXR1cm5cblxuICAgICAgICAgICAgbGV0IHRyaWdnZXIgPSBpbnN0YW5jZS50cmlidXRlLnRyaWdnZXJzKCkuZmluZCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlci5jaGFyQ29kZUF0KDApID09PSBrZXlDb2RlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKCkudHJpZ2dlckNoYXIoZXZlbnQsIHRoaXMsIHRyaWdnZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5zdGFuY2UudHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgJiYgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID09PSBmYWxzZVxuICAgICAgICAgICAgfHwgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSAmJiBldmVudC5rZXlDb2RlID09PSA4KSB7XG4gICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLCB0cnVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRGVhY3RpdmF0ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50S2V5UHJlc3NlZCA9IGZhbHNlXG4gICAgICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBvLmtleSkgZXZlbnRLZXlQcmVzc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuICFldmVudEtleVByZXNzZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGdldEtleUNvZGUoaW5zdGFuY2UsIGVsLCBldmVudCkge1xuICAgICAgICBsZXQgY2hhclxuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgbGV0IGluZm8gPSB0cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIGluZm8ubWVudGlvblRyaWdnZXJDaGFyLmNoYXJDb2RlQXQoMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uKGVsKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQgPSBlbFxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMudHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRQYXRoID0gaW5mby5tZW50aW9uU2VsZWN0ZWRQYXRoXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dCA9IGluZm8ubWVudGlvblRleHRcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkT2Zmc2V0ID0gaW5mby5tZW50aW9uU2VsZWN0ZWRPZmZzZXRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxiYWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyaWdnZXJDaGFyOiAoZSwgZWwsIHRyaWdnZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdHJpYnV0ZSA9IHRoaXMudHJpYnV0ZVxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC50cmlnZ2VyID0gdHJpZ2dlclxuXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25JdGVtID0gdHJpYnV0ZS5jb2xsZWN0aW9uLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRyaWdnZXIgPT09IHRyaWdnZXJcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uSXRlbVxuICAgICAgICAgICAgICAgIGlmICh0cmlidXRlLmlucHV0RXZlbnQpIHRyaWJ1dGUuc2hvd01lbnVGb3IoZWwsIHRydWUpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW50ZXI6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNob29zZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQsIGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFiOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2UgZmlyc3QgbWF0Y2hcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrcygpLmVudGVyKGUsIGVsKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB1cCB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWRcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiBzZWxlY3RlZCAmJiBzZWxlY3RlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQtLVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gY291bnQgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zY3JvbGxUb3AgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IoZWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlTGkoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxpcyA9IHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgICAgICBsZW5ndGggPSBsaXMubGVuZ3RoID4+PiAwXG5cbiAgICAgICAgLy8gZ2V0IGhlaWdodHNcbiAgICAgICAgbGV0IG1lbnVGdWxsSGVpZ2h0ID0gdGhpcy5nZXRGdWxsSGVpZ2h0KHRoaXMudHJpYnV0ZS5tZW51KSxcbiAgICAgICAgICAgIGxpSGVpZ2h0ID0gdGhpcy5nZXRGdWxsSGVpZ2h0KGxpc1swXSlcblxuICAgICAgICBpZiAoaW5kZXgpIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBpbmRleDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBsaXNbaV1cbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IGxpSGVpZ2h0ICogKGkrMSlcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsU2Nyb2xsID0gc2Nyb2xsVG9wICsgbWVudUZ1bGxIZWlnaHRcblxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiB0b3RhbFNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wICs9IGxpSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPCB0b3RhbFNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wIC09IGxpSGVpZ2h0XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc05hbWUgPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnVsbEhlaWdodChlbGVtLCBpbmNsdWRlTWFyZ2luKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgICAgaWYgKGluY2x1ZGVNYXJnaW4pIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZWxlbS5jdXJyZW50U3R5bGUgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcbiAgICAgICAgcmV0dXJuIGhlaWdodCArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVFdmVudHM7XG4iLCJjbGFzcyBUcmlidXRlTWVudUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51RXZlbnRzID0gdGhpc1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLnRyaWJ1dGUubWVudVxuICAgIH1cblxuICAgIGJpbmQobWVudSkge1xuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cy5rZXlkb3duLmJpbmQodGhpcy5tZW51LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzLmNsaWNrLmJpbmQobnVsbCwgdGhpcyksIGZhbHNlKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLnBvc2l0aW9uTWVudUF0Q2FyZXQodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSkpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpLCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5vbnNjcm9sbCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UgPSB0aGlzXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBpZnJhbWVcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uaWZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnRcbiAgICB9XG5cbiAgICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICBjb29yZGluYXRlc1xuXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgZmFsc2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICBpZiAodHlwZW9mIGluZm8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbih0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7Y29vcmRpbmF0ZXMudG9wfXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAke2Nvb3JkaW5hdGVzLmxlZnR9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmUnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RFbGVtZW50KHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldCkge1xuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IGVsZW0gPSB0YXJnZXRFbGVtZW50XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNoaWxkTm9kZXNbcGF0aFtpXV1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbS5sZW5ndGggPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0IC09IGVsZW0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwICYmICFlbGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5wcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuXG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogdGhpcyBtYXkgbm90IGJlIG5lY2Vzc2FyeSBhbnltb3JlIGFzIHdlIGFyZSB1c2luZyBtb3VzZXVwIGluc3RlYWQgb2YgY2xpY2tcbiAgICByZXNldFNlbGVjdGlvbih0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCAhPT0gdGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LmZvY3VzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBsYWNlVHJpZ2dlclRleHQodGV4dCwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgaGFzVHJhaWxpbmdTcGFjZSwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIC8vIFRPRE86IHRoaXMgbWF5IG5vdCBiZSBuZWNlc3NhcnkgYW55bW9yZSBhcyB3ZSBhcmUgdXNpbmcgbW91c2V1cCBpbnN0ZWFkIG9mIGNsaWNrXG4gICAgICAgIC8vIHRoaXMucmVzZXRTZWxlY3Rpb24oY29udGV4dC5lbGVtZW50LCBjb250ZXh0LnNlbGVjdGVkUGF0aCwgY29udGV4dC5zZWxlY3RlZE9mZnNldClcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8odHJ1ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnRcbiAgICAgICAgbGV0IHJlcGxhY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1yZXBsYWNlZCcsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgZXZlbnQ6IG9yaWdpbmFsRXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIGxldCBteUZpZWxkID0gdGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnICdcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvblxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgdGV4dFN1ZmZpeC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlID0gbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdGV4dCArXG4gICAgICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgbXlGaWVsZC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgc3BhY2UgdG8gdGhlIGVuZCBvZiB0aGUgcGFzdGVkIHRleHRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnXFx4QTAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgdGhpcy5wYXN0ZUh0bWwodGV4dCwgaW5mby5tZW50aW9uUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyAxKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChyZXBsYWNlRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0ZUh0bWwoaHRtbCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICAgICAgICBsZXQgcmFuZ2UsIHNlbFxuICAgICAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdvcmtpbmdOb2RlQ29udGVudCA9IHNlbGVjdGVkRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtpbmdOb2RlQ29udGVudCAmJiBzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0VHJpZ2dlckluZm8obWVudUFscmVhZHlBY3RpdmUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGFsbG93U3BhY2VzKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICBsZXQgc2VsZWN0ZWQsIHBhdGgsIG9mZnNldFxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjdHguZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmZvID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoY3R4KVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0aW9uSW5mby5zZWxlY3RlZFxuICAgICAgICAgICAgICAgIHBhdGggPSBzZWxlY3Rpb25JbmZvLnBhdGhcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBzZWxlY3Rpb25JbmZvLm9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVmZmVjdGl2ZVJhbmdlID0gdGhpcy5nZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpXG5cbiAgICAgICAgaWYgKGVmZmVjdGl2ZVJhbmdlICE9PSB1bmRlZmluZWQgJiYgZWZmZWN0aXZlUmFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSAtMVxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDaGFyXG5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNvbmZpZy50cmlnZ2VyXG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlKGVmZmVjdGl2ZVJhbmdlLCBjKSA6XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxhc3RJbmRleE9mKGMpXG5cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID4gbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IGlkeFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGNcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZSA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA+PSAwICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIXJlcXVpcmVMZWFkaW5nU3BhY2UgfHxcbiAgICAgICAgICAgICAgICAgICAgL1tcXHhBMFxcc10vZy50ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxLFxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sZW5ndGgpXG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEpXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0U25pcHBldENoYXIgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQuc3Vic3RyaW5nKDAsIDEpXG4gICAgICAgICAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICcgJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJ1xceEEwJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnRyaW0oKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZWdleCA9IGFsbG93U3BhY2VzID8gL1teXFxTIF0vZyA6IC9bXFx4QTBcXHNdL2c7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxlYWRpbmdTcGFjZSAmJiAobWVudUFscmVhZHlBY3RpdmUgfHwgIShyZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogY3VycmVudFRyaWdnZXJTbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVHJpZ2dlckNoYXI6IHRyaWdnZXJDaGFyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SW5kZXhXaXRoTGVhZGluZ1NwYWNlIChzdHIsIGNoYXIpIHtcbiAgICAgICAgbGV0IHJldmVyc2VkU3RyID0gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJylcbiAgICAgICAgbGV0IGluZGV4ID0gLTFcblxuICAgICAgICBmb3IgKGxldCBjaWR4ID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgY2lkeCA8IGxlbjsgY2lkeCsrKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3RDaGFyID0gY2lkeCA9PT0gc3RyLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSAvXFxzLy50ZXN0KHJldmVyc2VkU3RyW2NpZHggKyAxXSlcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGNoYXIgPT09IHJldmVyc2VkU3RyW2NpZHhdXG5cbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiAoZmlyc3RDaGFyIHx8IGxlYWRpbmdTcGFjZSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN0ci5sZW5ndGggLSAxIC0gY2lkeFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnICYmIGVsZW1lbnQubm9kZU5hbWUgIT09ICdURVhUQVJFQSdcbiAgICB9XG5cbiAgICBnZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbihlbGVtZW50LCBwb3NpdGlvbikge1xuICAgICAgICBsZXQgcHJvcGVydGllcyA9IFsnZGlyZWN0aW9uJywgJ2JveFNpemluZycsICd3aWR0aCcsICdoZWlnaHQnLCAnb3ZlcmZsb3dYJyxcbiAgICAgICAgICAgICdvdmVyZmxvd1knLCAnYm9yZGVyVG9wV2lkdGgnLCAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgICAgICAgICAnYm9yZGVyQm90dG9tV2lkdGgnLCAnYm9yZGVyTGVmdFdpZHRoJywgJ3BhZGRpbmdUb3AnLFxuICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJywgJ3BhZGRpbmdMZWZ0JyxcbiAgICAgICAgICAgICdmb250U3R5bGUnLCAnZm9udFZhcmlhbnQnLCAnZm9udFdlaWdodCcsICdmb250U3RyZXRjaCcsXG4gICAgICAgICAgICAnZm9udFNpemUnLCAnZm9udFNpemVBZGp1c3QnLCAnbGluZUhlaWdodCcsICdmb250RmFtaWx5JyxcbiAgICAgICAgICAgICd0ZXh0QWxpZ24nLCAndGV4dFRyYW5zZm9ybScsICd0ZXh0SW5kZW50JyxcbiAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsICdsZXR0ZXJTcGFjaW5nJywgJ3dvcmRTcGFjaW5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgbGV0IGlzRmlyZWZveCA9ICh3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsKVxuXG4gICAgICAgIGxldCBkaXYgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZGl2LmlkID0gJ2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgICAgICBsZXQgc3R5bGUgPSBkaXYuc3R5bGVcbiAgICAgICAgbGV0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogZWxlbWVudC5jdXJyZW50U3R5bGVcblxuICAgICAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJ1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuXG4gICAgICAgIC8vIHRyYW5zZmVyIHRoZSBlbGVtZW50J3MgcHJvcGVydGllcyB0byB0aGUgZGl2XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IGAkeyhwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyKX1weGBcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICfCoCcpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLidcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pXG5cbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvd1RvcCArIHNwYW4ub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpIC0gZWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0ICsgc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyTGVmdFdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkucmVtb3ZlQ2hpbGQoZGl2KVxuXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oc2VsZWN0ZWROb2RlUG9zaXRpb24pIHtcbiAgICAgICAgbGV0IG1hcmtlclRleHRDaGFyID0gJ++7vydcbiAgICAgICAgbGV0IG1hcmtlckVsLCBtYXJrZXJJZCA9IGBzZWxfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIpfWBcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBwcmV2UmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbWFya2VyIGVsZW1lbnQgY29udGFpbmluZyBhIHNpbmdsZSBpbnZpc2libGUgY2hhcmFjdGVyIHVzaW5nIERPTSBtZXRob2RzIGFuZCBpbnNlcnQgaXRcbiAgICAgICAgbWFya2VyRWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIG1hcmtlckVsLmlkID0gbWFya2VySWRcbiAgICAgICAgbWFya2VyRWwuYXBwZW5kQ2hpbGQodGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVRleHROb2RlKG1hcmtlclRleHRDaGFyKSlcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShtYXJrZXJFbClcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIHNlbC5hZGRSYW5nZShwcmV2UmFuZ2UpXG5cbiAgICAgICAgbGV0IHJlY3QgPSBtYXJrZXJFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0LFxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIG1hcmtlckVsLm9mZnNldEhlaWdodCArIHdpbmRvd1RvcFxuICAgICAgICB9XG5cbiAgICAgICAgbWFya2VyRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXJrZXJFbClcbiAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgc2Nyb2xsSW50b1ZpZXcoZWxlbSkge1xuICAgICAgICBsZXQgcmVhc29uYWJsZUJ1ZmZlciA9IDIwLFxuICAgICAgICAgICAgY2xpZW50UmVjdFxuICAgICAgICBsZXQgbWF4U2Nyb2xsRGlzcGxhY2VtZW50ID0gMTAwXG4gICAgICAgIGxldCBlID0gdGhpcy5tZW51XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIHdoaWxlIChjbGllbnRSZWN0ID09PSB1bmRlZmluZWQgfHwgY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgIGNsaWVudFJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgICAgIGlmIChjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGUgPSBlLmNoaWxkTm9kZXNbMF1cbiAgICAgICAgICAgICAgICBpZiAoZSA9PT0gdW5kZWZpbmVkIHx8ICFlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbVRvcCA9IGNsaWVudFJlY3QudG9wXG4gICAgICAgIGxldCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGNsaWVudFJlY3QuaGVpZ2h0XG5cbiAgICAgICAgaWYgKGVsZW1Ub3AgPCAwKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnBhZ2VZT2Zmc2V0ICsgY2xpZW50UmVjdC50b3AgLSByZWFzb25hYmxlQnVmZmVyKVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1Cb3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgY2xpZW50UmVjdC50b3AgLSByZWFzb25hYmxlQnVmZmVyXG5cbiAgICAgICAgICAgIGlmIChtYXhZIC0gd2luZG93LnBhZ2VZT2Zmc2V0ID4gbWF4U2Nyb2xsRGlzcGxhY2VtZW50KSB7XG4gICAgICAgICAgICAgICAgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIG1heFNjcm9sbERpc3BsYWNlbWVudFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WSA9IHdpbmRvdy5wYWdlWU9mZnNldCAtICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBlbGVtQm90dG9tKVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0WSA+IG1heFkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRZID0gbWF4WVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGFyZ2V0WSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlUmFuZ2U7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL21hdHR5b3JrL2Z1enp5XG5jbGFzcyBUcmlidXRlU2VhcmNoIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnNlYXJjaCA9IHRoaXNcbiAgICB9XG5cbiAgICBzaW1wbGVGaWx0ZXIocGF0dGVybiwgYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbHRlcihzdHJpbmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVzdChwYXR0ZXJuLCBzdHJpbmcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGVzdChwYXR0ZXJuLCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2gocGF0dGVybiwgc3RyaW5nKSAhPT0gbnVsbFxuICAgIH1cblxuICAgIG1hdGNoKHBhdHRlcm4sIHN0cmluZywgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICBsZXQgcGF0dGVybklkeCA9IDAsXG4gICAgICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgICAgIGxlbiA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0b3RhbFNjb3JlID0gMCxcbiAgICAgICAgICAgIGN1cnJTY29yZSA9IDAsXG4gICAgICAgICAgICBwcmUgPSBvcHRzLnByZSB8fCAnJyxcbiAgICAgICAgICAgIHBvc3QgPSBvcHRzLnBvc3QgfHwgJycsXG4gICAgICAgICAgICBjb21wYXJlU3RyaW5nID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHN0cmluZyB8fCBzdHJpbmcudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIGNoLCBjb21wYXJlQ2hhclxuXG4gICAgICAgIHBhdHRlcm4gPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgcGF0dGVybiB8fCBwYXR0ZXJuLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBsZXQgcGF0dGVybkNhY2hlID0gdGhpcy50cmF2ZXJzZShjb21wYXJlU3RyaW5nLCBwYXR0ZXJuLCAwLCAwLCBbXSlcbiAgICAgICAgaWYgKCFwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVuZGVyZWQ6IHRoaXMucmVuZGVyKHN0cmluZywgcGF0dGVybkNhY2hlLmNhY2hlLCBwcmUsIHBvc3QpLFxuICAgICAgICAgICAgc2NvcmU6IHBhdHRlcm5DYWNoZS5zY29yZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBzdHJpbmdJbmRleCwgcGF0dGVybkluZGV4LCBwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgLy8gaWYgdGhlIHBhdHRlcm4gc2VhcmNoIGF0IGVuZFxuICAgICAgICBpZiAocGF0dGVybi5sZW5ndGggPT09IHBhdHRlcm5JbmRleCkge1xuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgc29jcmUgYW5kIGNvcHkgdGhlIGNhY2hlIGNvbnRhaW5pbmcgdGhlIGluZGljZXMgd2hlcmUgaXQncyBmb3VuZFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzY29yZTogdGhpcy5jYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpLFxuICAgICAgICAgICAgICAgIGNhY2hlOiBwYXR0ZXJuQ2FjaGUuc2xpY2UoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgc3RyaW5nIGF0IGVuZCBvciByZW1haW5pbmcgcGF0dGVybiA+IHJlbWFpbmluZyBzdHJpbmdcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPT09IHN0cmluZ0luZGV4IHx8IHBhdHRlcm4ubGVuZ3RoIC0gcGF0dGVybkluZGV4ID4gc3RyaW5nLmxlbmd0aCAtIHN0cmluZ0luZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYyA9IHBhdHRlcm5bcGF0dGVybkluZGV4XVxuICAgICAgICBsZXQgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihjLCBzdHJpbmdJbmRleClcbiAgICAgICAgbGV0IGJlc3QsIHRlbXBcblxuICAgICAgICB3aGlsZSAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgcGF0dGVybkNhY2hlLnB1c2goaW5kZXgpXG4gICAgICAgICAgICB0ZW1wID0gdGhpcy50cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIGluZGV4ICsgMSwgcGF0dGVybkluZGV4ICsgMSwgcGF0dGVybkNhY2hlKVxuICAgICAgICAgICAgcGF0dGVybkNhY2hlLnBvcCgpXG5cbiAgICAgICAgICAgIC8vIGlmIGRvd25zdHJlYW0gdHJhdmVyc2FsIGZhaWxlZCwgcmV0dXJuIGJlc3QgYW5zd2VyIHNvIGZhclxuICAgICAgICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlc3RcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFiZXN0IHx8IGJlc3Quc2NvcmUgPCB0ZW1wLnNjb3JlKSB7XG4gICAgICAgICAgICAgICAgYmVzdCA9IHRlbXBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihjLCBpbmRleCArIDEpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmVzdFxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSkge1xuICAgICAgICBsZXQgc2NvcmUgPSAwXG4gICAgICAgIGxldCB0ZW1wID0gMVxuXG4gICAgICAgIHBhdHRlcm5DYWNoZS5mb3JFYWNoKChpbmRleCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdHRlcm5DYWNoZVtpIC0gMV0gKyAxID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IHRlbXAgKyAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NvcmUgKz0gdGVtcFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBzY29yZVxuICAgIH1cblxuICAgIHJlbmRlcihzdHJpbmcsIGluZGljZXMsIHByZSwgcG9zdCkge1xuICAgICAgICB2YXIgcmVuZGVyZWQgPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGljZXNbMF0pXG5cbiAgICAgICAgaW5kaWNlcy5mb3JFYWNoKChpbmRleCwgaSkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyZWQgKz0gcHJlICsgc3RyaW5nW2luZGV4XSArIHBvc3QgK1xuICAgICAgICAgICAgICAgIHN0cmluZy5zdWJzdHJpbmcoaW5kZXggKyAxLCAoaW5kaWNlc1tpICsgMV0pID8gaW5kaWNlc1tpICsgMV0gOiBzdHJpbmcubGVuZ3RoKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiByZW5kZXJlZFxuICAgIH1cblxuICAgIGZpbHRlcihwYXR0ZXJuLCBhcnIsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgcmV0dXJuIGFyclxuICAgICAgICAgICAgLnJlZHVjZSgocHJldiwgZWxlbWVudCwgaWR4LCBhcnIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0gZWxlbWVudFxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuZXh0cmFjdCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBvcHRzLmV4dHJhY3QoZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cikgeyAvLyB0YWtlIGNhcmUgb2YgdW5kZWZpbmVkcyAvIG51bGxzIC8gZXRjLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZW5kZXJlZCA9IHRoaXMubWF0Y2gocGF0dGVybiwgc3RyLCBvcHRzKVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldltwcmV2Lmxlbmd0aF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmc6IHJlbmRlcmVkLnJlbmRlcmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHJlbmRlcmVkLnNjb3JlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGlkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldlxuICAgICAgICAgICAgfSwgW10pXG5cbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21wYXJlID0gYi5zY29yZSAtIGEuc2NvcmVcbiAgICAgICAgICAgIGlmIChjb21wYXJlKSByZXR1cm4gY29tcGFyZVxuICAgICAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlU2VhcmNoOyIsIi8qKlxuKiBUcmlidXRlLmpzXG4qIE5hdGl2ZSBFUzYgSmF2YVNjcmlwdCBAbWVudGlvbiBQbHVnaW5cbioqL1xuXG5pbXBvcnQgVHJpYnV0ZSBmcm9tIFwiLi9UcmlidXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpXG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMFxuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXVxuICAgICAgICB2YXIgdmFsdWVcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgIH1cbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpXG4gICAgcmV0dXJuIGV2dFxuICB9XG5cbiBpZiAodHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGVcbiB9XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0iXX0=
