import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Mongoose } from "mongoose";
import { ConcertCreateDto } from "../dto/ConcertCreate.dto";
import * as mongoose from 'mongoose'
import { Concert, ConcertDocument } from "../schema/concert.schema";
import { ConcertUpdateDto } from '../dto/ConcertUpdate.dto';


@Injectable()
export class ConcertRepository 
{
    constructor(@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>) {}

    async create(concertCreateDto: ConcertCreateDto): Promise<Concert>
    {
        let newConcert = new this.concertModel(concertCreateDto);
        return newConcert.save();
    }

    async findAll(): Promise<Concert[]> {
        return await this.concertModel.find();
    }

    async findOne(id: string): Promise<Concert> {
        return await this.concertModel.findOne({ _id: id })
    }
    
    async update(concert: ConcertUpdateDto): Promise<Concert> {

        return await this.concertModel.findOneAndUpdate({ _id: concert.id },
            { name: concert.name }, {
            new: true
        })

    }

    async delete(id: string): Promise<boolean>
    {
        let objId = mongoose.Types.ObjectId(id);

        let ret = await this.concertModel.deleteOne({_id: objId});

        return (ret.n === 1);
    }
}