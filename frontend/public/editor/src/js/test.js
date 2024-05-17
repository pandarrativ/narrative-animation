
// function test() {
//     // 加载img到画布
//     newSVG("assets/shapes/circle.svg", 261.5, 247.5, 100, true);
//     var obj = canvas.getActiveObject();

//     // 调整初始属性 + 添加初始关键帧 
//     modifyProperty('object-x', 330);
//     // 点开关键帧菜单
//     dropDownKeyframeMenu(obj.id);
//     initKeyframe('scale');

//     // 移动到关键帧n的时间+修改参数+自动添加后续关键帧
//     seekToTime(1000); // 1s的位置
//     modifyProperty('object-x', 500);
//     // new keyframe
    
// }

// // 修改当前选中obj的参数
function modifyProperty(propertyType, value) {
    const el = document.getElementById(propertyType).querySelector('input'); // 'object-x'
    // 模拟用户直接修改数值
    el.value = value; // 330

    el.dispatchEvent(new Event('input', {
        bubbles: true,
    }));
}

// // 点开给定obj的关键帧菜单
// function dropDownKeyframeMenu(objId) {
//     var param = '[data-object="'+ objId + '"]';
//     const dropDownIcon = document.querySelector(
//         '[data-object="'+ objId + '"]'
//     ).querySelector('.droparrow');

//     // 创建一个点击事件
//     var clickEvent = new MouseEvent('click', {
//         'view': window,
//         'bubbles': true,
//         'cancelable': true
//     });

//     // 触发点击事件
//     dropDownIcon.dispatchEvent(clickEvent);
// }


// // 初始化某个参数的关键帧
// function initKeyframe(dataProperty) {
//     // 悬停然后点击新建关键帧
//     var divElement = document.querySelector(
//         '[data-property="'+ dataProperty + '"]'
//     );

//     // 创建鼠标悬停事件
//     var hoverEvent = new MouseEvent('mouseover', {
//         'view': window,
//         'bubbles': true,
//         'cancelable': true
//     });

//     // 触发鼠标悬停事件
//     divElement.dispatchEvent(hoverEvent);

//     // 获取 img 元素
//     var imgElement = divElement.querySelector('img');

//     // 创建点击事件
//     var clickEvent = new MouseEvent('click', {
//         'view': window,
//         'bubbles': true,
//         'cancelable': true
//     });

//     // 触发点击事件
//     imgElement.dispatchEvent(clickEvent);
//     }

//     function checktime() {

// }

// 把seekbar移动到指定时间（ms）
function seekToTime(time) {
    paused = true;
    // 计算当前时间对应的位置
    var seekbarLeftPosition = offset_left +
        $('#inner-timeline').offset().left +
        (time / timelinetime);
    
    // 更新 seekbar 的位置
    $('#seekbar').offset({
      left: seekbarLeftPosition
    });
    
    // 更新当前时间
    currenttime = parseFloat(time.toFixed(1));
    
    // 渲染时间
    renderTime();
    
    // 调用 animate 函数
    animate(false, currenttime);
    
    // 更新面板数值
    updatePanelValues();
  }
  document.addEventListener('DOMContentLoaded', function () {
    // 模拟悬浮事件的函数
    function triggerHover(element) {
        const event = new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    }

    // 添加对象到画布的函数
    function addObjects(json) {
        json.objects.forEach(object => {
            // 根据对象类型调用相应的方法
            if (object.type === 'video') {
                loadVideo(object.src, object.x, object.y, object.size);
            } else if (object.type === 'image') {
                loadImage(object.src, object.x, object.y, object.size);
            }

            // find element & select freeze
            const hoverElement = document.querySelector('.hover-trigger');
            if (hoverElement) {
                triggerHover(hoverElement);
            }

            // 延时一段时间以确保悬浮效果生效 ok
            setTimeout(() => {
                // 查找特定 div 中的 img.freeze 元素
                const selectedLayers = document.querySelectorAll('.layer.layer-selected');
                selectedLayers.forEach(layer => {
                    const images = layer.querySelectorAll('img.freeze');
                    // console.log(images);
                    images.forEach(img => {
                        img.click();

                    });
                });

                // add new keyframes
                object.keyframe.forEach(keyframe => {
                    seekToTime(keyframe.time);
                    modifyProperty(keyframe.property, keyframe.value);
                    // newKeyframe(keyframe.property, canvas.getActiveObject(), keyframe.time, canvas.getActiveObject().get('left'), true);
                });
            }, 500);
        });
    }

    // 从 JSON 文件加载数据
    fetch('assets/testdata.json')
        .then(response => response.json()) // 将响应解析为 JSON
        .then(json => {
            // 调用 addObjects 处理加载的 JSON 数据
            addObjects(json);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});
