import { HomeIcon, SettingsIcon, SpotlightIcon, UsersIcon } from "lucide-react";

export const SIDEBAR_MENU_ITEM = [
    {
        label: "Home",
        href: "",
        icon: HomeIcon,

    },
    {
        label: "Leads",
        href: "leads",
        icon: SpotlightIcon,

    },
    {
        label: "Students",
        href: "students",
        icon: UsersIcon,

    },
    {
        label: "Settings",
        href: "settings",
        icon: SettingsIcon,
    },

] as const