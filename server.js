require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images) from the current directory
// This will make your portfolio website available at http://localhost:3000
app.use(express.static(path.join(__dirname)));

// POST route for sending email
app.post('/send-email', (req, res) => {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim();
    const subject = (req.body.subject || 'Portfolio Inquiry').trim();
    const message = (req.body.message || '').trim();

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: name, email, and message.'
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    // Check SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECIPIENT_EMAIL) {
        console.error('SMTP configuration missing in environment variables.');
        return res.status(500).json({
            success: false,
            message: 'Email service is currently misconfigured. Please contact directly via LinkedIn or email.'
        });
    }

    // Sanitize user inputs for safe HTML email rendering
    const escapeHtml = (str) => {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: `"${safeName}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Contact Form Submission: ${safeSubject}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #3a86ff, #4361ee); padding: 20px; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Message from Portfolio Contact Form</h2>
                </div>
                <div style="padding: 24px; background: #ffffff;">
                    <p style="margin: 0 0 10px;"><strong>Name:</strong> ${safeName}</p>
                    <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #3a86ff;">${safeEmail}</a></p>
                    <p style="margin: 0 0 15px;"><strong>Subject:</strong> ${safeSubject}</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
                    <p style="margin: 0 0 8px; font-weight: 600; color: #475569;">Message:</p>
                    <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155;">
                        ${safeMessage}
                    </div>
                </div>
                <div style="padding: 12px 24px; background: #f1f5f9; font-size: 12px; color: #64748b; text-align: center;">
                    Sent via Chaitanya Joshi Portfolio Contact Form
                </div>
            </div>
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
        }
        console.log('Message sent successfully. Message ID: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export app for serverless platforms like Vercel
module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}