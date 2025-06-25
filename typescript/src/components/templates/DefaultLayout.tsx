import { useLogin, useMe } from '@features/auth/useAuth';
import { FormEvent, ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: user, isLoading } = useMe();
    const loginMutation = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ username, password });
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');

        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div>
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: '#eee',
                }}
            >
                <div>
                    <Link to="/">🧙‍♂️ MonLogo</Link>
                </div>

                <div>
                    {!user ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <form
                                onSubmit={handleLogin}
                                style={{ display: 'flex', gap: '0.5rem' }}
                            >
                                <input
                                    type="text"
                                    placeholder="UserName"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? 'Connexion...'
                                        : 'Connexion'}
                                </button>
                            </form>

                            {loginMutation.isError && (
                                <div
                                    style={{
                                        color: 'red',
                                        marginTop: '0.5rem',
                                    }}
                                >
                                    {(loginMutation.error as Error)?.message ||
                                        'Erreur inconnue'}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <span>Connecté en tant que {user.username}</span>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </div>
                    )}
                </div>
            </header>

            <main style={{ padding: '2rem' }}>{children}</main>
        </div>
    );
};
