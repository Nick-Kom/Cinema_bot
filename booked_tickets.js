let moment = require('moment');

var today = moment(new Date()).format(' d  MMM  YYYY');

let nowDate = new Date()
let tomorrow = moment(nowDate.setDate(nowDate.getDate() + 1)).format(' d  MMM  YYYY');


exports.booked_tickets = [
    {
        name: 'film1',
        dates: today ,
        times: '12:00',
        seats: {
            1: [1, 2, 3, 4, 5],
            2: [1, 2, 3, 4, 5],
            3: [1, 2, 3, 4, 5],
            4: [1, 2, 3, 4, 5],
        }
    },
    {
        name: "film1",
        dates:  tomorrow ,
        times: '12:00' ,
        seats: {
            1: [1, 2, 3, 4, 5],
            2: [1, 2, 3, 4, 5],
            3: [1, 2, 3, 4, 5],
            4: [1, 2, 3, 4, 5],
        }
    },
    {
        name: "film1",
        dates: today ,
        times:  '20:00',
        seats: {
            1: [1, 2, 3, 4, 5],
            2: [1, 2, 3, 4, 5],
            3: [1, 2, 3, 4, 5],
            4: [1, 2, 3, 4, 5],
        }
    },
    {
        name: "film1",
        dates: tomorrow ,
        times: '20:00',
        seats: {
            1: [1, 2, 3, 4, 5],
            2: [1, 2, 3, 4, 5],
            3: [1, 2, 3, 4, 5],
            4: [1, 2, 3, 4, 5],
        }
    },
    {
        name: "film2",
        dates:  tomorrow ,
        times: '10:00',
        seats: {
            1: [1, 2, 3, 4, 5],
            2: [1, 2, 3, 4, 5],
            3: [1, 2, 3, 4, 5],
            4: [1, 2, 3, 4, 5],
        }
    }/*,
    {
        name: "film2",
        dates: [today, tomorrow],
        times: ['10:00', '18:00']
    },
    {
        name: "film3",
        dates: [today, tomorrow],
        times: ['14:00', '22:00']
    },
    {
        name: "film4",
        dates: [today, tomorrow],
        times: ['16:00', '23:50']
    },
    {
        name: "film5",
        dates: [today, tomorrow],
        times: ['08:00']
    }*/];