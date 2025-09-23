import app from "./app.js";
import { connectDB } from "./db.js";
import "dotenv/config";

const port = process.env.PORT || 5000;
connectDB();



app.get('/', (req, res) => {
    res.send('Pokedex API está funcionando!');

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});    
});

