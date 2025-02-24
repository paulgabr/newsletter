import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface Estatisticas {
  total_usuarios: number;
  total_newsletter: number;
  total_aberturas: number;
  media_streak: number;
}

interface Usuario {
  id: number;
  email: string;
  username: string;
  streak: number;
  total_aberturas: number;
}

const AdminDashboard = () => {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estatisticasRes, usuariosRes] = await Promise.all([
          fetch(`${API_URL}/admin/estatisticas`).then((res) => res.json()),
          fetch(`${API_URL}/admin/usuarios`).then((res) => res.json()),
        ]);

        setEstatisticas(estatisticasRes);
        setUsuarios(usuariosRes);
      } catch (error) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Dashboard Administrativo</h1>

      <div className={styles.metrics}>
        <h2>Métricas Gerais</h2>
        {estatisticas && (
          <ul>
            <li>Total de Usuários: {estatisticas.total_usuarios}</li>
            <li>
              Total de Newsletters Enviadas: {estatisticas.total_newsletter}
            </li>
            <li>Total de Aberturas: {estatisticas.total_aberturas}</li>
            <li>Média de Streaks: {(Number(estatisticas.media_streak) || 0).toFixed(2)}</li>
          </ul>
        )}
      </div>

      <div className={styles.ranking}>
        <h2>Ranking de Engajamento</h2>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Streak</th>
              <th>Total de Aberturas</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.username || usuario.email}</td>
                <td>
                  {usuario.streak} {usuario.streak === 1 ? "dia" : "dias"}
                </td>
                <td>{usuario.total_aberturas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;
