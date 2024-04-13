from django.db import models

# 使用pymongo后不再需要写model
# class OpenAIStory(models.Model):
#     prompt = models.TextField()
#     response = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True) 

#     def __str__(self):
#         return f"Chat on {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"

# ''' 
# TODO:
# collection1 - story
# story_id | story | list of plot 
# '''
# class Story(models.Model):
#     story = models.TextField()
#     plot = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Story on {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
