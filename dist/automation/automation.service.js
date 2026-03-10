"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationService = void 0;
const common_1 = require("@nestjs/common");
let AutomationService = class AutomationService {
    async sendEmail(to, subject, html) {
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey)
            return console.warn("RESEND_API_KEY not configured");
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
        }
        catch (err) {
            console.error("Email automation failed", err);
        }
    }
    async sendWhatsApp(to, message) {
        console.log(`[WhatsApp Automation] To: ${to}, Message: ${message}`);
        return { status: "QUEUED", provider: "WABA_STUB" };
    }
    async sendSMS(to, message) {
        console.log(`[SMS Automation] To: ${to}, Message: ${message}`);
        return { status: "SENT", provider: "TWILIO_STUB" };
    }
};
exports.AutomationService = AutomationService;
exports.AutomationService = AutomationService = __decorate([
    (0, common_1.Injectable)()
], AutomationService);
//# sourceMappingURL=automation.service.js.map