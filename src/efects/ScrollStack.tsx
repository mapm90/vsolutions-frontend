import { ReactNode, Children, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface ScrollStackItemProps {
  children: ReactNode;
  isActive?: boolean;
  index?: number;
}

export const ScrollStackItem = ({ children, isActive = true, index = 0 }: ScrollStackItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -15 }}
      animate={
        isActive
          ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          : { opacity: 0.3, y: -20, scale: 0.95, rotateX: 10 }
      }
      exit={{ opacity: 0, y: -50, scale: 0.8, rotateX: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="w-full"
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  showAllOnHover?: boolean;
}

const ScrollStack = ({
  children,
  className = "",
  staggerDelay = 0.15,
  showAllOnHover = false,
}: ScrollStackProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const childArray = Children.toArray(children);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <AnimatePresence mode="sync">
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    zIndex: hoveredIndex === index ? 10 : childArray.length - index,
                  }
                : { opacity: 0, y: 40, scale: 0.85 }
            }
            whileHover={
              showAllOnHover
                ? { scale: 1.02, y: -5, zIndex: 20 }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: index * staggerDelay,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ScrollStack;
