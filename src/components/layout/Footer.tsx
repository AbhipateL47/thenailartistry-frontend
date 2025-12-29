import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium press-on nails that combine salon-quality results with the convenience
              of at-home application. Reusable, stylish, and perfect for every occasion.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Shop All
              </Link>
              <Link to="/sale" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sale
              </Link>
              <Link to="/designer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Designer Collection
              </Link>
              <Link to="/tutorial" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                How to Apply
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Shipping & Returns
              </Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 7225955292</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@thenailartistry.com</span>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2">Join Our Community</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get updates on new designs and exclusive offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email..."
                className="flex-1"
              />
              <Button className="whitespace-nowrap">Join Now</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} The Nail Artistry. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
