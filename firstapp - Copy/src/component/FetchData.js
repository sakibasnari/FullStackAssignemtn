import React, { useState } from 'react';
import axios from 'axios';

function FetchData() {
  const [configId, setConfigId] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/configurations/${configId}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input type="text" value={configId} onChange={(e) => setConfigId(e.target.value)} />
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        {data.map((row, index) => (
          <div key={index}>
            {row.map((item, i) => (
              <span key={i}>{item}&nbsp;</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchData;
