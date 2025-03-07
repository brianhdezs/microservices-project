import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // 1. Buscar el usuario en la base de datos
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    // 2. Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    const { hashed_password, ...resto } = user;
    return resto;
  }

  async login(user: any) {
    // user proviene de validateUser (username, role, id, etc.)
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
