<script setup>
import axios from 'axios';
import { toast } from 'vue-sonner';
import { ref, onUnmounted, onMounted } from 'vue';

import { router } from '@inertiajs/vue3';
import { Button } from '~/pages/components/ui/button';
import { Progress } from '~/pages/components/ui/progress';
import EmptyState from '~/pages/components/EmptyState.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/pages/components/ui/card'

defineProps({
    activeSync: Boolean,
    syncable: Boolean,
})

const progress = ref(0);

const fetchBatchProgress = () => {
    const interval = setInterval(() => {
        axios.get('/sync/porgress').then((res) => {
            progress.value = res.data;
            if(progress.value == 100) {
                clearInterval(interval);
            }
        }).catch((error) => {
            if(error.response?.status == 401) {
                toast.info("You are uauthorized to perform this action");
            }
    
            clearInterval(interval);
        });
    }, 2000);
}

onMounted(() => {
    fetchBatchProgress();
});

onUnmounted(() => {
    clearInterval();
})

const runSync = () => {
    router.post('/categories/sync/dispatch');
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Sync Manager</CardTitle>
            <CardDescription>Use this resource to synchronize categories to the website.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button @click="runSync" v-if="!activeSync && syncable">
                Run Sync
            </Button>
            <Progress v-model="progress" v-if="activeSync" />
            <EmptyState v-if="activeSync" title="Sync Running" subtitle="There is an active sync that is currently running in the background. You'll be notified when its done" />
            <EmptyState v-if="!syncable && !activeSync" title="The sky is clear" subtitle="All categories have been syncd to the website. Nothing to see here." type="info" />
        </CardContent>
    </Card>
</template>