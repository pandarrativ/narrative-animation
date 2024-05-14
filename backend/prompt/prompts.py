'''
File for prompt templates
'''

STORY_TO_PLOT = f"""I will give you a story, please identify and list the main plots. 
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
PLOT_TO_ANIMATION_ELEMENTS = f"""
TODO:
"""