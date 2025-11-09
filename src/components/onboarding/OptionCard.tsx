import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface OptionCardProps {
  emoji: string;
  title: string;
  description: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}

export default function OptionCard({
  emoji,
  title,
  description,
  value,
  isSelected,
  onClick,
  delay = 0,
}: OptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      onClick={onClick}
      className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-150 text-left ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Emoji */}
      <div className="mb-4 text-4xl">{emoji}</div>

      {/* Title */}
      <h3 className={`mb-2 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
        {description}
      </p>
    </motion.button>
  );
}