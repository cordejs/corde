import { task, dest } from "gulp";
import { createProject } from "gulp-typescript";
import rimraf from "rimraf";
import strip from "gulp-strip-comments";
import babel from "gulp-babel";

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
  tsResult.js
    .pipe(strip())
    .pipe(
      babel({
        plugins: [
          "@babel/plugin-syntax-nullish-coalescing-operator",
          "@babel/plugin-syntax-optional-chaining",
        ],
      }),
    )
    .pipe(dest(outDir));
  return tsResult.dts.pipe(dest(outDir));
});

task("clear", async () => {
  clearLibFolder();
});
