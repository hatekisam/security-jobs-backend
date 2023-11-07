import nodemailer, { Transporter } from 'nodemailer'


class Mailer {
	private transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp-relay.brevo.com',
			port: 587,
			auth: {
				user: 'antoniealexandruiulian@gmail.com',
				pass: '01CZv79UItqLJmfh',
			},
		})
	}

	async sendPasswordResetEmail(
		toEmail: string,
		resetLink: string
	): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Password Reset',
				text: `Click the link below to reset your password:\n\n${resetLink}`,
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
	async sendVerificationEmail(
		toEmail: string,
		redirectLink: string
	): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Email Verification',
				text: `Click the link below to verify your email:\n\n${redirectLink}`,
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
	async sendPasswordEmail(
		toEmail: string,
		password: string
	): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Your password to Login in to Job App',
				html: `
				<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Password for Job App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      padding: 16px;
      width: 300px;
      text-align: center;
    }
    .heading {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .code-container {
      background-color: #edf2f7;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .code {
      font-size: 20px;
      font-family: monospace;
    }
    .copy-button {
      background-color: #3182ce;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .copy-button:hover {
      background-color: #2c5282;
    }
    .text {
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">Your Password for Job App</h1>
    <p>Your password to log in to the Job App is:</p>
    <div class="code-container">
      <code class="code">${password}</code>
    </div>
    <button class="copy-button" id="copyButton">Copy Password</button>
    <p class="text">Please keep this password secure and do not share it with anyone.</p>
  </div>

  <script>
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
      const codeElement = document.querySelector('.code');
      const password = codeElement.textContent;

      const tempInput = document.createElement('input');
      tempInput.value = password;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      copyButton.textContent = 'Copied!';
    });
  </script>
</body>
</html>
`
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
	async sendProfileDenied(
		toEmail: string,
	): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Sorry , your request to became a tradeperson was rejected',
				html: `<!DOCTYPE html>
				<html lang="en">
				<head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>JobApp - Thank You for Your Interest</title>
				</head>
				<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
				  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
				    <div style="background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-radius: 8px; padding: 16px; width: 300px; text-align: center;">
				      <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #e76a1f;">Thank You for Your Interest in Becoming a Tradesperson</h1>
				      <p>We appreciate your interest in joining the tradesperson community on JobApp. After careful consideration, we regret to inform you that your application to become a tradesperson has not been approved at this time.</p>
				      <p style="margin-top: 16px;">Please feel free to explore other opportunities on JobApp and consider reapplying in the future.</p>
				      <p>If you have any questions or need further assistance, please contact our support team.</p>
				    </div>
				  </div>
				</body>
				</html>
				`
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
	async sendProfileAccepted(
		toEmail: string,
	): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Congratulations, you have become a trade person on JobApp',
				html: `<!DOCTYPE html>
				<html lang="en">
				<head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>Your Password for Job App</title>
				</head>
				<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
				  <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
				    <div style="background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-radius: 8px; padding: 16px; width: 300px; text-align: center;">
				      <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #e76a1f;">Congratulations, You've Become a Trade Person on JobApp!</h1>
				      <p>Your journey as a trade person on JobApp begins now. We're excited to have you on board.</p>
				      <p style="margin-top: 16px; color: #e76a1f;">Thank you for choosing JobApp to connect with opportunities.</p>
				    </div>
				  </div>
				</body>
				</html>
				`
			}

			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			console.error('Error sending email: ', error)
			throw error
		}
	}
	async sendProfileRequestSent(toEmail: string): Promise<void> {
		try {
			const mailOptions = {
				from: 'service@jobapp.com',
				to: toEmail,
				subject: 'Your Request to a Profile on JobApp',
				html: `
		      <!DOCTYPE html>
		      <html lang="en">
		      <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Your Request Sent on JobApp</title>
		      </head>
		      <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
			<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
			  <div style="background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-radius: 8px; padding: 16px; width: 300px; text-align: center;">
			    <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #e76a1f;">Your Request to a Profile Was Sent on JobApp!</h1>
			    <p>Your request to connect with a profile on JobApp has been successfully sent. Our team will review your request, and you will be notified once it's reviewed.</p>
			    <p style="margin-top: 16px; color: #e76a1f;">Thank you for choosing JobApp to connect and collaborate.</p>
			  </div>
			</div>
		      </body>
		      </html>
		    `,
			};

			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			console.error('Error sending email: ', error);
			throw error;
		}
	}
}

export default new Mailer()
