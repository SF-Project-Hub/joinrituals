import { AllProgress, RitualProgress, RitualType } from './types';

const STORAGE_KEY = '30-day-reset-progress';

// Default progress structure
const createDefaultProgress = (): RitualProgress => ({
  completed: {},
  morningStreak: 0,
  eveningStreak: 0,
  startedAt: new Date().toISOString(),
});

// Load all progress from localStorage
export const loadProgress = (): AllProgress => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
};

// Save all progress to localStorage
export const saveProgress = (progress: AllProgress): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Get progress for a specific challenge
export const getChallengeProgress = (challengeId: string): RitualProgress => {
  const allProgress = loadProgress();
  return allProgress[challengeId] || createDefaultProgress();
};

// Mark a specific day and ritual as completed
export const markCompleted = (
  challengeId: string, 
  day: number, 
  ritual: RitualType
): RitualProgress => {
  const allProgress = loadProgress();
  const challengeProgress = allProgress[challengeId] || createDefaultProgress();
  
  // Update completion status
  if (!challengeProgress.completed[day]) {
    challengeProgress.completed[day] = {};
  }
  challengeProgress.completed[day][ritual] = true;
  
  // Recalculate streaks
  const updatedProgress = {
    ...challengeProgress,
    ...calculateStreaks(challengeProgress.completed, ritual),
  };
  
  // Save updated progress
  allProgress[challengeId] = updatedProgress;
  saveProgress(allProgress);
  
  return updatedProgress;
};

// Check if a specific day and ritual is completed
export const isCompleted = (
  challengeId: string, 
  day: number, 
  ritual: RitualType
): boolean => {
  const progress = getChallengeProgress(challengeId);
  return progress.completed[day]?.[ritual] || false;
};

// Calculate current streaks for a ritual type
const calculateStreaks = (
  completed: { [day: number]: { morning?: boolean; evening?: boolean } },
  ritual: RitualType
): { morningStreak: number; eveningStreak: number } => {
  const days = Object.keys(completed)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending to check from latest day
  
  let morningStreak = 0;
  let eveningStreak = 0;
  
  // Calculate morning streak
  for (const day of days) {
    if (completed[day]?.morning) {
      morningStreak++;
    } else {
      break;
    }
  }
  
  // Calculate evening streak
  for (const day of days) {
    if (completed[day]?.evening) {
      eveningStreak++;
    } else {
      break;
    }
  }
  
  return { morningStreak, eveningStreak };
};

// Get comprehensive stats for a challenge
export const getStats = (challengeId: string) => {
  const progress = getChallengeProgress(challengeId);
  const completedDays = Object.keys(progress.completed);
  
  let totalMorningCompleted = 0;
  let totalEveningCompleted = 0;
  let totalDaysWithBothCompleted = 0;
  
  completedDays.forEach(day => {
    const dayNum = Number(day);
    const dayProgress = progress.completed[dayNum];
    
    if (dayProgress?.morning) totalMorningCompleted++;
    if (dayProgress?.evening) totalEveningCompleted++;
    if (dayProgress?.morning && dayProgress?.evening) totalDaysWithBothCompleted++;
  });
  
  return {
    totalMorningCompleted,
    totalEveningCompleted,
    totalDaysWithBothCompleted,
    totalDaysStarted: completedDays.length,
    morningStreak: progress.morningStreak,
    eveningStreak: progress.eveningStreak,
    startedAt: progress.startedAt,
  };
};

// Get current day based on when challenge was started
export const getCurrentDay = (challengeId: string): number => {
  const progress = getChallengeProgress(challengeId);
  
  if (!progress.startedAt) return 1;
  
  const startDate = new Date(progress.startedAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.min(diffDays, 30); // Cap at 30 days
};

// Check if user has started any challenge
export const hasStartedChallenge = (): boolean => {
  const allProgress = loadProgress();
  return Object.keys(allProgress).length > 0;
};

// Reset progress for a challenge (useful for starting over)
export const resetChallenge = (challengeId: string): void => {
  const allProgress = loadProgress();
  delete allProgress[challengeId];
  saveProgress(allProgress);
};

// Initialize challenge progress
export const initializeChallenge = (challengeId: string): RitualProgress => {
  const allProgress = loadProgress();
  const newProgress = createDefaultProgress();
  allProgress[challengeId] = newProgress;
  saveProgress(allProgress);
  return newProgress;
};
