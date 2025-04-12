
export interface Question {
  id: number;
  text: string;
  // Positive values favor: Gen-Z (dimension 1) and Online (dimension 2)
  // Negative values favor: Boomer (dimension 1) and Caveman (dimension 2)
  dimension1Value: number; // Boomer (-) vs Gen-Z (+)
  dimension2Value: number; // Caveman (-) vs Online (+)
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Do you consider TikTok a primary news source?",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  {
    id: 2,
    text: "Have you ever used a rotary phone?",
    dimension1Value: -3,
    dimension2Value: 0,
  },
  {
    id: 3,
    text: "Do you prefer text messages to phone calls?",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  {
    id: 4,
    text: "Have you ever made your own fire without matches or a lighter?",
    dimension1Value: 0,
    dimension2Value: -3,
  },
  {
    id: 5,
    text: "Do you know what 'istg' means without looking it up?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  {
    id: 6,
    text: "Have you ever repaired your own household appliance?",
    dimension1Value: -2,
    dimension2Value: -2,
  },
  {
    id: 7,
    text: "Would you rather spend a weekend camping with no devices?",
    dimension1Value: -1,
    dimension2Value: -3,
  },
  {
    id: 8,
    text: "Have you been on social media today?",
    dimension1Value: 1,
    dimension2Value: 3,
  },
  {
    id: 9,
    text: "Do you know what a cassette tape is?",
    dimension1Value: -2,
    dimension2Value: 0,
  },
  {
    id: 10,
    text: "Have you ever used the phrase 'touch grass' unironically?",
    dimension1Value: 3,
    dimension2Value: 2,
  },
  {
    id: 11,
    text: "Do you find yourself saying 'back in my day' often?",
    dimension1Value: -3,
    dimension2Value: 0,
  },
  {
    id: 12,
    text: "Would you survive a week in the wilderness?",
    dimension1Value: -1,
    dimension2Value: -3,
  },
  {
    id: 13,
    text: "Do you have more than 5 active social media accounts?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  {
    id: 14,
    text: "Have you ever used lol, lmao, or rofl in real-life conversation?",
    dimension1Value: 3,
    dimension2Value: 2,
  },
  {
    id: 15,
    text: "Do you print out directions instead of using GPS?",
    dimension1Value: -3,
    dimension2Value: -2,
  },
  {
    id: 16,
    text: "Can you go a full day without checking your phone?",
    dimension1Value: -1,
    dimension2Value: -2,
  },
  {
    id: 17,
    text: "Have you ever made an aesthetic or mood board online?",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  {
    id: 18,
    text: "Do you think technology is more harmful than helpful?",
    dimension1Value: -2,
    dimension2Value: -2,
  },
  {
    id: 19,
    text: "Have you had more than 3 hours of screen time today?",
    dimension1Value: 1,
    dimension2Value: 3,
  },
  {
    id: 20,
    text: "Do you grow your own vegetables?",
    dimension1Value: -1,
    dimension2Value: -2,
  },
  {
    id: 21,
    text: "Can you explain what an NFT is?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  {
    id: 22,
    text: "Have you ever danced in front of your phone camera for social media?",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  {
    id: 23,
    text: "Do you own physical copies of music (CDs, vinyl, cassettes)?",
    dimension1Value: -2,
    dimension2Value: -1,
  },
  {
    id: 24,
    text: "Have you ever used a film camera?",
    dimension1Value: -1,
    dimension2Value: -1,
  },
  {
    id: 25,
    text: "Do you know what 'based' means in internet slang?",
    dimension1Value: 3,
    dimension2Value: 3,
  }
];
