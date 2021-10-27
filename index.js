//server code
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));

//bot code
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetchAPI = require("node-fetch");
const moniker = '*';
const jasonID = '745724897090732068';
const andrID = '206062305467826176';
const notifID = '192026780993978368';
const mainChatID = '721444619228807168';

bot.login(TOKEN);


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.users.cache.get(notifID).send(bot.user.tag + ' is alive!');
  //bot.users.get(jasonID).send('I\'m the real Jason');

  //bot.user.setStatus(bot.users.cache.get(jasonID).presence.status);

  process.setMaxListeners(0);
  bot.user.setPresence({
    status: "invisible",
  });
});

bot.on('message', msg => {
  let command = msg.content.split(' ')[0].slice(1);
  let args = msg.content.replace(moniker + command, '').trim();

  if (msg.mentions.users.first() === bot.user) {
    msg.channel.send("( ͡~ ͜ʖ ͡~)");
  }

  if (msg.content.startsWith(moniker) && !(msg.author.id === jasonID)) {
    switch (command) {

      case 'budapest': {
        msg.channel.send({files: ["painting.png"]});
        break;
      }

      case 'hiddenBudapest': {
        msg.channel.send({
          files: [{
            attachment: 'painting.png',
            name: 'SPOILER_painting.png'
          }]
        });
        break;        
      }

      case 'paris': {
        msg.channel.send({files: ["jasonn.png"]});
        break;
      }

      case 'lucas': {
        msg.channel.send("!play https://www.youtube.com/watch?v=UMs2Hskitg8");
        break;
      }

      case 'flip': {
        let rand = Math.floor(Math.random() * 101);
        msg.channel.send(rand % 2 == 0 ? "heads" : "tails");
      }

      case 'jason': {
        fetchAPI(args + '.json')
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

  bot.on('presenceUpdate', (oldMember, newMember) => {
    if (newMember.user.id === jasonID) {
      bot.user.setPresence({
        status: "invisible",
      });
    }
  });

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
  
