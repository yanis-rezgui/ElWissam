import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KeyRound, CheckCircle2, ArrowLeft } from "lucide-react";
import { useForgotPasswordContext } from "../Contexts/ForgotPasswordContext";

const ResetPassword = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const { resetPassword, loadingResetPassword, errorMsg } = useForgotPasswordContext();

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) return;

        const success = await resetPassword(token, password1, password2);

        if (success) {
            setDone(true);
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

                    {!done ? (
                        <>
                            <div className="w-14 h-14 rounded-full bg-[#222344] flex items-center justify-center mb-5">
                                <KeyRound size={24} className="text-[#cdad7d]" />
                            </div>

                            <p className="text-[1.5em] font-black text-[#222344] text-center">
                                Nouveau mot de passe
                            </p>

                            <p className="text-gray-500 text-[14.5px] text-center mt-3 max-w-[380px]">
                                Choisissez un nouveau mot de passe pour votre compte.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full max-w-[380px] flex flex-col gap-4 mt-8">

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13.5px] font-semibold text-[#222344]">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[14px]
                                        outline-none focus:border-[#222344] transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13.5px] font-semibold text-[#222344]">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[14px]
                                        outline-none focus:border-[#222344] transition-all duration-200"
                                    />
                                </div>

                                <p className="text-gray-400 text-[12px] -mt-1">
                                    8 caractères minimum, avec une majuscule, un chiffre et un
                                    caractère spécial (@$!%*?&).
                                </p>

                                {errorMsg && (
                                    <p className="text-red-500 text-[13px] font-medium -mt-1">
                                        {errorMsg}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loadingResetPassword}
                                    className="w-full bg-[#222344] text-white font-semibold text-[14px] py-2.5
                                    rounded-lg transition-all duration-200 hover:bg-[#2f3159] active:scale-95
                                    disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                >
                                    {loadingResetPassword ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
                                </button>

                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center max-w-[380px]">

                            <div className="w-14 h-14 rounded-full bg-[#222344] flex items-center justify-center mb-5">
                                <CheckCircle2 size={26} className="text-[#cdad7d]" />
                            </div>

                            <p className="text-[1.5em] font-black text-[#222344]">
                                Mot de passe réinitialisé
                            </p>

                            <p className="text-gray-500 text-[14.5px] mt-3">
                                Votre mot de passe a bien été mis à jour. Vous pouvez
                                maintenant vous connecter avec vos nouveaux identifiants.
                            </p>

                            <button
                                onClick={() => navigate("/profile")}
                                className="flex items-center justify-center gap-2 mt-8 bg-[#222344] text-white
                                font-semibold text-[14px] py-2.5 px-6 rounded-lg transition-all duration-200
                                hover:bg-[#2f3159] active:scale-95"
                            >
                                <ArrowLeft size={16} />
                                Se connecter
                            </button>
                        </div>
                    )}

                </div>
            </div>

        </section>
    );
};

export default memo(ResetPassword);