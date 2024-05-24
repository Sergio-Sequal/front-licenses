import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  //baseURL: 'https://api-licences-java.onrender.com', // URL base de tu servidor Spring Boot
  baseURL: 'http://localhost:8080', // URL base de tu servidor Spring Boot
  timeout: 5000, // Tiempo máximo de espera para la solicitud en milisegundos
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Habilitar el envío de cookies y credenciales
});

export default axiosInstance;