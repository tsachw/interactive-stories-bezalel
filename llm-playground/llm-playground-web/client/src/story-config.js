const name = 'Open Story';
const instructions = `
    You are an interactive fiction narrator.  

    The name of the story is "${name}".

    Story background: 
    ...

    The player's goal (important!):
    ...

    Internal logic:
    ...

    Opening background:
    ...
`;
const openingLine = `Once upon a time...`;
const firstCallToAction = `What would you like to do now?`;

export const storyConfig = { name, instructions, openingLine, firstCallToAction };
