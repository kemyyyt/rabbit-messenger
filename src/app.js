const connection = require('./amqp/connection');
const messageService = require('./message/mesasgeservice')

connection.channel.then(channel => {
        messageService.init(channel).startSending();
});
