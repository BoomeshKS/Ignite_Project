import React, { useEffect, useRef, useState } from 'react';
import { Home, ClipboardList, Cpu } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorTrailRef.current && cursorRingRef.current && navRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${x}px`;
            cursorRef.current.style.top = `${y}px`;
          }
          
          if (cursorRingRef.current) {
            cursorRingRef.current.style.left = `${x}px`;
            cursorRingRef.current.style.top = `${y}px`;
          }
        });
        
        setTimeout(() => {
          if (cursorTrailRef.current) {
            cursorTrailRef.current.style.left = `${x}px`;
            cursorTrailRef.current.style.top = `${y}px`;
          }
        }, 100);

        const items = document.querySelectorAll('.nav-item');
        items.forEach((item) => {
          const rect = (item as HTMLElement).getBoundingClientRect();
          const distX = x - (rect.left + rect.width / 2);
          const distY = y - (rect.top + rect.height / 2);
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < 200) {
            const angle = Math.atan2(distY, distX);
            const push = 1 - (distance / 200);
            const moveX = Math.cos(angle) * push * -10;
            const moveY = Math.sin(angle) * push * -10;
            (item as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          } else {
            (item as HTMLElement).style.transform = 'translate(0, 0)';
          }
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="ai-text">
            <span>A</span>
            <span>I</span>
          </div>
        </div>
      )}
      <nav className="navbar" ref={navRef}>
        <div className="cursor" ref={cursorRef}></div>
        <div className="cursor-ring" ref={cursorRingRef}></div>
        <div className="cursor-trail" ref={cursorTrailRef}></div>
        <div className="nav-decoration left"></div>
        <div className="nav-container">
          <div className="nav-item" style={{"--i": 0} as React.CSSProperties}>
            <div className="nav-item-background"></div>
            <div className="nav-item-content" onClick={()=>nav("/")}>
              <Home className="icon" />
              <span>Home</span>
            </div>
            <div className="nav-item-glow"></div>
            <div className="nav-item-border"></div>
          </div>
          <div className="nav-item" style={{"--i": 1} as React.CSSProperties}>
            <div className="nav-item-background"></div>
            <div className="nav-item-content" onClick={()=>nav("/order")}>
              <ClipboardList className="icon" />
              <span>Order Details</span>
            </div>
            <div className="nav-item-glow"></div>
            <div className="nav-item-border"></div>
          </div>
          <div className="nav-item" style={{"--i": 2} as React.CSSProperties}>
            <div className="nav-item-background"></div>
            <div className="nav-item-content" onClick={()=>nav("/rpa-ai")}>
              <Cpu className="icon" />
              <span>RPA Features</span>
            </div>
            <div className="nav-item-glow"></div>
            <div className="nav-item-border"></div>
          </div>
        </div>
        <div className="nav-decoration right"></div>
      </nav>
    </>
  );
};

export default Navbar;