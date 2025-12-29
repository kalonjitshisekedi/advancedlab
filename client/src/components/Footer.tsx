import { Link } from "wouter";
import { Beaker, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-white/10 p-2 rounded-lg">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Advanced Lab
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Leading mineral processing laboratory providing precise analytical solutions and metallurgical testing for the mining industry.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Mineralogy</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Sample Analysis</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Metallurgical Testing</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Process Optimization</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span>6 Knights Road,<br />Germiston, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+27 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@advlabsolution.co.za</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Advanced Lab Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
