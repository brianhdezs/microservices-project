import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.entity';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  async obtenerTodos(): Promise<Proveedor[]> {
    return this.proveedoresService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number): Promise<Proveedor> {
    return this.proveedoresService.obtenerPorId(id);
  }

  @Post()
  async crearProveedor(@Body() proveedor: Proveedor): Promise<Proveedor> {
    return this.proveedoresService.crearProveedor(proveedor);
  }
}
