import React from "react";

function LeftMenu(props) {
    return (
        <div className="h-full w-1/3 bg-pastel-brown/50 p-20px">
            <div className="font-roboto-slab mb-5px">
                Search for Destination
            </div>
            <form className="flex flex-col">
                <input type="text" className="hidden text-14px pl-5px font-roboto-slab border-2 border-pastel-brown-40 h-32px"/>
            </form>
        </div>
    )
}



export default LeftMenu;