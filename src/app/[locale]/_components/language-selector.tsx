"use client";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChangeEvent, useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";
import { Select, SelectItem, Avatar } from "@nextui-org/react";

export default function LanguageSelector({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Menu");

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }
  return (
    <Select
      className={clsx(
        "w-[150px]",
        isPending && "transition-opacity [&:disabled]:opacity-30",
        className
      )}
      defaultSelectedKeys={[locale]}
      label={t("menu_select_language")}
      onChange={onSelectChange}
    >
      <SelectItem
        key="en"
        startContent={
          <Avatar
            alt="USA"
            className="w-6 h-6"
            src="https://flagcdn.com/us.svg"
          />
        }
      >
        English
      </SelectItem>
      <SelectItem
        key="es"
        startContent={
          <Avatar
            alt="Mexico"
            className="w-6 h-6"
            src="https://flagcdn.com/mx.svg"
          />
        }
      >
        Español
      </SelectItem>
    </Select>
  );
}
