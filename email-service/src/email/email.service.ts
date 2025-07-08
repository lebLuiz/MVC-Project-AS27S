import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';
import SendEmailDto from './dto/send-email.dto';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST as string,
        port: process.env.EMAIL_PORT as unknown as number,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async handleSendEmail(data: SendEmailDto, context: RmqContext) {
        if (!data.to || !data.subject || !data.body) {
            throw new Error('Dados de email inválidos');
        }

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        console.log('📥 Mensagem recebida:', data);
        await this.sendEmail(data.to, data.subject, data.body);

        channel.ack(originalMsg);
    }

    sendEmail(to: string, subject: string, body: string) {
        return this.transporter.sendMail({
            from: `"Sistema de Pedidos" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text: body,
        });
    }
}
