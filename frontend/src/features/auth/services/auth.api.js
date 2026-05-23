import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export async function registerUser({username, email, password}) {
    try {
        const res = await api.post("/auth/register", {username, email, password});
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser({email, password}) {
    try{
        const res = await api.post("/auth/login", {email, password});
        return res.data;
    }catch(error){
        console.log(error);
    }
}
