import { CalendarRangeIcon, ReceiptTextIcon, UsersIcon } from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import Card from "@/app/(root)/(home)/components/card";
import AnimationWrapper from "@/components/animation-wrapper";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "BK Sharing",
  description:
    "BK Sharing is an online platform connecting mentors and learners",
};

export default function Home() {
  const t = useTranslations("homePage");

  return (
    <main className="max-lg:text-center">
      {/* Section 1 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0,
          },
        }}
      >
        <section className="bg-secondary">
          <div className="flex-between container py-20 max-lg:px-5 max-lg:py-10 lg:gap-10">
            <AnimationWrapper
              animationProps={{
                initial: {
                  opacity: 0,
                  x: -100,
                },
                transition: {
                  delay: 0.2,
                },
              }}
            >
              <div className="space-y-5 lg:flex-1">
                <div className="flex-center">
                  <h2 className="text-3xl font-bold leading-normal text-secondary-foreground dark:text-primary max-lg:w-4/5 max-sm:w-full">
                    {t("section1.title")}
                  </h2>
                </div>

                <div className="flex-center">
                  <p className="text-justify text-lg dark:text-white max-lg:w-4/5 max-lg:text-center max-sm:w-full lg:pr-10">
                    {t("section1.description")}
                  </p>
                </div>

                <Link href={"/mentors"} className="block">
                  <Button className="">{t("section1.button")}</Button>
                </Link>
              </div>
            </AnimationWrapper>

            <AnimationWrapper
              animationProps={{
                initial: {
                  opacity: 0,
                  x: 100,
                },
                transition: {
                  delay: 0.2,
                },
              }}
            >
              <div className="relative h-[300px] w-[500px] max-lg:hidden">
                <Image
                  src="/images/landing-1.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw,"
                />
              </div>
            </AnimationWrapper>
          </div>
        </section>
      </AnimationWrapper>

      {/* Section 2 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0.4,
          },
        }}
      >
        <section className="container py-20 max-lg:px-5 max-lg:py-10">
          <div className="flex-center flex-col">
            <h2 className="max-sm:flex-center text-4xl font-medium max-sm:flex-col">
              <span className="text-secondary-foreground dark:text-white">
                {t("section2.title.first")}{" "}
              </span>
              <span className="text-primary">{t("section2.title.second")}</span>
            </h2>
            <p className="mt-5 w-1/2 text-center dark:text-white max-lg:w-4/5 max-sm:w-full">
              {t("section2.description")}
            </p>
          </div>

          <ul className="mt-20 grid grid-cols-3 gap-10 max-lg:grid-cols-1 max-lg:gap-20">
            <li className="flex-center">
              <Card
                icon={<ReceiptTextIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-1"
                heading={t("section2.card1.title")}
                content={t("section2.card1.description")}
              />
            </li>

            <li className="flex-center">
              <Card
                icon={<CalendarRangeIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-2"
                heading={t("section2.card2.title")}
                content={t("section2.card2.description")}
              />
            </li>

            <li className="flex-center">
              <Card
                icon={<UsersIcon size={25} className="text-white" />}
                backgroundIcon="bg-icon-3"
                heading={t("section2.card3.title")}
                content={t("section2.card3.description")}
              />
            </li>
          </ul>
        </section>
      </AnimationWrapper>

      {/* Section 3 */}
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0.6,
          },
        }}
      >
        <section className="bg-secondary">
          <div className="container py-20 max-lg:px-5 max-lg:py-10">
            <div className="flex-center flex-col">
              <h2 className="text-4xl font-medium">
                <span className="text-secondary-foreground dark:text-white">
                  {t("section3.title.first")}{" "}
                </span>
                <span className="text-primary">
                  {t("section3.title.second")}
                </span>
              </h2>
              <p className="mt-5 w-1/2 text-center dark:text-white max-lg:w-4/5 max-sm:w-full">
                {t("section3.description")}
              </p>
            </div>

            <ul className="flex-center mt-10 gap-10 max-sm:flex-col">
              <li className="flex-center h-[400px] w-full flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-2.png')] bg-blend-darken">
                <span className="text-xl font-semibold text-white">
                  {t("section3.card1.title")}
                </span>
                <Link href={"/mentor/courses"}>
                  <Button
                    className="rounded-full border-white bg-white/0 text-white"
                    variant="outline"
                  >
                    {t("section3.card1.button")}
                  </Button>
                </Link>
              </li>
              <li className="flex-center h-[400px] w-full flex-col gap-2 rounded-3xl bg-black/40 bg-[url('/images/landing-3.png')] bg-blend-darken">
                <span className="text-xl font-semibold text-white">
                  {t("section3.card2.title")}
                </span>
                <Link href={"/mentors"}>
                  <Button variant="default" className="rounded-full opacity-95">
                    {t("section3.card2.button")}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </AnimationWrapper>
    </main>
  );
}
