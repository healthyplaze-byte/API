import { Injectable } from "@nestjs/common";

@Injectable()
export class AutomationService {
  /**
   * Send automated email via Resend
   */
  async sendEmail(to: string, subject: string, html: string) {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) return console.warn("RESEND_API_KEY not configured");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: "Smart Hotel OS <notifications@smarthotel.os>",
          to: [to],
          subject,
          html
        })
      });
      return response.json();
    } catch (err) {
      console.error("Email automation failed", err);
    }
  }

  /**
   * Send WhatsApp notification (Architecture-ready for Twilio/WABA)
   */
  async sendWhatsApp(to: string, message: string) {
    // This is a stub for future WhatsApp Business API integration
    // Logic would involve calling Twilio Messaging API or Meta WABA Cloud API
    console.log(`[WhatsApp Automation] To: ${to}, Message: ${message}`);
    return { status: "QUEUED", provider: "WABA_STUB" };
  }

  /**
   * Send SMS notification
   */
  async sendSMS(to: string, message: string) {
    console.log(`[SMS Automation] To: ${to}, Message: ${message}`);
    return { status: "SENT", provider: "TWILIO_STUB" };
  }
}
