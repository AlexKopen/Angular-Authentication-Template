interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'YOUR_CLIENT_ID',
    CLIENT_DOMAIN: 'YOUR_CLIENT_DOMAIN',
    AUDIENCE: 'YOUR_API_AUDIENCE',
    REDIRECT: 'http://localhost:4200/callback',
    SCOPE: 'openid profile email'
};


// CLIENT_ID: '5ep2SNhoVyNHhz41vxFl0Y2M8mg6o6gY',
//     CLIENT_DOMAIN: 'volzap.auth0.com',
//     AUDIENCE: 'https://api.reiserrelief.org',
