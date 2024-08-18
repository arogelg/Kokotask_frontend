import { Link, Navigate, Outlet } from 'react-router-dom';
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/logo';
import NavMenu from '@/components/NavMenu';
import { useAuth } from '@/hooks/useAuth';

export default function AppLayout() {

    const {data, isLoading, isError} = useAuth();

    if(isLoading) return 'Loading...'
    if(isError) {
        return <Navigate to='/auth/login'/>
    }

    if(data)return (
        <>
            <header className= 'bg-gradient-to-br from-customPink to-customPurple py-5'>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center w-full px-4'>
                    <div className='w-64'>
                        <Link to={'/'}>
                            <Logo/>
                        </Link>
                    </div>

                    <NavMenu
                        name={data.name}
                    />
                    
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
                <Outlet />
            </section>

            <footer className = 'py-5'>
                <p className='text-center'>
                    All rights reserved for {new Date().getFullYear()}
                </p>            
            </footer>

            <ToastContainer

                pauseOnFocusLoss={false}
                pauseOnHover={false}

            />
        </>
    );
}
