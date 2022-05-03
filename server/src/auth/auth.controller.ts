import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get('login')
    async login(@Res() res: Response, @Query('email') email: string) {
        const {
            access,
            refresh,
            result
        } = await this.authService.googleLogin(email);
        if ( access !== undefined ) {
            res.header('Access-Control-Allow-Credentials','true');
            res.cookie('Authentication', access.accessToken, {
                httpOnly: access.accessOption.httpOnly,
                maxAge: access.accessOption.maxAge,
                secure: access.accessOption.secure,
                sameSite: "none",
            });
            const {  maxAge, secure, httpOnly } = refresh.refreshOption;
            res.cookie('Refresh', refresh.refreshToken, {
                httpOnly,
                maxAge,
                secure,
                sameSite: "none",
            });
        }
        res.send(result);
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    refreshAccessToken(@Req() req: Request, @Res() res: Response) {
        const { userIdx } = this.authService.decodeAccessToken(req.cookies.Authentication);
        const { accessToken, ...accessOption } = this.authService.getCookieWithJwtAccessToken(userIdx); 
        res.cookie('Authentication', accessToken, accessOption);
        res.send({
            msg: 'refreshed',
        });
    }

    @Get('logout')
    @UseGuards(JwtRefreshGuard)
    logout(@Req() req: Request, @Res() res: Response) {
        const { userIdx } = this.authService.decodeAccessToken(req.cookies.Authentication);
        this.userService.removeRefreshToken(userIdx);
        res.clearCookie('Authentication');
        res.clearCookie('Refresh');
        res.send({
            msg: 'logout',
        });
    }
    
}
