//keep "" first
var chatHeads =
{
	"The Ambassador":{"characterName":"The Ambassador",  "picture":"https://runescape.wiki/images/b/b8/The_Ambassador_chathead.png?9d718"},
	"Lucien (rejuvenated)":{"characterName":"Lucien",  "picture":"https://runescape.wiki/images/0/0b/Lucien_rejuvenated_chathead.png?0a8dd"},
	"Mr. Mordaut":{"characterName":"Mr. Mordaut",  "picture":"https://runescape.wiki/images/b/be/Mr._Mordaut_chathead.png?c8445"},
	"Queen Black Dragon":{"characterName":"Queen Black Dragon",  "picture":"https://runescape.wiki/images/0/08/Queen_Black_Dragon_Head_Detail.png?13f96"},
	"Vanstorm Klause (vampyre)":{"characterName":"Vanstorm Klause",  "picture":"https://runescape.wiki/images/6/65/Vanstrom_Klause_%28Vampyre%29_chathead.png?73a56"}
};

//not used now
//returns an array of stirngs (all chathead names that contain str)
//inputting "" will return all options
function getAllChatHeadNamesContaining(str){
	var pattern = new RegExp(str,"i");
	var array = [];
	for(chatHeadName in chatHeads){
		if(pattern.exec(chatHeadName)!=null){
			array.push(chatHeadName);
		}
	}
	return array;
}