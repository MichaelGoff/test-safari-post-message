export async function generatePayload() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve({
            __typename: 'GenerateTokenResponse',
            token: 'abc123',
            personalAccessToken: {
            __typename: 'PersonalAccessToken',
            id: 'abc1234',
            name: 'my token',
            description: null,
            expiration: (new Date()).toISOString(),
            _deleted: null,
            }
        })
        }, 500);
    });
}