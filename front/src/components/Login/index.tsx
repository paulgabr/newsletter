import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, { email });
      if (response.status === 200) {
        const data = response.data as { id: string };
        localStorage.setItem("user_id", data.id);

        await axios.post(`${API_URL}/webhook/abertura`, { email });
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Falha ao fazer login, tente novamente");
    }
  };


  return (
    <div className={styles.loginContainer}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.loginForm}>
        <form onSubmit={handleLogin}>

          <div className={styles.title}>
            <h2>Faça o Login</h2>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escreva seu email"
              required
            />
          </div>

          <button type="submit" className={styles.submitForm}>Entrar</button>

          <a href="/registrar" className={styles.registerLink}>Não tem uma conta? Registre-se</a>
        </form>
      </div>
    </div>
  );
}

export default Login;