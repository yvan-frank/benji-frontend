import {use} from "react";
import ModernMenu from "@/app/(main)/menu/component/ModernMenu";

export default function Page({ params }) {
    const { id } = use(params)
    return (
        <div>
            <ModernMenu slug={id} />
        </div>
    )
}