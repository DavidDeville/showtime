import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertCreateDto } from './dto/ConcertCreate.dto';
import { Concert } from './schema/concert.schema';

@Controller('concert')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {}

    @Post()
    createConcert(@Body() concertCreateDto: ConcertCreateDto)
    {
        console.log(concertCreateDto);
        return this.concertService.create(concertCreateDto);
    }
}
