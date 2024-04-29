import Link from "next/link";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Canada from "@/assets/images/canada.jpg";
import Germany from "@/assets/images/germany.jpg";
import Spain from "@/assets/images/spain.jpg";
import USA from "@/assets/images/usa.jpg";

export default function Dashboard() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 antialiased z-20">
      <h1 className="text-xl font-extrabold tracking-tight sm:text-[2rem]">
        I would like to migrate to:
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
            <h4 className="text-xl font-bold uppercase">USA</h4>
            <p className="text-tiny font-bold">Not available</p>
            <small className="text-default-500">available soon!</small>
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

        <Card className="cursor-not-allowed py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <h4 className="text-xl font-bold uppercase">Spain</h4>
            <p className="text-tiny font-bold">Not available</p>
            <small className="text-default-500">available soon!</small>
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

        <Card className="cursor-not-allowed py-4">
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <h4 className="text-xl font-bold uppercase">Germany</h4>
            <p className="text-tiny font-bold">Not available</p>
            <small className="text-default-500">available soon!</small>
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
