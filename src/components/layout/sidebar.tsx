"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  ListTodo,
  MessageSquare,
  BarChart,
  Settings,
  FileText,
  Import,
  Key,
  Bot,
  Users,
  CreditCard,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons/Logo";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  instructorOnly?: boolean;
}

const OVERVIEW_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Quizzes", href: "/quizzes", icon: ListTodo },
  { label: "Chat", href: "/chat", icon: MessageSquare },
];

const ANALYTICS_ITEMS: NavItem[] = [
  { label: "User Insights", href: "/analytics", icon: BarChart, instructorOnly: true },
];

const DATA_ITEMS: NavItem[] = [
  { label: "Connectors", href: "#", icon: FileText },
  { label: "Import", href: "#", icon: Import },
];

const DEVELOPER_ITEMS: NavItem[] = [
  { label: "API Keys", href: "#", icon: Key },
  { label: "Agents", href: "#", icon: Bot },
];

const ORGANIZATION_ITEMS: NavItem[] = [
  { label: "Team", href: "#", icon: Users },
  { label: "Billing", href: "#", icon: CreditCard },
  { label: "Settings", href: "#", icon: Settings },
];

interface SidebarUser {
  name?: string | null;
  role: string;
  rank: string;
}

interface SidebarProps {
  user: SidebarUser;
  className?: string;
}

export function Sidebar({ user, className }: SidebarProps) {
  const pathname = usePathname();

  const visibleOverview = OVERVIEW_ITEMS.filter(
    (item) => !item.instructorOnly || user.role === "instructor"
  );
  const visibleAnalytics = ANALYTICS_ITEMS.filter(
    (item) => !item.instructorOnly || user.role === "instructor"
  );

  const NavGroup = ({ title, items }: { title: string, items: NavItem[] }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-[10px] font-semibold text-gray-500 tracking-wider mb-2 uppercase px-3">
          {title}
        </h3>
        <div className="flex flex-col gap-0.5">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors duration-150",
                  isActive
                    ? "bg-gradient-to-b from-blue-50/50 to-blue-100/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_1px_2px_rgba(0,0,0,0.05)] text-blue-700"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-gray-500")} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "h-full w-[240px] border-r border-gray-200 bg-[#f3f4f6] flex flex-col shrink-0 font-sans",
        className
      )}
    >
      <div className="h-14 flex items-center gap-2.5 px-6 shrink-0 mb-4">
        <Logo className="h-4 w-auto" />
        <h1 className="text-[16px] font-extrabold text-gray-900 font-display tracking-tight">
          AeroMentor
        </h1>
      </div>

      <div className="px-4 mb-5">
        <button className="w-full flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300 bg-gray-200 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors border border-gray-200">
          <Plus className="h-3.5 w-3.5" /> Create API key
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 scrollbar-hide pb-6">
        <NavGroup title="Overview" items={visibleOverview} />
        <NavGroup title="Analytics" items={visibleAnalytics} />
        <NavGroup title="Data" items={DATA_ITEMS} />
        <NavGroup title="Developer" items={DEVELOPER_ITEMS} />
        <NavGroup title="Organization" items={ORGANIZATION_ITEMS} />
      </nav>

      <div className="mt-auto p-4 bg-[#f3f4f6]">
        {/* User Profile Card */}
        <div className="border border-gray-200 rounded-xl p-1.5 shadow-sm bg-white relative">
          <div className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-[13px] font-semibold border border-gray-200 shrink-0">
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-900 truncate">
                {user.name ?? "User"}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                user@aeromentor.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
