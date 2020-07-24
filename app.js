import { createApp, RoutingError } from "servest";
import ErrorControl from "./src/Errors/index.js";
const app = createApp();

// Definir controlador de error global para la aplicación
app.catch(ErrorControl(RoutingError));

app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/plain",
    }),
    body: "Hello, Servest!",
  });
});

app.get(new RegExp("^/foo/(.+)"), async (req) => {
  const [_, id] = req.match;
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({ id }),
  });
});

const port = Number(Deno.env.get("PORT"));

app.listen({ port });
