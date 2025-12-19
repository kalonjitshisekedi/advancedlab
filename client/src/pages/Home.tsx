import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Layers, Activity } from "lucide-react";
import { motion } from "framer-motion";
import labHero from "@assets/stock_images/laboratory_equipment_169f9813.jpg";
import mineralSample from "@assets/stock_images/laboratory_equipment_956e0ccc.jpg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Lab Hero Background */}
           <img 
            src={labHero}
            alt="Laboratory background" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 lg:py-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 leading-tight mb-6">
              Precision in <span className="text-primary">Mineral Processing</span> Analytics
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
              Advanced Lab Solutions provides industry-leading mineralogy and metallurgical testing services. We deliver accurate data to optimize your mining operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-primary hover:bg-primary/90">
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-white/80 hover:bg-white border-slate-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">World-Class Analytical Services</h2>
            <p className="text-slate-600">
              Our state-of-the-art facility is equipped with the latest technology to ensure the highest standards of accuracy and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Microscope className="w-8 h-8 text-primary" />}
              title="Advanced Mineralogy"
              description="Comprehensive mineral identification and characterization using automated SEM-EDS technology."
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8 text-primary" />}
              title="Metallurgical Testing"
              description="Complete suite of metallurgical test work from bench scale to pilot plant operations."
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-primary" />}
              title="Process Optimization"
              description="Data-driven insights to improve recovery rates and optimize plant performance."
            />
          </div>
        </div>
      </section>

      {/* Image Strip */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="bg-slate-900 p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-display">Why Choose Advanced Lab?</h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
              <span className="flex-1">ISO 17025 accredited laboratory ensuring international standards.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
              <span className="flex-1">Rapid turnaround times without compromising accuracy.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
              <span className="flex-1">Expert team of mineralogists and chemical engineers.</span>
            </li>
          </ul>
        </div>
        <div className="h-64 md:h-auto relative">
          {/* Mineral samples */}
          <img 
            src={mineralSample}
            alt="Mineral samples" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Ready to optimize your process?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your analytical requirements and get a custom quote.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="mb-6 p-3 bg-white rounded-xl shadow-sm inline-block border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
