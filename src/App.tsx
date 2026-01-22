import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/Card';
import { BadgeCheck, ShieldCheck, Copy, Check, Mail, ExternalLink } from 'lucide-react';

const DEFAULT_BRAND_NAME = 'ClearPath Planning';

function App() {
  const [brandName, setBrandName] = useState(DEFAULT_BRAND_NAME);
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const AFFILIATE_DISCLOSURE_SHORT = `We may earn a commission if you purchase through links on this site, at no additional cost to you. We only recommend tools we believe add real value.`;

  const AFFILIATE_DISCLOSURE_FULL = `${brandName} participates in affiliate programs. This means we may earn a commission when you click certain links and make a purchase. This commission comes at no additional cost to you.

We recommend products and services we believe can help our readers. Our opinions are our own, and we do not accept payment for positive reviews. Product availability and pricing may change.

If you have questions about our recommendations or disclosures, please contact us.`;

  const copyToClipboard = (text: string, type: 'short' | 'full') => {
    navigator.clipboard.writeText(text);
    if (type === 'short') {
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000);
    } else {
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Affiliate Disclosure Generator
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Create compliant disclosures for your affiliate marketing
              </p>
            </div>
            <ShieldCheck className="h-10 w-10 text-blue-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Customization Section */}
        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Customize Your Disclosure</h2>
              <p className="mt-2 text-gray-600">
                Enter your brand name to personalize the disclosure text.
              </p>

              <div className="mt-6">
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value || DEFAULT_BRAND_NAME)}
                  className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your brand name"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Disclosures Section */}
        <section id="disclosures" className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">Your Disclosures</h2>
              <p className="mt-2 text-gray-600">
                Copy and paste these into your website, blog posts, or social media.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Short Disclosure */}
              <Card className="rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Short Disclosure</CardTitle>
                  <CardDescription>Use this near buttons/links.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-2xl border bg-slate-50/70 p-4 text-sm text-gray-700">
                    {AFFILIATE_DISCLOSURE_SHORT}
                    <button
                      onClick={() => copyToClipboard(AFFILIATE_DISCLOSURE_SHORT, 'short')}
                      className="absolute top-3 right-3 p-2 rounded-lg hover:bg-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedShort ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Best Practices */}
              <Card className="rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">What to Include</CardTitle>
                  <CardDescription>
                    Keep it clear: what links are, and what happens if someone buys.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  {[
                    'State you may earn a commission',
                    "Confirm there's no extra cost to the reader",
                    'Explain you only recommend products you believe help',
                    'Place it where people will actually see it',
                  ].map((x) => (
                    <div key={x} className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span>{x}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Full Disclosure */}
            <div className="mt-8 space-y-4">
              <Card className="rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Full Disclosure</CardTitle>
                  <CardDescription>
                    Use this on your dedicated disclosure/terms page.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <div className="relative rounded-2xl border bg-slate-50/70 p-5">
                    {AFFILIATE_DISCLOSURE_FULL.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-3' : ''}>
                        {paragraph}
                      </p>
                    ))}
                    <button
                      onClick={() => copyToClipboard(AFFILIATE_DISCLOSURE_FULL, 'full')}
                      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedFull ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Placement Tips */}
              <div className="rounded-3xl border bg-white/70 p-5 shadow-sm">
                <div className="flex items-center gap-2 font-medium text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-blue-600" /> Placement Tips
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  <li>Above the fold on review/comparison pages</li>
                  <li>Directly above CTA buttons ("Check price")</li>
                  <li>In the footer site-wide</li>
                  <li>In your site's dedicated disclosure or legal page</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
                <p className="mt-2 text-gray-600">
                  Questions, partnerships, or resource requests—send a message.
                </p>

                <div className="mt-6 grid gap-3">
                  <Card className="rounded-3xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Partnership Notes</CardTitle>
                      <CardDescription>
                        We only accept partnerships that fit our audience.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-blue-600" />
                        Must align with our content
                      </div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-blue-600" />
                        Quality products only
                      </div>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-blue-600" />
                        Transparent commission structure
                      </div>
                    </CardContent>
                  </Card>

                  <div className="rounded-3xl border bg-blue-50/50 p-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Response Time
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      We typically respond within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? (
                      <>
                        <Check className="h-5 w-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              Affiliate Disclosure Generator - Stay compliant with transparency
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#disclosures"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                Disclosures
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                Contact
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
