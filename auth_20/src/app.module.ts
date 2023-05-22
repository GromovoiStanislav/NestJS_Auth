import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AuthModule} from './auth/auth.module';
import {User} from './typeorm/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'testuser',
            password: '123',
            database: 'mydb',
            entities: [User],
            synchronize: true,
        }),
        PassportModule.register({session: true}),
        AuthModule,
    ]
})
export class AppModule {
}
