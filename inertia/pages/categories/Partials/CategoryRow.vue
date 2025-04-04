<script setup>
import { computed } from 'vue';
import { DateTime } from 'luxon';
import { Link } from '@inertiajs/vue3';

import { TableCell, TableRow } from '~/pages/components/ui/table';
import { Button } from '~/pages/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/pages/components/ui/dropdown-menu';

const emit = defineEmits([
    'deleteCategory'
]);

const props = defineProps({
    category: Object,
    level: Number
});

const padding = computed(() => {
    return `pl-[` + props.level * 2 + `px]`
});
</script>

<template>
    <TableRow :key="category.id">
        <TableCell class="font-medium">
            <Link :href="route('admin.categories.products', category.id)" class="hover:underline">
                <span v-if="level > 0" :class="padding">{{ '- '.repeat(level) }} </span>
                {{ category.name }}
            </Link>
        </TableCell>
        <TableCell>
            /{{ category.slug }}
        </TableCell>
        <TableCell class="hidden md:table-cell">
            {{ category.woo_id }}
        </TableCell>
        <TableCell class="hidden md:table-cell">
            {{ DateTime.fromISO(category.updated_at).toRelative() }}
        </TableCell>
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span class="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link :href="route('admin.categories.edit', category.id)" class="w-full">Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="emit('deleteCategory', category.id)">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
    <CategoryRow v-for="child in category.children" :key="child.id" :category="child" :level="level + 1" @delete-category="(val) => emit('deleteCategory', val)" />
</template>
