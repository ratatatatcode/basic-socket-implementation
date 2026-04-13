import ChatContainer from '@/components/chat/chat';

type PageProps = {
  params: Promise<{ roomID: string }>;
};

export default async function ChatPage({ params }: PageProps) {
  const { roomID } = await params;

  return (
    <>
      <ChatContainer roomID={roomID} />
    </>
  );
}
