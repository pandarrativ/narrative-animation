import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./story-to-plots.css";
import MessageBlock from "../../components/MessageBlock/MessageBlock";
import SimpleEditor from "../../components/WordEditor/SimpleEditor";
import WoodPanel from "../../components/WoodPanel/WoodPanel";
import bgStoryMain from "../../assets/imgs/bg-card-main.png";
import bgEditorBoard from "../../assets/imgs/card-text-board.png";
import CardSegmentWoodPanel from "../../components/CardSegmentWoodPanel/CardSegmentWoodPanel";

function StoryToPlotsPage() {
    const navigate = useNavigate();
    const [showPanel, setShowPanel] = useState(true);
    const [showSegmentModal, setShowSegmentModal] = useState(false);
    const [showmModalBGCover, setShowModalBGCover] = useState(false);
    const [promptContent, setPromptContent] = useState("");
    const [storyContent, setStoryContent] = useState("");
    const [storySegments, setStorySegments] = useState([]);

    const goLastStep = () => {
    }
    // scroll to bottom
    // const conversationBottomRef = useRef();
    const storySegmentBottomRef = useRef();

    const goNextStep = () => {
        window.location.href = '/editor/src/index-static.html';
        // navigate('/frontend/editor/src/index-static.html');
    }
    

    const renderWoodPanel = () => {
        return (
            showPanel? (
                <div id="wood-panel-block-conversation" className={'wood-slide-up'}>
                    <WoodPanel></WoodPanel>
                </div>
            )
            :
            (
                ""
            )
        );
    }

    // 2.Story
    const handleStoryChange = (story) => {
        // ok
        setStoryContent(story);
    }

    const renderStoryComponent = () => {
        return (
            <div className="card-story py-4 px-8 h-full w-full">
                <div className="flex flex-col gap-2 py-4 items-center justify-between w-full h-full relative">
                    <img src={bgEditorBoard} alt="a wood board" className="absolute h-full top-0 w-full z-[-10] shadow-thik rounded-md"></img>
                    <div className="story-board-color font-monofett text-h2 w-5/6 text-left">STORY EDITOR</div>
                    <div className="w-5/6 flex-grow shadow-card rounded-lg">
                        <SimpleEditor onDataChange={handleStoryChange}></SimpleEditor>
                    </div>
                </div>
            </div>
        )
    }


    // 3.Segments
    const StorySegmentComponent = (storySegments) => {
        
        return (     
          <div className={`card-segment py-4 px-8 h-full flex flex-col gap-2`}>
              <div className="h-full w-full flex flex-col gap-2 story-segment-gradient shadow-card rounded-lg px-4 py-4">
                  <div className="flex flex-row justify-between w-full items-center">
                      <div className="story-board-color font-monofett text-h2 w-5/6 text-left">STORY SEGMENTS</div>
                      <button 
                          className="btn-white-2 h-8 shadow-card font-monofett text-h5 whitespace-nowrap" 
                          onClick={() =>{
                              setShowSegmentModal(true);
                              setShowModalBGCover(true);
                          }}
                      >AI-Segmentation</button>
                  </div>
                  <div className="card-segments-block flex flex-row flex-grow gap-4 w-full mx-auto overflow-auto pb-4 pt-1 px-1">
                        {storySegments !== undefined ? (
                            storySegments.map((segment, index) => (
                            <MessageBlock
                                key={index}
                                openPrompt={true}
                                characters={segment.characters}
                                settings={segment.settings}
                                props={segment.props}
                                onTitleChange={() => {}}
                                onContentChange={() => {}}
                                onPromptChange={() => {}}
                                regenerateContent={() => {}}
                                onDelete={() => {}}
                            />
                            ))
                        ) : (
                            <MessageBlock openPrompt={true} />
                        )}
                      <div ref={storySegmentBottomRef}></div>
                  </div>
              </div>
          </div>     
        )
    }

    const handleClose = () => {
        setShowSegmentModal(false);
        setTimeout(() => {
            setShowModalBGCover(false);
        }, 1000);
    };

    // handle click on generate
    const handleClickSend = async () => {

        try {
            handleClose()

            // TODO: Loading page

            const response = await fetch('http://localhost:8000/storytoplot/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: storyContent,
                    prompt: promptContent
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const dataJson = await response.json();
            console.log("Response from server:", dataJson);

            const storyId = dataJson.story_id;
            // TODO: 调用 /storytoplot/{story_id} to getplots from db with this story id
            const plotResponse = await fetch(`http://localhost:8000/storytoplot/${storyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!plotResponse.ok) {
                throw new Error('Network response was not ok');
            }
    
            const plotData = await plotResponse.json();
            console.log("Plots from server:", plotData);
    
            // TODO: fill the forms with plots data
            const plots = plotData.plots;
            setStorySegments(plots.map(plot => {
                const characters = plot.characters.join('\n');
                const settings = plot.settings.join('\n');
                const props = plot.props.join('\n');
                return { characters, settings, props };
            }));

            // TODO: when hit next -> collect edited plots and call POST /plotstoelements
            // with json

        } catch (error) {
            console.error("Error submitting story:", error);
        }
    }

    const renderSegmentModal = () => {
        return (
            
            <div id="wood-panel-block-segment" className={`card-segment-wood ${showSegmentModal && 'card-segment-wood-up'}`}>
                <CardSegmentWoodPanel 
                    value={promptContent}
                    onValueChange={setPromptContent}
                    onClickSend={handleClickSend}
                    onClose={handleClose}
                >
                    
                </CardSegmentWoodPanel>
            </div>
            
        );
    }


    return ( 
        <div className="card-creation-main h-screen flex flex-col pt-16 pb-8 gap-4 relative">
            <div className="absolute h-screen w-screen left-0 top-0 z-[-100] center-full-height-img-box">
                <img src={bgStoryMain} alt="a desktop background" className="center-full-height-box-img"></img>
            </div>

            <div className="creation-main-body flex flex-row" >
                <div className="creation-body-part h-full">
                    {renderStoryComponent()}
                </div>

                <div className="creation-body-part h-full">
                    {StorySegmentComponent()}
                </div>

            </div>
            <div className="flex flex-row justify-between h-12 px-4">
                <button className="btn-white-2 font-monofett text-h3 shadow-card" onClick={goLastStep}>PREV</button>
                <button className="btn-white-2 font-monofett text-h3 shadow-card" onClick={goNextStep}>NEXT</button>
            </div>
            
            {renderWoodPanel()}
            {renderSegmentModal()}
            {showmModalBGCover && <div className="bg-modal-cover"></div>}
        </div>
     );
}

export default StoryToPlotsPage;