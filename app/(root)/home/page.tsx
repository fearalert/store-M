import ActivityLog from '@/components/dashboard/ActivityLog';
import ContactsList from '@/components/dashboard/ContactList';
import StorageInfo from '@/components/dashboard/StorageInfo';
import React from 'react';

const Homepage = () => {
  return (
    <div>
      <main className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <StorageInfo />
        </div>

        <div className="space-y-6">
          <ContactsList />

          <ActivityLog />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
