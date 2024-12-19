# Chat-Based Stories with LLM

This project enables you to create chat-based interactive stories powered by a Large Language Model (LLM). Follow the steps below to set up the development environment.

## Prerequisites

Ensure **Node.js** is installed on your machine.  
Download and install it from [https://nodejs.org/en](https://nodejs.org/en).

## Setup Instructions

### 1. Install Dependencies

Using your terminal, follow these steps:

1. Navigate to the `./server` directory:

    ```bash
    cd server
    npm install
    ```

    Ensure the `node_modules` folder is created after running the command.

2. Navigate to the `./client` directory:
    ```bash
    cd ../client
    npm install
    ```

### 2. Configure Environment Variables

Ensure both the client and server directories have a .env file with the following parameters:

`client/.env`

```env
VITE_SERVER_URL="http://localhost:8080"
```

`server/.env`

```env
PORT=8080
OPENAI_API_KEY="your_private_api_key"
OPENAI_API_URL="https://api.openai.com/v1/chat/completions"
OPENAI_API_MODEL="gpt-4o"
```

Replace your_private_api_key with your actual OpenAI API key.

### 3. Run the Application

1. Open two terminal windows—one for the server and one for the client.
2. In the first terminal, navigate to the server folder and start the server:

    ```bash
    cd server
    npm run dev
    ```

    You should see this message:
    `Open stories server is running and listening on port 8080`

3. In the second terminal, navigate to the client folder and start the client:
    ```bash
    cd client
    npm run dev
    ```
    The client will start using Vite (a tool for developing web apps).
    Open your browser and visit http://localhost:5173/ to access the client UI.

### 4. Customize Your Story

1. Open and edit `./client/src/story-config.js` with your own content.
   Add or modify the story configuration to suit your needs.

2. Go to `./client/src/App.jsx`.
   Ensure you import your story configuration by adding the following line:

```javascript
import { storyConfig } from './story-config';
```

3. Refresh the browser window to see your updated story.

---

#### Notes

-   If something isn't working as expected:
    -   Open the **browser developer tools** (usually by pressing `F12` or `Ctrl+Shift+I`) and check the console for errors.
    -   Check the **terminal window** running the server for error messages related to internal server issues.
-   Ensure your `.env` files are correctly configured and all dependencies are installed.
-   This project requires a stable internet connection for accessing the OpenAI API.
