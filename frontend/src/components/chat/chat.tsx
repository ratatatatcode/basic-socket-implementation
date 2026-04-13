import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

export default function ChatContainer({ roomID }: { roomID: string }) {
  return (
    <div className="bg-secondary h-100 w-140 overflow-hidden rounded-md border-2 shadow-sm shadow-white">
      <div className="h-75 w-full p-4"></div>
      <div className="relative flex h-25 w-full items-center justify-center p-4">
        <Textarea
          maxLength={255}
          className="border-primary resize-none overflow-hidden border-2 pr-12 text-xs"
        />
        <Button className="absolute top-1/2 right-6 -translate-y-1/2">
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
