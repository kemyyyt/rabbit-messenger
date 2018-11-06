const amqp = require('amqplib');
const rabbitConfig = require('../../config/rabbit')

function Connection() {

    this._amqpUrl = 'amqp://'
        + rabbitConfig.username + ':' + rabbitConfig.password
        + '@' + rabbitConfig.host + ':' + rabbitConfig.port
        + '/' + rabbitConfig.vhost;

    this.channel = amqp.connect(this._amqpUrl).then(connection  => {
        return connection.createChannel();
    });

}


module.exports = new Connection();