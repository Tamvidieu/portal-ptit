import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor({ value, onChange, disabled = false, height = 500 }) {
  return (
    <Editor
      apiKey="qro4jcdqf0n75mulb9xw9r3pkn1yrem0ikcibk2zcsrz4mti" // Get free API key from TinyMCE
      value={value}
      onEditorChange={onChange}
      disabled={disabled}
      init={{
        height,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | image | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}

export default TextEditor;
