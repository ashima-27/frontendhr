import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ onChange, initialValue , isError,
  erroMessage,}) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (content) => {
    const words = content.trim().split(/\s+/).length;
    console.log("wrd", words);
    setWordCount(words);
    console.log("con", content);
    onChange(content, words); // Pass the content to the parent component
  };

  // File picker callback function
  const filePickerCallback = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*"); // Specify accepted file types, e.g., images
    input.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        // Convert the file to a base64 string
        const base64 = reader.result;
        // Pass the base64 string to the callback function
        callback(base64, {
          text: file.name,
        });
      };
      reader.readAsDataURL(file);
    };
    input.click(); // Trigger the file input dialog
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        apiKey="bfrk76i1ue7cnr7zhf5oa08cxxuzy2kpp44yals0fke93e3p"
        init={{
          height: 200,
          menubar: "file edit insert view format table tools help",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "print",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "paste",
            "code",
            "help",
            "wordcount",
            "imagetools",
          ],
          toolbar:
            " styles " +
            " formatselect fontsizeselect   " +
            "bold italic underline | backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | outdent indent " +
            "removeformat help " +
            " image customImage" +
            " media " +
            "  " +
            "undo redo ",

          content_style:
            "body { font-family: Nunito Sans, sans-serif !important; line-height: 30px; font-size:20px;font-weight:200}; h1{font-weight:700}",
          font_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
            // visualblocks_default_state: true,
          setup: (editor) => {
            editor.on("change", () => {
              handleChange(editor.getContent());
            });

            editor.ui.registry.addToggleButton("customImage", {
              icon: "upload",
              tooltip: "Custom Image",
              onAction: function (api) {
                filePickerCallback((base64, meta) => {
                  editor.insertContent(
                    `<img src="${base64}" alt="${meta.text}">`
                  );
                });
              },
            });
          },
        }}
      />
        {isError && <span className="FormError">{erroMessage}</span>}
    </>
  );
};

export default TinyEditor;
