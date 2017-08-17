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


exports.booked_tickets = [
    {
        name: 'film1',
        dates: today,
        times: '18:00',
        hall: {
            row1: ['1', '2', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
            row5: ['1', '2', '3', '4', '5'],
            row6: ['1', '2','4', '5'],
            row7: ['1', '2', '3', '4', '5'],
            row8: ['1', '2', '3', '4', '5'],
            row9: ['1', '2', '3', '4', '5'],
            row10: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film1",
        dates: tomorrow,
        times: '12:00',
        hall: {
            row1: ['1', '2', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film1",
        dates: today,
        times: '20:00',
        hall: {
            row1: ['1', '2', '3', '4', '5'],
            row2: ['4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film1",
        dates: tomorrow,
        times: '20:00',
        hall: {
            row1: ['1', '2', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film2",
        dates: today,
        times: '09:00',
        hall: {
            row1: ['1', '2', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film2",
        dates: tomorrow,
        times: '14:00',
        hall: {
            row1: ['1', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film2",
        dates: today,
        times: '14:00',
        hall: {
            row1: ['1', '2', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
        }
    },
    {
        name: "film2",
        dates: tomorrow,
        times: '09:00',
        hall: {
            row1: [ '2', '3', '4', '5'],
            row2: ['1', '2', '3', '4', '5'],
            row3: ['1', '2', '3', '4', '5'],
            row4: ['1', '2', '3', '4', '5'],
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