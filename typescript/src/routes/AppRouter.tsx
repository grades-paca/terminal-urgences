import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../components/templates/DefaultLayout'
import { HomePage } from '../components/pages/HomePage'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => (
    <BrowserRouter>
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedRoute />}>
                    {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
                </Route>
            </Routes>
        </DefaultLayout>
    </BrowserRouter>
)
