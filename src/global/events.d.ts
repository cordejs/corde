declare namespace corde {
  export interface IOnceEvents {}
  export interface ICommandEvent {
    waitMessage(): Promise<import("discord.js").Message>;
  }
}
