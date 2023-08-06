import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const DB_PORT = process.env.DB_PORT;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          //url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${DB_PORT}/${POSTGRES_DB}?schema=public`
          url: "file:./database.db"
        }
      }
    })
  }
}