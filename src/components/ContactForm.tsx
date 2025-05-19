'use client';

import { useState } from 'react';
import { trackContactClick } from '@/utils/clickTracker';

interface ContactFormProps {
  type: 'ticket' | 'sponsor' | 'tenant' | 'general';
}

export default function ContactForm({ type }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    ticketId: '',
    companyName: '',
    sponsorshipLevel: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare WhatsApp message with form data
    let whatsappNumber = '';
    let message = '';

    switch (type) {
      case 'ticket':
        whatsappNumber = '6285892405814';
        message = `Halo, saya butuh bantuan untuk tiket ALTOFEST 2025.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nID Tiket: ${formData.ticketId}\nPertanyaan: ${formData.message}`;
        break;
      case 'sponsor':
        whatsappNumber = '6289517597874';
        message = `Halo, saya tertarik untuk menjadi sponsor ALTOFEST 2025.\n\nNama: ${formData.name}\nPerusahaan: ${formData.companyName}\nEmail: ${formData.email}\nPesan: ${formData.message}`;
        break;
      case 'tenant':
        whatsappNumber = '6281250109603';
        message = `Halo, saya tertarik untuk menjadi tenant di ALTOFEST 2025.\n\nNama: ${formData.name}\nPerusahaan: ${formData.companyName}\nEmail: ${formData.email}\nPesan: ${formData.message}`;
        break;
      default: // general/technical
        whatsappNumber = '6285724634057';
        message = `Halo, saya tertarik untuk kolaborasi teknis dengan ALTOFEST 2025.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nSubjek: ${formData.subject}\nPesan: ${formData.message}`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Track the contact click
    trackContactClick(`${type.charAt(0).toUpperCase() + type.slice(1)} Form Submission`, whatsappUrl);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success message and reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          ticketId: '',
          companyName: '',
          sponsorshipLevel: '',
        });
      }, 3000);
    }, 1000);
  };

  const renderFormFields = () => {
    switch (type) {
      case 'ticket':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc700]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Alamat Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc700]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ticketId" className="block text-sm font-medium mb-1">ID Referensi Tiket</label>
              <input
                type="text"
                id="ticketId"
                name="ticketId"
                value={formData.ticketId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc700]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Pertanyaan Anda</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc700]"
                required
              />
            </div>
          </>
        );

      case 'sponsor':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Kontak</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7de6e9]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium mb-1">Nama Perusahaan/Organisasi</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7de6e9]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Alamat Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7de6e9]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Pesan</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7de6e9]"
                required
              />
            </div>
          </>
        );

      default: // general contact
        return (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Anda</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#237ea5]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Alamat Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#237ea5]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subjek</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#237ea5]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Pesan</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#237ea5]"
                required
              />
            </div>
          </>
        );
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'ticket':
        return 'Bantuan Tiket';
      case 'sponsor':
        return 'Kerjasama Sponsor';
      case 'tenant':
        return 'Pendaftaran Tenant';
      default:
        return 'Kolaborasi Teknis';
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'ticket':
        return 'bg-warm-gradient';
      case 'sponsor':
        return 'bg-cool-gradient';
      default:
        return 'bg-festival-gradient';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6">{getFormTitle()}</h3>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Terima kasih atas pesan Anda!</p>
          <p className="text-sm">Kami akan menghubungi Anda secepatnya melalui WhatsApp.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {renderFormFields()}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-full text-white font-medium transition-all ${getButtonColor()} hover:shadow-lg flex justify-center items-center`}
            onClick={() => {
              if (!isSubmitting) {
                trackContactClick(`${type.charAt(0).toUpperCase() + type.slice(1)} Form Button Click`);
              }
            }}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Kirim'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
