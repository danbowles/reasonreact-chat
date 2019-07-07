open WebsocketClient;
open Json.Decode;

let ws = Websocket.make("ws://localhost:3000/");

type t = Foo | Bar;

type messageType =
  | UserEvent
  | ContentChange
  | UnknownType;

type serverData = {
  chatContent: option(string),
  userActivity: option(array(string)),
};

type clientMessage = {
  messageType: string,
  content: string,
};

type serverMessage = {
  messageType,
  serverData,
}

let encodeMessage = (message: clientMessage) =>
  Json.Encode.(
    object_([
      ("type", string(message.messageType)),
      ("content", string(message.content)),
    ])
  );

let getMessageType = (typeString) => {
  switch(typeString) {
    | "USER_EVENT" => UserEvent
    | "CONTENT_CHANGE" => ContentChange
    | _ => UnknownType
    };
}

let decodeMessage = (json) => {
  let decodeType = json => string(json) |> getMessageType;
  let decodeServerData = serverData =>
    Json.Decode.{
      chatContent: serverData |> optional(field("chatContent", string)),
      userActivity: serverData |> optional(field("userActivity", array(string))),
    };
  Json.Decode.{
    messageType: json |> decodeType,
    serverData: json |> decodeServerData,
  };
}

let buildMessage = (type_, content) => {
  let typeString =
    switch(type_) {
    | UserEvent => "USER_EVENT";
    | ContentChange => "CONTENT_CHANGE";
    | _ => "UNKNOWN_TYPE";
    };
  let message = {
    messageType: typeString,
    content,
  };
  message
  |> encodeMessage
  |> Json.stringify;
};

[@react.component]
   let make = (_) => {
    Websocket.onOpen(ws, (_) => {
      Websocket.send(ws, buildMessage(UserEvent, ""));
      Websocket.send(ws, buildMessage(ContentChange, "Hi"));
    });
    Websocket.onMessage(ws, e => {
      Js.log4("Message", MessageEvent.data(e), MessageEvent.origin(e), e);
      Js.log2("rs:", Websocket.readyState(ws));
  });
    <div>
      <h1>
        {ReasonReact.string("sup")}
      </h1>
    </div>
   };
   