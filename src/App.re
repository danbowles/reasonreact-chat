open WebsocketClient;

let ws = Websocket.make("ws://localhost:3000/", ~protocols=[| "protocolOne" |]);

[@react.component]
   let make = (_) => {
    Websocket.onOpen(ws, (_) => Websocket.send(ws, "SENT!"));
     <h1>
       {ReasonReact.string("sup")}
     </h1>;
   };
   