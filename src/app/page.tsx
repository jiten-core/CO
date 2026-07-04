'use client'

import { CoSidebar } from "@/components/co-sidebar"
import { IntroductionSection, SourcesSection, ChemistrySection, AcuteChronicSection, SleepSection, DreamsSection, PsychologySection, LongTermSection, DiagnosisSection, TreatmentSection, PreventionSection, MythsSection, CasesSection, ReferencesSection, GlossaryFAQSection } from "@/components/sections/report-sections"
import { SeverityChart, RiskCalculator, COBindingAnimation, SourceRiskTable, BodyEffectsGrid, ExposureTimeline } from "@/components/interactive/charts"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <CoSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          {/* Introduction */}
          <IntroductionSection />

          {/* Sources + Interactive Table */}
          <SourcesSection />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <SourceRiskTable />
          </motion.div>

          {/* Chemistry & Physiology */}
          <ChemistrySection />

          {/* CO Binding Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <COBindingAnimation />
          </motion.div>

          {/* Effects on the Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <BodyEffectsGrid />
          </motion.div>

          {/* Symptoms by Exposure Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-20"
            id="symptoms"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Symptoms by Exposure Level</h2>
              </div>
              <p className="text-muted-foreground mt-2 ml-13">
                Symptoms progress predictably with increasing carboxyhemoglobin (COHb) levels. Individual susceptibility varies based on age, health status, and activity level.
              </p>
            </div>
            <SeverityChart />
          </motion.div>

          {/* Risk Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <RiskCalculator />
          </motion.div>

          {/* Acute vs Chronic */}
          <AcuteChronicSection />

          {/* Sleep Effects */}
          <SleepSection />

          {/* Dreams & Perception */}
          <DreamsSection />

          {/* Psychology & Neurology */}
          <PsychologySection />

          {/* Long-Term Effects */}
          <LongTermSection />

          {/* Exposure Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <ExposureTimeline />
          </motion.div>

          {/* Diagnosis */}
          <DiagnosisSection />

          {/* Treatment */}
          <TreatmentSection />

          {/* Prevention */}
          <PreventionSection />

          {/* Myths vs Evidence */}
          <MythsSection />

          {/* Historical Case Studies */}
          <CasesSection />

          {/* References */}
          <ReferencesSection />

          {/* Glossary & FAQ */}
          <GlossaryFAQSection />

          {/* Footer */}
          <footer className="pt-12 pb-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                <p>Carbon Monoxide (CO) — Comprehensive Scientific Report</p>
                <p className="mt-1">Evidence-based information from WHO, CDC, NIOSH, and peer-reviewed journals.</p>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                <Badge variant="outline" className="text-xs">
                  Emergency: Call 911 if you suspect CO poisoning
                </Badge>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>This report is for educational and informational purposes only. It does not constitute medical advice. If you suspect CO poisoning, immediately move to fresh air and contact emergency services.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}