const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const PORT = 9300;

app.use(express.static(__dirname + '/public'));

app.ws('/', (ws, req) => {
    ws.on('message', msg => {
        msg = JSON.parse(msg);
        console.log('socket message', msg);
        // if(message.cmd === 'hello') {
        //
        // }
        const clients = expressWs.getWss().clients;

        clients.forEach(s => {
            if (s === ws) {
                return;
            }
            s.send(JSON.stringify({cmd: 'chat', msg: 'new message: ' + msg.msg}));
        })


    });
});

app.listen(PORT, () => console.log('server listen on port', PORT));
