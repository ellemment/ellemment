// #app/interface/composite/account/account-dashboard.tsx

import { Link  } from "@remix-run/react"
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
import { useOptionalUser } from "#app/utils/user"

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
    const loggedInUser = useOptionalUser()
    const isOwner = loggedInUser?.id === user.id

    const dashboardNavItems = [
        {
            items: [
                ...(isOwner ? [{ title: "Create", icon: "plus-circled", to: "./new" }] : []),
            ],
        },
    ]

    return (
        <Sidebar
            variant="sidebar"
            {...props}
            className={cn("z-60", props.className)}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <Card className="h-16 border-0 shadow-none bg-transparent p-4 px-2">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3 w-full">
                                <Avatar className="h-10 w-10 flex-shrink-0">
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
                                <div className="flex flex-col items-start w-full">
                                    <span className="text-md font-semibold text-left">
                                        {user.name || user.username}
                                    </span>
                                    <span className="text-sm text-muted-foreground text-left">
                                        @{user.username}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="mt-4">
                {dashboardNavItems.map((section, index) => (
                    <div key={index} className="py-2">
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

