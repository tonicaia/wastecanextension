/*global chrome*/
import React, { useEffect, useState } from 'react';
import logo from "./wcertified.png"
import './App.css';

const companies = [
  'Google',
  'Reddit',
  'Foodpanda',
  'Wikipedia',
  'Dell'
]

function App() {
  const [url, setUrl] = useState('');
  const [bifa, setBifa] = useState(false);
  const [company, setCompany] = useState('');

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);

      companies.forEach(company => {
        if (url.includes(company.toLowerCase())) {
          setCompany(company);
          setBifa(true);
        }
      })
    });
}, []);

  return (
    <div className="App">
      {bifa ?
        <div>
          <h3>{company}</h3>
          <img src={logo} width="100px" alt="certified"/>
          <h4>Under 400 kgCO2</h4>
        </div>
        :
        <div>
          <h3>No data about this company or doesn't fit our standards of waste management</h3>
          <h3>Contact us to be a part of our movement.</h3>
        </div>
      }
    </div>
  );
}

export default App;
