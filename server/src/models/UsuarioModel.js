import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function creatUsuario(login,senha){
    console.log('UsuarioController :: creatUsuario')
    const conexao = mysql.createPool(db);
    const sql = 'INSERT INTO usuarios (login,senha) VALUES (?,?)';
    const params = [login,senha];

    try {
        const [resposta] = await conexao.query(sql,params);
        return [201, {message:'Usuario Cadastrado'}];
    } catch (error) {
        return[500,{message:'Erro ao Cadastrar Usuário'}]
    }
}

export async function readUsuario() {
    console.log('UsuarioController :: readUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios';

    try {
        const [resposta] = await conexao.query(sql);
        return [201, resposta];
    } catch (error) {
        console.log(error);
        return[500,{message:'Erro ao exibir Usuário'}]
    }
}

export async function showOneUsuario(id_usuario) {
    console.log('UsuarioController :: showOneUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];
    try {
        const [resposta] = await conexao.query(sql,params);
        if(resposta.length < 1){
            return [404, {message:'Usuario não encontrado'}];
        }else{
            return [200, resposta[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao exibir usúario'}];
    }
}

export async function updateUsuario(login,senha,id_usuario) {
    console.log('UsuarioController :: updateUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'UPDATE usuarios SET login=? senha=? WHERE id_usuario=?';
    const params = [login,senha,id_usuario];

    try {
        const [resposta] = await conexao.query(sql,params);
        if(resposta.length < 1){
            return [404, {message:'Usuario não encontrado'}]
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao exibir usúario'}]
    }
}


export async function deleteUsuario(id_usuario) {
    console.log('UsuarioController :: deletarUsuario');
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];

    try {
        const [resposta] = await conexao.query(sql,params);
        if(resposta.affecteRows < 1){
            return [404, {message:'Usuario não encontrado'}];
        }
    } catch (error) {
        console.log(error);
        return [500, {message: 'UsuarioModel Erro ao deletar usúario'}]
    }
}

export async function getUserByLoginPassword(login, senha) {
    console.log('UsuarioController :: getUserByLoginPassword');
    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario FROM usuarios WHERE login=? AND senha=?';
    const params = [login, senha];

    try {
        const [resposta] = await conexao.query(sql, params);
        

        if (resposta.length < 1) {
            return [401, { message: 'Usuario e/ou senha invalidos' }];
        } else {
            return [200, resposta[0]];
        }
    } catch (error) {
        console.log(error);
        return [500, { message: 'UsuarioModel Erro ao logar' }];
    }
}
