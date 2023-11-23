/// <reference path="../types/pocketbase.d.ts" />

routerAdd('GET', '/api/v2/ping', (c) => {
    return c.json(200, {
        code: 'successed',
        message: 'pong',
        data: JSON.parse(JSON.stringify(c.request())),
    });
});

cronAdd('ping', '*/30 * * * *', () => {
    const { appUrl } = $app.settings().meta;
    $http.send({
        url: `${appUrl}/api/v2/ping`,
    });
});
