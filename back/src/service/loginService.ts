import pool from "../database";

export const realizarLogin = async (email: string) => {
  try {
    const usuario = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuario.rows.length === 0) {
      return null;
    }

    return usuario.rows[0];
  } catch (error) {
    console.error("Erro ao realizar login", error);
    throw error;
  }
};

export const criarUsuario = async (email: string, username: string) => {
  try {
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return null;
    }

    const novoUsuário = await pool.query(
      "INSERT INTO usuarios (email, username) VALUES ($1, $2) RETURNING *",
      [email, username]
    );

    return novoUsuário.rows[0];
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    throw error;
  }
};
