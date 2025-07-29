import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Color from '@tiptap/extension-color';
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TiptapMenu from "./menu";
import LinkBubble from "./link-bubble";
import "./link-bubble.scss";

const Tiptap = ({value, setTiptap} : {value?: string, setTiptap?: any}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Color.configure({
                types: ['textStyle', 'heading'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
              types: ['heading', 'paragraph'],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'w-full max-w-full h-auto',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800',
                },
            }),
    ],
        content: value,
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML());
            setTiptap(editor.getHTML());
        }
    });
    return (
        <div className="flex flex-col gap-2 relative">
            <TiptapMenu editor={editor} />
            <LinkBubble editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}

export default Tiptap;