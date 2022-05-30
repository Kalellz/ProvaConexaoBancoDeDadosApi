import { insertFilm } from '../repository/filmeRepository.js'
import { Router } from "express";


const router = Router();

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

export default router