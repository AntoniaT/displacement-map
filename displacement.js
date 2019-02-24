"use strict"

// FOR THE TEACHER: we (a couple of MMD students) only managed to code this because we had a very nice and 
// patient full-stack developer helping us step by step through this exercise.
// It did not help me learn anything because I don't have the knowledge or experience 
// yet to understand my code in the extent needed to get something out of this exercise or to even 
// produce it myself.
// We all spend way more hours than required in the schedule and we didn't have time to rest during 
// our weekend. I'm writing this not to communicate my anger, but to start a discussion about this program 
// and to help creating a better learning effect for us and future students. 

    let mouseX;
    let mouseY;
    let MAX_MOVEMENT = 5;
    
    // variables for the source
    let sourceCanvas = document.querySelector('#sourceCanvas');
    let sourceCtx = sourceCanvas.getContext('2d');
    let sourceData;
    let sourceImg = new Image();
    sourceImg.src = "angry-cat.jpg";

    // load the cat image, and draw it to the canvas
    sourceImg.onload = function(drawImage){
      sourceCtx.drawImage(this, 0, 0);
      sourceData = sourceCtx.getImageData(0,0, sourceCanvas.width, sourceCanvas.height).data;
      console.log(sourceData);
    }
    // variables for the map
    let mapCanvas = document.querySelector("#mapCanvas");
    let mapCtx = mapCanvas.getContext('2d');
    let mapData;
    let mapImg = new Image();
    mapImg.src = "angry-cat-map.jpg";
    
    // variables for the greyscale stuff
    let greyvalue;

    // load the map image, and draw it to the canvas
    mapImg.onload = function(drawMap){
      mapCtx.drawImage(this, 0, 0);
      mapData = mapCtx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;
      console.log(mapData);
    }

    //variables for the output
    let outputCanvas = document.querySelector("#outputCanvas");
    let outputCtx = outputCanvas.getContext('2d'); 
    let outputData = outputCtx.createImageData(outputCanvas.width, outputCanvas.height);

    // catch the movement of the output

    outputCanvas.addEventListener("mousemove", mouseData);

    function mouseData(event){
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        calculateCoordinates(mouseX, mouseY);
        render();
    }
    function calculateCoordinates(x, y){
    //    let mouseXRatio = mouseX / outputCanvas.width;
    //    let mouseYRatio = mouseY / outputCanvas.height;
        let mouseXRatio = (mouseX / outputCanvas.width) * 2 - 1;
        let mouseYRatio = (mouseY / outputCanvas.height) * 2 - 1;
        
        console.log(mouseXRatio, mouseYRatio);
        return [mouseXRatio, mouseYRatio];
    }
function copyToOutput(mouseX, mouseY){

   let coords = calculateCoordinates(mouseX, mouseY);
   let displacementX = coords[0] * MAX_MOVEMENT;
   let displacementY = coords[1] * MAX_MOVEMENT;

   console.log(coords);
    for (let y = 0; y < outputCanvas.height; y++){
        for (let x = 0; x < outputCanvas.width; x++){


            const pixelIndex = (x + y * outputCanvas.width) * 4;
            let greyvalue = mapData[pixelIndex] / 255;

            let offsetX = Math.round( x + (displacementX * greyvalue));
            let offsetY = Math.round( y + (displacementY * greyvalue));

            const originalPixelIndex = (offsetX + offsetY * outputCanvas.width) * 4;

            outputData.data[pixelIndex] = sourceData[originalPixelIndex];
            outputData.data[pixelIndex + 1] = sourceData[originalPixelIndex + 1];
            outputData.data[pixelIndex + 2] = sourceData[originalPixelIndex + 2];
            outputData.data[pixelIndex + 3] = sourceData[originalPixelIndex + 3];
        }
    }
}
// render the pixel information to the output canvas
function render(){
    copyToOutput(mouseX, mouseY);
    outputCtx.putImageData(outputData, 0, 0);
}

