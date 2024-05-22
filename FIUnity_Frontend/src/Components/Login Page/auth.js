import axiosInstance from './axiosInstance'

export const makeAuthenticationRequest = (url, data) => {
    const csrfToken = localStorage.getItem("csrfToken");

    return axiosInstance.post(url, data, {
        headers: {
            "X-CSRFToken": csrfToken,
        },
    });
};