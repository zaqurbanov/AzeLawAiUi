import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
const AiChat = () => {
  const [ask, setAsk] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [chatArea, setChatArea] = useState();
  const handleAskClick = async () => {
    const data = {
      question: ask,
      session_id: sessionId,
    };
    try {
        if(ask === "" || !ask.trim()){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Boş sual olmaz!",
              });
            return
        }
        setLoading(true);
      const response = await axios.post("http://localhost:3333/ask", data);
      if (response.status === 200) {
        const data = response?.data;

        setLoading(false);
        setAsk("")
        setSessionId(data.sessionId);
      }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Boş sual olmaz!",
          });
    }
  };
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/history/${sessionId}`
        );
        if (response.status === 200) {
          const data = response?.data;
          
          setChatArea(data);
        }
      } catch (error) {}
    };

    fetchApi();
  }, [loading]);
  
  
  return (
    <div className="w-full font-mono">
      <div className="min-h-[60vh]">
        {chatArea?.data.map((data) => {
          return (
            <div className="p-5">
              <div className="">
                <p className="font-semibold">YOU:</p>
                <p className="p-5 bg-amber-100 rounded-3xl">
                  {data?.userMessage}
                </p>
              </div>

              <div className="p-5">
                <p className=" font-semibold text-end">bot:</p>
                <p className=" bg-blue-50 p-5 rounded-4xl shadow-2xl">
                  {data.botMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <h1>LOADINGGGGGGG...</h1>}
      <div className=" w-full p-8">
        <textarea
          type="text"
          value={ask}
          onChange={(e) => {
            setAsk(e.target.value);
          }}
          className="w-full  h-36 border shadow-2xl  "
        />
        <button
          className="cursor-pointer p-2 mt-2 w-full bg-blue-300"
          onClick={() => handleAskClick()}
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default AiChat;
