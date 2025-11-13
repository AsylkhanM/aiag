const chatBox = document.getElementById("chat");
const input = document.getElementById("userInput");
const webhookURL = "https://asylkhan.app.n8n.cloud/webhook/20c2c4f7-e12f-4cff-9bf3-a82c171e9d52/webhook";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    addMessage(data.reply || "Извини, я не смог обработать запрос.", "ai");
  } catch (err) {
    addMessage("Ошибка подключения 😞", "ai");
  }
}

