"use client"

import React, { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Brain,
  Heart,
  Wind,
  Droplets,
  Dumbbell,
  Eye,
  Activity,
  Baby,
  User,
  Triangle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Info,
  Calculator,
  FlaskConical,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  symptomLevels,
  sources,
  bodyEffects,
  longTermContent,
} from "@/lib/co-data"

// ─── Helpers ────────────────────────────────────────────────────────────────

function shortenLevel(level: string): string {
  const map: Record<string, string> = {
    "Very Low Exposure": "V. Low",
    "Low Exposure": "Low",
    "Moderate Exposure": "Moderate",
    "High Exposure": "High",
    "Severe Poisoning": "Severe",
    "Fatal Poisoning": "Fatal",
  }
  return map[level] ?? level
}

function riskColor(level: string): string {
  switch (level) {
    case "Low":
      return "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/25"
    case "Moderate":
      return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/25"
    case "High":
      return "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/25"
    case "Very High":
      return "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/25"
    default:
      return ""
  }
}

function severityColor(severity: string): string {
  switch (severity) {
    case "Mild":
      return "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/25"
    case "Moderate":
      return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/25"
    case "Severe":
      return "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/25"
    case "Critical":
      return "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/25"
    default:
      return ""
  }
}

function timelineDotColor(phase: string): string {
  if (phase.includes("Acute")) return "bg-red-500"
  if (phase.includes("Lag")) return "bg-yellow-500"
  if (phase.includes("DNS")) return "bg-orange-500"
  if (phase.includes("Recovery")) return "bg-blue-500"
  if (phase.includes("Long-Term")) return "bg-green-500"
  return "bg-gray-500"
}

function timelineBadgeColor(phase: string): string {
  if (phase.includes("Acute")) return "bg-red-500/15 text-red-700 dark:text-red-400"
  if (phase.includes("Lag")) return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
  if (phase.includes("DNS")) return "bg-orange-500/15 text-orange-700 dark:text-orange-400"
  if (phase.includes("Recovery")) return "bg-blue-500/15 text-blue-700 dark:text-blue-400"
  if (phase.includes("Long-Term")) return "bg-green-500/15 text-green-700 dark:text-green-400"
  return ""
}

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="size-5" />,
  Heart: <Heart className="size-5" />,
  Wind: <Wind className="size-5" />,
  Droplets: <Droplets className="size-5" />,
  Dumbbell: <Dumbbell className="size-5" />,
  Eye: <Eye className="size-5" />,
  Activity: <Activity className="size-5" />,
  Bean: <Droplets className="size-5" />,
  Triangle: <Triangle className="size-5" />,
  Baby: <Baby className="size-5" />,
  Child: <Baby className="size-5" />,
  User: <User className="size-5" />,
}

// ─── 1. SeverityChart ───────────────────────────────────────────────────────

interface SeverityTooltipPayload {
  payload: {
    level: string
    cohbRange: string
    symptoms: string[]
    severity: number
    color: string
    shortLabel: string
  }
}

function SeverityChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: SeverityTooltipPayload[]
}) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border bg-popover p-3 text-popover-foreground shadow-lg max-w-xs">
      <p className="font-semibold text-sm mb-1">{d.level}</p>
      <p className="text-xs text-muted-foreground mb-2">{d.cohbRange}</p>
      <p className="text-xs font-medium mb-1">Symptoms:</p>
      <ul className="text-xs text-muted-foreground space-y-0.5">
        {d.symptoms.slice(0, 4).map((s, i) => (
          <li key={i}>• {s}</li>
        ))}
        {d.symptoms.length > 4 && (
          <li className="text-muted-foreground italic">
            +{d.symptoms.length - 4} more...
          </li>
        )}
      </ul>
    </div>
  )
}

