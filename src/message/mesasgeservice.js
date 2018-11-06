const rabbitConfig = require('../../config/rabbit');
const appConfig = require('../../config/app');
const messageData = require('./messagedata');

function MessageService() {
    this.channel = null;
}

MessageService.prototype.init = function(channel) {
    this.channel = channel;
    this.counter = -1;
    this.messagesCount = messageData.messages.length;

    messageData.init();

    return this;
};
MessageService.prototype.startSending = function() {

    if(this.messagesCount){
        setInterval(
            () => this._send(), appConfig.interval
        );
    } else {
        console.error('Create messages in "messages/" without sample in file name !');
        process.kill(process.pid);
    }

};

MessageService.prototype._send = function() {
    console.info('Send Message');
    this.counter++;
    if(this.counter > this.messagesCount){
        console.info('Reset Message send queue');
        this.counter = -1;
    }
    const message = messageData.messages[this.counter];

    if(message)    {
        this.channel.sendToQueue(rabbitConfig.queue, Buffer.from(message))
    }
};


module.exports = new MessageService