let TelegramBot = require('node-telegram-bot-api');
let moment = require('moment');

let token = '407106962:AAH6F5mtJBygPsh1ns5Ek5nVV6I8wwIljnU';

let bot = new TelegramBot(token, {polling: true});

var chatId

var booked_tickets = require('./booked_tickets');

var films = require('./films');

var filmsdb = films.films;

// 'Aug. 5, 1977'

var today = moment(new Date()).format(' d  MMM  YYYY');

let nowDate = new Date()
let tomorrow = moment(nowDate.setDate(nowDate.getDate() + 1)).format(' d  MMM  YYYY');

var datesDb = [[today], [tomorrow]]

var tickets = booked_tickets.booked_tickets;

var state;

var order = new Object();

var chosenFilm;

bot.on('message', (msg) => {
    chatId = msg.chat.id;

    if (msg.text == '/start')
        state = 'start';


    if (state == 'start') {

        bot.sendMessage(chatId, "Привіт! Я бот що допоможе тобі " +
            "зходити в кіно! Обери фільм на який ти хочеш " +
            "придбати квиток", getFilmButtons());

        state = 'date';

    }

    else if (state == 'date') {
        order.film = msg.text;
        chosenFilm = tickets.filter(filmD => filmD.name === msg.text);
        console.log(chosenFilm);

        bot.sendMessage(chatId, "оберіть дату сеансу", getDateButtons(datesDb));
        // console.dir(filmsdb)
        state = 'time';
    }
    else if (state == 'time') {
        order.data = msg.text;
        console.log('Datas!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + msg.text);
        console.dir(order)

        console.log(chosenFilm);
        let times = chosenFilm.filter(filmD => filmD.dates === ' ' + msg.text);
        console.log('times' + times)

        bot.sendMessage(chatId, "оберіть час сеансу", getTimeButtons(times))

        state = 'seat'
    }
    else if (state == 'seat') {
        order.data = msg.text;
        console.dir(order)
        bot.sendMessage(chatId, "оберіть час сеансу", getTimeButtons(chosenFilm))
        // console.dir(filmsdb)
        state = 'seat'
    }


});


function getTimeButtons(times) {
    let filmTimes = times.map((film) => {
        return film.times;
    });
    console.log(filmTimes)

    let list = [filmTimes];

    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;
}

function getDateButtons(datesDb) {
    let list = datesDb;

    console.log(datesDb)

    // console.log(filmDates.dates)

    // let md = new Date();
    // md.setDate(md.getDate() + 1)
    // list = [[new Date()], [md]]

    // for (let i = 0; i < filmsdb.length; i++) {
    //     list[i] = [{text: filmsdb[i].name, callback_data: i.toString()}];
    // }

    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;

}
function getFilmButtons() {
    var list = [];

    for (let i = 0; i < filmsdb.length; i++) {
        list[i] = [{text: filmsdb[i].name, callback_data: i.toString()}];
    }

    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;
}

bot.on('callback_query', (msg) => {
    bot.deleteMessage(chatId, msg.id);

    if (state == 'start') {
        state = 'date'
        bot.sendMessage(chatId, "ви вибрали фільм " + filmsdb[msg.data].name);
        bot.deleteMessage(chatId, msg.id);
    }


});