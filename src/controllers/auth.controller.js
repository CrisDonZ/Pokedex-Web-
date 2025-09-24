import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

/*Controladores para un sistema de autenticación básico.*/
// Registro de usuario
export const register = async (req, res) =>{
    const {username, email, password} = req.body;
    try{
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["This user already exists"]);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, 
            email, 
            password: passwordHash,
        });
            
        
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id});

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }catch(error){
        console.log(error);
    }
    
};

export const login = async (req, res) => {
    

    try{
        const {email, password} = req.body;
        const userFound = await User.findOne({email});
        

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({message: "Incorrect password"});

        const token = await createAccessToken({id: userFound._id});


        res.cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: false,
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });

    }
    catch(error){
        return res.status(500).json({message: error.message});
    }

}

export const logout = async (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    
    return res.sendStatus(200);   
};

export const profile = async (req, res) => {

    //Busca el usuario por el id
    const userFound = await User.findById(req.user.id)

    // Si no encuentra el usuario, devuelve un mensaje de error y cuando si lo encuentra, devuelve los datos del usuario
    if(!userFound) {
        return res.status(400).json({message: "User not found"});
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
    
    res.send('profile');
};

export const verifyTokenRequest = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.sendStatus(401);

        const userFound = await User.findById(user.id)
        if(!userFound) return res.sendStatus(401).json({message: "User not found"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

export const addFavorite = async (req, res) => {
  try {
    const { userId, pokemon } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (user.favorites.filter(p => p !== null).find(p => p.id === pokemon.id)) {
        return res.status(400).json({ message: 'El Pokémon ya está en favoritos' });
    }
    

    user.favorites.push(pokemon);
    await user.save();

    return res.json({ message: 'Pokémon añadido a favoritos', favorites: user.favorites });
  } catch (error) {
    console.error(error); // ✅ AÑADE ESTO PARA VER EL ERROR COMPLETO EN CONSOLA
    return res.status(500).json({ message: 'Error al añadir favorito', error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: "userId requerido" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener favoritos", error: error.message });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { userId, pokemonId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.favorites = user.favorites.filter(pokemon => pokemon.id !== parseInt(pokemonId));
    await user.save();

    return res.json({ message: 'Pokémon eliminado de favoritos', favorites: user.favorites });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar favorito', error: error.message });
  }
};


