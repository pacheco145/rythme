const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function timeTwoNumbers(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const getEventDate = (initialDate, type) => {
    const dateVar = new Date (initialDate);

    const date = {
        day: dateVar.getDate(),
        month: months[dateVar.getMonth()],
        monthNum: timeTwoNumbers(dateVar.getMonth()),
        weekDay: daysInWeek[dateVar.getDay()],
        year: dateVar.getFullYear(),
        yy: dateVar.getFullYear().toString().substring(2,4),
        hours: timeTwoNumbers(dateVar.getHours()),
        minutes: timeTwoNumbers(dateVar.getMinutes())
    }

    const dateModel = {
        ddmmyy: `${date.day} ${date.month} ${date.year}`,
        barsDate: `${date.day}/${date.monthNum}/${date.yy}`,
        wdmy:`${date.weekDay} ${date.day} ${date.month} ${date.year}`,
        time: `${date.hours}.${date.minutes}h`
    }

    return dateModel[type]
}


export {getEventDate}
