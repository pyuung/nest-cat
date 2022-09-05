import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard는 Strategy를 자동으로 실행한다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
