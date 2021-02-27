import { task, dest } from "gulp";
import { createProject } from "gulp-typescript";
import rimraf from "rimraf";

const tsProject = createProject("tsconfig.json");

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
  await clearLibFolder();
  return tsProject.src().pipe(tsProject()).js.pipe(dest(tsProject.config.compilerOptions.outDir));
});

task("clear", async () => {
  clearLibFolder();
});
