import { Injectable } from "@nestjs/common";
import { ConcertCreateDto } from "./dto/ConcertCreate.dto";
import { ConcertRepository } from "./repository/concert.repository";
import { Concert } from "./schema/concert.schema";


@Injectable()
export class ConcertService
{
    constructor(private concertRepository: ConcertRepository) {}

    async create(concertCreateDto: ConcertCreateDto) : Promise<Concert>
    {
        return await this.concertRepository.create(concertCreateDto);
    }

    async getAll(): Promise<Concert[]> {
        return await this.concertRepository.findAll();
    }

    async delete(id: string): Promise<boolean>
    {
        let x = await this.concertRepository.delete(id);
        return x;
    }
}