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
        chatButton.style.border = `2px solid #${cc}`;
        chatButton.style.backgroundColor = `#ffffff`;
        chatButton.style.boxShadow = `rgba(0, 0, 0, 0.24) 0px 3px 8px`;


        const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                <path d="M0 0 C12.54 0 25.08 0 38 0 C38 10.23 38 20.46 38 31 C35.69 31.66 33.38 32.32 31 33 C28.61998931 34.65373979 28.61998931 34.65373979 26.6875 36.625 C23.18163265 40 23.18163265 40 21 40 C21 37.03 21 34.06 21 31 C14.07 31 7.14 31 0 31 C0 20.77 0 10.54 0 0 Z M10 10 C10 11.32 10 12.64 10 14 C11.32 14 12.64 14 14 14 C14 12.68 14 11.36 14 10 C12.68 10 11.36 10 10 10 Z M24 10 C24 11.32 24 12.64 24 14 C25.32 14 26.64 14 28 14 C28 12.68 28 11.36 28 10 C26.68 10 25.36 10 24 10 Z M15 19 C15.99 20.485 15.99 20.485 17 22 C19.47266765 21.65555119 19.47266765 21.65555119 22 21 C22.33 20.34 22.66 19.68 23 19 C20.36 19 17.72 19 15 19 Z " fill='#${cc}' transform="translate(6,10)"/>
                <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill='#${cc}' transform="translate(46,19)"/>
                <path d="M0 0 C1.32 0 2.64 0 4 0 C4 3.96 4 7.92 4 12 C2.68 12 1.36 12 0 12 C0 8.04 0 4.08 0 0 Z " fill='#${cc}' transform="translate(0,19)"/>
                <path d="M0 0 C1.98 0 3.96 0 6 0 C6.125 5.75 6.125 5.75 5 8 C3.68 8 2.36 8 1 8 C-0.35439668 5.29120665 -0.06501451 2.99066732 0 0 Z " fill='#${cc}' transform="translate(22,0)"/>
              </svg>`
        chatButton.innerText = svg;
    
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
  