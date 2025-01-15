"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import dashboardApi from "@/apis/dashboard.api";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TOP_COURSE_TYPE } from "@/constants/enum";
import { DashboardTopCourseType } from "@/schemas/dashboard.schema";

const chartConfig: ChartConfig = {
  noOfSubscription: {
    label: "Số lượt đăng ký",
    color: "hsl(var(--secondary))",
  },
  rate: {
    label: "Đánh giá",
    color: "hsl(var(--secondary))",
  },
};

const TopCourse = () => {
  const [topCourseType, setTopCourseType] = useState(
    TOP_COURSE_TYPE.TOP_NUMBER_OF_SUBSCRIPTION
  );

  const [topCourses, setTopCourses] = useState<DashboardTopCourseType[]>([]);

  useEffect(() => {
    async function fetchTopCourses() {
      const {
        payload: { data },
      } = await dashboardApi.clientTopCourses(topCourseType);

      setTopCourses(data);
    }

    fetchTopCourses();
  }, [topCourseType]);

  if (!topCourses.length) return null;

  return (
    <div>
      <Separator className="my-10" />
      <h1 className="text-xl text-primary">Danh sách top khóa học</h1>

      <div className="flex justify-end">
        <Select
          defaultValue={topCourseType}
          onValueChange={(value) => setTopCourseType(value as TOP_COURSE_TYPE)}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TOP_COURSE_TYPE.TOP_NUMBER_OF_SUBSCRIPTION}>
              Số lượt đăng ký nhiều nhất
            </SelectItem>
            <SelectItem value={TOP_COURSE_TYPE.TOP_RATE}>
              Đánh giá cao nhất
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-center">
        <ChartContainer config={chartConfig} className="w-1/2 pb-10">
          <BarChart data={topCourses} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey={
                topCourseType === TOP_COURSE_TYPE.TOP_NUMBER_OF_SUBSCRIPTION
                  ? "noOfSubscription"
                  : "rate"
              }
              type="number"
              hide
            />

            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {topCourseType === TOP_COURSE_TYPE.TOP_NUMBER_OF_SUBSCRIPTION ? (
              <Bar
                dataKey="noOfSubscription"
                layout="vertical"
                radius={5}
                fill={"hsl(var(--secondary))"}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--secondary-foreground]"
                  fontSize={12}
                />
              </Bar>
            ) : (
              <Bar
                dataKey="rate"
                layout="vertical"
                radius={5}
                fill={"hsl(var(--secondary))"}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--secondary-foreground]"
                  fontSize={12}
                />
              </Bar>
            )}
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
export default TopCourse;
