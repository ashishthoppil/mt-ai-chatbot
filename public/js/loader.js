(function() {
    var loaderScriptURL = document.currentScript.src;
    var urlObject = new URL(loaderScriptURL);
    var organization = urlObject.searchParams.get('organization');
    var cw = urlObject.searchParams.get('cw');
    var al = urlObject.searchParams.get('al');

    window.chatbotConfig = { organization };

    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = `https://kulfi-ai.com/js/chatbot.js`;
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();