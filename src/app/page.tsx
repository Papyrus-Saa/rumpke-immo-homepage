import HeroComponent from '@/components/ui/hero-component/HeroComponent';
import ImmobilienClientPage from './(immobilien)/ImmobilienClientPage';
import React from 'react';
import SidebarDesktop from '@/components/ui/sidebar/SidebarDesktop';

const Page = () => {
  return (
    <main className='' >
      <HeroComponent />
      <div className='flex'>
        <SidebarDesktop />
        <div className='flex max-w-[1300px] mx-auto'>
          <ImmobilienClientPage />
        </div>
      </div>
    </main>
  );
};

export default Page;
