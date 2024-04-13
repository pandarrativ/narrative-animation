# animate/__init__.py
from __future__ import absolute_import, unicode_literals

# 这将确保 Celery 应用总是被导入
# 当 Django 启动时，以便 'shared_task' 将使用这个应用
from .celery import app as celery_app

__all__ = ('celery_app',)
