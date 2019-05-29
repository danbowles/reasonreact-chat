/*module Impl = (T: {type t;}) => {
  [@bs.get] external type_ : T.t => string = "type";
};

module MessageEvent = {
  type t;
  type data('a);

  include Impl({ type nonrec t = t; });

  [@bs.get] external data : t => data('a) = "data";
  [@bs.get] external type_ : t => string = "type";
};


module Websocket = {
  exception UnknownReadyState(int)

  type readyState = Connecting | Open | Closing | Closed;

  type binaryType =
    | Blob
    | ArrayBuffer;

  type protocols = array(string);

  type t('msg) = {.
    [@bs.set] "binaryType": string,
    [@bs.set] "onopen": MessageEvent.t => unit,
    [@bs.set] "onerror": MessageEvent.t => unit,
    /* [@bs.set] "onclose": CloseEvent.t => unit, */
  };

  [@bs.new] external make_: (string, protocols)  => t('msg) = "WebSocket";

  let readyState = ws =>
    switch(ws##readyState) {
    | 0 => Connecting
    | 1 => Open
    | 2 => Closing
    | 3 => Closed
    | n => raise(UnknownReadyState(n));
    };

    let make = (~protocols=[||], url) => make_(url, protocols);
    let close = (
      ~code=Js.undefined,
      ~reason=Js.undefined,
      ws
    ) => ws##close(code, reason);
    let onOpen = (ws, handler) => ws##onopen #= handler;
    let onError = (ws, handler) => ws##onerror #= handler;
    let onClose = (ws, handler) => ws##onclose #= handler;
    let onMessage = (ws, handler) => ws##onmessage #= handler;
    let send = (ws, msg) => ws##send(msg);
    let setBinaryType = (ws, binaryType) => 
      switch binaryType {
      | Blob => ws##binary #= "blob"
      | ArrayBuffer => ws##binary #= "arraybuffer"
      }
} */

type t;
module OpenEvent = { type t; };
module Websocket = {
  type protocols = array(string);

  [@bs.set] external onOpen: t => (OpenEvent.t => unit) => unit = "onopen";
  [@bs.send] external send: t => string => unit = "";  
  [@bs.new] external make_: (string, protocols)  => t = "WebSocket";

  let make = (~protocols=[||], url) => make_(url, protocols);
}
