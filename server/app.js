require('dotenv').config();

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');

const apiRouter = require('./routes/api');
const webSocket = require('./socket');

const { PORT, MONGO_DB_URL, REACT_IP_ADDR } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: `http://${REACT_IP_ADDR}:5173`,
    credentials: true,
    methods: ['GET', 'POST'],
  })
);

app.use('/api', apiRouter);
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//CONNECT TO MONGO DB
mongoose
  .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

webSocket(server, app);
