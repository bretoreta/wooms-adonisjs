<script setup>
import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/pages/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/pages/components/ui/card';
import CategoryRow from './CategoryRow.vue';

const props = defineProps({
    categories: Object
});

const emit = defineEmits([
    'deleteCategory'
]);
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription> Manage your products and view their sync status.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead class="hidden md:table-cell">
                            WooCmmerce ID
                        </TableHead>
                        <TableHead class="hidden md:table-cell">
                            Last Updated
                        </TableHead>
                        <TableHead>
                            <span class="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <CategoryRow v-for="category in categories" :key="category.id" :category="category" :level="0" @delete-category="(val) => emit('deleteCategory', val)" />
                </TableBody>
            </Table>
        </CardContent>
    </Card>
</template>