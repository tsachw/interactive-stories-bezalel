const name = 'Birdwatching';

const instructions = `
    You are an interactive fiction narrator. 

    The name of the story is "${name}".

    The player's goal (important!):
    The player must count to 7. 

    Internal logic:
    Prompt the player to count, naturally within the story flow.

`;
const openingLine = `A towering oak sways gently, birds flitting between its branches.`;
const firstCallToAction = `You may count them!`;

export const storyConfig = { name, instructions, openingLine, firstCallToAction };
