const verticalCenter = 84;
const fontsize = 12;
const verticalBuffer = 2;//extra pixels to space apart the lines vertically
const fontName = "Arial";
const chatboxWidth = 522;
const chatboxHeight = 145;

/*
example text
Kranon, The Ambassador is a warped Dragonkin who is the primary cause of the corruption found within all of the elite dungeons. With a type of black stone used to corrupt others, he has managed to influence a number of groups across Gielinor into assisting him in performing a ritual that will summon Xau-Tak. He is the final boss of the third elite dungeon, The Shadow Reef.
01234567890123456789012345678901234567890123456789
*/


function generateChatboxConversation(canvas,context){
	context.font = fontsize + 'px ' + fontName;
	context.fillStyle = "black";
	canvas.height = chatboxHeight*allChatBoxesDataArray.length;
	for(var chatboxNum=0;chatboxNum<allChatBoxesDataArray.length;chatboxNum++){
		fillBaseImage(chatboxNum,context);
		fillChathead(allChatBoxesDataArray[chatboxNum].picture,allChatBoxesDataArray[chatboxNum].orientation,chatboxNum,context);
		fillName(allChatBoxesDataArray[chatboxNum].name,allChatBoxesDataArray[chatboxNum].orientation,chatboxNum,context);
		
		//draw the quote
		
		writeText(allChatBoxesDataArray[chatboxNum].lines,allChatBoxesDataArray[chatboxNum].orientation,chatboxNum,context);
	}
}




	
function fillBaseImage(chatboxNum,context){
	context.drawImage(baseImage,0,chatboxHeight*chatboxNum);
}

function fillChathead(charPic,orientation,chatboxNum,context){
	const circleLeftLeftSide = 9;
	const circleLeftTopSide = 11;
	const circleRightLeftSide = 380;
	const circleRightTopSide = 10;

	const chatheadCenterXLeftSide = 73;
	const chatheadCenterYLeftSide = 75;
	const chatheadCenterXRightSide = 450;
	const chatheadCenterYRightSide = 75;

	const maxSize = 100;


	//draw circle
	if(orientation=="left"){
		context.drawImage(circleLeft,circleLeftLeftSide,chatboxHeight*chatboxNum+circleLeftTopSide);
	}else if(orientation=="right"){
		context.drawImage(circleRight,circleRightLeftSide,chatboxHeight*chatboxNum+circleRightTopSide);
	}else{
		//draw nothing
		return;
	}



	//set width and height of the picture
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
	
	//draw chathead
	if(orientation=="left"){
		context.drawImage(charPic,chatheadCenterXLeftSide-width/2,chatboxHeight*chatboxNum+chatheadCenterYLeftSide-height/2,width,height);
	}else if(orientation=="right"){
		context.save();
		context.translate(chatheadCenterXRightSide,chatboxHeight*chatboxNum+chatheadCenterYRightSide);
		context.scale(-1, 1);//flip horizontally

		context.drawImage(charPic,-width/2,-height/2,width,height);

		context.restore();
	}else{
		//this shouldn't be reached
	}
	
}

function fillName(charName,orientation,chatboxNum,context){
	const nameCenterHorizontal = 260;
	const nameCenterVertical = 27;
	context.font = "12px Times New Roman";////wrong font- needs to spaced more horizontally?
	
	var charNameUpperCase = charName.toUpperCase();
	context.fillStyle = "rgb(214, 173, 10)";
	context.fillText(charNameUpperCase, nameCenterHorizontal-context.measureText(charNameUpperCase).width/2, chatboxHeight*chatboxNum+nameCenterVertical);
}



//writes the given string Array onto the given chatbox position
//stringArray has already been sliced and shouldn't be more than maxLines long
function writeText(stringArray,orientation,chatboxNum,context){
	context.font = fontsize + 'px ' + fontName;
	context.fillStyle = "black";
	
	for(i=0;i<stringArray.length;i++){
		context.fillText(stringArray[i], getXToStartDrawing(stringArray[i],orientation,context), getYToStartDrawing(i,stringArray.length,chatboxNum,context));
	}
	
}

function getXToStartDrawing(lineStr,orientation,context){
	const horizontalCenterForLeft = 320;
	const horizontalCenterForRight = 202;
	const horizontalCenterForNone = 261;

	var center;
	if(orientation=="left"){
		center = horizontalCenterForLeft;
	}else if(orientation=="right"){
		center = horizontalCenterForRight;
	}else{
		center = horizontalCenterForNone;
	}
	return center-context.measureText(lineStr).width/2;
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