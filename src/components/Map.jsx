// CanvasMap.js
import React, { useEffect, useRef, useState } from 'react';
import './css/map.css'

const Map = ({ handleLocation }) => {
      const canvasRef = useRef(null);
      const containerRef = useRef(null);
      const [scale, setScale] = useState(1);
      const [pinchStartDistance, setPinchStartDistance] = useState(null);
      const [pinchStartScale, setPinchStartScale] = useState(null);
      const [mouseDown, setMouseDown] = useState(false);
      const [lastMouseX, setLastMouseX] = useState(null);
      const [lastMouseY, setLastMouseY] = useState(null);

      useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const drawMap = () => {
                  context.clearRect(0, 0, canvas.width, canvas.height);

                  const backgroundImage = new Image();
                  backgroundImage.src = 'map.jpg';
                  backgroundImage.onload = () => {
                        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                  };
            };

            drawMap();

            // Cleanup event listener when component unmounts
            return () => {
                  canvas.removeEventListener('click', handleCanvasClick);
                  window.removeEventListener('mousemove', handleMouseMove);
                  window.removeEventListener('mouseup', handleMouseUp);
            };
      }, [scale]);

      const handleCanvasClick = (event) => {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (event.clientX - rect.left) / scale;
            const y = (event.clientY - rect.top) / scale;
            handleLocation(Math.round(x), Math.round(y))
      };

      const handleMouseDown = (event) => {
            if (event.button === 0) {
                  setMouseDown(true);
                  setLastMouseX(event.clientX);
                  setLastMouseY(event.clientY);
            }
      };

      const handleMouseMove = (event) => {
            if (mouseDown) {
                  const deltaX = event.clientX - lastMouseX;
                  const deltaY = event.clientY - lastMouseY;
                  setScale((prevScale) => Math.max(1, Math.max(0.1, prevScale + deltaY / 100))); // Adjust scale based on vertical movement
                  setLastMouseX(event.clientX);
                  setLastMouseY(event.clientY);
            }
      };

      const handleMouseUp = () => {
            setMouseDown(false);
      };

      const handleTouchStart = (event) => {
            if (event.touches.length === 2) {
                  const touch1 = event.touches[0];
                  const touch2 = event.touches[1];
                  const distance = Math.sqrt(
                        Math.pow(touch1.clientX - touch2.clientX, 2) +
                        Math.pow(touch1.clientY - touch2.clientY, 2)
                  );
                  setPinchStartDistance(distance);
                  setPinchStartScale(scale);
            }
      };

      const handleTouchMove = (event) => {
            event.preventDefault();
            if (event.touches.length === 2 && pinchStartDistance) {
                  const touch1 = event.touches[0];
                  const touch2 = event.touches[1];
                  const distance = Math.sqrt(
                        Math.pow(touch1.clientX - touch2.clientX, 2) +
                        Math.pow(touch1.clientY - touch2.clientY, 2)
                  );
                  const scaleChange = (distance - pinchStartDistance) / 1000; // Adjust this factor for sensitivity
                  setScale(Math.max(0.1, pinchStartScale + scaleChange)); // Prevent zooming out too much
            }
      };

      const handleTouchEnd = () => {
            setPinchStartDistance(null);
            setPinchStartScale(null);
      };

      const canvasWidth = 200 * scale;
      const canvasHeight = 200 * scale;

      return (
            <div
                  className='map-location'
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
            >
                  <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} onClick={handleCanvasClick} />
            </div>
      );
};

export default Map;
