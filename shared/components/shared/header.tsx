"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui";
import { Container } from "@/shared/components/shared/container";
import { CartButton } from "@/shared/components/shared/cart-button";
import { SearchInput } from "@/shared/components/shared/search-input";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";
import { ProfileButton } from "@/shared/components/shared/profile-button";
import { AuthModal } from "@/shared/components/shared/modals/auth-modal/auth-modal";

type Props = {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: FC<Props> = ({hasSearch = true, hasCart = true, className}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [openAuthModal,setOpenAuthModal] = useState<boolean>(false);

    useEffect(() => {
        let toastMessage = "";

        if (searchParams.has("paid")) {
            toastMessage = "Заказ успешно оплачен! Информация отправлена на почту."
        }

        if (searchParams.has("verified")) {
            toastMessage = "Почта успещно подтверждена"
        }

        if(toastMessage){
            setTimeout(()=>{
                router.replace("/");

                toast.success(toastMessage, {
                    duration: 3000,
                })
            }, 1000)

        }
    }, [])

    return (
        <header className={cn("border-b", className)}>
            <Container className={"flex items-center justify-between py-8"}>
                {/*Левая часть*/}
                <Link href="/">
                    <div className={"flex items-center gap-4"}>
                        <Image src={"/logo.png"} alt={"Logo"} width={35} height={35}/>
                        <div>
                            <h1 className={"text-2xl uppercase font-black"}>Just
                                Pizza</h1>
                            <p className={"text-sm text-gray-400 leading-3"}>вкуснее уже
                                некуда</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className={"mx-10 flex-1"}>
                        <SearchInput/>
                    </div>
                )}

                {/*Правая часть*/}
                <div className={"flex items-center gap-3"}>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

                    <ProfileButton onClickSingIn={() => setOpenAuthModal(true)}/>

                    {hasCart && <CartButton/>}
                </div>
            </Container>
        </header>
    )
}