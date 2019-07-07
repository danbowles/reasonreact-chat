// Generated by BUCKLESCRIPT VERSION 5.0.3, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var React = require("react");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var WebsocketClient$ReactHooksTemplate = require("./WebsocketClient.bs.js");

var ws = WebsocketClient$ReactHooksTemplate.Websocket[/* make */0](undefined, "ws://localhost:3000/");

function encodeMessage(message) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                message[/* messageType */0]
              ],
              /* :: */[
                /* tuple */[
                  "content",
                  message[/* content */1]
                ],
                /* [] */0
              ]
            ]);
}

function getMessageType(typeString) {
  switch (typeString) {
    case "CONTENT_CHANGE" : 
        return /* ContentChange */1;
    case "USER_EVENT" : 
        return /* UserEvent */0;
    default:
      return /* UnknownType */2;
  }
}

function decodeMessage(json) {
  var decodeServerData = function (serverData) {
    return /* record */[
            /* chatContent */Json_decode.optional((function (param) {
                    return Json_decode.field("chatContent", Json_decode.string, param);
                  }), serverData),
            /* userActivity */Json_decode.optional((function (param) {
                    return Json_decode.field("userActivity", (function (param) {
                                  return Json_decode.array(Json_decode.string, param);
                                }), param);
                  }), serverData)
          ];
  };
  return /* record */[
          /* messageType */getMessageType(Json_decode.string(json)),
          /* serverData */decodeServerData(json)
        ];
}

function buildMessage(type_, content) {
  var typeString;
  switch (type_) {
    case 0 : 
        typeString = "USER_EVENT";
        break;
    case 1 : 
        typeString = "CONTENT_CHANGE";
        break;
    case 2 : 
        typeString = "UNKNOWN_TYPE";
        break;
    
  }
  var message = /* record */[
    /* messageType */typeString,
    /* content */content
  ];
  return Json.stringify(encodeMessage(message));
}

function App(Props) {
  WebsocketClient$ReactHooksTemplate.Websocket[/* onOpen */3](ws, (function (param) {
          WebsocketClient$ReactHooksTemplate.Websocket[/* send */6](ws, buildMessage(/* UserEvent */0, ""));
          return WebsocketClient$ReactHooksTemplate.Websocket[/* send */6](ws, buildMessage(/* ContentChange */1, "Hi"));
        }));
  WebsocketClient$ReactHooksTemplate.Websocket[/* onMessage */2](ws, (function (e) {
          console.log("Message", WebsocketClient$ReactHooksTemplate.$$MessageEvent[/* data */0](e), WebsocketClient$ReactHooksTemplate.$$MessageEvent[/* origin */1](e), e);
          console.log("rs:", WebsocketClient$ReactHooksTemplate.Websocket[/* readyState */5](ws));
          return /* () */0;
        }));
  return React.createElement("div", undefined, React.createElement("h1", undefined, "sup"));
}

var make = App;

exports.ws = ws;
exports.encodeMessage = encodeMessage;
exports.getMessageType = getMessageType;
exports.decodeMessage = decodeMessage;
exports.buildMessage = buildMessage;
exports.make = make;
/* ws Not a pure module */