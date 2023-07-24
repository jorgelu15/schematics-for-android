import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiDiagrams = axios.create({
    baseURL : 'http://10.0.2.2:3000/api', //local
    // baseURL: 'http://167.99.238.241:8082/api'
    
});

apiDiagrams.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers.Authorization = "Bearer "+token;
        }
        return config;
    }
)

export default apiDiagrams;