import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export default class Rooms {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    campus: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    weight: number;

    @Column()
    description: string;
}