<script setup>
import { ref } from 'vue';
import { router, Link } from '@inertiajs/vue3';

import AppLayout from '~/pages/layouts/AppLayout.vue';
import EmptyState from '~/pages/components/EmptyState.vue';
import { Button } from '~/pages/components/ui/button';

import ConfirmationModal from '~/pages/components/ConfirmationModal.vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/pages/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/pages/components/ui/tabs'
import CategoriesTable from './Partials/CategoriesTable.vue';
import SyncManager from './Partials/SyncManager.vue';
import { toast } from 'vue-sonner';

const props = defineProps({
    categories: Object,
    activeSync: Boolean,
    syncable: Boolean,
});

const isDeletingCategory = ref(false);
const deletingCategory = ref(null);
const showDeleteModal = ref(false);

const confirmDeleteCategory = (id) => {
    deletingCategory.value = id;
    showDeleteModal.value = true;
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];


const deleteCategory = () => {
    router.delete('/categories/' + deletingCategory.value + '/delete', {
        preserveScroll: true,
        onStart: visit => {
            isDeletingCategory.value = true;
        },
        onFinish: visit => {
            isDeletingCategory.value = false;
        },
        onSuccess: () => {
            showDeleteModal.value = false,
            toast.success("Category has been deleted successfully")
        }
    });
}
</script>
<template>
    <AppLayout title="Categories" :breadcrumbs="breadcrumbs">
        <div>
            <div class="gap-4 md:gap-8">
                <Tabs default-value="all">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">
                                All Categories
                            </TabsTrigger>
                            <TabsTrigger value="sync" class="hidden sm:flex">
                                Sync Categories
                            </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Button variant="outline" class="h-9 gap-1.5" @click="router.post(route('admin.categories.sync.push'))" v-if="syncable" :disabled="activeSync">
                                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Push Categories</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="outline" class="h-9 gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5">
                                            <path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>
                                        </svg>
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem checked>All</DropdownMenuItem>
                                    <DropdownMenuItem>Synced</DropdownMenuItem>
                                    <DropdownMenuItem>Unsynced</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" class="h-9 gap-1" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5">
                                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                </svg>
                                <span>Export</span>
                            </Button>
                            <Button as-child :disabled="activeSync">
                                <Link 
                                    class="gap-2"
                                        href="/categories/create">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                    <span>Create Category</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <CategoriesTable :categories="categories.data" v-if="categories.data.length" @delete-category="(id) => confirmDeleteCategory(id)" />
                        <div v-if="!categories.data.length && !activeSync" class="w-full bg-white dark:bg-muted/40 rounded-md mt-4">
                            <EmptyState title="No Categories Added" subtitle="Your application has no categories yet">
                                <template #action>
                                    <Button @click="router.visit(route('admin.categories.pull'))">Pull Categories</Button>
                                </template>
                            </EmptyState>
                        </div>
                        <div v-if="!categories.data.length && activeSync" class="w-full bg-white dark:bg-muted/40 rounded-md mt-4">
                            <EmptyState title="Sync Running" subtitle="There is an active sync that is currently running in the background. You'll be notified when its done" />
                        </div>
                    </TabsContent>
                    <TabsContent value="sync">
                        <SyncManager :activeSync="activeSync" :syncable="true" />
                        <div v-if="!categories.data.length && activeSync" class="w-full bg-white dark:bg-muted/40 rounded-md mt-4">
                            <EmptyState title="Sync Running" subtitle="There is an active sync that is currently running in the background. You'll be notified when its done" />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
        <ConfirmationModal :show="showDeleteModal" @close="showDeleteModal = false">
            <template #title>
                Confirm Action
            </template>
            <template #content>
                Are you sure you want to delete this category? Deleting this category will also delete any data and information related to this category!
            </template>
            <template #footer>
                <div class="flex items-center gap-3">
                    <Button variant="destructive" @click="deleteCategory" :class="{ 'opacity-75': isDeletingCategory }" :disabled="isDeletingCategory" :loading="isDeletingCategory">
                        Delete Category
                    </Button>
                    <Button variant="outline" @click="showDeleteModal = false">Nevermind</Button>
                </div>
            </template>
        </ConfirmationModal>
    </AppLayout>
</template>