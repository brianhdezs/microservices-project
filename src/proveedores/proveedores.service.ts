import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  async obtenerTodos(): Promise<Proveedor[]> {
    return await this.proveedorRepo.find();
  }

  async obtenerPorId(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepo.findOne({ where: { id_proveedor: id } });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }
    return proveedor;
  }
  

  async crearProveedor(proveedor: Proveedor): Promise<Proveedor> {
    return await this.proveedorRepo.save(proveedor);
  }
  async eliminarProveedor(id: number): Promise<void> {
    const proveedor = await this.proveedorRepo.findOneBy({ id_proveedor: id });

    if (!proveedor) {
        throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }

    await this.proveedorRepo.delete(id);
}
async actualizarProveedor(id: number, datosActualizados: Partial<Proveedor>): Promise<Proveedor> {
  const proveedor = await this.proveedorRepo.findOne({ where: { id_proveedor: id } });

  if (!proveedor) {
    throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
  }

  Object.assign(proveedor, datosActualizados);
  return this.proveedorRepo.save(proveedor);
}
}
