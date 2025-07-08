import 'dotenv/config';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailConsumer {
    @EventPattern('email.send')
    consumeEmail(@Payload() payload: any) {
        console.log('📥 Mensagem recebida:', payload);
    }
}
