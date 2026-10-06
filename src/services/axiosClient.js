import axios from "axios";
import { encryptData, decryptData } from "./encryptionService";
import { getTenantApiUrl } from "./tenantService";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

let csrfToken = null;

export function setCsrfToken(token) {
    csrfToken = token;
}

export function getCsrfToken() {
    return csrfToken;
}

axiosClient.interceptors.request.use(
    (config) => {
        config.baseURL = getTenantApiUrl();

        const method = config.method?.toUpperCase();

        if (["POST", "PUT", "DELETE"].includes(method)) {
            if (csrfToken) {
                config.headers["X-CSRF-Token"] = csrfToken;
            }

            config.data = {
                payload: encryptData(config.data ?? {})
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    response => {
        if (response.data?.payload) {
            response.data = decryptData(response.data.payload);
        }

        return response;
    },
    async error => {
        if (error.response?.data?.payload) {
            error.response.data = decryptData(
                error.response.data.payload
            );
        }

        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            originalRequest?._retry ||
            originalRequest?.url === "/refresh"
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshResponse = await axiosClient.post(
                "/refresh",
                {}
            );

            const refreshData =
                refreshResponse?.data?.data ||
                refreshResponse?.data;

            if (refreshData?.csrf_token) {
                setCsrfToken(refreshData.csrf_token);
            }

            return axiosClient(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);

export default axiosClient;