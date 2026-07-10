import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScreenTransition: React.FC<{ children: React.ReactNode; screenKey: string }> = ({ children, screenKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
