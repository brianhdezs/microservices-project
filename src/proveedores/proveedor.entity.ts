import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column()
  nombre_proveedor: string;

  @Column()
  rfc: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  contacto: string;

  @Column()
  producto_principal: string;

  @Column({ type: 'enum', enum: ['activo', 'inactivo'] })
  estado: string;
}
