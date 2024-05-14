from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .mongo_dal import MongoDAL
import logging # 引入logging模块
from bson import ObjectId # 用于将字符串转换为ObjectId
# from celery import shared_task # 引入shared_task装饰器,执行异步任务
from .tasks import generate_plot_and_update_story, ollama_generate_plot


logger = logging.getLogger('prompt_logger') # 获取logger实例

'''
from story to plots.
add story to database.
'''
@csrf_exempt
# @shared_task
def openai_story_to_plot(request):
    # print(os.getenv("OPENAI_API_KEY"))  # This should print your API key. If it doesn't, the key isn't being loaded correctly.

    if request.method == 'POST':
        # 获取请求中的故事
        title = request.POST.get('title', '')
        content = request.POST.get('content', '')
        
        # 在数据库中创建新的故事记录，状态为未完成，plot_list为空
        logger.info(f"Creating new story with title {title} and content {content}")
        story_id = str(MongoDAL.create_undo_story(title, content))
        
        # 通过openai api获得plot_list，添加到story中。异步执行任务，不等待完成
        generate_plot_and_update_story.delay(story_id, title, content)
        
        # 立即返回story_id
        return JsonResponse({"message": "getting response from openai...", "story_id": story_id})
    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."})


def get_plots_by_story(request):
    if request.method == 'GET':
        # 获取请求中的story_id
        story_id = request.GET.get('story_id', '')
        
        # 从数据库中获取story
        story = MongoDAL.get_story(ObjectId(story_id))
        
        if story.status == False:
            return JsonResponse({"error": "Story is still processing."})

        # 返回story的plots
        return JsonResponse({"plots": story["list_plots"]})
    else:
        return JsonResponse({"error": "This endpoint only supports GET requests."})
    
    
def ollama_story_to_plot(request):
    '''
    Given a story, convert to plot json based on ollama model
    '''
    if request.method == 'POST':
        # get story from request
        content = request.POST.get('content', '')
        user_prompt = request.POST.get('prompt', '')
        
        logger.info(f"Creating new story with title content {content}")
        story_id = str(MongoDAL.create_undo_story("", content))
        
        # async processing
        ollama_generate_plot.delay(story_id, content, user_prompt)
        
        # return without waiting for completion TODO: loading page
        return JsonResponse({"message": "Processing story...", "story_id": story_id})
    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."})