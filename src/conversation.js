const maxCharsPerLineWithChathead = 53;
const maxCharsPerLineWithoutChathead = 70;
const maxLines = 4;

var allChatBoxesDataArray = [];

function clearAllChatBoxes(canvas,context){
	context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = chatboxWidth;
	canvas.height = 0;
	allChatBoxesDataArray = [];
}

function deleteLastChatbox(canvas,context){
	if(allChatBoxesDataArray.length>0){
		canvas.height -= chatboxHeight;
		allChatBoxesDataArray.pop();
	}
	generateChatboxConversation(canvas,context);
}

function addToChatboxConversation(charName,charPic,orientation,quote){
	var brokenUpLineArray = getBrokenUpLineArray(quote,orientation);
	
	for(var i=0;i<brokenUpLineArray.length;i++){
		var newChatboxInfo = {name:charName,picture:charPic,orientation:orientation,lines:brokenUpLineArray[i]}
		allChatBoxesDataArray.push(newChatboxInfo);
	}
	
	
}

//splits the string into however many lines it takes
function getLineArray(wholeString,orientation){
	var stringArray = [];
	if(wholeString === ""){
		stringArray.push("");
	}
	
	var stringIndex = 0;
	while(stringIndex<wholeString.length){
		var prevIndex = stringIndex;
		stringIndex = parseString(wholeString,orientation,stringIndex);
		stringArray.push(wholeString.substring(prevIndex,stringIndex).trim());
	}
	return stringArray;
}

function getBrokenUpLineArray(wholeString,orientation){
	var lineArray = getLineArray(wholeString,orientation);
	//var numOfChatboxes = Math.floor((lineArray.length-1)/maxLines)+1;

	var brokenUpLineArray = [];
	for(var lineNumber = 0;lineNumber<lineArray.length;lineNumber+=maxLines){
		var subArray = [];
		for(var subLineNumber = 0;subLineNumber<maxLines;subLineNumber++){
			if(lineNumber+subLineNumber<lineArray.length){
				subArray.push(lineArray[lineNumber+subLineNumber])
			}
		}
		brokenUpLineArray.push(subArray);
	}
	return brokenUpLineArray;
}


//returns the index to cut at
//this is first occurance of enter or, if no enters,
//index of the last space before maxCharsPerLine
function parseString(string,orientation,startIndex){
	var maxCharsPerLine;
	if(orientation=="left" || orientation=="right"){
		maxCharsPerLine = maxCharsPerLineWithChathead;
	}else{
		maxCharsPerLine = maxCharsPerLineWithoutChathead;
	}

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