import { Request, Response } from "express";

import { getRepository } from "typeorm";

import rooms  from "../models/Rooms";

export default {
    async index(request: Request, response: Response) {
        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.find();
        
        return response.json(room);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.findOneOrFail(id);
        
        return response.json(room);
    },

    async create(request: Request, response: Response) {
        const {
            name,
            campus,
            latitude,
            longitude,
            weight,
            description
        } = request.body;
    
        const roomsRepository = getRepository(rooms);
    
        const room = roomsRepository.create({
            name,
            campus,
            latitude,
            longitude,
            weight,
            description
        });
    
        await roomsRepository.save(room);
    
        return response.status(201).json(room);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        await roomsRepository.delete(id);

        const room = await roomsRepository.find();
        
        return response.json(room);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        const {
            name,
            campus,
            latitude,
            longitude,
            weight,
            description
        } = request.body;

        await roomsRepository.update(id, {
            name,
            campus,
            latitude,
            longitude,
            weight,
            description
        });

        const room = await roomsRepository.find();
    
        return response.status(201).json(room);
    },
}