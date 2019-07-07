module OpenEvent = { type t; };
module ErrorEvent = { type t; };
module MessageEvent = {
  type t;

  [@bs.get] external data: t => string = "";
  [@bs.get] external origin: t => string = "";
}
module Websocket = {
  type t;

  type protocols = array(string);

  [@bs.set] external onOpen: t => (OpenEvent.t => unit) => unit = "onopen";
  [@bs.set] external onMessage: t => (MessageEvent.t => unit) => unit = "onmessage";
  [@bs.set] external onError: t => (ErrorEvent.t => unit) => unit = "onerror";
  [@bs.send] external send: t => string => unit = "";
  [@bs.get] external readyState: t => int = "";
  [@bs.get] external url: t => string = "";

  [@bs.new] external make_: (string, protocols)  => t = "WebSocket";

  [@bs.deriving jsConverter]
  type readyState =
    |  [@bs.as 0] Connecting
    |  [@bs.as 1] Open
    |  [@bs.as 2] Closing
    |  [@bs.as 3] Closed;

  let readyStateString = (ws) =>
    switch(readyState(ws)) {
    | 0 => "connecting"
    | 1 => "open"
    | 2 => "closing"
    | 3 => "closed"
    | _ => "unknown"
    };
  let readyState = (ws) => readyState(ws)
    |> readyStateFromJs
    |> Belt.Option.getExn;

  let make = (~protocols=[||], url) => make_(url, protocols);
}
