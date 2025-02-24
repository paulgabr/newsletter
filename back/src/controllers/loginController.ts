import { Response, Request } from "express";
import { realizarLogin, criarUsuario } from "../service/loginService";

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    const usuario = await realizarLogin(email);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ messagem: "Erro ao realizar login" });
  }
};

export const registrar = async (req: Request, res: Response) => {
  const { email, username } = req.body;

  if (!email || !username) {
    return res
      .status(400)
      .json({ message: "Email e nome de Usuário são obrigatórios" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Email é inválido" });
  }

  try {
    const novoUsuário = await criarUsuario(email, username);

    if (!novoUsuário) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    return res.status(201).json(novoUsuário);
  } catch (error) {
    return res.status(500).json({ messagem: "Erro ao criar usuário" });
  }
};
