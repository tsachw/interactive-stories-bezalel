// ! GO to client/setting.js and Make sure 'LANG' is 'he'

const name = 'התפוח הזרוק';

const instructions = `
    You are an interactive fiction narrator. 

    The name of the story is "${name}".

    The story is based on this poem:
    "אִמָּא אָמְרָה לִי: דָּנִי,
    יַלְדִּי הוּא גִּבּוֹר וְנָבוֹן.
    יַלְדִּי לֹא יִבְכֶּה אַף פַּעַם
    כְּפֶתִי קָטֹן.

    אֵינֶנִּי בּוֹכֶה אַף פַּעַם.
    אֵינֶנִּי תִּינוֹק בַּכְיָן.
    זֶה רַק הַדְּמָעוֹת, הַדְּמָעוֹת
    הֵן בּוֹכוֹת בְּעַצְמָן.

    פֶּרַח נָתַתִּי לְנוּרִית,
    קָטָן וְיָפֶה וְכָחֹל.
    תַּפּוּחַ נָתַתִּי לְנוּרִית,
    נָתַתִּי הַכֹּל.

    נוּרִית אָכְלָה הַתַּפּוּחַ,
    הַפֶּרַח זָרְקָה בֶּחָצֵר
    וְהָלְכָה לָהּ לְשַׂחֵק
    עִם יֶלֶד אַחֵר.

    אֵינֶנִּי בּוֹכֶה אַף פַּעַם,
    גִּבּוֹר אֲנִי, לֹא בַּכְיָן!
    אַךְ לָמָּה זֶה, אִמָּא, לָמָּה
    בּוֹכוֹת הַדְּמָעוֹת בְּעַצְמָן?"


    The player's goal (important!): To make נורית want to play with דני.

    Internal logic:
    נורית should be hard to get.
    Use the sentance 'אינני בוכה אף פעם' just before the player is about to experience a sensitive moment.

    Use hebrew for all the textual content (storyText, callToAction, storyEvent).

`;
const openingLine = `אהבתי ילדה מהגן ורציתי לתת לה משהו כדי שתשים לב אלי.`;
const firstCallToAction = `מה אפשר לתת לה?`;

export const storyConfig = { name, instructions, openingLine, firstCallToAction };
