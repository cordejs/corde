import { Channel, DMChannel, GuildChannel, NewsChannel, TextChannel } from "discord.js";
import { getChannelName } from "../../src/utils";
import MockDiscord from "../mocks/mockDiscord";

const mock = new MockDiscord();

describe("testing getChannelName", () => {
  it("should get channel's name of GuildChannel", () => {
    const channel = new GuildChannel(mock.guild, {});
    const name = "name text";
    channel.name = name;
    expect(getChannelName(channel)).toEqual(name);
  });

  it("should get channel's name of NewsChannel", () => {
    const channel = new NewsChannel(mock.guild, {});
    const name = "name text";
    channel.name = name;
    expect(getChannelName(channel)).toEqual(name);
  });

  it("should return undefined for Channel", () => {
    const channel = new Channel(mock.client, {});
    expect(getChannelName(channel)).toBeFalsy();
  });

  it("should return undefined for NewsChannel", () => {
    const channel = new DMChannel(mock.client, {});
    expect(getChannelName(channel)).toBeFalsy();
  });

  it("should get channel's name of TextChannel", () => {
    const channel = new TextChannel(mock.guild, {});
    const name = "name text";
    channel.name = name;
    expect(getChannelName(channel)).toEqual(name);
  });
});
