import React from "react";
import axios from "axios";

export default function AuthPage() {

    const [code, setCode] = React.useState("");

    const handleJoinRoom = async () => {
        const config = { headers: { "Content-Type": "application/json" } };
      const body = { code };
      const res = await axios.post(
        "http://localhost:8080/api/mapRoutes/findCode",
        body,
        config
      );
      if(res.data.status === "found"){
        sessionStorage.setItem("code", code);
        window.location.href = "main";
      }
      else{
          alert("Code doesn't exist!");
      }
    }

    const handleCreateRoom = async () => {
        const config = { headers: { "Content-Type": "application/json" } };
      const body = { code };
      const res = await axios.post(
        "http://localhost:8080/api/mapRoutes/findCode",
        body,
        config
      );
      if(res.data.status === "found"){
        alert("Code already exist!");
      }
      else{
        const config = { headers: { "Content-Type": "application/json" } };
        const body = { code };
        const res = await axios.post(
          "http://localhost:8080/api/mapRoutes/createMap",
          body,
          config
        );
        sessionStorage.setItem("code", code);
        window.location.href = "main";
      }
    }

    function handleChange(event) {
        setCode(event.target.value);
    }

    return (
        <div className="w-full h-69px justify-center flex flex-row items-center bg-candy-pink/25 border-b-2 border-pastel-brown">
            <input type='text' placeholder="code" value={code} maxLength={6} onChange = {handleChange} className="px-2 mr-32px border-2 border-pastel-brown text-16px hover:border-3 hover:scale-110 outline-pastel-brown/50 text-14px rounded font-roboto-slab w-72px h-1/2"/>
            <button onClick = {handleJoinRoom} className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Join Room
            </button>
            <button onClick = {handleCreateRoom}className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Create Room
            </button>
        </div>   
    )
}