import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const ctx = await esbuild.context({
  entryPoints: {
    register: "src/register.ts"
  },
  bundle: true,
  outdir: "dist",
  platform: "browser",
  target: "es2022"
});

if (watch) {
  await ctx.watch();
  console.log("watching...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
  console.log("built");
}
