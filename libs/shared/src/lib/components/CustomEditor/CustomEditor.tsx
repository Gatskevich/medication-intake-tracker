import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CustomEditor.scss";
import { FieldError } from "react-hook-form";

interface CustomEditorProps {
  field: any;
  readOnly?: boolean;
  error?: FieldError;
}

export const CustomEditor = ({
  field,
  readOnly = false,
  error,
}: CustomEditorProps) => {
  const handleChange = (content: string) => {
    const strippedContent = content.replace(/<[^>]*>/g, "");
    const isContentEmpty = strippedContent.trim() === "";

    if (isContentEmpty) {
      field.onChange("");
    } else {
      field.onChange(content);
    }
  };

  return (
    <>
      <ReactQuill
        className={`custom-editor`}
        readOnly={readOnly}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
        ]}
      />
      <p className="error-message">{error?.message}</p>
    </>
  );
};
