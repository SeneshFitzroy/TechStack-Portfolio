import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const LoadingScreen = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      const textInterval = setInterval(() => {
        const texts = [
          'Loading 3D Models...',
          'Preparing Animations...',
          'Optimizing Performance...',
          'Almost Ready...',
          'Welcome!'
        ];
        setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotateY: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="logo-3d">SF</div>
            </motion.div>
            
            <motion.div
              className="loading-progress"
              initial={{ width: 0 }}
              animate={{ width: '300px' }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              <div className="progress-glow"></div>
            </motion.div>
            
            <motion.p
              className="loading-text"
              key={loadingText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.p>
            
            <div className="loading-particles">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </div>
          
          <style jsx>{`
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              overflow: hidden;
            }
            
            .loading-content {
              text-align: center;
              position: relative;
            }
            
            .loading-logo {
              margin-bottom: 2rem;
            }
            
            .logo-3d {
              font-size: 4rem;
              font-weight: 800;
              background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
              transform-style: preserve-3d;
            }
            
            .loading-progress {
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              overflow: hidden;
              position: relative;
              margin: 2rem auto;
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            }
            
            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #3b82f6, #8b5cf6);
              border-radius: 10px;
              position: relative;
            }
            
            .progress-glow {
              position: absolute;
              top: -2px;
              right: -2px;
              bottom: -2px;
              width: 20px;
              background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8));
              border-radius: 10px;
              filter: blur(5px);
            }
            
            .loading-text {
              color: #8b5cf6;
              font-size: 1.1rem;
              font-weight: 500;
              margin-top: 1rem;
            }
            
            .loading-particles {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            
            .particle {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #3b82f6;
              border-radius: 50%;
              box-shadow: 0 0 10px #3b82f6;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
