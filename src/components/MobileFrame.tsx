import { ReactNode } from "react";

const MobileFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-muted flex items-start justify-center py-4 md:py-8">
      <div className="w-full max-w-[420px] bg-background min-h-screen md:min-h-0 md:rounded-[2.5rem] md:shadow-2xl md:border-8 md:border-secondary/10 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
