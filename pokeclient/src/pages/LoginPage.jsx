import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate} from "react-router-dom";
import { useEffect } from "react"; // Importamos useEffect

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {signIn, errors: signInErrors} = useAuth(); 
  const { isAuthenticated } = useAuth(); // Asegúrate de que tu AuthContext provea isAuthenticated
  const navigate = useNavigate();

  // Efecto para redirigir si está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signIn(data); // signIn actualizará isAuthenticated si el login es exitoso
  });
  return (
    <div className="flex h-[calc(115vh-100px)] items-center justify-center  ">

      <div className="bg-zinc-50 position:absolute top-1/2 left-1/2 w-full max-w-md p-10 rounded-md shadow-lg">
        {signInErrors.map((error, i) => (
            <div className="bg-red-500 text-white text-center p-2 rounded-md mb-2" key={i}>
              {error}
            </div>
        ))}
        <div className="card-header">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" 
            alt="pokeapi" 
            className="logo"
          />
          <h1 className="title">POKEDEX WEB</h1>
          <p className="p">Log in to your Pokedex Web account</p>
        </div>
        
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">Please enter a valid email</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2xtBox"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button className="buttonR" type="submit">
            Login
          </button>
          
        </form>
        <p className="flex gap-x-2 justify-between bg-zinc text-zinc-500"> 
            Don´t have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </p> 
      </div>
    </div>
  );
}

export default LoginPage;