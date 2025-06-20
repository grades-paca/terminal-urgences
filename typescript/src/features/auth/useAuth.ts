import {useMutation, useQuery} from '@tanstack/react-query'
import {useLocation, useNavigate} from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

const getToken = () => localStorage.getItem('jwt')

export const useLogin = () => {
    const navigate = useNavigate()
    const location = useLocation();

    return useMutation({
        mutationFn: async ({username, password}: { username: string; password: string }) => {
            const res = await fetch(API_URL + '/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            })

            if (!res.ok) throw new Error('Identifiants incorrects. Veuillez vérifier votre nom d’utilisateur et votre mot de passe.')

            const data = await res.json()
            localStorage.setItem('jwt', data.token)
            return data
        },
        onSuccess: () => {
            if (location.pathname === '/') {
                window.location.reload();
            } else {
                navigate('/');
            }
        },
        onError: (err) => {
            console.error('Échec du login :', err)
        },
    })
}

export const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const token = getToken()
            if (!token) throw new Error('Non authentifié')

            const res = await fetch(API_URL + '/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!res.ok) throw new Error('Utilisateur non valide')
            return res.json()
        },
        retry: false,
    })
}
