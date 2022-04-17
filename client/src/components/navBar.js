import React from "react";

function NavBar(props) {

    const onclick = () =>{
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className="w-full h-69px justify-end flex flex-row items-center bg-candy-pink/25 border-b-2 border-pastel-brown">
            <p className="text-14px font-roboto-slab mr-600px w-1/12">
                ROOM CODE: <span className="text-gray-500">{sessionStorage.getItem("code")}</span>
            </p>
            <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Dark Mode
            </button>
            <button onClick = {onclick} className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Quit
            </button>
        </div>    
    )
}

export default NavBar;

