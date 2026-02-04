export default function Terms() {
    return (
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Terms of Use
            </h1>
            <p className="text-white/80 mt-2">
              Rules and guidelines for using Verdant Feed
            </p>
          </div>
        </section>
  
        {/* Content */}
        <section className="container-custom py-12">
          <div className="max-w-3xl mx-auto space-y-6">
  
            {[
              {
                title: "Acceptance of Terms",
                text: "By using this website, you agree to comply with these Terms and all applicable laws.",
              },
              {
                title: "Website Usage",
                text: "You agree not to misuse the website, attempt unauthorized access, or disrupt services.",
              },
              {
                title: "Orders & Services",
                text: "Submitting inquiries does not guarantee confirmation. Our team may contact you for details.",
              },
              {
                title: "Intellectual Property",
                text: "All branding, content, and design elements belong to Verdant Feed Solutions.",
              },
              {
                title: "Limitation of Liability",
                text: "We are not liable for indirect damages resulting from use of this website.",
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