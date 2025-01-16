(function() {
    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = 'chatbot.js';
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();