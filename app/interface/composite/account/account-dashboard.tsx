// #app/interface/composite/account/account-dashboard.tsx

import { Link } from "@remix-run/react"
import * as React from "react"
import { Icon } from "#app/interface/foundations/icons/icon"
import { Avatar, AvatarImage, AvatarFallback } from "#app/interface/shadcn/avatar"
import { Card } from "#app/interface/shadcn/card"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "#app/interface/shadcn/sidebar"
import { cn, getUserImgSrc } from "#app/utils/misc"

export const dashboardNavItems = [
    {
        title: "Content",
        items: [
            { title: "Create", icon: "plus-circled", to: "./new" },
            { title: "Elements", icon: "check-circled", to: "./" },
        ],
    },
]

interface AccountDashboardProps extends React.ComponentProps<typeof Sidebar> {
    user: {
        id: string
        name: string | null
        username: string
        image?: { id: string } | null
        content: Array<{ id: string; title: string; createdAt: string }>
    }
}

export function AccountDashboard({ user, ...props }: AccountDashboardProps) {
    return (
        <Sidebar
            variant="inset"
            {...props}
            className={cn("z-60", props.className)}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
                        <Link to={`/users/${user.username}`} className="flex items-center gap-3 hover:opacity-50 transition-opacity">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={user ? getUserImgSrc(user.image?.id) : ''}
                                        alt={user?.name ?? user?.username}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="text-sm">
                                        {user?.name?.[0]?.toUpperCase() ??
                                            user?.username?.[0]?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-md font-semibold leading-none pb-1">{user?.name}</span>
                                    <span className="text-xs text-muted-foreground">@{user?.username}</span>
                                </div>
                            </div>
                        </Link>
                    </Card>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {dashboardNavItems.map((section) => (
                    <div key={section.title} className="py-2">
                        <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/60">
                            {section.title}
                        </h2>
                        <SidebarMenu>
                            {section.items.map((item) => (
                                <SidebarMenuItem key={item.to}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.to}>
                                            <Icon name={item.icon} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {user.content.map((content) => (
                                <SidebarMenuItem key={content.id}>
                                    <SidebarMenuButton asChild>
                                        <Link to={`./${content.id}`}>
                                            <Icon name="file-text" />
                                            <span>{content.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </div>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}

