import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AdvancedCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const cursorOpacity = useTransform(
    [cursorXSpring, cursorYSpring],
    ([x, y]) => (x === -100 && y === -100 ? 0 : 1)
  );

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.matches('a, button, .clickable, [role="button"]')) {
        setCursorVariant('pointer');
        setIsHovering(true);
      } else if (target.matches('input, textarea')) {
        setCursorVariant('text');
        setIsHovering(true);
      } else if (target.matches('.project-card, .skill-bar, .cert-category')) {
        setCursorVariant('hover');
        setIsHovering(true);
      } else {
        setCursorVariant('default');
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setCursorVariant('default');
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      border: '2px solid rgba(59, 130, 246, 1)',
      backdropFilter: 'blur(10px)',
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      border: '2px solid rgba(139, 92, 246, 1)',
      backdropFilter: 'blur(15px)',
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      border: '2px solid rgba(16, 185, 129, 1)',
      backdropFilter: 'blur(8px)',
    },
    hover: {
      scale: 2,
      backgroundColor: 'rgba(245, 158, 11, 0.6)',
      border: '2px solid rgba(245, 158, 11, 1)',
      backdropFilter: 'blur(20px)',
    }
  };

  return (
    <>
      <motion.div
        className="advanced-cursor"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          opacity: cursorOpacity,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      
      <motion.div
        className="cursor-trail"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          opacity: cursorOpacity,
        }}
        animate={{
          scale: isHovering ? [1, 1.5, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 0.6,
            repeat: isHovering ? Infinity : 0,
            ease: 'easeInOut'
          }
        }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .advanced-cursor {
          position: fixed;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          box-shadow: 
            0 0 20px rgba(59, 130, 246, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .cursor-trail {
          position: fixed;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 50%,
            transparent 100%
          );
          transform: translate(-50%, -50%);
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          
          .advanced-cursor,
          .cursor-trail {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

const MagneticElements = () => {
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.3;
        const deltaX = x * strength;
        const deltaY = y * strength;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      };
      
      const handleMouseLeave = () => {
        element.style.transform = 'translate(0, 0)';
      };
      
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);
  
  return null;
};

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="parallax-background">
      <motion.div
        className="parallax-layer layer-1"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      <motion.div
        className="parallax-layer layer-2"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
        }}
      />
      <motion.div
        className="parallax-layer layer-3"
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`,
        }}
      />
      
      <style jsx>{`
        .parallax-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }
        
        .parallax-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 120%;
          height: 120%;
          border-radius: 50%;
          filter: blur(100px);
        }
        
        .layer-1 {
          background: radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.1), transparent 40%);
        }
        
        .layer-2 {
          background: radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.1), transparent 40%);
        }
        
        .layer-3 {
          background: radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(16, 185, 129, 0.05), transparent 40%);
        }
      `}</style>
    </div>
  );
};

export { AdvancedCursor, MagneticElements, ParallaxBackground };
