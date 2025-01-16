(function() {
    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = 'https://mt-ai-chatbot.vercel.app/js/chatbot.js';
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();