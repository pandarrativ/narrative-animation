import { useState } from "react";
import "./message-block.css";
import iconAI from "../../assets/icons/ai.svg";

function MessageBlock({title, content, prompt, onTitleChange, onContentChange, onPromptChange, regenerateContent, onDelete, openPrompt, characters, settings, props}) {
    const [showPrompt, setShowPrompt] = useState(openPrompt === undefined ? false: openPrompt);

    return ( 
        <div className="message-block flex flex-col gap-0">
            <div className="message-block-header flex flex-row gap-2 w-full py-2 px-4 items-center">
                <input type="text" className="message-block-title font-semibold outline-none" placeholder="Plot" value={title} onChange={onTitleChange}/>
                <button className="message-block-btn" onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <textarea 
                className={`textarea-message-block text-small1 message-prompt message-prompt-show-${showPrompt}`} 
                placeholder="Characters"
                value={characters}
                onChange={onPromptChange}
            ></textarea>
            <textarea 
                className={`textarea-message-block text-small1 message-prompt message-prompt-show-${showPrompt}`} 
                placeholder="Settings"
                value={settings}
                onChange={onPromptChange}
            ></textarea>
            <textarea 
                className={`textarea-message-block text-small1 message-prompt message-prompt-show-${showPrompt}`} 
                placeholder="Props"
                value={props}
                onChange={onPromptChange}
            ></textarea>
            <div className="flex flex-row gap-2 justify-between py-1 px-4 items-center message-block-btns">
                <button className="message-block-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </button>
                <button className="message-block-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
                <div className="flex-grow"></div>

                {showPrompt ? 
                    <button className="message-block-btn" onClick={regenerateContent}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                    :
                    ""
                }

                <button className="message-block-btn" onClick={() => setShowPrompt(!showPrompt)}>
                    <img src={iconAI} alt="click to show ai prompt" className="w-3 h-3 m-[0.125rem]"></img>
                </button>
            </div>
        </div>
     );
}

export default MessageBlock;