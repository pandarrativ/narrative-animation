class CanvasModel {
    constructor(canvasId) {
      this.canvas = new fabric.Canvas(canvasId, {
        preserveObjectStacking: true,
        backgroundColor: '#FFF',
        stateful: true,
      });
      this.canvas.selection = false;
      this.canvas.controlsAboveOverlay = true;
  
      fabric.Object.prototype.set({
        transparentCorners: false,
        borderColor: '#51B9F9',
        cornerColor: '#FFF',
        borderScaleFactor: 2.5,
        cornerStyle: 'circle',
        cornerStrokeColor: '#0E98FC',
        borderOpacityWhenMoving: 1,
      });
  
      this.canvas.selectionColor = 'rgba(46, 115, 252, 0.11)';
      this.canvas.selectionBorderColor = 'rgba(98, 155, 255, 0.81)';
      this.canvas.selectionLineWidth = 1.5;
    }
  
    addElement(element) {
      this.canvas.add(element);
    }
  
    removeElement(element) {
      this.canvas.remove(element);
    }
  
    clearCanvas() {
      this.canvas.clear();
    }
  }