"use client";

import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL is missing. Check client/.env.production and rebuild.");
}

export default function Products() {
  const { t } = useTranslation();

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
      alert(t("products.alertRequired", "Please fill all required fields"));
      return;
    }

    if (!selectedProduct) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
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

      const data = await res.json().catch(() => null);
      if (!res.ok)
        throw new Error(
          data?.message || t("products.alertFailed", "Failed to place order")
        );

      setReceipt(data);
    } catch (err: any) {
      alert(err.message || t("products.alertGeneric", "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 font-sans">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-center mb-12 text-primary">
          {t("products.pageTitle", "Buy Livestock Feed")}
        </h1>

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
                className="group border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-semibold tracking-tight text-primary transition-colors duration-200 group-hover:text-primary/80">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground font-sans">
                    {product.description}
                  </p>

                  <p className="font-sans text-lg font-semibold text-primary mt-1">
                    ₹{product.price / 100}
                  </p>

                  <Button
                    className="mt-4 w-full font-sans"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {t("products.buyNow", "Buy Now")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 font-sans">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              className="absolute right-4 top-4"
              onClick={closeModal}
              aria-label={t("common.close", "Close")}
            >
              <X />
            </button>

            {!receipt ? (
              <>
                <h2 className="text-xl font-serif font-semibold tracking-tight mb-4 text-primary">
                  {t("products.modalTitle", "Buy {{product}}", {
                    product: selectedProduct.name,
                  })}
                </h2>

                <input
                  placeholder={t("products.name", "Name *")}
                  className="border p-2 w-full mb-2 rounded font-sans"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder={t("products.mobile", "Mobile *")}
                  className="border p-2 w-full mb-2 rounded font-sans"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <input
                  placeholder={t("products.emailOptional", "Email (optional)")}
                  className="border p-2 w-full mb-2 rounded font-sans"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                  placeholder={t("products.address", "Address *")}
                  className="border p-2 w-full mb-4 rounded font-sans"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <Button
                  onClick={submitOrder}
                  disabled={loading}
                  className="w-full font-sans"
                >
                  {loading
                    ? t("products.placingOrder", "Placing Order...")
                    : t("products.confirmOrder", "Confirm Order")}
                </Button>
              </>
            ) : (
              <>
                <h2 className="font-serif font-semibold tracking-tight text-lg mb-2 text-primary">
                  {t("products.orderPlaced", "Order Placed ✅")}
                </h2>

                <div className="text-sm space-y-1 font-sans text-muted-foreground">
                  <p>
                    <strong>{t("products.orderId", "Order ID")}:</strong>{" "}
                    {receipt.id}
                  </p>
                  <p>
                    <strong>{t("products.product", "Product")}:</strong>{" "}
                    {selectedProduct.name}
                  </p>
                  <p>
                    <strong>{t("products.nameLabel", "Name")}:</strong> {name}
                  </p>
                  <p>
                    <strong>{t("products.mobileLabel", "Mobile")}:</strong>{" "}
                    {mobile}
                  </p>
                  {email && (
                    <p>
                      <strong>{t("products.emailLabel", "Email")}:</strong>{" "}
                      {email}
                    </p>
                  )}
                  <p>
                    <strong>{t("products.addressLabel", "Address")}:</strong>{" "}
                    {address}
                  </p>
                  <p>
                    <strong>{t("products.amount", "Amount")}:</strong> ₹
                    {selectedProduct.price / 100}
                  </p>
                </div>

                <Button className="mt-4 w-full font-sans" onClick={closeModal}>
                  {t("common.close", "Close")}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
