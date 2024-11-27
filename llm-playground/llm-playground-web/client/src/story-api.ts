import { SETTINGS } from '../settings';
import { responseSchema, STORY_CONFIG_DEV } from './story-config';

type Message = {
    role: 'system' | 'assistant' | 'user'
    content: string
}

export function postMessages(
    messages: Message[],
    onResponse: (result: object | null, error: string | null) => void
) {
    fetch(`${SETTINGS.SERVER_URL}/story-completions`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            responseSchema: responseSchema,
            temperature: STORY_CONFIG_DEV.temperature,
            messages,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw response.statusText;
            }
            return response.json();
        })
        .then((data) => {
            try {
                let result = data.choices[0].message.content;
                result = JSON.parse(result);
                onResponse(result, null);
            } catch {
                (err: string) => {
                    throw err;
                };
            }
        })
        .catch((err) => {
            console.error('Api error. Details: ', err);
            onResponse(null, err);
        });
}
