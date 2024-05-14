# prompt/tasks.py
from celery import shared_task
from .mongo_dal import MongoDAL
from .openai_api import OpenAIAPI
import logging
import prompts

logger = logging.getLogger('prompt_logger')

@shared_task
def generate_plot_and_update_story(story_id, title, content):
    
    # 构建OpenAI API请求的prompt
    prompt = prompts.STORY_TO_PLOT + f"{title}\n\n{content}"
    reply = OpenAIAPI.send_prompt(prompt)
    
    # 将OpenAI API返回的结果拆分为一个plot列表
    plot_list = reply.split("\n\n")
    
    # 更新数据库中 story 的 plot_list
    logger.info(f"Updating story {story_id} with plot list {plot_list}")
    story_id = MongoDAL.update_story(story_id, plot_list)
    
    # 更新数据库中 story 的状态为 True，表示处理完成
    MongoDAL.update_story_status(story_id, True)
    logger.info(f"Succssully updated story {story_id} with plot list {plot_list}")
    
    return str(story_id)