export function SeverityChart() {
  const chartData = useMemo(
    () =>
      symptomLevels.map((s) => ({
        ...s,
        shortLabel: shortenLevel(s.level),
      })),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="size-5 text-orange-500" />
            CO Exposure Severity Scale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="shortLabel"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 7]}
                  ticks={[1, 2, 3, 4, 5, 6]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  label={{
                    value: "Severity",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12, fill: "hsl(var(--muted-foreground))" },
                  }}
                />
                <Tooltip content={<SeverityChartTooltip />} cursor={false} />
                <Bar dataKey="severity" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {symptomLevels.map((s) => (
              <div
                key={s.level}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className="inline-block size-3 rounded-sm shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span>{shortenLevel(s.level)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── 2. RiskCalculator ─────────────────────────────────────────────────────

type HeatingOption = "Natural Gas" | "Electric" | "Oil" | "Wood" | "Propane"
type DetectorOption = "Yes" | "No" | "Not Sure"
type InspectionOption =
  | "Within 1 year"
  | "1-3 years"
  | "Never"
  | "Not Sure"
type VentilationOption = "Good" | "Adequate" | "Poor" | "Unknown"

interface RiskResult {
  score: number
  level: string
  color: string
  bgColor: string
  borderColor: string
  recommendation: string
}

function calculateRisk(
  heating: HeatingOption,
  detector: DetectorOption,
  inspection: InspectionOption,
  ventilation: VentilationOption
): RiskResult {
  let score = 0

  // Heating source
  if (heating === "Natural Gas" || heating === "Oil" || heating === "Wood" || heating === "Propane")
    score += 2

  // Detector
  if (detector === "No") score += 3
  else if (detector === "Not Sure") score += 2

  // Inspection
  if (inspection === "Never") score += 3
  else if (inspection === "Not Sure") score += 2
  else if (inspection === "1-3 years") score += 1

  // Ventilation
  if (ventilation === "Poor") score += 3
  else if (ventilation === "Unknown") score += 2
  else if (ventilation === "Adequate") score += 1

  if (score <= 1)
    return {
      score,
      level: "Low Risk",
      color: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-500/15",
      borderColor: "border-green-500/25",
      recommendation:
        "Your risk profile appears low. Continue maintaining CO detectors and scheduling regular appliance inspections.",
    }
  if (score <= 4)
    return {
      score,
      level: "Moderate Risk",
      color: "text-yellow-700 dark:text-yellow-400",
      bgColor: "bg-yellow-500/15",
      borderColor: "border-yellow-500/25",
      recommendation:
        "Consider installing CO detectors if you haven't already, and schedule an appliance inspection soon.",
    }
  if (score <= 7)
    return {
      score,
      level: "Elevated Risk",
      color: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-500/15",
      borderColor: "border-orange-500/25",
      recommendation:
        "You may be at elevated risk for CO exposure. Install CO detectors immediately, have all fuel-burning appliances inspected, and improve ventilation.",
    }
  return {
    score,
    level: "High Risk",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-500/15",
    borderColor: "border-red-500/25",
    recommendation:
      "Your risk factors suggest significant CO exposure risk. Take immediate action: install CO detectors on every level, have all appliances professionally inspected, and ensure adequate ventilation.",
  }
}

export function RiskCalculator() {
  const [heating, setHeating] = useState<HeatingOption | "">("")
  const [detector, setDetector] = useState<DetectorOption | "">("")
  const [inspection, setInspection] = useState<InspectionOption | "">("")
  const [ventilation, setVentilation] = useState<VentilationOption | "">("")
  const [result, setResult] = useState<RiskResult | null>(null)

  const handleCalculate = () => {
    if (!heating || !detector || !inspection || !ventilation) return
    setResult(
      calculateRisk(
        heating as HeatingOption,
        detector as DetectorOption,
        inspection as InspectionOption,
        ventilation as VentilationOption
      )
    )
  }

  const canCalculate = heating && detector && inspection && ventilation

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="size-5 text-primary" />
            Educational CO Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Heating Source */}
          <div className="space-y-2">
            <Label htmlFor="heating" className="text-sm font-medium">
              Primary heating source
            </Label>
            <Select
              value={heating}
              onValueChange={(v) => setHeating(v as HeatingOption)}
            >
              <SelectTrigger id="heating" className="w-full">
                <SelectValue placeholder="Select heating source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Natural Gas">Natural Gas</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Oil">Oil</SelectItem>
                <SelectItem value="Wood">Wood</SelectItem>
                <SelectItem value="Propane">Propane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CO Detectors */}
          <div className="space-y-2">
            <Label htmlFor="detector" className="text-sm font-medium">
              CO detectors installed?
            </Label>
            <Select
              value={detector}
              onValueChange={(v) => setDetector(v as DetectorOption)}
            >
              <SelectTrigger id="detector" className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Not Sure">Not Sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Appliance Inspection */}
          <div className="space-y-2">
            <Label htmlFor="inspection" className="text-sm font-medium">
              Recent appliance inspection?
            </Label>
            <Select
              value={inspection}
              onValueChange={(v) => setInspection(v as InspectionOption)}
            >
              <SelectTrigger id="inspection" className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Within 1 year">Within 1 year</SelectItem>
                <SelectItem value="1-3 years">1-3 years</SelectItem>
                <SelectItem value="Never">Never</SelectItem>
                <SelectItem value="Not Sure">Not Sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ventilation Quality */}
          <div className="space-y-2">
            <Label htmlFor="ventilation" className="text-sm font-medium">
              Ventilation quality
            </Label>
            <Select
              value={ventilation}
              onValueChange={(v) => setVentilation(v as VentilationOption)}
            >
              <SelectTrigger id="ventilation" className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Adequate">Adequate</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
                <SelectItem value="Unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calculate Button */}
          <Button
            className="w-full"
            disabled={!canCalculate}
            onClick={handleCalculate}
          >
            <Calculator className="size-4 mr-2" />
            Calculate Risk
          </Button>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className={`rounded-lg border p-4 space-y-3 ${result.bgColor} ${result.borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-sm px-3 py-1 ${result.color} ${result.bgColor} ${result.borderColor}`}
                    >
                      {result.level}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      Score: {result.score}/11
                    </span>
                  </div>
                  <Progress
                    value={Math.min((result.score / 11) * 100, 100)}
                    className="h-2"
                  />
                  <p className="text-sm text-foreground/80">
                    {result.recommendation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground flex items-start gap-1.5 pt-2">
            <Info className="size-3.5 mt-0.5 shrink-0" />
            This tool is for educational purposes only and does not replace
            professional CO risk assessment.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── 3. COBindingAnimation ─────────────────────────────────────────────────

function COBindingAnimationInner() {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-b from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <svg
        viewBox="0 0 500 320"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red blood cell body */}
        <motion.ellipse
          cx={250}
          cy={160}
          rx={140}
          ry={90}
          fill="#dc2626"
          opacity={0.2}
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.95, 1, 0.95] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx={250}
          cy={160}
          rx={120}
          ry={70}
          fill="#ef4444"
          opacity={0.35}
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cell membrane label */}
        <text
          x={250}
          y={270}
          textAnchor="middle"
          className="text-xs fill-red-700/60 dark:fill-red-400/60"
          fontSize="11"
          fontFamily="sans-serif"
        >
          Red Blood Cell
        </text>

        {/* Hemoglobin center */}
        <motion.circle
          cx={250}
          cy={150}
          r={35}
          fill="#b91c1c"
          opacity={0.6}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={250}
          y={155}
          textAnchor="middle"
          className="fill-white text-xs"
          fontSize="12"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Hb
        </text>

        {/* O2 binding sites (4 spots around hemoglobin) */}
        {/* Top */}
        <motion.g
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0, 0, 1],
            x: [0, 0, 15, 20, 0],
            y: [0, 0, -15, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
          }}
        >
          <circle cx={250} cy={108} r={10} fill="#3b82f6" opacity={0.7} />
          <text
            x={250}
            y={112}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        {/* Right */}
        <motion.g
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0, 0, 1],
            x: [0, 0, 15, 20, 0],
            y: [0, 0, 0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
            delay: 0.5,
          }}
        >
          <circle cx={292} cy={150} r={10} fill="#3b82f6" opacity={0.7} />
          <text
            x={292}
            y={154}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        {/* Bottom */}
        <motion.g
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0, 0, 1],
            x: [0, 0, 10, 15, 0],
            y: [0, 0, 15, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
            delay: 1,
          }}
        >
          <circle cx={250} cy={192} r={10} fill="#3b82f6" opacity={0.7} />
          <text
            x={250}
            y={196}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        {/* Left */}
        <motion.g
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0, 0, 1],
            x: [0, 0, -15, -20, 0],
            y: [0, 0, 0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
            delay: 1.5,
          }}
        >
          <circle cx={208} cy={150} r={10} fill="#3b82f6" opacity={0.7} />
          <text
            x={208}
            y={154}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        {/* CO molecules approaching from the left */}
        {/* CO 1 - approaches top-left binding site */}
        <motion.g
          initial={{ x: -60, y: -40, opacity: 0 }}
          animate={{
            x: [-60, -20, 0, 0, -60],
            y: [-40, -30, -15, -15, -40],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <circle cx={200} cy={120} r={12} fill="#6b7280" />
          <text
            x={200}
            y={124}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            CO
          </text>
        </motion.g>

        {/* CO 2 - approaches right side */}
        <motion.g
          initial={{ x: 80, y: 20, opacity: 0 }}
          animate={{
            x: [80, 50, 15, 15, 80],
            y: [20, 15, 0, 0, 20],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 1,
          }}
        >
          <circle cx={310} cy={155} r={12} fill="#6b7280" />
          <text
            x={310}
            y={159}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            CO
          </text>
        </motion.g>

        {/* CO 3 - approaches from bottom */}
        <motion.g
          initial={{ x: 20, y: 60, opacity: 0 }}
          animate={{
            x: [20, 15, 10, 10, 20],
            y: [60, 40, 15, 15, 60],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: 2,
          }}
        >
          <circle cx={260} cy={195} r={12} fill="#6b7280" />
          <text
            x={260}
            y={199}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            CO
          </text>
        </motion.g>

        {/* Displaced O2 molecules floating away */}
        <motion.g
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 0.8, 0.3, 0],
            x: [0, 0, 30, 50, 70],
            y: [0, 0, -20, -35, -45],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
            delay: 0.5,
          }}
        >
          <circle cx={240} cy={100} r={8} fill="#3b82f6" opacity={0.5} />
          <text
            x={240}
            y={103}
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0, 0.8, 0.3, 0],
            x: [0, 0, -30, -50, -65],
            y: [0, 0, 15, 25, 40],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1],
            delay: 1.5,
          }}
        >
          <circle cx={215} cy={175} r={8} fill="#3b82f6" opacity={0.5} />
          <text
            x={215}
            y={178}
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontFamily="sans-serif"
          >
            O₂
          </text>
        </motion.g>

        {/* Legend */}
        <g>
          <circle cx={40} cy={290} r={8} fill="#3b82f6" opacity={0.7} />
          <text
            x={55}
            y={294}
            fontSize="10"
            fill="hsl(var(--foreground))"
            fontFamily="sans-serif"
          >
            O₂ (displaced)
          </text>

          <circle cx={200} cy={290} r={8} fill="#6b7280" />
          <text
            x={215}
            y={294}
            fontSize="10"
            fill="hsl(var(--foreground))"
            fontFamily="sans-serif"
          >
            CO (binding)
          </text>

          <circle cx={360} cy={290} r={8} fill="#b91c1c" opacity={0.6} />
          <text
            x={375}
            y={294}
            fontSize="10"
            fill="hsl(var(--foreground))"
            fontFamily="sans-serif"
          >
            Hemoglobin
          </text>
        </g>
      </svg>
    </div>
  )
}

