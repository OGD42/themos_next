"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input, Button } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { UploadButton } from "~/libs/uploadthing";
import { UploadFileResponse } from "uploadthing/client";

type UploadedFile = {
  name: string;
  key: string;
  url: string;
  size: number;
  customId: string | null;
};

export default function VectorizeForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const [file, setFile] = useState<string | null>(null);
  // const fileRef = useRef<HTMLInputElement>(null);

  async function _handleSubmit(data: FormType) {
    //
    const embedCall = fetch("/api/fileExport", {
      method: "POST",
      body: JSON.stringify(file),
    });
  }

  // async function handleFileLoad(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.target.files) {
  //     const attachedFile = event.target.files[0];
  //     const fileReader = new FileReader();
  //     if (attachedFile) {
  //       // fileReader.readAsDataURL(attachedFile);
  //       fileReader.readAsDataURL(attachedFile);
  //       fileReader.onload = async (e) => {
  //         try {
  //           if (e.target?.result) {
  //             const result = e.target.result;
  //             console.log("RESULT", result);
  //             setFile(result);
  //           }
  //         } catch (error) {
  //           setError(
  //             "tags",
  //             new Error("File size too big. Files cannot be larger than 10 MB"),
  //           );
  //         }
  //       };
  //     }
  //   }
  // }
  console.log("FILE", file);
  return (
    <div className="flex flex-col bg-gray-600 p-10">
      <div className="p-10">
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <Input
            type="text"
            label="Name"
            placeholder="File Name"
            className="my-2"
            {...register("fileName")}
          />
          <Input
            type="text"
            label="Description"
            placeholder="Description"
            className="my-2"
            {...register("description")}
          />
          <Input
            type="text"
            label="Tags"
            placeholder="Write tags with commas"
            className="my-2"
            {...register("tags")}
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              if (res?.[0]) {
                setFile(res[0].url);
              }
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          {/* <div className="relative my-2 grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="upload_file_input">
              <input
                id="upload_file_input"
                className="hidden"
                type="file"
                onChange={handleFileLoad}
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ref={fileRef}
              />
              <Button
                color="secondary"
                className="relative"
                onClick={() => fileRef.current?.click()}
              >
                Upload file
                <FaCloudUploadAlt />
              </Button>
            </label>
          </div> */}
          <Button type="submit" className="my-2 w-full" color="primary">
            Send file
          </Button>
        </form>
      </div>
    </div>
  );
}

const schema = z.object({
  fileName: z.string({ required_error: "File name is required" }).min(4),
  description: z.string({ required_error: "Description is required" }).min(5),
  tags: z.string({ required_error: "Tags are required" }).min(1),
});

type FormType = {
  fileName: string;
  description: string;
  tags: string;
};
