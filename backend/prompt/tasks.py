# prompt/tasks.py
from celery import shared_task
from .mongo_dal import MongoDAL
from .openai_api import OpenAIAPI
from .ollama_api import OllamaAPI
import logging
from .prompts import STORY_TO_PLOT, PLOT_TO_ANIMATION_ELEMENTS
from utils import extract_json

logger = logging.getLogger('prompt_logger')

@shared_task
def generate_plot_and_update_story(story_id, title, content):
    
    # construct prompt
    prompt = STORY_TO_PLOT + f"{title}\n{content}"
    reply = OpenAIAPI.send_prompt(prompt)
    
    # 将OpenAI API返回的结果拆分为一个plot列表
    plot_list = reply.split("\n\n")
    
    # 更新数据库中 story 的 plot_list
    logger.info(f"[LOG] Updating story {story_id} with plot list {plot_list}")
    story_id = MongoDAL.update_story(story_id, plot_list)
    
    # 更新数据库中 story 的状态为 True，表示处理完成
    MongoDAL.update_story_status(story_id, True)
    logger.info(f"[LOG] Succssully updated story {story_id} with plot list {plot_list}")
    
    return str(story_id)

# sync
# @shared_task
def ollama_generate_plot(content: str, user_prompt: str):
    '''
    Given a story, return plots in json format.
    
    Params
    - content: story content
    - user_prompt: additional prompt provided by user
    '''
    
    # construct prompt
    prompt = STORY_TO_PLOT + f"The story is {content}. Please generate the json according to the requirements" 
    # + f"\nAdditional requirements: user_prompt {user_prompt if len(user_prompt) != 0 else 'none'}"
    
    reply = OllamaAPI.get_response(prompt)
    
    # convert reply to json str
    logger.info(f"[LOG] Got response from ollama, starting extracting json.\n")
    plots_json = extract_json(reply)
    if (plots_json is None):
        logger.info(f"[LOG] Reply is null, quitting.")
        return None

    # 更新数据库中 story 的 plot_list
    logger.info(f"[LOG] Extracted Json, start adding story with plots to mongodb.\n")
    story_id = MongoDAL.add_story_processed(content, plots_json) 
    logger.info(f"[LOG] Added story {story_id} with plots.\n")
    
    return str(story_id)

def ollama_generate_elements(story_id:str, plots: str):
    '''
    Convert plots to animation elements.
    '''
    # TODO: impl -> prompt engineering
    # construct prompt
    prompt = f"Now I have a JSON file containing information for each plot:\n```json\n{plots}\n```" \
        + PLOT_TO_ANIMATION_ELEMENTS
    
    # send prompt to llm and get reply
    reply = OllamaAPI.get_response(prompt)
    
    # convert reply to json
    logger.info(f"[LOG] Got response from ollama, starting extracting json.\n")
    elements_json = extract_json(reply)
    # logger.info(f"[LOG] Got response from ollama, elements = {elements_json}\n")
    if (elements_json is None):
        logger.info(f"[LOG] Reply is null, quitting.")
        return None
    
    # update into database
    logger.info(f"[LOG] Updating story {story_id} with elements.\n")
    # TODO: dal update elements
    MongoDAL.update_elements(story_id, elements_json)
    logger.info(f"[LOG] DB entry updated.\n")

    return story_id
