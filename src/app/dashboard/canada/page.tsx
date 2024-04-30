"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Chat from "../_components/chat";
// import cities from "../_data/cities";
// import GuidedChat from "../_components/guided_chat";
import Stepper from "../_components/Stepper";

export default function Spain() {
  return (
    <div className="my-10 w-full p-10 z-10">
      <div className="flex w-full flex-col">
        <h1 className="my-2">Canada</h1>
        <Tabs aria-label="Options">
          <Tab key="guide" title="Guide me">
            <Card>
              <CardBody>
                <Stepper />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="free" title="Ask Freely">
            <Card>
              <CardBody className="text-white">
                <Chat country="canada" />
              </CardBody>
            </Card>
          </Tab>

          <Tab key="history" title="History">
            <Card>
              <CardBody>Soon Available!</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
