// #app/interface/composite/account/account-dashboard.tsx

import { Link , useLocation } from "@remix-run/react"
import * as React from "react"
import { Icon } from "#app/interface/foundations/icons/icon"
import { Avatar, AvatarImage, AvatarFallback } from "#app/interface/shadcn/avatar"
import { Card } from "#app/interface/shadcn/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#app/interface/shadcn/collapsible"
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
    const location = useLocation()
    const isOwner = loggedInUser?.id === user.id
    const [isOpen, setIsOpen] = React.useState(!location.pathname.includes('/content'))

    const dashboardNavItems = [
        {
            items: [
                ...(isOwner ? [{ title: "Create", icon: "plus-circled", to: "./new" }] : []),
            ],
        },
    ]

    return (
        <Sidebar
            variant="inset"
            {...props}
            className={cn("z-60", props.className)}
        >
            <SidebarHeader>
                <SidebarMenu>
                    {isOwner ? (
                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                            <CollapsibleTrigger className="w-full">
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
                                                    Elements
                                                </span>
                                            </div>
                                        </div>
                                        <Icon 
                                            name={isOpen ? "chevron-down" : "chevron-right"} 
                                            className="h-4 w-4 text-muted-foreground flex-shrink-0" 
                                        />
                                    </div>
                                </Card>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenu className="px-2 pt-2">
                                    <SidebarMenuItem className="w-full">
                                        <SidebarMenuButton asChild className="w-full justify-start">
                                            <Link to={`/users/${user.username}/content`}>Elements</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem className="w-full">
                                        <SidebarMenuButton asChild className="w-full justify-start">
                                            <Link to="/user/settings">Settings</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </CollapsibleContent>
                        </Collapsible>
                    ) : (
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
                                            Elements
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
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

