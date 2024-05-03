import React, { useState } from 'react';
import axios from 'axios';

function UpdateRemark() {
  const [configId, setConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [message, setMessage] = useState('');

  const updateRemark = async () => {
    try {
      await axios.put(`http://localhost:5000/api/configurations/${configId}`, { remark });
      setMessage('Remark updated successfully');
    } catch (error) {
      console.error('Error updating remark:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Config Id" value={configId} onChange={(e) => setConfigId(e.target.value)} />
      <textarea placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
      <button onClick={updateRemark}>Update Remark</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateRemark;
