import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/user.entity';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {GoogleStrategy} from './utils/google.strategy';
import {SessionSerializer} from './utils/serializer';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService,
        },
    ],
})
export class AuthModule {
}
