<script setup>
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/pages/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/pages/components/ui/popover'
import { Button } from '~/pages/components/ui/button'
import { cn } from '~/lib/utils'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue-sonner'

const props = defineProps({
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const selectedCategory = ref(props.modelValue);
const categories = ref([]);
const open = ref(false)

onMounted(() => {
    axios.get(route('api.categories.index'))
    .then((res) => {
        categories.value = res.data
    })
    .catch((error) => {
        toast.error("Failed to fetch categories.");
    })
})

const updateModelValue = (e) => {
    selectedCategory.value = e;
    open.value = false;
    emit("update:modelValue", e);
}
</script>

<template>
    <div class="w-full">
        <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button
                    variant="outline"
                    role="combobox"
                    class="justify-between w-full"
                    :aria-expanded="open"
                >
                    {{ selectedCategory ? categories.find((category) => category.id === selectedCategory)?.name : "Select parent..." }}
                    <svg class="size-4 ml-2 shrink-0 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="p-0 w-full" align="start">
                <Command>
                    <CommandInput class="h-9" placeholder="Search categories..." />
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                v-for="category in categories"
                                :key="category.name"
                                :value="category.id"
                                class="hover:cursor-pointer"
                                @select="(ev) => updateModelValue(ev.detail.value)"
                            >
                            {{ category.name }}
                            <svg :class="cn('ml-auto size-4', selectedCategory === category.id ? 'opacity-100' : 'opacity-0')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            </CommandItem>
                            <CommandItem
                                :value="null"
                                class="hover:cursor-pointer data-[highlighted]:bg-red-100"
                                @select="updateModelValue(null)"
                            >
                                Clear
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 ml-auto">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                                </svg>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
</template>