import pool from "../database";

const isNextDay = (hoje: Date, ultimaAbertura: Date) => {
  const tomorrow = new Date(hoje);
  tomorrow.setDate(tomorrow.getDate() - 1);
  return ultimaAbertura.toDateString() === tomorrow.toDateString();
};

export const registrarAbertura = async (email: string) => {
  try {
    const usuarioResult = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioResult.rows.length === 0) {
      return null;
    }

    const usuario = usuarioResult.rows[0];
    const usuarioId = usuario.id;

    const ultimaAbertura = new Date(usuario.ultima_abertura);
    const hoje = new Date();

    let novoStreak = usuario.streak;

    if (isNextDay(hoje, ultimaAbertura)) {
      novoStreak++;
    } else {
      novoStreak = 1;
    }

    await pool.query(
      "UPDATE usuarios SET ultima_abertura = $1, streak = $2 WHERE id = $3",
      [hoje, novoStreak, usuarioId]
    );

    const newsletterResult = await pool.query(
      "SELECT id FROM newsletter ORDER BY data_envio DESC LIMIT 1"
    );

    if (newsletterResult.rows.length === 0) {
      return null;
    }

    const newsletterId = newsletterResult.rows[0].id;

    await pool.query(
      "INSERT INTO aberturas (usuario_id, newsletter_id) VALUES ($1, $2)",
      [usuarioId, newsletterId]
    );

    return {
      success: true,
      message: "Abertura registrada com sucesso",
      streak: novoStreak,
    };
  } catch (error) {
    console.error("Erro ao registrar abertura", error);
    throw error;
  }
};
