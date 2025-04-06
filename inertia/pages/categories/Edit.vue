<script setup>
import { Link, useForm } from '@inertiajs/vue3';

import AppLayout from '~/pages/layouts/AppLayout.vue';
import Editor from '~/pages/components/Editor.vue';
import { Button } from '~/pages/components/ui/button';
import { Label } from '~/pages/components/ui/label';
import { Input } from '~/pages/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/pages/components/ui/card'
// import CategoriesSearcher from './Partials/CategoriesSearcher.vue';

const props = defineProps(['category']);

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
    {
        title: 'Edit Category',
        href: `/categories/${props.category.id}`,
    },
];

const form = useForm({
    id: props.category.id,
    name: props.category.name,
    description: props.category.description,
    laravel_parent_id: props.category.laravel_parent_id,
});

const submit = () => {
    form.put(`/categories/${props.category.id}/update`);
}

</script>

<template>
    <AppLayout title="Edit Product" :breadcrumbs="breadcrumbs">
        <div class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <form class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4" @submit.prevent="submit">
                <div class="flex items-center gap-4">
                    <Button as-child variant="outline" size="xs" :disabled="form.processing">
                        <Link 
                            class="size-8"
                            href="/categories">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <span class="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        {{ form.name }}
                    </h1>
                    <div class="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button as-child variant="outline" size="sm" :disabled="form.processing">
                            <Link 
                                href="/categories">
                                Discard
                            </Link>
                        </Button>
                        <Button size="sm" :disabled="form.processing">
                            Update Category
                        </Button>
                    </div>
                </div>
                <div class="grid gap-4 lg:gap-8">
                    <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Category</CardTitle>
                                <CardDescription>
                                    Change details about this category
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div class="grid gap-6">
                                    <div class="grid gap-3">
                                        <Label for="name">Name</Label>
                                        <Input id="name" type="text" class="w-full"
                                            v-model="form.name"/>
                                    </div>
                                    <!-- <div class="grid gap-3">
                                        <Label for="parent_category">Parent Category</Label>
                                        <CategoriesSearcher v-model="form.laravel_parent_id" />
                                    </div> -->
                                    <div class="grid gap-3">
                                        <Label for="description">Description</Label>
                                        <div class="border rounded-md p-4">
                                            <Editor v-model="form.description" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div class="flex items-center justify-end gap-2 md:hidden">
                    <Button variant="outline" size="sm" :disabled="form.processing">
                        Discard
                    </Button>
                    <Button size="sm" :disabled="form.processing">
                        Save Category
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>