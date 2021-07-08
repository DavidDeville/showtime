import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConcertCreateDto } from "../dto/ConcertCreate.dto";
import { Concert, ConcertDocument } from "../schema/concert.schema";


@Injectable()
export class ConcertRepository 
{
    constructor(@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>) {}

    async create(concertCreateDto: ConcertCreateDto): Promise<Concert>
    {
        let newConcert = new this.concertModel(concertCreateDto);
        return newConcert.save();
    }
}