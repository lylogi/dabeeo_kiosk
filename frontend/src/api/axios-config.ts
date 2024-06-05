import Axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
