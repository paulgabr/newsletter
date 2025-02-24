import { Request, Response } from "express";
import { getUsuariosMetricas } from "../service/usuarioService";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await getUsuariosMetricas(Number(id));

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ message: "Erro ao buscar usuário" });
  }
};
