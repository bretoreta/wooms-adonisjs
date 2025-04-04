<script setup>
import { router } from '@inertiajs/vue3';

import AppLayout from '~/pages/layouts/AppLayout.vue';
import EmptyState from '~/pages/components/EmptyState.vue';
import { Button } from '~/pages/components/ui/button';
import Pagination from '~/pages/components/Pagination.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/pages/components/ui/card'
import ProductsTable from '../Products/Partials/ProductsTable.vue';

const props = defineProps({
    products: Object,
    category: Object,
});

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Categories',
        href: route('admin.categories.index'),
    },
    {
        title: 'Product',
        href: route('admin.categories.products', props.category.id),
    },
];

</script>
<template>
    <AppLayout title="Products" :breadcrumbs="breadcrumbs">
        <div class="grid items-start gap-4 md:gap-8">
            <Card v-if="products.data.length">
                <CardHeader>
                    <CardTitle>Products in category - {{ category.name }}</CardTitle>
                    <CardDescription>Manage your products under this category.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductsTable :products="products.data" />
                </CardContent>
                <CardFooter>
                    <Pagination v-if="products.data.length" :data="products" />
                </CardFooter>
            </Card>
            <div v-if="!products.data.length" class="w-full bg-white dark:bg-muted/40 rounded-md mt-4">
                <EmptyState title="No Products in Category" subtitle="This category has no products added to it yet">
                    <template #action>
                        <Button @click="router.visit(route('admin.products.pull'))">Pull Products</Button>
                    </template>
                </EmptyState>
            </div>
        </div>
    </AppLayout>
</template>