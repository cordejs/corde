import { beforeStart, afterAll, expect as cordeExpect } from "../../../lib";

beforeStart(() => {});
cordeExpect("emoji").toAddReaction("😄");
afterAll(() => {});
