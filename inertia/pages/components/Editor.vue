<script setup>
import { onUnmounted, computed } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3'

import { Button } from '@/components/ui/button';
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps({
    modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const editor = new Editor({
    content: props.modelValue,
    extensions: [
        StarterKit, 
        TextStyle, 
        Underline, 
        Placeholder.configure({
            placeholder: "Write something beautiful. Make it easy to read and well-descriptive.",
        }),
    ],
    onUpdate: () => {
        emit('update:modelValue', editor.getHTML())
    }
});

const activeHeading = computed(() => {
    if(editor.isActive('heading', { level: 1 })) {
        return "Heading 1"
    }
    else if(editor.isActive('heading', { level: 2 })) {
        return "Heading 2"
    }
    else if(editor.isActive('heading', { level: 3 })) {
        return "Heading 3"
    }
    else if(editor.isActive('heading', { level: 4 })) {
        return "Heading 4"
    }
    else if(editor.isActive('heading', { level: 5 })) {
        return "Heading 5"
    }
    else if(editor.isActive('heading', { level: 6 })) {
        return "Heading 6"
    }
    else {
        return "Paragraph"
    }
})

onUnmounted(() => {
    editor.destroy();
})
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center flex-wrap border-b pb-3 divide-x">
            <div>
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" type="button" class="w-48 justify-start">
                            {{ activeHeading }}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ '!bg-accent': editor.isActive('heading', { level: 1 }) }">
                            <span class="text-3xl font-bold">Heading 1</span>
                        </div>
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                            :class="{ '!bg-accent': editor.isActive('heading', { level: 2 }) }">
                            <span class="text-2xl font-bold">Heading 2</span>
                        </div>
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                            :class="{ '!bg-accent': editor.isActive('heading', { level: 3 }) }">
                            <span class="text-xl font-bold">Heading 3</span>
                        </div>
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                            :class="{ '!bg-accent': editor.isActive('heading', { level: 4 }) }">
                            <span class="text-lg font-bold">Heading 4</span>
                        </div>
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                            :class="{ '!bg-accent': editor.isActive('heading', { level: 5 }) }">
                            <span class="font-bold">Heading 5</span>
                        </div>
                        <div class="hover:cursor-pointer w-full pl-3 py-1.5 rounded" @click="editor.chain().focus().setParagraph().run()"
                            :class="{ '!bg-accent': editor.isActive('paragraph') }">
                            <span>Paragraph</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div class="flex items-center gap-1 ml-2">
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleBold().run()"
                    :class="{ '!bg-accent': editor.isActive('bold') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M14 12a4 4 0 0 0 0-8H6v8"></path><path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path></svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ '!bg-accent': editor.isActive('italic') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><line x1="19" x2="10" y1="4" y2="4"></line><line x1="14" x2="5" y1="20" y2="20"></line><line x1="15" x2="9" y1="4" y2="20"></line></svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleUnderline().run()"
                    :class="{ '!bg-accent': editor.isActive('underline') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" x2="20" y1="20" y2="20"></line></svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ '!bg-accent': editor.isActive('strike') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" x2="20" y1="12" y2="12"></line></svg>
                </Button>
            </div>
            <div class="mx-2 flex items-center gap-1">
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ '!bg-accent': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ '!bg-accent': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                    </svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ '!bg-accent': editor.isActive('codeBlock') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                </Button>
            </div>
            <div class="mx-2 flex items-center gap-1">
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().undo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </Button>
                <Button variant="ghost" type="button" size="icon" @click="editor.chain().focus().redo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                    </svg>
                </Button>
            </div>
        </div>
        <editor-content :editor="editor" class="focus-visible:outline-none min-h-60" />
    </div>
</template>

<style>
.ProseMirror {
    outline: none !important;
}
</style>