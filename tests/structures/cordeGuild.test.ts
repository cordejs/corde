import MockDiscord from "../mocks/mockDiscord";
import { CordeGuild } from "../../src/structures/cordeGuild";
import { Locale, SystemChannelFlagsString } from "../../src/types";
import {
  ChannelPosition,
  DefaultMessageNotifications,
  ExplicitContentFilterLevel,
  GuildEditData,
  GuildWidgetData,
  RolePosition,
} from "discord.js";
const mockDiscord = new MockDiscord();
const guild = mockDiscord.guild;
const cordeGuild = new CordeGuild(guild);

describe("testing calls of cordeGuild", () => {
  it("ids should match", () => {
    expect(cordeGuild.id).toEqual(guild.id);
  });

  it("afkChannelID should match", () => {
    expect(cordeGuild.afkChannelID).toEqual(guild.afkChannelID);
  });

  it("afkTimeout should match", () => {
    expect(cordeGuild.afkTimeout).toEqual(guild.afkTimeout);
  });

  it("applicationID should match", () => {
    expect(cordeGuild.applicationID).toEqual(guild.applicationID);
  });

  it("approximateMemberCount should match", () => {
    expect(cordeGuild.approximateMemberCount).toEqual(guild.approximateMemberCount);
  });

  it("approximatePresenceCount should match", () => {
    expect(cordeGuild.approximatePresenceCount).toEqual(guild.approximatePresenceCount);
  });

  it("isAvailable should match", () => {
    expect(cordeGuild.isAvailable).toEqual(guild.available);
  });

  it("isAvailable should match", () => {
    expect(cordeGuild.isAvailable).toEqual(guild.available);
  });

  it("banner should match", () => {
    expect(cordeGuild.banner).toEqual(guild.banner);
  });

  it("banner should match", () => {
    expect(cordeGuild.banner).toEqual(guild.banner);
  });

  it("isDeleted should match", () => {
    expect(cordeGuild.isDeleted).toEqual(guild.deleted);
  });

  it("description should match", () => {
    expect(cordeGuild.description).toEqual(guild.description);
  });

  it("discoverySplash should match", () => {
    expect(cordeGuild.discoverySplash).toEqual(guild.discoverySplash);
  });

  it("icon should match", () => {
    expect(cordeGuild.icon).toEqual(guild.icon);
  });

  it("joinedAt should match", () => {
    expect(cordeGuild.joinedAt).toEqual(guild.joinedAt);
  });

  it("isLarge should match", () => {
    expect(cordeGuild.isLarge).toEqual(guild.large);
  });

  it("maximumMembers should match", () => {
    expect(cordeGuild.maximumMembers).toEqual(guild.maximumMembers);
  });

  it("maximumPresences should match", () => {
    expect(cordeGuild.maximumPresences).toEqual(guild.maximumPresences);
  });

  it("membersCount should match", () => {
    expect(cordeGuild.membersCount).toEqual(guild.memberCount);
  });

  it("membersCount should match", () => {
    expect(cordeGuild.mfaLevel).toEqual(guild.mfaLevel);
  });

  it("name should match", () => {
    expect(cordeGuild.name).toEqual(guild.name);
  });

  it("ownerId should match", () => {
    expect(cordeGuild.ownerId).toEqual(guild.ownerID);
  });

  it("isPartnered should match", () => {
    expect(cordeGuild.isPartnered).toEqual(guild.partnered);
  });

  it("preferredLocale should match", () => {
    expect(cordeGuild.preferredLocale).toEqual(guild.preferredLocale);
  });

  it("premiumSubscriptionCount should match", () => {
    expect(cordeGuild.premiumSubscriptionCount).toEqual(guild.premiumSubscriptionCount);
  });

  it("publicUpdatesChannelId should match", () => {
    expect(cordeGuild.publicUpdatesChannelId).toEqual(guild.publicUpdatesChannelID);
  });

  it("region should match", () => {
    expect(cordeGuild.region).toEqual(guild.region);
  });

  it("region should match", () => {
    expect(cordeGuild.features).toEqual(guild.features);
  });

  it("isVerified should match", () => {
    expect(cordeGuild.isVerified).toEqual(guild.verified);
  });

  it("defaultMessageNotifications should match", () => {
    expect(cordeGuild.defaultMessageNotifications).toEqual(guild.defaultMessageNotifications);
  });

  it("defaultMessageNotifications should match", () => {
    expect(cordeGuild.defaultMessageNotifications).toEqual(guild.defaultMessageNotifications);
  });

  it("should call original delete", async () => {
    const deleteMock = jest.spyOn(guild, "delete").mockImplementation(() => null);

    await cordeGuild.delete();
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });

  it("should call original setName", async () => {
    const setNameMock = jest
      .spyOn(guild, "setName")
      .mockImplementation(() => Promise.resolve(guild));

    const newName = "batata";
    await cordeGuild.updateName(newName);
    expect(setNameMock).toHaveBeenCalledTimes(1);
    expect(setNameMock).toHaveBeenCalledWith(newName);
  });

  it("should call original setPreferredLocale", async () => {
    const setPreferredLocaleMock = jest
      .spyOn(guild, "setPreferredLocale")
      .mockImplementation(() => Promise.resolve(guild));

    const newLocale: Locale = "ar-DZ";
    await cordeGuild.updatePreferredLocale(newLocale);
    expect(setPreferredLocaleMock).toHaveBeenCalledTimes(1);
    expect(setPreferredLocaleMock).toHaveBeenCalledWith(newLocale);
  });

  it("should call original setRegion", async () => {
    const setRegionMock = jest
      .spyOn(guild, "setRegion")
      .mockImplementation(() => Promise.resolve(guild));

    const newRegion = "london";
    await cordeGuild.updateRegion(newRegion);
    expect(setRegionMock).toHaveBeenCalledTimes(1);
    expect(setRegionMock).toHaveBeenCalledWith(newRegion);
  });

  it("should call original setBanner", async () => {
    const setBannerMock = jest
      .spyOn(guild, "setBanner")
      .mockImplementation(() => Promise.resolve(guild));

    const newBanner = "./banner.png";
    await cordeGuild.updateBanner(newBanner);
    expect(setBannerMock).toHaveBeenCalledTimes(1);
    expect(setBannerMock).toHaveBeenCalledWith(newBanner);
  });

  it("should call original setSplash", async () => {
    const setSplashMock = jest
      .spyOn(guild, "setSplash")
      .mockImplementation(() => Promise.resolve(guild));

    const newSplash = "./banner.png";
    await cordeGuild.updateSplash(newSplash);
    expect(setSplashMock).toHaveBeenCalledTimes(1);
    expect(setSplashMock).toHaveBeenCalledWith(newSplash);
  });

  it("should call original setVerificationLevel", async () => {
    const setVerificationLevelMock = jest
      .spyOn(guild, "setVerificationLevel")
      .mockImplementation(() => Promise.resolve(guild));

    const newVerificationLevel = 1;
    await cordeGuild.updateVerificationLevel(newVerificationLevel);
    expect(setVerificationLevelMock).toHaveBeenCalledTimes(1);
    expect(setVerificationLevelMock).toHaveBeenCalledWith(newVerificationLevel);
  });

  it("should call original setSystemChannelFlags", async () => {
    const setSystemChannelFlagsMock = jest
      .spyOn(guild, "setSystemChannelFlags")
      .mockImplementation(() => Promise.resolve(guild));

    const newSystemChannelFlag: SystemChannelFlagsString = "WELCOME_MESSAGE_DISABLED";
    await cordeGuild.updateSystemChannelFlags(newSystemChannelFlag);
    expect(setSystemChannelFlagsMock).toHaveBeenCalledTimes(1);
    expect(setSystemChannelFlagsMock).toHaveBeenCalledWith(newSystemChannelFlag);
  });

  it("should call original setWidget", async () => {
    const setWidgetMock = jest
      .spyOn(guild, "setWidget")
      .mockImplementation(() => Promise.resolve(guild));

    const newWidget: GuildWidgetData = {
      enabled: true,
      channel: mockDiscord.channel.id,
    };
    await cordeGuild.updateWidget(newWidget);
    expect(setWidgetMock).toHaveBeenCalledTimes(1);
    expect(setWidgetMock).toHaveBeenCalledWith(newWidget);
  });

  it("should call original setSystemChannel", async () => {
    const setSystemChannelMock = jest
      .spyOn(guild, "setSystemChannel")
      .mockImplementation(() => Promise.resolve(guild));

    const newSystemChannelId = mockDiscord.channel.id;
    await cordeGuild.updateSystemChannel(newSystemChannelId);
    expect(setSystemChannelMock).toHaveBeenCalledTimes(1);
    expect(setSystemChannelMock).toHaveBeenCalledWith(newSystemChannelId);
  });

  it("should call original setRulesChannel", async () => {
    const setRulesChannelMock = jest
      .spyOn(guild, "setRulesChannel")
      .mockImplementation(() => Promise.resolve(guild));

    const newChannelId = mockDiscord.channel.id;
    await cordeGuild.updateRulesChannel(newChannelId);
    expect(setRulesChannelMock).toHaveBeenCalledTimes(1);
    expect(setRulesChannelMock).toHaveBeenCalledWith(newChannelId);
  });

  it("should call original setRolePositions", async () => {
    const setRolePositionsMock = jest
      .spyOn(guild, "setRolePositions")
      .mockImplementation(() => Promise.resolve(guild));

    const newRolePositions: RolePosition = {
      position: 1,
      role: mockDiscord.role.id,
    };
    await cordeGuild.updateRolePosition(newRolePositions);
    expect(setRolePositionsMock).toHaveBeenCalledTimes(1);
    expect(setRolePositionsMock).toHaveBeenCalledWith([newRolePositions]);
  });

  it("should call original setPublicUpdatesChannel", async () => {
    const setPublicUpdatesChannelMock = jest
      .spyOn(guild, "setPublicUpdatesChannel")
      .mockImplementation(() => Promise.resolve(guild));

    const newPublicUpdatesChannel = mockDiscord.channel.id;
    await cordeGuild.updatePublicUpdatesChannel(newPublicUpdatesChannel);
    expect(setPublicUpdatesChannelMock).toHaveBeenCalledTimes(1);
    expect(setPublicUpdatesChannelMock).toHaveBeenCalledWith(newPublicUpdatesChannel);
  });

  it("should call original setOwner", async () => {
    const setOwnerMock = jest
      .spyOn(guild, "setOwner")
      .mockImplementation(() => Promise.resolve(guild));

    const newOwner = mockDiscord.user.id;
    await cordeGuild.updateOwner(newOwner);
    expect(setOwnerMock).toHaveBeenCalledTimes(1);
    expect(setOwnerMock).toHaveBeenCalledWith(newOwner);
  });

  it("should call original setIcon", async () => {
    const setIconMock = jest
      .spyOn(guild, "setIcon")
      .mockImplementation(() => Promise.resolve(guild));

    const newIcon = "./icon.png";
    await cordeGuild.updateIcon(newIcon);
    expect(setIconMock).toHaveBeenCalledTimes(1);
    expect(setIconMock).toHaveBeenCalledWith(newIcon);
  });

  it("should call original setExplicitContentFilter", async () => {
    const setIconMock = jest
      .spyOn(guild, "setExplicitContentFilter")
      .mockImplementation(() => Promise.resolve(guild));

    const newExplicitContentFilter: ExplicitContentFilterLevel = "DISABLED";
    await cordeGuild.updateExplicitContentFilter(newExplicitContentFilter);
    expect(setIconMock).toHaveBeenCalledTimes(1);
    expect(setIconMock).toHaveBeenCalledWith(newExplicitContentFilter);
  });

  it("should call original setDiscoverySplash", async () => {
    const setDiscoverySplashMock = jest
      .spyOn(guild, "setDiscoverySplash")
      .mockImplementation(() => Promise.resolve(guild));

    const newDiscoverySplash = "./discoverysplash.png";
    await cordeGuild.updateDiscoverySplash(newDiscoverySplash);
    expect(setDiscoverySplashMock).toHaveBeenCalledTimes(1);
    expect(setDiscoverySplashMock).toHaveBeenCalledWith(newDiscoverySplash);
  });

  it("should call original setDefaultMessageNotifications", async () => {
    const setDefaultMessageNotificationsMock = jest
      .spyOn(guild, "setDefaultMessageNotifications")
      .mockImplementation(() => Promise.resolve(guild));

    const newDefaultMessageNotifications: DefaultMessageNotifications = "ALL";
    await cordeGuild.updateDefaultMessageNotifications(newDefaultMessageNotifications);
    expect(setDefaultMessageNotificationsMock).toHaveBeenCalledTimes(1);
    expect(setDefaultMessageNotificationsMock).toHaveBeenCalledWith(newDefaultMessageNotifications);
  });

  it("should call original setChannelPositions", async () => {
    const setChannelPositionsMock = jest
      .spyOn(guild, "setChannelPositions")
      .mockImplementation(() => Promise.resolve(guild));

    const newChannelPositions: ChannelPosition = {
      channel: mockDiscord.channel.id,
      position: 2,
    };
    await cordeGuild.updateChannelPositions(newChannelPositions);
    expect(setChannelPositionsMock).toHaveBeenCalledTimes(1);
    expect(setChannelPositionsMock).toHaveBeenCalledWith([newChannelPositions]);
  });

  it("should call original setAFKTimeout", async () => {
    const setAFKTimeoutMock = jest
      .spyOn(guild, "setAFKTimeout")
      .mockImplementation(() => Promise.resolve(guild));

    const newAfkTimeout = 60;
    await cordeGuild.updateAFKTimeout(newAfkTimeout);
    expect(setAFKTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setAFKTimeoutMock).toHaveBeenCalledWith(newAfkTimeout);
  });

  it("should call original setAFKChannel", async () => {
    const setAFKTimeoutMock = jest
      .spyOn(guild, "setAFKChannel")
      .mockImplementation(() => Promise.resolve(guild));

    const newAfkChannel = mockDiscord.channelId;
    await cordeGuild.updateAFKChannel(newAfkChannel);
    expect(setAFKTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setAFKTimeoutMock).toHaveBeenCalledWith(newAfkChannel);
  });

  it("should call original edit", async () => {
    const editMock = jest.spyOn(guild, "edit").mockImplementation(() => Promise.resolve(guild));

    const newGuildData: GuildEditData = {
      name: "batata",
    };
    await cordeGuild.update(newGuildData);
    expect(editMock).toHaveBeenCalledTimes(1);
    expect(editMock).toHaveBeenCalledWith(newGuildData);
  });
});
