if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

console.log('Open stories server init.');

app.use(express.json());

app.post('/api/chat-completion', async (req, res) => {
	try {
		const message = req.body; // The JSON according to the GPT messages scheme should be in the request body

		// Make sure we have the necessary data
		if (!message || !message.prompt || !message.temperature) {
			return res.status(400).json({ error: 'Missing required fields in the request body' });
		}

		// Call OpenAI GPT API
		const response = await axios.post(
			'https://api.openai.com/v1/engines/davinci-codex/completions',
			{
				prompt: message.prompt,
				temperature: message.temperature,
				max_tokens: message.max_tokens || 150, // You can provide a default or ensure it's included in the request
				// Add other parameters if needed
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error('Error during API request:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(port, () => {
	console.log(`Open stories server is running and listening on port ${port}`);
});
