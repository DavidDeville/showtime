import { Injectable, NotFoundException } from "@nestjs/common";
import { ConcertCreateDto } from "./dto/ConcertCreate.dto";
import { ConcertRepository } from "./repository/concert.repository";
import { Concert } from "./schema/concert.schema";
import { ConcertUpdateDto } from './dto/ConcertUpdate.dto';
import { ConcertSearchDto } from './dto/ConcertSearch.dto';


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

    /*concertSearch(concertSearchDto: ConcertSearchDto) {
        return this.concertRepository.findWithFilters(concertSearchDto);
    }*/

    getConcertById(id: string): Promise<Concert> {

        let concert = this.concertRepository.findOne(id)
        if (!concert) {
            throw new NotFoundException(`${id} was not found`)
        }
        return concert
    }

    updateConcert(concertUpdateDto: ConcertUpdateDto): Promise<Concert> {

        return this.concertRepository.update(concertUpdateDto)
    }
}