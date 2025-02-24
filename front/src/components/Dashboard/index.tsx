import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface Abertura {
  id: number;
  data_abertura: string;
  newsletter_id: number;
}

interface UsuarioMetricas {
  streak: number;
  ultima_abertura: string,
  total_aberturas: number;
  historico: Abertura[];
}

const Dashboard = () => {
  const [usuario, setUsuario] = useState<UsuarioMetricas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  const usuarioId = localStorage.getItem("user_id");

  const getDailyMotivationalMessage = (streak: number) => {
    if (streak === 0) return "Você ainda não começou! Vamos lá!";
    if (streak === 1) return "Você começou agora! Vamos ver até onde consegue ir!";
    if (streak === 2) return "Ótimo começo, continue assim!";
    if (streak === 3) return "Você está criando o hábito! Vamos em frente!";
    if (streak <= 5) return `Incrível! Você está indo muito bem com ${streak} dias seguidos!`;
    if (streak <= 10) return `Uau, ${streak} dias! Você está se superando!`;
    if (streak <= 20) return `Você está imbatível! Já são ${streak} dias consecutivos!`;
    if (streak <= 30) return `Você é uma máquina! ${streak} dias seguidos!`;
    return `Você é um verdadeiro mestre da persistência com ${streak} dias! Vamos continuar assim!`;
  };


  useEffect(() => {
    if (!usuarioId) {
      setError("Usuário não autenticado. Redirecionando...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      setLoading(false);
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios/${usuarioId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        setError("Erro ao buscar usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [API_URL, usuarioId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatarUltimaAbertura = (data: string | null) => {
    if (!data) {
      return new Date().toLocaleDateString("pt-BR");
    }
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  };

  const formatarDiaSemana = (data: string) => {
    const date = new Date(data);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const diasUnicos = Array.from(new Set(usuario?.historico.map(abertura => formatarDiaSemana(abertura.data_abertura))));

  const diasCiclicos = diasUnicos.slice(0, 7);

  return (
    <div className={styles.container}>
      <h1>Dashboard do Usuário</h1>
      {usuario ? (
        <div>
          <div className={styles.metrics}>
            <h2>Métricas</h2>
            <p><strong>Seu Streak:</strong> {usuario.streak} {usuario.streak === 1 ? "dia seguido" : "dias seguidos"}</p>
            <p><strong>Total de Aberturas:</strong> {usuario.total_aberturas}</p>
            <p><strong>Última Abertura:</strong> {formatarUltimaAbertura(usuario.ultima_abertura)}
            </p>
          </div>

          <div className={styles.history}>
            <h2>Histórico de Aberturas</h2>
            <ul>
              {diasCiclicos.map((dia, index) => (
                <li key={index}>{dia}</li>
              ))}
            </ul>
          </div>

          <div className={styles.motivation}>
            <h2>Mensagem Motivacional</h2>
            <p>{getDailyMotivationalMessage(usuario.streak)}</p>
          </div>
        </div>
      ) : (
        <p>Sem dados para exibir.</p>
      )}

      <button className={styles.admin} onClick={() => {
        window.location.href = "/admin";
      }}>
        Admin
      </button>

    </div>
  );
};

export default Dashboard;