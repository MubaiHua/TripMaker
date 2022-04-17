import { waitFor } from "@testing-library/react";
import React from "react";

function NavBar(props) {

    function displayDropdown() {
        document.getElementById("Dropdown").classList.remove('hidden');
        document.getElementById("Dropdown").classList.add('translate-y-2');
    }

    return (
        <div className="w-full h-69px justify-end flex flex-row items-center bg-candy-pink/25 border-b-2 border-pastel-brown">
            <p className="text-14px font-roboto-slab mr-600px w-1/12">
                ROOM CODE: <p className="text-gray-500">code</p>
            </p>
            <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
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