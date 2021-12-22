/* eslint-disable @typescript-eslint/ban-types */
import { TypeChecker, Symbol } from "typescript";

export type RenderContext = {
  typeChecker: TypeChecker;
  exportedSymbols: Symbol[];
  section: string;
  getSectionLocation: (section: string) => string;
};

export type DependencyContext = {
  typeChecker: TypeChecker;
  exportedSymbols: Symbol[];
  resolutionPath: Symbol[];
};
