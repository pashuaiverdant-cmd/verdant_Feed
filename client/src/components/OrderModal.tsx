import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL is missing. Check client/.env.production and rebuild.");
}

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
  };
  onClose: () => void;
};

export default function OrderModal({ product, onClose }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  const placeOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          customerName,
          phone,
        }),
        // ✅ removed credentials to avoid CORS issues unless you use cookie auth
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to place order");
      }

      setReceipt(data);
    } catch (err) {
      console.error(err);
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="modal">
        <h2>✅ Order Confirmed</h2>
        <p><b>Order ID:</b> {receipt.orderId}</p>
        <p><b>Product:</b> {receipt.product}</p>
        <p><b>Quantity:</b> {receipt.quantity}</p>
        <p><b>Total:</b> ₹{receipt.totalAmount}</p>

        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="modal">
      <h2>Buy {product.name}</h2>
      <p>Price: ₹{product.price}</p>

      <input
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button disabled={loading} onClick={placeOrder}>
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>

      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
