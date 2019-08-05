import { Response } from "../parameter";
export default class runTest {
    private testName;
    constructor(testName: string);
    run(...steps: Response[]): Promise<void>;
    private sendPassedResponse;
    private sendErrorResponse;
}
