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
    <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center text-center bg-[#141416] border border-white/5 rounded-xl sm:rounded-2xl max-w-md mx-auto shadow-xl p-6 sm:p-8 w-full">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-sm leading-relaxed">
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
