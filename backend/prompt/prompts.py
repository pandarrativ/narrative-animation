'''
File for prompt templates
'''

STORY_TO_PLOT = """I will give you a story, please identify and list the main plots. 
You should provide a list of the main plots. For each plot, the format should be:
a JSON like this: 
{
  "plots": [
    {
      "plotId": 1,
      "plot": ["A does xxxx, and says xxx", "B does yyy and says yyy"]
      "characters": ["Billy the bear", "CHARACTER NAME the TYPE", "xxx"],
      "settings": "A descriptive sentence describing how the background of the animation should be like. There must be only one background in a single location.",
      "props": ["xxx", "xxx"]
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
Imagine you're a front-end animation engineer. 
You need to place each element (video or image) on the canvas of an animation editor based on these plot details. 
The canvas size is W600*L500, with the top-left corner as the origin of the coordinate axis (x=0, y=0). 
Please set the position and size (radius) of each element according to this canvas size, with the default size set to 100. 
Also, the 'setting' in the plot should occupy the full canvas, and has the largest layer id.

For
Now generate another JSON based on the provided JSON, with the following format, starting with "objects":
For the background element, the params should be set to x=0, y=0, size=1000
There should be no comments inside json.
Temporarily please choose from "assets/imgs/blue-sky-grass.png" or "assets/imgs/cloud-chocotoy.gif" or "assets/imgs/cartoon-bar-teddy-bear.png" for resources' src path.
Make sure every object has at least two keyframes so that it will be moving.
keyframe's time range is [0, 2800].
keyframe's value range is [100,600].
```json
{
    "objects": [
        {
            "objectId": 0,
            "src": "assets/video/cloud.mp4",
            "type": "video",
            "layerId": 1,
            "x": 100,
            "y": 70,
            "size": 150,
            "keyframe": [
              {
                "property": "object-x",
                "time": 2500,
                "value": 600
              }
            ]
        },
        {
            "objectId": 1,
            "src": "assets/circle.svg",
            "type": "image",
            "layerId": 0,
            "x": 200,
            "y": 200,
            "size": 100,
            "keyframe": [
                {
                  "property": "object-x",
                  "time": 0,
                  "value": 0
                },
                {
                    "property": "object-x",
                    "time": 2000,
                    "value": 0
                },
                {
                  "property": "object-x",
                  "time": 2500,
                  "value": 100
                }
              ]
        }
    ]
}
```
"""