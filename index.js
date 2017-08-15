let TelegramBot = require('node-telegram-bot-api');

let token = '407106962:AAH6F5mtJBygPsh1ns5Ek5nVV6I8wwIljnU';

let bot = new TelegramBot(token, {polling: true});

let films = [["Leon"], ["Inseption"], ["Logan"], ["Million Dollar Baby"]];

let filmsInfo = [
    {
        name: "inseption",
        description: " inseption inseption inseption inseption"
    },
    {
        name: "Leon",
        description: " Leon Leon Leon Leon"
    },
    {
        name: "Logan",
        description: " Loggggggggan Logan Logan "
    },
    {
        name: "Million Dollar Baby",
        description: " Million Dollar Baby film"
    }
]

let rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['10', '11', '12']
]
let places = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['10', '11', '12'],
    ['13', '14', '15']
]

/*bot.onText(/\/start/, function (msg, match) {
 bot.sendMessage(msg.chat.id, "Please select a film :", {
 "reply_markup": {
 "keyboard": films,
 "one_time_keyboard": true
 }
 })

 });*/


bot.onText(/\/start_t/, (msg, match) => {

    bot.sendMessage(msg.chat.id, "Select a film", {
        "reply_markup": {
            "keyboard": films,
            "one_time_keyboard": true
        }
    })

    bot.onText(/.+/, (msg, match) => {
        bot.sendMessage(msg.chat.id, "Select a row", {
            "reply_markup": {
                "keyboard": rows,
                "one_time_keyboard": true
            }
        })

   /*         bot.sendMessage(msg.chat.id, "Select a places", {
                "reply_markup": {
                    "keyboard": places,
                    "one_time_keyboard": true
                }
            });*/
    });

});
