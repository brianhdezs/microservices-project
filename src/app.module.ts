import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './proveedores/proveedor.entity';
import { ProveedoresModule } from './proveedores/proveedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv867.hstgr.io',
      port: 3306,
      username: 'u954703204_tortillita',
      password: 'Nb@N91*5',
      database: 'u954703204_TortilleriaSys',
      entities: [Proveedor],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Proveedor]),  
    ProveedoresModule,
  ],
})
export class AppModule {}
