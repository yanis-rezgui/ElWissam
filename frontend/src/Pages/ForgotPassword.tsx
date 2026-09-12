import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useForgotPasswordContext } from "../Contexts/ForgotPasswordContext";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const { forgotPassword, loadingForgotPassword, errorMsg } = useForgotPasswordContext();

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await forgotPassword(email);

        if (success) {
            setSent(true);
        }
    };

    return (
        <section className="min-h-screen flex flex-col w-full bg-gray-100 items-center">

            <div className="w-[1400px] h-full flex flex-row justify-between items-center gap-5 bg-white p-5 shadow-2xl
            mt-10 rounded-[10px] max-[1450px]:w-[1000px] max-[1050px]:flex-col max-[1050px]:gap-10 max-[1050px]:w-[600px]
            max-[650px]:w-[350px] mb-10
            ">
                <img
                    src="https://res.cloudinary.com/dub4fhabm/image/upload/v1788108591/179be5a3-f9a4-4db7-bbd1-b953c4003bcd.png"
                    alt=""
                    className="h-full object-cover order-1 max-[1050px]:order-2"
                />

                <div className="order-2 max-[1050px]:order-1 w-full flex flex-col items-center px-6 py-10">

                    {!sent ? (
                        <>
                            <div className="w-14 h-14 rounded-full bg-[#222344] flex items-center justify-center mb-5">
                                <Mail size={24} className="text-[#cdad7d]" />
                            </div>

                            <p className="text-[1.5em] font-black text-[#222344] text-center">
                                Mot de passe oublié ?
                            </p>

                            <p className="text-gray-500 text-[14.5px] text-center mt-3 max-w-[380px]">
                                Entrez votre adresse email et nous vous enverrons un lien
                                pour réinitialiser votre mot de passe.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full max-w-[380px] flex flex-col gap-4 mt-8">

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13.5px] font-semibold text-[#222344]">
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="exemple@email.com"
                                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[14px]
                                        outline-none focus:border-[#222344] transition-all duration-200"
                                    />
                                </div>

                                {errorMsg && (
                                    <p className="text-red-500 text-[13px] font-medium -mt-1">
                                        {errorMsg}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loadingForgotPassword}
                                    className="w-full bg-[#222344] text-white font-semibold text-[14px] py-2.5
                                    rounded-lg transition-all duration-200 hover:bg-[#2f3159] active:scale-95
                                    disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                >
                                    {loadingForgotPassword ? "Envoi en cours..." : "Envoyer le lien"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/profile")}
                                    className="flex items-center justify-center gap-2 w-full text-[#222344]
                                    font-semibold text-[13.5px] py-2 transition-all duration-200 hover:opacity-70"
                                >
                                    <ArrowLeft size={15} />
                                    Retour à la connexion
                                </button>

                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center max-w-[380px]">

                            <div className="w-14 h-14 rounded-full bg-[#222344] flex items-center justify-center mb-5">
                                <CheckCircle2 size={26} className="text-[#cdad7d]" />
                            </div>

                            <p className="text-[1.5em] font-black text-[#222344]">
                                Email envoyé
                            </p>

                            <p className="text-gray-500 text-[14.5px] mt-3">
                                Si un compte existe avec l'adresse <strong>{email}</strong>,
                                un lien de réinitialisation vient de lui être envoyé. Pensez à
                                vérifier vos spams.
                            </p>

                            <button
                                onClick={() => navigate("/profile")}
                                className="flex items-center justify-center gap-2 mt-8 bg-[#222344] text-white
                                font-semibold text-[14px] py-2.5 px-6 rounded-lg transition-all duration-200
                                hover:bg-[#2f3159] active:scale-95"
                            >
                                <ArrowLeft size={16} />
                                Retour à la connexion
                            </button>
                        </div>
                    )}

                </div>
            </div>

        </section>
    );
};

export default memo(ForgotPassword);