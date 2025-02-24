import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";

const Registrar = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const API_URL = process.env.REACT_APP_API_URL;

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleRegistrar = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !username) {
			setError("Email é obrigatório");
			return;
		}

		if (!validateEmail(email)) {
			setError("Email é inválido");
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/registrar`, { email, username });

			if (response.status === 201) {
				localStorage.setItem("email", email);
				navigate("/");
			}
		} catch (error: any) {
			if (error.response.status === 400) {
				setError("Usuário já existe");
			} else {
				setError("Falha ao fazer login, tente novamente");
			}
		}

	};


	return (
		<div className={styles.loginContainer}>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.loginForm}>
				<form onSubmit={handleRegistrar}>

					<div className={styles.title}>
						<h2>Registre-se</h2>
					</div>

					{error && <p className={styles.error}>{error}</p>}

					<div className={styles.inputGroup}>
						<label>Nome de usuário:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Escolha um nome de usuário"
							required
						/>
					</div>

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

					<a href="/" className={styles.loginLink}>Tem uma conta? Faça Login</a>
				</form>
			</div>
		</div>
	);
}

export default Registrar;