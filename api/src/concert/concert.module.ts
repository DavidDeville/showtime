import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { ConcertRepository } from './repository/concert.repository';
import { Concert, ConcertsSchema } from './schema/concert.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Concert.name, schema: ConcertsSchema}])],
    providers: [ConcertService, ConcertRepository],
    controllers: [ConcertController],
    exports: [ConcertService]
})
export class ConcertModule {}
