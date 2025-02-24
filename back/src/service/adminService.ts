import pool from "../database";

export const getUsuariosComMetricas = async () => {
  try {
    const result = await pool.query(
      `SELECT 
                u.id, u.email, u.username, u.streak, u.ultima_abertura,
                COUNT(a.id) AS total_aberturas
            FROM usuarios u
            LEFT JOIN aberturas a ON u.id = a.usuario_id
            GROUP BY u.id
            ORDER BY u.streak DESC`
    );

    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar usuários com métricas", error);
    throw error;
  }
};

export const getEstatisticasGerais = async () => {
  try {
    const totalUsuarios = await pool.query("SELECT COUNT(*) FROM usuarios");
    const totalNewsletter = await pool.query("SELECT COUNT(*) FROM newsletter");
    const totalAberturas = await pool.query("SELECT COUNT(*) FROM aberturas");
    const mediaStreak = await pool.query("SELECT AVG(streak) FROM usuarios");

    return {
      total_usuarios: totalUsuarios.rows[0].count,
      total_newsletter: totalNewsletter.rows[0].count,
      total_aberturas: totalAberturas.rows[0].count,
      media_streak: mediaStreak.rows[0].avg || 0,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas gerais", error);
    throw error;
  }
};

export const getAberturasPorPeriodo = async (start: string, end: string) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM aberturas WHERE data_abertura BETWEEN $1 AND $2`,
      [start, end]
    );

    return { total_aberturas: result.rows[0].count };
  } catch (error) {
    console.error("Erro ao buscar aberturas por período", error);
    throw error;
  }
};
