const fs = require('fs');
const path = require('path');
const appConfig = require('../../config/app')

function MessageData() {
    this.messages = [];
    this._dirname = __dirname + appConfig.messagePath;
}

MessageData.prototype.init = function () {
    console.info('MessageData init');
    fs.readdirSync(this._dirname)
        .forEach(filename => {
            if (!filename.includes('sample')) {
                let filePath = path.resolve(this._dirname, filename);
                let data = fs.readFileSync(filePath, 'UTF-8');
                this.messages.push(data);
            }
        });
}


module.exports = new MessageData;