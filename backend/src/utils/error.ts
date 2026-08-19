export class AppError extends Error {
    codigo: number;

    constructor(mensagem: string, codigo: number) {
        super(mensagem);
        this.codigo = codigo;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const criarErro = (mensagem: string, codigo: number): AppError => {
    return new AppError(mensagem, codigo);
};