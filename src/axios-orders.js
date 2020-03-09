import axios from "axios";
const instance = axios.create({
  baseURL: "https://my-reactburgerbuilder.firebaseio.com/"
});

export default instance;
