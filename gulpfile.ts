import { task, dest } from "gulp";
import { createProject } from "gulp-typescript";
import rimraf from "rimraf";
import strip from "gulp-strip-comments";

async function clearLibFolder() {
  return new Promise<void>((resolve, reject) => {
    rimraf("./lib", (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

task("default", async () => {
  const tsProject = createProject("tsconfig.json");
  await clearLibFolder();
  const tsResult = tsProject.src().pipe(tsProject());
  const outDir = tsProject.config.compilerOptions.outDir;
  tsResult.js.pipe(strip()).pipe(dest(outDir));
  return tsResult.dts.pipe(dest(outDir));
});

task("clear", async () => {
  clearLibFolder();
});
