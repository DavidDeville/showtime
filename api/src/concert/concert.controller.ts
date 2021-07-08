import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertCreateDto } from './dto/ConcertCreate.dto';
import { Concert } from './schema/concert.schema';

@Controller('concerts')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {}

    @Get()
    async getAll()
    {
        return this.concertService.getAll();
    }

    @Post()
    createConcert(@Body() concertCreateDto: ConcertCreateDto)
    {
        return this.concertService.create(concertCreateDto);
    }
}
