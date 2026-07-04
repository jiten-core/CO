'use client'

import {
  BookOpen,
  Factory,
  FlaskConical,
  ArrowLeftRight,
  Moon,
  Eye,
  Brain,
  Clock,
  Stethoscope,
  Syringe,
  Shield,
  Scale,
  FileText,
  BookMarked,
  HelpCircle,
  CheckCircle,
  Lightbulb,
  CircleHelp,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import {
  myths,
  caseStudies,
  glossary,
  faqItems,
  preventionTips,
  references,
  introContent,
  chemistryContent,
  acuteChronicContent,
  sleepContent,
  dreamsContent,
  psychologyContent,
  longTermContent,
  diagnosisContent,
  treatmentContent,
} from '@/lib/co-data'

/* -------------------------------------------------------------------------- */
/*  Shared Section Heading                                                     */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  id,
  title,
  icon: Icon,
  description,
}: {
  id: string
  title: string
  icon: LucideIcon
  description?: string
}) {
  return (
    <div className="mb-8 scroll-mt-20" id={id}>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-muted-foreground mt-2 ml-13">{description}</p>
      )}
      <Separator className="mt-4" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Reusable animation wrapper                                                */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

/* -------------------------------------------------------------------------- */
/*  1. Introduction                                                           */
/* -------------------------------------------------------------------------- */

