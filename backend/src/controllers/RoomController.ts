import { Request, Response } from "express";

import { getRepository } from "typeorm";

import rooms from "../models/Rooms";

import roomView from '../views/room_view';

import * as Yup from 'yup'

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

        const data = {
            name,
            campus,
            latitude,
            longitude,
            weight,
            description,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            campus: Yup.string().required('Nome do campus obrigatório'),
            latitude: Yup.number().required('Latitude da sala obrigatória'),
            longitude: Yup.number().required('Longitude da sala obrigatória'),
            weight: Yup.number().required(),
            description: Yup.string().required('Descrição obrigatória').max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Imagem inválida')
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const room = roomsRepository.create(data);

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