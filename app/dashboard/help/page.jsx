"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toaster } from "@/utils/toaster";
import { Loader } from "lucide-react";

const FAQS = [
  {
    q: "How do I generate a caption?",
    a: "Go to the Generate page, enter your idea and preferences, and click Generate Caption. Your captions will appear below.",
  },
  {
    q: "Can I edit or save captions?",
    a: "Yes! Use the Edit, Save, or Copy buttons next to each generated caption.",
  },
  {
    q: "How do I change the platform or tone?",
    a: "Select your preferred platform and tone from the dropdowns before generating captions.",
  },
  {
    q: "Is there a limit to how many captions I can generate?",
    a: "There is no strict limit for basic use. For higher usage, check our Pricing page.",
  },
  {
    q: "How do I contact support?",
    a: "Use the contact form below or email us at 07m.alam@gmail.com.",
  },
  {
    q: "Can I use Caption Crafter for business accounts?",
    a: "Yes, Caption Crafter supports both personal and business social media accounts.",
  },
  {
    q: "Is Caption Crafter free?",
    a: "There is a free tier with basic features. For advanced features, see our Pricing page.",
  },
  {
    q: "How do I reset my password?",
    a: "Go to the login page and click 'Forgot Password' to receive a reset link.",
  },
  {
    q: "What platforms are supported?",
    a: "Instagram, Twitter, Facebook, LinkedIn, and more are supported.",
  },
  {
    q: "Can I request a new feature?",
    a: "Yes! Please use the contact form to send us your suggestions.",
  },
];

function Accordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 4;
  const visibleFaqs = showAll ? faqs : faqs.slice(0, VISIBLE_COUNT);
  return (
    <div className="space-y-2">
      {visibleFaqs.map((faq, idx) => (
        <div key={idx} className="border rounded-lg bg-white dark:bg-zinc-900">
          <button
            className="w-full text-left px-4 py-3 font-medium focus:outline-none flex justify-between items-center"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <span>{faq.q}</span>
            <span>{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx && (
            <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
      {faqs.length > VISIBLE_COUNT && (
        <button
          className="block mx-auto mt-2 text-primary underline text-sm"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll
            ? "Show less"
            : `Show more (${faqs.length - VISIBLE_COUNT} more)`}
        </button>
      )}
    </div>
  );
}

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    // console.log("Form data:", data);
    // return
    setIsSubmitting(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toaster("Thank you! We received your message.");
        reset();
      } else {
        toaster("Failed to send message. Please try again.");
      }
    } catch (e) {
      toaster("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-6 mt-8 max-w-md mx-auto"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-sm text-muted-foreground">
          Fill out the form and we’ll get back to you soon.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            {...register("name", { required: "Name is required" })}
            required
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-message">Message</Label>
          <textarea
            id="contact-message"
            className="w-full border rounded p-2 min-h-[96px]"
            {...register("message", { required: "Message is required" })}
            rows={3}
          />
          {errors.message && (
            <span className="text-red-500 text-xs">
              {errors.message.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <div className="flex gap-2 items-center"><Loader/>Sending...</div> : "Send"}
        </Button>
      </div>
    </form>
  );
}

export default function HelpPage() {
  return (
    <div className="max-w-4xl w-full mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">
        Help & Support
      </h1>
      <p className="mb-8 text-muted-foreground">
        Find answers, tutorials, and ways to contact us below.
      </p>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Frequently Asked Questions
        </h2>
        <Accordion faqs={FAQS} />
      </section>

      <div className="w-[100%] h-px bg-border my-10" />
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          How to Use Caption Crafter
        </h2>
        <div className="flex flex-col items-center gap-7">
          <video
            className="rounded-lg border w-full max-w-md"
            controls
            poster="/help-thumb.png"
          >
            <source src="https://youtu.be/N1JTC3zveLI" type="video/mp4" />
            Sorry, your browser does not support embedded videos.
          </video>
          <p className="text-sm text-muted-foreground">
            Watch this quick demo to see how to generate, edit, and save
            captions.
          </p>
        </div>
      </section>

      <div className="w-[100%] h-px bg-border my-10" />
      <section>
        <ContactForm />
      </section>
    </div>
  );
}
