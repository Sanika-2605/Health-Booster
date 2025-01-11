document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user message
    displayMessage(userInput, 'user');

    // Fetch AI response from Worqhat API
    const aiResponse = await getAIResponse(userInput);
    displayMessage(aiResponse, 'ai');

    // Clear input
    document.getElementById('user-input').value = '';
});

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function getAIResponse(userInput) {
    const response = await fetch('https://api.worqhat.com/api/ai/content/v4', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sk-52a0030719934f77af828a4f70aeb495' // Replace with your actual API key
        },
        body: JSON.stringify({ question: userInput })
    });

    if (!response.ok) {
        return "I'm sorry, I couldn't get a response from the AI.";
    }

    const data = await response.json();
    return data.answer || "I'm sorry, I don't have an answer for that.";
}
