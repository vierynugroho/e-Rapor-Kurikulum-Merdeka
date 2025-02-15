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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { UpdateTeacherType } from '@/types/teacher';
import UpdateProfile from '@/app/(pages)/(main)/profile/update';
import { getTeacher } from '@/services/pages/(user)/teachers';
import { useQuery } from '@tanstack/react-query';

export function NavUser({ user }: { user: UpdateTeacherType }) {
    const { isMobile } = useSidebar();
    const { data } = useQuery({
        queryFn: () => getTeacher(user.id!),
        queryKey: ['profileData', user.id],
        enabled: !!user,
    });

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
                                    <Image
                                        src={'/assets/logo.png'}
                                        alt="profile photo"
                                        width={50}
                                        height={50}
                                    />
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
                            {/* Edit Action */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem
                                        onSelect={e => e.preventDefault()}
                                    >
                                        <BadgeCheck />
                                        Profile
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] md:max-w-[768px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Perbarui Data Anda
                                        </DialogTitle>
                                        <DialogDescription>
                                            Perbarui data anda di sini
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <UpdateProfile user={data!} />
                                    </div>
                                </DialogContent>
                            </Dialog>
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
