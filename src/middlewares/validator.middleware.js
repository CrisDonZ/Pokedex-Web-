

export const validateSchema = (schema) => (req, res, next) =>{
    try {
        schema.parse(req.body) // Validate the request body against the schema
        next()   
    } catch (error) {
        return res.status(400).json(error.errors.map((error) => error.message));
    }
}