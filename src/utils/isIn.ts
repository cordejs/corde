/**
 * Verify if an object is of  an type.
 *
 * @example
 *
 * interface IUser {
 *   save(): Promise<void>;
 * }
 *
 * class User implements IUser {
 *   save() {
 *      ....
 *   }
 * }
 *
 * const user = new User();
 *
 * isIn<IUser>(user, "save") // returns user as IUser
 *
 * @param obj Object to be verified
 * @param typeIdentifier Identifier of the interface
 * @returns Object casted as the type
 * @internal
 */
export function isIn<T>(obj: any, typeIdentifier: keyof T): obj is T {
  return typeIdentifier in obj;
}
