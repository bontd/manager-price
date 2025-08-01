import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Upload, message } from 'antd';
import { UndoOutlined, DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tiptap/react';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';

interface ImageBubbleProps {
  editor: Editor | null;
  isVisible: boolean;
  onClose: () => void;
  onVisibilityChange: (visible: boolean) => void;
}

const ImageBubble: React.FC<ImageBubbleProps> = ({ editor, isVisible, onClose, onVisibilityChange }) => {
  const [url, setUrl] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor || !isVisible) return;

    // Set position to center of editor
    const editorElement = editor.view.dom;
    if (editorElement) {
      const rect = editorElement.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2 - 100, // Center vertically
        left: rect.left + rect.width / 2 - 150, // Center horizontally
      });
    }

    // Set current image URL if editing existing image
    if (editor.isActive('image')) {
      const imageAttributes = editor.getAttributes('image');
      setUrl(imageAttributes.src || '');
    } else {
      setUrl('');
    }

    // Debug: Log when bubble becomes visible
    console.log('Image bubble visible:', { isVisible });
  }, [editor, isVisible]);

  // Handle click outside to close bubble
  useEffect(() => {
    if (!editor || !isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(event.target as Node)) {
        // Check if click is outside the bubble
        const editorElement = editor.view.dom;
        if (editorElement.contains(event.target as Node)) {
          // Click is inside editor but outside bubble - close bubble
          onVisibilityChange(false);
        }
      }
    };

    const handleSelectionChange = () => {
      // Don't auto-hide bubble based on selection changes
      // Let user control when to close it
    };

    document.addEventListener('mousedown', handleClickOutside);
    editor.on('selectionUpdate', handleSelectionChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      editor.off('selectionUpdate', handleSelectionChange);
    };
  }, [editor, isVisible, onVisibilityChange]);

  const handleSetImage = () => {
    if (!editor || !url.trim()) return;

    if (editor.isActive('image')) {
      // Update existing image
      editor.chain().focus().extendMarkRange('image').setImage({ src: url.trim() }).run();
    } else {
      // Insert new image at current cursor position
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
    setUrl('');
    onClose();
  };

  const handleRemoveImage = () => {
    if (!editor) return;
    editor.chain().focus().deleteSelection().run();
    onClose();
  };

  const handleUndo = () => {
    if (!editor) return;
    editor.chain().focus().undo().run();
  };

  // Handle file upload
  const handleUpload = async (file: File) => {
    setUploading(true);
    
    try {
      // Convert file to base64 for demo purposes
      // In production, you would upload to your server
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setUrl(result);
          toast.success('File uploaded successfully!');
        }
      };  
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Upload failed!');
    } finally {
      setUploading(false);
    }
    
    return false; // Prevent default upload behavior
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload: handleUpload,
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    showUploadList: false,
  };

  if (!editor || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="image-bubble-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
      />
      
      {/* Bubble */}
      <div 
        ref={bubbleRef}
        className="image-bubble"
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 1000,
        }}
      >
        <div className="image-bubble-content">
          <div className="image-input-group">
            <PictureOutlined className="image-icon" />
            <Input
              placeholder="Paste image URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPressEnter={handleSetImage}
              className="image-input"
              autoFocus
            />
          </div>
          
          <div className="image-upload-section">
            <Upload {...uploadProps}>
              <Button 
                icon={<UploadOutlined />} 
                loading={uploading}
                className="upload-btn"
              >
                Choose Image File
              </Button>
            </Upload>
          </div>

          <div className="image-actions">
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
              icon={<DeleteOutlined />}
              onClick={handleRemoveImage}
              title="Remove image"
              danger
              disabled={!editor.isActive('image')}
            />
            <Button
              type="text"
              size="small"
              onClick={onClose}
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSetImage}
              disabled={!url.trim()}
              title="Set image"
            >
              Set
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageBubble; 