import {AuthContext} from "../context/auth.context"
import { useContext, useState, useEffect } from "react";
import { loginUser,registerUser } from "../services/auth.api";

export default function useAuth() {
    const {loading, user, setUser, setLoading} = useContext(AuthContext);

    async function login({email, password}){
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login",{email,password});
            setUser(res.user);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
            throw err;
        }

    }

    async function register({username, email, password}){
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/api/auth/register",{username, email, password});
            setUser(res.user);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
            throw err;
        }
    }

    async function logout(){
        setLoading(true);
        try{
           const res = await axios.get("http://localhost:5000/api/auth/logout");
            setUser(null);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
            throw err;
        }
    }

    async function getMe(){
        setLoading(true);
        try{
            const res = await axios.get("http://localhost:5000/api/auth/profile");
            setUser(res.user);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return {
      loading,user,login,register,logout,init
    }
}