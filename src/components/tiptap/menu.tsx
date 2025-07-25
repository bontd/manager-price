import { Editor, useEditorState } from "@tiptap/react";
import { Button, Dropdown, Menu, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Level } from "@tiptap/extension-heading";
import IcoBluletList from '@/assets/ico/bullet_list.svg';
import IcoOrderedList from '@/assets/ico/ordered_list.svg';
import IcoTaskList from '@/assets/ico/task_list.svg';
import IcoRedo from '@/assets/ico/redo.svg';
import IcoUndo from '@/assets/ico/undo.svg';

const TiptapMenu = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().toggleBold(),
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().toggleItalic(),
                isStrike: ctx.editor.isActive('strike'),
                canStrike: ctx.editor.can().toggleStrike(),
                isCode: ctx.editor.isActive('code'),
                canCode: ctx.editor.can().toggleCode(),
                canClearMarks: ctx.editor.can().unsetAllMarks(),
                isParagraph: ctx.editor.isActive('paragraph'),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isHeading4: ctx.editor.isActive('heading', { level: 4 }),
                isHeading5: ctx.editor.isActive('heading', { level: 5 }),
                isHeading6: ctx.editor.isActive('heading', { level: 6 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isTaskList: ctx.editor.isActive('taskList'),
                isCodeBlock: ctx.editor.isActive('codeBlock'),
                isBlockquote: ctx.editor.isActive('blockquote'),
                canUndo: ctx.editor.can().undo(),
                canRedo: ctx.editor.can().redo(),
            };
        },
    });

    const headingItems = [
        { key: '1', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 as Level }).run()}>H1</Button>), level: 1 },
        { key: '2', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 as Level }).run()}>H2</Button>), level: 2 },
        { key: '3', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 as Level }).run()}>H3</Button>), level: 3 },
        { key: '4', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 4 as Level }).run()}>H4</Button>), level: 4 },
        { key: '5', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 5 as Level }).run()}>H5</Button>), level: 5 },
        { key: '6', label: (<Button onClick={() => editor?.chain().focus().toggleHeading({ level: 6 as Level }).run()}>H6</Button>), level: 6 },
    ];

    const listItems = [
        {
            key: '1',
            label: (
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().toggleBulletList()}>
                    <img src={IcoBluletList} alt="Bullet List" />
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={!editor.can().toggleOrderedList()}>
                    <img src={IcoOrderedList} alt="Ordered List" />
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button onClick={() => editor.chain().focus().toggleTaskList().run()}>
                    <img src={IcoTaskList} alt="Task List" />
                </Button>
            ),
        },
    ];

    return (
        <div className="group-btn flex gap-2 border border-solid border-[#E5E7EB] border-b-0 rounded-t-[5px] bg-white p-2">
            <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
                <img src={IcoUndo} alt="Undo" />
            </Button>
            <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
                <img src={IcoRedo} alt="Redo" />
            </Button>
            <Dropdown menu={{ items: headingItems }} trigger={['click']} className="c-dropdown">
                <div className="flex align-center text-[16px] px-[10px] py-[3px]">H <DownOutlined className="text-[8px] ml-[5px]" /></div>
            </Dropdown>
            <Dropdown menu={{ items: listItems }} trigger={['click']} className="c-dropdown">
                <img src={IcoBluletList} alt="" />
            </Dropdown>
        </div>
    );
};

export default TiptapMenu;
