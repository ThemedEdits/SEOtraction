import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, company, website, service, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Send to YOU
        await transporter.sendMail({
            from: `"Website Contact" <${process.env.MAIL_USER}>`,
            to: 'themed.edits.co@gmail.com',
            replyTo: email,
            subject: `New message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p> ...`
        });
        console.log('✔️ Email sent to themed.edits.co@gmail.com');

        // 2. Auto-reply to USER
        await transporter.sendMail({
            from: `"Solvexa" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Thanks for contacting Solvexa!`,
            html: `<p>Hi ${name},</p><p>Thanks for reaching out...</p>`
        });
        console.log('✔️ Auto-reply sent to user at', email);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('❌ Email sending failed:', err);
        res.status(500).json({ error: 'Failed to send email(s)' });
    }
}
