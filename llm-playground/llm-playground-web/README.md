Chat-Based Stories with LLM
This project enables you to create chat-based interactive stories powered by a Large Language Model (LLM). Follow the steps below to set up the development environment.

Prerequisites
Ensure Node.js is installed on your machine.
Download and install it from https://nodejs.org/en.
Setup Instructions

1. Install Dependencies
   Using your terminal, follow these steps:

Navigate to the ./server directory:

bash
Copy code
cd server
npm install
Ensure the node_modules folder is created after running the command.

Navigate to the ./client directory:

bash
Copy code
cd ../client
npm install 2. Configure Environment Variables
Ensure both the client and server directories have a .env file with the following parameters:

client/.env
env
Copy code
VITE_SERVER_URL="http://localhost:8080"
server/.env
env
Copy code
PORT=8080
OPENAI_API_KEY="your_private_api_key"
OPENAI_API_URL="https://api.openai.com/v1/chat/completions"
OPENAI_API_MODEL="gpt-4o"
Replace your_private_api_key with your actual OpenAI API key.

3. Run the Application
   Open two terminal windows—one for the server and one for the client.

In the first terminal, navigate to the server folder and start the server:

bash
Copy code
cd server
npm run dev
You should see this message:
Open stories server is running and listening on port 8080

In the second terminal, navigate to the client folder and start the client:

bash
Copy code
cd client
npm run dev
The client will start using Vite (a tool for developing web apps).
Open your browser and visit http://localhost:5173/ to access the client UI.

Notes
If you encounter any issues, ensure your .env files are correctly configured and all dependencies are installed.
This project requires a stable internet connection for accessing the OpenAI API.
