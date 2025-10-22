'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Bot, Send, User, X, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getMentorResponse } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function AIMentorChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(getMentorResponse, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.response) {
      setMessages((prev) => [...prev, { role: 'assistant', content: state.response as string }]);
    }
    if(state?.error) {
       setMessages((prev) => [...prev, { role: 'assistant', content: state.error as string }]);
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
    }
  }, [messages])

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: query }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        >
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open AI Mentor</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0" side="right">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot /> AI Mentor
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-secondary p-3 text-sm">
                <p>Hello! I&apos;m your AI Mentor. How can I help you with your career or learning path today?</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 text-sm max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><User/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-background">
          <form ref={formRef} action={handleFormSubmit} className="flex w-full items-center space-x-2">
            <Input
              id="query"
              name="query"
              placeholder="Type your question..."
              className="flex-1"
              autoComplete="off"
            />
            <SubmitButton />
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
