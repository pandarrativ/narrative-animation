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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('story/add/', openai_story_to_plot, name='openai_story_to_plot'),
    path('story/get/', get_plots_by_story, name='get_plots_by_story'),
    path('story/', get_plots_by_story, name='get_plots_by_story'),
    path('storytoplot/', ollama_story_to_plot, name='ollama_story_to_plot')
    # path('storytoplot/', get_plots_by_story, name='get_plots_by_story')
]
