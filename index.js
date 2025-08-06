require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Email handler
app.post('/send', async (req, res) => {
    const { name, email, phone, company, website, service, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Website Contact" <${process.env.MAIL_USER}>`,
            to: 'themed.edits.co@gmail.com',
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
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
