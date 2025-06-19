import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic Button Effect
export function MagneticButton({ children, className, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Scroll-triggered animations
export function ScrollReveal({ children, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={directions[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directions[direction]}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Parallax Text Effect
export function ParallaxText({ children, speed = 0.5 }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -speed * 1000]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
}

// Staggered Animation Container
export function StaggerContainer({ children, stagger = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual staggered item
export function StaggerItem({ children, delay = 0 }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Morphing Shape
export function MorphingShape({ className }) {
  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: ["20%", "40%", "60%", "80%", "20%"],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Floating Animation
export function FloatingElement({ children, intensity = 1 }) {
  return (
    <motion.div
      animate={{
        y: [-10 * intensity, 10 * intensity, -10 * intensity],
        rotate: [-2 * intensity, 2 * intensity, -2 * intensity]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Glitch Effect
export function GlitchText({ children, className }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, -2, 2, 0],
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ff00",
          "0 0 0 transparent"
        ]
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3
      }}
    >
      {children}
    </motion.div>
  );
}

// Progress Bar Animation
export function AnimatedProgressBar({ progress, className }) {
  return (
    <div className={`progress-bar-container ${className}`}>
      <motion.div
        className="progress-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}

// Typewriter Effect
export function TypewriterText({ text, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.05
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}