import { Injectable } from '@nestjs/common';
import { BaseFailResDto, BaseSuccessResDto } from 'src/commons/response.dto';
import { Connection } from 'typeorm';
import { CollegeResDto } from './dto/college-response.dto';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { College } from './entities/college.entity';

@Injectable()
export class CollegeService {
    constructor(
        private connection: Connection,
    ){}
    
    async create(CreateCollegeDto: CreateCollegeDto){
        const queryrunner = this.connection.createQueryRunner();
        const {name} = CreateCollegeDto;
        const college = new College();
        college.name = name;
        await queryrunner.connect();
        await queryrunner.startTransaction();
        try{
            await queryrunner.manager.save(college);
            await queryrunner.commitTransaction();
            return new BaseSuccessResDto();
        }catch(e){
            await queryrunner.rollbackTransaction();
            return new BaseFailResDto('단과대 생성에 실패했습니다');
        }finally{
            await queryrunner.release();
        }
    }

    async findAll(){
        const queryRunner = this.connection.createQueryRunner();
        const colleges = await queryRunner.manager.find(College);
        if(!colleges){
            return null;
        }
        return new CollegeResDto(colleges);
    }

    async findOne(collegeIdx: number){
        const queryRunner = this.connection.createQueryRunner();
        const college = await queryRunner.manager.findOne(College, {
            where: {
                collegeIdx: collegeIdx,
            }
        });
        if(!college){
            return null;
        }
        return new CollegeResDto(college);
    }
    
    async update(collegeIdx: number, updateCollegeDto: UpdateCollegeDto){
        const queryRunner = this.connection.createQueryRunner();
        const { name } = updateCollegeDto;
        const college = await queryRunner.manager.findOne(College, {
            where: {
                collegeIdx: collegeIdx,
            }
        })
        college.name = name;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            await queryRunner.manager.save(college);
            await queryRunner.commitTransaction();
            return new BaseSuccessResDto();
        }catch(e){
            await queryRunner.rollbackTransaction();
            return new BaseFailResDto('단과대 정보 변경에 실패했습니다.');
        }finally{
            await queryRunner.release();
        }

    }

    async remove(collegeIdx: number){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            await queryRunner.manager.delete(College, collegeIdx);
            await queryRunner.commitTransaction();
            return new BaseSuccessResDto();
        }catch(e){
            await queryRunner.rollbackTransaction();
            return new BaseFailResDto('단과대 정보 삭제에 실패했습니다');
        }finally{
            await queryRunner.release();
        }
    }
}
