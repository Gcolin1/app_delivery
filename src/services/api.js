import axios from "axios";

export const api = new axios.create({
    baseURL: "https://localhost/public/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
})  