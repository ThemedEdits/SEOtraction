import nodemailer from 'nodemailer';

// ✅ Admin email template (simple and raw)
function generateBrandedEmailTemplateForAdmin({ name, email, phone, company, website, service, message }) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Website:</strong> ${website || 'N/A'}</p>
    <p><strong>Service:</strong> ${service || 'N/A'}</p>
    <p><strong>Message:</strong><br>${message}</p>
    <hr>
    <p style="font-size: 13px; color: #999;">Sent from Solvexa Website Contact Form</p>
  `;
}

// ✅ User auto-reply email template (styled and branded)
function generateBrandedEmailTemplateForUser({ name, message }) {
  return `
    <table cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);">
            <tr>
              <td style="background-color: #1e293b; padding: 20px 30px; text-align: center;">
                <img src="https://solvexa-co.vercel.app/logo.svg" alt="Solvexa Logo" style="height: 40px; max-width: 180px; display: block; margin: auto;">
                <h1 style="color: #ffffff; margin: 10px 0 0; font-size: 18px;">Solvexa</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px; color: #334155; font-size: 15px;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for contacting <strong>Solvexa</strong>. We’ve received your message and will get back to you within 24 hours.</p>

                <p><strong>Your Message:</strong></p>
                <blockquote style="border-left: 4px solid #4178F2; margin: 0; padding-left: 1rem; color: #334155; font-style: italic;">
                  ${message}
                </blockquote>
              </td>
            </tr>

            <tr>
              <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 13px; color: #64748b;">
                <p style="margin: 0;">
                  <a href="https://solvexa-co.vercel.app" style="color: #4178F2; text-decoration: none;">solvexa-co.vercel.app</a><br>
                  <a href="mailto:themed.edits.co@gmail.com" style="color: #4178F2;">themed.edits.co@gmail.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

// ✅ API Handler
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

    const adminHTML = generateBrandedEmailTemplateForAdmin({
      name, email, phone, company, website, service, message,
    });

    const userHTML = generateBrandedEmailTemplateForUser({
      name, message,
    });

    // ✅ Send to admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: 'themed.edits.co@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: adminHTML,
    });

    // ✅ Auto-reply to user
    await transporter.sendMail({
      from: `"Solvexa Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Thanks for contacting Solvexa!`,
      html: userHTML,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
