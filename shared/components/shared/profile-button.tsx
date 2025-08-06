import { FC } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/shared/components/ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

type Props = {
    onClickSingIn: () => void;
    className?: string;
}

export const ProfileButton: FC<Props> = ({onClickSingIn, className}) => {
    const {data: session} = useSession();

    return (
        <div className={className}>
            {
                !session ? (
                    <Button
                        onClick={onClickSingIn}
                        variant={"outline"}
                        className={"flex items-center gap-1"}
                    >
                        <User size={16}/>
                        Войти
                    </Button>
                ) : (
                    <Link href={"profile"}>
                        <Button variant={"secondary"}
                                className={"flex items-center gap-2"}>
                            <CircleUser size={18}/>
                            Профиль
                        </Button>
                    </Link>
                )
            }
        </div>
    )
}