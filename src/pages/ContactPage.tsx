import React, { useState } from 'react';
import { RestaurantSettings } from '../types';
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  settings: RestaurantSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Contact Food Expert
        </h1>
        <p className="text-sm text-neutral-400">
          Have a question about our menu, large catering orders, or private events? Reach out to our culinary team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Direct */}
          <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Direct WhatsApp Hotline</h3>
                <p className="text-xs text-neutral-400">Instant order assistance & updates</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300">
              Need immediate help or want to customize a large party bucket order? Text us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${cleanWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
            >
              <span>Chat on WhatsApp ({settings.whatsappNumber})</span>
            </a>
          </div>

          {/* Phone Call */}
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-start gap-3.5">
            <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Phone Inquiries</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{settings.phone}</p>
              <a
                href={`tel:${settings.phone}`}
                className="text-xs font-semibold text-amber-400 hover:underline mt-1 inline-block"
              >
                Call restaurant
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-start gap-3.5">
            <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Restaurant Location</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{settings.address}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-start gap-3.5">
            <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Operating Hours</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{settings.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white mb-2">Send Us a Message</h3>
          <p className="text-xs text-neutral-400 mb-6">
            Fill in your details and our team will get back to you within 2-4 hours.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">Message Sent Successfully</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Thank you, {name}! Our restaurant manager will contact you shortly regarding your inquiry.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-xs font-semibold text-amber-400 hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +1 555-0192"
                    className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Topic
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[48px]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bulk/Party Bucket Catering">Bulk/Party Bucket Catering</option>
                    <option value="Feedback / Experience">Feedback / Experience</option>
                    <option value="Job Opportunities">Job Opportunities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-amber-500 min-h-[100px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
