import { useState } from "react";
import "./wood-panel.css"
import iconWoodPanel from "./imgs/woodpanel.png";
import iconMouse from "./imgs/mouse.svg";

function WoodPanel({value, onValueChange, onClickSend, }) {
    const [isExpand, setIsExpand] = useState(false);

    return ( 
        <div className={`wood-panel ${isExpand ? "wood-panel-expand": ""}`}>
            <img src={iconWoodPanel} alt="a wood panel" className="wood-panel-img"></img>
            <button className="wood-panel-mouse hover:cursor-pointer shadow-card" onClick={() => setIsExpand(!isExpand)}>
                <img src={iconMouse} alt="a mouse to click"></img>
            </button>
            <div className="wood-panel-body flex flex-col justify-between items-center">
                <textarea className="gray-text-area h-64 w-full shadow-card" placeholder="Enter your prompt... " value={value} onChange={(e) => onValueChange(e.target.value)}></textarea>
                <button className="btn-white-1 font-monofett text-h3 shadow-card" onClick={onClickSend}>CONTINUE</button>
            </div>
        </div>
     );
}

export default WoodPanel;