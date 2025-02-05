(function() {
    var loaderScriptURL = document.currentScript.src;
    var urlObject = new URL(loaderScriptURL);
    var id = urlObject.searchParams.get('id');
    localStorage.setItem('objectID', id);
    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = 'https://mt-ai-chatbot-git-main-ashishs-projects-33ba2137.vercel.app/js/chatbot.js?id=' + id;
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();