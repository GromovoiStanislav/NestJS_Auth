import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth/auth.service';
import {JwtAuthGuard} from './auth/guards/jwt-auth.guard';
import {LocalAuthGuard} from './auth/guards/local-auth.guard';
import {ERole} from './auth/role.enum';
import {Roles} from './auth/decorators/roles.decorator';
import {RolesGuard} from './auth/guards/roles.guard';
import {SignUpDto} from './auth/signup.dto';
import {UsersService} from './users/users.service';

@Controller()
export class AppController {

    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) {
    }

    @Get()
    getHello(): string {
        return 'Hello World!';
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/signin')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('auth/signup')
    async signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signup(signUpDto.username, signUpDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('test/profile')
    async getProfile(@Request() req) {
        return this.userService.getProfile(req.user.username);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Get('test/users')
    getProtected() {
        return this.userService.getAll();
    }
}