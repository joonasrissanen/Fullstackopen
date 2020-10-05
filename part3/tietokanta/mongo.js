const mongoose = require('mongoose');

if (process.argv.length<3) {
  console.log('give password as argument');
  process.exit(1);
};

const password = process.argv[2];

const url =
  `mongodb+srv://fullstack:${password}@cluster0.e4syp.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
  number: String,
  name: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(people => {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
  });
}

if (process.argv.length > 3 && process.argv.length < 6) {
  const name = process.argv[3];
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  });
  person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  });
}