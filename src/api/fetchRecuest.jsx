import { BASE_URL } from "../utils/constans/general";

export const fetchRecuest = async (url = "", options = {}) => {
  try {
    const { method, body } = options || {};
    const requestOptions = {
      method: method || "GET",
      headers: {
        UserId: "Nurlan",
        "Content-Type": "application/json",
      },
    };
    if (method !== "GET" && method !== "DELETE") {
      requestOptions.body = JSON.stringify(body);
    }

    const path = url.startsWith("/") ? url : `/$(url)`;
    const response = await fetch(`${BASE_URL}/${url}`, requestOptions);
    const result = await response.json();

    if (!response.ok) {
      let errorMasage = "Something went wrong!";
      if (result && result?.massege) {
        errorMasage = result.massege;
      }
      throw new Error(errorMasage);
    }
    return result;
  } catch (error) {
    return error;
  }
};
