import {
  createApp,
  RoutingError,
  createRouter,
  contentTypeFilter,
} from "servest";
import ErrorControl from "./src/Errors/index.js";
import { DinoRouter } from "./src/routes/routes.js";
const app = createApp();

// Definir controlador de error global para la aplicación
app.catch(ErrorControl(RoutingError));

app.route("/", DinoRouter(createRouter, contentTypeFilter));

const port = Number(Deno.env.get("PORT"));

app.listen({ port });
