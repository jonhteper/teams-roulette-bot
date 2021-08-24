function Selector(lang){

    //default declaration
    var Messages = require("../Translations/EnglishMessages.js");

    if(lang == "es"){
        return Messages = require("../Translations/SpanishMessages.js");
        
    }
    else if(lang == "en"){
        return Messages = require("../Translations/EnglishMessages.js");
    }

    return Messages;
}

module.exports = Selector;