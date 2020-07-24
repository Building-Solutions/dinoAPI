import { Model, Column, BaseModel } from "https://deno.land/x/cotton/mod.ts";

@Model("dinosaurios")
export default class dinosaurios extends BaseModel {
  @Primary()
  id_dino !: string;

  @Column()
  nombre!: string;

  @Column()
  altura!: string;

}
