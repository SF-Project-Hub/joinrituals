import { Challenge, DayEntry, RitualType } from './types';

const createDayEntry = (day: number, ritual: RitualType, title: string, microBite: string): DayEntry => ({
  day,
  ritual,
  title,
  microBite,
});

// Morning ritual entries for 30 days
const morningEntries: DayEntry[] = [
  createDayEntry(1, "morning", "Mindful Awakening", "Take 3 deep breaths before getting out of bed"),
  createDayEntry(2, "morning", "Gratitude Start", "Name one thing you're grateful for today"),
  createDayEntry(3, "morning", "Intention Setting", "Set one clear intention for your day"),
  createDayEntry(4, "morning", "Body Check-in", "Notice how your body feels without judgment"),
  createDayEntry(5, "morning", "Positive Affirmation", "Say one kind thing to yourself"),
  createDayEntry(6, "morning", "Mindful Movement", "Stretch or move your body for 2 minutes"),
  createDayEntry(7, "morning", "Present Moment", "Notice 3 things you can see, hear, and feel"),
  createDayEntry(8, "morning", "Energy Assessment", "Rate your energy level from 1-10"),
  createDayEntry(9, "morning", "Purpose Reminder", "Recall why today matters to you"),
  createDayEntry(10, "morning", "Breath Work", "Practice 4-7-8 breathing technique"),
  createDayEntry(11, "morning", "Visualization", "Picture your ideal day unfolding"),
  createDayEntry(12, "morning", "Self-Compassion", "Treat yourself like a good friend"),
  createDayEntry(13, "morning", "Nature Connection", "Look outside and appreciate something natural"),
  createDayEntry(14, "morning", "Weekly Reflection", "What's one thing you've learned this week?"),
  createDayEntry(15, "morning", "Mindful Hydration", "Drink water slowly and mindfully"),
  createDayEntry(16, "morning", "Priority Focus", "Choose your most important task for today"),
  createDayEntry(17, "morning", "Body Appreciation", "Thank your body for carrying you"),
  createDayEntry(18, "morning", "Emotional Check", "Name your current emotion without changing it"),
  createDayEntry(19, "morning", "Growth Mindset", "Embrace one challenge as an opportunity"),
  createDayEntry(20, "morning", "Connection Intention", "Plan to genuinely connect with someone"),
  createDayEntry(21, "morning", "Mindful Preparation", "Prepare for your day with full attention"),
  createDayEntry(22, "morning", "Inner Wisdom", "Ask yourself: What do I need today?"),
  createDayEntry(23, "morning", "Strength Recognition", "Acknowledge one of your strengths"),
  createDayEntry(24, "morning", "Present Gift", "Appreciate this moment as it is"),
  createDayEntry(25, "morning", "Learning Mindset", "Approach today with curiosity"),
  createDayEntry(26, "morning", "Heart Opening", "Send loving thoughts to yourself"),
  createDayEntry(27, "morning", "Energy Alignment", "Align your actions with your values"),
  createDayEntry(28, "morning", "Peaceful Start", "Begin your day from a place of calm"),
  createDayEntry(29, "morning", "Transformation", "Notice how you've grown these 29 days"),
  createDayEntry(30, "morning", "Celebration", "Celebrate completing your 30-day journey"),
];

// Evening ritual entries for 30 days
const eveningEntries: DayEntry[] = [
  createDayEntry(1, "evening", "Day Review", "Reflect on one positive moment from today"),
  createDayEntry(2, "evening", "Gratitude Practice", "Write down 3 things you're grateful for"),
  createDayEntry(3, "evening", "Letting Go", "Release one worry or stress from today"),
  createDayEntry(4, "evening", "Achievement Recognition", "Acknowledge one thing you accomplished"),
  createDayEntry(5, "evening", "Emotional Processing", "Name and accept your feelings from today"),
  createDayEntry(6, "evening", "Body Relaxation", "Tense and release each muscle group"),
  createDayEntry(7, "evening", "Week Appreciation", "What made this week special?"),
  createDayEntry(8, "evening", "Learning Extraction", "What did you learn about yourself today?"),
  createDayEntry(9, "evening", "Forgiveness Practice", "Forgive yourself for any mistakes"),
  createDayEntry(10, "evening", "Connection Appreciation", "Appreciate someone who touched your day"),
  createDayEntry(11, "evening", "Progress Recognition", "Notice how you've grown recently"),
  createDayEntry(12, "evening", "Calm Breathing", "Practice slow, deep breathing for 2 minutes"),
  createDayEntry(13, "evening", "Tomorrow's Intention", "Set a gentle intention for tomorrow"),
  createDayEntry(14, "evening", "Bi-weekly Reflection", "What patterns do you notice in yourself?"),
  createDayEntry(15, "evening", "Self-Compassion", "Offer yourself the same kindness you'd give a friend"),
  createDayEntry(16, "evening", "Energy Release", "Mentally release the day's tensions"),
  createDayEntry(17, "evening", "Blessing Count", "Count your blessings, big and small"),
  createDayEntry(18, "evening", "Inner Peace", "Find one moment of peace within yourself"),
  createDayEntry(19, "evening", "Growth Acknowledgment", "Recognize one way you challenged yourself"),
  createDayEntry(20, "evening", "Love Expression", "Send love to yourself and others"),
  createDayEntry(21, "evening", "Wisdom Gathering", "What wisdom did today offer you?"),
  createDayEntry(22, "evening", "Peaceful Transition", "Consciously transition from day to night"),
  createDayEntry(23, "evening", "Strength Appreciation", "Appreciate your resilience today"),
  createDayEntry(24, "evening", "Gentle Closure", "Gently close today with acceptance"),
  createDayEntry(25, "evening", "Heart Gratitude", "Feel gratitude in your heart center"),
  createDayEntry(26, "evening", "Rest Preparation", "Prepare your mind and body for rest"),
  createDayEntry(27, "evening", "Journey Reflection", "Reflect on your transformation journey"),
  createDayEntry(28, "evening", "Peace Cultivation", "Cultivate inner peace before sleep"),
  createDayEntry(29, "evening", "Completion Joy", "Feel joy for nearly completing your journey"),
  createDayEntry(30, "evening", "Celebration & Rest", "Celebrate your commitment and rest peacefully"),
];

// Combine both morning and evening entries
const allDayEntries: DayEntry[] = [...morningEntries, ...eveningEntries];

export const defaultChallenge: Challenge = {
  id: "30-day-reset-v1",
  name: "30-Day Reset",
  description: "Transform your daily habits with mindful morning and evening rituals that nurture your mind, body, and spirit.",
  days: allDayEntries,
};

export const challenges: Challenge[] = [defaultChallenge];

// Helper functions
export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(challenge => challenge.id === id);
};

export const getDayEntries = (challengeId: string, day: number): { morning?: DayEntry; evening?: DayEntry } => {
  const challenge = getChallengeById(challengeId);
  if (!challenge) return {};
  
  const morning = challenge.days.find(entry => entry.day === day && entry.ritual === 'morning');
  const evening = challenge.days.find(entry => entry.day === day && entry.ritual === 'evening');
  
  return { morning, evening };
};

export const getTotalDays = (challengeId: string): number => {
  const challenge = getChallengeById(challengeId);
  if (!challenge) return 0;
  
  const uniqueDays = new Set(challenge.days.map(entry => entry.day));
  return uniqueDays.size;
};
