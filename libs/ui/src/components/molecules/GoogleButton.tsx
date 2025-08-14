// import { signIn } from 'next-auth/react'

export const GoogleButton = () => {
  return (
    <button
      onClick={() => {
        console.log('button google');
      }}
      className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
    >
      G
    </button>
  );
};
