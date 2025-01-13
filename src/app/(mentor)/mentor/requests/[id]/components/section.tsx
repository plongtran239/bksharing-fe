import { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<IProps> = ({ title, children }) => {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
};
export default Section;
