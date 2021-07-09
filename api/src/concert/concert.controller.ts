import { Body, Controller, Delete, Get, Param, Post, NotFoundException, Put } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertCreateDto } from './dto/ConcertCreate.dto';
import { Concert } from './schema/concert.schema';
import { ConcertUpdateDto } from './dto/ConcertUpdate.dto';

@Controller('concerts')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) {}

    @Get()
    async getAll()
    {
        return this.concertService.getAll();
    }

    @Get('/:id')
    getConcertById(@Param('id') id: string): Promise<Concert> {

        return this.concertService.getConcertById(id)
    }

    @Post()
    createConcert(@Body() concertCreateDto: ConcertCreateDto)
    {
        return this.concertService.create(concertCreateDto);
    }

    @Put('/:id')
    updateConcert(@Param('id') id: string, @Body() concertUpdateDto: ConcertUpdateDto): Promise<Concert> {
        concertUpdateDto.id = id
        return this.concertService.updateConcert(concertUpdateDto)
    }

    @Delete('/:id')
    async deleteEmployee(@Param('id') id: string) {
        //console.log(id);
        let y = await this.concertService.delete(id);
        if (!y) {
            throw new NotFoundException('Record not found to delete')
        }
    }
}
