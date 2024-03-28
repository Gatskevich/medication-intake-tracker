import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CustomEditor.scss";

interface CustomEditorProps {
  field: any;
  readOnly?: boolean;
  error?: boolean;
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
    <ReactQuill
      className={`custom-editor ${error ? "error" : ""}`}
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
          ["link", "image", "video"],
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
        "link",
        "image",
        "video",
      ]}
    />
  );
};
