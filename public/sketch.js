// Create a new  Use one instance for each camera
window.handsfree = new window.Handsfree({});
const $emoji = document.querySelector("#emoji");

Handsfree.disable("head.pointer");
Handsfree.disable("head.vertScroll");

var socket;
let circleSize = 20;
let myCanvas;
let secondCanvas;

function setup() {
    // canvasBackground();
    secondCanvas = createGraphics(displayWidth, displayHeight);
    secondCanvas.clear();

    socket = io.connect('http://localhost:3000');
    socket.on('emojiPosition', otherClientsEmoji)
}

function draw() {
        canvasBackground();  
        image(secondCanvas, 0, 0);

    Handsfree.use("emojify", ({ head }) => {
        let emoji = "😐";
        let isFlipped = false;
        let state = head.state;
    
        if (state.smile) emoji = "😃";
    
        if (state.browsDown) emoji = "😡";
    
        if (state.mouthOpen) emoji = "😦";
    
        // Show the emoji
        $emoji.innerText = emoji;
    });

        textAlign(CENTER, CENTER);
        textSize(circleSize);
        text($emoji.innerText, mouseX, mouseY);

     if (mouseIsPressed) {
      if (circleSize < 255) {
      circleSize = circleSize + 5;
     }
    }
}

function mousePressed() {
  circleSize = 1;
}

function mouseReleased() {    
    secondCanvas.textAlign(CENTER, CENTER);
    secondCanvas.textSize(circleSize);
     secondCanvas.text($emoji.innerText, pmouseX, pmouseY);

    console.log('Sending: ' + $emoji.innerText + ',' + pmouseX + ',' + pmouseY + ',' + circleSize);

    var data = {
    clientsEmoji: $emoji.innerText,
    x: pmouseX,
    y: pmouseY,
    SizeOfEmoji: circleSize,
   
    }
    circleSize = 20;
    socket.emit('emojiPosition', data);
}

function otherClientsEmoji(data){
    secondCanvas.textAlign(CENTER, CENTER);
    secondCanvas.textSize(data.SizeOfEmoji);
     secondCanvas.text(data.clientsEmoji, data.x, data.y);

    circleSize = 20;
}

function canvasBackground() {
    let myCanvas = createCanvas(displayWidth, displayHeight);
    myCanvas.parent("background");
  }