import { SymbolDisplayPart } from "typescript";
import { joinLines } from "./markdown";

export function renderDescription(comments: SymbolDisplayPart[]): string {
  return joinLines(comments.map((comment) => comment.text));
}
