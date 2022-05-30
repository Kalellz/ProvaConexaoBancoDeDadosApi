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