// Generated by BUCKLESCRIPT VERSION 5.0.3, PLEASE EDIT WITH CARE
'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

var OpenEvent = /* module */[];

var $$ErrorEvent = /* module */[];

function readyStateFromJs(param) {
  if (param <= 3 && 0 <= param) {
    return param - 0 | 0;
  }
  
}

function readyState(ws) {
  return Belt_Option.getExn(readyStateFromJs(ws.readyState));
}

function make($staropt$star, url) {
  var protocols = $staropt$star !== undefined ? $staropt$star : /* array */[];
  return new WebSocket(url, protocols);
}

function MessageEvent_000(prim) {
  return prim.data;
}

function MessageEvent_001(prim) {
  return prim.origin;
}

var $$MessageEvent = [
  MessageEvent_000,
  MessageEvent_001
];

function Websocket_001(prim, prim$1) {
  prim.onerror = prim$1;
  return /* () */0;
}

function Websocket_002(prim, prim$1) {
  prim.onmessage = prim$1;
  return /* () */0;
}

function Websocket_003(prim, prim$1) {
  prim.onopen = prim$1;
  return /* () */0;
}

function Websocket_004(prim) {
  return prim.url;
}

function Websocket_006(prim, prim$1) {
  prim.send(prim$1);
  return /* () */0;
}

var Websocket = [
  make,
  Websocket_001,
  Websocket_002,
  Websocket_003,
  Websocket_004,
  readyState,
  Websocket_006
];

exports.$$MessageEvent = $$MessageEvent;
exports.$$ErrorEvent = $$ErrorEvent;
exports.OpenEvent = OpenEvent;
exports.Websocket = Websocket;
/* No side effect */
