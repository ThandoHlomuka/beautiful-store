export const dynamic = "force-dynamic";

export default function AdminDashboard() {
    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Dashboard Overview</h1>
                <p className="subtitle">Welcome back to your store management console.</p>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-card stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-number">Manage Inventory</p>
                    <Link href="/admin/products" className="action-button primary">
                        View Products
                    </Link>
                </div>
                <div className="dashboard-card stat-card">
                    <h3>Recent Orders</h3>
                    <p className="stat-number">Check Sales</p>
                    <Link href="/admin/orders" className="action-button secondary">
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
