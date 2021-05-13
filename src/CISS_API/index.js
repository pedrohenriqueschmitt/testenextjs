import axios from 'axios';

export default axios.create({
  baseURL: process.env.CISS_BASEURL,
  headers: { 'Content-Type': 'application/json' }
});