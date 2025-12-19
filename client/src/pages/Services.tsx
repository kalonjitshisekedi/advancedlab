import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Comprehensive analytical solutions tailored for the mining and mineral processing industry.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-20">
          
          {/* Service 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Sample Analysis & Assaying</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We provide high-precision chemical analysis for geological and metallurgical samples. Using advanced spectroscopy and wet chemistry techniques, we determine elemental composition with extreme accuracy.
              </p>
              <ul className="space-y-3 mb-8">
                <ServiceItem>Fire Assay for Gold and PGM</ServiceItem>
                <ServiceItem>X-Ray Fluorescence (XRF)</ServiceItem>
                <ServiceItem>ICP-OES and ICP-MS Analysis</ServiceItem>
                <ServiceItem>Carbon and Sulfur Analysis</ServiceItem>
              </ul>
              <Link href="/contact">
                <Button>Request Analysis</Button>
              </Link>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl shadow-slate-200">
              {/* Unsplash: scientist holding sample tube */}
              <img 
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
                alt="Sample Analysis" 
                className="w-full h-full object-cover aspect-video md:aspect-auto md:h-[400px]"
              />
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-slate-200">
              {/* Unsplash: microscope view mineral */}
              <img 
                src="https://images.unsplash.com/photo-1576359573859-9942a3f91599?auto=format&fit=crop&q=80&w=800"
                alt="Mineralogy" 
                className="w-full h-full object-cover aspect-video md:aspect-auto md:h-[400px]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Process Mineralogy</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Understanding mineral deportment is crucial for recovery. Our mineralogy services characterize ores to predict processing behavior and identify causes of metal loss.
              </p>
              <ul className="space-y-3 mb-8">
                <ServiceItem>Automated Mineralogy (SEM-EDS)</ServiceItem>
                <ServiceItem>Optical Microscopy</ServiceItem>
                <ServiceItem>X-Ray Diffraction (XRD)</ServiceItem>
                <ServiceItem>Grain Size Distribution</ServiceItem>
              </ul>
              <Link href="/contact">
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Metallurgical Testing</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                From bench-scale feasibility to pilot plant optimization, we simulate processing circuits to validate recovery methods and reagent schemes.
              </p>
              <ul className="space-y-3 mb-8">
                <ServiceItem>Flotation Testing</ServiceItem>
                <ServiceItem>Leaching Kinetics</ServiceItem>
                <ServiceItem>Gravity Separation</ServiceItem>
                <ServiceItem>Comminution (Grindability)</ServiceItem>
              </ul>
              <Link href="/contact">
                <Button>Discuss Testing</Button>
              </Link>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl shadow-slate-200">
              {/* Unsplash: industrial chemical plant interior */}
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800"
                alt="Metallurgy" 
                className="w-full h-full object-cover aspect-video md:aspect-auto md:h-[400px]"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ServiceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-slate-700">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-primary" />
      </div>
      {children}
    </li>
  );
}
