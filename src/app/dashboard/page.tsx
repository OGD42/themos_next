import Link from "next/link";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Canada from "@/assets/images/canada.jpg";
import Germany from "@/assets/images/germany.jpg";
import Spain from "@/assets/images/spain.jpg";
import USA from "@/assets/images/usa.jpg";

export default function Dashboard() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 bg-neutral-950 px-4 py-16 antialiased">
      <h1 className="text-xl font-extrabold tracking-tight sm:text-[2rem]">
        Me gustaría migrar a:
      </h1>
      <div className="flex flex-grow flex-row flex-wrap justify-center gap-4">
        <Link href="/dashboard/canada">
          <Card className="py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <h4 className="text-xl font-bold uppercase">Canada</h4>
              <p className="text-tiny font-bold">Citizenship: 5 to 10 years</p>
              <small className="text-default-500">
                Permanent Residence: 2 years.
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                src={Canada.src}
                width={270}
              />
            </CardBody>
          </Card>
        </Link>
        <Card className="cursor-not-allowed py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <h4 className="text-xl font-bold uppercase">Estados Unidos</h4>
            <p className="text-tiny font-bold">No Disponible</p>
            <small className="text-default-500">Próximamente</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="rounded-xl object-cover"
              src={USA.src}
              width={270}
            />
          </CardBody>
        </Card>

        <Link href="/dashboard/spain">
          <Card className="py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <h4 className="text-xl font-bold uppercase">España</h4>
              <p className="text-tiny font-bold">Citizenship: 2 to 10 years</p>
              <small className="text-default-500">
                Permanent Residence: 1 to 2 years.
              </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                src={Spain.src}
                width={270}
              />
            </CardBody>
          </Card>
        </Link>

        <Card className="cursor-not-allowed py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <h4 className="text-xl font-bold uppercase">Alemania</h4>
            <p className="text-tiny font-bold">No Disponible</p>
            <small className="text-default-500">Próximamente</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="rounded-xl object-cover"
              src={Germany.src}
              width={270}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
