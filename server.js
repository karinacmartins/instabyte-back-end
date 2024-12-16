// Importa o framework Express para criar e gerenciar o servidor
import express from "express"; 
import routes from "./src/routes/postroutes.js";


// Cria uma aplicação Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3001 e define um callback para exibir uma mensagem no console
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


