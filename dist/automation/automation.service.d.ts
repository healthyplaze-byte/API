export declare class AutomationService {
    sendEmail(to: string, subject: string, html: string): Promise<any>;
    sendWhatsApp(to: string, message: string): Promise<{
        status: string;
        provider: string;
    }>;
    sendSMS(to: string, message: string): Promise<{
        status: string;
        provider: string;
    }>;
}
