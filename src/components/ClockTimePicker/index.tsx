import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './ClockTimePicker.css';

interface ClockTimePickerProps {
  value?: { hour: number; minute: number };
  onChange?: (time: { hour: number; minute: number }) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const ClockTimePicker: React.FC<ClockTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select time',
  disabled = false,
  style
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(value?.hour ?? 12);
  const [selectedMinute, setSelectedMinute] = useState(value?.minute ?? 0);
  const [isSelectingHour, setIsSelectingHour] = useState(true);
  const [showClock, setShowClock] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      drawClock();
    }
  }, [isOpen, selectedHour, selectedMinute, isSelectingHour]);

  useEffect(() => {
    if (value) {
      setSelectedHour(value.hour);
      setSelectedMinute(value.minute);
    }
  }, [value]);

  const drawClock = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f5f5f5';
    ctx.fill();
    ctx.strokeStyle = '#d9d9d9';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#1890ff';
    ctx.fill();

    if (isSelectingHour) {
      // Draw outer ring: 1-12
      for (let i = 1; i <= 12; i++) {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = centerX + (radius - 8) * Math.cos(angle);
        const y = centerY + (radius - 8) * Math.sin(angle);
        ctx.font = '13px Arial';
        // Highlight if selectedHour is i or (selectedHour === 0 && i === 12)
        const isSelected = (selectedHour === i) || (selectedHour === 0 && i === 12);
        ctx.fillStyle = isSelected ? '#1890ff' : '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString().padStart(2, '0'), x, y);
      }
      // Draw inner ring: 13-23
      for (let i = 13; i <= 23; i++) {
        const angle = ((i - 12) * 30 - 90) * (Math.PI / 180);
        const x = centerX + (radius - 32) * Math.cos(angle);
        const y = centerY + (radius - 32) * Math.sin(angle);
        ctx.font = '11px Arial';
        ctx.fillStyle = selectedHour === i ? '#1890ff' : '#666';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString(), x, y);
      }
      // Draw hour hand (24h)
      let hourForAngle = selectedHour === 0 ? 12 : selectedHour;
      let angle = 0;
      if (hourForAngle <= 12) {
        angle = (hourForAngle * 30 - 90) * (Math.PI / 180);
      } else {
        angle = ((hourForAngle - 12) * 30 - 90) * (Math.PI / 180);
      }
      const hourHandLength = hourForAngle <= 12 ? radius * 0.5 : (radius - 24);
      const hourX = centerX + hourHandLength * Math.cos(angle);
      const hourY = centerY + hourHandLength * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(hourX, hourY);
      ctx.strokeStyle = '#1890ff';
      ctx.lineWidth = 4;
      ctx.stroke();
    } else {
      // Draw minute numbers (every 5 minutes)
      for (let i = 0; i < 60; i += 5) {
        const angle = (i * 6 - 90) * (Math.PI / 180);
        const x = centerX + (radius - 16) * Math.cos(angle);
        const y = centerY + (radius - 16) * Math.sin(angle);
        ctx.font = '14px Arial';
        ctx.fillStyle = i === selectedMinute ? '#1890ff' : '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString().padStart(2, '0'), x, y);
      }

      // Draw minute hand
      const minuteAngle = (selectedMinute * 6 - 90) * (Math.PI / 180);
      const minuteHandLength = radius * 0.7;
      const minuteX = centerX + minuteHandLength * Math.cos(minuteAngle);
      const minuteY = centerY + minuteHandLength * Math.sin(minuteAngle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(minuteX, minuteY);
      ctx.strokeStyle = '#1890ff';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  // Helper to get angle and distance from center
  const getAngleAndDistance = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { angle: 0, distance: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    return { angle, distance };
  };

  // Mouse/touch event handlers
  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    document.body.style.userSelect = 'none';
    const moveHandler = (ev: any) => {
      let clientX, clientY;
      if (ev.touches) {
        clientX = ev.touches[0].clientX;
        clientY = ev.touches[0].clientY;
      } else {
        clientX = ev.clientX;
        clientY = ev.clientY;
      }
      const { angle, distance } = getAngleAndDistance(clientX, clientY);
      if (isSelectingHour) {
        let hour = Math.round(angle / 30);
        if (hour === 0) hour = 12;
        if (distance < (canvasRef.current!.width / 2) - 20) {
          // Inner ring: 13-23
          setSelectedHour(hour + 12 === 24 ? 12 : hour + 12);
        } else {
          // Outer ring: 1-12 (0h is 12)
          setSelectedHour(hour === 12 ? 0 : hour);
        }
      } else {
        const minute = Math.round(angle / 6);
        setSelectedMinute(minute === 60 ? 0 : minute);
      }
    };
    const upHandler = () => {
      isDraggingRef.current = false;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', upHandler);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < radius - 40) return; // Click too close to center
    
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    
    if (isSelectingHour) {
      let hour = Math.round(angle / 30);
      if (hour === 0) hour = 12;
      // Detect if click is in inner or outer ring
      if (distance < radius - 20) {
        // Inner ring: 13-23
        setSelectedHour(hour + 12 === 24 ? 12 : hour + 12);
      } else {
        // Outer ring: 1-12 (0h is 12)
        setSelectedHour(hour === 12 ? 0 : hour);
      }
    } else {
      const minute = Math.round(angle / 6);
      const newMinute = minute === 60 ? 0 : minute;
      setSelectedMinute(newMinute);
    }
  };

  const handleOk = () => {
    onChange?.({ hour: selectedHour, minute: selectedMinute });
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (value) {
      setSelectedHour(value.hour);
      setSelectedMinute(value.minute);
    }
    setIsOpen(false);
  };

  const formatTime = () => {
    const hour = selectedHour === 0 ? 12 : selectedHour;
    return `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Button
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        style={{ width: '100%', textAlign: 'left', ...style }}
        icon={<ClockCircleOutlined />}
        className="clock-time-picker-button"
      >
        {value ? formatTime() : placeholder}
      </Button>
      
      <Modal
        title="Select Time"
        open={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>
        ]}
        width={320}
        centered
        className="clock-modal"
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <canvas
            ref={canvasRef}
            width={150}
            height={150}
            onClick={handleCanvasClick}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="clock-canvas"
          />
          <div className="hour-minute-toggle">
            <Button
              type={isSelectingHour ? 'primary' : 'default'}
              onClick={() => setIsSelectingHour(true)}
              size="small"
            >
              Hour
            </Button>
            <Button
              type={!isSelectingHour ? 'primary' : 'default'}
              onClick={() => setIsSelectingHour(false)}
              size="small"
            >
              Minute
            </Button>
          </div>
          
          <div className="time-display">
            {formatTime()}
          </div>
          
          {/* Quick selection buttons */}
          <div className="quick-selection">
            <div className="quick-selection-grid">
              {isSelectingHour ? (
                // Hour buttons (0-23)
                Array.from({ length: 24 }, (_, i) => i).map(hour => (
                  <Button
                    key={hour}
                    type={selectedHour === hour ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSelectedHour(hour)}
                    className="quick-selection-btn"
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))
              ) : (
                // Minute buttons (0, 5, 10, 15, ..., 55)
                Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
                  <Button
                    key={minute}
                    type={selectedMinute === minute ? 'primary' : 'default'}
                    size="small"
                    onClick={() => setSelectedMinute(minute)}
                    className="quick-selection-btn"
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClockTimePicker; 