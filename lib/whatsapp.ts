import { Client  } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
let client: Client;

const initializeWhatsApp = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!client) {
            client = new Client({
               // Saves session to a local file
            });

            client.on('qr', (qr) => {
                console.log('QR RECEIVED');
                // If you want to print the QR code in the terminal:
                qrcode.generate(qr, { small: true });
            });
            client.on('ready', () => {
                console.log('WhatsApp Web client is ready!');
                resolve(); // Resolve the promise when client is ready
            });

            client.on('authenticated', () => {
                console.log('Authenticated successfully.');
            });

            client.on('auth_failure', (message) => {
                console.error('Authentication failed:', message);
                reject(new Error('Authentication failed.'));
            });

            client.on('disconnected', () => {
                console.log('WhatsApp Web client disconnected.');
            });

            client.on('message', (msg) => {
                if (msg.body === '!ping') {
                    msg.reply('pong');
                }
            });

            client.initialize();
        }
    });
};

const sendMessage = async (number: string, message: string): Promise<string> => {
    try {
        console.log("Initializing WhatsApp client...");
        // Wait for the client to be ready before sending a message
        await initializeWhatsApp();  // Wait for the client to be ready
        console.log("Client initialized");

        if (!client) {
            throw new Error('WhatsApp client not initialized.');
        }

        const formattedNumber = `${number}@c.us`; // Format for WhatsApp IDs
        await client.sendMessage(formattedNumber, message);
        return `Message sent to ${number}`;
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Failed to send message');
    }
};

export { initializeWhatsApp, sendMessage };
