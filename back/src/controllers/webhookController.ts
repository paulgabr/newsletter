import { Request, Response } from "express";
import { registrarAbertura } from "../service/webhookService";

export const webhookAbertura = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    const result = await registrarAbertura(email);

    if (!result) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
