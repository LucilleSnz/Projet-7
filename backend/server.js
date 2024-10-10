const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();


// Renvoie un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};


const port = normalizePort(process.env.PORT || '4000');
// Port sur lequel l'application express tourne
app.set('port', port);


// Gestion des erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES': //erreur permission
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;

        case 'EADDRINUSE': //port deja utilisé
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;

        default:
        throw error;
    }
};


// Créer application exécutée à chaque appel vers le serveur
const server = http.createServer(app);

// Ecouteur d'événements consignant le port ou le canal nommé sur lequel le serveur s'exécute
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});


server.listen(port);