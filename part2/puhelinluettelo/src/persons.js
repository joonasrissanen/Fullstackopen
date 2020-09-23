import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getAll = () => {
  return axios.get(baseUrl);
};

export const addPerson = personObject => {
  return axios.post(baseUrl, personObject);
};

export const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

export const updatePerson = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
}
