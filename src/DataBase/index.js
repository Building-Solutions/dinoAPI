import { Client } from "https://deno.land/x/postgres/mod.ts";
let DB;

  const config = {
    user: Deno.env.get("USER"),
    database: Deno.env.get("DB"),
    hostname: Deno.env.get("HOST"),
    password: Deno.env.get("PASS"),
    port: Number(Deno.env.get("PORTDB")),
    applicationName: "dinoapi",
  };

  DB = new Client(config);
 

export default DB;
