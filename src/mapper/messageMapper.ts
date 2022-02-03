import { EmbedFieldData, MessageEmbed } from "discord.js";
import { typeOf } from "../utils/typeOf";
import { isString } from "../utils/isString";

export namespace mapper {
  export function embedInterfaceToMessageEmbed(embedLike: corde.IMessageEmbed) {
    const embed = new MessageEmbed();
    if (!embedLike || typeOf(embedLike) !== "object") {
      return embed;
    }

    if (embedLike.author) {
      if (typeof embedLike.author === "string") {
        embed.setAuthor({
          name: embedLike.author,
        });
      } else {
        embed.setAuthor(embedLike.author);
      }
    }

    if (embedLike.color) {
      embed.setColor(embedLike.color);
    }

    if (embedLike.description) {
      embed.setDescription(embedLike.description);
    }

    if (embedLike.fields) {
      embed.addFields(
        ...embedLike.fields.map<EmbedFieldData>((field) => {
          return {
            name: field.name,
            value: field.value,
            inline: !!field.inline,
          };
        }),
      );
    }

    if (embedLike.footer) {
      embed.setFooter(embedLike.footer);
    }

    if (embedLike.image) {
      if (isString(embedLike.image)) {
        embed.setImage(embedLike.image);
      } else {
        embed.setImage(embedLike.image.url);
      }
    }

    if (embedLike.thumbnailUrl) {
      embed.setThumbnail(embedLike.thumbnailUrl);
    }

    if (embedLike.timestamp) {
      embed.setTimestamp(embedLike.timestamp);
    }

    if (embedLike.title) {
      embed.setTitle(embedLike.title);
    }

    if (embedLike.url) {
      embed.setURL(embedLike.url);
    }

    return embed;
  }

  export function messageEmbedToMessageEmbedInterface(message: MessageEmbed) {
    if (!message) {
      return {};
    }

    const embedLike: corde.IMessageEmbed = {};

    if (message.url) {
      embedLike.url = message.url;
    }

    if (message.timestamp) {
      embedLike.timestamp = message.timestamp;
    }

    if (message.author) {
      if (message.author.iconURL || message.author.url) {
        embedLike.author = {
          iconURL: message.author.iconURL,
          name: message.author.name,
          url: message.author.url,
        };
      } else if (message.author.name) {
        embedLike.author = message.author.name;
      }
    }

    if (message.color) {
      embedLike.color = message.color;
    }

    if (message.description) {
      embedLike.description = message.description;
    }

    if (message.fields && message.fields.length) {
      embedLike.fields = [];
      message.fields.forEach((field) => {
        embedLike.fields?.push({
          name: field.name,
          value: field.value,
          inline: !!field.inline,
        });
      });
    }

    if (message.footer) {
      if (message.footer.iconURL) {
        embedLike.footer = {
          iconURL: message.footer.iconURL,
          text: message.footer.text,
        };
      } else if (message.footer.text) {
        embedLike.footer = message.footer;
      }
    }

    if (message.image) {
      if (message.image.height || message.image.width) {
        embedLike.image = {
          url: message.image.url,
          height: message.image.height,
          width: message.image.width,
        };
      } else if (message.image.url) {
        embedLike.image = message.image.url;
      }
    }

    if (message.title) {
      embedLike.title = message.title;
    }

    if (message.thumbnail) {
      embedLike.thumbnailUrl = message.thumbnail.url;
    }
    return embedLike;
  }
}
