process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require('node-telegram-bot-api');
const token = '483619803:AAFJFT1nwEos7o6cNolJGzxaziU4loKTNyE';
const bot = new TelegramBot(token, {polling: true});
const notes = [];


// const Promise = require('bluebird');
// Promise.config({
//     cancellation: true
// });

bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
    const userId = msg.from.id;
    const text = match[1];
    const time = match[2];
    notes.push({'uid': userId, 'time': time, 'text': text});
    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function () {
    for (let i = 0; i < notes.length; i++) {
        const curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if (notes[i]['time'] == curDate) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: ' + notes[i]['text'] + ' сейчас.');
            notes.splice(i, 1);
        }
    }
}, 1000);