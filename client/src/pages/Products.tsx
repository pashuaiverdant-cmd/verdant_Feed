"use client";

import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const { data: products = [], isLoading } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  const closeModal = () => {
    setSelectedProduct(null);
    setReceipt(null);
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  };

  const submitOrder = async () => {
    if (!name || !mobile || !address) {
      alert("Please fill all required fields");
      return;
    }

    if (!selectedProduct) return;

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          customerName: name,
          phone: mobile,
          email: email || null,
          address,
          amount: selectedProduct.price,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      setReceipt(data);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-12">
          Buy Livestock Feed
        </h1>

        {/* Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition"
              >
                {/* ✅ IMAGE FIX: consistent container + no stretching */}
                <div className="w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="font-semibold mt-2">₹{product.price / 100}</p>

                  <Button
                    className="mt-4 w-full"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button className="absolute right-4 top-4" onClick={closeModal}>
              <X />
            </button>

            {!receipt ? (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Buy {selectedProduct.name}
                </h2>

                <input
                  placeholder="Name *"
                  className="border p-2 w-full mb-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Mobile *"
                  className="border p-2 w-full mb-2 rounded"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <input
                  placeholder="Email (optional)"
                  className="border p-2 w-full mb-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                  placeholder="Address *"
                  className="border p-2 w-full mb-4 rounded"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <Button
                  onClick={submitOrder}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Placing Order..." : "Confirm Order"}
                </Button>
              </>
            ) : (
              <>
                <h2 className="font-bold text-lg mb-2">Order Placed ✅</h2>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Order ID:</strong> {receipt.id}
                  </p>
                  <p>
                    <strong>Product:</strong> {selectedProduct.name}
                  </p>
                  <p>
                    <strong>Name:</strong> {name}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {mobile}
                  </p>
                  {email && (
                    <p>
                      <strong>Email:</strong> {email}
                    </p>
                  )}
                  <p>
                    <strong>Address:</strong> {address}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{selectedProduct.price / 100}
                  </p>
                </div>

                <Button className="mt-4 w-full" onClick={closeModal}>
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}