import datetime
from utils import get_db_handle

# mongo_dal.py

from pymongo import MongoClient
from django.conf import settings

class MongoDAL:
    def __init__(self):
        self.client = settings.MONGO_CLIENT
        self.db = self.client['your_db_name']

    def get_collection_handle(self, collection_name):
        return self.db[collection_name]

    # 添加你的数据crud操作
    
    # 查找故事，返回故事对象
    def get_story_entry(id):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        return stories_collection.find_one({'_id': id})
    
    # 创建一个plot_list为空的故事
    def create_undo_story(title, content):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        story = {"title": title, "content": content, "list_plots": [], "user_id": "SampleAdmin", "created_at": datetime.datetime.now(), "status": False}
        return stories_collection.insert_one(story).inserted_id
    
    # 更新故事的plot_list
    def update_story(story_id, plot_list):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        stories_collection.update_one({'_id': story_id}, {"$set": {"list_plots": plot_list}})

    # 根据title, content, plot_list，添加故事, 返回故事id
    def add_story(title, content, plot_list):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        story = {"title": title, "content": content, "list_plots": plot_list, "user_id": "SampleAdmin", "created_at": datetime.datetime.now(), "status": False}
        return stories_collection.insert_one(story).inserted_id
    
    # 更新故事状态
    def update_story_status(story_id, status):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        stories_collection.update_one({'_id': story_id}, {"$set": {"status": status}})

    # v2 for ollama
    
    def add_story_processed(content, plots):
        db_handle, _ = get_db_handle(db_name='animation', host='localhost', port=27017)
        stories_collection = db_handle['story']
        story = {"content": content, "list_plots": plots, "user_id": "SampleAdmin", "created_at": datetime.datetime.now(), "status": True}
        return stories_collection.insert_one(story).inserted_id
    