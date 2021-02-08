import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import Message from './components/Message';
import axios from 'axios';

const App = () => {
  const [gloveData, setGloveData] = useState([]);
  const [facemaskData, setFacemaskData] = useState([]);
  const [beanieData, setBeanieData] = useState([]);
  const [error, setError] = useState('')
  const baseUrl = 'https://bad-api-assignment.reaktor.com/v2';
  
  useEffect(() => {
    const requestOne = new Request(baseUrl, {
      method: 'GET',
      mode:'no-cors',
    });
    const requestTwo = fetch(`${baseUrl}/products/facemasks`, { mode: 'no-cors'});
    const requestThree = fetch(`${baseUrl}/products/beanies`, { mode: 'no-cors'});

    Promise
      .all([requestOne,requestTwo,requestThree])
    //axios
      //.all([requestOne, requestTwo, requestThree])
      .then((responses) => {
        console.log(responses)
        //setGloveData(responses[0].data);
        //setFacemaskData(responses[1].data);
        //setBeanieData(responses[2].data);
      })
      .catch(errors => {
        setError(
          `Data retrieval error, please try again later`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
        console.error("Error: " + errors);
      });
  }, []);

  return (
    <div className="App">
      <NavBar gloveData={gloveData} facemaskData={facemaskData} beanieData={beanieData} />
      <Message message={error} />
    </div>
  );
};

export default App;
