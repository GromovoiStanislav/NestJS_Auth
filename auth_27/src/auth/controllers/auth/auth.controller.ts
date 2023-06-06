import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  Session as GetSession,
  HttpCode, HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthenticatedGuard, LocalAuthGuard } from "src/auth/utils/Guards";
import { AuthenticationProvider } from "../../services/auth/auth";
import { UserDetails } from "../../../utils/types";
import { Session } from "express-session";


type UserSession = Session & Record<"user", any>;

@Controller("auth")
export class AuthController {

  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthenticationProvider
  ) {
  }

  /**
   * POST /api/auth/register
   * create new user
   */
  @Post("register")
  async register(@Body() dto: UserDetails) {
    return this.authService.createUser(dto);
  }


  /**
   * POST /api/auth/login
   * This is the route the user will visit to authenticate
   */
  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  /**
   * GET /api/auth/redirect
   * This is the redirect URL .
   */
  @Get("redirect")
  @UseGuards(AuthenticatedGuard)
  redirect(@Res() res: Response) {
    res.redirect("http://localhost:3000/");
  }

  /**
   * GET /api/auth/status
   * Retrieve the auth status
   */
  @Get("status")
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  /**
   * GET /api/auth/logout
   * Logging the user out
   */
  @Get("logout")
  @UseGuards(AuthenticatedGuard)
  logout(
    @Req() req: Request,
    @Res() res: Response
  ) {
    req.logout((err) => {
      if (err) {
        return err;
      }
      res.redirect("http://localhost:3000/");
    });
  }


  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("logout")
  logout2(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }


}
