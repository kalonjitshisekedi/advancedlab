import { CheckCircle2 } from "lucide-react";
import furnaceImage from "@assets/stock_images/industrial_furnace_p_f14e2bba.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About Advanced Lab Solutions</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your trusted partner in mineral processing analytics, dedicated to precision, integrity, and innovation.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate text-slate-600 mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900">Our Mission</h2>
            <p>
              Founded in 2019, Advanced Lab Solutions was established to bridge the gap between geological exploration and metallurgical processing. We believe that accurate data is the foundation of every successful mining operation.
            </p>
            <p>
              Our mission is to provide the mining industry with rapid, reliable, and high-quality analytical services that enable our clients to make informed decisions, optimize their processes, and maximize value recovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">Our Commitment</h3>
              <ul className="space-y-4">
                <ValueItem title="Accuracy" desc="We maintain rigorous QA/QC protocols to ensure data integrity." />
                <ValueItem title="Efficiency" desc="Optimized workflows to deliver results when you need them." />
                <ValueItem title="Innovation" desc="Continuously investing in the latest analytical technology." />
              </ul>
            </div>
            <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg">
               {/* Industrial Furnace Image */}
               <img 
                src={furnaceImage}
                alt="Industrial furnace processing minerals" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center bg-primary/5 rounded-3xl p-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Accreditation</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We are proud to be an ISO 17025 accredited laboratory. This international standard confirms our technical competence and ability to generate valid results.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-800 font-semibold">
              <CheckCircle2 className="text-primary h-5 w-5" />
              ISO/IEC 17025:2017 Accredited
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1">
        <CheckCircle2 className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </li>
  );
}
