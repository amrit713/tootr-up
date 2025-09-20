"use client";

import {
  BadgeXIcon,
  CheckCheckIcon,
  Spotlight,
  TriangleAlertIcon,
} from "lucide-react";
import { useGetLeadAnalytics } from "../api/use-get-lead-analytics";
import { AnalyticsCard } from "../components/analytics-card";
import { TodayFollowUpTable } from "../components/today-follow-up-table";
import { columns } from "@/features/leads/components/dashboard-column";

import { useGetLeads } from "../api/use-get-leads";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { LeadPieChart } from "../components/lead-pie-chart";
import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";

export const DashboardView = () => {
  const { data, isError, isLoading: analyticsLoading } = useGetLeadAnalytics();

  const formatted = useMemo(() => new Date().toString(), []);
  console.log("🚀 ~ DashboardView ~ formatted:", formatted);
  const asianDate = useMemo(() => {
    const nowDate = new Date(formatted).toLocaleDateString("en-US", {
      timeZone: "Asia/Kathmandu",
    });

    const localDate = new Date(nowDate);

    return localDate.toISOString();
  }, []);
  console.log("🚀 ~ DashboardView ~ asianDate:", asianDate);

  const { data: leads, isLoading: leadsLoading } = useGetLeads({
    dueDate: formatted,
  });

  if (isError) {
    return (
      <ErrorState
        title="Oops! Dashboard Error"
        description="Something went wrong while loading your dashboard. Please try again."
      />
    );
  }

  if (analyticsLoading || leadsLoading) {
    return (
      <LoadingState
        title="Preparing Your Dashboard"
        description="Hang tight! We’re setting up your overview."
      />
    );
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 ">
          <h1 className=" text-xl font-semibold">Lead to follow up</h1>

          <TodayFollowUpTable columns={columns} data={leads || []} />
        </div>

        <LeadPieChart
          totalLeads={data?.totalLead}
          criticalLead={data?.criticalLead}
          convertedLead={data?.convertedLead}
          lostLead={data?.lostLead}
        />
      </div>
    </main>
  );
};
