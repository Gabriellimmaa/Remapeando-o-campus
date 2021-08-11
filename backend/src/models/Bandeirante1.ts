import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Bandeirantes1')
export default class Bandeirantes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    description: string;
}