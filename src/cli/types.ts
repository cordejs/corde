export interface ICommand {
  action(...args: any[]): Promise<void> | void;
}
