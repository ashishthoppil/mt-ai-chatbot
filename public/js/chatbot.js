(function () {
    setTimeout(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        .my-chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 70px;
            z-index: 9999; /* On top of everything */
            font-family: sans-serif; /* Basic font family */
        }
    
        .my-chatbot-button {
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
            font-size: 24px;
            outline: none;
        }
    
        .my-chatbot-popup {
            position: absolute;
            bottom: 80px; /* Appear above the icon */
            right: 0;
            width: 300px;
            max-height: 400px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        `;
        var { id, bn, cc, lc, mc } = window.chatbotConfig || {};

        document.head.appendChild(style);
        
        const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
        // 2. Create the main container for the chatbot
        const container = document.createElement('div');
        container.className = 'my-chatbot-container';
    
        // 3. Create the chatbot popup (hidden initially)
        const popup = document.createElement('div');
        popup.style.maxHeight = `${(0.65 * viewPortHeight)}px`;
        popup.style.width = `25rem`;
        popup.className = 'my-chatbot-popup';
        popup.style.display = 'none'; // hide by default

        const iframe = document.createElement('iframe');

        iframe.src = `https://kulfi-ai.com/chat?id=${id}&bn=${bn}&cc=${cc}&lc=${lc}&mc=${mc}`;
        iframe.style.overflow = 'none';

        iframe.height = `${(0.95 * viewPortHeight)}px`;


        popup.appendChild(iframe);
    
        let isOpen = false;
    
        const chatButton = document.createElement('button');
        chatButton.className = 'my-chatbot-button';
        chatButton.style.backgroundColor = `#${cc}`;
        chatButton.style.color = `#ffffff`;
        chatButton.innerText = bn[0].toUpperCase();
    
        chatButton.onclick = () => {
        isOpen = !isOpen;
        popup.style.display = isOpen ? 'flex' : 'none';
        };  
    
        // 7. Put everything in the DOM
        container.appendChild(popup);
        container.appendChild(chatButton);
        document.body.appendChild(container);
    }, 3000)
  })();
  