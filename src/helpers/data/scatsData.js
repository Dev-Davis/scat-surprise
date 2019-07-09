import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getScats = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/scats.json?orderBy="uid"&equalTo="${uid}"`)
  .then((res) => {
    const scats = [];
    if (res.data !== null)
    Object.keys(res.data).forEach((scatKey) => {
      res.data[scatKey].id = scatKey;
      scats.push(res.data[scatKey]);
    })
    resolve(scats);
  })
  .catch(err => reject(err));
})

const deleteScat = scatId => axios.delete(`${baseUrl}/scats/${scatId}.json`);

export default { 
  getScats,
  deleteScat,
 };
