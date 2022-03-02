import { Message } from "discord.js";

export async function fetchMessageById(msg: Message, messageId: string | undefined) {
  if (!messageId) {
    return null;
  }

  try {
    return await msg.channel.messages.fetch(messageId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("message not found");
    return null;
  }
}

export function getRoleById(msg: Message, roleId: string | undefined) {
  if (msg && roleId && msg.guild) {
    return msg.guild.roles.cache.get(roleId);
  }
  return null;
}
