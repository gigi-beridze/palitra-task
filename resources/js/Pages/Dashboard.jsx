import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductList from "@/Pages/ProductList.jsx";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome to gigi's store!</h2>}
        >
            <Head title="home" />

            <div className="p-12">
                <ProductList  />
            </div>
        </AuthenticatedLayout>
    );
}
