import ollama
import os
from dotenv import load_dotenv  # 确保你已经安装了python-dotenv库

# 加载环境变量
load_dotenv()
print("API Key:", os.getenv("OPENAI_API_KEY"))
print("API Version:", os.getenv("OPENAI_API_VERSION"))
print("API Endpoint:", os.getenv("OPENAI_API_ENDPOINT"))


class OllamaAPI:
    

    # TODO: 使用环境变量中的值初始化client
    # client = openai.AzureOpenAI(
    #     api_key = os.getenv("OPENAI_API_KEY"),
    #     api_version = os.getenv("OPENAI_API_VERSION"),
    #     azure_endpoint = os.getenv("OPENAI_API_ENDPOINT"),
    # )

    @staticmethod
    def get_response(prompt):
        response = ollama.chat(model='llama3', messages=[
        {
            'role': 'user',
            'content': prompt,
        },
        ])
        return response['message']['content']