# backend/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# 设置 Django 的默认设置模块
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# 从 Django 的设置文件中加载 Celery 配置
app.config_from_object('django.conf:settings', namespace='CELERY')

# 自动发现并加载任务
app.autodiscover_tasks()
