require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetch = require("node-fetch");
const moniker = '*';

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  let command = msg.content.split(' ')[0].slice(1);
  let args = msg.content.replace(moniker + command, '').trim();

  if (msg.mentions.users.first() === bot.user) {
    msg.channel.send("( ͡~ ͜ʖ ͡~)");
  }

  if (msg.content.startsWith(moniker)) {
    switch (command) {
      case 'jason': {
        fetch(args + '.json')
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return Promise.resolve(response)
            } else {
              return Promise.reject(new Error(response.statusText))
            }
          })
          .then(response => response.json())
          .then((json) => {
            var text = getCommentFromArray(json[1].data.children);
            return text;
          })
          .then((text) => {msg.channel.send(text)})
          .catch(function(error) {
            console.log('request failed', error.message)
          });
          
        
        break;
      }
    }
  }

  let getCommentFromArray = function (arr) {
    var text = '';
    
    if (typeof arr[2] !== 'undefined') {
      text += arr[2].data.body;
    } else {
      text += "idk";
    }
    
    return text;
  }
});
  
