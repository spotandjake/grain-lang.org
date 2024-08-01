import MonacoEditor from '@monaco-editor/react';

import VScodeConfig from "../../grain-language-server/editor-extensions/vscode/package.json";

export default function Editor({editorRef}) {
  function handleEditorWillMount(monaco) {
    console.log('me');
    console.log(monaco);
    // Add Grain To The Language List
    monaco.languages.register({ id: "grain" });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider("grain", {
      tokenizer: {
        root: [
          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
        ],
      },
    });

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("grain", {
      base: "vs",
      inherit: false,
      rules: [
        { token: "custom-info", foreground: "808080" },
        { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
        { token: "custom-notice", foreground: "FFA500" },
        { token: "custom-date", foreground: "008800" },
      ],
      colors: {
        "editor.foreground": "#000000",
      },
    });

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider("grain", {
      provideCompletionItems: () => {
        var suggestions = [
          {
            label: "simpleText",
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: "simpleText",
          },
          {
            label: "testing",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "testing(${1:condition})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "ifelse",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              "if (${1:condition}) {",
              "\t$0",
              "} else {",
              "\t",
              "}",
            ].join("\n"),
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "If-Else Statement",
          },
        ];
        return { suggestions: suggestions };
      },
    });
    // Add Grain To The Grammar List
    // Set Default Language
    // Add Our Custom Themes
  }
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  return (
    <MonacoEditor
      theme="grain"
      language="grain"
      defaultValue={'module Main\nprint("Hello World")'}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
}
