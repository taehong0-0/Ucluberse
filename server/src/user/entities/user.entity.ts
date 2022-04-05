import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";
import { Club } from "src/clubs/entities/club.entity";
import { Department } from "src/departments/entities/department.entity";
import { Posting } from "src/postings/entities/posting.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfilePhoto } from "./profilePhoto.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userIdx: number;
    @Column()
    @IsString()
    name: string;
    @Column()
    @IsNumber()
    departmentIdx: number;
    @Column()
    @IsNumber()
    studentId: number
    @Column()
    @IsEmail()
    email: string;
    @Column()
    @IsString()
    phoneNumber: string
    @Column()
    @IsString()
    nickname: string
    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;
    @ManyToOne(() => Department, department => department.users)
    @JoinColumn({ name: 'departmentIdx', referencedColumnName: 'departmentIdx' })
    department: Department;
    @OneToOne(() => ProfilePhoto, profilePhoto => profilePhoto.user)
    profilePhoto: ProfilePhoto;
    @OneToMany(() => UserClub, userClub => userClub.user)
    userClubs: UserClub[];
    @OneToMany(() => Posting, posting => posting.user)
    postings: Posting[];
}

@Entity()
export class UserClub {
    @PrimaryGeneratedColumn()
    userClubIdx: number;
    @Column()
    @IsNumber()
    userIdx: number;
    @Column()
    @IsNumber()
    clubIdx: number;
    @Column({
        nullable: true,
    })
    @IsString()
    role: string;
    @Column({
        nullable: true,
    })
    @IsString()
    status: string;
    @Column()
    @IsBoolean()
    star: boolean;
    @ManyToOne(() => User, user => user.userClubs)
    @JoinColumn({
        name: 'userIdx',
        referencedColumnName: 'userIdx'
    })
    user: User;
    @ManyToOne(() => Club, club => club.userClubs)
    @JoinColumn({
        name: 'clubIdx',
        referencedColumnName: 'clubIdx',
    })
    club: Club;
}
