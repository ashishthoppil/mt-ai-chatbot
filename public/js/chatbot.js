(function () {
    setTimeout(() => {
        const style = document.createElement('style');
        var { organization, al, cw, c } = window.chatbotConfig || {};

        style.innerHTML = `

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }

        .kulfi-greetings {
            animation: bounce 1s infinite;
        }

        .my-chatbot-container {
            display: flex;
            justify-content: end;
            position: fixed;
            bottom: 20px;
            z-index: 9999; /* On top of everything */
            font-family: sans-serif; /* Basic font family */
        }
    
         @keyframes load {
                0%, 100% {
                    box-shadow: 
                    0 0 30px rgba(204, 0, 255, 0.5), 
                    inset 0 0 25px rgba(204, 0, 255, 0.4);
                }
                50% {
                    box-shadow: 
                    0 0 50px rgba(204, 0, 255, 0.6), 
                    inset 0 0 40px rgba(204, 0, 255, 0.5);
                }
        }
        .my-chatbot-button {
            transition: transform .2s;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: radial-gradient(circle at 50% 40%, 
                #00ffe0 0%, 
                #00ccaa 30%, 
                #004d4d 70%, 
                #002222 100%);
            box-shadow: 
                0 0 30px rgba(0, 255, 224, 0.5), 
                inset 0 0 25px rgba(0, 255, 224, 0.4);
            animation: load 3s infinite;
        }

        .my-chatbot-button:hover {
            transform: translateY(-3px);
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

        iframe > html {
            overflow-y: hidden;
        }
        `;


        document.head.appendChild(style);
        
        const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
        // 2. Create the main container for the chatbot
        const container = document.createElement('div');
        container.className = `my-chatbot-container flex flex-col ${al === 'l' ? 'items-start' : 'items-end' }`;

        if (al === 'l') {
            container.style.left = '15px';
        } else {
            container.style.right = '15px';
        }
    
        // 3. Create the chatbot popup (hidden initially)
        const popup = document.createElement('div');
        popup.style.maxHeight = `${(0.75 * viewPortHeight)}px`;
        if (document.documentElement.clientWidth > 500) {
            popup.style.width = `${cw}px`;
        } else {
            container.style.width = '100%';
            popup.style.width = `85%`;
        }
        popup.className = 'my-chatbot-popup';
        popup.id = 'kulfi-popup';
        popup.style.display = 'none'; // hide by default
        if (al === 'l') {
            popup.style.removeProperty('right');
            popup.style.left = '0px';
        }


        const iframe = document.createElement('iframe');
        iframe.style.overflow = 'none';
        iframe.src = `https://kulfi-ai.com/chat?o=${organization}`;

        iframe.height = `${(0.95 * viewPortHeight)}px`;

        iframe.onload = function () {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const style = document.createElement("style");
          
            style.innerHTML = `
                html {
                    overflow-y: hidden;
                }
            `;
          
            iframeDoc.head.appendChild(style); // ✅ Works after loading
        };

        popup.appendChild(iframe);
    
        let isOpen = false;
    
        const chatButton = document.createElement('button');
        chatButton.className = 'my-chatbot-button rounded-full';
        // chatButton.style.backgroundColor = `#${c}`
        // chatButton.style.padding = `15px`

        const message = document.createElement('div');
        message.className = 'kulfi-greetings flex items-center gap-2 justify-between bg-white border-2 px-4 py-1 rounded-sm shadow-lg animate-bounce'
        message.innerHTML = 'Hi, how can I assist you?'
        message.style.position = 'relative';
        message.style.bottom = '10px';

        const img = document.createElement('img');
        img.src = `https://img.icons8.com/parakeet-line/48/FFFFFF/speech-bubble-with-dots.png`;
        img.style.width = '25px';
        // chatButton.appendChild(img);
    
        chatButton.onclick = async () => {
            message.style.display = 'none';
            isOpen = !isOpen;
            popup.style.display = isOpen ? 'flex' : 'none';
            const img = new Image();
            if (isOpen) {
                const response = await fetch(`https://kulfi-ai.com/api/track-event?organization=${organization}&event=click`, {
                    method: 'GET',
                    mode: "no-cors",
                });
                const data = await response.json();
            } else {
                img.src = ``;
            }
        };  

        // 7. Put everything in the DOM
        container.appendChild(message);
        container.appendChild(popup);
        container.appendChild(chatButton);
        document.body.appendChild(container);
    }, 2000)
  })();
  