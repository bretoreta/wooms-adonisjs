<script setup>
import { Link } from '@inertiajs/vue3';
import { useAppearance } from '~/pages/composables/useAppearance';

import AppLogo from './AppLogo.vue';
import NavUser from '~/pages/components/NavUser.vue';
import NavMain from '~/pages/components/NavMain.vue';
import NavFooter from '~/pages/components/NavFooter.vue';

import { Button } from '~/pages/components/ui/button';
import { BookOpen, Folder, LayoutTemplate, ShoppingBag, Layers2, FolderOpen, CloudLightning } from 'lucide-vue-next';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '~/pages/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/pages/components/ui/dropdown-menu'

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutTemplate,
        active_routes: "admin.dashboard"
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: FolderOpen,
        active_routes: "admin.categories.*"
    },
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingBag,
        active_routes: "admin.products.*"
    },
    {
        title: 'Bundles',
        href: '/bundles',
        icon: Layers2,
        active_routes: "admin.bundles.*"
    },
    {
        title: 'Manual Sync',
        href: '/sync',
        icon: CloudLightning,
        active_routes: "admin.sync.*"
    },
];

const footerNavItems = [
    {
        title: 'Support',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: '#',
        icon: BookOpen,
    },
];

const { updateAppearance } = useAppearance();
const { state } = useSidebar()
</script>

<template>
    <Sidebar collapsible="icon" variant="inset"> 
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <div class="flex items-center justify-between">
                            <Link href="/" class="inline-flex items-center w-full">
                                <AppLogo />
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="ghost" size="icon" v-show="state === 'expanded'">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                        <span class="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Color Mode</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="updateAppearance('light')" class="cursor-pointer">
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="updateAppearance('dark')" class="cursor-pointer">
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="updateAppearance('system')" class="cursor-pointer">
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser :user="{name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'}" />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>