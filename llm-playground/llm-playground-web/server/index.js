if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // In production, this should be configured to accept requests only from a known origin.

app.post('/story-completions', async (req, res) => {
	console.log('Got story-completions request from client');
	try {
		const messages = req.body; // The JSON according to the GPT messages scheme should be in the request body

		messages.push({ im: 'a _new message!' });
		res.json({ messages });

		// Make sure we have the necessary data
		// if (!message || !message.prompt || !message.temperature) {
		// 	return res.status(400).json({ error: 'Missing required fields in the request body' });
		// }

		// // Call OpenAI GPT API
		// const response = await axios.post(
		// 	'https://api.openai.com/v1/chat/completions',
		// 	{
		// 		prompt: message.prompt,
		// 		temperature: message.temperature,
		// 		max_tokens: message.max_tokens || 150, // You can provide a default or ensure it's included in the request
		// 		// Add other parameters if needed
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}
		// );

		// res.json(response.data);
	} catch (error) {
		console.error('Error during API request:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(port, () => {
	console.log(`Open stories server is running and listening on port ${port}`);
});
