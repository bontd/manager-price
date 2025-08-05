import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useState, useEffect } from "react";
import TiptapMenu from "./menu";
import LinkBubble from "./link-bubble";
import ImageBubble from "./image-bubble";
import "./link-bubble.scss";
import "./image-bubble.scss";

const Tiptap = ({value, setTiptap} : {value?: string, setTiptap?: any}) => {
    const [isLinkBubbleVisible, setIsLinkBubbleVisible] = useState(false);
    const [isImageBubbleVisible, setIsImageBubbleVisible] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
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
            setTiptap(editor.getHTML());
        }
    });

    // Update editor content when value prop changes
    useEffect(() => {
        if (editor && value !== undefined) {
            const currentContent = editor.getHTML();
            // Handle different cases for content updates
            if (value === '' && currentContent !== '') {
                // Clear content when value is empty
                editor.commands.setContent('');
            } else if (value !== '' && currentContent !== value) {
                // Update content when value is not empty and different from current
                editor.commands.setContent(value);
            }
        }
    }, [editor, value]);

    // Additional effect to handle initial content setting
    useEffect(() => {
        if (editor && value !== undefined && value !== '') {
            const currentContent = editor.getHTML();
            // If editor is empty but we have a value, set the content
            if (currentContent === '<p></p>' && value !== '') {
                editor.commands.setContent(value);
            }
        }
    }, [editor, value]);

    // Handle bubble visibility based on selection
    useEffect(() => {
        if (!editor) return;

        const handleSelectionUpdate = () => {
            const { from, to } = editor.state.selection;
            const isLinkActive = editor.isActive('link');
            const isImageActive = editor.isActive('image');
            const selectedText = editor.state.doc.textBetween(from, to);
            
            // Show link bubble when clicking on existing link
            if (isLinkActive && from === to) {
                setIsLinkBubbleVisible(true);
                setIsImageBubbleVisible(false);
            } 
            // Hide both bubbles when no relevant selection
            else if (!isLinkActive && !isImageActive) {
                setIsLinkBubbleVisible(false);
                setIsImageBubbleVisible(false);
            }
        };

        editor.on('selectionUpdate', handleSelectionUpdate);

        return () => {
            editor.off('selectionUpdate', handleSelectionUpdate);
        };
    }, [editor]);

    const handleLinkButtonClick = () => {
        setIsLinkBubbleVisible(true);
        setIsImageBubbleVisible(false);
    };

    const handleLinkBubbleClose = () => {
        setIsLinkBubbleVisible(false);
    };

    const handleImageBubbleClose = () => {
        setIsImageBubbleVisible(false);
    };

    const handleImageBubbleVisibilityChange = (visible: boolean) => {
        setIsImageBubbleVisible(visible);
    };

    const handleImageButtonClick = () => {
        setIsImageBubbleVisible(true);
        setIsLinkBubbleVisible(false);
    };

    return (
        <div className="flex flex-col gap-2 relative">
            <TiptapMenu 
                editor={editor} 
                onLinkButtonClick={handleLinkButtonClick}
                onImageButtonClick={handleImageButtonClick}
            />
            <LinkBubble 
                editor={editor} 
                isVisible={isLinkBubbleVisible}
                onClose={handleLinkBubbleClose}
                onVisibilityChange={setIsLinkBubbleVisible}
            />
            <ImageBubble 
                editor={editor} 
                isVisible={isImageBubbleVisible}
                onClose={handleImageBubbleClose}
                onVisibilityChange={handleImageBubbleVisibilityChange}
            />
            <EditorContent editor={editor} />
        </div>
    );
}

export default Tiptap;