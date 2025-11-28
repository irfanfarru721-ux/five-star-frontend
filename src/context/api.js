import axios from "axios";

export const API_BASE = "https://srudentbackend-1.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);

// Modules / Categories
export const getModules = () => axiosInstance.get("/modules");

// Vendors / Shops
export const getVendorsByModule = (moduleId) => axiosInstance.get(`/vendors/module/${moduleId}`);

// Products
export const getProductsByVendor = (vendorId) => axiosInstance.get(`/products/vendor/${vendorId}`);
export const getProduct = (id) => axiosInstance.get(`/products/${id}`);
export const getAllProducts = () => axiosInstance.get("/products");
