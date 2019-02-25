const Discord = require('discord.js');
const client = new Discord.Client();
const angery = client.emojis.find(emoji => emoji.name === "angery");


client.on('ready', () => {
  console.log("Connected as" + client.user.tag)

  client.user.setActivity("with shanpes")


})

client.on('message', message => {
  const attachment = new Discord.Attachment("orang.png");
  if (message.author === client.user) {
    return;
  }

  // If the message is "ping"
  if (message.content === 'ping' && message.author.id === "228105221937692672" ) {
    // Send "pong" to the same channel
    message.channel.send('pong for the master')
  } else if (message.content === 'pong') {
    // Send "pong" to the same channel
    message.channel.send('ping');
  }
  if (message.content === 'ping' && message.author.id != "228105221937692672" ) {
    // Send "pong" to the same channel
    message.channel.send('pong for the ' + message.author.username)
  }


  if (message.content === 'worstenemy') {
    message.channel.send(attachment);
  }

  if (message.content === 'html') {
    message.channel.send(`<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>VOID page</title>

  <link rel="stylesheet" href="css/styles.css?v=1.0">

</head>

<body>
  <script src="js/scripts.js"></script>
</body>
</html>`);
  }
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'vegetal') {
    const angery = client.emojis.find(emoji => emoji.name === "angery");
    // Send "pong" to the same channel
    message.channel.send(`${angery}`);
  }
});

client.login("Mjg1ODgzMzI5NDE1MjE3MTUy.DuKTwA.Eabb_ThLnzFRSbWwv_5OrsjmQHw")
