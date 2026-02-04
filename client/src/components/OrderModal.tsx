import { useState } from "react";

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
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        quantity,
        customerName,
        phone,
      }),
    });

    const data = await res.json();
    setReceipt(data);
    setLoading(false);
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
