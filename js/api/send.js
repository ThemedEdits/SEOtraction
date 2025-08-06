const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, phone, message, company, website, service } = req.body;

  // Configure transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "themed.edits.co@gmail.com",
      pass: "prqn lwvc prqh rvrq",
    },
  });

  const mailOptions = {
    from: "themed.edits.co@gmail.com",
    to: "themed.edits.co@gmail.com",
    subject: `New Inquiry from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Website: ${website}
Service: ${service}
Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
