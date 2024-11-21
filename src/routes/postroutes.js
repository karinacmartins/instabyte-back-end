// Importando o framework Express para criação do servidor
import express from "express";
// Importando o Multer para lidar com uploads de arquivos
import multer from "multer";
// Importando as funções dos controladores para as rotas
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postcontroller.js"; 

// Configuração do Multer para definir o armazenamento dos arquivos
const storage = multer.diskStorage({
    // Função para definir o destino onde os arquivos serão armazenados
    destination: function (req, file, cb) {
        // Define que os arquivos serão salvos na pasta 'uploads/'
        cb(null, 'uploads/');
    },
    // Função para definir o nome do arquivo no sistema de arquivos
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo ao salvá-lo
        cb(null, file.originalname);
    }
});

// Configuração do Multer com o destino e as opções de armazenamento definidas
const upload = multer({ dest: "./uploads", storage });

// Função que configura as rotas da aplicação
const routes = (app) => {
    // Configura o middleware para interpretar requisições com corpo no formato JSON
    app.use(express.json());

    // Define uma rota GET na URL "/posts" para listar todos os posts
    // Chama a função 'listarPosts' para responder com os posts
    app.get("/posts", listarPosts);

    // Define uma rota POST na URL "/posts" para criar um novo post
    // Chama a função 'postarNovoPost' para processar a criação do post
    app.post("/posts", postarNovoPost);

    // Define uma rota POST na URL "/upload" para fazer upload de uma imagem
    // A função 'upload.single("imagem")' lida com o arquivo enviado
    // Depois chama a função 'uploadImagem' para processar o arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem );
}

// Exporta a função de configuração das rotas para ser usada em outro lugar (provavelmente no arquivo principal)
export default routes;