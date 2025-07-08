import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RABBITMQ_SERVICE') public readonly instance: ClientRMQ,
    ) {}

    sendEmail(emailPayload: any) {
        this.instance.emit('email_send', emailPayload);
    }
}
