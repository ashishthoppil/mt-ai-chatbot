(function() {
    var loaderScriptURL = document.currentScript.src;
    var urlObject = new URL(loaderScriptURL);
    var id = urlObject.searchParams.get('id');
    var bn = urlObject.searchParams.get('bn');
    var cc = urlObject.searchParams.get('cc');
    var lc = urlObject.searchParams.get('lc');
    var mc = urlObject.searchParams.get('mc');

    window.chatbotConfig = { id, bn, cc, lc, mc };

    setTimeout(() => {
      var chatbotScript = document.createElement('script');
      chatbotScript.src = `https://kulfi-ai.com/js/chatbot.js?id=${id}&bn=${bn}&cc=${cc}&lc=${lc}&mc=${mc}`;
      chatbotScript.async = true;
      document.head.appendChild(chatbotScript);
    }, 4000)
})();