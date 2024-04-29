"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Chat from "./_components/chat";
// import cities from "../_data/cities";
// import GuidedChat from "./_components/guided_chat";
import Stepper from "../_components/Stepper";

export default function Spain() {
  return (
    <div className="my-10 w-full p-10">
      <div className="flex w-full flex-col p-10">
        <h1 className="my-2">España</h1>
        <Tabs aria-label="Options">
          <Tab key="guide" title="Guíame">
            <Card>
              <CardBody>
                <Stepper />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="free" title="Pregunta Libremente">
            <Card>
              <CardBody className="text-white">
                <Chat />
              </CardBody>
            </Card>
          </Tab>

          <Tab key="history" title="Historial">
            <Card>
              <CardBody>Próximamente</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
