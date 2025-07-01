
import css from "./userPage.module.scss";
import Header from "../home/header/header.jsx";
import	{ useAuth } from "../../context/AuthContext.jsx";
import Footer from "../home/footer/footer.jsx";

function HomePage(){

    const {user} = useAuth();
    console.log(user);

    return(
        <div className="bg-white w-full h-full">
            <Header/>
            <h1 className="bg-zinc-950">UserPage</h1>
            <Footer/>
            
        </div>

    )
}
export default HomePage;