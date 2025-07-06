import 'dotenv/config';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailConsumer {
    constructor(private readonly emailService: EmailService) {}

    @EventPattern()
    async consumeEmail(@Payload() payload: any) {
        const { to, subject, body } = payload;

        console.log('📥 Mensagem recebida:', payload);

        try {
            await this.emailService.sendEmail(to, subject, body);
            console.log('✅ E-mail enviado para', to);
        } catch (err) {
            console.error('❌ Erro ao enviar e-mail:', err);
        }
    }
}
