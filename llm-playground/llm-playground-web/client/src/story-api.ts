import { SETTINGS } from '../settings';
import { responseSchema } from './story-config';

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
            messages
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
