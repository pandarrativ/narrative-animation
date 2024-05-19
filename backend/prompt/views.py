from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .mongo_dal import MongoDAL
import logging # 引入logging模块
from bson import ObjectId # 用于将字符串转换为ObjectId
# from celery import shared_task # 引入shared_task装饰器,执行异步任务
from .tasks import generate_plot_and_update_story, ollama_generate_plot, ollama_generate_elements
import json

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
        logger.info(f"[LOG] Creating new story with title {title} and content {content}")
        story_id = str(MongoDAL.create_undo_story(title, content))
        
        # 通过openai api获得plot_list，添加到story中。异步执行任务，不等待完成
        generate_plot_and_update_story.delay(story_id, title, content)
        
        # 立即返回story_id
        return JsonResponse({"message": "getting response from openai...", "story_id": story_id})
    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."})

@csrf_exempt
def get_plots_by_story(request):
    if request.method == 'GET':
        # 获取请求中的story_id
        story_id = request.GET.get('story_id', '')
        
        # 从数据库中获取story
        story = MongoDAL.get_story_entry(ObjectId(story_id))
        
        if story.status == False:
            return JsonResponse({"error": "Story is still processing."})

        # 返回story的plots
        return JsonResponse({"plots": story["list_plots"]})
    else:
        return JsonResponse({"error": "This endpoint only supports GET requests."})
    
@csrf_exempt
def ollama_story_to_plot(request):
    '''
    Given a story, convert to plot json based on ollama model
    '''
    if request.method == 'POST':
        # get story from request
        content = json.loads(request.body).get('content')
        # print(f"content is {content}\n")
        user_prompt = json.loads(request.body).get('prompt')
        
        logger.info(f"[LOG] Creating new story with title content {content}")
        # async processing
        logger.info(f"[LOG] Starting to call llm api")
        story_id = ollama_generate_plot(content, user_prompt) # return the story id for the converted stroy
        logger.info(f"[LOG] Retrieved result")
        
        # return without waiting for completion TODO: loading page
        return JsonResponse({"message": "Finished processing story.", "story_id": story_id})
    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."})

@csrf_exempt
def ollama_get_plots(request, story_id):
    if request.method == 'GET':
        logger.info(f"[LOG] Received GET plots request.")
        
        # 从数据库中获取story
        story_entry = MongoDAL.get_story_entry(ObjectId(story_id))

        if story_entry['status'] == False:
            return JsonResponse({"error": "Story is still processing."})

        # 返回story的plots
        return JsonResponse({"plots": story_entry["list_plots"]}) # a json string
    else:
        return JsonResponse({"error": "This endpoint only supports GET requests."})


@csrf_exempt
def ollama_plots_to_elements(request):
    '''
    Given a list of plots, convert them to animation elements based on ollama model
    '''
    # TODO: test
    if request.method == 'POST':
        # get story from request
        logger.info(f"[LOG] Received POST request to generate elements.")
        plots = json.loads(request.body).get('plots')
        story_id = json.loads(request.body).get('story_id')
        
        logger.info(f"[LOG] Starting to call llm api to generate elements.")
        ollama_generate_elements(story_id, plots) # return the story id for the converted stroy
        logger.info(f"[LOG] Elements generated for story-id={story_id}.")
        
        # return without waiting for completion TODO: loading page
        return JsonResponse({"message": "Finished processing plots", "story_id": story_id})
    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."})
    
@csrf_exempt
def ollama_get_elements(request, story_id):

    # TODO: test
    if request.method == 'GET':
        logger.info(f"[LOG] Received GET elements request.")
        
        # 从数据库中获取story
        story_entry = MongoDAL.get_story_entry(ObjectId(story_id))

        if story_entry['status'] == False:
            return JsonResponse({"error": "Story is still processing."})

        # 返回story的elements
        return JsonResponse({"plots": story_entry["elements"]}) # a json string
    else:
        return JsonResponse({"error": "This endpoint only supports GET requests."})