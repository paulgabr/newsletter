import pool from "../database";

export const getUsuariosMetricas = async (id: number) => {
  try {
    const usuarioResult = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    if (usuarioResult.rows.length === 0) {
      return null;
    }

    const usuario = usuarioResult.rows[0];

    const totalAberturasResult = await pool.query(
      "SELECT COUNT(*) FROM aberturas WHERE usuario_id = $1",
      [id]
    );

    const totalAberturas = totalAberturasResult.rows[0].count;

    const historicoAberturasResult = await pool.query(
      "SELECT * FROM aberturas WHERE usuario_id = $1",
      [id]
    );

    const historico = historicoAberturasResult.rows;

    return {
      streak: usuario.streak,
      ultima_abertura: usuario.ultima_abertura,
      total_aberturas: totalAberturas,
      historico,
    };
  } catch (error) {
    console.error("Erro ao buscar métricas de usuário", error);
    throw error;
  }
};
