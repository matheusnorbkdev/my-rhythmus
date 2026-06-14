import axios from "axios";
const api = axios.create({
URL_BASE: "http://192.168.1.117:8080",
timeout: 10000,
});
export default api;
