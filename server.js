// Importa o framework Express para criar e gerenciar o servidor
import express from "express"; 
import routes from "./src/routes/postroutes.js";


// Cria uma aplicação Express
const app = express();
routes(app);

// Inicia o servidor na porta 3000 e define um callback para exibir uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando...");
});




