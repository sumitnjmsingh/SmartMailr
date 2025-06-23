import {
  Sparkles,
  MailOpen,
  Lock,
  Wand2,
  CalendarCheck,
  Globe2,
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      title: "AI Email Generation",
      desc: "Describe what you want to say, and get a professional email instantly using Gemini AI.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Save & Manage Emails",
      desc: "Every email you generate is saved to your dashboard for future editing or copying.",
      icon: <MailOpen className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Secure Auth with Clerk",
      desc: "Authenticate securely with Clerk—sign in via Google, GitHub, or email.",
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Smart Suggestions",
      desc: "AI improves your prompt with intelligent suggestions and tone adjustments.",
      icon: <Wand2 className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Timely Follow-Ups",
      desc: "Generate polite follow-up emails or reminders based on previous conversations.",
      icon: <CalendarCheck className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "24/7 Web Access",
      desc: "Fully web-based and mobile-optimized — use it anywhere, anytime.",
      icon: <Globe2 className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          What You Can Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-indigo-700">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
