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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 1. Send to you
await transporter.sendMail({
  from: `"Website Contact" <${process.env.MAIL_USER}>`,
  to: 'themed.edits.co@gmail.com',
  replyTo: email,
  subject: `New message from ${name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Website:</strong> ${website || 'N/A'}</p>
    <p><strong>Service:</strong> ${service || 'N/A'}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `,
});

// 2. Auto-reply to the user
await transporter.sendMail({
  from: `"Solvexa Support" <${process.env.MAIL_USER}>`,
  to: email,
  subject: `Thanks for contacting Solvexa!`,
  html: `
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to Solvexa. We’ve received your message and will get back to you within 24 hours.</p>
    <p><strong>Your Message:</strong><br>${message}</p>
    <p>—<br>Solvexa Team<br><a href="https://solvexa-co.vercel.app">solvexa-co.vercel.app</a></p>
  `
});


    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
