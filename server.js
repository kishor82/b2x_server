const express = require('express');
const bodyParser = require('body-parser');
const boom = require('boom');
const path = require('path');

const jobs = require('./routes/api/jobs');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(express.static('public/build'));

// Routes
app.use('/api/jobs', jobs);

//Frontend
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, './public/build/index.html'));
});

// Error handling
app.use(async (err, req, res, next) => {
  if (res.output) {
    return res.status(err.output ? err.output.statusCode : err.statusCode).send(boom.boomify(err));
  }
});

const port = process.env.PORT || 7781;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
