import { SETTINGS } from '../../settings';
import { responseSchema } from '../story/story-config';

/**
 *
 * @param {{role:string,content:string}[]} messages
 * @param {(result?:object,error?: string)=>void} onResponse
 */
export function postMessages(messages, onResponse) {
    fetch(`${SETTINGS.SERVER_URL}/story-completions`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            responseSchema: responseSchema,
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
                (err) => {
                    throw err;
                };
            }
        })
        .catch((err) => {
            console.error('Api error. Details: ', err);
            onResponse(null, err);
        });
}
