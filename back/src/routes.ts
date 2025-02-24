import { Router } from "express";
import { login, registrar } from "./controllers/loginController";
import { getUsuarios } from "./controllers/usuarioController";
import { webhookAbertura } from "./controllers/webhookController";
import {
  listarAberturasPorPeriodo,
  listarEstatisticas,
  listarUsuarios,
} from "./controllers/adminController";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is running");
});

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.post("/registrar", async (req, res) => {
  await registrar(req, res);
});

router.get("/usuarios/:id", async (req, res) => {
  await getUsuarios(req, res);
});

router.post("/webhook/abertura", async (req, res) => {
  await webhookAbertura(req, res);
});

router.get("/admin/usuarios", async (req, res) => {
  await listarUsuarios(req, res);
});

router.get("/admin/estatisticas", async (req, res) => {
  await listarEstatisticas(req, res);
});

router.get("/admin/aberturas", async (req, res) => {
  await listarAberturasPorPeriodo(req, res);
});

export default router;
