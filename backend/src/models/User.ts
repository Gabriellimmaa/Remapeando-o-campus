import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from 'typeorm';

import bcrypt from 'bcryptjs';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }
}