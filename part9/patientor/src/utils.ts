/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Patient, Gender } from './types';

const isString = (text: any): boolean => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Missing value or not a string:' + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (str: string): boolean => {
  return ['male', 'female'].includes(str);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Missing or incorrect type: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toPatientEntry = (object: any): Patient => {
  if (!object) {
    throw new Error('New patient entry is null or undefined');
  }
  const id = parseString(object.id);
  const name = parseString(object.name);
  const dateOfBirth = parseDate(object.dateOfBirth);
  const ssn = parseString(object.ssn);
  const gender = parseGender(object.gender);
  const occupation = parseString(object.occupation);
  const newEnry: Patient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  return newEnry;
};
