import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Atom } from "react-loading-indicators";
const AiChat = () => {
  const [ask, setAsk] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [chatArea, setChatArea] = useState([]);
  const [isDisabledBtn,setIsDisabledBtn] = useState(false)
  const [displayedMessage,setDisplayedMessage] = useState("")
  const [isTyping,setIsTyping] = useState(false)
  
  const baseUrl = "https://azelawai.onrender.com/";
  // const baseUrl = "http://localhost:3333/"




  const formatBoldText = (text)=>{
    return text.replace(/\*\*(.*?)\*\*/g, "<strong style='color: #1E40AF'>$1</strong>");
  }
  const handleAskClick = async () => {

    
    const data = {
      question: ask, 
      session_id: sessionId,
    };
    
    try{

      if(ask ==="" || !ask.trim()){
        Swal.fire({
          icon: "error",
           title: "Oops...",
           text: "Boş sual olmaz!",
        })
        return; 
      }
      setIsDisabledBtn(true)
      setLoading(true)
      
      const response  = await fetch(`${baseUrl}ask`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let fullResponse  = ""
      let index = 0
      setChatArea(prev=>[...(prev||[]),{userMessage:ask,botMessage:""}])
      while(true){
        const {value,done} = await reader.read()
        if (done) break;

        let chunkText = decoder.decode(value)
        if(index ==0){
          const firstLineIndex = chunkText.indexOf("\n")
          const getSessionId = chunkText.slice(0,firstLineIndex)
          const parsedSessionId = JSON.parse(getSessionId)
          
          setSessionId(parsedSessionId.sessionId)
          
          chunkText = chunkText.slice(firstLineIndex+1)
        }      
          

        
        fullResponse+=chunkText
        setChatArea(prev=>{
          const updatedMessages = [...prev]
          updatedMessages[updatedMessages.length-1].botMessage = fullResponse
          return updatedMessages
        })
        
        
        index++
        
      }
      setAsk("")
    }

    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }finally{
      setLoading(false)
      setIsDisabledBtn(false)
      
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        if(sessionId){
          const response = await axios.get(`${baseUrl}history/${sessionId}`);
          if (response.status === 200) {
            const data = response?.data;
            
  
            setChatArea(data.data);
          }

        }
      } catch (error) {}
    };

    fetchApi();
  }, []);

  return (
    <div className="w-full ">
      <div className="min-h-[60vh]">
        {chatArea?.map((data,index) => {
          return (
            <div className="p-5 " key={index}>
              <div className="flex items-start w-full gap-2.5">
                <div className="flex flex-col w-full  leading-1.5 shadow p-4 border-gray-200  bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      YOU
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {data?.userMessage}
                  </p>
                </div>
              </div>

              <div className="flex items-start w-full gap-2.5 mt-9">
                <div className="flex flex-col w-full  leading-1.5 shadow-xl p-4 border-gray-500 bg-gray-200 rounded-s-2xl rounded-ee-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 justify-end">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    LAW_AI
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                  </div>
                  <p className="text-sm font-semibold py-2.5 text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{__html:formatBoldText(data?.botMessage)}}
                  >
                    
                    {/* {data?.botMessage} */}
                  </p>
                    
                </div>
              </div>

           

             
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <Atom color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className=" w-full p-8">
        <textarea
          type="text"
          value={ask}
          onChange={(e) => {
            setAsk(e.target.value);
          }}
          disabled={isDisabledBtn}
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here... "
        />
        <button
          className={`cursor-pointer p-2 mt-2 w-full  text-white ${isDisabledBtn ?"bg-blue-300" :"bg-blue-700"}  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          onClick={() => handleAskClick()}
          disabled={isDisabledBtn}
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default AiChat;
