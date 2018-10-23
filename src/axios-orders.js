import axios from 'axios';

const instance=axios.create({
    baseURL: "https://react-my1burger.firebaseio.com/"
});

export default instance;