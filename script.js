(() => {
  "use strict";

  const STORAGE_KEY = "queenNajmaBirthdayQuest.v2";

  const LOVE_LANGUAGE_KEYS = [
    "qualityTime", "wordsOfAffirmation", "actsOfService", "receivingGifts", "physicalTouch"
  ];
  const GIFT_TYPE_KEYS = ["familyTime", "handmadeGift", "digitalGift", "amazonGift"];

  const CATEGORY_LABELS = {
    qualityTime: "Quality Time",
    wordsOfAffirmation: "Words of Affirmation",
    actsOfService: "Acts of Service",
    receivingGifts: "Receiving Gifts",
    physicalTouch: "Physical Touch",
    familyTime: "Family Time",
    handmadeGift: "Handmade Gift",
    digitalGift: "Digital Gift",
    amazonGift: "Amazon Gift"
  };

  const galleryPhotos = [
    { path: "assets/photos/najma-portrait.jpg", alt: "Queen Najma smiling warmly at the camera", caption: "Her Majesty, smiling as only she can." },
    { path: "assets/photos/family-mountain.jpg", alt: "The Bhatti family gathered in front of a mountain", caption: "The family together on the road to another memory." },
    { path: "assets/photos/rv-hammock.jpg", alt: "Queen Najma laughing in a hammock while Khalid stands nearby", caption: "The RV trip: relaxation, with a little assistance from Khalid." },
    { path: "assets/photos/what-wall.jpg", alt: "Queen Najma wearing sunglasses and the legendary What Wall shirt", caption: "The famous What Wall? shirt that became part of Bhatti family history." },
    { path: "assets/photos/hang-loose-family.jpg", alt: "Queen Najma, Ali, and Khalid sitting together in matching Hang Loose shirts", caption: "The legendary family shirt makes its official appearance." },
    { path: "assets/photos/grandkids-couch.jpg", alt: "Queen Najma cuddling with her grandchildren beneath a blanket", caption: "A couch, a blanket, and the finest company in the kingdom." },
    { path: "assets/photos/hawaii-beach.jpg", alt: "Queen Najma smiling on a sunny beach in Hawaii", caption: "Hawaii sunshine and a Queen ready for adventure." },
    { path: "assets/photos/hawaii-ali-najma.jpg", alt: "Ali and Queen Najma smiling together beside the ocean in Hawaii", caption: "Ali and his queen, somewhere beautifully tropical." },
    { path: "assets/photos/hawaii-wave.jpg", alt: "Queen Najma waving in a flowered outfit and Hawaii sun hat", caption: "A royal wave from Hawaii." },
    { path: "assets/photos/hawaii-lookout.jpg", alt: "Queen Najma smiling at a scenic Hawaii lookout", caption: "Stopping to enjoy the view—and improve it." },
    { path: "assets/photos/umrah-ali-najma.jpg", alt: "Ali and Queen Najma together near the Kaaba during Umrah", caption: "A sacred journey remembered with love." },
    { path: "assets/photos/family-extra-01.jpg", alt: "An additional Queen Najma family memory", caption: "A future family memory." },
    { path: "assets/photos/family-extra-02.jpg", alt: "Another Queen Najma family memory", caption: "Another chapter in the family story." },
    { path: "assets/photos/family-extra-03.jpg", alt: "A treasured Queen Najma family moment", caption: "One more memory for the royal collection." }
  ];

  const memoryTokens = [
    { chapterId: "birth-of-a-queen", emoji: "❤️", label: "Family Heart" },
    { chapterId: "midnight-cookie-mission", emoji: "🍪", label: "Midnight Cookies" },
    { chapterId: "what-wall-shirt", emoji: "🧱", label: "Legendary What Wall" },
    { chapterId: "mount-volcano", emoji: "🌋", label: "Volcano Stone" },
    { chapterId: "endless-food", emoji: "☕", label: "Chai Cup" },
    { chapterId: "crochet-forest", emoji: "🧶", label: "Crochet Ball" },
    { chapterId: "grandchildren-shopping", emoji: "🛍️", label: "Shopping Bag" },
    { chapterId: "memory-mountain", emoji: "📸", label: "Memory Camera" },
    { chapterId: "birthday-treasure", emoji: "👑", label: "Birthday Crown" }
  ];

  const achievementDefinitions = [
    { id: "cookie-monster", emoji: "🍪", label: "Cookie Monster", test: () => state.memoryTokens.includes("midnight-cookie-mission") },
    { id: "tea-lover", emoji: "☕", label: "Tea Lover", test: () => Object.values(state.answers).includes("chai-peace") },
    { id: "master-shopper", emoji: "🛍️", label: "Master Shopper", test: () => state.memoryTokens.includes("grandchildren-shopping") },
    { id: "family-first", emoji: "❤️", label: "Family First", test: () => state.memoryTokens.length >= 5 },
    { id: "crochet-champion", emoji: "🧶", label: "Crochet Champion", test: () => state.memoryTokens.includes("crochet-forest") },
    { id: "volcano-survivor", emoji: "🌋", label: "Volcano Survivor", test: () => state.memoryTokens.includes("mount-volcano") },
    { id: "perfect-adventure", emoji: "🏆", label: "Perfect Adventure", test: () => state.memoryTokens.length === chapters.length }
  ];

  const soundPaths = {
    pageTurn: "assets/audio/effects/page-turn.mp3",
    volcano: "assets/audio/effects/volcano.mp3",
    cookies: "assets/audio/effects/cookies.mp3",
    chai: "assets/audio/effects/chai.mp3",
    crochet: "assets/audio/effects/crochet.mp3",
    shopping: "assets/audio/effects/shopping.mp3",
    boing: "assets/audio/effects/boing.mp3",
    treasure: "assets/audio/effects/treasure.mp3",
    fireworks: "assets/audio/effects/fireworks.mp3"
  };

  const finalVoiceMessages = [
    { path: "assets/audio/family/fatima.mp3", speaker: "Fatima" },
    { path: "assets/audio/family/abubakr.mp3", speaker: "Abu-Bakr" },
    { path: "assets/audio/family/zaynab.mp3", speaker: "Zaynab" }
  ];

  /**
   * The Phase 2 story. Each {{token}} maps to a blank with the same ID, so the
   * reusable Part 1 engine can render the full adventure without special cases.
   */
  const chapters = [
    {
      id: "birth-of-a-queen",
      number: 1,
      title: "The Birth of a Queen",
      subtitle: "Rawalpindi, 1957 — before the crown, but never before the chai.",
      theme: "royal",
      voice: { path: "assets/audio/family/fatima.mp3", speaker: "Fatima" },
      photo: {
        path: "assets/photos/najma-portrait.jpg",
        alt: "Queen Najma smiling warmly at the camera",
        caption: "The Queen at the heart of this story.",
        fit: "cover"
      },
      paragraphs: [
        "On August 1, 1957, in a village outside Rawalpindi, Pakistan, a baby named Najma arrived with bright eyes, a brave heart, and—according to family legend—the unmistakable air of someone who would one day know whether everyone had eaten.",
        "Years later, she would become Queen Najma Bhatti: wife of Khalid, mother of Ali, Yusuf, Anum and her daughter-in-law Rabia, and beloved grandmother to Fatima, Abu-Bakr, Zaynab, Layla, Adam, and Humza. But every great kingdom begins with one small decision. Young Najma's first royal instinct was to {{youngNajmaChoice}}.",
        "The village elders nodded. This child, they agreed, was destined to build a family held together by {{royalFoundation}}."
      ],
      blanks: [
        {
          id: "youngNajmaChoice",
          prompt: "What was young Najma's first royal instinct?",
          choices: [
            { id: "gather-family", label: "gather everyone close for a story", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The first royal court is called to order. Attendance is mandatory; snacks are strongly encouraged." },
            { id: "offer-kind-words", label: "offer three perfectly chosen kind words", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "Even as a baby, she apparently knew exactly what people needed to hear." },
            { id: "help-with-supper", label: "help prepare supper for the whole village", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "A bold choice for someone unable to reach the stove, but the spirit was there." },
            { id: "inspect-bangles", label: "inspect the village's finest bangles", scores: { receivingGifts: 4, amazonGift: 3 }, reaction: "Excellent sparkle. Strong craftsmanship. The royal quality inspection is complete." }
          ]
        },
        {
          id: "royalFoundation",
          prompt: "What held Queen Najma's growing kingdom together?",
          choices: [
            { id: "shared-time", label: "time spent side by side", scores: { qualityTime: 4, familyTime: 4 }, reaction: "A kingdom measured not in acres, but in long conversations and crowded rooms." },
            { id: "loving-words", label: "loving words remembered for years", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "Some words become family heirlooms without ever needing a box." },
            { id: "helping-hands", label: "a thousand quiet helping hands", scores: { actsOfService: 4, handmadeGift: 3 }, reaction: "The royal motto: if something needs doing, it has probably already been done." },
            { id: "warm-embraces", label: "warm embraces at every doorway", scores: { physicalTouch: 4, familyTime: 3 }, reaction: "No one enters or leaves the palace without paying the official hug tax." }
          ]
        }
      ],
      nextChapterId: "midnight-cookie-mission"
    },
    {
      id: "midnight-cookie-mission",
      number: 2,
      title: "The Midnight Cookie Mission",
      subtitle: "Two sleeping princes. One suspiciously empty cookie plate.",
      theme: "midnight",
      voice: { path: "assets/audio/family/abubakr.mp3", speaker: "Abu-Bakr" },
      photo: {
        path: "assets/photos/grandkids-couch.jpg",
        alt: "Queen Najma cuddling with her grandchildren under a blanket",
        caption: "A very cozy royal mission headquarters.",
        fit: "cover"
      },
      paragraphs: [
        "Many years later, the palace clock struck midnight. Young Ali and Yusuf lay in bed with their eyes squeezed shut, performing the least convincing sleep in royal history. From the kitchen came the unmistakable whisper of a cookie tin.",
        "Queen Najma stepped into the hallway. The boys became so still that even their blankets looked guilty. She decided the wisest move was to {{cookieInvestigation}}.",
        "A trail of crumbs led directly back to the royal bedroom. When the two princes were discovered, Queen Najma chose to {{cookieVerdict}}. Justice was served—with a small glass of milk."
      ],
      blanks: [
        {
          id: "cookieInvestigation",
          prompt: "How should Queen Najma investigate?",
          choices: [
            { id: "join-mission", label: "join the mission and split one cookie three ways", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The investigation immediately becomes a family meeting with excellent refreshments." },
            { id: "leave-note", label: "leave a note praising their impressive stealth", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "The note reads: ‘Excellent teamwork. Terrible crumb management.’" },
            { id: "prepare-milk", label: "quietly prepare milk before catching them", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "Even royal criminals should not eat cookies without proper hydration." },
            { id: "replace-tin", label: "order a grander cookie tin for tomorrow", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "A practical response. The new tin may require a more advanced security system." }
          ]
        },
        {
          id: "cookieVerdict",
          prompt: "What is the Queen's loving verdict?",
          choices: [
            { id: "group-hug", label: "sentence them both to one enormous hug", scores: { physicalTouch: 4, familyTime: 3 }, reaction: "The prisoners accept their sentence and request no appeal." },
            { id: "praise-brothers", label: "praise their brotherly teamwork", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "The teamwork receives full marks. The bedtime compliance receives further review." },
            { id: "clean-crumbs", label: "have everyone clean the evidence together", scores: { actsOfService: 4, familyTime: 3 }, reaction: "A fair ruling. Somehow Queen Najma still does the final inspection." },
            { id: "gift-cookie", label: "present each prince with one official cookie", scores: { receivingGifts: 4, amazonGift: 3 }, reaction: "The royal seal of approval is chocolate-chip shaped." }
          ]
        }
      ],
      nextChapterId: "what-wall-shirt"
    },
    {
      id: "what-wall-shirt",
      number: 3,
      title: "The Legendary ‘What Wall?’ Shirt",
      subtitle: "Fashion changes. Family legends only improve with age.",
      theme: "textile",
      voice: { path: "assets/audio/family/ali.mp3", speaker: "Ali" },
      photo: {
        path: "assets/photos/what-wall.jpg",
        alt: "Queen Najma wearing sunglasses and the legendary What Wall shirt",
        caption: "The legendary 'What Wall?' shirt... A sight that instantly sent Ali and Yusuf into uncontrollable laughter.",
        fit: "contain",
        interaction: "what-wall",
        prelude: [
          "It was 3:00 in the morning...",
          "Ali and Yusuf were secretly talking in the hallway...",
          "Then...",
          "...something emerged from the darkness."
        ]
      },
      paragraphs: [
        "There stood Queen Najma, magnificent and mysterious, wearing sunglasses and a shirt bearing two immortal words: ‘WHAT WALL?’ Ali and Yusuf collapsed into the kind of helpless laughter that becomes family history before breakfast.",
        "Queen Najma examined the shirt with the seriousness of a museum curator and decided to {{wallShirtResponse}}.",
        "The family agreed the legend deserved a future. The shirt would now {{shirtDestiny}}, ensuring that no wall—and certainly no fashion critic—could defeat it."
      ],
      blanks: [
        {
          id: "wallShirtResponse",
          prompt: "How should Queen Najma respond to the legendary shirt?",
          choices: [
            { id: "laugh-together", label: "laugh until the whole family joins in", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The joke travels through the palace faster than any official announcement." },
            { id: "royal-slogan", label: "declare it the official family slogan", scores: { wordsOfAffirmation: 4, digitalGift: 3 }, reaction: "The royal communications office immediately requests matching profile pictures." },
            { id: "protect-shirt", label: "carefully mend and protect the famous shirt", scores: { actsOfService: 4, handmadeGift: 4 }, reaction: "Future generations will study every stitch and remain equally confused." },
            { id: "matching-shirt", label: "find a matching royal edition", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "Two shirts. Zero walls. The kingdom may never recover." }
          ]
        },
        {
          id: "shirtDestiny",
          prompt: "What should become of the shirt?",
          choices: [
            { id: "family-photo", label: "star in the next great family photograph", scores: { qualityTime: 4, digitalGift: 3 }, reaction: "The photographer asks everyone to say ‘What wall?’ instead of ‘cheese.’" },
            { id: "displayed-note", label: "be framed beside a loving handwritten note", scores: { wordsOfAffirmation: 4, handmadeGift: 4 }, reaction: "At last, the shirt receives the gallery treatment it always believed it deserved." },
            { id: "party-shirt", label: "make one triumphant appearance at every party", scores: { physicalTouch: 3, familyTime: 4 }, reaction: "Guests are warned: the shirt may cause spontaneous hugs and storytelling." },
            { id: "matching-set", label: "inspire matching shirts for the entire family", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "The order is placed. The walls begin to worry." }
          ]
        }
      ],
      nextChapterId: "mount-volcano"
    },
    {
      id: "mount-volcano",
      number: 4,
      title: "Mount Volcano",
      subtitle: "Khalid says one tiny thing. The mountain clears its throat.",
      theme: "volcano",
      voice: { path: "assets/audio/family/khalid.mp3", speaker: "Khalid" },
      photo: {
        path: "assets/photos/rv-hammock.jpg",
        alt: "Queen Najma laughing in a hammock while Khalid stands nearby",
        caption: "A peaceful moment moments before the mountain clears its throat.",
        fit: "cover"
      },
      paragraphs: [
        "Every peaceful kingdom has one natural wonder. In the Bhatti realm, it was Mount Volcano—a majestic peak said to rumble whenever Khalid accidentally chose the exact wrong moment to ask a perfectly innocent question.",
        "On this particular evening, Khalid looked around the beautifully prepared table and asked, {{khalidQuestion}}. A spoon paused in midair. Somewhere, a bird changed direction.",
        "Queen Najma raised one royal eyebrow. The family launched the emergency peace plan: {{volcanoPlan}}. The mountain settled, Khalid smiled carefully, and dinner continued with great affection."
      ],
      blanks: [
        {
          id: "khalidQuestion",
          prompt: "What perfectly innocent question did Khalid ask?",
          choices: [
            { id: "enough-food", label: "‘We already have enough food.’", scores: { actsOfService: 4, familyTime: 2 }, reaction: "The mountain rumbles. Khalid immediately begins reviewing every life choice that led to this sentence." },
            { id: "new-recipe", label: "‘Did you try a new recipe?’", scores: { wordsOfAffirmation: 3, handmadeGift: 3 }, reaction: "Technically a compliment. Historically a risky delivery." },
            { id: "need-anything", label: "‘Do we need anything from the store?’", scores: { receivingGifts: 3, amazonGift: 4 }, reaction: "A generous question—asked approximately twelve minutes after the shopping trip." },
            { id: "sit-together", label: "‘Shall we all sit together now?’", scores: { qualityTime: 4, physicalTouch: 2, familyTime: 3 }, reaction: "A lovely idea. The timing committee will still be reviewing the application." }
          ]
        },
        {
          id: "volcanoPlan",
          prompt: "How does the family calm Mount Volcano?",
          choices: [
            { id: "chai-peace", label: "Ali and Yusuf arrive with peace-offering chai", scores: { actsOfService: 4, familyTime: 3 }, reaction: "The steam forms a tiny white flag. Diplomatic progress is immediate." },
            { id: "khalid-compliment", label: "Khalid delivers one very specific compliment", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "Well recovered, Khalid. The royal eyebrow lowers by three degrees." },
            { id: "family-embrace", label: "everyone forms a protective family embrace", scores: { physicalTouch: 4, familyTime: 4 }, reaction: "The volcano cannot erupt through this much affection." },
            { id: "surprise-parcel", label: "a perfectly timed surprise parcel appears", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "The delivery driver has unknowingly saved the kingdom." }
          ]
        }
      ],
      nextChapterId: "endless-food"
    },
    {
      id: "endless-food",
      number: 5,
      title: "The Kingdom of Endless Food",
      subtitle: "Where ‘I am full’ is treated as the beginning of negotiations.",
      theme: "feast",
      voice: { path: "assets/audio/family/yusuf.mp3", speaker: "Yusuf" },
      photo: {
        path: "assets/photos/hawaii-wave.jpg",
        alt: "Queen Najma waving warmly while wearing a flowered outfit",
        caption: "The royal hostess welcomes everyone—and insists they eat.",
        fit: "cover"
      },
      paragraphs: [
        "Queen Najma's dining table was not ordinary furniture. It was a portal through which biryani, curries, kebabs, roti, and mysterious extra dishes appeared whenever anyone claimed they were ‘just stopping by.’",
        "At the royal feast, Najma began by {{feastBeginning}}. Three courses later, every guest had gained ten pounds—nine from food and one from happiness.",
        "When the family insisted they could not eat another bite, Queen Najma announced the traditional next step: {{afterFeast}}. No one escaped hungry. No one truly wanted to."
      ],
      blanks: [
        {
          id: "feastBeginning",
          prompt: "How should the royal feast begin?",
          choices: [
            { id: "shared-biryani", label: "serving one enormous biryani for everyone to share", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The serving spoon requires two hands and a strong sense of purpose." },
            { id: "favorite-dishes", label: "making each person's favorite dish by hand", scores: { actsOfService: 4, handmadeGift: 4 }, reaction: "Every plate says, without words, ‘I remembered what you love.’" },
            { id: "sweet-compliments", label: "offering sweet words before sweet dishes", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "The compliments are generous. The dessert portions are even more so." },
            { id: "special-treat", label: "unwrapping a special treat for the table", scores: { receivingGifts: 4, amazonGift: 3 }, reaction: "Everyone claims they are too full, then studies the box with professional interest." }
          ]
        },
        {
          id: "afterFeast",
          prompt: "What happens after everyone gains ten pounds?",
          choices: [
            { id: "family-walk", label: "a slow family walk filled with stories", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The pace is gentle. The storytelling is competitive." },
            { id: "dish-team", label: "a full-family dishwashing operation", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "Queen Najma is politely removed from the kitchen. She supervises anyway." },
            { id: "thank-chef", label: "a round of applause for the royal chef", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "The applause is sincere. Requests for leftovers follow immediately." },
            { id: "stretchy-gift", label: "the ceremonial presentation of stretchy trousers", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "At last: a gift selected with foresight, compassion, and an adjustable waistband." }
          ]
        }
      ],
      nextChapterId: "crochet-forest"
    },
    {
      id: "crochet-forest",
      number: 6,
      title: "The Crochet Forest",
      subtitle: "Every loop holds patience; every blanket holds a story.",
      theme: "crochet",
      voice: { path: "assets/audio/family/zaynab.mp3", speaker: "Zaynab" },
      photo: {
        path: "assets/photos/hawaii-lookout.jpg",
        alt: "Queen Najma smiling at a scenic lookout",
        caption: "A little patience, a beautiful view, and enough love for the whole kingdom.",
        fit: "cover"
      },
      paragraphs: [
        "Beyond the palace grew a forest unlike any other. Its vines were yarn, its flowers were bright crocheted circles, and its branches carried blankets soft enough to make even the busiest traveler stop and rest.",
        "Queen Najma entered with her royal crochet hook and decided to create {{crochetCreation}}. With every loop, the forest grew warmer.",
        "When the final stitch was tied, she chose {{crochetRecipient}} as its first keeper. The gift needed no royal seal; everyone could see who had made it."
      ],
      blanks: [
        {
          id: "crochetCreation",
          prompt: "What should Queen Najma crochet?",
          choices: [
            { id: "story-blanket", label: "one enormous blanket for family story nights", scores: { qualityTime: 4, familyTime: 4 }, reaction: "There is room beneath it for everyone, although someone must bring the chai." },
            { id: "message-scarf", label: "a scarf stitched with a loving message", scores: { wordsOfAffirmation: 4, handmadeGift: 4 }, reaction: "The message is warm in every possible sense." },
            { id: "comfort-shawl", label: "a soft shawl for whoever needs comfort", scores: { actsOfService: 4, physicalTouch: 3 }, reaction: "It settles around the shoulders like a quiet royal hug." },
            { id: "yarn-crown", label: "a sparkling yarn crown for herself", scores: { receivingGifts: 4, amazonGift: 2 }, reaction: "Handmade royalty meets excellent accessorizing. The forest approves." }
          ]
        },
        {
          id: "crochetRecipient",
          prompt: "Who should receive the first treasure from the Crochet Forest?",
          choices: [
            { id: "all-grandkids", label: "all six grandchildren at once", scores: { physicalTouch: 4, familyTime: 4 }, reaction: "Fatima, Abu-Bakr, Zaynab, Layla, Adam, and Humza squeeze in. Somehow, it fits." },
            { id: "khalid-keepsake", label: "Khalid, with one affectionate instruction", scores: { wordsOfAffirmation: 4, handmadeGift: 3 }, reaction: "The instruction is simple: keep it safe, and do not ask whether it is finished." },
            { id: "busy-family", label: "the busiest person in the family", scores: { actsOfService: 4, digitalGift: 2 }, reaction: "A handmade reminder that even royal schedules should include rest." },
            { id: "queen-first", label: "Queen Najma herself, for once", scores: { receivingGifts: 4, amazonGift: 2 }, reaction: "The kingdom applauds this rare and excellent ruling." }
          ]
        }
      ],
      nextChapterId: "grandchildren-shopping"
    },
    {
      id: "grandchildren-shopping",
      number: 7,
      title: "The Grandchildren's Shopping Adventure",
      subtitle: "Six grandchildren, one Queen, and a cart with ambitious plans.",
      theme: "shopping",
      voice: { path: "assets/audio/family/zaynab.mp3", speaker: "Zaynab" },
      photo: {
        path: "assets/photos/family-mountain.jpg",
        alt: "Queen Najma surrounded by family during a mountain trip",
        caption: "The royal expedition team, assembled and ready.",
        fit: "cover"
      },
      paragraphs: [
        "One bright morning, Fatima, Abu-Bakr, Zaynab, Layla, Adam, and Humza assembled for the grandest expedition in family history: shopping with Queen Najma.",
        "The mission began calmly. This lasted fourteen seconds. One grandchild found toys, another found snacks, and someone—history remains discreet—asked whether they could buy the entire store. Queen Najma restored order by {{shoppingStrategy}}.",
        "At the final checkout, the grandchildren thanked their queen with {{grandkidsThanks}}. The cashier declared it the finest royal procession ever recorded on a receipt."
      ],
      blanks: [
        {
          id: "shoppingStrategy",
          prompt: "How should Queen Najma guide the shopping expedition?",
          choices: [
            { id: "choose-together", label: "letting everyone choose one treasure together", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The discussion takes forty minutes and becomes everyone's favorite part." },
            { id: "kind-clues", label: "giving each grandchild a kind little clue", scores: { wordsOfAffirmation: 4, digitalGift: 2 }, reaction: "Every clue somehow reveals exactly what makes that grandchild special." },
            { id: "carry-cart", label: "organizing bags, snacks, and the runaway cart", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "The expedition is saved by world-class grandmother logistics." },
            { id: "surprise-list", label: "consulting her secret surprise list", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "The list is accurate, color-coded, and apparently updated while everyone sleeps." }
          ]
        },
        {
          id: "grandkidsThanks",
          prompt: "How do the grandchildren thank Queen Najma?",
          choices: [
            { id: "grandkid-huddle", label: "a six-grandchild group hug", scores: { physicalTouch: 5, familyTime: 4 }, reaction: "Queen Najma disappears into the huddle and emerges smiling." },
            { id: "video-message", label: "a chorus of loving video messages", scores: { wordsOfAffirmation: 4, digitalGift: 4 }, reaction: "There are six messages, eleven retakes, and one unforgettable blooper." },
            { id: "carry-everything", label: "carrying every bag to the car", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "A true miracle: not one bag is mysteriously forgotten." },
            { id: "queen-surprise", label: "choosing one surprise just for her", scores: { receivingGifts: 4, amazonGift: 4 }, reaction: "For once, the Queen is not allowed to see the receipt." }
          ]
        }
      ],
      nextChapterId: "memory-mountain"
    },
    {
      id: "memory-mountain",
      number: 8,
      title: "The Memory Mountain",
      subtitle: "Hawaii, the RV road, Umrah—and every road that led home.",
      theme: "memory",
      voice: { path: "assets/audio/family/ali.mp3", speaker: "Ali" },
      photo: {
        path: "assets/photos/hawaii-ali-najma.jpg",
        alt: "Ali and Queen Najma smiling together beside the ocean in Hawaii",
        caption: "One journey, many stories, and a memory made together.",
        fit: "cover"
      },
      paragraphs: [
        "At the edge of the kingdom stood Memory Mountain. Its paths curved through bright days in Hawaii, miles of laughter on the RV trip, the deep peace of Umrah, and hundreds of ordinary family moments that had quietly become treasures.",
        "Queen Najma climbed with Khalid beside her and Ali, Yusuf, Rabia, and Anum close behind. The grandchildren carried the official expedition snacks. To light the path, the family chose to {{memoryLight}}.",
        "At the summit, one memory rose like a star: {{brightestMemory}}. Then all the other memories joined it, because a family story is never made from only one day."
      ],
      blanks: [
        {
          id: "memoryLight",
          prompt: "How should the family light the path up Memory Mountain?",
          choices: [
            { id: "tell-stories", label: "tell old stories all the way up", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The climb slows down as every story gains three new details." },
            { id: "record-voices", label: "record everyone's favorite memory", scores: { wordsOfAffirmation: 4, digitalGift: 4 }, reaction: "Future generations will hear every laugh—including the ones between sentences." },
            { id: "help-climb", label: "carry bags and help one another climb", scores: { actsOfService: 4, handmadeGift: 2 }, reaction: "No one reaches the summit alone, and no snack bag is left behind." },
            { id: "travel-keepsakes", label: "follow a trail of treasured keepsakes", scores: { receivingGifts: 4, amazonGift: 3 }, reaction: "Each small object opens a much larger story." }
          ]
        },
        {
          id: "brightestMemory",
          prompt: "Which kind of memory shines brightest?",
          choices: [
            { id: "hawaii-laughter", label: "laughter carried on the Hawaiian breeze", scores: { qualityTime: 4, familyTime: 4 }, reaction: "The mountain briefly smells like ocean air and sunscreen." },
            { id: "rv-kindness", label: "all the small kindnesses along the RV road", scores: { actsOfService: 4, handmadeGift: 3 }, reaction: "Every wrong turn looks better once it becomes a family story." },
            { id: "umrah-peace", label: "the love and peace remembered from Umrah", scores: { wordsOfAffirmation: 3, physicalTouch: 4 }, reaction: "For one quiet moment, the whole mountain seems to breathe with the family." },
            { id: "photo-collection", label: "the photographs that bring every trip home", scores: { receivingGifts: 3, digitalGift: 4 }, reaction: "A thousand moments return with one swipe—and several reminders to back up the photos." }
          ]
        }
      ],
      nextChapterId: "birthday-treasure"
    },
    {
      id: "birthday-treasure",
      number: 9,
      title: "The Birthday Treasure",
      subtitle: "The final chest can only be opened by the family who filled it.",
      theme: "treasure",
      voice: { path: "assets/audio/family/fatima.mp3", speaker: "Fatima" },
      photo: {
        path: "assets/photos/umrah-ali-najma.jpg",
        alt: "Ali and Queen Najma together near the Kaaba during Umrah",
        caption: "Faith, family, and memories carried close to the heart.",
        fit: "contain"
      },
      paragraphs: [
        "At the summit waited a treasure chest marked with sixty-nine tiny stars—one for every year since the Queen's story began outside Rawalpindi. Around it stood Khalid, Ali, Yusuf, Rabia, Anum, Fatima, Abu-Bakr, Zaynab, Layla, Adam, and Humza.",
        "The chest had no ordinary key. It opened only when the family chose to {{treasureKey}}.",
        "Golden light spilled across the mountain. Inside, Queen Najma found {{greatestTreasure}}. She looked at the family, and the family looked back. They had known the answer all along."
      ],
      blanks: [
        {
          id: "treasureKey",
          prompt: "What should open the birthday treasure?",
          choices: [
            { id: "hands-together", label: "place every hand on the lid together", scores: { qualityTime: 4, physicalTouch: 4, familyTime: 5 }, reaction: "Thirteen hands, one chest, and absolutely no agreement about who turned the key." },
            { id: "family-letter", label: "read a letter filled with everyone's loving words", scores: { wordsOfAffirmation: 5, digitalGift: 3 }, reaction: "The final sentence is difficult to read because the royal court has become suspiciously misty-eyed." },
            { id: "crochet-key", label: "use a key Queen Najma crocheted herself", scores: { actsOfService: 4, handmadeGift: 5 }, reaction: "Impossible by ordinary engineering. Completely reasonable by Queen Najma standards." },
            { id: "golden-parcel", label: "unwrap the small golden parcel beside it", scores: { receivingGifts: 5, amazonGift: 4 }, reaction: "The wrapping is opened carefully enough to be reused, as royal tradition requires." }
          ]
        },
        {
          id: "greatestTreasure",
          prompt: "What is the greatest birthday treasure?",
          choices: [
            { id: "whole-day", label: "one whole day with everyone she loves", scores: { qualityTime: 5, familyTime: 5 }, reaction: "The calendar clears itself. Even the clocks agree to slow down." },
            { id: "spoken-love", label: "every loving thing the family wants her to know", scores: { wordsOfAffirmation: 5, digitalGift: 4 }, reaction: "The words fill the chest, then the room, then every heart in the kingdom." },
            { id: "royal-rest", label: "a day when everyone cares for her", scores: { actsOfService: 5, handmadeGift: 4 }, reaction: "Queen Najma is officially forbidden from lifting so much as a teacup." },
            { id: "chosen-surprise", label: "one beautiful surprise chosen just for her", scores: { receivingGifts: 5, amazonGift: 5 }, reaction: "The treasure sparkles, but not quite as brightly as the Queen receiving it." }
          ]
        }
      ],
      nextChapterId: null
    }
  ];

  const defaultState = () => ({
    currentChapterId: chapters[0].id,
    answers: {},
    scores: createEmptyScores(),
    musicEnabled: true,
    volume: 0.2,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    memoryTokens: [],
    achievements: [],
    completed: false,
    started: false
  });

  const elements = {};
  let state = defaultState();
  let activeBlankId = null;
  let lastFocusedElement = null;
  let toastTimer = null;
  let audioUnavailable = false;
  let montageTimer = null;
  let montageIndex = 0;
  let montageComplete = null;
  let galleryIndex = 0;
  let galleryTouchStart = 0;
  let whatWallBubbleTimer = null;
  let deferredInstallPrompt = null;
  let musicFadeFrame = null;
  let backgroundIsDucked = false;
  let finalVoiceIndex = 0;
  const effectAudioCache = new Map();

  function createEmptyScores() {
    return [...LOVE_LANGUAGE_KEYS, ...GIFT_TYPE_KEYS].reduce((totals, key) => {
      totals[key] = 0;
      return totals;
    }, {});
  }

  function cacheElements() {
    [
      "welcome-screen", "story-screen", "results-screen", "resume-panel", "begin-button",
      "continue-saved-button", "start-over-button", "music-toggle", "motion-toggle",
      "story-card", "chapter-counter", "progress-percent", "progress-fill", "chapter-label",
      "chapter-title", "chapter-subtitle", "story-copy", "reaction-card", "photo-frame",
      "photo-prelude", "photo-action", "chapter-photo", "what-wall-bubble", "photo-placeholder", "photo-caption", "previous-button", "continue-button",
      "completion-hint", "restart-button", "choice-modal", "choice-modal-title",
      "choice-modal-description", "choice-list", "close-modal-button", "restart-modal",
      "cancel-restart-button", "confirm-restart-button", "replay-button", "view-gallery-button", "install-button", "print-button",
      "top-love-language", "top-gift-type", "recommendation-text", "love-results",
      "gift-results", "answers-list", "toast", "live-region", "background-audio",
      "welcome-confetti", "results-confetti", "volume-slider", "memory-shelf-title",
      "token-count", "token-row", "scene-effects", "voice-button", "voice-button-label",
      "family-audio", "result-token-row", "achievement-list", "gallery-section",
      "gallery-grid-button", "gallery-fullscreen-button", "gallery-stage", "gallery-image",
      "gallery-placeholder", "gallery-caption", "gallery-counter", "gallery-previous-button",
      "gallery-next-button", "gallery-grid", "memory-montage", "montage-title", "montage-frame", "montage-image",
      "montage-placeholder", "montage-caption", "montage-progress-fill", "skip-montage-button",
      "final-voice-panel", "final-voice-button", "final-voice-status", "final-voice-audio"
    ].forEach((id) => { elements[toCamelCase(id)] = document.getElementById(id); });
  }

  function toCamelCase(value) {
    return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== "object") return;
      const chapterExists = chapters.some((chapter) => chapter.id === saved.currentChapterId);
      state = {
        ...defaultState(),
        ...saved,
        currentChapterId: chapterExists ? saved.currentChapterId : chapters[0].id,
        answers: saved.answers && typeof saved.answers === "object" ? saved.answers : {},
        volume: Number.isFinite(saved.volume) ? Math.min(1, Math.max(0, saved.volume)) : 0.2,
        memoryTokens: Array.isArray(saved.memoryTokens) ? saved.memoryTokens.filter((id) => memoryTokens.some((token) => token.chapterId === id)) : [],
        achievements: Array.isArray(saved.achievements) ? saved.achievements : []
      };
      const allChaptersAnswered = chapters.every((chapter) => chapter.blanks.every((blank) => Boolean(state.answers[blank.id])));
      if (state.completed && allChaptersAnswered && state.memoryTokens.length === 0) {
        state.memoryTokens = chapters.map((chapter) => chapter.id);
      }
      state.scores = recalculateScores();
    } catch (error) {
      console.warn("Saved adventure data could not be read. Starting fresh.", error);
      state = defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Adventure progress could not be saved.", error);
      showToast("Progress cannot be saved in this browser mode.");
    }
  }

  function bindEvents() {
    elements.beginButton.addEventListener("click", beginAdventure);
    elements.continueSavedButton.addEventListener("click", resumeAdventure);
    elements.startOverButton.addEventListener("click", openRestartConfirmation);
    elements.previousButton.addEventListener("click", goToPreviousChapter);
    elements.continueButton.addEventListener("click", continueAdventure);
    elements.restartButton.addEventListener("click", openRestartConfirmation);
    elements.replayButton.addEventListener("click", openRestartConfirmation);
    elements.viewGalleryButton.addEventListener("click", viewFamilyGallery);
    elements.installButton.addEventListener("click", installApp);
    elements.printButton.addEventListener("click", () => window.print());
    elements.musicToggle.addEventListener("click", toggleMusic);
    elements.volumeSlider.addEventListener("input", updateVolume);
    elements.motionToggle.addEventListener("click", toggleReducedMotion);
    elements.photoAction.addEventListener("click", handleChapterPhotoAction);
    elements.voiceButton.addEventListener("click", toggleFamilyVoice);
    elements.familyAudio.addEventListener("canplay", handleFamilyVoiceReady);
    elements.familyAudio.addEventListener("ended", resetVoiceButton);
    elements.familyAudio.addEventListener("error", handleFamilyVoiceError);
    elements.familyAudio.addEventListener("play", () => duckBackgroundMusic(true));
    elements.familyAudio.addEventListener("pause", () => duckBackgroundMusic(false));
    elements.familyAudio.addEventListener("ended", () => duckBackgroundMusic(false));
    elements.closeModalButton.addEventListener("click", closeChoiceModal);
    elements.cancelRestartButton.addEventListener("click", closeRestartConfirmation);
    elements.confirmRestartButton.addEventListener("click", resetAdventure);
    elements.choiceModal.addEventListener("click", closeOnBackdrop);
    elements.restartModal.addEventListener("click", closeOnBackdrop);
    elements.backgroundAudio.addEventListener("error", handleAudioError);
    elements.skipMontageButton.addEventListener("click", finishMemoryMontage);
    elements.finalVoiceButton.addEventListener("click", startFinalVoiceSequence);
    elements.finalVoiceAudio.addEventListener("ended", advanceFinalVoiceSequence);
    elements.finalVoiceAudio.addEventListener("error", advanceFinalVoiceSequence);
    elements.galleryPreviousButton.addEventListener("click", () => changeGalleryPhoto(-1));
    elements.galleryNextButton.addEventListener("click", () => changeGalleryPhoto(1));
    elements.galleryGridButton.addEventListener("click", toggleGalleryGrid);
    elements.galleryFullscreenButton.addEventListener("click", toggleGalleryFullscreen);
    elements.galleryStage.addEventListener("keydown", handleGalleryKeydown);
    elements.galleryStage.addEventListener("touchstart", handleGalleryTouchStart, { passive: true });
    elements.galleryStage.addEventListener("touchend", handleGalleryTouchEnd, { passive: true });
    document.querySelector(".brand").addEventListener("click", (event) => {
      event.preventDefault();
      if (state.started) openRestartConfirmation();
    });
    document.addEventListener("keydown", handleGlobalKeydown);
    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
  }

  function initialize() {
    cacheElements();
    loadState();
    updateAchievements();
    bindEvents();
    applyPreferences();
    updateResumeOptions();
    renderTokenShelf();
    renderGalleryPhoto(0);
    updateInstallButton();
    registerServiceWorker();
    triggerConfetti("welcome", 28);
    triggerLanterns({ count: 10, target: elements.welcomeConfetti });

    if (state.completed) {
      elements.continueSavedButton.textContent = "View Birthday Results";
    }
  }

  function updateResumeOptions() {
    const hasSavedAdventure = state.started || state.completed || Object.keys(state.answers).length > 0;
    elements.resumePanel.hidden = !hasSavedAdventure;
    elements.beginButton.closest(".welcome-actions").hidden = hasSavedAdventure;
  }

  function showScreen(screenName) {
    const screens = {
      welcome: elements.welcomeScreen,
      story: elements.storyScreen,
      results: elements.resultsScreen
    };
    Object.entries(screens).forEach(([name, screen]) => {
      const isActive = name === screenName;
      screen.hidden = !isActive;
      screen.classList.toggle("is-active", isActive);
    });
  }

  function beginAdventure() {
    state.started = true;
    state.completed = false;
    state.currentChapterId = chapters[0].id;
    saveState();
    if (state.musicEnabled) startMusic();
    triggerConfetti("welcome", 45);
    goToChapter(state.currentChapterId, false);
  }

  function resumeAdventure() {
    state.started = true;
    if (state.musicEnabled) startMusic();
    if (state.completed) {
      showResults();
    } else {
      goToChapter(state.currentChapterId, false);
    }
  }

  function getChapter(id) {
    return chapters.find((chapter) => chapter.id === id);
  }

  function goToChapter(id, animate = true) {
    const chapter = getChapter(id);
    if (!chapter) {
      showToast("That chapter could not be found.");
      return;
    }

    const render = () => {
      state.currentChapterId = id;
      state.started = true;
      state.completed = false;
      saveState();
      showScreen("story");
      renderChapter(chapter);
      updateBackgroundMusicForContext();
      elements.storyCard.classList.remove("is-leaving");
      if (animate && !isReducedMotion()) {
        elements.storyCard.classList.add("is-entering");
        elements.storyCard.addEventListener("animationend", () => elements.storyCard.classList.remove("is-entering"), { once: true });
      }
      window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" });
      elements.chapterTitle.focus?.({ preventScroll: true });
    };

    if (animate && !isReducedMotion() && !elements.storyScreen.hidden) {
      triggerPageTurn();
      elements.storyCard.classList.add("is-leaving");
      window.setTimeout(render, 260);
    } else {
      render();
    }
  }

  function renderChapter(chapter) {
    const index = chapters.findIndex((item) => item.id === chapter.id);
    const progress = Math.round(((index + 1) / chapters.length) * 100);
    elements.chapterCounter.textContent = `Chapter ${chapter.number} of ${chapters.length}`;
    elements.progressPercent.textContent = `${progress}% complete`;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressFill.parentElement.setAttribute("aria-valuenow", String(progress));
    elements.chapterLabel.textContent = `Chapter ${numberWord(chapter.number)}`;
    elements.chapterTitle.textContent = chapter.title;
    elements.chapterSubtitle.textContent = chapter.subtitle;
    elements.storyCard.dataset.theme = chapter.theme || "royal";
    renderPhoto(chapter.photo);
    renderParagraphs(chapter);
    updateReaction(chapter);
    updateNavigation(chapter, index);
    renderTokenShelf();
    configureFamilyVoice(chapter);
    triggerSceneForChapter(chapter);
  }

  function numberWord(number) {
    return ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][number] || String(number);
  }

  function renderPhoto(photo) {
    if (!photo) {
      elements.photoFrame.hidden = true;
      return;
    }
    elements.photoFrame.hidden = false;
    elements.photoFrame.classList.toggle("is-what-wall", photo.interaction === "what-wall");
    elements.photoFrame.classList.remove("is-comic-active");
    elements.photoPrelude.replaceChildren();
    const hasPrelude = Array.isArray(photo.prelude) && photo.prelude.length > 0;
    elements.photoPrelude.hidden = !hasPrelude;
    if (hasPrelude) {
      photo.prelude.forEach((line, index) => {
        const text = document.createElement("p");
        text.textContent = line;
        text.style.setProperty("--prelude-index", index);
        elements.photoPrelude.append(text);
      });
    }
    elements.photoAction.disabled = photo.interaction !== "what-wall";
    elements.photoAction.classList.toggle("is-interactive", photo.interaction === "what-wall");
    elements.photoAction.setAttribute("aria-label", photo.interaction === "what-wall"
      ? "Reveal the What Wall joke"
      : photo.alt || "Chapter photograph");
    elements.whatWallBubble.hidden = true;
    elements.whatWallBubble.classList.remove("is-visible");
    elements.chapterPhoto.hidden = false;
    elements.photoPlaceholder.hidden = true;
    elements.chapterPhoto.alt = photo.alt || "Birthday story photograph";
    elements.chapterPhoto.loading = "lazy";
    elements.chapterPhoto.decoding = "async";
    elements.chapterPhoto.style.objectFit = photo.fit === "cover" ? "cover" : "contain";
    elements.photoCaption.textContent = photo.caption || "";
    elements.photoPlaceholder.setAttribute("aria-label", `${photo.alt || "Chapter photo"} — image not added yet`);
    elements.chapterPhoto.onerror = () => {
      elements.chapterPhoto.hidden = true;
      elements.photoPlaceholder.hidden = false;
    };
    elements.chapterPhoto.onload = () => {
      elements.chapterPhoto.hidden = false;
      elements.photoPlaceholder.hidden = true;
    };
    elements.chapterPhoto.src = photo.path;
  }

  function handleChapterPhotoAction() {
    const chapter = getChapter(state.currentChapterId);
    if (chapter?.photo?.interaction !== "what-wall") return;
    window.clearTimeout(whatWallBubbleTimer);
    elements.whatWallBubble.hidden = false;
    elements.whatWallBubble.classList.remove("is-visible");
    void elements.whatWallBubble.offsetWidth;
    elements.whatWallBubble.classList.add("is-visible");
    elements.photoFrame.classList.add("is-comic-active");
    if (!isReducedMotion()) triggerScreenShake();
    playSound("boing");
    elements.liveRegion.textContent = "WHAT WALL?! The legendary shirt strikes again.";
    whatWallBubbleTimer = window.setTimeout(() => {
      elements.whatWallBubble.classList.remove("is-visible");
      elements.photoFrame.classList.remove("is-comic-active");
      window.setTimeout(() => { elements.whatWallBubble.hidden = true; }, isReducedMotion() ? 0 : 180);
    }, 2000);
  }

  function renderParagraphs(chapter) {
    elements.storyCopy.replaceChildren();
    chapter.paragraphs.forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      const tokenPattern = /\{\{([a-zA-Z0-9_-]+)\}\}/g;
      let lastIndex = 0;
      let match;
      while ((match = tokenPattern.exec(paragraphText)) !== null) {
        paragraph.append(document.createTextNode(paragraphText.slice(lastIndex, match.index)));
        const blank = chapter.blanks.find((item) => item.id === match[1]);
        if (blank) paragraph.append(createBlankButton(blank));
        lastIndex = tokenPattern.lastIndex;
      }
      paragraph.append(document.createTextNode(paragraphText.slice(lastIndex)));
      elements.storyCopy.append(paragraph);
    });
  }

  function createBlankButton(blank) {
    const selectedChoice = getSelectedChoice(blank);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `interactive-blank${selectedChoice ? " is-answered" : ""}`;
    button.dataset.blankId = blank.id;
    button.textContent = selectedChoice ? selectedChoice.label : "Choose an answer";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-label", selectedChoice ? `Change answer: ${selectedChoice.label}` : blank.prompt);
    button.addEventListener("click", () => openChoiceModal(blank.id, button));
    return button;
  }

  function getSelectedChoice(blank) {
    const selectedId = state.answers[blank.id];
    return blank.choices.find((choice) => choice.id === selectedId) || null;
  }

  function updateReaction(chapter, preferredBlankId = null) {
    const ordered = preferredBlankId
      ? [...chapter.blanks.filter((blank) => blank.id === preferredBlankId), ...chapter.blanks.filter((blank) => blank.id !== preferredBlankId)]
      : [...chapter.blanks].reverse();
    const selected = ordered.map((blank) => getSelectedChoice(blank)).find(Boolean);
    elements.reactionCard.hidden = !selected;
    elements.reactionCard.textContent = selected ? `Royal reaction: ${selected.reaction}` : "";
  }

  function updateNavigation(chapter, chapterIndex) {
    const isComplete = chapter.blanks.every((blank) => Boolean(getSelectedChoice(blank)));
    elements.previousButton.disabled = chapterIndex === 0;
    elements.continueButton.disabled = !isComplete;
    elements.continueButton.innerHTML = chapter.nextChapterId ? "Continue <span aria-hidden=\"true\">→</span>" : "Reveal Results <span aria-hidden=\"true\">✦</span>";
    elements.completionHint.textContent = isComplete
      ? "Every royal blank is complete. The quest may continue!"
      : "Complete every royal blank to continue.";
  }

  function openChoiceModal(blankId, trigger) {
    const chapter = getChapter(state.currentChapterId);
    const blank = chapter?.blanks.find((item) => item.id === blankId);
    if (!blank) return;
    activeBlankId = blankId;
    lastFocusedElement = trigger || document.activeElement;
    elements.choiceModalTitle.textContent = blank.prompt;
    elements.choiceModalDescription.textContent = "Pick one answer. You may change this choice any time before continuing.";
    elements.choiceList.replaceChildren();
    const selectedId = state.answers[blankId];
    blank.choices.forEach((choice, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "choice-option";
      option.setAttribute("role", "radio");
      option.setAttribute("aria-checked", String(choice.id === selectedId));
      option.dataset.choiceId = choice.id;
      option.tabIndex = choice.id === selectedId || (!selectedId && index === 0) ? 0 : -1;
      const marker = document.createElement("span");
      marker.className = "choice-marker";
      marker.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.textContent = choice.label;
      option.append(marker, label);
      option.addEventListener("click", () => selectChoice(blank, choice));
      option.addEventListener("keydown", handleChoiceKeydown);
      elements.choiceList.append(option);
    });
    elements.choiceModal.hidden = false;
    document.body.style.overflow = "hidden";
    const currentOption = elements.choiceList.querySelector('[aria-checked="true"]') || elements.choiceList.querySelector(".choice-option");
    window.setTimeout(() => currentOption?.focus(), 30);
  }

  function selectChoice(blank, choice) {
    state.answers[blank.id] = choice.id;
    state.scores = recalculateScores();
    saveState();
    const chapter = getChapter(state.currentChapterId);
    renderParagraphs(chapter);
    updateReaction(chapter, blank.id);
    updateNavigation(chapter, chapters.findIndex((item) => item.id === chapter.id));
    elements.liveRegion.textContent = `${choice.label} selected. ${choice.reaction}`;
    showToast("Royal choice saved — you can change it anytime.");
    closeChoiceModal();
    updateAchievements();
    triggerSceneForChoice(choice);
  }

  function recalculateScores() {
    const totals = createEmptyScores();
    chapters.forEach((chapter) => {
      chapter.blanks.forEach((blank) => {
        const choice = getChoiceById(blank, state.answers[blank.id]);
        if (!choice) return;
        Object.entries(choice.scores || {}).forEach(([category, points]) => {
          if (Object.hasOwn(totals, category) && Number.isFinite(points)) totals[category] += points;
        });
      });
    });
    return totals;
  }

  function getChoiceById(blank, choiceId) {
    return blank.choices.find((choice) => choice.id === choiceId) || null;
  }

  function closeChoiceModal() {
    if (elements.choiceModal.hidden) return;
    elements.choiceModal.hidden = true;
    document.body.style.overflow = "";
    activeBlankId = null;
    lastFocusedElement?.focus();
  }

  function handleChoiceKeydown(event) {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const options = [...elements.choiceList.querySelectorAll(".choice-option")];
    const currentIndex = options.indexOf(event.currentTarget);
    let nextIndex = currentIndex;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (currentIndex + 1) % options.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (currentIndex - 1 + options.length) % options.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;
    options.forEach((option, index) => { option.tabIndex = index === nextIndex ? 0 : -1; });
    options[nextIndex].focus();
  }

  function continueAdventure() {
    const chapter = getChapter(state.currentChapterId);
    const allAnswered = chapter.blanks.every((blank) => Boolean(getSelectedChoice(blank)));
    if (!allAnswered) {
      showToast("Please complete every blank first.");
      return;
    }
    awardChapterToken(chapter);
    if (chapter.nextChapterId) goToChapter(chapter.nextChapterId);
    else completeAdventure();
  }

  function goToPreviousChapter() {
    const currentIndex = chapters.findIndex((chapter) => chapter.id === state.currentChapterId);
    if (currentIndex > 0) goToChapter(chapters[currentIndex - 1].id);
  }

  function completeAdventure() {
    state.completed = true;
    state.scores = recalculateScores();
    updateAchievements();
    saveState();
    showMemoryMontage(showResults);
  }

  function calculateResults() {
    const totals = recalculateScores();
    const rank = (keys) => {
      const sum = keys.reduce((total, key) => total + totals[key], 0);
      return keys
        .map((key, stableIndex) => ({
          key,
          label: CATEGORY_LABELS[key],
          score: totals[key],
          percentage: sum > 0 ? Math.round((totals[key] / sum) * 100) : 0,
          stableIndex
        }))
        .sort((a, b) => b.score - a.score || a.stableIndex - b.stableIndex);
    };
    return { totals, loveLanguages: rank(LOVE_LANGUAGE_KEYS), giftTypes: rank(GIFT_TYPE_KEYS) };
  }

  function showResults() {
    const results = calculateResults();
    showScreen("results");
    elements.topLoveLanguage.textContent = results.loveLanguages[0].label;
    elements.topGiftType.textContent = results.giftTypes[0].label;
    elements.recommendationText.textContent = buildRecommendation(results.loveLanguages[0].key, results.giftTypes[0].key);
    renderRanking(elements.loveResults, results.loveLanguages);
    renderRanking(elements.giftResults, results.giftTypes);
    renderAnswerSummary();
    renderResultKeepsakes();
    buildGalleryGrid();
    renderGalleryPhoto(galleryIndex);
    updateBackgroundMusicForContext(2200);
    triggerTreasureSequence();
    triggerConfetti("results", 90);
    window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" });
    elements.resultsTitle?.focus?.({ preventScroll: true });
  }

  function buildRecommendation(loveKey, giftKey) {
    const lovePhrases = {
      qualityTime: "unhurried time with the people she loves",
      wordsOfAffirmation: "heartfelt words that become treasured memories",
      actsOfService: "thoughtful help that lets her feel cared for",
      receivingGifts: "meaningful surprises chosen especially for her",
      physicalTouch: "the warmth of family affection and a very full house"
    };
    const giftPhrases = {
      familyTime: "plan time together with room for food, stories, laughter, and chai",
      handmadeGift: "make something personal from notes, photographs, yarn, or family memories",
      digitalGift: "create a polished digital keepsake filled with voices, videos, and photographs from near and far",
      amazonGift: "choose one well-matched surprise, wrap it beautifully, and make opening it a family occasion"
    };
    return `Dear Ali,\n\nThe Kingdom has spoken. Queen Najma's choices point most strongly toward ${lovePhrases[loveKey]}. For her birthday, ${giftPhrases[giftKey]}.\n\nBut the greatest treasure is not hidden in a chest. It is the family she built: Khalid beside her, you, Yusuf, Rabia, and Anum, and the six grandchildren whose lives carry her love forward. The best gift will remind her that every meal, journey, handmade stitch, laugh, and ordinary day has become part of your family's story.\n\nWith love,\nThe Kingdom`;
  }

  function renderRanking(container, ranking) {
    container.replaceChildren();
    ranking.forEach((item, index) => {
      const row = document.createElement("li");
      row.className = "score-item";
      const label = document.createElement("span");
      label.className = "score-label";
      label.textContent = `${index + 1}. ${item.label}`;
      const percentage = document.createElement("span");
      percentage.className = "score-percent";
      percentage.textContent = `${item.percentage}%`;
      const track = document.createElement("span");
      track.className = "score-track";
      track.setAttribute("aria-label", `${item.label}: ${item.percentage} percent of earned points`);
      const fill = document.createElement("span");
      fill.className = "score-fill";
      fill.style.width = `${item.percentage}%`;
      track.append(fill);
      row.append(label, percentage, track);
      container.append(row);
    });
  }

  function renderAnswerSummary() {
    elements.answersList.replaceChildren();
    chapters.forEach((chapter) => {
      chapter.blanks.forEach((blank) => {
        const choice = getSelectedChoice(blank);
        if (!choice) return;
        const item = document.createElement("li");
        const chapterLabel = document.createElement("strong");
        chapterLabel.textContent = `${chapter.number}. ${chapter.title}: `;
        item.append(chapterLabel, document.createTextNode(choice.label));
        elements.answersList.append(item);
      });
    });
  }

  function openRestartConfirmation() {
    lastFocusedElement = document.activeElement;
    elements.restartModal.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => elements.cancelRestartButton.focus(), 30);
  }

  function closeRestartConfirmation() {
    if (elements.restartModal.hidden) return;
    elements.restartModal.hidden = true;
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
  }

  function resetAdventure() {
    const preferences = { musicEnabled: state.musicEnabled, volume: state.volume, reducedMotion: state.reducedMotion };
    state = { ...defaultState(), ...preferences };
    elements.backgroundAudio.pause();
    elements.backgroundAudio.currentTime = 0;
    elements.familyAudio.pause();
    elements.familyAudio.removeAttribute("src");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Saved progress could not be cleared.", error);
    }
    saveState();
    closeRestartConfirmation();
    applyPreferences();
    updateResumeOptions();
    elements.continueSavedButton.textContent = "Continue Adventure";
    renderTokenShelf();
    showScreen("welcome");
    triggerConfetti("welcome", 32);
    window.scrollTo({ top: 0, behavior: "auto" });
    showToast("The adventure has been reset.");
  }

  function toggleMusic() {
    state.musicEnabled = !state.musicEnabled;
    saveState();
    if (state.musicEnabled && state.started) startMusic();
    else elements.backgroundAudio.pause();
    updateMusicControl();
    if (state.musicEnabled && !state.started) showToast("Music will begin after you start the adventure.");
  }

  async function startMusic() {
    if (audioUnavailable) return;
    window.cancelAnimationFrame(musicFadeFrame);
    elements.backgroundAudio.volume = 0;
    try {
      await elements.backgroundAudio.play();
      fadeBackgroundTo(getBackgroundMusicTarget(), 2000);
    } catch (error) {
      if (error?.name !== "NotAllowedError") handleAudioError();
    }
  }

  function handleAudioError() {
    if (audioUnavailable) return;
    audioUnavailable = true;
    elements.backgroundAudio.pause();
    if (state.musicEnabled) showToast("Add birthday-background.mp3 to enable music.");
  }

  function updateVolume(event) {
    state.volume = Math.min(1, Math.max(0, Number(event.target.value)));
    elements.familyAudio.volume = state.volume;
    elements.finalVoiceAudio.volume = state.volume;
    effectAudioCache.forEach((audio) => { audio.volume = state.volume * 0.7; });
    updateBackgroundMusicForContext(120);
    saveState();
  }

  function updateMusicControl() {
    elements.musicToggle.setAttribute("aria-pressed", String(state.musicEnabled));
    elements.musicToggle.setAttribute("aria-label", state.musicEnabled ? "Mute all optional sound" : "Turn optional sound on");
    elements.musicToggle.querySelector(".control-label").textContent = state.musicEnabled ? "Sound on" : "Sound off";
  }

  function toggleReducedMotion() {
    state.reducedMotion = !state.reducedMotion;
    saveState();
    applyPreferences();
    showToast(state.reducedMotion ? "Reduced motion is on." : "Full motion is on.");
  }

  function applyPreferences() {
    document.body.classList.toggle("reduce-motion", state.reducedMotion);
    elements.motionToggle.setAttribute("aria-pressed", String(state.reducedMotion));
    elements.motionToggle.setAttribute("aria-label", state.reducedMotion ? "Allow full motion" : "Reduce motion");
    elements.motionToggle.querySelector(".control-label").textContent = state.reducedMotion ? "Motion reduced" : "Motion on";
    elements.volumeSlider.value = String(state.volume);
    elements.familyAudio.volume = state.volume;
    elements.finalVoiceAudio.volume = state.volume;
    if (elements.backgroundAudio.paused) elements.backgroundAudio.volume = state.volume;
    updateMusicControl();
  }

  function isReducedMotion() {
    return state.reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getBackgroundMusicTarget() {
    if (!state.musicEnabled) return 0;
    let target = state.volume;
    if (!elements.memoryMontage.hidden) target = Math.min(1, state.volume * 1.35);
    else if (state.currentChapterId === "memory-mountain" && !state.completed) target = Math.min(1, state.volume * 1.12);
    else if (["midnight-cookie-mission", "mount-volcano", "grandchildren-shopping"].includes(state.currentChapterId) && !state.completed) target = state.volume * 0.72;
    else if (state.completed && !elements.resultsScreen.hidden) target = Math.min(1, state.volume * 1.08);
    if (backgroundIsDucked) target *= 0.25;
    return target;
  }

  function fadeBackgroundTo(target, duration = 450) {
    if (audioUnavailable || elements.backgroundAudio.paused) return;
    window.cancelAnimationFrame(musicFadeFrame);
    const startVolume = elements.backgroundAudio.volume;
    const safeTarget = Math.max(0, Math.min(1, target));
    const change = safeTarget - startVolume;
    const startTime = performance.now();
    const step = (now) => {
      const progress = duration <= 0 ? 1 : Math.min(1, (now - startTime) / duration);
      elements.backgroundAudio.volume = Math.max(0, Math.min(1, startVolume + (change * progress)));
      if (progress < 1) musicFadeFrame = window.requestAnimationFrame(step);
    };
    musicFadeFrame = window.requestAnimationFrame(step);
  }

  function updateBackgroundMusicForContext(duration = 650) {
    if (!state.musicEnabled) return;
    fadeBackgroundTo(getBackgroundMusicTarget(), duration);
  }

  function duckBackgroundMusic(shouldDuck) {
    backgroundIsDucked = shouldDuck;
    updateBackgroundMusicForContext(shouldDuck ? 320 : 700);
  }

  function awardChapterToken(chapter) {
    if (state.memoryTokens.includes(chapter.id)) return;
    state.memoryTokens.push(chapter.id);
    updateAchievements();
    saveState();
    renderTokenShelf();
    const token = memoryTokens.find((item) => item.chapterId === chapter.id);
    if (token) elements.liveRegion.textContent = `${token.label} memory token collected.`;
  }

  function renderTokenShelf() {
    if (!elements.tokenRow) return;
    elements.tokenRow.replaceChildren();
    memoryTokens.forEach((token) => {
      const collected = state.memoryTokens.includes(token.chapterId);
      const item = document.createElement("span");
      item.className = `memory-token${collected ? " is-collected" : " is-locked"}`;
      item.setAttribute("role", "img");
      item.setAttribute("aria-label", collected ? `${token.label} collected` : `${token.label} not yet collected`);
      item.title = collected ? token.label : "Complete this chapter to unlock";
      item.textContent = collected ? token.emoji : "◇";
      elements.tokenRow.append(item);
    });
    elements.tokenCount.textContent = `${state.memoryTokens.length} of ${memoryTokens.length} collected`;
  }

  function updateAchievements() {
    const earned = achievementDefinitions.filter((achievement) => achievement.test()).map((achievement) => achievement.id);
    if (earned.join("|") !== state.achievements.join("|")) {
      state.achievements = earned;
      saveState();
    }
  }

  function renderResultKeepsakes() {
    elements.resultTokenRow.replaceChildren();
    memoryTokens.forEach((token) => {
      if (!state.memoryTokens.includes(token.chapterId)) return;
      const item = document.createElement("span");
      item.className = "result-token";
      item.innerHTML = `<span aria-hidden="true">${token.emoji}</span><small>${token.label}</small>`;
      elements.resultTokenRow.append(item);
    });
    elements.achievementList.replaceChildren();
    achievementDefinitions.forEach((achievement) => {
      if (!state.achievements.includes(achievement.id)) return;
      const item = document.createElement("li");
      item.innerHTML = `<span aria-hidden="true">${achievement.emoji}</span><strong>${achievement.label}</strong>`;
      elements.achievementList.append(item);
    });
  }

  function configureFamilyVoice(chapter) {
    elements.familyAudio.pause();
    resetVoiceButton();
    elements.voiceButton.hidden = true;
    if (!chapter.voice) {
      elements.voiceButton.removeAttribute("data-audio-path");
      elements.familyAudio.removeAttribute("src");
      return;
    }
    elements.voiceButton.dataset.audioPath = chapter.voice.path;
    elements.voiceButton.dataset.speaker = chapter.voice.speaker;
    elements.voiceButtonLabel.textContent = `Play a message from ${chapter.voice.speaker}`;
    elements.voiceButton.setAttribute("aria-label", `Play a family voice message from ${chapter.voice.speaker}`);
    elements.familyAudio.dataset.path = chapter.voice.path;
    elements.familyAudio.src = chapter.voice.path;
    elements.familyAudio.load();
  }

  async function toggleFamilyVoice() {
    const path = elements.voiceButton.dataset.audioPath;
    if (!path) return;
    if (!elements.familyAudio.paused && elements.familyAudio.dataset.path === path) {
      elements.familyAudio.pause();
      resetVoiceButton();
      return;
    }
    elements.familyAudio.volume = state.volume;
    try {
      await elements.familyAudio.play();
      elements.voiceButton.classList.add("is-playing");
      elements.voiceButton.querySelector(".voice-icon").textContent = "❚❚";
      elements.voiceButtonLabel.textContent = `Pause ${elements.voiceButton.dataset.speaker}'s message`;
    } catch (error) {
      handleFamilyVoiceError();
    }
  }

  function resetVoiceButton() {
    elements.voiceButton?.classList.remove("is-playing");
    const icon = elements.voiceButton?.querySelector(".voice-icon");
    if (icon) icon.textContent = "▶";
    if (elements.voiceButton?.dataset.speaker) {
      elements.voiceButtonLabel.textContent = `Play a message from ${elements.voiceButton.dataset.speaker}`;
    }
  }

  function handleFamilyVoiceReady() {
    if (elements.familyAudio.dataset.path === elements.voiceButton.dataset.audioPath) {
      elements.voiceButton.hidden = false;
    }
  }

  function handleFamilyVoiceError() {
    elements.familyAudio.pause();
    elements.voiceButton.hidden = true;
    resetVoiceButton();
  }

  function showMemoryMontage(onComplete) {
    if (isReducedMotion() || galleryPhotos.length === 0) {
      montageComplete = onComplete;
      elements.memoryMontage.hidden = false;
      document.body.style.overflow = "hidden";
      showFinalVoiceMessages();
      return;
    }
    montageComplete = onComplete;
    montageIndex = 0;
    finalVoiceIndex = 0;
    elements.montageTitle.textContent = "A Life Filled With Beautiful Memories";
    elements.montageFrame.hidden = false;
    elements.finalVoicePanel.hidden = true;
    elements.finalVoiceButton.hidden = false;
    elements.finalVoiceButton.disabled = false;
    elements.finalVoiceButton.textContent = "Play Family Messages";
    elements.skipMontageButton.textContent = "Skip to Results";
    elements.memoryMontage.hidden = false;
    document.body.style.overflow = "hidden";
    updateBackgroundMusicForContext(1200);
    renderMontagePhoto();
    elements.skipMontageButton.focus();
    montageTimer = window.setInterval(() => {
      montageIndex += 1;
      if (montageIndex >= galleryPhotos.length) showFinalVoiceMessages();
      else renderMontagePhoto();
    }, 2200);
  }

  function renderMontagePhoto() {
    const photo = galleryPhotos[montageIndex];
    elements.montagePlaceholder.hidden = true;
    elements.montageImage.hidden = false;
    elements.montageImage.classList.remove("is-revealing");
    elements.montageImage.alt = photo.alt;
    elements.montageCaption.textContent = photo.caption;
    elements.montageImage.onerror = () => {
      elements.montageImage.hidden = true;
      elements.montagePlaceholder.hidden = false;
    };
    elements.montageImage.onload = () => {
      elements.montageImage.hidden = false;
      elements.montagePlaceholder.hidden = true;
      elements.montageImage.classList.add("is-revealing");
    };
    elements.montageImage.src = photo.path;
    elements.montageProgressFill.style.width = `${((montageIndex + 1) / galleryPhotos.length) * 100}%`;
  }

  function finishMemoryMontage() {
    if (elements.memoryMontage.hidden) return;
    window.clearInterval(montageTimer);
    montageTimer = null;
    elements.finalVoiceAudio.pause();
    elements.finalVoiceAudio.removeAttribute("src");
    duckBackgroundMusic(false);
    elements.memoryMontage.hidden = true;
    document.body.style.overflow = "";
    const callback = montageComplete;
    montageComplete = null;
    updateBackgroundMusicForContext(2400);
    callback?.();
  }

  function showFinalVoiceMessages() {
    window.clearInterval(montageTimer);
    montageTimer = null;
    elements.montageTitle.textContent = "Voices From Her Family";
    elements.montageFrame.hidden = true;
    elements.finalVoicePanel.hidden = false;
    elements.finalVoiceButton.hidden = false;
    elements.finalVoiceButton.disabled = false;
    elements.finalVoiceButton.textContent = "Play Family Messages";
    elements.montageProgressFill.style.width = "100%";
    elements.skipMontageButton.textContent = "Continue to Birthday Letter";
    elements.finalVoiceStatus.textContent = "Three birthday messages are waiting for Queen Najma.";
    elements.finalVoiceButton.focus();
  }

  async function startFinalVoiceSequence() {
    finalVoiceIndex = 0;
    elements.finalVoiceButton.disabled = true;
    elements.finalVoiceButton.textContent = "Playing Family Messages…";
    await playFinalVoiceMessage();
  }

  async function playFinalVoiceMessage() {
    const message = finalVoiceMessages[finalVoiceIndex];
    if (!message) {
      elements.finalVoiceStatus.textContent = "Every message was delivered with love.";
      elements.finalVoiceButton.hidden = true;
      duckBackgroundMusic(false);
      elements.skipMontageButton.focus();
      return;
    }
    elements.finalVoiceStatus.textContent = `A birthday message from ${message.speaker}`;
    elements.finalVoiceAudio.src = message.path;
    elements.finalVoiceAudio.volume = state.volume;
    duckBackgroundMusic(true);
    try {
      await elements.finalVoiceAudio.play();
    } catch (error) {
      advanceFinalVoiceSequence();
    }
  }

  function advanceFinalVoiceSequence() {
    finalVoiceIndex += 1;
    playFinalVoiceMessage();
  }

  function renderGalleryPhoto(index) {
    galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
    const photo = galleryPhotos[galleryIndex];
    elements.galleryPlaceholder.hidden = true;
    elements.galleryImage.hidden = false;
    elements.galleryImage.alt = photo.alt;
    elements.galleryCaption.textContent = photo.caption;
    elements.galleryCounter.textContent = `${galleryIndex + 1} / ${galleryPhotos.length}`;
    elements.galleryImage.onerror = () => {
      elements.galleryImage.hidden = true;
      elements.galleryPlaceholder.hidden = false;
    };
    elements.galleryImage.onload = () => {
      elements.galleryImage.hidden = false;
      elements.galleryPlaceholder.hidden = true;
    };
    elements.galleryImage.src = photo.path;
  }

  function changeGalleryPhoto(direction) {
    renderGalleryPhoto(galleryIndex + direction);
    triggerSparkles({ count: 6, target: elements.galleryStage });
  }

  function buildGalleryGrid() {
    if (elements.galleryGrid.childElementCount) return;
    galleryPhotos.forEach((photo, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-thumb";
      button.setAttribute("aria-label", `View photograph ${index + 1}: ${photo.caption}`);
      const image = document.createElement("img");
      image.src = photo.path;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        image.hidden = true;
        button.classList.add("is-missing");
      });
      const caption = document.createElement("span");
      caption.textContent = photo.caption;
      button.append(image, caption);
      button.addEventListener("click", () => {
        renderGalleryPhoto(index);
        toggleGalleryGrid(false);
        elements.galleryStage.focus();
      });
      elements.galleryGrid.append(button);
    });
  }

  function toggleGalleryGrid(force) {
    const showGrid = typeof force === "boolean" ? force : elements.galleryGrid.hidden;
    elements.galleryGrid.hidden = !showGrid;
    elements.galleryStage.hidden = showGrid;
    elements.galleryGridButton.setAttribute("aria-pressed", String(showGrid));
    elements.galleryGridButton.textContent = showGrid ? "Slideshow" : "Grid";
  }

  async function toggleGalleryFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (elements.gallerySection.requestFullscreen) await elements.gallerySection.requestFullscreen();
      else showToast("Fullscreen is not available in this browser.");
    } catch (error) {
      showToast("Fullscreen could not be opened.");
    }
  }

  function handleGalleryKeydown(event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); changeGalleryPhoto(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); changeGalleryPhoto(1); }
  }

  function handleGalleryTouchStart(event) {
    galleryTouchStart = event.changedTouches[0]?.clientX || 0;
  }

  function handleGalleryTouchEnd(event) {
    const distance = (event.changedTouches[0]?.clientX || 0) - galleryTouchStart;
    if (Math.abs(distance) > 45) changeGalleryPhoto(distance > 0 ? -1 : 1);
  }

  function viewFamilyGallery() {
    elements.gallerySection.scrollIntoView({ behavior: isReducedMotion() ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => elements.gallerySection.focus({ preventScroll: true }), isReducedMotion() ? 0 : 500);
  }

  function captureInstallPrompt(event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallButton();
  }

  function isIOSInstallAvailable() {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    return isIOS && !isStandalone;
  }

  function updateInstallButton() {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    elements.installButton.hidden = isStandalone || (!deferredInstallPrompt && !isIOSInstallAvailable());
  }

  async function installApp() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      updateInstallButton();
      return;
    }
    if (isIOSInstallAvailable()) {
      showToast("In Safari, tap Share, then Add to Home Screen.");
    }
  }

  function handleAppInstalled() {
    deferredInstallPrompt = null;
    updateInstallButton();
    showToast("Birthday Adventure installed. The royal app is ready!");
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || !["https:", "http:"].includes(window.location.protocol)) return;
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("./service-worker.js");
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              showToast("A new royal edition is ready. Reopen the app to update.");
            }
          });
        });
      } catch (error) {
        console.warn("Offline support could not be enabled in this browser.", error);
      }
    }, { once: true });
  }

  function emitSceneParticles({ glyphs, count = 12, className = "sparkle", target = elements.sceneEffects, duration = 2400 }) {
    if (isReducedMotion() || !target) return;
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      particle.className = `scene-particle ${className}`;
      particle.textContent = glyphs[index % glyphs.length];
      particle.style.setProperty("--particle-x", `${5 + Math.random() * 90}%`);
      particle.style.setProperty("--particle-delay", `${Math.random() * 0.7}s`);
      particle.style.setProperty("--particle-drift", `${-50 + Math.random() * 100}px`);
      particle.style.setProperty("--particle-duration", `${duration / 1000}s`);
      target.append(particle);
      window.setTimeout(() => particle.remove(), duration + 1000);
    }
  }

  function triggerSceneForChapter(chapter) {
    elements.sceneEffects.replaceChildren();
    if (chapter.id === "midnight-cookie-mission") triggerCookieRain();
    if (chapter.id === "crochet-forest") triggerCrochet();
    if (chapter.id === "grandchildren-shopping") triggerShopping();
    if (chapter.id === "memory-mountain") triggerLanterns();
    if (chapter.id === "birthday-treasure") triggerFloatingHearts();
    const chapterText = `${chapter.subtitle} ${chapter.paragraphs.join(" ")}`;
    if (/chai/i.test(chapterText)) triggerTeaSteam();
  }

  function triggerSceneForChoice(choice) {
    if (choice.id === "enough-food") triggerVolcano();
    if (/chai/i.test(`${choice.label} ${choice.reaction}`)) triggerTeaSteam();
    if (/gift|parcel|surprise|unwrap/i.test(`${choice.label} ${choice.reaction}`)) triggerGiftExplosion({ count: 12 });
  }

  function triggerVolcano(options = {}) {
    triggerScreenShake();
    document.body.classList.add("volcano-glow");
    emitSceneParticles({ glyphs: ["●", "▲", "☁"], count: options.count || 20, className: "lava-particle", duration: 2800 });
    playSound("volcano");
    window.setTimeout(() => document.body.classList.remove("volcano-glow"), 2800);
  }

  function triggerCookieRain(options = {}) {
    emitSceneParticles({ glyphs: ["🍪", "✦", "🥛"], count: options.count || 16, className: "cookie-particle", duration: 3800 });
    playSound("cookies");
  }

  function triggerTeaSteam(options = {}) {
    document.body.classList.add("chai-warmth");
    emitSceneParticles({ glyphs: ["∿", "☕", "~"], count: options.count || 9, className: "steam-particle", duration: 3000 });
    playSound("chai");
    window.setTimeout(() => document.body.classList.remove("chai-warmth"), 3000);
  }

  function triggerFireworks(options = {}) {
    emitSceneParticles({ glyphs: ["✦", "✧", "★"], count: options.count || 28, className: "firework-particle", target: options.target || elements.resultsConfetti, duration: 3500 });
    playSound("fireworks");
  }

  function triggerSparkles(options = {}) {
    emitSceneParticles({ glyphs: ["✦", "·", "✧"], count: options.count || 14, className: "sparkle-particle", target: options.target || elements.sceneEffects, duration: 2200 });
  }

  function triggerPageTurn() {
    if (isReducedMotion()) return;
    elements.storyCard.classList.add("is-page-turning");
    playSound("pageTurn");
    window.setTimeout(() => elements.storyCard.classList.remove("is-page-turning"), 700);
  }

  function triggerLanterns(options = {}) {
    emitSceneParticles({ glyphs: ["✦", "◆", "✧"], count: options.count || 12, className: "lantern-particle", target: options.target || elements.sceneEffects, duration: 5000 });
  }

  function triggerFloatingHearts(options = {}) {
    emitSceneParticles({ glyphs: ["♥", "♡", "✦"], count: options.count || 14, className: "heart-particle", duration: 3600 });
  }

  function triggerGiftExplosion(options = {}) {
    emitSceneParticles({ glyphs: ["◆", "✦", "▰"], count: options.count || 20, className: "gift-particle", target: options.target || elements.sceneEffects, duration: 2800 });
  }

  function triggerCrochet(options = {}) {
    emitSceneParticles({ glyphs: ["🧶", "⌁", "✦"], count: options.count || 10, className: "yarn-particle", duration: 4400 });
    playSound("crochet");
  }

  function triggerShopping(options = {}) {
    emitSceneParticles({ glyphs: ["🛍️", "✦", "◆"], count: options.count || 10, className: "shopping-particle", duration: 3200 });
    playSound("shopping");
  }

  function triggerTreasureSequence() {
    if (isReducedMotion()) {
      triggerFireworks({ count: 12 });
      return;
    }
    elements.resultsScreen.classList.add("is-treasure-reveal");
    document.body.classList.add("treasure-dim");
    playSound("treasure");
    window.setTimeout(() => {
      document.body.classList.remove("treasure-dim");
      triggerGiftExplosion({ count: 26, target: elements.resultsConfetti });
      triggerFireworks({ count: 34 });
    }, 1200);
    window.setTimeout(() => elements.resultsScreen.classList.remove("is-treasure-reveal"), 4200);
  }

  function triggerConfetti(target = "results", amount = 60) {
    if (isReducedMotion()) return;
    const layer = target === "welcome" ? elements.welcomeConfetti : elements.resultsConfetti;
    if (!layer) return;
    layer.replaceChildren();
    const colors = ["#f3d78a", "#e7655b", "#39a69d", "#d94f8a", "#ffffff"];
    for (let index = 0; index < amount; index += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty("--confetti-color", colors[index % colors.length]);
      piece.style.setProperty("--fall-duration", `${2.5 + Math.random() * 3}s`);
      piece.style.setProperty("--fall-delay", `${Math.random() * 1.5}s`);
      piece.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
      piece.style.transform = `rotate(${Math.random() * 180}deg)`;
      layer.append(piece);
    }
    window.setTimeout(() => layer.replaceChildren(), 7000);
  }

  function triggerScreenShake() {
    if (isReducedMotion()) return;
    document.body.classList.remove("screen-shake");
    void document.body.offsetWidth;
    document.body.classList.add("screen-shake");
    document.body.addEventListener("animationend", () => document.body.classList.remove("screen-shake"), { once: true });
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 3200);
  }

  function playSound(name) {
    if (name === "background") {
      startMusic();
      return;
    }
    if (!state.musicEnabled || !soundPaths[name]) return;
    let audio = effectAudioCache.get(name);
    if (!audio) {
      audio = new Audio(soundPaths[name]);
      audio.preload = "none";
      effectAudioCache.set(name, audio);
    }
    audio.volume = state.volume * 0.7;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    if (event.currentTarget === elements.choiceModal) closeChoiceModal();
    if (event.currentTarget === elements.restartModal) closeRestartConfirmation();
  }

  function handleGlobalKeydown(event) {
    const openModal = !elements.choiceModal.hidden
      ? elements.choiceModal
      : (!elements.restartModal.hidden ? elements.restartModal : (!elements.memoryMontage.hidden ? elements.memoryMontage : null));
    if (!openModal) return;
    if (event.key === "Escape") {
      if (openModal === elements.choiceModal) closeChoiceModal();
      else if (openModal === elements.restartModal) closeRestartConfirmation();
      else finishMemoryMontage();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...openModal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Small, deliberate public API for reusable Phase 3 scenes and future chapters.
  window.BirthdayQuest = Object.freeze({
    triggerConfetti,
    triggerScreenShake,
    showToast,
    playSound,
    triggerVolcano,
    triggerCookieRain,
    triggerTeaSteam,
    triggerFireworks,
    triggerSparkles,
    triggerPageTurn,
    triggerLanterns,
    triggerFloatingHearts,
    triggerGiftExplosion,
    triggerCrochet,
    triggerShopping,
    goToChapter,
    calculateResults,
    resetAdventure
  });

  document.addEventListener("DOMContentLoaded", initialize);
})();
