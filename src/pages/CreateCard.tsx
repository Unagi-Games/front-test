import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { addPlayer } from '../lib/collection';

import './CreateCard.css';
const DAY = 'day';
const MONTH = 'month';
const YEAR = 'year';

export const CreateCard = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [day, setDay] = useState(DAY);
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);

  const days = [...Array(31).keys()];
  const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' });
  });
  const years = Array.from(
    { length: 70 },
    (_, i) => new Date().getFullYear() - i
  );

  const redirect = () => {
    history.push('/');
  };

  const onSubmit = async () => {
    const id = uuidv4();
    const player = {
      firstname: firstName,
      lastname: lastName,
      birthday: new Date(`${year}-${month}-${day}`).toString(),
      image: '', // image should've been an upload operation ?
    };

    addPlayer('http://localhost:8001/cards', { player, id: uuidv4() }).then(
      (res) => {
        console.log(res);
        if (res.ok) {
          setFirstName('');
          setLastName('');
          setDay(DAY);
          setMonth(MONTH);
          setYear(YEAR);

          alert('Player added succesfully');
          setTimeout(redirect, 1000);
        }
      }
    );
  };

  const isFormValid =
    !!firstName &&
    !!lastName &&
    day !== DAY &&
    month !== MONTH &&
    year !== YEAR;

  return (
    <>
      <div className="form-container">
        <p>Add a player</p>
        <div className="field-container">
          <label>First Name</label>
          <input
            className="form-input"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="field-container">
          <label>Last Name</label>
          <input
            className="form-input"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="field-container">
          <label>Date of Birth</label>
          <div className="select-container">
            <select
              className="select-input"
              onChange={(ev) => setDay(ev.target.value)}
            >
              <option disabled selected value="Day">
                Day
              </option>
              {days.map((day) => (
                <option value={day + 1}>{day + 1}</option>
              ))}
            </select>
            <select
              className="select-input"
              onChange={(ev) => setMonth(ev.target.value)}
            >
              <option disabled selected value="Month">
                Month
              </option>
              {months.map((month) => (
                <option value={month}>{month}</option>
              ))}
            </select>
            <select
              className="select-input"
              onChange={(ev) => setYear(ev.target.value)}
            >
              <option disabled selected value="Year">
                Year
              </option>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button disabled={!isFormValid} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="go-back">
        <button>
          <Link to="/">Home </Link>
        </button>
      </div>
    </>
  );
};
