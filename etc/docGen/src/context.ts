import { Symbol, TypeChecker } from 'typescript';

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
