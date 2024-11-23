// Importa as funções de manipulação de posts e o módulo fs para manipulação de arquivos
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminisevices.js";


// Função para listar todos os posts
export async function listarPosts(req, res) {
    try {
        // Chama a função para recuperar todos os posts do banco de dados
        const posts = await getTodosPosts();
        // Retorna uma resposta com os posts em formato JSON e status de sucesso (200)
        res.status(200).json(posts);
    } catch (erro) {
        // Se ocorrer um erro, exibe o erro no console e envia uma resposta de erro
        console.error(erro.message); // Corrige o erro de digitação em "console.eror"
        res.status(500).json({ "Erro": "Falha ao recuperar os posts." });
    }
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    try {
        // Obtém o novo post a partir do corpo da requisição
        const novoPost = req.body;
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Retorna o post criado com um status de sucesso (200)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Se ocorrer um erro, exibe o erro no console e envia uma resposta de erro
        console.error(erro.message); // Corrige o erro de digitação em "console.eror"
        res.status(500).json({ "Erro": "Falha ao criar o post." });
    }
}

// Função para upload de imagem (mantida apenas no controller)
export async function uploadImagem(req, res) {
    // Cria um objeto de novo post com a URL da imagem e outras propriedades
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        // Chama a função para criar o post no banco de dados com os dados da imagem
        const postCriado = await criarPost(novoPost);
        // Define o novo caminho do arquivo de imagem
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo de imagem no sistema de arquivos
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna uma resposta com o post criado e status de sucesso (200)
        res.status(200).json({ postCriado });
    } catch (erro) {
        // Se ocorrer um erro, exibe o erro no console e envia uma resposta de erro
        console.error(erro.message); // Corrige o erro de digitação
        res.status(500).json({ "Erro": "Falha ao realizar o upload." });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `https://raw.githubusercontent.com/karinacmartins/instabyte-back-end/main/uploads/${id}.png`
    

    try {
        
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        // Obtém o novo post a partir do corpo da requisição
       
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }  

        const postCriado = await atualizarPost(id, post);
        // Retorna o post criado com um status de sucesso (200)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Se ocorrer um erro, exibe o erro no console e envia uma resposta de erro
        console.error(erro.message); // Corrige o erro de digitação em "console.eror"
        res.status(500).json({ "Erro": "Falha ao criar o post." });
    }
}