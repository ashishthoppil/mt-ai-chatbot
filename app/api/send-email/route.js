import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.in', // Use smtp.zoho.com if it's a global account
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER, // Your Zoho email
      pass: process.env.ZOHO_PASS, // App-specific password or account password
    },
  });

  const mailOptions = {
    from: process.env.ZOHO_USER,
    to: 'support@kulfi-ai.com',
    subject: 'You have a new lead!',
    text: 'New Lead',
    html: `<div>You have a new lead! The email is ${email}. Revert back ASAP.<div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
