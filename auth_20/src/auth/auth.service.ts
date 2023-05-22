import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../users/user.entity';
import {UserDetails} from '../utils/types';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async validateUser(details: UserDetails) {
        const user = await this.userRepository.findOneBy({email: details.email});
        if (user) return user;

        // User not found. Creating...
        const newUser = this.userRepository.create(details);
        return this.userRepository.save(newUser);
    }

    async findUser(id: number) {
        return this.userRepository.findOneBy({id});
    }
}
