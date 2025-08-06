import { InfoBlock } from "@/shared/components/shared/info-block";

export default function UnauthorizedPAge(){
    return (
        <div className={"flex flex-col items-center justify-center mt-40"}>
            <InfoBlock
                title={"Доступ запрещен"}
                text={"Данную страницу могут просматривать только авторизированные пользователи"}
                imageUrl={"/images/common/lock.png"}
            />
        </div>
    )
}