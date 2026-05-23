import {AuthContext} from "../context/auth.context"
import { useContext, useState, useEffect } from "react";
import { loginUser,registerUser } from "../services/auth.api";

export default function useAuth() {
    const {loading, user, setUser, setLoading} = useContext(AuthContext);

    async function login({email, password}){
        setLoading(true);

    }

    return {
      
    }
}