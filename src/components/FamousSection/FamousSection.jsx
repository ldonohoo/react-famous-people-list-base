import { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    console.log('in get route')
    // TODO: fetch the list of people from the server
    axios({
      method: 'GET',
      url: '/api/people'
    })
    .then ((response) => {
      let people = response.data;
      console.log('GET request worked for api/people: ', people);
      setPeopleArray(people);
    })
    .catch((error) => {
      console.log('GET request failed for api/people!', error);
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: '/api/people',
      data: { name: famousPersonName, 
              role: famousPersonRole }
    })
    .then((reposnse) => {
      console.log('Successful POST in /api/people');
      setPersonName('');
      setPersonRole('');
      fetchPeople();
    })
    .catch((error) => {
      console.log('Error in /api/people', error);
    });
  }
    // jsx/html to return to create component
    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" 
                 value={famousPersonName}
                 onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" 
                 value={famousPersonRole}
                 onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <p></p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map((person) => 
            // console.log(person);
            // console.log(person.id, person.name, person.role);
           <li key={person.id}>{person.name} is famous for "{person.role}"</li>
          )
          }
        </ul>
      </section>
    );
}

export default FamousSection;
