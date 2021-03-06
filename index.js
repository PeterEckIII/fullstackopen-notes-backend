const app = require('./app');
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + './build/index.html');
})

server.listen(config.PORT, () => {
    console.log(`Server running on ${ config.PORT }`)
});
