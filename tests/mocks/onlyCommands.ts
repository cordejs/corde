import { command } from "../../src";
import consts from "./constsNames";

command(consts.COMMAND_1).shouldReturn(consts.COMMAND_RESPONSE_1);
