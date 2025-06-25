import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '@templates/DefaultLayout'
import { HomePage } from '@pages/HomePage'
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
