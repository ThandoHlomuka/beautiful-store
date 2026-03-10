import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Add New Product</h1>
                <p className="subtitle">Fill in the details below to add a new product to your store.</p>
            </header>
            <ProductForm />
        </div>
    );
}
