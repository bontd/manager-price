import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapMenu from "./menu";

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello Tiptap!</p>',
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
        }
    });
    return (
        <div className="flex flex-col gap-2">
            <TiptapMenu editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}

export default Tiptap;