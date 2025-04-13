export interface Question {
  id: number;
  text: string;
  // Positive values favor: Gen-Z (dimension 1) and Online (dimension 2)
  // Negative values favor: Boomer (dimension 1) and Caveman (dimension 2)
  dimension1Value: number; // Boomer (-) vs Gen-Z (+)
  dimension2Value: number; // Caveman (-) vs Online (+)
}

export const questions: Question[] = [
  { // Was ID 1
    id: 1,
    text: "Do you consider TikTok a primary news source?",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 2
    id: 2,
    text: "Have you ever used a rotary phone?",
    dimension1Value: -3,
    dimension2Value: 0,
  },
  { // Was ID 3
    id: 3,
    text: "Do you prefer text messages to phone calls?",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 4
    id: 4,
    text: "Have you ever made your own fire without matches or a lighter?",
    dimension1Value: 0,
    dimension2Value: -3,
  },
  { // Was ID 5
    id: 5,
    text: "Do you know what 'istg' means without looking it up?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 6
    id: 6,
    text: "Have you ever repaired your own household appliance?",
    dimension1Value: -2,
    dimension2Value: -2,
  },
  { // Was ID 7
    id: 7,
    text: "Would you rather spend a weekend camping with no devices?",
    dimension1Value: -1,
    dimension2Value: -3,
  },
  // Removed ID 8
  // Removed ID 9
  { // Was ID 10
    id: 8,
    text: "Have you ever used the phrase 'touch grass' unironically?",
    dimension1Value: 3,
    dimension2Value: 2,
  },
  { // Was ID 11
    id: 9,
    text: "Do you find yourself saying 'back in my day' often?",
    dimension1Value: -3,
    dimension2Value: 0,
  },
  { // Was ID 12
    id: 10,
    text: "Would you survive a week in the wilderness?",
    dimension1Value: -1,
    dimension2Value: -3,
  },
  { // Was ID 13
    id: 11,
    text: "Do you have more than 5 active social media accounts?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 14
    id: 12,
    text: "Have you ever used lol, lmao, or rofl in real-life conversation?",
    dimension1Value: 3,
    dimension2Value: 2,
  },
  { // Was ID 15
    id: 13,
    text: "Do you print out directions instead of using GPS?",
    dimension1Value: -3,
    dimension2Value: -2,
  },
  // Removed ID 16
  { // Was ID 17
    id: 14,
    text: "Have you ever made an aesthetic or mood board online?",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 18
    id: 15,
    text: "Do you think technology is more harmful than helpful?",
    dimension1Value: -2,
    dimension2Value: -2,
  },
  // Removed ID 19
  { // Was ID 20
    id: 16,
    text: "Do you grow your own vegetables?",
    dimension1Value: -1,
    dimension2Value: -2,
  },
  { // Was ID 21
    id: 17,
    text: "Can you explain what an NFT is?",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 22
    id: 18,
    text: "Have you ever danced in front of your phone camera for social media?",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  // Removed ID 23
  // Removed ID 24
  { // Was ID 25
    id: 19,
    text: "Do you know what 'based' means in internet slang?",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  // Removed ID 26
  { // Was ID 27
    id: 20,
    text: "Scrolled through Twitter/X before getting out of bed",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 28
    id: 21,
    text: "Been in a reply war with someone whose profile picture is an anime character",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 29
    id: 22,
    text: "Bookmarked a Notion template and never opened it again",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 30
    id: 23,
    text: "Tried to go viral and deleted the post when it flopped",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 31
    id: 24,
    text: "Heard of a tech trend from a meme before the news",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 32
    id: 25,
    text: "Got news of a world event from a Discord notification",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 33
    id: 26,
    text: "Said “touch grass” or “go outside” to someone while inside",
    dimension1Value: 3,
    dimension2Value: 2,
  },
  { // Was ID 34
    id: 27,
    text: "Participated in a meme trend at the peak of its cycle",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 35
    id: 28,
    text: "Replied to a tweet with “this” and nothing else",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  // Removed ID 36
  { // Was ID 37
    id: 29,
    text: "Followed someone for memes and stayed for the oversharing",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 38
    id: 30,
    text: "Unfollowed someone after they got too many VC followers",
    dimension1Value: 1,
    dimension2Value: 3,
  },
  { // Was ID 39
    id: 31,
    text: "Lost an hour scrolling LinkedIn ironically",
    dimension1Value: 1,
    dimension2Value: 2,
  },
  { // Was ID 40
    id: 32,
    text: "Taken a screenshot of a tweet just in case it gets deleted",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 41
    id: 33,
    text: "Laughed out loud alone in public at a meme",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 42
    id: 34,
    text: "Followed someone across Twitter, Threads, Bluesky, and Mastodon",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 43
    id: 35,
    text: "Created a burner or alt account",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 44
    id: 36,
    text: "Thought “I should tweet this” during a real-life conversation",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 45
    id: 37,
    text: "Watched a TikTok and thought, “this person definitely lives in SF”",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 46
    id: 38,
    text: "Do you still use BeReal?",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 47
    id: 39,
    text: "Have you updated your Facebook profile in the last month?",
    dimension1Value: -2,
    dimension2Value: 1,
  },
  // Removed ID 48
  { // Was ID 49
    id: 40,
    text: "Read more screenshots of Reddit on Twitter than Reddit itself",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  { // Was ID 50
    id: 41,
    text: "Been afraid to tweet because you were “not in the right vibe”",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 51
    id: 42,
    text: "Recognized someone IRL from their Twitter/X profile",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 52
    id: 43,
    text: "Rebranded your entire personality for 2 weeks after a viral tweet",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 53
    id: 44,
    text: "Closed your laptop dramatically after doom scrolling and did it again on your phone",
    dimension1Value: 2,
    dimension2Value: 3,
  },
  // Removed ID 54
  { // Was ID 55
    id: 45,
    text: "You have a waifu",
    dimension1Value: 2,
    dimension2Value: 2,
  },
  { // Was ID 56
    id: 46,
    text: "Called someone “bestie” after one DM exchange",
    dimension1Value: 3,
    dimension2Value: 3,
  },
  { // Was ID 57
    id: 47,
    text: "Muttered “capitalism” under your breath while buying a $9 iced coffee",
    dimension1Value: 1,
    dimension2Value: -1,
  },
  // Removed ID 58
  { // Was ID 59
    id: 48,
    text: "Have you ever been grateful to a rando in Brazil for seeding your torrent of Lord of the Rings?",
    dimension1Value: 0,
    dimension2Value: 2,
  },
  { // Was ID 60
    id: 49,
    text: "You lost bitcoin in MountGox",
    dimension1Value: -1,
    dimension2Value: 2,
  },
  // Removed ID 61
  // Removed ID 62
  { // Was ID 63
    id: 50,
    text: "You've cried over a VTuber graduation",
    dimension1Value: 3,
    dimension2Value: 3,
  }
  // Removed ID 64
];