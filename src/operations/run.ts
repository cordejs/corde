import { Response } from "../parameter"
import { message, configs } from "../global"

export default class runTest {

  private testName: string

  constructor(testName: string) {
    this.testName = testName
  }

  async run(...steps: Response[]): Promise<void> {
    let testsOk = true
    if (steps === undefined) {
      this.sendPassedResponse()
    } else {
      steps.forEach(async step => {
        await message.channel.send(step.say)

        const answer = await message.channel.awaitMessages(
          responseName => responseName.author.id === configs.botTestId,
          {
            max: 1,
            time: configs.timeOut ? configs.timeOut : 10000,
            errors: ["time"]
          }
        )

        if (answer.first().content === step.wait) {
          this.sendPassedResponse()
        } else {
          this.sendErrorResponse(step.wait.toString(), answer.first().content)
          testsOk = false
        }
      })

      if (testsOk) {
        const okMessage = "All tests finished successfully"
        console.info(okMessage)
        message.channel.send(okMessage)
      }
      else {
        const failMessage = "Tests runned with errors"
        console.info(failMessage)
        message.channel.send(failMessage)
      }
    }
  }

  private sendPassedResponse() {
    console.info(`${this.testName} passed successfully`)
  }

  private sendErrorResponse(expected: string, response: string) {
    console.error(`${this.testName} not passed successfully. Expected ${expected} to be ${response} `)
  }
}

