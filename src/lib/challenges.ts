import { Challenge, DayEntry } from "./types";

export const defaultChallenge: Challenge = {
  id: "30-day-reset",
  name: "30-Day Reset",
  description: "Perform by Day, Recover by Night",
  days: [
    // Tag 1–10
    { day: 1, ritual: "morning", title: "Hydration First", microBite: "Trinke Wasser vor Kaffee – dein Körper verliert über Nacht bis zu 1 Liter Flüssigkeit." },
    { day: 1, ritual: "evening", title: "Digital Sunset", microBite: "Lege dein Handy 30 Min vor dem Schlaf beiseite – blaues Licht bremst Melatonin." },

    { day: 2, ritual: "morning", title: "Fresh Air", microBite: "Öffne das Fenster: Sonnenlicht & frische Luft regulieren deine innere Uhr." },
    { day: 2, ritual: "evening", title: "Magnesium Support", microBite: "Magnesium entspannt Muskeln und Nerven – eine sanfte Einladung an den Schlaf." },

    { day: 3, ritual: "morning", title: "Movement Boost", microBite: "5 Minuten Stretching oder Mobility – bringt Kreislauf & Gelenke in Schwung." },
    { day: 3, ritual: "evening", title: "Cool Down", microBite: "Eine kühlere Raumtemperatur (18–20°C) fördert tiefen Schlaf." },

    { day: 4, ritual: "morning", title: "Mindful Start", microBite: "Schreibe 1 Dankbarkeit auf – positiver Fokus beeinflusst deinen ganzen Tag." },
    { day: 4, ritual: "evening", title: "Sleep Journal", microBite: "Notiere kurz 3 Gedanken – entlastet den Kopf und reduziert Grübeln." },

    { day: 5, ritual: "morning", title: "Protein Kick", microBite: "Ein kleines Protein-Frühstück stabilisiert Blutzucker & Fokus." },
    { day: 5, ritual: "evening", title: "Breathing Reset", microBite: "4-7-8 Atemtechnik: 4s ein, 7s halten, 8s aus – senkt Puls & Stress." },

    { day: 6, ritual: "morning", title: "Cold Splash", microBite: "Kaltes Wasser im Gesicht/Dusche aktiviert Nervensystem & Fokus." },
    { day: 6, ritual: "evening", title: "Warm Ritual", microBite: "Warme Dusche oder Tee signalisiert: jetzt runterfahren." },

    { day: 7, ritual: "morning", title: "Plan the Day", microBite: "3 Prioritäten notieren – gibt Klarheit & Richtung." },
    { day: 7, ritual: "evening", title: "Consistency Wins", microBite: "Geh möglichst jeden Abend zur gleichen Zeit ins Bett – dein Körper liebt Rhythmus." },

    { day: 8, ritual: "morning", title: "Electrolyte Reset", microBite: "Ein Stick Elektrolyte füllt Speicher & bringt Energie." },
    { day: 8, ritual: "evening", title: "Screen-Free Zone", microBite: "15 Min ohne Bildschirm vorm Schlaf – Ruhe für Augen & Kopf." },

    { day: 9, ritual: "morning", title: "Sun Exposure", microBite: "10 Min Morgenlicht stabilisieren deinen zirkadianen Rhythmus." },
    { day: 9, ritual: "evening", title: "Darkness Hack", microBite: "Dimme Lichter am Abend – Dunkelheit = Melatonin-Signal." },

    { day: 10, ritual: "morning", title: "Posture Reset", microBite: "Aufrecht stehen, tief atmen – aktiviert Kreislauf & Präsenz." },
    { day: 10, ritual: "evening", title: "Bed Only for Sleep", microBite: "Nutze dein Bett nur zum Schlafen – Ort-Routine-Verknüpfung stärkt Schlaf." },

    // Tag 11–20
    { day: 11, ritual: "morning", title: "Morning Walk", microBite: "10 Min Gehen – Kreislauf an, Kopf klar." },
    { day: 11, ritual: "evening", title: "Herbal Tea", microBite: "Kamille/Lavendel beruhigen & unterstützen Entspannung." },

    { day: 12, ritual: "morning", title: "Smile Start", microBite: "30 Sekunden bewusst lächeln – trickst dein Gehirn in Positivität." },
    { day: 12, ritual: "evening", title: "Stretch & Relax", microBite: "Sanfte Dehnung vor dem Schlaf reduziert Muskelspannung." },

    { day: 13, ritual: "morning", title: "Protein Shake", microBite: "Eiweiß am Morgen = langanhaltende Energie & Sättigung." },
    { day: 13, ritual: "evening", title: "Gratitude Night", microBite: "Schreibe 1 Sache auf, für die du dankbar bist – fördert positiven Schlaf." },

    { day: 14, ritual: "morning", title: "Mindful Breath", microBite: "3 tiefe Atemzüge → mehr Fokus, weniger Stress." },
    { day: 14, ritual: "evening", title: "Digital Detox", microBite: "1h vor Schlaf keine Socials – Kopf kommt schneller zur Ruhe." },

    { day: 15, ritual: "morning", title: "Citrus Boost", microBite: "Vitamin C unterstützt Immunsystem – starte frisch." },
    { day: 15, ritual: "evening", title: "Foam Roll", microBite: "5 Min Faszien-Rolling lockert Muskeln & entspannt." },

    { day: 16, ritual: "morning", title: "Gratitude Note", microBite: "Notiere 1 kleine Freude von gestern – shiftet deinen Fokus." },
    { day: 16, ritual: "evening", title: "Box Breathing", microBite: "4s ein, 4s halten, 4s aus, 4s halten – beruhigt das Nervensystem." },

    { day: 17, ritual: "morning", title: "Protein + Electrolyte", microBite: "Kombi aus Eiweiß & Mineralien = stabiler Start." },
    { day: 17, ritual: "evening", title: "Candlelight", microBite: "Kerzenlicht statt Deckenlampe → sanftes Schlaf-Signal." },

    { day: 18, ritual: "morning", title: "Power Playlist", microBite: "1 Lieblingssong am Morgen hebt sofort die Stimmung." },
    { day: 18, ritual: "evening", title: "Sleep Prep", microBite: "Bett frisch & Zimmer aufgeräumt → schneller runterkommen." },

    { day: 19, ritual: "morning", title: "Early Steps", microBite: "1.000 Schritte vor 10 Uhr – Aktivierung pur." },
    { day: 19, ritual: "evening", title: "Cool Shower", microBite: "Kurze kühle Dusche senkt Kerntemperatur für besseren Schlaf." },

    { day: 20, ritual: "morning", title: "Vision Note", microBite: "1 Tagesziel notieren – mentaler Fokus-Booster." },
    { day: 20, ritual: "evening", title: "Aromatherapy", microBite: "Lavendelduft reduziert Stress & fördert Schlafqualität." },

    // Tag 21–30
    { day: 21, ritual: "morning", title: "Hydration Habit", microBite: "Glas Wasser direkt nach dem Aufstehen = Energy Trigger." },
    { day: 21, ritual: "evening", title: "Read a Page", microBite: "1 Seite Buch statt Handy – dein Gehirn beruhigt sich." },

    { day: 22, ritual: "morning", title: "Stretch Spine", microBite: "Mobilisiere Rücken & Nacken – verhindert Büroverspannungen." },
    { day: 22, ritual: "evening", title: "Tea & Breath", microBite: "Kräutertee + 3 tiefe Atemzüge = Schlafbrücke." },

    { day: 23, ritual: "morning", title: "Morning Light", microBite: "Ans Fenster gehen – Licht synchronisiert deine innere Uhr." },
    { day: 23, ritual: "evening", title: "Warm Socks", microBite: "Warme Füße helfen, schneller einzuschlafen." },

    { day: 24, ritual: "morning", title: "Body Scan", microBite: "2 Min Körper-Scan: Aufmerksamkeit von Kopf bis Fuß." },
    { day: 24, ritual: "evening", title: "Phone Away", microBite: "Lege das Handy in ein anderes Zimmer → besserer Tiefschlaf." },

    { day: 25, ritual: "morning", title: "Mini Workout", microBite: "10 Push-ups oder Squats – Weckruf für Körper & Geist." },
    { day: 25, ritual: "evening", title: "Stretch Legs", microBite: "Bein-Dehnung senkt Muskelspannung → leichteres Einschlafen." },

    { day: 26, ritual: "morning", title: "Cold Drink", microBite: "Ein kühles Glas Wasser belebt sofort." },
    { day: 26, ritual: "evening", title: "Light Snack", microBite: "Klein & eiweißreich (z. B. Joghurt) → stabiler Blutzucker." },

    { day: 27, ritual: "morning", title: "Coffee Delay", microBite: "Warte ~60 Min mit Kaffee – besserer Cortisolrhythmus." },
    { day: 27, ritual: "evening", title: "Dark Room", microBite: "Verdunkle dein Schlafzimmer → tieferer Schlaf." },

    { day: 28, ritual: "morning", title: "Morning Affirmation", microBite: "\"Ich bin bereit für den Tag.\" – kurzer mentaler Anker." },
    { day: 28, ritual: "evening", title: "Bedtime Routine", microBite: "Immer gleiche 3 Schritte (Zähne, Tee, Journal) = Schlafanker." },

    { day: 29, ritual: "morning", title: "Focus Breathing", microBite: "2 Min Atemübung – Fokus & Energie." },
    { day: 29, ritual: "evening", title: "Silent 5", microBite: "5 Min Stille vorm Schlaf – weniger Gedankenkarussell." },

    { day: 30, ritual: "morning", title: "Reset Reflection", microBite: "Was hat in 30 Tagen am meisten geholfen? Kurz notieren." },
    { day: 30, ritual: "evening", title: "Celebrate Sleep", microBite: "Feiere deinen Fortschritt – Schlaf ist dein Superpower-Finale." }
  ]
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
