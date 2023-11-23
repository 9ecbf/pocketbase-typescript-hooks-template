/// <reference path="../types/pocketbase.d.ts" />

interface SendMailRequest {
    email: string;
    subject: string;
    template: string;
    data: any;
}

routerAdd('POST', '/api/v2/internal/mail/send', (c) => {
    const { email, subject, template, data } = $apis.requestInfo(c)
        .data as SendMailRequest;
    const senderAddress = $app.settings().meta.senderAddress;
    const senderName = $app.settings().meta.senderName;
    const html = $template
        .loadFiles(`${__hooks}/views/${template}.html`)
        .render(data);
    const address = (email: string, name: string = '') => ({
        address: email,
        name,
        string: () => email,
    });
    $app.newMailClient().send({
        from: address(senderAddress, senderName),
        to: [address(email)],
        subject,
        html,
        bcc: [],
        cc: [],
        text: '',
        headers: {},
        attachments: {},
    });
});
