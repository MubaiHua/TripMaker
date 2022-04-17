import { waitFor } from "@testing-library/react";
import React from "react";

function NavBar(props) {
    
    function playAudio(url) {
        new Audio(url).play();
      }

    return (
        <div className="w-full h-69px justify-end flex flex-row items-center bg-candy-pink/25 border-b-2 border-pastel-brown">
            <p className="text-14px font-roboto-slab mr-600px w-1/12">
                ROOM CODE: <span className="text-gray-500">code</span>
            </p>
            <button onClick={playAudio("https://static.wikia.nocookie.net/valorant/images/1/18/ReynaLeerCast1.mp3/revision/latest?cb=20210617145121")} className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Dark Mode
            </button>
            <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Quit
            </button>
            <div className="text-14px font-roboto-slab justify-center text-center flex flex-col items-center border-pastel-brown h-full w-1/12">
                Hello, 
                <p className="text-gray-500">username</p>
            </div>
        </div>    
    )
}

export default NavBar;

