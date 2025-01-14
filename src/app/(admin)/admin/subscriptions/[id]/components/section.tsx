"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  children: React.ReactNode;
  link?: string;
}

const Section: FC<IProps> = ({ title, children, link }) => {
  const router = useRouter();

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle
          className={cn("text-xl font-semibold text-primary", {
            "cursor-pointer hover:underline": link !== undefined,
          })}
          onClick={() => link && router.push(link)}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
};
export default Section;
