'use client';

import { useEffect, useState } from 'react';
import type { Enquiry } from '@/types';

export default function DashboardEnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);

  useEffect(() => {
    fetch('/api/admin/enquiries')
      .then((res) => res.json())
      .then((data) => setItems(data || []));
  }, []);

  return (
    <main className="min-h-screen bg-[#06060e] p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold">Enquiry Management</h1>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Service</th><th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="p-3">{item.name}</td><td className="p-3">{item.email}</td><td className="p-3">{item.service}</td><td className="p-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

