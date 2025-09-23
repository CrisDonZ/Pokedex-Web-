import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    })
    .min(3, {message: "Username must be at least 3 characters long",}), 
    email: z.string({required_error: "Email is required",})
    .email({message: "Invalid email address",}),
    password: z.string({
        required_error: "Password is required",
    })
    .min(6, {message: "Password must be at least 6 characters long",}),

});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
    .email({message: "Invalid email address",}),
    
    password: z.string({
        required_error: "Password is required",
    })
    .min(6, {message: "Password must be at least 6 characters long",})
});

export const addFavoriteSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
    })

    .min(1, {message: "User ID cannot be empty",}),

    pokemonId: {
        id: z.number({
            required_error: "Pokemon ID is required",
        })
        .int({message: "Pokemon ID must be an integer",})
        .positive({message: "Pokemon ID must be a positive number",}),
        
        name: z.string({
            required_error: "Pokemon name is required",
        })
        .min(1, {message: "Pokemon name cannot be empty",}),
        
        image: z.string({
            required_error: "Pokemon image URL is required",
        })
        .url({message: "Invalid URL format for Pokemon image",}),
    }
})