import React, { useState } from "react";
import { UserRound, Lock, Eye, EyeOff } from "lucide-react";
import "./Login.css";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="login">
            <div className="login-container">
                <div className="login-form">
                    <img
                        src="/logo.svg"
                        alt="Login Icon"
                        className="login-icon"
                    />

                    <h1>Please log in</h1>

                    <form>
                        <div className="input-group">
                            <label>Email</label>

                            <div className="input-wrapper">
                                <UserRound className="input-icon" />

                                <input
                                    type="email"
                                    placeholder="Digite seu email"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Senha</label>

                            <div className="input-wrapper">
                                <Lock className="input-icon" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="bottom-links">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="remember"
                                />
                                <label htmlFor="remember">
                                    Lembrar-me
                                </label>
                            </div>

                            <a href="/forgot-password">
                                Esqueci minha senha
                            </a>
                        </div>

                        <div className="button-zone">
                            <button
                                type="submit"
                                className="login-button"
                            >
                                Entrar
                            </button>
                        </div>

                        <div className="divider">
                            <span>Ou continue com</span>
                        </div>

                        <div className="social-login">
                            <button className="social-btn google">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                />
                                Google
                            </button>

                            <button className="social-btn github">
                                <img
                                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                                    alt="GitHub"
                                />
                                GitHub
                            </button>
                        </div>

                        <div className="register-link">
                            <span>Não possui uma conta?</span>
                            <a href="/register">Criar conta</a>
                        </div>
                    </form>




                </div>
            </div>
        </section>
    );
}