const maxCharsPerLine = 53;
const maxLines = 4;
const horizontalCenter = 320;
const verticalCenter = 84;
const fontsize = 12;
const verticalBuffer = 2;//extra pixels to space apart the lines vertically
const fontName = "Arial";
var chatboxWidth = 522;
var chatboxHeight = 145;


/*
example text
Kranon, The Ambassador is a warped Dragonkin who is the primary cause of the corruption found within all of the elite dungeons. With a type of black stone used to corrupt others, he has managed to influence a number of groups across Gielinor into assisting him in performing a ritual that will summon Xau-Tak. He is the final boss of the third elite dungeon, The Shadow Reef.
01234567890123456789012345678901234567890123456789
*/




function drawAllChatboxes(quote,charName,charPic,canvas,context){
	var stringArray = getLineArray(quote);
	var numOfChatboxes = Math.floor((stringArray.length-1)/maxLines)+1;
	if(numOfChatboxes<1){
		numOfChatboxes = 1;
	}
	
	context.font = fontsize + 'px ' + fontName;
	context.fillStyle = "black";
	prepareCanvas(chatboxHeight*numOfChatboxes,canvas,context);
	for(chatboxNum=0;chatboxNum<numOfChatboxes;chatboxNum++){
		fillBaseImage(chatboxNum,context);
		fillChathead(charPic,chatboxNum,context);
		fillName(charName,chatboxNum,context);
		
		//draw the quote
		var startIndex = chatboxNum*maxLines;
		var endIndexExclusive = chatboxNum*maxLines+maxLines;
		if(endIndexExclusive>stringArray.length){
			endIndexExclusive=stringArray.length;
		}
		writeText(stringArray.slice(startIndex,endIndexExclusive),chatboxNum,context);
	}
	
}

//clears the canvas and sets its height
function prepareCanvas(newHeight,canvas,context){
	// Store the current transformation matrix
	//context.save();

	// Use the identity matrix while clearing the canvas
	//context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = chatboxWidth;
	canvas.height = newHeight;

	// Restore the transform
	//context.restore();
	
	
	//width="522" height="145"
}
	
function fillBaseImage(chatboxNum,context){
	context.drawImage(baseImage,0,chatboxHeight*chatboxNum);
}

function fillChathead(charPic,chatboxNum,context){
	const circleCenterX = 75;
	const circleCenterY = 75;
	const maxSize = 100;
	
	var width = charPic.naturalWidth;
	var height = charPic.naturalHeight;
	
	//scale if needed
	if(width>maxSize){
		var ratio = maxSize/width;
		width = maxSize;
		height*=ratio;
	}
	if(height>maxSize){
		var ratio = maxSize/height;
		height = maxSize;
		width*=ratio;
	}
	
	//context.fillStyle = "#FF0000";
	//context.fillRect(circleCenterX-width/2,chatboxHeight*chatboxNum+circleCenterY-height/2,width,height);
	context.drawImage(charPic,circleCenterX-width/2,chatboxHeight*chatboxNum+circleCenterY-height/2,width,height);
}

function fillName(charName,chatboxNum,context){
	const nameCenterHorizontal = 260;
	const nameCenterVertical = 27;
	context.font = "12px Times New Roman";////wrong font- needs to spaced more horizontally?
	
	var charNameUpperCase = charName.toUpperCase();
	context.fillStyle = "rgb(214, 173, 10)";
	context.fillText(charNameUpperCase, nameCenterHorizontal-context.measureText(charNameUpperCase).width/2, chatboxHeight*chatboxNum+nameCenterVertical);
}



//writes the given string Array onto the given chatbox position
//stringArray has already been sliced and shouldn't be more than maxLines long
function writeText(stringArray,chatboxNum,context){
	context.font = fontsize + 'px ' + fontName;
	context.fillStyle = "black";
	
	for(i=0;i<stringArray.length;i++){
		context.fillText(stringArray[i], getXToStartDrawing(stringArray[i],context), getYToStartDrawing(i,stringArray.length,chatboxNum,context));
	}
	
}

function getXToStartDrawing(lineStr,context){
	return horizontalCenter-context.measureText(lineStr).width/2;
}

//relative to top of current chatbox
function getYToStartDrawing(rowNum,numRows,chatboxNum,context){
	if(numRows%2==1){//if number of rows is odd
		var centerRow = Math.floor(numRows/2);
		return chatboxHeight*chatboxNum+verticalCenter+(rowNum-centerRow)*(fontsize+verticalBuffer);
	}else{//number of rows is even
		var centerRow = Math.floor(numRows/2);//the row just below (bigger row num) than center
		return chatboxHeight*chatboxNum+verticalCenter+(rowNum-centerRow+0.5)*(fontsize+verticalBuffer);
	}
}



function getLineArray(wholeString){
	var stringArray = [];
	var stringIndex = 0;
	while(stringIndex<wholeString.length){
		var prevIndex = stringIndex;
		stringIndex = parseString(wholeString,stringIndex);
		stringArray.push(wholeString.substring(prevIndex,stringIndex).trim());
	}
	return stringArray;
}

//returns the index to cut at
//this is first occurance of enter or, if no enters,
//index of the last space before maxCharsPerLine
function parseString(string,startIndex){
	var maxEndIndex = startIndex+maxCharsPerLine;
	if(maxEndIndex>string.length){
		maxEndIndex = string.length;
	}
	var maxString = string.substring(startIndex,maxEndIndex);
	
	//try to find an enter. These force a line break
	var indexOfEnter = maxString.indexOf("\n");
	if(indexOfEnter>=0){
		return indexOfEnter+startIndex+1;//+1 to include inter (it will be trimmed later)
	}
	
	//if max string fits, just parse the rest
	if(maxEndIndex == string.length){
		return maxEndIndex;
	}
	
	
	//try to find the last space
	var indexOfLastSpace = maxString.lastIndexOf(" ");
	if(indexOfLastSpace>0){
		return indexOfLastSpace+startIndex;
	}
	
	//string is one solid block of letters. just cut off
	return maxEndIndex;
}