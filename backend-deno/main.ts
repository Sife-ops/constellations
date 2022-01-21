import {
  Application,
  Context,
  HTTPMethods,
} from "https://deno.land/x/oak/mod.ts";

(async () => {
  const app = new Application();

  app.use((ctx: Context) => {
    ctx.request.method;
    ctx.response.body = "hello";
  });

  await app.listen({ port: 4000 });
})();
