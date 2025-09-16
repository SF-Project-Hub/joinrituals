export type RitualType = "morning" | "evening";

export type DayEntry = {
  day: number;
  ritual: RitualType;
  title: string;
  microBite: string;
  action?: string;
  actionDescription?: string;
  product?: string;
  productDescription?: string;
  content?: string;
  contentDescription?: string;
};

export type Challenge = {
  id: string;
  name: string;
  description: string;
  days: DayEntry[];
};

export type RitualProgress = {
  completed: { [day: number]: { morning?: boolean; evening?: boolean } };
  morningStreak: number;
  eveningStreak: number;
  startedAt?: string; // ISO-Date
};

export type AllProgress = {
  [challengeId: string]: RitualProgress;
};
