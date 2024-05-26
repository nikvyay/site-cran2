const responses = {
    'как можно оплатить покупку?': 'Оплатить товар можно наличными или пластиковой картой при самовывозе из магазина на ул. Лесозаводская, 6, либо наличными или пластиковой картой в любом другом розничном магазине компании.',
    'можно ли оформить покупку в кредит?': 'К сожалению, в настоящее время Интернет-магазин не имеет возможности отпускать товар в кредит.',
    'в какие сроки доставляется товар?': 'Доставка товаров при заказе до 16-00 осуществляется на следующий день при наличии свободных мест. При заказе после 16-00 через день после оформления заказа при наличии свободных мест. Будние дни с 9:00 до 19:00; Суббота с 9:00 до 16:00; Воскресенье с 10:00 до 16:00.',
    'как проверить товар, надлежащего ли он качества?': 'Законодательством предусмотрен 7-дневный срок на самостоятельную проверку покупателем качества товара. Если в этот срок будут обнаружены любые отклонения от нормы – Вы можете обратиться в наш магазин, проблема будет решена в кратчайшие сроки. Если же Вы настаиваете на проверке качества и работоспособности товара при выдаче товара (товар уезжает в другой регион, это подарок и т.д.), обязательно заострите на этом внимание нашего менеджера, когда будете общаться с ним по телефону.',
    'что делать, если в день доставки мне не привезли мой товар?': 'Если по каким-либо причинам заказанный и оплаченный Вами товар не привезли в необходимый день и время, пожалуйста обратитесь к менеджеру интернет-магазина по телефону 52-15-77. Мы постараемся незамедлительно решить Ваш вопрос.Время работы менеджера интернет-магазина: Будние с 9:00 до 18:00 БЕЗ ОБЕДА // Суббота с 9:00 до 16:00 БЕЗ ОБЕДА // Воскресенье с 10:00 до 16:00 БЕЗ ОБЕДА',
    'как поступить, если я получил товар, который я не заказывал?': 'Если Вы получили не тот товар, который заказывали, его можно вернуть. Для этого Вам требуется обратиться к нашему менеджеру по телефону.',
    'могу ли я отказаться от заказанного товара?': 'По закону Вы можете отказаться от заказанного товара в любой момент, однако по тому же закону продавец имеет право взыскать с Вас в данном случае сумму, затраченную на транспортировку товара и прочие связанные с этим расходы.',
};

function getResponse(message) {
    message = message.toLowerCase();
    var a = message[message.length-1];
    if (a !== '?') message = message + '?';
    // Проверяем, есть ли вопрос в списке типовых вопросов
    if (responses.hasOwnProperty(message)) {
        return responses[message];
    } else {
        return 'Извините, я не понимаю ваш вопрос.';
    }
}

function showDialog() {
    var chatbotDialog = document.querySelectorAll(".chatbot-container")[0];
    chatbotDialog.style.display = "";
}

function closeDialog() {
    var chatbotDialog = document.querySelectorAll(".chatbot-container")[0];
    chatbotDialog.style.display = "none";
}

function sendMessage() {
    var input = document.querySelectorAll(".chatbot-input")[0];
    _sendMessage(input.value);
}

function _sendMessage(text) {
    var chatbotDialog = document.querySelectorAll(".chatbot-content-container")[0];
    var clientItem = renderChatbotContentItemClient(text);
    var botResponse = getResponse(text);
    var botItem = renderChatbotContentItem(botResponse);
    chatbotDialog.appendChild(clientItem);
    chatbotDialog.appendChild(botItem);
}

function renderChatbotContentItemClient(text) {
    const chatbotContentItemClient = document.createElement('div');
    chatbotContentItemClient.classList.add('chatbot-content-item-client');
  
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    chatbotContentItemClient.appendChild(paragraph);
  
    return chatbotContentItemClient;
}

function renderChatbotContentItem(text) {
    const chatbotContentItemClient = document.createElement('div');
    chatbotContentItemClient.classList.add('chatbot-content-item');
  
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    chatbotContentItemClient.appendChild(paragraph);
  
    return chatbotContentItemClient;
}

function renderChatbotContentStart(text) {
    const chatbotContentItemClient = document.createElement('div');
    chatbotContentItemClient.classList.add('chatbot-content-item');
  
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    chatbotContentItemClient.appendChild(paragraph);
    Object.keys(responses).forEach(element => {
        const button = document.createElement('button');
        button.classList.add('chatbot-content-button', 'btn');
        button.textContent = formatSentence(element);
        button.onclick = function(){_sendMessage(formatSentence(element))};
        chatbotContentItemClient.appendChild(button);
    });
  
    return chatbotContentItemClient;
}

function formatSentence(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function startMessage() {
    var text = "Здравствуйте, я виртуальный помощник! Я могу помочь вам ответив на вопросы. Такие как: ";
    /*
    text = text + "Как можно оплатить покупку? ",
    text = text + "Можно ли оформить покупку в кредит? ";
    text = text + "В какие сроки доставляется товар? ";
    text = text + "Как проверить товар, надлежащего ли он качества?";*/
    var botItem = renderChatbotContentStart(text);
    var chatbotDialog = document.querySelectorAll(".chatbot-content-container")[0];
    chatbotDialog.appendChild(botItem);
}

startMessage()