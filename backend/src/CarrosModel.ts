import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Carro {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: number;

  @Column()
  chassi: string;

  @Column()
  renavan: number;

  @Column('text')
  modelo: string;

  @Column('text')
  marca: string;

  @Column()
  ano: number;

}

let connection:Connection;

export async function getCarrosRepository(): Promise<Repository<Carro>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'myangularapp',
      synchronize: true,
      entities: [
        Carro
      ],
    });
  }
  return connection.getRepository(Carro);
}