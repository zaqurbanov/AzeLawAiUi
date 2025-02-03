import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { Atom } from "react-loading-indicators";
const AiChat = () => {
  const [ask, setAsk] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [chatArea, setChatArea] = useState();
  const baseUrl = "https://azelawai.onrender.com/"
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
      const response = await axios.post(`${baseUrl}ask`, data);
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
          `${baseUrl}history/${sessionId}`
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
    <div className="w-full ">
      <div className="min-h-[60vh]">
        {chatArea?.data.map((data) => {
          return (
            <div className="p-5 " key={data._id}>
              <div className="flex w-full items-stretch gap-2">
                <p className="font-semibold ">YOU:</p>
                <p className="p-5 bg-amber-100 w-full rounded-2xl">
                  {data?.userMessage}
                </p>
              </div>

              <div className="p-5 flex  gap-2 flex-row-reverse flex-wrap">
                <p className=" font-semibold text-end">LAW_AI</p>
                <p className=" bg-blue-50 p-5 rounded-4xl shadow-2xl">
                  {data.botMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <div className="flex items-center justify-center"><Atom color="#32cd32" size="medium" text="" textColor="" /></div>}
      <div className=" w-full p-8">
        <textarea
          type="text"
          value={ask}
          onChange={(e) => {
            setAsk(e.target.value);
          }}
          className="w-full  h-36 border rounded-2xl p-2 shadow-2xl  "
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
