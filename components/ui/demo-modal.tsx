"use client";

import * as React from "react";
import { X, Calendar, Clock, Monitor, User, Mail, Phone, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── helpers ── */
function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const TIME_SLOTS = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "6:00 PM – 8:00 PM",
];

const SOFTWARE_OPTIONS = [
  "Tally on Computer",
  "TallyPrime",
  "Tally ERP 9",
  "Other / Not Sure",
];

/* ── context ── */
type ModalCtx = { open: () => void };
const ModalContext = React.createContext<ModalCtx>({ open: () => {} });
export function useDemoModal() { return React.useContext(ModalContext); }

/* ── provider ── */
export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback(() => setIsOpen(true), []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && <DemoModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

/* ── steps ── */
type Step = "schedule" | "contact" | "success";

function DemoModal({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2);

  const DATE_OPTIONS = [
    { label: "Today",    sub: formatDate(today),    value: formatDate(today) },
    { label: "Tomorrow", sub: formatDate(tomorrow), value: formatDate(tomorrow) },
    { label: dayAfter.toLocaleDateString("en-IN", { weekday: "long" }), sub: formatDate(dayAfter), value: formatDate(dayAfter) },
  ];

  const [step, setStep] = React.useState<Step>("schedule");
  const [selectedDate, setSelectedDate] = React.useState(DATE_OPTIONS[0].value);
  const [timeSlot, setTimeSlot] = React.useState(TIME_SLOTS[7]);
  const [software, setSoftware] = React.useState(SOFTWARE_OPTIONS[0]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [firm, setFirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          firmName: firm,
          date: selectedDate,
          timeSlot,
          software,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Something went wrong.");
      }
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl shadow-[0_32px_80px_-20px_rgba(16,185,129,0.45)] sm:max-w-xl"
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        {/* Green header */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 px-6 py-7 text-center sm:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-3xl">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:cursor-pointer absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white/80 transition hover:bg-white/25 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Book a Demo
          </h2>
          <p className="relative mt-1.5 text-sm text-emerald-100">
            {step === "success"
              ? "Your booking is confirmed!"
              : step === "schedule"
              ? "Select a date and time slot for your demo"
              : "Just a few details about you"}
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-6 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            {step === "schedule" && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
              >
                {/* Date picker */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-800">Select Date</p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                      {DATE_OPTIONS.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setSelectedDate(d.value)}
                          className={cn(
                            "flex flex-col items-center rounded-xl border px-2 py-3 text-sm transition-all",
                            selectedDate === d.value
                              ? "border-emerald-500 bg-emerald-50 font-semibold text-emerald-700 ring-2 ring-emerald-400/40"
                              : "border-zinc-200 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/40"
                          )}
                        >
                          <span className="font-semibold">{d.label}</span>
                          <span className={cn("mt-0.5 text-[11px]", selectedDate === d.value ? "text-emerald-500" : "text-zinc-400")}>
                            {d.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time slot */}
                <div className="mt-5 flex items-start gap-3 sm:gap-4">
                  <Clock className="mt-3 h-5 w-5 shrink-0 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-800">Time Slot</p>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Software */}
                <div className="mt-5 flex items-start gap-3 sm:gap-4">
                  <Monitor className="mt-3 h-5 w-5 shrink-0 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-800">Software</p>
                    <select
                      value={software}
                      onChange={(e) => setSoftware(e.target.value)}
                      className="mt-2.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                    >
                      {SOFTWARE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("contact")}
                  className="hover:cursor-pointer mt-6 w-full rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(16,185,129,0.65)] active:translate-y-0"
                >
                  Continue Booking →
                </button>
              </motion.div>
            )}

            {step === "contact" && (
              <motion.form
                key="contact"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span><strong>{selectedDate}</strong> · {timeSlot} · {software}</span>
                </div>

                <div className="space-y-4">
                  <Field icon={<User className="h-4 w-4" />} label="Full Name" required>
                    <input
                      type="text"
                      required
                      placeholder="Rajesh Kapoor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldCls}
                    />
                  </Field>
                  <Field icon={<Mail className="h-4 w-4" />} label="Work Email" required>
                    <input
                      type="email"
                      required
                      placeholder="you@firm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldCls}
                    />
                  </Field>
                  <Field icon={<Phone className="h-4 w-4" />} label="Phone / WhatsApp" required>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldCls}
                    />
                  </Field>
                  <Field icon={<Building2 className="h-4 w-4" />} label="Firm / Company">
                    <input
                      type="text"
                      placeholder="Kapoor & Associates (optional)"
                      value={firm}
                      onChange={(e) => setFirm(e.target.value)}
                      className={fieldCls}
                    />
                  </Field>
                </div>

                {error && (
                  <p className="mt-3 rounded-xl bg-rose-50 px-4 py-2.5 text-xs text-rose-700">
                    {error}
                  </p>
                )}

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("schedule")}
                    className="hover:cursor-pointer flex-1 rounded-2xl border border-zinc-200 py-3.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="hover:cursor-pointer flex-1 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Booking…
                      </span>
                    ) : "Confirm Booking"}
                  </button>
                </div>
              </motion.form>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                className="py-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-900">You&apos;re booked! 🎉</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  We&apos;ve received your request for <strong>{selectedDate}</strong> at{" "}
                  <strong>{timeSlot}</strong>. Our team will WhatsApp you shortly to confirm.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:cursor-pointer mt-6 w-full rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── reusable field ── */
const fieldCls =
  "mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/50";

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        <span className="text-emerald-500">{icon}</span>
        {label}
        {required && <span className="text-rose-400">*</span>}
      </label>
      {children}
    </div>
  );
}
