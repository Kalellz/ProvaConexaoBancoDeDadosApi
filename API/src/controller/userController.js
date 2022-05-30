import { Router } from "express";
import { login } from "../repository/userRepository.js";

const router = Router();

router.post("/user/login", async (req, resp) => {
	try {
		const { email, senha } = req.body;
		const linhas = await login(email, senha);
        if(!linhas){
            throw new Error("Email ou senhas inválidos")
        }
        else{
            resp.send("login efetuado com sucesso!")
        }
	} catch (err) {
		resp.status(401).send({
			error: err.message,
		});
	}
});

export default router;