import 'dotenv/config';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailConsumer {
    constructor(private readonly emailService: EmailService) {}

    @EventPattern('email_send')
    async consumeEmail(@Payload() data: any, @Ctx() context: RmqContext) {
        await this.emailService.handleSendEmail(data, context);
    }
}
