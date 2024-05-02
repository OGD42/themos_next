"use client";
import { useState, useEffect, useRef } from "react";
import {
  Pagination,
  Button,
  Input,
  Textarea,
  CircularProgress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Message } from "ai/react";
import { useAssistant } from "ai/react";
import MessageItem from "../_components/message_item";

export default function Stepper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const sendRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    setInput,
  } = useAssistant({
    api: "/api/assistant",
    body: {
      country: "canada",
    },
  });

  const _handleSubmit = async (data: FormType) => {
    setLoading(true);
    const composedQuery = `Hi Themos. My name is ${data.name}. My education level is ${data.educationLevel} and I'm from ${data.country}. I would like to move to Canada to live, here is a little bit more information about my case: ${data.description}. Would you tell me which is the best visa to move to Canada?`;
    setInput(composedQuery);
    setQuery(composedQuery);
  };

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);
  return (
    <>
      <div className="flex flex-col gap-5 p-10">
        <p className="text-small text-default-500" style={{ color: "#0070b3" }}>
          Step: {currentPage}
        </p>
        <Pagination
          total={4}
          color="secondary"
          page={currentPage}
          onChange={setCurrentPage}
        />
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <div className={`flex flex-col ${currentPage !== 1 ? "hidden" : ""}`}>
            <Input
              placeholder="What's your name?"
              label="Name"
              {...register("name", { required: true })}
              className="my-2"
              isInvalid={!!errors.name?.message}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className={`flex flex-col ${currentPage !== 2 ? "hidden" : ""}`}>
            <Input
              placeholder="What country are you from?"
              label="Country"
              {...register("country", { required: true })}
              className="my-2"
              isInvalid={errors.country && !!errors.country.message}
              errorMessage={errors.country?.message}
            />
          </div>
          <div className={`flex flex-col ${currentPage !== 3 ? "hidden" : ""}`}>
            <Input
              placeholder="Education level"
              label="Education Level"
              {...register("educationLevel")}
              className="my-2"
              isInvalid={
                errors.educationLevel && !!errors.educationLevel.message
              }
              errorMessage={errors.educationLevel?.message}
            />
          </div>
          <div className={`flex flex-col ${currentPage !== 4 ? "hidden" : ""}`}>
            <h1 className="my-2">
              Why would you like to move to Canada? Explain us in detail your
              case.
            </h1>
            <Textarea
              placeholder="Describe us your personal case"
              label="Give us more details"
              {...register("description", { required: true })}
              className="my-2"
              isInvalid={errors.description && !!errors.description.message}
              errorMessage={errors.description?.message}
            />
          </div>
          <div className="my-2 flex gap-2">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              Back
            </Button>
            <Button
              size="sm"
              variant="flat"
              className={`${currentPage !== 4 ? "" : "hidden"}`}
              color={currentPage === 4 ? "primary" : "secondary"}
              onPress={() => {
                if (currentPage < 4) {
                  setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev));
                }
              }}
            >
              {currentPage === 4 ? "Generate response" : "Next"}
            </Button>
            <Button
              size="sm"
              variant={!isValid ? "light" : "solid"}
              type="submit"
              color={"primary"}
              isDisabled={!isValid}
              className={`${currentPage === 4 ? "" : "hidden"}`}
            >
              Generate response
            </Button>
          </div>
        </form>
        <Modal isOpen={loading}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Loading...
            </ModalHeader>
            <ModalBody>
              <CircularProgress size="lg" aria-label="Loading..." />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {!loading && query.length > 0 && (
        <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
          {error != null && (
            <div className="relative rounded-md bg-red-500 px-6 py-4 text-white">
              <span className="block sm:inline">
                Error: {(error as Error).toString()}
              </span>
            </div>
          )}

          {messages.length > 0 &&
            messages.map((m: Message) => (
              <MessageItem key={m.id} message={m} />
            ))}

          {status === "in_progress" && (
            <div className="mb-8 h-8 w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600" />
          )}

          <form
            onSubmit={submitMessage}
            className="flex flex-row items-center"
            ref={sendRef}
          >
            <Textarea
              ref={inputRef}
              multiple
              minRows={2}
              disabled={status !== "awaiting_message"}
              // className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
              value={input}
              placeholder="Describe us your case"
              onChange={handleInputChange}
            />
            <Button className="mx-2 px-8" type="submit" color="default">
              Generate answer
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

const schema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  country: z.string({ required_error: "File name is required" }).min(3),
  educationLevel: z
    .string({ required_error: "Education level is required" })
    .min(4),
  description: z.string({ required_error: "Description is required" }).min(10),
});

type FormType = {
  name: string;
  country: string;
  educationLevel: string;
  description: string;
};
