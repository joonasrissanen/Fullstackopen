import React, { useState, useEffect } from 'react'
import { getAll, addPerson, deletePerson, updatePerson } from './persons';

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

const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map(person => {
      return (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      )
    })
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [shownPersons, setShownPersons] = useState(persons);

  useEffect(() => {
    getAll().then(res => setPersons(res.data));
  }, []);

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
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const oldPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
        updatePerson(oldPerson.id, { ...oldPerson, number: newNumber}).then(res => {
          setPersons(persons.map(p => p.id === oldPerson.id ? res.data : p));
          setNewName('');
          setNewNumber('');
        });
      }
    } else if (newName !== '' && newNumber !== '') {
      const maxId = Math.max(persons.map(p => p.id))
      const personObj = {
        name: newName,
        number: newNumber,
        id: maxId + 1,
      }
      addPerson(personObj).then(res => {
        setPersons(persons.concat(res.data));
        setNewName('');
        setNewNumber('');
      })
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      deletePerson(person.id).then(res => {
        const newPersons = persons.filter(elem => elem.id !== person.id);
        setPersons(newPersons);
      });
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
      <Persons persons={shownPersons} deletePerson={removePerson} />
    </div>
  )

}

export default App