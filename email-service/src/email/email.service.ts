import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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

    sendEmail(to: string, subject: string, body: string) {
        return this.transporter.sendMail({
            from: `"Sistema de Pedidos" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text: body,
        });
    }
}
