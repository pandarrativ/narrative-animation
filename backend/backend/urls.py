"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from prompt.views import openai_story_to_plot, get_plots_by_story
from prompt.views import ollama_story_to_plot

# 配置swagger各个参数
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="Animation API", 
        default_version="v1.0",
        description="REST API for Narrative Animation",
    ),
    public=True,
)

urlpatterns = [
# 这两个url配置是一定要有的，用于生成ui界面，其它url正常定义就好
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('story/add/', openai_story_to_plot, name='openai_story_to_plot'),
    path('story/get/', get_plots_by_story, name='get_plots_by_story'),
    path('story/', get_plots_by_story, name='get_plots_by_story'),
    # TODO: 测通「用户提交story」的api == ollama story to plot
    path('storytoplot/', ollama_story_to_plot, name='ollama_story_to_plot'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
