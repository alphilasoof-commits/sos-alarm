const webpush = require('web-push');

// VAPID keys - these match what is set in Netlify env vars
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
    'mailto:al.philasoof@gmail.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method not allowed' };
    }

    try {
        const { subscription } = JSON.parse(event.body);

        if (!subscription) {
            return { statusCode: 400, headers, body: 'No subscription provided' };
        }

        const payload = JSON.stringify({
            title: '💕 Maha denkt aan jou!',
            body: 'Maha heeft op het hartje gedrukt ❤️',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: 'love-alarm',
            requireInteraction: true
        });

        await webpush.sendNotification(subscription, payload);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error('Push error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
