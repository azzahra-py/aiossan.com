'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { TacticalButton } from '@/components/ui/TacticalButton';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <TacticalButton variant="secondary" size="sm" onClick={handleLogout}>
      <LogOut className="w-3.5 h-3.5 text-[#E11D48]" />
      <span>Sign Out</span>
    </TacticalButton>
  );
}
