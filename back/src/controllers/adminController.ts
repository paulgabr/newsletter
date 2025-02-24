import { Response, Request } from "express";
import {
  getUsuariosComMetricas,
  getEstatisticasGerais,
  getAberturasPorPeriodo,
} from "../service/adminService";

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await getUsuariosComMetricas();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    return res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const listarEstatisticas = async (req: Request, res: Response) => {
  try {
    const estatisticas = await getEstatisticasGerais();
    return res.status(200).json(estatisticas);
  } catch (error) {
    console.error("Erro ao buscar estatísticas", error);
    return res.status(500).json({ message: "Erro ao buscar estatísticas" });
  }
};

export const listarAberturasPorPeriodo = async (
  req: Request,
  res: Response
) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res
      .status(400)
      .json({ message: "Data de início e fim são obrigatórias" });
  }

  try {
    const aberturas = await getAberturasPorPeriodo(
      start as string,
      end as string
    );
    return res.status(200).json(aberturas);
  } catch (error) {
    console.error("Erro ao buscar aberturas por período", error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar aberturas por período" });
  }
};
