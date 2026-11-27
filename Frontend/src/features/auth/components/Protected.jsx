import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

const Protected = ({children}) => {
  // destructuring users to extract values from object return by useAuth()
  const {loading, user} = useAuth()

  if(loading){
    return (<main><h1>Loading.....</h1></main>)
  }

  // if user not logged/ no user exists 
  if(!user){
    return <Navigate to="/login"></Navigate>
  }

  // if user is logged in 
  return children
}

export default Protected
