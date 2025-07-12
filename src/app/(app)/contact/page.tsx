"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Mail, MessageCircle, Instagram, Youtube, Music } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="text-xl text-gray-300">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Inquiry Type
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="speaking">
                      Speaking Opportunity
                    </SelectItem>
                    <SelectItem value="sponsor">Sponsorship</SelectItem>
                    <SelectItem value="join-team">Join the Team</SelectItem>
                    <SelectItem value="media">Media & Press</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 text-white hover:bg-red-700"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">hello@universe.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="mr-3 h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Discord</p>
                    <p className="text-gray-600">
                      Join our community for instant support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discord
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Music className="mr-2 h-4 w-4" />
                  TikTok
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Quick Response
              </h3>
              <p className="mb-4 text-gray-600">
                For the fastest response, join our Discord community where our
                team and community members are active daily.
              </p>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Discord Now
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                How do I join UniVerse?
              </h3>
              <p className="text-gray-600">
                Simply click the "Join Discord" button and follow the onboarding
                process. Membership is free for all students!
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                Are events free to attend?
              </h3>
              <p className="text-gray-600">
                Yes! All our events, workshops, and hackathons are completely
                free for UniVerse community members.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                Can I host an event or workshop?
              </h3>
              <p className="text-gray-600">
                We encourage community members to share their expertise. Contact
                us to discuss your event idea.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                Do you offer mentorship programs?
              </h3>
              <p className="text-gray-600">
                Yes, we connect students with mentors in their field of
                interest. Join our Discord to learn more about our mentorship
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
