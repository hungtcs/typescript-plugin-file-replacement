Typescript Plugin File Replacement
====

**this plugin replace file content instead of import path.**

### Usage

```jsonc
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "typescript-plugin-file-replacement",
        "replacements": [
          {
            "replace": "src/dev.env.ts",
             "with": "src/prod.env.ts"
          }
        ]
      }
    ]
  }
}
```
