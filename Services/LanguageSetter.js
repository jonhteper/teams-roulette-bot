function Selector(lang){

    //default declaration
    var Messages = require("../translations/EnglishMessages.js");

    if(lang == "es"){
        return Messages = require("../translations/SpanishMessages.js");
        
    }
    else if(lang == "en"){
        return Messages = require("../translations/EnglishMessages.js");
    }

    return Messages;
}

module.exports = Selector;