import { Controller, Get, Post, Delete, Body, Put, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) //proteccion en la autenticacion
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  async obtenerTodos(): Promise<{ mensaje: string; proveedores: Proveedor[] }> {
    const proveedores = await this.proveedoresService.obtenerTodos();

    if (proveedores.length === 0) {
      return { mensaje: 'No hay proveedores registrados.', proveedores: [] };
    }

    return { mensaje: `Se encontraron ${proveedores.length} proveedores.`, proveedores };
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number): Promise<{ mensaje: string; proveedor?: Proveedor }> {
    const proveedor = await this.proveedoresService.obtenerPorId(id);
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado.`);
    }

    return { mensaje: `Proveedor con id ${id} encontrado.`, proveedor };
  }

  @Post()
  async crearProveedor(@Body() proveedor: Proveedor): Promise<{ mensaje: string; proveedor: Proveedor }> {
    const nuevoProveedor = await this.proveedoresService.crearProveedor(proveedor);

    return {
      mensaje: `Proveedor con id ${nuevoProveedor.id_proveedor} creado correctamente.`,
      proveedor: nuevoProveedor,
    };
  }

  @Delete(':id')
  async eliminarProveedor(@Param('id') id: number): Promise<{ mensaje: string }> {
    await this.proveedoresService.eliminarProveedor(id);
    return { mensaje: `Proveedor con id ${id} eliminado correctamente.` };
  }

  @Put(':id')
  async actualizarProveedor(
    @Param('id') id: number,
    @Body() datosActualizados: Partial<Proveedor>,
  ): Promise<{ mensaje: string; proveedor: Proveedor }> {
    const proveedorActualizado = await this.proveedoresService.actualizarProveedor(id, datosActualizados);

    return {
      mensaje: `Proveedor con id ${id} actualizado correctamente.`,
      proveedor: proveedorActualizado,
    };
  }
}
