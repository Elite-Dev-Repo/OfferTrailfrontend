"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import api from "@/api";

export const description = "A radial chart with a label";

const chartConfig = {
  Applications: {
    label: "Applications",
  },
  Pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
  Rejected: {
    label: "Rejected",
    color: "var(--chart-5)",
  },
  Accepted: {
    label: "Accepted",
    color: "var(--chart-1)",
  },
};

export function MyChart() {
  const [Pendingjobs, setPendingjobs] = useState([]);
  const [Acceptedjobs, setAcceptedJobs] = useState([]);
  const [Rejectedjobs, setRejectedJobs] = useState([]);

  const chartData = [
    {
      status: "Pending",
      Applications: Pendingjobs.length,
      fill: "var(--color-Pending)",
    },
    {
      status: "Rejected",
      Applications: Rejectedjobs.length,
      fill: "var(--color-Rejected)",
    },
    {
      status: "Accepted",
      Applications: Acceptedjobs.length,
      fill: "var(--color-Accepted)",
    },
  ];

  const LoadJobs = async () => {
    try {
      const res = await api.get("/myjobs/?status=Pending");
      if (Array.isArray(res.data)) {
        setPendingjobs(res.data);
      } else {
        setPendingjobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setPendingjobs([]);
    }
  };
  const LoadJobs2 = async () => {
    try {
      const res = await api.get("/myjobs/?status=Accepted");
      if (Array.isArray(res.data)) {
        setAcceptedJobs(res.data);
      } else {
        setAcceptedJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setAcceptedJobs([]);
    }
  };
  const LoadJobs3 = async () => {
    try {
      const res = await api.get("/myjobs/?status=Rejected");
      if (Array.isArray(res.data)) {
        setRejectedJobs(res.data);
      } else {
        setRejectedJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setRejectedJobs([]);
    }
  };

  useEffect(() => {
    LoadJobs();
    LoadJobs2();
    LoadJobs3();
  }, []);

  return (
    <Card className="flex flex-col shadow-none border-none">
      <CardHeader className="items-center pb-0">
        <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <RadialBar dataKey="Applications" background>
              <LabelList
                position="insideStart"
                dataKey="status"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
