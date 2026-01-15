import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SalesAnalyticsCard } from "./sales-analytics-card";
import {
  ActivityIcon,
  Badge,
  BadgeCheck,
  Loader2Icon,
  UsersIcon,
} from "lucide-react";

export const DashboardStudents = () => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-xl font-semibold">Sales Report 👋</h1>

        <Select defaultValue="day">
          <SelectTrigger className="md:w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">🌞 Day</SelectItem>
            <SelectItem value="week">🗓️ Week</SelectItem>
            <SelectItem value="month">🌙 Month</SelectItem>
            <SelectItem value="year">🎯 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <SalesAnalyticsCard
          title="New Students"
          value={100}
          icon={UsersIcon}
          color="text-amber-500 dark:text-amber-400"
        />
        <SalesAnalyticsCard
          title="Pending Fees"
          value={"Rs. 1,000"}
          icon={Loader2Icon}
          color="text-amber-500 dark:text-amber-400"
        />
        <SalesAnalyticsCard
          title="Total Revenue"
          value={"Rs. 1,000"}
          icon={ActivityIcon}
          color="text-amber-500 dark:text-amber-400"
        />
        <SalesAnalyticsCard
          title="Total Sales"
          value={100}
          icon={BadgeCheck}
          color="text-amber-500 dark:text-amber-400"
        />
      </div>
    </div>
  );
};
