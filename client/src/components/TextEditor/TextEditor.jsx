import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import { io } from "socket.io-client";

import { SiStreamlabs } from "react-icons/si";
import { SiGooglemeet } from "react-icons/si";
import { RiChatNewLine } from "react-icons/ri";

import { useParams } from "react-router-dom";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

import ChatBox from "../ChatBox/ChatBox";
export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  // console.log(documentId);

  // text-editor tool bar and editor
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);

    //{
    /*it will show error because useffect render before the set of the ref  */
    // return () => {
    //   wrapperRef.innerHTML = " ";
    // }
  }, []);

  //socket connection
  useEffect(() => {
    const s = io("http://localhost:8000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // detect the changing in quill
  useEffect(() => {
    if (quill == null || socket == null) return;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-change", delta);
    });
    return () => {
      quill.off("text-change", (delta, oldDelta, source) => {
        if (source !== "user") return;
        socket.emit("send-change", delta);
      });
    };
  }, [socket, quill]);

  // server to user send changes
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.on("receive-change", (delta) => {
      quill.updateContents(delta);
    });
    return () => {
      socket.off("receive-change", (delta) => {
        quill.updateContents(delta);
      });
    };
  }, [socket, quill]);

  // Handling multiple document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.emit("get-document", documentId);

    //server send the docs
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
  }, [socket, quill, documentId]);

  //save data
  useEffect(() => {
    if (socket == null && quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [quill, socket]);

  return (
    <div className="main">
      <div className="sidebar">
        <div className="collebrative">
          <div className="chat">
            <RiChatNewLine />
          </div>
          <div className="stream">
            <SiStreamlabs />
          </div>
          <div className="meet">
            <SiGooglemeet />
          </div>
        </div>
        <div>
          <ChatBox />
        </div>
      </div>
      <div className="editor">
        <div className="container" ref={wrapperRef}></div>
      </div>
    </div>
  );
}
