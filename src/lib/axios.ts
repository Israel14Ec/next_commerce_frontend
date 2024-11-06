import axios, { InternalAxiosRequestConfig } from "axios";
import { Token } from "../utils/token";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

const tokenController = new Token();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

//Interceptor
api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  // Si `requiresAuth` no está definido, se establece en `false` por defecto
  config.requiresAuth = config.requiresAuth ?? false;

  // Verificar si la solicitud requiere autenticación (pasando `requiresAuth: true` en la configuración)
  if (config.requiresAuth) {
    const token = tokenController.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
