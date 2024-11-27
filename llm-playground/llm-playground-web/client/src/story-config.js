/**
 * See OpenAI docs: https://platform.openai.com/docs/guides/structured-outputs#supported-schemas
 * See JSON Schema docs: https://json-schema.org/understanding-json-schema
 */
export const responseSchema = {
    name: 'story_schema',
    strict: true,
    schema: {
        type: 'object',
        properties: {
            storyText: {
                type: 'string',
                description: `
                    The story text to present to the player.
                    Word count limitation is 20. It might change by a system message.
                `,
            },
            callToAction: {
                type: 'string',
                description: `
                    Call-to-action or a hint for the player on what to do next. 
                    Use a suggestive tone (e.g. start with "You can ..." or "You might ..."). 
                    Do not suggest passive actions.
                    Enclose it with round brackets "(<callToAction)".
                    Word count limitation is always 10.

                `,
            },
            storyEvent: {
                type: 'string',
                description: `
                    Additional story event that happens regardless of the player's input in order to push the story forward. 
                    It migh be poetic, it might be surprising, or even very dramatic.
                    Word count limitation is 50.
                `,
            },
            goalProgress: {
                type: 'number',
                description:
                    'float between 0 and 1. It represents how close is the player to reach his goal. 0 means not at all, 1 means the goal is achieved.',
            },
            playerEngagement: {
                type: 'number',
                description: 'float between 0 and 1, where 0 is bored and 1 is excited.',
            },
            playerSentiment: {
                type: ['array', 'null'],
                description:
                    "Array of strings describing the player's emotional state, or null if it's not clear enough.",
                items: {
                    type: 'string',
                    enum: ['joy', 'irritation', 'sadness', 'fear', 'surprise', 'disgust', 'empathy'],
                },
            },
        },
        required: ['storyText', 'callToAction', 'storyEvent', 'goalProgress', 'playerEngagement', 'playerSentiment'],
        additionalProperties: false,
    },
};

export const STORY_CONFIG_DEV = {
    name: 'Dev Story',
    temperature: 1, // 0: deterministic <-> 2: random
    instructions: `
        You are an interactive fiction narrator. 
        Craft vivid sentences that empower players to make choices and fuel their creativity, but keep them under the word count limitations.
        
        The player has to find out how the lake was colored pink.
        Invent a hero. He should be witty.
    `,
    openingLine: `The lake water are pink.`,
    callToAction: 'Why?',
};
export const STORY_CONFIG_1 = {
    name: 'Shadows of the Kaminka Family',
    instructions: `
        You are an interactive fiction narrator. 
        Craft vivid sentences that empower players to make choices and fuel their creativity. 
  
        Base your output on the following backstory:
        "The hero of the story is Yehuda Kaminka.
        The Kaminka family consists of Naomi (Yehuda's institutionalized wife), and the couple's adult children (Tsvi, Asa, and Ya'el). 
        Each of the children's lives is fraught with peril: 
        Asa, a university lecturer in Jerusalem, is caught in a sexless marriage with the aspiring writer Dina, 
        Tsvi spends his days in Tel Aviv lamenting over his relationship with his father and using his middle-aged homosexual lover,
        Ya'el, the couple's daughter, is married to a widely disliked lawyer.
        Five years ago Yehuda was attacked at knifepoint by his wife.
        Now Yehdua is living in the United States with Jessica, his lover.
        The story is told from a third-person point of view and explores themes of unfulfilled romance, Jewish diaspora, social crises, and generational estrangement.",

        The player's goal is to find about the event that triggered Yehuda to leave his wife five years ago, hence the fact of her attack should remain a secret unless the player uses on of the following key words:
        "attack", "kitchen", "knife".
        The player must win Yehuda's trust and empathy, otherwise Yehuda will not reveal his full story.
        Once the secret has been revealed, the story should come to an end and you should stop asking the player for actions.

        The game begins when Yehuda returns to Israel from the United States in order to divorce his wife, who is hospitalized in an institution for the mentally ill.
        Yehuda sits in a cab with the player who is a stranger who Yehuda met at the airport. It's raining outside
    `,
    openingLine: `Here, in the backseat, You find yourself accompanying a man called Yehuda, returning from the distant shores of the United States. You're wondering what's his story.`,
    callToAction: 'What would you like to do now?',
};

/*
From OpenAI prompt engineering documentation:

Inner monologue is a tactic that can be used to mitigate this. The idea of inner monologue is to instruct the model to put parts of the output that are meant to be hidden from the user into a structured format that makes parsing them easy. Then before presenting the output to the user, the output is parsed and only part of the output is made visible.
`Enclose all your work for this step within triple quotes (""").`
*/
