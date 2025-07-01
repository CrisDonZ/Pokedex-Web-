import {useForm} from "react-hook-form"
import { useAuth } from "../context/AuthContext.jsx";
import  {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function RegisterPage () {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signup, isAuthenticated, errors: registerErrors = []} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuthenticated) {
            navigate("/register")
        }
    }, [isAuthenticated]);
    const onSubmit = handleSubmit(async values => {
      signup(values)
    });
    
  return (
    <div className="flex h-[calc(115vh-100px)] items-center justify-center">
      <div className="bg-zinc-50 position:absolute top-1/2 left-1/2 w-full max-w-md p-10 rounded-md shadow-lg">
        {
          registerErrors.map((error, i) => (
              <div className="bg-red-500 text-white p-2 rounded-md mb-2" key={i}>
                {error}
              </div>
          ))
        }
        <div className="card-header">
          <img 
            src={logo}
            alt="pokeapi" 
            className="logo"
          />
          <h1 className="title">Register</h1>
        </div>

          <form onSubmit={onSubmit}>
              <input type="text"{...register("username", {required: true})}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username"/>
              {errors.username && (
                  <p className="text-red-500">Username is required</p>
              )}

              <input type="email"{...register("email", {required:true})}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Email"/>
              
              <input type="password"{...register("password", {required:true})}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password"/>
              <button className="buttonR" type="submit">Register</button>
          </form>
          <p className="flex gap-x-2 justify-between bg-zinc text-zinc-500"> 
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign in</Link>
          </p> 
          
      </div>
    </div>
  );
}

export default RegisterPage;