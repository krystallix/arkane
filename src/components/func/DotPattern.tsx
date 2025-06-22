import React, { useRef, useEffect } from 'react';
import personImage from '@/assets/people.png';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];

const DotPattern: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({
    x: 0,
    y: 0,
    isOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    let animationFrameId: number;
    const particles: Particle[] = [];
    
    const image = new Image();
    image.src = personImage;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = event.clientX - rect.left;
        mouse.current.y = event.clientY - rect.top;
    };
    
    const handleMouseOver = () => {
        mouse.current.isOver = true;
    };
    
    const handleMouseOut = () => {
        mouse.current.isOver = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseover', handleMouseOver);
    canvas.addEventListener('mouseout', handleMouseOut);

    const init = () => {
        const container = canvas.parentElement;
        if (!container) return;
        
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        particles.length = 0;

        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        
        let renderWidth, renderHeight, offsetX, offsetY;
        const scale = 2; // Scale up the image object

        if (imageAspectRatio > canvasAspectRatio) {
            renderWidth = canvas.width * scale;
            renderHeight = (canvas.width / imageAspectRatio) * scale;
        } else {
            renderHeight = canvas.height * scale;
            renderWidth = (canvas.height * imageAspectRatio) * scale;
        }
        offsetX = (canvas.width - renderWidth) / 2;
        offsetY = (canvas.height - renderHeight) / 2;

        ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const step = 6;
        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3];

            if (alpha > 128) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    originX: x,
                    originY: y,
                    size: 2.7,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    vx: 0,
                    vy: 0,
                });
            }
          }
        }
        
        if (!animationFrameId) {
            animate();
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            if (mouse.current.isOver) {
                // Gentle pull towards the origin
                p.vx += (p.originX - p.x) * 0.01;
                p.vy += (p.originY - p.y) * 0.01;
            } else {
                // Random movement when mouse is not over - increased force for faster scattering
                p.vx += (Math.random() - 0.5) * 2;
                p.vy += (Math.random() - 0.5) * 2;
            }

            // Stronger damping for a smoother stop
            p.vx *= 0.92;
            p.vy *= 0.92;
            
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x - p.size < 0) {
                p.x = p.size;
                p.vx *= -1;
            }
            if (p.x + p.size > canvas.width) {
                p.x = canvas.width - p.size;
                p.vx *= -1;
            }
            if (p.y - p.size < 0) {
                p.y = p.size;
                p.vy *= -1;
            }
            if (p.y + p.size > canvas.height) {
                p.y = canvas.height - p.size;
                p.vy *= -1;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    image.onload = init;
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseover', handleMouseOver);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default DotPattern; 