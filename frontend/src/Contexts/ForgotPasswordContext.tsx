import { createContext, useContext, useState } from "react";

interface ForgotPasswordContextType {
    forgotPassword: (email: string) => Promise<boolean>;
    loadingForgotPassword: boolean;

    resetPassword: (token: string, password1: string, password2: string) => Promise<boolean>;
    loadingResetPassword: boolean;

    errorMsg: string | null;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextType | null>(null);

export const ForgotPasswordProvider = ({ children }: { children: React.ReactNode }) => {

    const [loadingForgotPassword, setLoadingForgotPassword] = useState<boolean>(false);
    const [loadingResetPassword, setLoadingResetPassword] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const forgotPassword = async (email: string): Promise<boolean> => {

        try {
            setLoadingForgotPassword(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Erreur lors de l'envoi de l'email");
                throw new Error(data.message || "Erreur lors de l'envoi de l'email");
            }

            setErrorMsg(null);
            return true;

        } catch (err) {
            console.error(err);
            return false;
        } finally {
            setLoadingForgotPassword(false);
        }
    };

    const resetPassword = async (
        token: string,
        password1: string,
        password2: string
    ): Promise<boolean> => {

        try {
            setLoadingResetPassword(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password1, password2 }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Erreur lors de la réinitialisation du mot de passe");
                throw new Error(data.message || "Erreur lors de la réinitialisation du mot de passe");
            }

            setErrorMsg(null);
            return true;

        } catch (err) {
            console.error(err);
            return false;
        } finally {
            setLoadingResetPassword(false);
        }
    };

    return (
        <ForgotPasswordContext.Provider value={{
            forgotPassword,
            loadingForgotPassword,
            resetPassword,
            loadingResetPassword,
            errorMsg,
        }}>
            {children}
        </ForgotPasswordContext.Provider>
    );
};

export const useForgotPasswordContext = () => {

    const context = useContext(ForgotPasswordContext);

    if (!context) {
        throw new Error("Please use the useForgotPasswordContext hook inside a ForgotPasswordProvider");
    }

    return context;
};