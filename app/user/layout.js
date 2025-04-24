export default async function UserLayout({ children }) {


    return (
        <div>
            <h2>Header user </h2>
            <main>{children}</main>
        </div>
    );
}