import STORY_CONFIG from './src/story-data/story-1';

export const SETTINGS = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080',
    STORY_CONFIG,
};
