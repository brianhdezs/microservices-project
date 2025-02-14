import { Injectable } from '@nestjs/common';
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
      throw new Error(`Proveedor con id ${id} no encontrado`);
    }
    return proveedor;
  }
  

  async crearProveedor(proveedor: Proveedor): Promise<Proveedor> {
    return await this.proveedorRepo.save(proveedor);
  }
}
