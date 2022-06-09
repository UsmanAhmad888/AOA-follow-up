export interface AuthResult {
    errorMessage: string;
    result: boolean;
    homeClientId: string;
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    mustChangePassword: boolean;
}
