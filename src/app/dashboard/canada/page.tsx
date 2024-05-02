"use client";
import { useState, useMemo } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Chat from "../_components/chat";
import Stepper from "../_components/Stepper";
import { ListboxWrapper } from "../_components/ListboxWrapper";

export default function Canada() {
  return (
    <div className="my-10 w-full p-10 z-10">
      <div className="flex w-full flex-col">
        <h1 className="my-2">Canada</h1>
        <Tabs aria-label="Options">
          <Tab key="free" title="Ask Freely">
            <Card>
              <CardBody className="text-white">
                <Chat country="canada" />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="guide" title="Guide me">
            <Card>
              <CardBody>
                <Stepper />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="history" title="History">
            <Card>
              <CardBody>
                <ListboxWrapper />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
