import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f9b56.firebaseio.com/'
})

export default instance;