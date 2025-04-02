import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
}


async function createNew(content) {
    const response = await axios.post(`${baseUrl}`, content);
    return response;
}

async function updateVote(id, newObject) {
    const response = await axios.patch(`${baseUrl}/${id}`, JSON.stringify(newObject));
    return response.data;
}

export const anecdoteService = {
    getAll,
    createNew,
    updateVote,
}