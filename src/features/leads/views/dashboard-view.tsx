"use client";

import {
  BadgeXIcon,
  CheckCheckIcon,
  Spotlight,
  TriangleAlertIcon,
} from "lucide-react";
import { useGetLeadAnalytics } from "../api/use-get-lead-analytics";
import { AnalyticsCard } from "../components/analytics-card";

export const DashboardView = () => {
  const { data, isLoading } = useGetLeadAnalytics();
  console.log(data);
  return (
    <main className="flex gap-8  flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:gird-cols-3 xl:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Lead"
          value={data?.totalLead}
          icon={Spotlight}
          color={"text-primary dark:text-purple-400"}
        />
        <AnalyticsCard
          title="Converted Lead"
          value={data?.convertedLead}
          icon={CheckCheckIcon}
          percentage={data?.convertedPrecentage}
          description="converted percentage"
          color="text-emerald-500 dark:text-emerald-400"
        />
        <AnalyticsCard
          title="Lost Lead"
          value={data?.lostLead}
          icon={BadgeXIcon}
          percentage={data?.lostPrecentage}
          description="converted percentage"
          color="text-rose-500 dark:text-rose-400"
        />
        <AnalyticsCard
          title="Critical Lead"
          value={data?.criticalLead}
          icon={TriangleAlertIcon}
          percentage={data?.criticalPrecentage}
          description="converted percentage"
          color="text-orange-500 dark:text-orange-400"
        />
        {/* <AnalyticsCard /> */}
      </div>
    </main>
  );
};
