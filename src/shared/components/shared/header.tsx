"use client"
import { cn } from '@/shared/lib/utils';
import React from 'react'
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '@/shared/components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams()
    const router = useRouter();
    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Order has been paid successfully';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Account successfully verified';
        }

        if (toastMessage) {
            setTimeout(() => {
                toast.success(toastMessage);

                // Remove all query parameters from the URL
                router.replace('/');
            }, 500);

        }
    }, []);
    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>

                {/* Left side */}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' alt='Logo' width={35} height={35} />
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Pizza Hub</h1>
                            <p className='text-sm text-gray-400 leading-3'> Where Every Slice is Paradise</p>
                        </div>
                    </div>
                </Link>

                {/* Search panel */}
                {
                    hasSearch && <div className='mx-10 flex-1 '>
                        <SearchInput />
                    </div>
                }

                {/* Right side */}
                <div className='flex items-center gap-4'>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    {
                        hasCart && <div>
                            <CartButton />
                        </div>
                    }

                </div>

            </Container>
        </header>
    )
}