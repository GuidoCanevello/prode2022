import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/';
// FIXME revertir master token
axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'ITSMORBINTIME';