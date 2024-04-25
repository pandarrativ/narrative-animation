import iconWoodPanel from "./imgs/woodpanel.png";

function CardSegmentWoodPanel({value, onValueChange, onClickSend, onClose }) {
    return ( 
        <div className="wood-panel wood-panel-expand">
            <img src={iconWoodPanel} alt="a wood panel" className="wood-panel-img"></img>
            <button className="wood-panel-mouse hover:cursor-pointer shadow-card font-monofett" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="wood-panel-body flex flex-col justify-between items-center">
                <textarea className="gray-text-area h-64 w-full shadow-card" placeholder="Enter your prompt... " value={value} onChange={(e) => onValueChange(e.target.value)}></textarea>
                <button className="btn-white-1 font-monofett text-h3 shadow-card" onClick={onClickSend}>Generate</button>
            </div>
        </div>
     );
}

export default CardSegmentWoodPanel;