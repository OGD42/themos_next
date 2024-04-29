"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

type LoadingIndicatorType = {
  isOpen: boolean;
  onClose: () => void;
};
export default function LoadingIndicator({
  isOpen,
  onClose,
}: LoadingIndicatorType) {
  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="items-center justify-center">
              <Spinner size="lg" />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
