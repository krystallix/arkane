"use client"

import { useState } from "react"
import { FadeInSection } from "@/components/fade-in-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SERVICES = [
  "Mobile App",
  "Website Design",
  "Branding",
  "Web Development",
  "Illustration",
  "Logo Design",
  "Graphic Design",
]

// Ganti dengan nomor WA tujuan (format internasional tanpa + atau spasi)
const WA_NUMBER = "6281234567890"

export function ContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const handleSendWA = () => {
    const servicesText =
      selectedServices.length > 0 ? selectedServices.join(", ") : "-"

    const text = [
      `Hi! I'd like to get in touch 👋`,
      ``,
      `*Name:* ${name || "-"}`,
      `*Email:* ${email || "-"}`,
      `*Company:* ${company || "-"}`,
      `*Services:* ${servicesText}`,
      `*Message:* ${message || "-"}`,
    ].join("\n")

    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank")
  }

  return (
    <section id="contact" className="flex flex-col px-0 md:px-8 pb-32">
      <FadeInSection>
        <div className="flex flex-col gap-12 pt-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-zinc-400">Say Hi! </span>
              <span className="text-zinc-900 dark:text-zinc-50">
                and tell me
                <br />
                about your idea
              </span>
            </h2>
            <p className="mt-4 text-lg font-medium text-zinc-600 dark:text-zinc-400">
              Have a nice works? Reach out and let's chat.
            </p>
          </div>

          <div className="flex max-w-3xl flex-col gap-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <Label htmlFor="name" className="text-base font-semibold">
                  Name*
                </Label>
                <Input
                  id="name"
                  placeholder="Hello..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-none border-0 border-b-2 border-zinc-200 bg-transparent px-0 pb-3 text-base shadow-none focus-visible:border-zinc-900 focus-visible:ring-0 dark:border-zinc-800 dark:focus-visible:border-zinc-50"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Where can I reply?"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-0 border-b-2 border-zinc-200 bg-transparent px-0 pb-3 text-base shadow-none focus-visible:border-zinc-900 focus-visible:ring-0 dark:border-zinc-800 dark:focus-visible:border-zinc-50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="company" className="text-base font-semibold">
                Company Name
              </Label>
              <Input
                id="company"
                placeholder="Your company or website?"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-none border-0 border-b-2 border-zinc-200 bg-transparent px-0 pb-3 text-base shadow-none focus-visible:border-zinc-900 focus-visible:ring-0 dark:border-zinc-800 dark:focus-visible:border-zinc-50"
              />
            </div>

            <div className="space-y-5">
              <Label className="text-base font-semibold">
                What's in your mind?*
              </Label>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                          : "border-zinc-300 bg-transparent text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
                      }`}
                    >
                      {service}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Label htmlFor="message" className="text-base font-semibold">
                Message
              </Label>
              <Input
                id="message"
                placeholder="Tell me more about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-none border-0 border-b-2 border-zinc-200 bg-transparent px-0 pb-3 text-base shadow-none focus-visible:border-zinc-900 focus-visible:ring-0 dark:border-zinc-800 dark:focus-visible:border-zinc-50"
              />
            </div>

            <div className="pt-4">
              <Button
                type="button"
                size="lg"
                onClick={handleSendWA}
                className="h-14 w-full gap-2 rounded-full px-8 text-base font-medium sm:w-auto"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
