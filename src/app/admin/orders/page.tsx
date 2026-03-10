import { prisma } from "@/lib/prisma";

export default async function AdminOrders() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Orders</h1>
                <p className="subtitle">Track and manage customer orders</p>
            </header>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="empty-state">No orders yet.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="font-mono">{order.id.slice(0, 8)}...</td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.createdAt.toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
