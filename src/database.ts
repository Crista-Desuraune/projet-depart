import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'

@Injectable()
export class Database implements OnModuleInit, OnModuleDestroy {
  readonly pool: Pool

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('DATABASE_URL')
    if (!connectionString) throw new Error('DATABASE_URL est requise')
    this.pool = new Pool({ connectionString, connectionTimeoutMillis: 2000 })
    this.pool.on('error', () => console.error('Connexion PostgreSQL inactive interrompue'))
  }

  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS salles (
                                          id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                          nom text NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reservations (
                                                id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                                salle_id integer NOT NULL REFERENCES salles(id),
        debut timestamptz NOT NULL,
        fin timestamptz NOT NULL,
        CHECK (fin > debut)
        );
    `)
  }

  async onModuleDestroy() {
    await this.pool.end()
  }
}