import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { UndoOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { Editor } from '@tiptap/react';

interface LinkBubbleProps {
  editor: Editor | null;
  isVisible: boolean;
  onClose: () => void;
  onVisibilityChange: (visible: boolean) => void;
}

const LinkBubble: React.FC<LinkBubbleProps> = ({ editor, isVisible, onClose, onVisibilityChange }) => {
  const [url, setUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor || !isVisible) return;

    // Calculate position when bubble becomes visible    
    setPosition({
      top: 0,
      left: 0,
    });

    // Set current link URL if editing existing link
    if (editor.isActive('link')) {
      const linkAttributes = editor.getAttributes('link');
      setUrl(linkAttributes.href || '');
      
      // Get the text content of the link by temporarily extending the selection
      const originalFrom = editor.state.selection.from;
      const originalTo = editor.state.selection.to;
      
      // Extend to full link range to get text
      editor.chain().focus().extendMarkRange('link').run();
      const linkText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to);
      setLinkText(linkText || '');
      
      // Restore original cursor position
      editor.chain().focus().setTextSelection({ from: originalFrom, to: originalTo }).run();
    } else {
      setUrl('');
      // Get selected text if any
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to);
      setLinkText(selectedText || '');
    }
  }, [editor, isVisible]);

  // Handle click outside to close bubble
  useEffect(() => {
    if (!editor || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(event.target as Node)) {
        // Check if click is outside the bubble
        const editorElement = editor.view.dom;
        if (editorElement.contains(event.target as Node)) {
          // Click is inside editor but outside bubble
          onVisibilityChange(false);
        }
      }
    };

    const handleSelectionChange = () => {
      const { from, to } = editor.state.selection;
      const link = editor.isActive('link');
      
      // Hide bubble if no selection or no link
      if (editor.state.selection.empty && !link) {
        onVisibilityChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    editor.on('selectionUpdate', handleSelectionChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      editor.off('selectionUpdate', handleSelectionChange);
    };
  }, [editor, isVisible, onVisibilityChange]);

  const handleSetLink = () => {
    if (!editor || !url.trim()) return;

    if (editor.isActive('link')) {
      // Update existing link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
    } else {
      // Create new link
      if (editor.state.selection.empty) {
        // If no selection, insert the URL as text
        const displayText = linkText.trim() || url.trim();
        editor.chain().focus().insertContent(`<a href="${url.trim()}">${displayText}</a>`).run();
      } else {
        // If there's a selection, make it a link with custom text if provided
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        
        if (linkText.trim() && linkText.trim() !== selectedText) {
          // Replace selection with custom text as link
          editor.chain().focus().deleteRange({ from, to }).insertContent(`<a href="${url.trim()}">${linkText.trim()}</a>`).run();
        } else {
          // Make existing selection a link
          editor.chain().focus().setLink({ href: url.trim() }).run();
        }
      }
    }
    setUrl('');
    setLinkText('');
    onClose();
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    onClose();
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
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
             onKeyDown={handleKeyDown}
             className="link-input"
             autoFocus
           />
         </div>
         
         <div className="link-text-input-group">
           <Input
             placeholder="Link text (optional)"
             value={linkText}
             onChange={(e) => setLinkText(e.target.value)}
             onPressEnter={handleSetLink}
             className="link-text-input"
           />
         </div>
         
         <div className="link-submit-group">
           <Button
             type="primary"
             size="small"
             className='bg-blue-500'
             onClick={handleSetLink}
             disabled={!url.trim()}
             title="Set link"
           >
             Set
           </Button>
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