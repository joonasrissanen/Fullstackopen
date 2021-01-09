/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from "../state";
import { Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { toPatientEntry } from '../utils';

const IconMap = {
  male: { name: "mars" as "mars" },
  female: {name: "venus" as "venus" },
  other: {name: "genderless" as "genderless" }
};

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ { patients }, dispatch] = useStateValue();
  let patient: Patient | undefined = patients[id];
  useEffect(() => {
    if (!patient) {
      axios.get(`${apiBaseUrl}/${id}`).then(response => {
        const fetchedPatient = toPatientEntry(response.data);
        patient = fetchedPatient;
        dispatch({ type: "UPDATE_PATIENT", payload: fetchedPatient });
      }).catch(e => {
        console.log(e);
      });
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Header as="h2">
        {patient.name} <Icon {...IconMap[patient.gender]} />
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;