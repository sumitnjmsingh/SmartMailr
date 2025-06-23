"use client";

import { PencilLine, Sparkles, ClipboardList, Send, LogIn } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <PencilLine className="w-6 h-6 text-indigo-600" />,
      title: "Describe Your Email",
      description:
        "Share the purpose — like job inquiry, follow-up, or a personal message.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      title: "AI Generates It Instantly",
      description:
        "Our Gemini-powered AI crafts a professional email tailored to your prompt.",
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
      title: "Review & Edit",
      description:
        "Easily review, edit, and save the email in your dashboard before sending.",
    },
    {
      icon: <Send className="w-6 h-6 text-indigo-600" />,
      title: "Send or Refine",
      description:
        "Once satisfied, copy or send the email. You’re always in control.",
    },
    {
      icon: <LogIn className="w-6 h-6 text-indigo-600" />,
      title: "Important: Log in to Resend",
      description:
        "To send emails using our service, please ensure you're logged in to your Resend account.",
      action: (
        <a
          href="https://resend.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
        >
          🔗 Go to Resend
        </a>
      ),
    },
  ];

  return (
    <section className="py-20 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Write professional emails effortlessly with AI. Here’s how simple it
          is.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-indigo-50 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-md">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
                {step.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
