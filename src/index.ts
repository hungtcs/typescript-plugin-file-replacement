import ts from 'typescript';
import path from 'path';

export interface Replacement {
  replace: string,
  with: string,
}

export default function typescriptPluginFileReplacement(
    program: ts.Program,
    { replacements }: { replacements: Array<Replacement> }): ts.TransformerFactory<ts.Node> {
  return (context) => {
    return (node) => {
      if(ts.isSourceFile(node)) {
        for(let replacement of replacements) {
          const { replace, with: _with } = replacement;
          const root = program.getCompilerOptions().rootDir ?? process.cwd();
          const _replace = path.join(root, replace);
          if(node.fileName === _replace) {
            const sourceFile = program.getSourceFile(path.join(root, _with));
            if(sourceFile) {
              return ts.factory.updateSourceFile(
                node,
                sourceFile.statements,
                sourceFile.isDeclarationFile,
                sourceFile.referencedFiles,
                sourceFile.typeReferenceDirectives,
                sourceFile.hasNoDefaultLib,
                sourceFile.libReferenceDirectives,
              );
            } else {
              throw new Error(`can not resolve file ${ _with }`);
            }
          }
        }
      }
      return node;
    };
  };
}
