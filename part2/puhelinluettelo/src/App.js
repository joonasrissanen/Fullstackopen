import React, { useState, useEffect } from 'react'

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, submitNewPerson}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>number: <input value={number} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit" onClick={submitNewPerson}>add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  );
};

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <form>
      <div>filter shown with <input value={filterValue} onChange={handleFilterChange} /></div>
    </form>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [shownPersons, setShownPersons] = useState(persons);

  useEffect(() => {
    const filteredPersons = [];
    persons.forEach(person => {
      const name = person.name.toLowerCase();
      if (name.substring(0, filterInput.length) === filterInput.toLowerCase() || filterInput === '') {
        filteredPersons.push(person);
      }
    })
    setShownPersons(filteredPersons);
  }, [filterInput, persons]);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilterInput(event.target.value)
  };

  const handleNameChange = (event) => {
      event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const submitNewPerson = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newName !== '' && newNumber !== '') {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterInput} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submitNewPerson={submitNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )

}

export default App