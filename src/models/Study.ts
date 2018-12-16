import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Study {
    @PrimaryColumn()
    id!: string;

    @Column("text")
    title!: string;

    @Column("text")
    content!: string;

    @ManyToOne(type => User, user => user.studies)
    user!: User

}