import { connection } from "./connection.js";

export async function login(email, senha) {
    const commmand = `
    select id_usuario 		id,
    nm_usuario		        nome,
    ds_email			    email
    from tb_usuario         
    where ds_email 		    = ?
    and ds_senha			= ?`;
    
    const [linhas] = await connection.query(commmand, [email, senha])
    return linhas[0];
}