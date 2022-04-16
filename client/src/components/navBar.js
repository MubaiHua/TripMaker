import React from "react";

function NavBar(props) {
    return (
        <div className="h-full m-auto">
            <div className="w-full h-60px justify-end rounded-md flex flex-row items-center bg-sky-50">
                <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-sky-200 hover:h-full hover:rounded-none h-4/6 w-1/12 rounded-md">
                    Other
                </button>
                <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-sky-200 hover:h-full hover:rounded-none h-4/6 w-1/12 rounded-md">
                    Leave
                </button>
                <div className="text-14px font-roboto-slab justify-center text-center flex items-center hover:bg-sky-100 h-full w-1/12">
                    Hello, 
                    <br/>
                    username
                </div>
            </div>
        </div>       
    )
}

export default NavBar;