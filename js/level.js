/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function loadlevel()
{

    var ghostCanvas = document.createElement("canvas");
    ghostCanvas.width = image.width;
    ghostCanvas.height = image.height;

    // Copy the image contents to the canvas
    var ctx = ghostCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var ghostImage = ctx.getImageData(0,0,ghostCanvas.width,ghostCanvas.height);
    
    return ghostImage.data();

}

