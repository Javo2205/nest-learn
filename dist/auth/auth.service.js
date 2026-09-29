"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("../mail/mail.service");
const auth_tokens_service_1 = require("./auth-tokens.service");
const client_1 = require("../generated/prisma/client");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    authTokens;
    mail;
    config;
    logger = new common_2.Logger(AuthService_1.name);
    constructor(prisma, jwtService, authTokens, mail, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.authTokens = authTokens;
        this.mail = mail;
        this.config = config;
    }
    async sendVerification(userId, email) {
        try {
            const hours = Number(this.config.getOrThrow('EMAIL_VERIFICATION_EXPIRES_HOURS'));
            const token = await this.authTokens.createToken(userId, client_1.AuthTokenType.EMAIL_VERIFICATION, hours * 60 * 60 * 1000);
            await this.mail.sendVerificationEmail(email, token);
        }
        catch (error) {
            this.logger.error(`Fallo al enviar verificación al usuario ${userId}`, error instanceof Error ? error.stack : undefined);
        }
    }
    async register(registerDto) {
        const { email, password } = registerDto;
        const message = 'Si el correo es válido, recibirás un enlace para confirmar tu cuenta';
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            if (!existingUser.emailVerified) {
                await this.sendVerification(existingUser.id, existingUser.email);
            }
            return { message };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: { email, password: hashedPassword },
            select: { id: true, email: true },
        });
        await this.sendVerification(user.id, user.email);
        return { message };
    }
    async verifyEmail(token) {
        const userId = await this.authTokens.consumeToken(token, client_1.AuthTokenType.EMAIL_VERIFICATION);
        if (!userId) {
            throw new common_1.BadRequestException('El enlace es inválido o ha expirado');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { emailVerified: true },
        });
        return { message: 'Correo confirmado. Ya puedes iniciar sesión' };
    }
    async resendVerification(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && !user.emailVerified) {
            await this.sendVerification(user.id, user.email);
        }
        return {
            message: 'Si el correo es válido, recibirás un enlace para confirmar tu cuenta',
        };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            try {
                const minutes = Number(this.config.getOrThrow('PASSWORD_RESET_EXPIRES_MINUTES'));
                const token = await this.authTokens.createToken(user.id, client_1.AuthTokenType.PASSWORD_RESET, minutes * 60 * 1000);
                await this.mail.sendPasswordResetEmail(user.email, token);
            }
            catch (error) {
                this.logger.error(`Fallo al enviar recuperación al usuario ${user.id}`, error instanceof Error ? error.stack : undefined);
            }
        }
        return {
            message: 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña',
        };
    }
    async resetPassword(token, newPassword) {
        const userId = await this.authTokens.consumeToken(token, client_1.AuthTokenType.PASSWORD_RESET);
        if (!userId) {
            throw new common_1.BadRequestException('El enlace es inválido o ha expirado');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                emailVerified: true,
            },
        });
        return { message: 'Contraseña actualizada. Ya puedes iniciar sesión' };
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const passwordMatches = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('La contraseña actual es incorrecta');
        }
        if (await bcrypt.compare(newPassword, user.password)) {
            throw new common_1.BadRequestException('La nueva contraseña debe ser distinta a la actual');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { message: 'Contraseña actualizada correctamente' };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (!user.emailVerified) {
            throw new common_1.ForbiddenException('Confirma tu correo antes de iniciar sesión');
        }
        const payload = {
            sub: user.id,
            email: user.email,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        auth_tokens_service_1.AuthTokensService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map