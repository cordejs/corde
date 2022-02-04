export const Fake = {
  Date: new Date(1998, 1, 6, 8, 30, 30, 1000),
  UserName: "cordeto",
  Name: "Tortodile",
  Id: "819382540350652502",
  Email: "code@gmail.com",
  AvatarURL:
    "https://github.com/cordejs/corde/blob/master/website/static/img/logo/android-icon-192x192.png",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Fn: (...args: any[]) => null as any,
  FnAsync: (...args: any[]) => Promise.resolve<any>(args),
};
