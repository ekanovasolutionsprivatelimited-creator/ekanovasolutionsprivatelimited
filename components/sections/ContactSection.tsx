'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { enquirySchema, type EnquiryInput } from '@/lib/validations';
import { primaryWhatsappUrl, secondaryWhatsappUrl, siteConfig } from '@/config/site';

const services = [
  'MERN Stack Projects',
  'Machine Learning Projects',
  'NLP Projects',
  'Mobile App Development',
  'Documentation & Viva Support',
  'Deployment Assistance',
];

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      college: '',
      projectType: '',
      service: '',
      budget: '',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        const firstFieldError = data?.errors?.fieldErrors
          ? Object.values(data.errors.fieldErrors).flat().find(Boolean)
          : null;
        throw new Error((firstFieldError as string) || data.message || 'Failed to submit enquiry.');
      }

      if (typeof data?.message === 'string' && data.message.toLowerCase().includes('auto-reply could not be delivered')) {
        toast.warning(data.message);
      } else {
        toast.success(data?.message || 'Enquiry submitted successfully. Check your inbox for confirmation.');
      }
      form.reset();

      const prefill = encodeURIComponent(`Hi EkaNova Solutions, I submitted an enquiry for ${values.service}.`);
      window.open(`${primaryWhatsappUrl}?text=${prefill}`, '_blank', 'noopener,noreferrer');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not submit enquiry.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#07070f] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Start Your Project Today</h2>
          <p className="mt-3 text-white/60">Submit your enquiry and we will reply quickly.</p>
        </div>

        <div className="glass-strong rounded-2xl border border-white/10 p-6 sm:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register('website')} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Full Name" error={form.formState.errors.name?.message} reg={form.register('name')} />
              <Input placeholder="Email" type="email" error={form.formState.errors.email?.message} reg={form.register('email')} />
              <Input placeholder="Phone Number" error={form.formState.errors.phone?.message} reg={form.register('phone')} />
              <Input placeholder="College Name" error={form.formState.errors.college?.message} reg={form.register('college')} />
              <Input placeholder="Project Type" error={form.formState.errors.projectType?.message} reg={form.register('projectType')} />
              <Input placeholder="Budget" error={form.formState.errors.budget?.message} reg={form.register('budget')} />
            </div>

            <div>
              <select
                {...form.register('service')}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none dark:border-white/15 dark:bg-[#0a0a14] dark:text-white"
              >
                <option value="">Service Required</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              {form.formState.errors.service && <p className="mt-1 text-xs text-red-400">{form.formState.errors.service.message}</p>}
            </div>

            <div>
              <textarea
                {...form.register('message')}
                rows={5}
                placeholder="Message"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-white/40"
              />
              {form.formState.errors.message && <p className="mt-1 text-xs text-red-400">{form.formState.errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>

          <p className="mt-5 text-sm text-white/60">
            Business email: <a className="text-cyan-300" href={`mailto:${siteConfig.businessEmail}`}>{siteConfig.businessEmail}</a>
          </p>
          <p className="mt-2 text-sm text-white/60">
            WhatsApp: <a className="text-cyan-300" href={primaryWhatsappUrl} target="_blank" rel="noopener noreferrer">+91 85490 70868</a> | <a className="text-cyan-300" href={secondaryWhatsappUrl} target="_blank" rel="noopener noreferrer">+91 74112 88175</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Input({ placeholder, type = 'text', error, reg }: { placeholder: string; type?: string; error?: string; reg: UseFormRegisterReturn }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...reg}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-white/40"
      />
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}


