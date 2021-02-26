import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Message from './components/Message';
import axios from 'axios';

const App = () => {
  const [gloves, setGloves] = useState([]);
  const [facemasks, setFacemasks] = useState([]);
  const [beanies, setBeanies] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl =
    'https://enigmatic-taiga-96667.herokuapp.com/https://bad-api-assignment.reaktor.com/v2';

  useEffect(() => {
    const requestOne = axios.get(`${baseUrl}/products/gloves`);
    const requestTwo = axios.get(`${baseUrl}/products/facemasks`);
    const requestThree = axios.get(`${baseUrl}/products/beanies`);
    const availabilityArray = [];
    let urlArray = [];
    let completerequests = 0;
    let gloveData, facemaskData, beanieData;

    const fetchCategoryData = async () => {
      try {
        const items = await axios.all([requestOne, requestTwo, requestThree]);
        gloveData = items[0].data;
        facemaskData = items[1].data;
        beanieData = items[2].data;
        fetchManufacturerData();
      } catch (error) {
        setError(`Data retrieval error, please try again later`);
        setTimeout(() => {
          setError(null);
        }, 5000);
        console.error('Error: ' + error);
      }
    };

    const fetchManufacturerData = async () => {
      const gloveManufacturerBrand = findManufacturerBrand(gloveData);
      const facemaskManufacturerBrand = findManufacturerBrand(facemaskData);
      const beanieManufacturerBrand = findManufacturerBrand(beanieData);

      if (
        gloveManufacturerBrand.every(
          (val, index) => val === facemaskManufacturerBrand[index],
        ) &&
        facemaskManufacturerBrand.every(
          (val, index) => val === beanieManufacturerBrand[index],
        )
      ) {
        for await (const value of gloveManufacturerBrand) {
          const newObj = {
            manufacturer: value,
            availability: '',
          };
          availabilityArray.push(newObj);
          urlArray.push(`${baseUrl}/availability/${value}`);
        }

        try {
          urlArray.forEach((url, index) => {
            fetchSingle(url, index);
          });
        } catch (error) {
          setError(`Data retrieval error, please try again later`);
          setTimeout(() => {
            setError(null);
          }, 5000);
          console.error('Error: ' + error);
        }
      }
    };

    const fetchSingle = async (url, index) => {
      const manufacturerData = await axios.get(url);
      if (typeof manufacturerData.data.response === 'string') {
        fetchSingle(url, index);
      } else {
        availabilityArray[index].availability = manufacturerData.data.response;
        completerequests++;
        if (completerequests === urlArray.length) {
          generateAvailabilityObj();
        }
      }
    };

    const generateAvailabilityObj = async () => {
      const newGlovesAvailability = await gloveData.map((product) => {
        let payload = '';
        const correctobj = availabilityArray.find(
          (object) => object.manufacturer === product.manufacturer,
        );
        for (const value of correctobj.availability) {
          if (value.id === product.id.toUpperCase()) {
            payload = value.DATAPAYLOAD;
            break;
          }
        }
        return { ...product, availability: payload };
      });

      const newBeaniesAvailability = await beanieData.map((product) => {
        let payload = '';
        const correctobj = availabilityArray.find(
          (object) => object.manufacturer === product.manufacturer,
        );
        for (const value of correctobj.availability) {
          if (value.id === product.id.toUpperCase()) {
            payload = value.DATAPAYLOAD;
            break;
          }
        }
        return { ...product, availability: payload };
      });

      const newFacemasksAvailability = await facemaskData.map((product) => {
        let payload = '';
        const correctobj = availabilityArray.find(
          (object) => object.manufacturer === product.manufacturer,
        );
        for (const value of correctobj.availability) {
          if (value.id === product.id.toUpperCase()) {
            payload = value.DATAPAYLOAD;
            break;
          }
        }
        return { ...product, availability: payload };
      });
      setGloves(newGlovesAvailability);
      setBeanies(newBeaniesAvailability);
      setFacemasks(newFacemasksAvailability);
    };

    fetchCategoryData();
  }, []);

  const findManufacturerBrand = (categoryData) => {
    let manufacturers = categoryData.map((item) => item.manufacturer);
    let filtered = Array.from(new Set(manufacturers)).sort();
    return filtered;
  };

  return (
    <div className="App">
      <Message message={error} />
      <NavBar gloves={gloves} facemasks={facemasks} beanies={beanies} />
    </div>
  );
};

export default App;
