import axios from "axios";

const $api = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
    const { data } = await axios.get(`${$api}/posts`)
    return data;
}

export const getPost = async (id) => {
    const { data } = await axios.get(`${$api}/posts/${id}`)
    return data;
}

export const getUsers = async () => {
    const { data } = await axios.get(`${$api}/users`)
    return data;
}

export const getUser = async (id) => {
    const { data } = await axios.get(`${$api}/users/${id}`)
    return data;
}

export const getPostsByUser = async (userId) => {
    const { data } = await axios.get(`${$api}/posts?userId=${userId}`)
    return data;
}