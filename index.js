const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const cheerio = require('cheerio');
const request = require('request');
const { error } = require('console');


var commandslist = fs.readFileSync ('source/commands.txt', 'utf8')
var token = fs.readFileSync ('source/token.txt', 'utf8')
var team = fs.readFileSync ('source/team.txt', 'utf8')
var update = fs.readFileSync ('source/update.txt', 'utf8')

const activities_list = [
"by Pukima#1143",
".help",
];

//when the Bot is ready
bot.on('ready', () => {
console.log('bot is online...');
bot.user.setPresence({
    status: "online",
    activity: {
       name: ".help",
       type: "LISTENING"
    }
 });
});

bot.on('message', message => {

//and again variables
var sender = message.author;
var msg = message.content.toUpperCase();
var prefix = '.'
if (message.author.bot) return;

try {

//Ping
if (msg === prefix + 'PING') {
 message.channel.send(':ping_pong: PONG! (' + Math.round(bot.ping) + ' ms.)')
}

//Help
if (msg === prefix + 'HELP' || msg === prefix + 'COMMANDS') {
 message.delete()
	const embed = new Discord.RichEmbed()
	.setDescription(commandslist)
	.setColor ('7CBF1C')
	message.channel.send(embed)
}

//Team
if (msg === prefix + 'TEAM') {
    message.delete()
       const embed = new Discord.RichEmbed()
       .setDescription(team)
       .setColor ('1919FF')
       message.channel.send(embed)
   }

//easter Eggs
if (msg === prefix + 'EASTER EGG' || msg === prefix + 'EASTEREGG') {
 message.author.send( {files: ['./other images/easteregg.png']})
 message.delete()
}

//random dogs
switch (args[0]) {
    case 'dog':
    image(message);

    break;
}

//Updates
    if (msg === prefix + 'UPDATE') {
    message.delete()

        if (message.member.has(473413778181062656)) return;
    const embed = new Discord.RichEmbed()
    .setThumbnail('https://i.imgur.com/l09lT1h.png')
     .setTitle('**UPDATE FOR PUKIMA BOT**')
      .setDescription(update)
       .setColor ('C0CAC00')
        message.channel.send(embed)
//mention for updates
    message.channel.send('<@&666328873566339072>')
}

//invite
if (msg === prefix + 'INVITE'){

const embed = new Discord.RichEmbed()
    .setThumbnail('https://i.imgur.com/l09lT1h.png')
     .setTitle('**You can invite me with this link:**')
      .setDescription('*https://bit.ly/36Di38d*')
       .setColor ('7289DA')
        message.channel.send(embed)
}
}

catch (error) {

}

});

//for random dog images
function dogimage(message){

    var options = {
        url: "https://results.dogpile.com/serp?qc=images&q=" + "dog",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {

            return;
        }

        //send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });

}

//bot.login
bot.login(token)

//End of the Code