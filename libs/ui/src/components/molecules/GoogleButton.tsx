import { signIn } from 'next-auth/react';
import { IconBrandGoogle } from '@tabler/icons-react';

export const GoogleButton = () => {
  return (
    <button
      onClick={() => {
        signIn('google', { callbackUrl: '/' });
      }}
      className="text-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
    >
      <IconBrandGoogle />
    </button>
  );
};
