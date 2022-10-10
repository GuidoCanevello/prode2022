import axios from "axios";

axios.defaults.baseURL = 'http://192.168.0.229:3000/';
// FIXME revertir master token
axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'ITSMORBINTIME';