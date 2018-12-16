import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Study } from './Study';

@Entity()
export class User {
	@PrimaryColumn() email!: string;

    @Column() name!: string;
    
    @OneToMany(type=>Study, study => study.user)
    studies!: Study[]
}
