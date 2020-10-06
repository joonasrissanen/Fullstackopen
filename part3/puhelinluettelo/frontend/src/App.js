import React, { useState, useEffect } from 'react'
import { getAll, addPerson, deletePerson, updatePerson } from './persons';

const Notification = ({ message, isError }) => {
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null
  }

  return (
    <div style={{...style, color: isError ? 'red' : 'green'}}>
      {message}
    </div>
  )
};

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
  const [message, setMessage] = useState(null);
  const [isError, setError] = useState(false);

  useEffect(() => {
    getAll().then(res => setPersons(res.data));
  }, []);

  useEffect(() => {
    const filteredPersons = [];
    persons.forEach(person => {
      if (person && person.name) {
        const name = person.name.toLowerCase();
        if (name.substring(0, filterInput.length) === filterInput.toLowerCase() || filterInput === '') {
          filteredPersons.push(person);
        }
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
        updatePerson(oldPerson.id, { ...oldPerson, number: newNumber})
        .then(res => {
          setPersons(persons.map(p => p.id === oldPerson.id ? res.data : p));
          setMessage(`Updated ${newName}`);
          setError(false);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.log(error)
          setMessage(error);
          setError(true);
        });
      }
    } else if (newName !== '' && newNumber !== '') {
      const personObj = {
        name: newName,
        number: newNumber,
      }
      addPerson(personObj).then(() => {
        getAll().then(res => setPersons(res.data));
        setMessage(`Added ${newName}`);
        setError(false);
        setNewName('');
        setNewNumber('');
      }).catch((error) => {
        setMessage(error.response.data.error);
        setError(true);
      });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      deletePerson(person.id).then(() => {
        const newPersons = persons.filter(elem => elem.id !== person.id);
        setMessage(`Deleted ${person.name}`);
        setPersons(newPersons);
      }).catch(() => {
        setMessage(`Information of ${person.name} has already been removed from the server.`);
        setError(true);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
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