const connection = require('./amqp/connection');
const messageService = require('./message/mesasgeservice')

console.info('Start rabbit-messanger');
connection.channel.then(channel => {
        messageService.init(channel).startSending();
});
