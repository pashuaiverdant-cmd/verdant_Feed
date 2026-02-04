export default function PrivacyPolicy() {
    return (
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Privacy Policy
            </h1>
            <p className="text-white/80 mt-2">
              How Verdant Feed protects and uses your information
            </p>
          </div>
        </section>
  
        {/* Content */}
        <section className="container-custom py-12">
          <div className="max-w-3xl mx-auto space-y-6">
  
            {[
              {
                title: "Information We Collect",
                text: "We may collect contact details like name, phone, email, and address when you submit forms or inquiries on our website.",
              },
              {
                title: "How We Use Information",
                text: "We use your information to respond to inquiries, improve services, and provide updates related to your requests.",
              },
              {
                title: "Data Protection",
                text: "We implement reasonable security practices to protect your data, but no online transmission is 100% secure.",
              },
              {
                title: "Cookies",
                text: "Our website may use cookies to improve user experience and understand website traffic.",
              },
              {
                title: "Contact",
                text: "For privacy concerns, email us at info@verdantimpact.com.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <h2 className="font-display text-xl font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
  
          </div>
        </section>
      </main>
    );
  }