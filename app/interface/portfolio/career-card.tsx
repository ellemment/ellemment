import { AnimatePresence, motion, type Variants, type HTMLMotionProps } from "framer-motion";
import React, { useState, type FC } from "react";
import { Icon } from '#app/interface/foundations/icons/icon';


interface CareerCardProps {
  id: string;
  color: string;
  title: string;
  description?: string;
  detailContent?: string;
  location?: string;
}

export const CareerCard: FC<CareerCardProps & HTMLMotionProps<"div">> = ({
  id,
  color,
  title,
  detailContent = "",
  location,
  ...props
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const hasDetail = detailContent.length > 0;

  const cardAnimationVariants: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <motion.div
      className="relative h-72 min-w-[280px] rounded-2xl shadow-md 
        md:h-[360px] md:min-w-[300px] 
        lg:h-[380px] lg:min-w-[340px] 
        xl:h-[480px] xl:min-w-[400px] 
        overflow-hidden"
      variants={cardAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      {...props}
    >
      <motion.div
        className="absolute h-full w-full bg-white"
        animate={{
          opacity: showDetail ? 0 : 1
        }}
      />

      <motion.div
        layoutId={`color-${id}`}
        className="absolute h-full w-full"
        style={{
          backgroundColor: color,
          opacity: showDetail ? 0.9 : 0
        }}
      />
      
      <div className="absolute z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {!showDetail ? (
            <motion.div 
              key="default"
              className="flex h-full flex-col p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.h1
                className="text-xl font-medium leading-6 text-gray-900"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {title}
              </motion.h1>
              {location && (
                <motion.p 
                  className="mt-1 text-xs text-gray-600"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {location}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              className="absolute inset-0 flex flex-col justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-white font-medium text-lg"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: 0.15,
                  ease: "easeOut"
                }}
              >
                {detailContent}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasDetail && (
        <ToggleButton
          color={color}
          onClick={() => setShowDetail(!showDetail)}
          showDetail={showDetail}
        />
      )}
    </motion.div>
  );
};

interface ToggleButtonProps {
  color: string;
  showDetail: boolean;
  onClick: () => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  showDetail,
  onClick,
}) => {
  const animationVariants = {
    main: {
      rotate: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    detail: {
      rotate: 45,
      backgroundColor: "#ffffff",
    },
  };

  return (
    <motion.button
      className="absolute right-4 bottom-4 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center z-50"
      variants={animationVariants}
      initial={false}
      animate={showDetail ? "detail" : "main"}
      transition={{ bounce: 0 }}
      onClick={onClick}
      aria-label={showDetail ? "Hide details" : "Show details"}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{ color: showDetail ? "#000000" : "#ffffff" }}
        transition={{ duration: 0.2 }}
      >
        <Icon name="plus" className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
};

export default CareerCard;