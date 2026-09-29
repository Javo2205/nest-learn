export declare const AuthTokenType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type AuthTokenType = (typeof AuthTokenType)[keyof typeof AuthTokenType];