export function COBindingAnimation() {
  const facts = [
    "CO binds to hemoglobin 200-250x more tightly than oxygen",
    "Even low CO levels can significantly reduce oxygen delivery",
    "CO also binds to myoglobin and cytochrome c oxidase",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FlaskConical className="size-5 text-red-500" />
            How CO Binds to Hemoglobin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <COBindingAnimationInner />

          <div className="space-y-2">
            {facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <AlertCircle className="size-4 mt-0.5 shrink-0 text-red-500" />
                <span>{fact}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── 4. SourceRiskTable ────────────────────────────────────────────────────

const filterOptions = ["All", "Low", "Moderate", "High", "Very High"] as const

export function SourceRiskTable() {
  const [filter, setFilter] = useState<string>("All")

  const filteredSources = useMemo(
    () =>
      filter === "All"
        ? sources
        : sources.filter((s) => s.riskLevel === filter),
    [filter]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldAlert className="size-5 text-orange-500" />
            CO Source Risk Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <Button
                key={opt}
                variant={filter === opt ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(opt)}
                className="text-xs"
              >
                {opt}
              </Button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="text-xs font-semibold">Source Name</TableHead>
                  <TableHead className="text-xs font-semibold">Risk Level</TableHead>
                  <TableHead className="text-xs font-semibold">CO Level Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSources.map((source) => (
                  <Accordion
                    key={source.name}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value={source.name} className="border-b-0">
                      <TableRow
                        className="cursor-pointer hover:bg-muted/50 border-b-0"
                        onClick={(e) => {
                          const trigger = (e.currentTarget as HTMLElement).closest(
                            "[data-slot='accordion-item']"
                          )?.querySelector("[data-slot='accordion-trigger']") as HTMLElement
                          trigger?.click()
                        }}
                      >
                        <TableCell className="text-sm font-medium py-3">
                          {source.name}
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${riskColor(source.riskLevel)}`}
                          >
                            {source.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground py-3">
                          {source.coLevel}
                        </TableCell>
                      </TableRow>
                      <AccordionTrigger className="sr-only">
                        Expand {source.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 pb-3 pt-0">
                          <p className="text-sm text-muted-foreground">
                            {source.description}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── 5. BodyEffectsGrid ────────────────────────────────────────────────────

export function BodyEffectsGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HeartPulse className="size-5 text-red-500" />
            Effects on the Human Body
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bodyEffects.map((organ, index) => {
              const isExpanded = expandedIndex === index
              return (
                <motion.div
                  key={organ.organ}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  <div
                    className={`rounded-lg border p-4 cursor-pointer transition-colors hover:bg-muted/50 ${isExpanded ? "ring-2 ring-primary/20 bg-muted/30" : ""}`}
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setExpandedIndex(isExpanded ? null : index)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">
                          {iconMap[organ.icon] ?? <Activity className="size-5" />}
                        </span>
                        <h4 className="font-semibold text-sm">{organ.organ}</h4>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs shrink-0 ${severityColor(organ.severity)}`}
                      >
                        {organ.severity}
                      </Badge>
                    </div>

                    {/* Preview: first 2 effects */}
                    {!isExpanded && (
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {organ.effects.slice(0, 2).map((e, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="mt-1 size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                            {e}
                          </li>
                        ))}
                        {organ.effects.length > 2 && (
                          <li className="text-primary/70 italic ml-2.5">
                            +{organ.effects.length - 2} more...
                          </li>
                        )}
                      </ul>
                    )}

                    {/* Expanded: all effects */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-muted-foreground space-y-1.5 overflow-hidden"
                        >
                          {organ.effects.map((e, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="mt-1.5 size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                              <span>{e}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    {/* Expand indicator */}
                    <div className="flex items-center justify-center mt-2">
                      {isExpanded ? (
                        <ChevronUp className="size-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="size-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── 6. ExposureTimeline ───────────────────────────────────────────────────

function HeartPulse(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={props.className}
    >
      <path d="M19.2 12.8A5.2 5.2 0 0 1 18 20H6a5.2 5.2 0 0 1-1.2-7.2L12 5l7.2 7.8z" />
      <path d="M3.2 12.8L12 4l8.8 8.8a5.2 5.2 0 0 1 .2 7.2" />
      <path d="M22 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M12 4v16" />
    </svg>
  )
}

export function ExposureTimeline() {
  const timelineData = longTermContent.timeline

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="size-5 text-blue-500" />
            Recovery Timeline After CO Poisoning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

            <div className="space-y-6">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.12 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-8 top-1 size-[22px] rounded-full border-2 border-background ${timelineDotColor(item.phase)} z-10 flex items-center justify-center`}
                  >
                    <div className="size-2 rounded-full bg-background" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm">{item.phase}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${timelineBadgeColor(item.phase)}`}
                      >
                        {item.timeframe}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}