import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {

    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    date: string;

    @Prop()
    place: string;
}

export const ConcertsSchema = SchemaFactory.createForClass(Concert);