export function IntroductionSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="introduction">
      <SectionHeading
        id="introduction"
        title="Introduction"
        icon={BookOpen}
        description="A comprehensive scientific overview of carbon monoxide toxicity"
      />

      {/* Hero card with gradient */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <CardContent className="p-6 md:p-8 space-y-4">
          {introContent.paragraphs.map((p, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed">
              {p}
            </p>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Sources                                                                */
/* -------------------------------------------------------------------------- */

export function SourcesSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="sources">
      <SectionHeading
        id="sources"
        title="Sources of Carbon Monoxide"
        icon={Factory}
      />
      <Card>
        <CardContent className="p-6 space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            Carbon monoxide is produced whenever carbon-based fuels — including
            natural gas, propane, gasoline, oil, wood, and coal — burn
            incompletely. Common sources range from everyday household appliances
            to industrial processes and motor vehicles. Understanding these
            sources is the first step toward effective prevention.
          </p>
          <p className="text-muted-foreground text-sm">
            The interactive table below provides a detailed breakdown of each
            major CO source, its typical concentration range, associated risk
            level, and practical safety considerations.
          </p>
        </CardContent>
      </Card>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Chemistry                                                              */
/* -------------------------------------------------------------------------- */

export function ChemistrySection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="chemistry">
      <SectionHeading
        id="chemistry"
        title="Chemistry & Physiology"
        icon={FlaskConical}
      />

      <div className="space-y-6">
        {/* Paragraphs */}
        {chemistryContent.paragraphs.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        {/* Key Points card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {chemistryContent.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <p className="text-sm text-foreground/90">{point}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SVG CO Molecule Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>CO Molecule Structure</CardTitle>
            <CardDescription>
              Carbon monoxide — a triple-bonded diatomic molecule (C≡O)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-6">
              <svg
                viewBox="0 0 300 120"
                className="w-full max-w-xs"
                aria-label="CO molecule diagram showing a carbon atom triple-bonded to an oxygen atom"
                role="img"
              >
                {/* Carbon atom */}
                <circle cx="90" cy="60" r="28" fill="hsl(var(--primary))" opacity="0.15" />
                <circle cx="90" cy="60" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                <text x="90" y="66" textAnchor="middle" className="text-xl font-bold" fill="hsl(var(--primary))">C</text>

                {/* Triple bond lines */}
                <line x1="122" y1="48" x2="178" y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="122" y1="60" x2="178" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="122" y1="72" x2="178" y2="72" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />

                {/* Oxygen atom */}
                <circle cx="210" cy="60" r="28" fill="hsl(var(--destructive))" opacity="0.15" />
                <circle cx="210" cy="60" r="28" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" />
                <text x="210" y="66" textAnchor="middle" className="text-xl font-bold" fill="hsl(var(--destructive))">O</text>

                {/* Labels */}
                <text x="90" y="106" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">Carbon</text>
                <text x="150" y="106" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--muted-foreground))">C≡O</text>
                <text x="210" y="106" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">Oxygen</text>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  4. Acute vs Chronic                                                       */
/* -------------------------------------------------------------------------- */

export function AcuteChronicSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="acute-chronic">
      <SectionHeading
        id="acute-chronic"
        title="Acute vs Chronic Exposure"
        icon={ArrowLeftRight}
        description="Understanding the differences between sudden and prolonged CO exposure"
      />

      <div className="space-y-6">
        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-200 dark:border-red-900/40">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">
                Acute Exposure
              </CardTitle>
              <CardDescription>
                Sudden, high-concentration CO exposure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {acuteChronicContent.acute.map((item, i) => (
                <p key={i} className="text-sm text-foreground/90 leading-relaxed">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-900/40">
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-400">
                Chronic Exposure
              </CardTitle>
              <CardDescription>
                Prolonged, low-concentration CO exposure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {acuteChronicContent.chronic.map((item, i) => (
                <p key={i} className="text-sm text-foreground/90 leading-relaxed">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Comparative Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Aspect</TableHead>
                  <TableHead className="w-1/3">Acute</TableHead>
                  <TableHead className="w-1/3">Chronic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {acuteChronicContent.comparisonPoints.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.aspect}</TableCell>
                    <TableCell className="whitespace-normal">{row.acute}</TableCell>
                    <TableCell className="whitespace-normal">{row.chronic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  5. Sleep                                                                  */
/* -------------------------------------------------------------------------- */

export function SleepSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="sleep">
      <SectionHeading
        id="sleep"
        title="Sleep Effects"
        icon={Moon}
        description="How carbon monoxide exposure disrupts sleep architecture and quality"
      />

      <div className="space-y-6">
        {sleepContent.paragraphs.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Key Findings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sleepContent.keyFindings.map((finding, i) => (
              <div key={i} className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <p className="text-sm text-foreground/90">{finding}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  6. Dreams                                                                 */
/* -------------------------------------------------------------------------- */

const dreamSections = [
  {
    label: 'Established Evidence',
    items: dreamsContent.established,
    badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    label: 'Possible Mechanisms',
    items: dreamsContent.possible,
    badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  {
    label: 'Unsupported Claims',
    items: dreamsContent.unsupported,
    badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    label: 'Common Myths',
    items: dreamsContent.myths,
    badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
]

export function DreamsSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="dreams">
      <SectionHeading
        id="dreams"
        title="Dreams & Perception"
        icon={Eye}
        description="Evaluating the evidence for CO&apos;s effects on dreaming and sensory perception"
      />

      <div className="space-y-8">
        {dreamSections.map((section) => (
          <div key={section.label}>
            <Badge className={section.badgeClass + ' mb-4'}>{section.label}</Badge>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {section.items.map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <Card className="border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm text-foreground/90 leading-relaxed">
                All claims above are evaluated based on current scientific
                evidence. This section separates established science from
                speculation and clearly labels each claim&apos;s evidence level.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  7. Psychology                                                             */
/* -------------------------------------------------------------------------- */

export function PsychologySection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="psychology">
      <SectionHeading
        id="psychology"
        title="Psychology & Neurology"
        icon={Brain}
      />

      <div className="space-y-6">
        {psychologyContent.paragraphs.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          {psychologyContent.effects.map((effect, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <p className="text-sm text-foreground/90 leading-relaxed">{effect}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  8. Long-Term                                                              */
/* -------------------------------------------------------------------------- */

export function LongTermSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="long-term">
      <SectionHeading
        id="long-term"
        title="Long-Term Effects"
        icon={Clock}
      />

      <div className="space-y-6">
        {longTermContent.paragraphs.map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed">
            {p}
          </p>
        ))}

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recovery Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {longTermContent.timeline.map((entry, i) => (
              <div key={i} className="flex gap-4">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5" />
                  {i < longTermContent.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-sm">{entry.phase}</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {entry.timeframe}
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  9. Diagnosis                                                              */
/* -------------------------------------------------------------------------- */

export function DiagnosisSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="diagnosis">
      <SectionHeading
        id="diagnosis"
        title="Diagnosis"
        icon={Stethoscope}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {diagnosisContent.methods.map((method, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{method.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {method.description}
              </p>
              {method.limitations && (
                <Alert className="border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-xs text-foreground/80">
                    {method.limitations}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  10. Treatment                                                             */
/* -------------------------------------------------------------------------- */

export function TreatmentSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="treatment">
      <SectionHeading
        id="treatment"
        title="Treatment"
        icon={Syringe}
      />

      <div className="relative">
        {treatmentContent.steps.map((step, i) => (
          <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Vertical connecting line */}
            {i < treatmentContent.steps.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-px bg-border" />
            )}

            {/* Step number circle */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {i + 1}
            </div>

            {/* Content */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base">{step.name}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {step.details}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  11. Prevention                                                            */
/* -------------------------------------------------------------------------- */

export function PreventionSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="prevention">
      <SectionHeading
        id="prevention"
        title="Prevention"
        icon={Shield}
      />

      <Accordion type="multiple" className="w-full">
        {preventionTips.map((category, i) => (
          <AccordionItem key={i} value={`prevention-${i}`}>
            <AccordionTrigger className="text-base font-semibold">
              {category.category}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-1">
                {category.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/90">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  12. Myths                                                                 */
/* -------------------------------------------------------------------------- */

const verdictColors: Record<string, string> = {
  Established:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Possible:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Unsupported:
    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  Myth: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

export function MythsSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="myths">
      <SectionHeading
        id="myths"
        title="Myths vs Evidence"
        icon={Scale}
        description="Separating fact from fiction in carbon monoxide awareness"
      />

      <Accordion type="multiple" className="space-y-3">
        {myths.map((item, i) => (
          <AccordionItem
            key={i}
            value={`myth-${i}`}
            className="rounded-lg border px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="text-left">
              <div className="flex items-start gap-3">
                <CircleHelp className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium leading-relaxed">
                  {item.myth}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-8 pt-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    Evidence
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {item.evidence}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Verdict:
                  </p>
                  <Badge className={verdictColors[item.verdict]}>
                    {item.verdict}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  13. Case Studies                                                          */
/* -------------------------------------------------------------------------- */

export function CasesSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="cases">
      <SectionHeading
        id="cases"
        title="Case Studies"
        icon={FileText}
      />

      <Accordion type="multiple" className="space-y-3">
        {caseStudies.map((cs, i) => (
          <AccordionItem
            key={i}
            value={`case-${i}`}
            className="rounded-lg border px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="text-left">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold">{cs.title}</span>
                  <Badge variant="outline">{cs.year}</Badge>
                  <Badge variant="secondary">{cs.location}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {cs.summary}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-1 pt-2">
                <div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {cs.summary}
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Symptoms
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.symptoms.map((s, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    Outcome
                  </p>
                  <p className="text-sm text-foreground/90">{cs.outcome}</p>
                </div>

                {/* Source */}
                <p className="text-xs text-muted-foreground italic">
                  Source: {cs.source}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  14. References                                                            */
/* -------------------------------------------------------------------------- */

export function ReferencesSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="references">
      <SectionHeading
        id="references"
        title="References"
        icon={BookMarked}
      />

      <Card>
        <CardContent className="p-6">
          <ol className="space-y-3 list-decimal list-inside">
            {references.map((ref) => (
              <li key={ref.id} className="text-sm text-foreground/90 leading-relaxed">
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    [{ref.id}] {ref.authors} ({ref.year}). {ref.title}.{' '}
                    {ref.journal}.
                  </a>
                ) : (
                  <>
                    [{ref.id}] {ref.authors} ({ref.year}). {ref.title}.{' '}
                    {ref.journal}.
                  </>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.section>
  )
}

/* -------------------------------------------------------------------------- */
/*  15. Glossary & FAQ                                                        */
/* -------------------------------------------------------------------------- */

export function GlossaryFAQSection() {
  return (
    <motion.section {...fadeUp} className="scroll-mt-20" id="glossary-faq">
      <SectionHeading
        id="glossary-faq"
        title="Glossary & FAQ"
        icon={HelpCircle}
      />

      <Tabs defaultValue="glossary">
        <TabsList>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* Glossary Tab */}
        <TabsContent value="glossary" className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="font-semibold text-sm mb-1">{item.term}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-4">
          <Accordion type="multiple">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </motion.section>
  )
}