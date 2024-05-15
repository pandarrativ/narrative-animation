'''
File for prompt templates
'''

STORY_TO_PLOT = """I will give you a story, please identify and list the main plots. 
You should provide a list of the main plots. For each plot, the format should be:
a JSON like this: 
{
  plots: [
    {
      plotId: 1,
      plot: ["A does xxxx, and says xxx", "B does yyy and says yyy"]
      characters: ["Billy the bear", "CHARACTER NAME the TYPE", "xxx"],
      settings: "A descriptive sentence describing how the background of the animation should be like. There must be only one background in a single location.",
      props: ["xxx", "xxx"]
    }
  ]
}
Requirements:
Please refine each plot and identify the characters, props used, and settings (background for animation)
You must specify what the kind of animation the character belongs to (a girl / a bear/ a dog / etc).
In the plot attribute, each string should describe one character's line or (single) movement. The line (not necessary) should be < 15 words, 
and the movement (not necessary) should be very simple movements, either moving horizontalling or vertically.
"""

# prompt for converting plot json (above) to animation elements with attributes
PLOT_TO_ANIMATION_ELEMENTS = """
Now I have a JSON file containing information for each plot:

```json
{
  "plots": [
    {
      "plotId": 1,
      "plot": ["Benny asks Ollie why trees sway", "Ollie explains that trees dance with the breeze"],
      "characters": ["Benny the bunny", "Ollie the owl"],
      "settings": "A lush green forest with sunny weather",
      "props": []
    },
    {
      "plotId": 2,
      "plot": ["Benny, Ollie, and Sammy start dancing", "They create a magical forest melody together"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    },
    {
      "plotId": 3,
      "plot": ["The trio continues dancing and spreading joy", "They live happily ever after in the rhythm of nature's dance"],
      "characters": ["Benny the bunny", "Ollie the owl", "Sammy the squirrel"],
      "settings": "The same lush green forest",
      "props": []
    }
  ]
}
```

Imagine you're a front-end animation engineer. 
You need to place each element (video or image) on the canvas of an animation editor based on these plot details. 
The canvas size is W600*L500, with the top-left corner as the origin of the coordinate axis (x=0, y=0). 
Please set the position and size (radius) of each element according to this canvas size, with the default size set to 100. 
Also, the 'setting' in the plot should occupy the full canvas, and has the largest layer id.

For
Now generate another JSON based on the provided JSON, with the following format:

```json
{
    "objects": [
        {
            "objectId": 0,
            "src": "assets/xxx",
            "type": "image",
            "layerId": 1,
            "x": 100,
            "y": 100,
            "size": 100,
            "keyframe": [
              {
                
              }
            ]
        },
        {
            "objectId": 1,
            "src": "assets/xxxxx",
            "type": "video",
            "layerId": 0,
            "x": 200,
            "y": 200,
            "size": 100,
            "keyframe": [
              {
                abc
              }
            ]
        }
    ]
}
```
"""