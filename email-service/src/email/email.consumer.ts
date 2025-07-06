import 'dotenv/config';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class EmailConsumer {
    @EventPattern('email-queue')
    consumeEmail(@Payload() payload: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        console.log('📥 Mensagem recebida:', payload);
        channel.ack(message);
    }
}
