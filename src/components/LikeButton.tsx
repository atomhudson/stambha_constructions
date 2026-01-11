import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useProjectLike, getProjectLikeCount } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
    projectId: string;
    className?: string;
    showCount?: boolean;
}

export const LikeButton = ({ projectId, className, showCount = true }: LikeButtonProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { checkIfLiked, toggleLike } = useProjectLike(projectId);

    useEffect(() => {
        const init = async () => {
            const liked = await checkIfLiked();
            setIsLiked(liked);
            const count = await getProjectLikeCount(projectId);
            setLikeCount(count);
        };
        init();
    }, [projectId, checkIfLiked]);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAnimating(true);
        try {
            const newLiked = await toggleLike();
            setIsLiked(newLiked);
            setLikeCount(prev => newLiked ? prev + 1 : Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.9 }}
            className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300",
                isLiked
                    ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
                className
            )}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isLiked ? 'liked' : 'not-liked'}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: isAnimating ? 1.3 : 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Heart
                        className={cn(
                            "w-4 h-4 transition-all",
                            isLiked && "fill-rose-500"
                        )}
                    />
                </motion.div>
            </AnimatePresence>
            {showCount && (
                <span className="text-xs font-medium">{likeCount}</span>
            )}
        </motion.button>
    );
};

export default LikeButton;
