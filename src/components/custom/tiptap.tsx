/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TipTapEditorComponent.tsx
'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading2,
    Code,
    Undo,
    Redo,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 border-b bg-background p-1">
            <Toggle
                size="sm"
                pressed={editor.isActive('heading')}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className="h-4 w-4" />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-8" />

            <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('blockquote')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
            >
                <Quote className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('code')}
                onPressedChange={() =>
                    editor.chain().focus().toggleCode().run()
                }
            >
                <Code className="h-4 w-4" />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-8" />

            <Toggle
                size="sm"
                pressed={false}
                onPressedChange={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <Undo className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={false}
                onPressedChange={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo className="h-4 w-4" />
            </Toggle>
        </div>
    );
};

interface TipTapEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const TipTapEditorComponent: React.FC<TipTapEditorProps> = ({
    value,
    onChange,
}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base mx-auto focus:outline-none p-4 min-h-[200px]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div
            className={cn(
                'w-full',
                editor?.isFocused ? 'ring-2 ring-ring ring-offset-2' : '',
            )}
        >
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTapEditorComponent;
