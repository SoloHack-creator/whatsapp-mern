import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://whatsapp-mern-dev.herokuapp.com',
  //https://whatsapp-mern-dev.herokuapp.com/
  //http://localhost:9000
});

export default instance;
