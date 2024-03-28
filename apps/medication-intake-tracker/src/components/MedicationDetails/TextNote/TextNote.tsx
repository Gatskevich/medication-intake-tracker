import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";

interface TextNoteProps {
    text: string | undefined
}

export const TextNote = ({ text }: TextNoteProps) => {
  return <div className="ql-editor">{text && parse(text)}</div>;
};
