import { Editor, useEditorState } from "@tiptap/react";
import { Button, ColorPicker, Dropdown, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Level } from "@tiptap/extension-heading";
import { useState } from "react";
import IcoBluletList from '@/assets/ico/bullet_list.svg';
import IcoOrderedList from '@/assets/ico/ordered_list.svg';
import IcoTaskList from '@/assets/ico/task_list.svg';
import IcoRedo from '@/assets/ico/redo.svg';
import IcoUndo from '@/assets/ico/undo.svg';
import IcoBlockquote from '@/assets/ico/blockquote.svg';
import IcoCodeBlock from '@/assets/ico/code_block.svg';
import IcoBold from '@/assets/ico/bold.svg';
import IcoItalic from '@/assets/ico/italic.svg';
import IcoStrike from '@/assets/ico/strike.svg';
import IcoCode from '@/assets/ico/code.svg';
import IcoUnderline from '@/assets/ico/underline.svg';
import IcoHighlight from '@/assets/ico/highlight.svg';
import IcoLink from '@/assets/ico/link.svg';
import IcoSuperscript from '@/assets/ico/superscript.svg';
import IcoSubscript from '@/assets/ico/subscript.svg';
import IcoAlignLeft from '@/assets/ico/align_left.svg';
import IcoAlignCenter from '@/assets/ico/align_center.svg';
import IcoAlignRight from '@/assets/ico/align_right.svg';
import IcoAlignJustify from '@/assets/ico/align_justify.svg';
import IcoAddImage from '@/assets/ico/add_image.svg';
import IcoTextColor from '@/assets/ico/text_color.svg';

interface TiptapMenuProps {
    editor: Editor | null;
    onLinkButtonClick?: () => void;
    onImageButtonClick?: () => void;
}

