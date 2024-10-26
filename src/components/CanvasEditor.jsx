// src/components/CanvasEditor.js
import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useLocation } from 'react-router-dom';

function CanvasEditor() {
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(location.state.imageUrl);
    const canvasRef = useRef(null);
    const canvasInstance = useRef(null);

    useEffect(() => {
        if (canvasInstance.current) {
            canvasInstance.current.dispose();
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#f3f3f3',
        });

        canvasInstance.current = canvas;

        const loadImage = async () => {
            if (selectedImage) {
                try {
                    const img = await fabric.Image.fromURL(selectedImage, { crossOrigin: 'anonymous' });
                    // Scale image to fit canvas dimensions
                    const scaleX = canvas.width / img.width;
                    const scaleY = canvas.height / img.height;
                    const scale = Math.max(scaleX, scaleY); // Scale to fit

                    img.set({
                        scaleX: scale,
                        scaleY: scale,
                        left: 0,
                        top: 0,
                        selectable: false,
                        evented: false,
                    });

                    canvas.add(img);
                    canvas.sendToBack(img);
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            }
        };
        loadImage();

        const addText = () => {
            const text = new fabric.Textbox('New Text', {
                left: 100,
                top: 100,
                width: 200,
                fontSize: 24,
            });
            canvas.add(text);
            canvas.setActiveObject(text);
        };

        const addShape = (shapeType) => {
            let shape;
            switch (shapeType) {
                case 'circle':
                    shape = new fabric.Circle({ radius: 50, fill: '#ff5722', left: 150, top: 150 });
                    break;
                case 'rectangle':
                    shape = new fabric.Rect({ width: 100, height: 60, fill: '#4caf50', left: 200, top: 200 });
                    break;
                case 'triangle':
                    shape = new fabric.Triangle({ width: 100, height: 80, fill: '#2196f3', left: 300, top: 300 });
                    break;
                default:
                    return;
            }
            canvas.add(shape);
            canvas.setActiveObject(shape);
        };

        const downloadImage = () => {
            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1,
            });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const removeSelectedObject = () => {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
                canvas.renderAll();
            }
        };

        canvas.on('object:moving', () => {
            const activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'image') {
                canvas.getObjects().forEach((obj) => {
                    if (obj.type !== 'image') {
                        canvas.bringToFront(obj);
                    }
                });
            }
        });

        canvas.on('object:selected', () => {
            const activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type !== 'image') {
                canvas.bringToFront(activeObject);
            }
            canvas.renderAll();
        });

        window.addText = addText;
        window.addShape = addShape;
        window.downloadImage = downloadImage;
        window.removeSelectedObject = removeSelectedObject;

        return () => {
            if (canvasInstance.current) {
                canvasInstance.current.dispose();
                canvasInstance.current = null;
            }
        };
    }, [selectedImage]);

    return (
        <div className="canvas-editor">
            <div className="canvas-container">
                <canvas ref={canvasRef} />
            </div>
            <div className="button-container">
                <button className="action-btn add-text" onClick={() => window.addText()}>Add Text</button>
                <button className="action-btn add-shape" onClick={() => window.addShape('circle')}>Add Circle</button>
                <button className="action-btn add-shape" onClick={() => window.addShape('rectangle')}>Add Rectangle</button>
                <button className="action-btn add-shape" onClick={() => window.addShape('triangle')}>Add Triangle</button>
                <button className="action-btn download" onClick={() => window.downloadImage()}>Download Image</button>
                <button className="action-btn remove" onClick={() => window.removeSelectedObject()}>Remove Selected</button>
            </div>
        </div>
    );
}

export default CanvasEditor;
