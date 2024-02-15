import axios from "axios";

export const api = new axios.create({
    baseURL: "https://teste.brasuca.net.br/public/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
})  