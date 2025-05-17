import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className="h-[400px] md:h-[200px] dark:bg-black dark:text-white"
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
          [{ 'size': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['code-block'],
          ['clean']
        ]
      }}
    />
  );
};

export default RichTextEditor;
