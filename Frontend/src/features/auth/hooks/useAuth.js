import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {login, register, logout} from "../services/auth.api";

// custom hook
export const useAuth = () => {
    // accessing data provided by AuthContext.Provider
    const context = useContext(AuthContext);
    // extracting properties
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async ({email, password}) => {
        // receive credentials
        // set loading to true
        setLoading(true)

        try {
            // call login api, sends cred to backend, await waits for response
            // reponse stored in data
           const data = await login({email, password})
           setUser(data.user) 
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async({email, username, password}) => {
        
        setLoading(true)

        try {
           const data = await register({email, username, password})
           setUser(data.user) 
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async() => {
        
        setLoading(true)

        try {
           await logout()
           setUser(null) 
        } catch (err) {
            console.log(err)
        }finally{
            setLoading( false)
        }
    }

    // return user data, loading state and auth functions so other components can use them
    return {user, loading, handleLogin, handleRegister, handleLogout}
}