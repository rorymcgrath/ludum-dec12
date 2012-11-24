/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function loadlevel(levelName)
{
    var level = {};
    level.data = new ClevelData();
    
    
    var image = engine.content.getLevel(levelName);
    var ghostCanvas = document.createElement("canvas");
    ghostCanvas.width = image.width;
    ghostCanvas.height = image.height;
    var ctx = ghostCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var ghostImage = ctx.getImageData(0,0,ghostCanvas.width,ghostCanvas.height);
 
 
    var imageData = ghostImage.data;
    for (var i = 0; i < imageData.length; i=i+4)
    {
        var tileRow = [];
        var furnitureRow = [];
        for (var j = 0; j < ghostImage.width;j++)
        {
            var tmp = 0;
            tmp = imageData[i] << 16;
            tmp = tmp|(imageData[i+1] << 8);
            tmp = tmp|imageData[i+2];
            var val = Consts[tmp];
            if(val >= 2)
            {
                furnitureRow.push(val);
                tileRow.push(0);
            }
            else
            {
                furnitureRow.push(0);
                tileRow.push(val);
            }
        }
        level.data.tiles.push(tileRow);
        level.data.furniture.push(furnitureRow);
    }
    return level;
}

