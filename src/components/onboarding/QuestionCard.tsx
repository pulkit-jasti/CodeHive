import { motion } from 'motion/react';
import OptionCard from './OptionCard';

export interface QuestionOption {
  emoji: string;
  title: string;
  description: string;
  value: string;
}

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  options: QuestionOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Question Title */}
      <div className="mb-8 text-center">
        <h2 className="text-gray-900 mb-3">{title}</h2>
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            emoji={option.emoji}
            title={option.title}
            description={option.description}
            value={option.value}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}
