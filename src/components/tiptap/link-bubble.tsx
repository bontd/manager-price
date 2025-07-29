import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { UndoOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { Editor } from '@tiptap/react';

interface LinkBubbleProps {
  editor: Editor | null;
}

const LinkBubble: React.FC<LinkBubbleProps> = ({ editor }) => {
  const [url, setUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateBubble = () => {
      const { from, to } = editor.state.selection;
      const link = editor.isActive('link');
      
      if (link || (!editor.state.selection.empty && from !== to)) {
        // Calculate position
        const coords = editor.view.coordsAtPos(from);
        if (coords) {
          setPosition({
            top: coords.top - 60, // Position above the selection
            left: coords.left,
          });
        }
        setIsVisible(true);
        
        // Set current link URL if editing
        if (link) {
          const linkAttributes = editor.getAttributes('link');
          setUrl(linkAttributes.href || '');
        } else {
          setUrl('');
        }
      } else {
        setIsVisible(false);
      }
    };

    editor.on('selectionUpdate', updateBubble);
    editor.on('focus', updateBubble);

    return () => {
      editor.off('selectionUpdate', updateBubble);
      editor.off('focus', updateBubble);
    };
  }, [editor]);

  const handleSetLink = () => {
    if (!editor || !url.trim()) return;

    if (editor.isActive('link')) {
      // Update existing link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
    } else {
      // Create new link
      if (editor.state.selection.empty) {
        // If no selection, insert the URL as text
        editor.chain().focus().insertContent(`<a href="${url.trim()}">${url.trim()}</a>`).run();
      } else {
        // If there's a selection, make it a link
        editor.chain().focus().setLink({ href: url.trim() }).run();
      }
    }
    setUrl('');
    setIsVisible(false);
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setIsVisible(false);
  };

  const handleOpenLink = () => {
    const linkAttributes = editor?.getAttributes('link');
    if (linkAttributes?.href) {
      window.open(linkAttributes.href, '_blank');
    }
  };

  const handleUndo = () => {
    if (!editor) return;
    editor.chain().focus().undo().run();
  };

  if (!editor || !isVisible) {
    return null;
  }

  return (
    <div 
      ref={bubbleRef}
      className="link-bubble"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
      }}
    >
      <div className="link-bubble-content">
        <div className="link-input-group">
          <LinkOutlined className="link-icon" />
          <Input
            placeholder="Paste a link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPressEnter={handleSetLink}
            className="link-input"
            autoFocus
          />
        </div>
        <div className="link-actions">
          <Button
            type="text"
            size="small"
            icon={<UndoOutlined />}
            onClick={handleUndo}
            title="Undo"
          />
          <Button
            type="text"
            size="small"
            icon={<LinkOutlined />}
            onClick={handleOpenLink}
            title="Open link"
            disabled={!editor.isActive('link')}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleRemoveLink}
            title="Remove link"
            danger
            disabled={!editor.isActive('link')}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkBubble;