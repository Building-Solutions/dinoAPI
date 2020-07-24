import {
  connect,
  Model,
  Column,
  BaseModel,
} from "https://deno.land/x/cotton/mod.ts";
import dinosaurios from "../models/dinosaurs.js";

try {
  class dinosaurios extends BaseModel {
    @Primary({ type: ColumnType.String })
    id_dino!: string;

    @Column({ type: ColumnType.String })
    nombre!: string;

    @Column({ type: ColumnType.String })
    altura!: string;
  }

  const db = await connect({
    type: "postgres",
    port: 5432,
    database: "denoland",
    hostname: "localhost",
    username: "postgres",
    password: "1234",
    models: [dinosaurios],
  });

  const user = await db.dinosaurios.query().all();

  for (const user of users) {
    console.log(user); // User { email: 'a@b.com', age: 16, ... }
  }

  module.export = db;
} catch (error) {
  console.log("No se pudo Conectar a la base de datos");
}
