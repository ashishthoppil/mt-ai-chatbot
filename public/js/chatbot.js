(function () {
    setTimeout(() => {
        const style = document.createElement('style');
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
    
        .my-chatbot-button {
            transition: transform .2s
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
        `;
        var { organization, al, cw } = window.chatbotConfig || {};

        document.head.appendChild(style);
        
        const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
        // 2. Create the main container for the chatbot
        const container = document.createElement('div');
        container.className = 'my-chatbot-container flex flex-col items-end';

        console.log('check', al === 'l')
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
        popup.style.display = 'none'; // hide by default
        if (al === 'l') {
            popup.style.removeProperty('right');
            popup.style.left = '0px';
        }


        const iframe = document.createElement('iframe');

        iframe.style.overflow = 'none';
        iframe.src = `https://kulfi-ai.com/chat?o=${organization}`;

        iframe.height = `${(0.95 * viewPortHeight)}px`;


        popup.appendChild(iframe);
    
        let isOpen = false;
    
        const chatButton = document.createElement('button');
        chatButton.className = 'my-chatbot-button';

        const message = document.createElement('div');
        message.className = 'kulfi-greetings flex items-center bg-white border-2 px-4 py-2 border-gray- rounded-lg shadow-lg animate-bounce'
        message.innerHTML = 'Hi, how can I assist you?'
        message.style.position = 'relative';
        message.style.bottom = '10px';


        const img = document.createElement('img');
        img.src = `https://www.kulfi-ai.com/images/kulfi-icon.png`;
        img.style.width = '50px';
        chatButton.appendChild(img);
    
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
                console.log('data', data);
            } else {
                img.src = ``;
            }
        };  

        // 7. Put everything in the DOM
        container.appendChild(message);
        container.appendChild(popup);
        container.appendChild(chatButton);
        document.body.appendChild(container);
    }, 3000)
  })();
  