import openai
import os
from dotenv import load_dotenv  # 确保你已经安装了python-dotenv库

# OpenAIAPI 类定义
# 加载环境变量
load_dotenv()
print("API Key:", os.getenv("OPENAI_API_KEY"))
print("API Version:", os.getenv("OPENAI_API_VERSION"))
print("API Endpoint:", os.getenv("OPENAI_API_ENDPOINT"))


class OpenAIAPI:
    
    # 使用环境变量中的值初始化OpenAI客户端
    client = openai.AzureOpenAI(
        api_key = os.getenv("OPENAI_API_KEY"),
        api_version = os.getenv("OPENAI_API_VERSION"),
        azure_endpoint = os.getenv("OPENAI_API_ENDPOINT"),
    )

    @staticmethod
    def send_prompt(prompt, model = "gpt-35-turbo", is_json=False):
        if is_json:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, # model = "deployment_name".
                response_format={ "type": "json_object" },
                messages=[{"role": "user", "content": prompt}]
            )
        else:
            response = OpenAIAPI.client.chat.completions.create(
                model= model, # model = "deployment_name".
                messages=[{"role": "user", "content": prompt}]
            )
        
        resp =response.choices[0].message.content
        return resp
