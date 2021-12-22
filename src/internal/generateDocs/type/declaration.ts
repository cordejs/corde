import { Type, TypeReference } from "typescript";
import { renderType } from ".";
import { RenderContext } from "../context";
import { inlineCode, link } from "../markdown";
import { getSymbolSection } from "../utils";
import { TypeContext } from "./context";
import { getTypeTitle } from "./title";
import { getArrayType, getExportedSymbolByType, isArrayType, isOptionalType } from "./utils";

function getReferenceUrl(type: Type, context: RenderContext): string | undefined {
  const exportedSymbol = getExportedSymbolByType(type, context);

  if (!exportedSymbol) {
    return;
  }

  const section = getSymbolSection(exportedSymbol);
  const location = section !== context.section ? context.getSectionLocation(section) : "";
  const hash = exportedSymbol
    .getName()
    .toLowerCase()
    .replace(/[^a-z\d]+/g, "");

  return [location, hash].join("#");
}

export function renderTypeDeclaration(
  type: Type,
  context: RenderContext,
  typeContext: TypeContext = {},
): string {
  const typeReference = type as TypeReference;
  const arrayType = isArrayType(type) && getArrayType(type);

  if (arrayType) {
    return renderType(arrayType, context, {
      isArray: true,
      name: typeContext.name,
      description: typeContext.description,
    });
  }

  const title = getTypeTitle(type, context);
  const typeArguments = (typeReference.typeArguments || [])
    .map((typeArgument) => renderType(typeArgument, context))
    .join(", ");
  const url = getReferenceUrl(type, context);

  const typeDeclaration = [
    url ? link(title, url) : title,
    ...(typeArguments ? [`&lt;${typeArguments}&gt;`] : []),
    ...(typeContext.isArray ? ["[]"] : []),
  ].join("");

  const nameAndDeclaration = [
    typeContext.name && `${inlineCode(`${typeContext.name}${isOptionalType(type) ? "?" : ""}`)}: `,
    typeDeclaration,
  ].join("");

  return [nameAndDeclaration, typeContext.description].filter(Boolean).join(" - ");
}
