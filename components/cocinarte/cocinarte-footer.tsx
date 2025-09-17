import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

export default function CocinarteFooter() {
  return (
    <footer className="bg-cocinarte-navy text-cocinarte-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Image 
              src="/cocinarte/cocinarteLogo.png" 
              alt="Cocinarte Logo" 
              width={300} 
              height={96} 
              className="object-contain -mt-8" 
              style={{ height: '160px', width: 'auto' }}
            />
            <p className="text-cocinarte-blue text-sm -mt-4">
              Cooking adventures for kids and families to explore Latin flavors while learning hands-on cooking skills.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#calendar" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">About Our Classes</Link></li>
              <li><Link href="#faq" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">FAQ</Link></li>
              <li><Link href="#birthday-parties" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Birthday Parties</Link></li>
              <li><Link href="#private-events" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Private Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Contact Info</h3>
            <div className="space-y-2 text-sm text-cocinarte-blue">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (503) 916-9758
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@cocinarte.com
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                770 NE Rogahn Street<br />
                Hillsboro, OR 97124
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="text-cocinarte-white hover:text-cocinarte-yellow transition-colors cursor-pointer">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://facebook.com/cocinarte" target="_blank" rel="noopener noreferrer" className="text-cocinarte-white hover:text-cocinarte-yellow transition-colors cursor-pointer">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com/cocinarte" target="_blank" rel="noopener noreferrer" className="text-cocinarte-white hover:text-cocinarte-yellow transition-colors cursor-pointer">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="mailto:info@cocinarte.com" className="text-cocinarte-white hover:text-cocinarte-yellow transition-colors cursor-pointer">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cocinarte-blue mt-8 pt-8 text-center text-sm text-cocinarte-blue">
          <p>&copy; 2024 Cocinarte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
