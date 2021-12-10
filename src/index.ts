/**
 * Ensure that utils is being imported before everything else
 * this will prevent errors like:
 *
 *  Cannot destructure property 'testCollector' of '_core.default' as it is undefined.
 *
 * or
 *
 *     TypeError: (0 , _utils.replaceAll) is not a function
 *
 *     137 |
 *     138 |     if (config.project && (!this.project || forceUpdate)) {
 *   > 139 |       this._project = path.normalize(replaceAll(config.project, ROOT_DIR, this.rootDir));
 *         |                                      ^
 *     140 |     }
 *     141 |
 *     142 |     if (config.botTestId && (!this.botTestId || forceUpdate)) {
 *
 *     at Config.setConfigs (src/core/Config.ts:139:38)
 *     at new Config (src/core/Config.ts:103:10)
 *     at new Runtime (src/core/runtime.ts:110:21)
 *     at Object.<anonymous> (src/core/index.ts:19:17)
 *     at Object.<anonymous> (src/index.ts:10:1)
 */

import "./utils";

export * from "./enums";
