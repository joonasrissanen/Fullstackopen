const persons = [
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
];

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3001;
const jsonParser = bodyParser.json();

app.use(morgan('tiny'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'));

app.get('/info', (req, res) => {
  const currentDate = new Date();
  const responseBody = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${currentDate.toString()}</p>
  `;
  res.send(responseBody);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/persons', jsonParser, (req, res) => {
  const person = req.body;
  if (!person || !person.name || !person.number) {
    const error = { error: 'name and number must be defined' };
    res.status(400).json(error);
  } else if (persons.map(p => p.name).includes(person.name)) {
    const error = { error: 'name must be unique' };
    res.status(400).json(error);
  } else {
    const newId = Math.floor(Math.random() * Math.max(100000));
    const newPerson = {
      ...person,
      id: newId,
    };
    persons.push(newPerson);
    res.sendStatus(201);
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));