"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { DATE_RANGE } from "@/constants/enum";
import { convertMilisecondsToLocaleDateString } from "@/lib/utils";
import { DashboardPaymentType } from "@/schemas/dashboard.schema";

const chartConfig: ChartConfig = {
  totalAmount: {
    label: "Amount",
    color: "hsl(var(--primary))",
  },
  noOfPayments: {
    label: "Payments",
    color: "hsl(var(--primary))",
  },
};

const Payments = () => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("totalAmount");

  const [filterDateRange, setFilterDateRange] = useState(DATE_RANGE.ONE_WEEK);

  const [payments, setPayments] = useState<DashboardPaymentType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const {
        payload: { data },
      } = await dashboardApi.payments(filterDateRange);

      setPayments(data);
    }

    fetchData();
  }, [filterDateRange]);

  if (!payments.length) return null;

  const chartData = payments.map((item) => {
    const [timestamp, values] = Object.entries(item)[0]; // Lấy key và value của object

    return {
      date: convertMilisecondsToLocaleDateString(timestamp, "vi-VN", {
        day: "numeric",
        month: "numeric",
      }),
      totalAmount: values.totalAmount,
      noOfPayments: values.noOfPayments,
    };
  });

  const total = () => ({
    totalAmount: chartData.reduce((acc, curr) => acc + curr.totalAmount, 0),
    noOfPayments: chartData.reduce((acc, curr) => acc + curr.noOfPayments, 0),
  });

  return (
    <div className="w-full space-y-5">
      <div className="flex justify-end gap-5">
        <Select
          defaultValue={DATE_RANGE.ONE_WEEK}
          onValueChange={(value) => setFilterDateRange(value as DATE_RANGE)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DATE_RANGE.TODAY}>Hôm nay</SelectItem>
            <SelectItem value={DATE_RANGE.ONE_WEEK}>7 ngày trước</SelectItem>
            <SelectItem value={DATE_RANGE.ONE_MONTH}>30 ngày trước</SelectItem>
            <SelectItem value={DATE_RANGE.THREE_MONTHS}>
              3 tháng trước
            </SelectItem>
            <SelectItem value={DATE_RANGE.SIX_MONTHS}>6 tháng trước</SelectItem>
            <SelectItem value={DATE_RANGE.ONE_YEAR}>1 năm trước</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={activeChart} onValueChange={setActiveChart}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalAmount">
              Tổng doanh thu (
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total().totalAmount)}
              )
            </SelectItem>
            <SelectItem value="noOfPayments">
              Số lượt thanh toán ({total().noOfPayments})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-center">
        <ChartContainer config={chartConfig} className="h-[460px] w-full pb-10">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              angle={-60}
            />

            <YAxis
              dataKey={activeChart}
              tickFormatter={(value) =>
                activeChart === "totalAmount"
                  ? Intl.NumberFormat("vi-VN").format(value)
                  : value
              }
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            {activeChart === "totalAmount" ? (
              <Line
                dataKey="totalAmount"
                type="monotone"
                stroke="var(--color-totalAmount)"
                strokeWidth={2}
                dot={false}
              />
            ) : (
              <Line
                dataKey="noOfPayments"
                type="monotone"
                stroke="var(--color-noOfPayments)"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
export default Payments;
