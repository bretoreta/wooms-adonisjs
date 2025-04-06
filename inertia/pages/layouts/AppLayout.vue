<script setup lang="ts">
import AppSidebar from '~/pages/components/AppSidebar.vue'
import { Separator } from '~/pages/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/pages/components/ui/sidebar'
import { Toaster } from '~/pages/components/ui/sonner'
import { Head } from '@inertiajs/vue3';
import Breadcrumbs from '~/pages/components/Breadcrumbs.vue';

interface Breadcrumbs {
  title: string,
  href: string
}

defineProps<{ title: string, breadcrumbs: Array<Breadcrumbs> }>()
</script>
<template>
  <SidebarProvider>
    <Head :title="title" />
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 sticky top-0 bg-background z-40 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-0">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumbs :breadcrumbs="breadcrumbs" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-4">
        <slot />
      </div>
    </SidebarInset>
    <Toaster />
  </SidebarProvider>
</template>