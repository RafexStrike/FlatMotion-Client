import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = AlertCircle
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center text-center bg-[#141416] border border-white/5 rounded-2xl max-w-md w-full mx-4 shadow-xl p-8 sm:p-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 sm:mb-8 flex-shrink-0">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2.5">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400 mb-8 sm:mb-10 max-w-sm leading-relaxed">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all text-sm"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
