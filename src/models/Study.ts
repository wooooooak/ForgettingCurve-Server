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

    @Column({
        default: 1,
        type: "integer"
    })
    cycle!: number;

    @ManyToOne(type => User, user => user.studies)
    user!: User

    @Column("datetime")
    reviewDay!: Date;

    @CreateDateColumn({ type: "datetime"})
    createdAt!: Date;

    @UpdateDateColumn({ type: "datetime" })
    updatedAt!: Date;

}