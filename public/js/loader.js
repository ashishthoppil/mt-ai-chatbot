(function() {
    var loaderScriptURL = document.currentScript.src;
    var urlObject = new URL(loaderScriptURL);
    var id = urlObject.searchParams.get('id');
    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = 'https://kulfi-ai.com/js/chatbot.js?id=' + id;
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();