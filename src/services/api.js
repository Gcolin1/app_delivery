import axios from "axios";

export const api = new axios.create({
    baseURL: "https://teste.brasuca.net.br/delivery/"
})  