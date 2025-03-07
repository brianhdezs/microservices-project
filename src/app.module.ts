import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedores/proveedor.entity';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'; // Importa la entidad User

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv867.hstgr.io',
      port: 3306,
      username: 'u954703204_tortillita',
      password: 'Nb@N91*5',
      database: 'u954703204_TortilleriaSys',
      entities: [Proveedor, User],
      synchronize: true,
    }),
    ProveedoresModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
