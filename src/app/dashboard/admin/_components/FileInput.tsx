import { useRef, useState, useEffect, DragEventHandler } from "react";

const FileInput = ({ value, onChange }) => {
  const inputRef = useRef();
  const [files, setFiles] = useState<FileList | null>(null);

  // Handle reset
  useEffect(() => {
    if (!value) {
      setFiles(null);
    }
  }, [value]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  addEventListener("dragend", (event) => {});
  const handleDrop = (e: DragEventHandler) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    // Only allows 1 file at a time
    if (files?.length > 1) return;
    setFiles(files);
    onChange(files);
    console.log(`dropped files`, files);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.files);
    }
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  return (
    <>
      <label htmlFor="file" onDragOver={handleDragOver} onDrop={handleDrop}>
        <span>Select or drag and drop a file</span>
      </label>
      <input
        ref={inputRef}
        type="file"
        id="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <ul>
        {Array.from(files).map((file) => (
          <li key={file.lastModified}>{file.name}</li>
        ))}
      </ul>
    </>
  );
};
