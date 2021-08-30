import { Request, Response } from "express";

import { getRepository } from "typeorm";

import rooms from "../models/Rooms";

import roomView from '../views/room_view';

export default {

    // Exibe Todos as salas
    async index(request: Request, response: Response) {
        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.find({
            relations: ['images']
        });

        return response.json(roomView.renderMany(room));
    },


    // Exibe uma sala específica
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        const room = await roomsRepository.findOneOrFail(id, 
            {
                relations: ['images']
            });

        return response.json(roomView.render(room));
    },


    // Cria uma sala
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

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages?.map(image => {
            return { path: image.filename }
        })

        const room = roomsRepository.create({
            name,
            campus,
            latitude,
            longitude,
            weight,
            description,
            images
        });

        await roomsRepository.save(room);

        return response.status(201).json(room);
    },


    // Deleta uma Sala
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const roomsRepository = getRepository(rooms);

        await roomsRepository.delete(id);

        const room = await roomsRepository.find();

        return response.json(room);
    },


    // Atualiza uma sala
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
            description,
        });

        const room = await roomsRepository.find();

        return response.status(201).json(room);
    },

    
    async showListRoom(request: Request, response: Response) {
        const { campus } = request.params;

        const roomsRepository = getRepository(rooms);

        const room = await (await roomsRepository.find()).filter(a => a.campus === campus);

        return response.json(room);
    },
}