"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getIterator = require('get-iterator');

var toIterable = require('pull-stream-to-async-iterator');

function toPull(source) {
  source = getIterator(source);
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(end, cb) {
        var next;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!end) {
                  _context.next = 11;
                  break;
                }

                if (!source["return"]) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return source["return"]();

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", cb(_context.t0));

              case 10:
                return _context.abrupt("return", cb(end));

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return source.next();

              case 14:
                next = _context.sent;
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t1 = _context["catch"](11);
                return _context.abrupt("return", cb(_context.t1));

              case 20:
                if (!next.done) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", cb(true));

              case 22:
                cb(null, next.value);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 7], [11, 17]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

toPull.source = toPull;

toPull.transform = toPull.through = function (source) {
  return function (read) {
    return toPull(source(toIterable(read)));
  };
};

toPull.duplex = function (duplex) {
  return {
    sink: toPull.sink(duplex.sink),
    source: toPull(duplex.source)
  };
};

toPull.sink = function (sink) {
  return function (read) {
    var _sink;

    sink((_sink = {}, _defineProperty(_sink, Symbol.asyncIterator, function () {
      return this;
    }), _defineProperty(_sink, "next", function next() {
      return new Promise(function (resolve, reject) {
        read(null, function (end, value) {
          if (end === true) return resolve({
            done: true,
            value: value
          });
          if (end) return reject(end);
          resolve({
            done: false,
            value: value
          });
        });
      });
    }), _defineProperty(_sink, "return", function _return() {
      return new Promise(function (resolve, reject) {
        read(true, function (end, value) {
          if (end && end !== true) return reject(end);
          resolve({
            done: true,
            value: value
          });
        });
      });
    }), _defineProperty(_sink, "throw", function _throw(err) {
      return new Promise(function (resolve, reject) {
        read(err, function (end, value) {
          if (end && end !== true) return reject(end);
          resolve({
            done: true,
            value: value
          });
        });
      });
    }), _sink));
  };
};

module.exports = toPull;
