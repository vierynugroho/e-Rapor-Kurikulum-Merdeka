'use client';

import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserRole } from '@prisma/client';

export function NavUser({
    user,
}: {
    user: {
        id: number;
        email: string | null;
        role: UserRole;
        fullname: string;
        identity_number: string;
    };
}) {
    const { isMobile } = useSidebar();

    const handleLogout = async () => {
        try {
            await signOut({
                callbackUrl: '/login',
                redirect: true,
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user.fullname}
                                    alt={user.fullname}
                                />
                                <AvatarFallback className="rounded-lg">
                                    VN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.fullname}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user.fullname}
                                        alt={user.fullname}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.fullname}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Profile
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={e => e.preventDefault()}
                                    key={`logout-button`}
                                >
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Logout Account
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to logout ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleLogout}
                                        className="bg-red-800 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                                    >
                                        Logout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
