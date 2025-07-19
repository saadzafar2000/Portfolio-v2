import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "msaadzafar2000@gmail.com",
    href: "mailto:msaadzafar2000@gmail.com",
    bg: "bg-blue-700",
    iconColor: "text-white",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/msaadzafar2000",
    href: "https://github.com/saadzafar2000",
    bg: "bg-gray-700",
    iconColor: "text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/muhammad-saad-zafar",
    href: "https://www.linkedin.com/in/muhammad-saad-zafar-39017b189/",
    bg: "bg-blue-800",
    iconColor: "text-white",
  },
];

// LeetCode SVG
const LeetCodeIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.5 36.5L14 25.5L35.5 14.5"
      stroke="#FFA116"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 25.5H35.5"
      stroke="#000"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// HackerRank SVG
const HackerRankIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="8" y="8" width="34" height="34" rx="8" fill="#2EC866" />
    <path d="M25 15V35" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 25H32" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
// Stack Overflow SVG
const StackOverflowIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="8" y="8" width="34" height="34" rx="8" fill="#F48024" />
    <path
      d="M18 35V30H32V35"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M20 28L30 32"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M22 24L32 28"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M24 20L34 24"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const codingPlatforms = [
  {
    icon: LeetCodeIcon,
    label: "LeetCode",
    href: "https://leetcode.com",
    bg: "bg-white",
    iconColor: "",
  },
  {
    icon: HackerRankIcon,
    label: "HackerRank",
    href: "https://hackerrank.com",
    bg: "bg-white",
    iconColor: "",
  },
  {
    icon: StackOverflowIcon,
    label: "Stack Overflow",
    href: "https://stackoverflow.com",
    bg: "bg-white",
    iconColor: "",
  },
];

const ProfessionalSummary = () => (
  <Card className="glowing-card bg-gray-900/70 border-gray-800 rounded-xl transition-all duration-300 overflow-hidden h-full flex flex-col justify-center">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-white">
        Professional Summary
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-300 text-base mb-8">
        I'm a passionate Full Stack Developer based in Frankfurt, Germany, with
        over 4 years of experience crafting innovative digital products for
        diverse industries and clients—including U.S.-based businesses. Let's
        build something extraordinary together.
      </p>
      <div className="space-y-4 mb-8">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <span
              className={`w-11 h-11 flex items-center justify-center rounded-full ${method.bg} ${method.iconColor} text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
            >
              <method.icon className="w-6 h-6" />
            </span>
            <div className="flex flex-col">
              <span className="text-white font-medium leading-tight">
                {method.label}
              </span>
              <span className="text-gray-300 text-sm leading-tight">
                {method.value}
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="flex gap-6 mt-4">
        {codingPlatforms.map((platform) => (
          <a
            key={platform.label}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-transparent text-3xl transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_16px_4px_rgba(36,160,255,0.25)] hover:scale-110`}
            aria-label={platform.label}
          >
            <platform.icon />
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "82927390-3cc2-4ef8-8ce2-2249f91f37cc",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! I will get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glowing-card bg-gray-900/70 border-gray-800 rounded-xl transition-all duration-300 overflow-hidden h-full flex flex-col justify-center">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white">
          Let's Talk
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm sm:text-base font-semibold text-white"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-blue-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-colors text-sm sm:text-base"
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-semibold text-white"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-blue-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-colors text-sm sm:text-base"
              placeholder="Your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm sm:text-base font-semibold text-white"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="bg-transparent border border-blue-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-colors resize-none text-sm sm:text-base"
              placeholder="Your message"
              required
            />
          </div>
          {submitStatus.type && (
            <div
              className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                submitStatus.type === "success"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"} <Send size={18} className="sm:w-5 sm:h-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-title">Let's Connect</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-4">
          Ready to bring your ideas to life? Let's discuss your next project and
          create something extraordinary together.
        </p>
      </div>

      {/* Centered Contact Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <ContactForm />

        {/* Social Links Below Form */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Or connect with me directly</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full ${method.bg} ${method.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                >
                  <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
                  {method.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
