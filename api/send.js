import nodemailer from 'nodemailer';

// ✅ Branded email template generator
function generateBrandedEmailTemplate({ name, email, phone, company, website, service, message }) {
  return `
    <table cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);">

            <!-- Header -->
            <tr>
              <td style="background-color: #1e293b; padding: 20px 30px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Solvexa</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #334155; font-size: 15px;">
                <p style="margin: 0 0 15px;">Hi <strong>${name}</strong>,</p>

                <p style="margin: 0 0 20px;">
                  Thank you for reaching out to <strong>Solvexa</strong>. We’ve received your message and will get back to you within 24 hours.
                </p>

                <p style="margin-bottom: 10px;"><strong>Here's what you submitted:</strong></p>
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px; color: #1e293b; background-color: #f8fafc; border-radius: 5px;">
                  <tr><td style="width: 30%;"><strong>Name:</strong></td><td>${name}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                  <tr><td><strong>Phone:</strong></td><td>${phone || 'N/A'}</td></tr>
                  <tr><td><strong>Company:</strong></td><td>${company || 'N/A'}</td></tr>
                  <tr><td><strong>Website:</strong></td><td>${website || 'N/A'}</td></tr>
                  <tr><td><strong>Service:</strong></td><td>${service || 'N/A'}</td></tr>
                </table>

                <p style="margin: 30px 0 10px;"><strong>Your Message:</strong></p>
                <blockquote style="border-left: 4px solid #4178F2; margin: 0; padding-left: 1rem; color: #334155; font-style: italic;">
                  ${message}
                </blockquote>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 13px; color: #64748b;">
                <p style="margin: 0;">
                  This message was sent from <a href="https://solvexa-co.vercel.app" style="color: #4178F2; text-decoration: none;">solvexa-co.vercel.app</a><br>
                  Need help? Email us at <a href="mailto:themed.edits.co@gmail.com" style="color: #4178F2;">themed.edits.co@gmail.com</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `;
}

// ✅ API handler
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

    const emailHTML = generateBrandedEmailTemplate({
      name,
      email,
      phone,
      company,
      website,
      service,
      message,
    });

    // 1. Send to you
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: 'themed.edits.co@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: emailHTML,
    });

    // 2. Auto-reply to the user
    await transporter.sendMail({
      from: `"Solvexa Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Thanks for contacting Solvexa!`,
      html: emailHTML,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
