import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserCreateDto } from "../dto/UserCreate.dto";
import { UserUpdateDto } from "../dto/UserUpdate.dto";
import { User, UserDocument } from "../user.schema";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(UserCreateDto: UserCreateDto): Promise<User>
    {
        let newUser = new this.userModel(UserCreateDto);
        return await newUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(email: string): Promise<User>
    {
        return await this.userModel.findOne({email: email});
    }

    async findByIdAndUpdate(id: string, userUpdateDto: UserUpdateDto) {
        return await (await this.userModel.findByIdAndUpdate(id)).execPopulate();
    }

}