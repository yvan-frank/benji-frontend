import {BASE_URL, DOMAIN_URL} from "@/lib/url";

export async function generateMetadata({ params }) {
    const menuId = (await params).id;
    let title = "";
    const canonicalUrl = `${DOMAIN_URL}/menu/${menuId}`;
    const response = await fetch(`${BASE_URL}/menu/${menuId}`)

    if (!response.ok) {
        return {
            title: 'Menu not found',
        };
    }

    const menu = await response.json()

    return {
        title: `Menu - ${menu?.menu?.name}: \n ${menu?.menu?.description}`,
        description: menu?.menu?.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            url: canonicalUrl,
            title: `Menu - ${menu?.menu?.name}`,
            description: menu?.menu?.description,
        },
    };
}

export default function MenuLayout({ children }) {
    return <>{children}</>;
}