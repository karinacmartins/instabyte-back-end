import 'dotenv/config';
import { ObjectId } from "mongodb";
// Importa a função que conecta ao banco de dados
import conectarAoBanco from "../config/db-config.js";


// Aguarda a conexão com o banco de dados utilizando a string de conexão fornecida via variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para recuperar todos os documentos da coleção "posts" do banco de dados
export async function getTodosPosts() {
    // Acessa o banco de dados chamado "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Acessa a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
    // Acessa o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Acessa a coleção "posts"
    const colecao = db.collection("posts");
    // Insere um novo post na coleção e retorna o resultado da inserção
    return colecao.insertOne(novoPost);
}


export async function atualizarPost(id, novoPost) {
    // Acessa o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Acessa a coleção "posts"
    const colecao = db.collection("posts");
    // Converte o ID de string para ObjectId
    const objId = new ObjectId(id);
    // Atualiza o post com base no ID
    return colecao.updateOne({ _id: objId }, { $set: novoPost });
}

