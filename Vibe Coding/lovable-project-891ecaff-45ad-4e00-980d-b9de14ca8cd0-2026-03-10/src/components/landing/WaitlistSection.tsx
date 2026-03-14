import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, Building2, UserCheck, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  name: z.string().min(2, "Минимум 2 символа").max(60),
  type: z.enum(["individual", "corporate"]),
  company: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const WaitlistSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState<"individual" | "corporate">("individual");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "individual" },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call — replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("Waitlist signup:", data);
    setSubmitted(true);
  };

  const handleTypeChange = (type: "individual" | "corporate") => {
    setSelectedType(type);
    setValue("type", type);
  };

  return (
    <section className="section-padding bg-background" id="waitlist" ref={ref}>
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-3xl md:text-[2.5rem] leading-tight text-foreground mb-4">
            Вступить в waitlist
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Получите ранний доступ к CJM Capture Assistant и возможность протестировать MVP первым.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card-base p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-primary" />
              <h3 className="font-display font-bold text-2xl text-foreground">Вы в списке!</h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Мы напишем на вашу почту, как только откроем ранний доступ. Обычно это в течение 1–2 недель.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              {/* Type selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTypeChange("individual")}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    selectedType === "individual"
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  PO / Консультант
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange("corporate")}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    selectedType === "corporate"
                      ? "border-accent bg-accent/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  Корпоративный пилот
                </button>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="wl-name" className="text-sm font-medium text-foreground">
                  Имя
                </label>
                <input
                  id="wl-name"
                  type="text"
                  placeholder="Иван Иванов"
                  autoComplete="name"
                  {...register("name")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="wl-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="wl-email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Company — shown for corporate */}
              {selectedType === "corporate" && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wl-company" className="text-sm font-medium text-foreground">
                    Компания
                  </label>
                  <input
                    id="wl-company"
                    type="text"
                    placeholder="ООО Ромашка"
                    autoComplete="organization"
                    {...register("company")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-landing flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Отправляем…
                  </>
                ) : (
                  "Записаться в waitlist"
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Никакого спама. Только уведомление об открытии доступа.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
