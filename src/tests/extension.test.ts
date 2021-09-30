import { expect } from 'chai';
import { convert } from '../convert';

/*
describe('Options tests', () => { // the tests container
    it('checking default options', () => { // the single test
        
        try {
			const testStr = "\"MBWebchat Incoming Message: IncomingMBWebChatMessageRequest(channelId=61544ecb5361854e0885da4e, content={\"BROWSER_TYPE\":\"Google Chrome\",\"CHAT_URL\":\"https://dev.mindbehind.com/chatbot-test?channelId=61544ecb5361854e0885da4e\"}, messageType=CONNECT, clientId=b7029873-763f-4905-b0e7-cdb6ca351c46, outerMessageId=9653654b-da64-46ee-b7c1-121228679e51), token: null\"}";
			convert(testStr);
		} catch (err) {
			console.error((err as Error).message);
			process.exit(1);
		}
    
    });
});
*/
describe('working', () => { // the tests container
    it('checking default options', () => { // the single test
        
        try {
			const testStr = "\"Infobip Whatsapp Message received: IncomingInfobipWhatsappMessageRequest(results=[InfobipMessage(from=923005338655, to=447860099299, messageId=ABEGkjAFM4ZVAgo-sPZ5RHSgjiZx, content=null, integrationType=WHATSAPP, receivedAt=2021-09-30T08:50:43.147+0000, message=InfobipIncomingMessage(type=TEXT, title=null, id=null, description=null, text=hello2344, caption=null, url=null, longitude=0.0, latitude=0.0, address=null, payload=null, name=null, context=null), contact=InfobipIncomingContact(name=Taha K), price=InfobipIncomingPrice(pricePerMessage=0, currency=EUR))], messageCount=1, pendingMessageCount=-1)\"";
			convert(testStr);
		} catch (err) {
			console.error((err as Error).message);
			process.exit(1);
		}
    
    });
});

