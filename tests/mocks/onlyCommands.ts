import { command } from "../../src/command";
import consts from "./constsNames";

command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
