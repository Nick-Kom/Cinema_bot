let TelegramBot = require('node-telegram-bot-api');

let token = '407106962:AAH6F5mtJBygPsh1ns5Ek5nVV6I8wwIljnU';

let bot = new TelegramBot(token, {polling: true});

var chatId

var booked_tickets = require('./booked_tickets');

var films = require('./films');

var filmsdb = films.films;


var today = new Date();
var dd = today.getDate();
var ddTom = today.getDate()+1;
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

today =  dd + '/' +  mm + '/' + yyyy;
let tomorrow =  ddTom + '/' +  mm + '/' + yyyy;

var datesDb = [[today], [tomorrow]]

var tickets = booked_tickets.booked_tickets;

var state;

var order = new Object();

var chosenFilm;
var times;
var hallRows;

bot.on('message', (msg) => {
    chatId = msg.chat.id;

    if (msg.text == '/start')
        state = 'start';


    if (state == 'start') {

        bot.sendMessage(chatId, "Привіт! Я бот що допоможе тобі  " +
            "замовити квиток в кіно ! Обери фільм який ти хочеш " +
            "переглянути", getFilmButtons());

        state = 'date';

    }

    else if (state == 'date') {
        order.film = msg.text;
        chosenFilm = tickets.filter(filmD => filmD.name === msg.text);
        console.log(chosenFilm);

        bot.sendMessage(chatId, "Оберіть дату сеансу :", getDateButtons(datesDb));
        // console.dir(filmsdb)
        state = 'time';
    }
    else if (state == 'time') {
        order.data = msg.text;
        console.dir(order)

        console.log(chosenFilm);
        times = chosenFilm.filter(filmD => filmD.dates ===   msg.text);
        console.log('times' + times)

        bot.sendMessage(chatId, "Оберіть час сеансу :", getTimeButtons(times))

        state = 'row'
    }
    else if (state == 'row') {
        order.time = msg.text;

        let rows = times.filter(filmD => filmD.times === msg.text);

        console.dir(order)
        bot.sendMessage(chatId, "Оберіть ряд :", getRowButtons(rows))
        // console.dir(filmsdb)
        state = 'seat'
    }
    else if (state == 'seat') {
        order.row = msg.text;
        let number = msg.text
        console.log(number)
        let allowed = [number];

        let seats = hallRows[0]['row' + msg.text]

        console.dir(order)
        bot.sendMessage(chatId, "Оберіть місце :", getSeatsButtons(seats))

        state = 'confirmation'
    }
    else if (state == 'confirmation') {
        order.seat = msg.text;

        console.dir(order)
        bot.sendMessage(chatId,
            `Ви вибрали фільм ${order.film} 
             на ${order.data} ${order.time}  
             ${order.row} ряд ${order.seat}  місце`,
            setConfirmation()
        )

        state = 'orderedTicket'
    }


});


function getDateButtons(datesDb) {
    let list = datesDb;

    console.log(datesDb)

    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;

}

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

function getRowButtons(rows) {
    hallRows = rows.map((hall) => {
        return hall.hall ;
    });
    Object.keys(hallRows)

    console.log(hallRows[0])
    let arrHallRows = Object.keys(hallRows[0])

    let numberOfRow = arrHallRows.map((hall) => {
        return hall.slice(3) ;
    });
    console.log('numberOfRow ___________________________'+ numberOfRow)

    console.log(Object.keys(hallRows[0]))

    let list = [numberOfRow];
    console.log(list)
    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;
}


function getSeatsButtons(seats) {
    console.log(seats)

    let list = [seats];
    console.log(list)
    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;
}
function setConfirmation() {

    let list = [['Підтвердити замовлення квитка']];
    console.log(list)
    var opt = {
        reply_markup: JSON.stringify({
            'keyboard': list,
            'one_time_keyboard':true


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