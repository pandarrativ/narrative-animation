demo网页：https://www.motionity.app/

## Feb

### 需要保留的功能

- 左侧媒资库

  - uploads + 用户库（ie用户之前自行上传/绘画的所有gif）

  <img src="./notes.assets/image-20240222094431505.png" alt="image-20240222094431505" style="zoom:50%;" />

  - 预设库（原工程提供了搜索图片的功能，我觉得可以保留）

  <img src="./notes.assets/image-20240222094535483.png" alt="image-20240222094535483" style="zoom:50%;" />

  - 文本

  <img src="./notes.assets/image-20240222094608453.png" alt="image-20240222094608453" style="zoom:50%;" />

  - 音频

  <img src="./notes.assets/image-20240222094651081.png" alt="image-20240222094651081" style="zoom:50%;" />

- 图层编辑

<img src="./notes.assets/image-20240222094717724.png" alt="image-20240222094717724" style="zoom:50%;" />

- 中间的动画窗口

- 下方的时间轴

- 右边的属性调整栏（默认画板属性，选中元素时会变成另一套）

<img src="./notes.assets/image-20240222101517193.png" alt="image-20240222101517193" style="zoom:50%;" />

<img src="./notes.assets/image-20240222101601390.png" alt="image-20240222101601390" style="zoom:50%;" />

### json数据格式

单个元素（比如character）需要的json如下：

不确定是不是全面，但是不会差太多

```json
// 暂定格式
// 每个元素都需要一个这样的json
{
  "id": 2,
  "name": "circle",
  "assetType": "video", // "video" or "image" or "svg"
  "uri": "assets/shapes/circle.svg",
  "layer": 1,
  // 每个元素的基础properties，只要是ui上可以操作的都可以设定
  "properties": {
    "layout": {
      "position": {
        "x": 0, // float
        "y": 0  // float
      },
      "size": {
        "width": 100, // float
        "height": 100 // float
      },
      "rotation": 0,  // float
    },
    "layer": {
      "opacity": 1, // float
      "mask": null
    },
    "offset": {
      "color": "#000000",
      "blur": 0
    },
    "timeline": {
      "startTime": 0,
      "endTime": 10000,
      "keyframes": [    // 这里开始是关键帧信息 
        {  				// 每个关键帧有独立一套properties
          "time": 0,
          "layout": {
            "position": {
              "x": 0,
              "y": 0
            },
            "size": {
              "width": 100,
              "height": 100
            },
            "rotation": 0
          },
          "layer": {
            "opacity": 1,
            "mask": null
          },
          "offset": {
            "color": "#000000",
            "blur": 0
          }
        },
        {
          "time": 5000,
          "layout": {
            "position": {
              "x": 50,
              "y": 50
            },
            "size": {
              "width": 150,
              "height": 150
            },
            "rotation": 45
          },
          "layer": {
            "opacity": 0.5,
            "mask": "circle"
          },
          "offset": {
            "color": "#FFFFFF",
            "blur": 5
          }
        }
      ]
    }
  }
}

```



### 关于骨骼点

有这种根据动画提取骨骼点的工具https://github.com/google-coral/project-posenet

但加入editor界面会很麻烦



### 备注

- 关于关键帧的参数，参考在functions.js里的函数：

```javascript
function newKeyframe(property, object, time, value, render) {
```



- 动画风格化？视觉效果++（eg剪影的demo） && 开发方向更明确



### 笔记

ani/video各做各的

animation继续原本路子

text-img-gif这步交给eugie

我们每一步背后的api调哪个api？

- text - img：ai（扩写+生成位置信息）
  - dalle
  - stable diffusion
- img - gif：animated drawing



---

## Mar

### 源码记录

大部分回调函数都在functions.js里

调整img的功能在events.js里

- getAssets：database.js里 用来从数据库加载img并展示在library里

- newSVG(): functions.js里 用来add a svg shape to the canvas

```javascript
// e.g.
newSVG("assets/shapes/triangle.svg",261.5,247.5,100,true)
```

add to canvas相关功能都在这附近

- newKeyframe: functions.js里 用来新增关键帧

```javascript
function newKeyframe(property, object, time, value, render)
// use case
newKeyframe('scaleX', obj, currenttime, obj.get('scaleX'), true);

/*
【参数说明】
- property要求传入以下str之一
var props = [
  'left',
  'top',
  'scaleX',
  'scaleY',
  'width',
  'height',
  'angle',
  'opacity',
  'fill',
  'strokeWidth',
  'stroke',
  'shadow.color',
  'shadow.opacity',
  'shadow.offsetX',
  'shadow.offsetY',
  'shadow.blur',
  'charSpacing',
  'lineHeight',
];

- obj就是某个canvas上的图形元素
- time：float 单位ms 例如:1s应写作1000.0
- value: str 是关键帧对应的param值
- render: bool 是否渲染关键帧
*/

```

- autoKeyframe: 根据用户action种类自动添加keyframe，action包括：'scale', 'drag', 'rotate', 'resizing', 'scaleX', 'scaleY', 
- canvas.getActiveObject(): 可以用来获取当前选中的元素
- 修改元素参数最好通过模拟用户操作 ie避免lower level的操作

```javascript
// 获取element - positionX的输入框
const el = document.getElementById('object-x').querySelector('input');

// 模拟用户直接修改数值
el.value = 330;
el.dispatchEvent(new Event('input', {
    bubbles: true,
}));
```

其他input框的标签可以用inspect找到

- updatePanelValues: 用来监听panel的修改然后更新相应的元素
- canvas.renderAll(): 重新渲染画布 每次修改元素以后需要用这个
- seekTo/dragSeekBar：在funcitons里 是修改seekbar（当前时间点）位置的函数
- orderLayers：给所有图层排序
- ：获取当前时间

### 开发notes

- gif无法动态展示，需要转化成视频格式（mp4 etc）【增加循环功能？】
- mp4视频有持续时间限制
- 现在一旦刷新页面可能会丢失部分信息
- 步骤：点击img加入canvas【newSVG】 -- 移动到某个时间【】 -- 移动到某个位置【模拟鼠标修改参数】 -- 添加初始关键帧【悬停+点击（见下）】 -- 移动到某个时间点 -- 修改一些参数 --- 【有autokeyframe】（选中img的状态下添加关键帧/自动添加关键帧）

```javascript
// 悬停然后点击新建关键帧
var divElement = document.querySelector('[data-property="scale"]');

// 创建鼠标悬停事件
var hoverEvent = new MouseEvent('mouseover', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});

// 触发鼠标悬停事件
divElement.dispatchEvent(hoverEvent);

// 获取 img 元素
var imgElement = divElement.querySelector('img');

// 创建点击事件
var clickEvent = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});

// 触发点击事件
imgElement.dispatchEvent(clickEvent);
```



试一下能不能跳过移动时间点etc 直接添加keyframe

- 切片 完整视频 图层信息

- 只有切片也可以

- optional：工程文件 常规的格式