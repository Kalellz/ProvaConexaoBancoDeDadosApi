import 'dotenv/config'

import usuarioController from './controller/userController.js'
import filmeController from './controller/filmeController.js'

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

//  configuração end-points
server.use(usuarioController);
server.use(filmeController);
server.use('/storage/CapasFilmes', express.static('storage/CapasFilmes'))

server.listen(process.env.PORT, () => console.log(`API ABERTA NA PORTA ${process.env.PORT}`));