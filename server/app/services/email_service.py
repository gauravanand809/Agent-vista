import os
import resend
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        api_key = os.getenv("RESEND_API_KEY")
        if not api_key:
            raise ValueError("RESEND_API_KEY not found in environment variables.")
        resend.api_key = api_key

    async def send_password_reset_email(self, to_email: str, reset_link: str):
        """
        Sends a password reset email using the Resend API.
        """
        try:
            domain = os.getenv("DOMAIN","feedback360.xyz");
            params = {
                "from": f"noreply@{domain}", 
                "to": [to_email],
                "subject": "Reset Your Password",
                "html": f"""
                <h1>Reset Your Password</h1>
                <p>You requested a password reset for your account.</p>
                <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
                <a href="{reset_link}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
                """,
            }
            
            r = resend.Emails.send(params) # type: ignore
            return r
        except Exception as e:
            print(f"Failed to send password reset email: {e}")
            raise e

# Create a single instance to be used across the application
email_service = EmailService()
