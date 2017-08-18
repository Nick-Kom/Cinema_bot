let TelegramBot = require('node-telegram-bot-api');

let token = '407106962:AAH6F5mtJBygPsh1ns5Ek5nVV6I8wwIljnU';

let bot = new TelegramBot(token, {polling: true});

var chatId

var booked_tickets = require('./booked_tickets');

var films = require('./films');

var filmsDb = films.films;


var today = new Date();
var dd = today.getDate();
var ddTom = today.getDate() + 1;
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = dd + '/' + mm + '/' + yyyy;
let tomorrow = ddTom + '/' + mm + '/' + yyyy;

var datesDb = [[today], [tomorrow]]

var tickets = booked_tickets.booked_tickets;

var state;

var order = new Object();

var chosenFilm;
var times;
var hallRows;
let numberOfTickets;
let numberOfTickets2;
order.rows = []
order.seats = []

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
        // console.dir(filmsDb)
        state = 'time';
    }
    else if (state == 'time') {
        order.data = msg.text;
        console.dir(order)

        console.log(chosenFilm);
        times = chosenFilm.filter(filmD => filmD.dates === msg.text);
        console.log('times' + times)

        bot.sendMessage(chatId, "Оберіть час сеансу :", getTimeButtons(times))
        state = 'numberOfTickets'
    }
    else if (state == 'numberOfTickets') {
        order.time = msg.text;
        bot.sendMessage(chatId, "Оберіть кількість білетів для замовлення :", {
            reply_markup: JSON.stringify({
                keyboard: [['1 квиток', '2 квитка', '3 квитка',], ['4 квитка']],
                resize_keyboard: true
            })
        });

        state = 'row'
    }
    else if (state == 'row') {

        numberOfTickets = msg.text;
        if (numberOfTickets.length == 1) {
            order.seats.push(msg.text)
        } else getnumberOfTickets(numberOfTickets)


        console.log('************************************** : ' + numberOfTickets)

        let rows = times.filter(filmD => filmD.times === order.time);

        console.dir(order)
        bot.sendMessage(chatId, "Оберіть ряд :", getRowButtons(rows));
        state = 'seat'
    }
    else if (state == 'seat') {
        order.rows.push(msg.text)

        let seats = hallRows[0]['row' + msg.text]

        console.dir(order)
        bot.sendMessage(chatId, "Оберіть місце :", getSeatsButtons(seats))

        console.log('7777777777777777777777777777 ' + numberOfTickets2)
        if (order.rows.length == numberOfTickets2) {
            state = 'confirmation'
        }
        else   state = 'row'
    }
    else if (state == 'confirmation') {
        order.seats.push(msg.text)

        //order.seat = msg.text;

        console.dir(order)
        bot.sendMessage(chatId,
            `Ви вибрали фільм ${order.film}\nна ${order.data}\n${order.time} годину\n${order.row} ряд ${order.seat}  місце.\nПідтвердити замовлення ?`,
            setConfirmation()
        )

        state = 'orderedTicket'
    }
    else if (state == 'orderedTicket') {
        if ( msg.text == 'Ні') {
            order.seats = []
            order.rows = []
        } else console.log('Send to serwer')

    }
});
function getnumberOfTickets(tickets) {
    console.log('000000000000000000wwwwwwwwwwwww00 ' + tickets.slice(0, -7))

    numberOfTickets2 = tickets.slice(0, -7)
}

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
            keyboard: list,
            resize_keyboard: true

        })
    };
    return opt;
}

function getRowButtons(rows) {
    hallRows = rows.map((hall) => {
        return hall.hall;
    });

    Object.keys(hallRows)

    console.log(hallRows[0])
    let arrHallRows = Object.keys(hallRows[0])

    let numberOfRow = arrHallRows.map((hall) => {
        return hall.slice(3);
    });

    console.log(Object.keys(hallRows[0]))

    let list = [numberOfRow];
    console.log(list)
    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list,
            resize_keyboard: true
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
            keyboard: list,
            resize_keyboard: true
        })
    };
    return opt;
}
function setConfirmation() {

    let list = [['Так', 'Ні']];
    console.log(list)
    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list,
            one_time_keyboard: true,
            resize_keyboard: true


        })
    };
    return opt;
}

function getFilmButtons() {

    let filmsNamesButtons = filmsDb.map((film) => {
        return [film.name];
    });
    console.log(filmsNamesButtons);
    var list = filmsNamesButtons;

    var opt = {
        reply_markup: JSON.stringify({
            keyboard: list

        })
    };
    return opt;
}