const TiptapMenu = ({ editor, onLinkButtonClick, onImageButtonClick }: TiptapMenuProps) => {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [highlightPickerVisible, setHighlightPickerVisible] = useState(false);
    
    if (!editor) return null;

    const handleAddImage = () => {
        // Trigger image bubble directly without inserting placeholder
        onImageButtonClick?.();
    };

    const handleLinkButtonClick = () => {
        // If there's a selection, trigger link bubble
        if (!editor.state.selection.empty) {
            onLinkButtonClick?.();
        } else {
            // If no selection, just trigger link bubble without inserting placeholder
            onLinkButtonClick?.();
        }
    };

    const handleColorChange = (color: any) => {
        console.log('Color changed:', color.toHexString());
        try {
            editor.chain().focus().setColor(color.toHexString()).run();
        } catch (error) {
            console.error('Error with setColor, trying setMark:', error);
            editor.chain().focus().setMark('textStyle', { color: color.toHexString() }).run();
        }
        setColorPickerVisible(false);
    };

    const handleClearColor = () => {
        console.log('Clear color clicked');
        editor.chain().focus().unsetMark('textStyle').run();
        setColorPickerVisible(false);
    };

    const handleHighlightChange = (color: any) => {
        console.log('Highlight color changed:', color.toHexString());
        editor.chain().focus().setHighlight({ color: color.toHexString() }).run();
        setHighlightPickerVisible(false);
    };

    const handleClearHighlight = () => {
        console.log('Clear highlight clicked');
        editor.chain().focus().unsetHighlight().run();
        setHighlightPickerVisible(false);
    };

    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                canUndo: ctx.editor.can().undo(),
                canRedo: ctx.editor.can().redo(),
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
                isUnderline: ctx.editor.isActive('underline'),
                isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
                isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
                isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
                isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }),
                isHighlight: ctx.editor.isActive('highlight'),
                canHighlight: ctx.editor.can().setHighlight(),
                isColor: ctx.editor.isActive('textStyle', { color: true }),
                isAddImage: ctx.editor.isActive('image'),
                isLink: ctx.editor.isActive('link'),
            };
        },
    });

    const headingItems = [
        { key: 'p', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().setParagraph().run()}>Paragraph</Button>), level: 0 },
        { key: '1', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 as Level }).run()}>Heading 1</Button>), level: 1 },
        { key: '2', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 as Level }).run()}>Heading 2</Button>), level: 2 },
        { key: '3', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 as Level }).run()}>Heading 3</Button>), level: 3 },
        { key: '4', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 4 as Level }).run()}>Heading 4</Button>), level: 4 },
        { key: '5', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 5 as Level }).run()}>Heading 5</Button>), level: 5 },
        { key: '6', label: (<Button className="btn-custom" onClick={() => editor?.chain().focus().toggleHeading({ level: 6 as Level }).run()}>Heading 6</Button>), level: 6 },
    ];

    const listItems = [
        {
            key: '1',
            label: (
                <Button className="btn-custom" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <img src={IcoBluletList} alt="Bullet List" />
                </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button className="btn-custom" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <img src={IcoOrderedList} alt="Ordered List" />
                </Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button className="btn-custom" onClick={() => editor.chain().focus().toggleTaskList().run()}>
                    <img src={IcoTaskList} alt="Task List" />
                </Button>
            ),
        },
    ];      

    const getActiveHeadingLabel = () => {
        if (editorState.isHeading1) return 'Heading 1';
        if (editorState.isHeading2) return 'Heading 2';
        if (editorState.isHeading3) return 'Heading 3';
        if (editorState.isHeading4) return 'Heading 4';
        if (editorState.isHeading5) return 'Heading 5';
        if (editorState.isHeading6) return 'Heading 6';
        return 'Paragraph';
    };

    const colorPickerContent = (
        <div className="p-3">
            <div className="mb-3">
                <div className="text-sm font-medium mb-2">Choose Text Color</div>
                <ColorPicker 
                    defaultValue="#000000" 
                    onChange={handleColorChange}
                    showText
                    size="middle"
                />
            </div>
            <Button 
                size="small" 
                onClick={handleClearColor}
                className="w-full"
                danger
            >
                Clear Color
            </Button>
        </div>
    );

    const highlightPickerContent = (
        <div className="p-3">
            <div className="mb-3">
                <div className="text-sm font-medium mb-2">Choose Highlight Color</div>
                <ColorPicker 
                    defaultValue="#ffff00" 
                    onChange={handleHighlightChange}
                    showText
                    size="middle"
                />
            </div>
            <Button 
                size="small" 
                onClick={handleClearHighlight}
                className="w-full"
                danger
            >
                Clear Highlight
            </Button>
        </div>
    );

    return (
        <div className="group-btn flex flex-wrap gap-2 border border-solid border-[#E5E7EB] border-b-0 rounded-t-[5px] p-2">
            <Button className={editorState.canUndo ? 'active' : ''} onClick={() => editor.chain().focus().undo().run()} title="Undo" >
                <img src={IcoUndo} alt="Undo" />
            </Button>
            <Button className={editorState.canRedo ? 'active' : ''} onClick={() => editor.chain().focus().redo().run()} title="Redo">
                <img src={IcoRedo} alt="Redo" />
            </Button>
            <div className="w-[1px] h-[20px] bg-[#eaeaea] my-[6px] mx-[5px]"></div>
            <Dropdown menu={{ items: headingItems }}>
                <div className="flex align-center text-[16px] px-[10px] py-[3px]">{getActiveHeadingLabel()} <DownOutlined className="text-[8px] ml-[5px]" /></div>
            </Dropdown>
            <Dropdown
                className={
                    editorState.isBulletList || editorState.isOrderedList || editorState.isTaskList
                    ? 'active' : ''
                }
                menu={{ items: listItems }}
            >
                <img src={IcoBluletList} alt="ico blule list" />
            </Dropdown>
            <Button onClick={() => editor.chain().focus().setBlockquote().run()}>
                <img src={IcoBlockquote} alt="ico Blockquote" />
            </Button>
            <Button onClick={() => editor.chain().focus().setCodeBlock().run()}>
                <img src={IcoCodeBlock} alt="ico Code block" />
            </Button>
            <div className="w-[1px] h-[20px] bg-[#eaeaea] my-[6px] mx-[5px]"></div>
            <Button className={editorState.isBold ? 'active' : ''} onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editorState.canBold}>
                <img src={IcoBold} alt="Bold" />
            </Button>
            <Button className={editorState.isItalic ? 'active' : ''} onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editorState.canItalic}>
                <img src={IcoItalic} alt="Italic" />
            </Button>
            <Button className={editorState.isStrike ? 'active' : ''} onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editorState.canStrike}>
                <img src={IcoStrike} alt="Strike" />
            </Button>
            <Button className={editorState.isCode ? 'active' : ''} onClick={() => editor.chain().focus().toggleCode().run()}>
                <img src={IcoCode} alt="Code" />
            </Button>
            <Button className={editorState.isUnderline ? 'active' : ''} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                <img src={IcoUnderline} alt="Underline" />
            </Button>
            <Popover
                content={colorPickerContent}
                title="Text Color"
                trigger="click"
                open={colorPickerVisible}
                onOpenChange={setColorPickerVisible}
                placement="bottom"
            >
                <Button 
                    className={editorState.isColor ? 'active' : ''} 
                    onClick={() => {
                        console.log('Text color button clicked');
                        setColorPickerVisible(!colorPickerVisible);
                    }}
                    title="Text Color"
                >
                    <img src={IcoTextColor} alt="ico text color" />
                </Button>
            </Popover>
            <Popover
                content={highlightPickerContent}
                title="Highlight Color"
                trigger="click"
                open={highlightPickerVisible}
                onOpenChange={setHighlightPickerVisible}
                placement="bottom"
            >
                <Button 
                    className={editorState.isHighlight ? 'active' : ''} 
                    onClick={() => {
                        console.log('Highlight button clicked');
                        setHighlightPickerVisible(!highlightPickerVisible);
                    }}
                    title="Highlight Color"
                >
                    <img src={IcoHighlight} alt="ico Highlight" />
                </Button>
            </Popover>
            <div className="w-[1px] h-[20px] bg-[#eaeaea] my-[6px] mx-[5px]"></div>
            <Button className={editorState.isAlignLeft ? 'active' : ''} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                <img src={IcoAlignLeft} alt="ico Align left" />
            </Button>
            <Button className={editorState.isAlignCenter ? 'active' : ''} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                <img src={IcoAlignCenter} alt="ico Align center" />
            </Button>
            <Button className={editorState.isAlignRight ? 'active' : ''} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                <img src={IcoAlignRight} alt="ico Align right" />
            </Button>
            <Button className={editorState.isAlignJustify ? 'active' : ''} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                <img src={IcoAlignJustify} alt="ico Align justify" />
            </Button>
            <div className="w-[1px] h-[20px] bg-[#eaeaea] my-[6px] mx-[5px]"></div>
            <Button className={editorState.isAddImage ? 'active' : ''} onClick={handleAddImage}>
                <img src={IcoAddImage} alt="ico Add image" />
            </Button>
            <Button className={editorState.isLink ? 'active' : ''} onClick={handleLinkButtonClick}>
                <img src={IcoLink} alt="ico Link" />
            </Button>
        </div>
    );
};

export default TiptapMenu;
