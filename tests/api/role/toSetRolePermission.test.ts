import { Client } from "discord.js";
import { TestReport } from "../../../src/api";
import { ToSetRolePermission } from "../../../src/api/expectMatches/role";
import { Permission } from "../../../src/utils/permission";
import MockDiscord from "../../mocks/mockDiscord";
import { initCordeClientWithChannel } from "../../testHelper";

let mockDiscord = new MockDiscord();
const commandName = "test";

describe("testing ToSetRolePosition operation", () => {
  afterEach(() => {
    mockDiscord = new MockDiscord();
  });

  it("should get a valid report due to correct defined permission", async () => {
    const corde = createCordeBotWithMockedFunctions(
      mockDiscord.createMockRole("", Permission.ADMINISTRATOR),
    );
    const report = await new ToSetRolePermission(corde, commandName, false).action(
      [Permission.ADMINISTRATOR],
      { id: "123" },
    );

    expect(report).toEqual(
      new TestReport({
        commandName,
        hasPassed: true,
        isNot: false,
        showExpectAndOutputValue: false,
      }),
    );
  });
});

function createCordeBotWithMockedFunctions(findRoleMock: any = mockDiscord.role, hasRole = true) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.hasRole = jest.fn().mockReturnValue(hasRole);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}
