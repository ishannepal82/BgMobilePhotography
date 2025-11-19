import { Mail, MessageSquare, Send } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useContacts from '../hooks/useContacts';

export default function ContactPage() {
  const queryClient = useQueryClient();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    handleContactsPush,
    handleEmailChange,
    handleMessageChange,
    email,
    message
  } = useContacts();

  const galleryMutation = useMutation({
    mutationFn: async () => {
      const result = await handleContactsPush();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setSubmitStatus('success');
      // Reset form
      handleEmailChange('');
      handleMessageChange('');
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    },
    onError: (error) => {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, message }); // Debug log
    galleryMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/40 border-2 border-accent/30 mb-4">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-accent/70">We'd love to hear from you</p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-xl text-green-300 text-center">
            Message sent successfully! 🎉
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-red-300 text-center">
            Failed to send message. Please try again.
          </div>
        )}

        <div className="backdrop-blur border-2 bg-accent/30 border-primary rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-accent text-sm font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-primary/20 border-2 border-accent/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-accent transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-accent text-sm font-medium">
                <MessageSquare className="w-4 h-4 mr-2" />
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => handleMessageChange(e.target.value)}
                required
                placeholder="Tell us what's on your mind..."
                rows={5}
                className="w-full px-4 py-3 bg-primary/20 border-2 border-accent/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-accent transition-all duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={galleryMutation.isPending}
              className="w-full py-3.5 bg-accent text-white font-semibold rounded-xl shadow-lg shadow-accent/20 hover:bg-primary/90 hover:shadow-accent/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {galleryMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-accent/50 text-sm mt-6">
          We typically respond within 24 hours
        </p>
      </div>
    </div>
  );
}