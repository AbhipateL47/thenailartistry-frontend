import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact Us - Get in Touch');
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-secondary border-b">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-2">
              Have a question? You may find an answer in our <a href="/faq" className="text-primary hover:underline">FAQs</a>. Still have a question?
            </p>
            <p className="text-muted-foreground">
              We'd love to hear from you about our entire service. Your comments and suggestions will be highly appreciated. Please complete the form below.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Your message..."
                className="min-h-[150px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="save" />
              <Label htmlFor="save" className="text-sm cursor-pointer">
                Save my name, email, and website in this browser for the next time I comment.
              </Label>
            </div>

            <Button size="lg" className="w-full md:w-auto rounded-full px-8">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">+91 7225955292</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@thenailartistry.com</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
