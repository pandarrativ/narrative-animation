from pymongo import MongoClient
import regex

def get_db_handle(db_name, host, port):

    client = MongoClient(host=host,
                        port=int(port)
                        #username=username,
                        #password=password
                        )
    db_handle = client[db_name]
    return db_handle, client

def extract_json(str):
    pattern = r'\{(?:[^{}]|(?R))*\}'

    matches = regex.findall(pattern, str)
    return matches[-1]