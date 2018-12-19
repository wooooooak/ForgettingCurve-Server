import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Study {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column("text")
    title!: string;

    @Column("text")
    content!: string;

    @ManyToOne(type => User, user => user.studies)
    user!: User

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: number;

}