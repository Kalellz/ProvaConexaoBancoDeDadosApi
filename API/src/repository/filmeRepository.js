import {connection} from './connection.js';

export async function insertFilm(filme){
    const command = `
    INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
        VALUES (?, ?, ?, ?, ?, ?);
    `
    const [response] = await connection.query(command, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = response.insertId
    return filme
}

export async function insertImage(image, id){
    const command = `
    UPDATE tb_filme
        SET img_filme           = ?
    WHERE id_filme              = ?`;

    const[response] = await connection.query(command, [image, id]);
    return response.affectedRows;
}

export async function ListarTodosOsFilmes(){
    const comando =`SELECT id_filme			id,
                    nm_filme			    nome,
                    vl_avaliacao	        avaliacao,
                    dt_lancamento	        lancamento,
                    bt_disponivel	        disponivel
  FROM tb_filme`
const [linhas] = await connection.query(comando)
return linhas
}

export async function BuscarPorID(id){
    const comando =`SELECT id_filme			id,
                    nm_filme			    nome,
                    ds_sinopse              sinopse,
                    img_filme               imagem,
                    vl_avaliacao	        avaliacao,
                    dt_lancamento	        lancamento,
                    bt_disponivel	        disponivel
    FROM  tb_filme
    WHERE id_filme = ? `;
const [linhas] = await connection.query(comando, [id]);
return linhas[0];
}

export async function BuscarPorNome(){
    const comando =`SELECT id_filme			id,
                    nm_filme			    nome,
                    vl_avaliacao	        avaliacao,
                    dt_lancamento	        lancamento,
                    bt_disponivel	        disponivel
    FROM  tb_filme
    WHERE nm_filme like ? `;
const [linhas] = await connection.query(comando, [`%${nome}%`]);
return linhas;
}
export async function DeletarFilme(id){
	const comando = `
			DELETE FROM tb_filme
			WHERE       id_filme = ?`
	const [resposta] = await connection.query(comando, [id])
	return resposta.affectedRows;
}
export async function alterarFilme(id, filme){
	const comando = `
	UPDATE  tb_filme
	SET     nm_filme        = ?,
			ds_sinopse      = ?,
			vl_avaliacao    = ?,
			dt_lancamento   = ?,
			bt_disponivel   = ?
	WHERE id_filme = ?`
	const [resposta] = await connection.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id])
	return resposta.affectedRows;
}