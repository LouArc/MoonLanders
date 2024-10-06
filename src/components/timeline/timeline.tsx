import React, { useState, useRef, useEffect } from 'react';
import './timeline.css';

interface VerticalTimelineProps {
  maxTime?: number; // You can set the max time
  onTimeChange?: (time: number) => void; // Callback for when the time changes
}

const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ maxTime = 100, onTimeChange }) => {
  const [time, setTime] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (circleRef.current && timelineRef.current) {
      const timelineRect = timelineRef.current.getBoundingClientRect();
      let newTop = e.clientY - timelineRect.top - circleRef.current.offsetHeight / 2;

      // Restrict movement within the timeline
      if (newTop < 0) newTop = 0;
      if (newTop > timelineRect.height - circleRef.current.offsetHeight) {
        newTop = timelineRect.height - circleRef.current.offsetHeight;
      }

      // Move the circle
      circleRef.current.style.top = `${newTop}px`;

      // Calculate and set time
      const percentage = newTop / (timelineRect.height - circleRef.current.offsetHeight);
      const calculatedTime = Math.round(percentage * maxTime);
      setTime(calculatedTime);

      // Trigger the callback for external components
      if (onTimeChange) {
        onTimeChange(calculatedTime);
      }
    }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      // Cleanup event listeners if component unmounts
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="timeline-container">
      <div ref={timelineRef} className="timeline">
        <div ref={circleRef} className="draggable" onMouseDown={handleMouseDown}></div>
      </div>
      <p>Selected Velocity: {time}</p>
    </div>
  );
};

export default VerticalTimeline;
