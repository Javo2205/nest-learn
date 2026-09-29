"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    mailer;
    config;
    constructor(mailer, config) {
        this.mailer = mailer;
        this.config = config;
    }
    buildUrl(path, token) {
        const base = this.config.getOrThrow('FRONTEND_URL');
        return `${base}${path}?token=${encodeURIComponent(token)}`;
    }
    async sendVerificationEmail(to, token) {
        const url = this.buildUrl('/verify-email', token);
        const hours = this.config.getOrThrow('EMAIL_VERIFICATION_EXPIRES_HOURS');
        await this.mailer.sendMail({
            from: this.config.getOrThrow('MAIL_FROM'),
            to,
            subject: 'Confirma tu correo - Task API',
            text: `Confirma tu cuenta abriendo este enlace: ${url}\nEl enlace expira en ${hours} horas.`,
            html: `
        <h2>Confirma tu correo</h2>
        <p>Haz clic en el botón para activar tu cuenta:</p>
        <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Confirmar correo</a></p>
        <p>El enlace expira en ${hours} horas. Si no creaste esta cuenta, ignora este mensaje.</p>
      `,
        });
    }
    async sendPasswordResetEmail(to, token) {
        const url = this.buildUrl('/reset-password', token);
        const minutes = this.config.getOrThrow('PASSWORD_RESET_EXPIRES_MINUTES');
        await this.mailer.sendMail({
            from: this.config.getOrThrow('MAIL_FROM'),
            to,
            subject: 'Restablece tu contraseña - Task API',
            text: `Restablece tu contraseña abriendo este enlace: ${url}\nEl enlace expira en ${minutes} minutos.`,
            html: `
        <h2>Restablecer contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña:</p>
        <p><a href="${url}" style="background:#4f46e5;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Restablecer contraseña</a></p>
        <p>El enlace expira en ${minutes} minutos. Si no lo solicitaste, ignora este mensaje; tu contraseña no cambiará.</p>
      `,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map