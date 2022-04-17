import React from "react";

export default function AuthPage() {
    return (
        <div className="w-full h-69px justify-center flex flex-row items-center bg-candy-pink/25 border-b-2 border-pastel-brown">
            <input type='text' maxLength={6} className="px-2 mr-32px border-2 border-pastel-brown text-16px hover:border-3 hover:scale-110 outline-pastel-brown/50 text-14px rounded font-roboto-slab w-72px h-1/2"/>
            <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Join Room
            </button>
            <button className="text-14px font-roboto-slab transition-all duration-400 ease-in hover:bg-candy-pink/40 hover:h-full h-4/6 w-1/12">
                Create Room
            </button>
        </div>   
    )
}