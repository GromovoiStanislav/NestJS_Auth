import { Body, Controller, Get, Post } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AppService } from './app.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const data = await this.appService.login({
      email: payload.email,
      name: payload.name,
      image: payload.picture
    })
    return data;
  }
}
