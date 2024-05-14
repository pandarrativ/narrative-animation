### Endpoints
```http
POST /storytoplot/

{
  "plots": [
    {
      "plotId": 1,
      "plot": ["Benny asks Ollie why trees sway", "Ollie explains that trees 
dance with the breeze"],
      "characters": ["Benny the bunny", "Ollie the owl"],
      "settings": "A lush green forest with sunny weather",
      "props": []
    },
    {
      "plotId": 2,
      "plot": ["Benny, Ollie, and Sammy start dancing", "They create a magical 
forest melody together"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    },
    {
      "plotId": 3,
      "plot": ["The trio continues dancing and spreading joy", "They live 
happily ever after in the rhythm of nature's dance"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    }
  ]
}
```

```http
POST /plotstoelements/

{
  "plots": [
    {
      "plotId": 1,
      "plot": ["Benny asks Ollie why trees sway", "Ollie explains that trees 
dance with the breeze"],
      "characters": ["Benny the bunny", "Ollie the owl"],
      "settings": "A lush green forest with sunny weather",
      "props": []
    },
    {
      "plotId": 2,
      "plot": ["Benny, Ollie, and Sammy start dancing", "They create a magical 
forest melody together"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    },
    {
      "plotId": 3,
      "plot": ["The trio continues dancing and spreading joy", "They live 
happily ever after in the rhythm of nature's dance"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    }
  ]
}
```