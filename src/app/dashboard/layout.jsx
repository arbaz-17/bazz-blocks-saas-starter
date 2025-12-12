"use client";

import { useState } from "react";

import { DashboardShellBase } from "@/components/dashboard/layout/DashboardShell";
import { SidebarBase } from "@/components/dashboard/layout/sidebar/SidebarBase";
import { MobileNavDrawerBase } from "@/components/dashboard/layout/sidebar/MobileNavDrawerBase";
import { TopbarBase } from "@/components/dashboard/layout/topbar/TopbarBase";

import { sidebarNavSections } from "@/config/sidebarNavSections";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // TODO: replace with real auth user (useAuth / server session)
  const user = { name: "John Doe", email: "johndoe@example.com" };

  return (
    <>
      {/* Mobile nav (Sheet) */}
      <MobileNavDrawerBase
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        sections={sidebarNavSections}
        title="Navigation"
        subtitle={user?.email ? `Signed in as ${user.email}` : undefined}
      />

      <DashboardShellBase
        sidebar={<SidebarBase sections={sidebarNavSections} brand="Bazz Blocks" />}
        topbar={
          <TopbarBase
            breadcrumbsItems={[{ label: "Dashboard", href: "/dashboard" }]}
            user={user}
            onOpenMobileNav={() => setMobileOpen(true)}
            onSearchSubmit={(q) => {
              // TODO: open command palette / route to search page
              console.log("search:", q);
            }}
            notificationsUnreadCount={0}
            onToggleNotifications={() => {
              // TODO: open notifications panel (Pro) or toast
              console.log("notifications");
            }}
          />
        }
      >
        {children}
      </DashboardShellBase>
    </>
  );
}
