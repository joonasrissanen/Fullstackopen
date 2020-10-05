require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const Person = require('./models/person');

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

app.use(morgan('tiny'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(errorHandler);

app.get('/info', (req, res) => {
  Person.find({}).then(people => {
    const currentDate = new Date();
    const responseBody = `
      <p>Phonebook has info for ${people.length} people.</p>
      <p>${currentDate.toString()}</p>
    `;
    res.send(responseBody);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people);
  })
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person);
  })
  .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findOneAndRemove(req.params.id).then(result => {
    res.sendStatus(204);
  })
  .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson);
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body || !body.name || !body.number) {
    const error = { error: 'name and number must be defined' };
    res.status(400).json(error);
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person.save().then(savedPerson => {
      res.json(savedPerson);
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));