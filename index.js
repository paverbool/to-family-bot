const TelegramBot = require('node-telegram-bot-api');

const token = '483619803:AAFJFT1nwEos7o6cNolJGzxaziU4loKTNyE';
const bot = new TelegramBot(token, {polling: true});

/*
var notes = [];

bot.onText(//напомни (.+) в (.+)/, function (msg, match) {
var userId = msg.from.id;
var text = match[1];
var time = match[2];

notes.push( { 'uid':userId, 'time':time, 'text':text } );

bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});


setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if ( notes{{i}}['time'] == curDate ) {
            bot.sendMessage(notes{{i}}['uid'], 'Напоминаю, что вы должны: '+ notes{{i}}['text'] + ' сейчас.');
            notes.splice(i,1);
        }
    }
},1000);.
*/


const CronJob = require('cron').CronJob;

const notes = [];

bot.onText(/\/remind (.+) at (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const text = match[1];
    const time = match[2];
    const note = notes.push({'uid': userId, 'time': match[2], 'text': match[1]});
    bot.sendMessage(userId, 'Хорошо,я напомню');
    new CronJob('* * * * * *', function () {
        for (let i = 0; i < notes.length; i++) {
            const curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if (notes[i]['time'] === curDate) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю: ' + notes[i]['text']);
                notes.pop(i, 1);
            }
        }
    }, null, true, 'Europe/Kiev');
});