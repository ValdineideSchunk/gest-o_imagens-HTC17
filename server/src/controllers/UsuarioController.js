import {
  creatUsuario,
  readUsuario,
  showOneUsuario,
  updateUsuario,
  deleteUsuario,
  getUserByLoginPassword,
} from "../models/UsuarioModel.js";

export async function criarUsuario(req, res) {
  console.log("UsuarioController :: criarUsuario");
  const { login, senha } = req.body;

  if (!login || !senha) {
    res.status(400).json({ message: "login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await creatUsuario(login, senha);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "UsuarioController :: criarUsuario" });
    }
  }
}

export async function mostrarUsuario(req, res) {
  console.log("UsuarioController :: mostrarUsuario");

  try {
    const [status, resposta] = await readUsuario();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "UsuarioController :: erro ao mostrarUsuario" });
  }
}

export async function mostrandoUmUsuario(req, res) {
  console.log("UsuarioController :: mostrandoUmUsuario");
  const { id_usuario } = req.params;

  if (!id_usuario) {
    res.status(400).json({ message: "login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await showOneUsuario(id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log("UsuarioController :: mostrarUmUsuario");
      res
        .status(500)
        .json({ message: "UsuarioController :: erro ao mostrar um usuario" });
    }
  }
}

export async function atualizarUsuario(req, res) {
  console.log("UsuarioController :: atualizarUsuario");
  const { login, senha } = req.body;
  const {id_usuario} = req.params;

  if (!login || !senha) {
    res.status(400).json({ message: "login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await updateUsuario(login, senha, id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log("UsuarioController :: atualizarUsuario");
      res
        .status(500)
        .json({ message: "UsuarioController :: erro ao atualizar usuario" });
    }
  }
}

export async function logarUsuario(req, res) {
  console.log("UsuarioController :: logarUsuario");
  const { login, senha } = req.body;

  if (!login || !senha) {
    res.status(400).json({ message: "login e senha devem ser criados" });
  } else {
    try {
      const [status, resposta] = await getUserByLoginPassword(login, senha);
      res.status(status).json(resposta);
    } catch (error) {
      console.log("UsuarioController :: logarUsuario");
      res
        .status(500)
        .json({ message: "UsuarioController :: erro ao logar usuario" });
    }
  }
}
