import multer from 'multer';
import { insertFilm, insertImage, ListarTodosOsFilmes, BuscarPorID, BuscarPorNome, DeletarFilme, alterarFilme } from '../repository/filmeRepository.js'
import { Router } from "express";


const router = Router();
const upload = multer({ dest: 'storage/CapasFilmes'})


router.post('/filme', async (req, resp) => {
    try{
        const newFilme = req.body;
        resp.send(await insertFilm(newFilme))
    }catch(err){
            resp.status(400).send({
                error: err.message
            })
    }
})
router.put('/filme/:id/capa',upload.single('capa'), async (req,resp)=>{
    try{
        const {id} = req.params;
        const imagem = req.file.path;
        
        const resposta = await insertImage(imagem, id)
        resp.status(204).send()
        } catch(err){
        resp.status(400).send({
            error: err.message
        })
    }
})

router.get('/filme', async (req, resp) => {
	try{
	const resposta = await ListarTodosOsFilmes();
	resp.send(resposta)
} catch(err){
	resp.status(400).send({
	    erro: err.message
    })}})

    router.get('/filme/busca', async (req, resp) => {
        try{
        const {nome} = req.query
        const resposta = await BuscarPorNome(nome);
        if(!resposta)
        throw new Error('filme não encontrado')
        resp.send(resposta)
    } catch(err){
        resp.status(400).send({
        erro : err.message
    })}})

    router.get('/filme/:id', async (req, resp) => {
        try{
            const id = req.params.id;
            const resposta = await BuscarPorID(Number(id));
            if(!resposta)
            throw new Error('filme não encontrado')
            resp.send(resposta)
    } catch(err){
        resp.status(400).send({
        erro : err.message
    })}})

    router.delete('/filme/:id', async (req, resp) => {
        try{ 
            const { id } = req.params;
            const resposta = await DeletarFilme(id);
            if(resposta != 1) 
                throw new Error ('filme não pode ser removido')
            resp.status(204).send()
    } catch(err){
            resp.status(400).send({
                erro: err.message
        })}})

    
    router.put('/filme/:id', async (req, resp) => {
        try{ 
            const { id } = req.params;
            const filme = req.body;
            const resposta = await alterarFilme(id, filme);
            if(resposta != 1) 
                throw new Error ('filme não pode ser alterado')
                else
            resp.status(204).send()
                
    } catch(err){
            resp.status(400).send({
                erro: err.message
        })}})
    
export default router