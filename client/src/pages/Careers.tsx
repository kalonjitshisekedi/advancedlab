import { Mail, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Careers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We're looking for talented professionals to join Advanced Lab Solutions and help us deliver world-class analytical services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Job Listing */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Laboratory Manager</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Germiston, South Africa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Full-time</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">About the Role</h3>
                <p className="text-slate-600 leading-relaxed">
                  We are seeking an experienced and dedicated Laboratory Manager to lead our analytical laboratory operations. This is a key position responsible for ensuring the highest standards of quality, safety, and efficiency in all laboratory activities. The successful candidate will oversee daily operations, manage a team of technicians, maintain accreditation standards, and drive continuous improvement initiatives.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Oversee all laboratory operations and ensure compliance with ISO 17025 accreditation requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Lead, mentor, and manage a team of laboratory technicians and analytical specialists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Develop and implement standard operating procedures (SOPs) and quality assurance protocols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Manage laboratory budget, procurement of equipment and chemicals, and inventory control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Ensure adherence to health and safety regulations and maintain a safe working environment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Monitor and improve analytical turnaround times whilst maintaining data integrity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Represent the laboratory in client interactions and manage quality complaints</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Keep abreast of industry developments and implement new analytical techniques</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Required Qualifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Bachelor's degree in Chemistry, Geology, Metallurgy, or related scientific field</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Minimum 5 years of experience in a laboratory environment, with at least 2 years in a supervisory or management role</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Proven knowledge of ISO 17025 accreditation standards and quality management systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Strong leadership and team management skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Excellent communication and interpersonal abilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Experience with mineralogical or metallurgical testing is highly advantageous</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Competitive salary package commensurate with experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Comprehensive benefits including medical aid and provident fund</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Professional development and training opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Opportunity to work with state-of-the-art analytical equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">A collaborative team environment with a focus on excellence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  How to Apply
                </h3>
                <p className="text-slate-600 mb-4">
                  Please send your CV and a cover letter detailing your experience and interest in the Laboratory Manager position to:
                </p>
                <a href="mailto:career@advlabsolution.co.za" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
                  <Mail className="h-4 w-4" />
                  career@advlabsolution.co.za
                </a>
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="text-center bg-slate-50 rounded-2xl p-12 border border-slate-200">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">More Opportunities Coming Soon</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We are continuously growing and regularly have new vacancies. If you are passionate about analytical science and would like to be part of our team, please send your CV to the address above.
            </p>
            <p className="text-sm text-slate-600">
              Advanced Lab Solutions is an equal opportunities employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
