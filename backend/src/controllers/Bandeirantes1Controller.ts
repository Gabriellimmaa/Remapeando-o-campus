import { Request, Response } from "express";

import { getRepository } from "typeorm";

import Bandeirantes1  from "../models/Bandeirante1";

export default {
    async index(request: Request, response: Response) {
        const bandeirantes1Repository = getRepository(Bandeirantes1);

        const rooms = await bandeirantes1Repository.find();
        
        return response.json(rooms);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const bandeirantes1Repository = getRepository(Bandeirantes1);

        const room = await bandeirantes1Repository.findOneOrFail(id);
        
        return response.json(room);
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            description
        } = request.body;
    
        const bandeirantes1Repository = getRepository(Bandeirantes1);
    
        const room = bandeirantes1Repository.create({
            name,
            latitude,
            longitude,
            description
        });
    
        await bandeirantes1Repository.save(room);
    
        return response.status(201).json(room);
    }
}