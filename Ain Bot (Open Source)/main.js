var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs')

var commandslist = fs.readFileSync ('source/commands.txt', 'utf8')
var token = fs.readFileSync ('source/token.txt', 'utf8')
var team = fs.readFileSync ('source/team.txt', 'utf8')
var update = fs.readFileSync ('source/update.txt', 'utf8')

const activities_list = [
"by Ain_EPEMA#6888",
".help"
];

//when the Bot is ready
bot.on('ready', () => {
console.log('bot is online...');

setInterval(() => {
const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
bot.user.setActivity(activities_list[index]);
}, 10000);
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

if (msg === 'HI!') {
 message.author.send('Brav das du auf Discord hörst')
}

//random dogs
if (msg === prefix + 'DOG') {
    number = 29
    ImageNumber = Math.floor(Math.random() * (number -1 +1)) +1;
    message.channel.send( {files: ['./dog/' + ImageNumber + '.png']})
    message.delete()
}

//Updates
    if (msg === prefix + 'UPDATE') {
    message.delete()

        if (message.member.has(473413778181062656)) return;
    const embed = new Discord.RichEmbed()
    .setThumbnail('https://i.imgur.com/JWp0k0u.png')
     .setTitle('**UPDATE FÜR AIN BOT**')
      .setDescription(update)
       .setColor ('C0CAC00')
        message.channel.send(embed)
//mention for updates
    message.channel.send('<@&666328873566339072>')
}

//invite
if (msg === prefix + 'INVITE'){

const embed = new Discord.RichEmbed()
    .setThumbnail('https://i.imgur.com/JWp0k0u.png')
     .setTitle('**Hier kannst du mich einladen:**')
      .setDescription('*https://discordapp.com/oauth2/authorize?client_id=665911484290695169&scope=bot&permissions=301296759*')
       .setColor ('7289DA')
        message.channel.send(embed)
}
}
catch (err) {

}

//bot.login
});
bot.login(token)

//End of the Code