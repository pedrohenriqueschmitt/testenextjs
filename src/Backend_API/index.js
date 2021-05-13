import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
  headers: { 'Content-Type': 'application/json' }
});