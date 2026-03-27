import { AnimationJob } from '@/hooks/useAnimationJobs';
import JobStatusBadge from './JobStatusBadge';
import VideoPreview from './VideoPreview';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw } from 'lucide-react';

interface Props {
  jobs: AnimationJob[];
  onDeleteJob: (id: string) => Promise<void>;
  onRegenerateJob: (id: string) => Promise<void>;
  loading: boolean;
}

export default function GenerationHistory({ jobs, onDeleteJob, onRegenerateJob, loading }: Props) {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading animations...
      </div>
    );
  }

  if (jobs.length === 0) {
    return null; // the EmptyState handles this on the Dashboard level
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {jobs.map((job) => (
        <div key={job.id} className="bg-[#141416] border border-white/5 rounded-2xl p-5 shadow-xl transition-all hover:border-white/10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <JobStatusBadge status={job.status} />
                <span className="text-[11px] text-gray-500">
                  {new Date(job.createdAt).toLocaleString()}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400 font-mono">
                  {job.model}
                </span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed font-medium">
                "{job.prompt}"
              </p>
            </div>
            
            <div className="flex gap-1.5 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRegenerateJob(job.id)}
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Regenerate"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteJob(job.id)}
                className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete Job"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Active indicator */}
          {!['done', 'failed', 'expired'].includes(job.status) && (
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-full animate-pulse opacity-50"></div>
            </div>
          )}

          {/* Error Message */}
          {job.status === 'failed' && job.errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-mono overflow-x-auto">
              {job.errorMessage}
            </div>
          )}

          {/* Expired Message */}
          {job.status === 'expired' && (
            <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400">
              This video has expired and been purged from storage. Click regenerate to run the prompt again.
            </div>
          )}

          {/* Video Player */}
          {job.status === 'done' && job.videoUrl && (
            <div className="mt-4">
              <VideoPreview url={job.videoUrl} onRegenerate={() => onRegenerateJob(job.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
