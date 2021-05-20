import React from 'react';

const EmailSES = () => {
    const sendEmailHandler = () => {
        const postBody = {
            "type": "sendEmail",
            "to": "coolmahimsd@gmail.com",
            "from": "ThakurMahendarSingh@westat.com",
            "subject": "Test Email",
            "text": `Hi,
            this is a test email, which is triggerred using amazon ses service using lambda and api gateway`
        };
        fetch('https://uen221qzo8.execute-api.us-east-1.amazonaws.com/test/sendemail', {
            method: 'post',
            body: JSON.stringify(postBody)
        }).then(res => {
            console.log('res: ', res);
        })
    };
    return (
        <>
        this Page for ses  email service
        <button type="button" onClick={sendEmailHandler}>Send Email</button>
        </>
    )
}

export default EmailSES;
