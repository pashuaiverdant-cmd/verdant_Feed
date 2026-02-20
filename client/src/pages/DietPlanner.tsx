import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDietLogs, useCreateDietLog } from "@/hooks/use-diet-logs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Calculator, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function DietPlanner() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { data: logs, isLoading: logsLoading } = useDietLogs();
  const { mutateAsync: createLog, isPending } = useCreateDietLog();
  const [, setLocation] = useLocation();

  const formSchema = z.object({
    name: z.string().min(2, t("dietPlanner.validation.name", "Name is required")),
    contact: z
      .string()
      .min(5, t("dietPlanner.validation.contact", "Contact is required")),
    cattleType: z.enum(["Cow", "Buffalo", "Goat"], {
      required_error: t("dietPlanner.validation.type", "Cattle type is required"),
    }),
    breed: z.string().min(1, t("dietPlanner.validation.breed", "Breed is required")),
    weightCategory: z
      .string()
      .min(1, t("dietPlanner.validation.weight", "Weight is required")),
    age: z.coerce.number().min(0, t("dietPlanner.validation.age", "Age must be valid")),
    healthStatus: z.enum(["Healthy", "Sick", "Pregnant"], {
      required_error: t("dietPlanner.validation.health", "Health status is required"),
    }),
    tagged: z.enum(["Yes", "No"], {
      required_error: t("dietPlanner.validation.tagged", "Tagged selection is required"),
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  type BreedOption = {
    value: string;        // stable value stored in DB/logs
    labelKey: string;     // translation key for visible label
    fallback: string;     // fallback label in English
    region: string;       // used for diet-chart param
  };

  type WeightOption = {
    value: string;
    labelKey: string;
    fallback: string;
  };

  // ✅ FIXED: breed keys must be under dietPlanner.form.breeds...
  const breedOptions: Record<FormValues["cattleType"], BreedOption[]> = useMemo(
    () => ({
      Cow: [
        { value: "Gir", labelKey: "dietPlanner.form.breeds.cow.gir", fallback: "Gir — Gujarat", region: "Gujarat" },
        { value: "Sahiwal", labelKey: "dietPlanner.form.breeds.cow.sahiwal", fallback: "Sahiwal — Punjab/Harayana", region: "Punjab/Haryana" },
        { value: "Tharparkar", labelKey: "dietPlanner.form.breeds.cow.tharparkar", fallback: "Tharparkar — Rajasthan", region: "Rajasthan" },
        { value: "Red Sindhi", labelKey: "dietPlanner.form.breeds.cow.redSindhi", fallback: "Red Sindhi — North/West India", region: "North/West India" },
        { value: "Rathi", labelKey: "dietPlanner.form.breeds.cow.rathi", fallback: "Rathi — Rajasthan", region: "Rajasthan" },
        { value: "Hariana", labelKey: "dietPlanner.form.breeds.cow.hariana", fallback: "Hariana — Haryana", region: "Haryana" },
        { value: "Kankrej", labelKey: "dietPlanner.form.breeds.cow.kankrej", fallback: "Kankrej — Gujarat/Rajasthan", region: "Gujarat/Rajasthan" },
        { value: "Ongole", labelKey: "dietPlanner.form.breeds.cow.ongole", fallback: "Ongole — Andhra Pradesh", region: "Andhra Pradesh" },
        { value: "Deoni", labelKey: "dietPlanner.form.breeds.cow.deoni", fallback: "Deoni — Maharashtra/Karnataka", region: "Maharashtra/Karnataka" },
        { value: "Kangayam", labelKey: "dietPlanner.form.breeds.cow.kangayam", fallback: "Kangayam — Tamil Nadu", region: "Tamil Nadu" },
        { value: "Hallikar", labelKey: "dietPlanner.form.breeds.cow.hallikar", fallback: "Hallikar — Karnataka", region: "Karnataka" },
        { value: "Gaolao", labelKey: "dietPlanner.form.breeds.cow.gaolao", fallback: "Gaolao — MP/Maharashtra", region: "MP/Maharashtra" },
        { value: "Khillari", labelKey: "dietPlanner.form.breeds.cow.khillari", fallback: "Khillari — Maharashtra/Karnataka", region: "Maharashtra/Karnataka" },
        { value: "Vechur", labelKey: "dietPlanner.form.breeds.cow.vechur", fallback: "Vechur — Kerala", region: "Kerala" },
        { value: "Punganur", labelKey: "dietPlanner.form.breeds.cow.punganur", fallback: "Punganur — Andhra Pradesh", region: "Andhra Pradesh" },
        { value: "Dangi", labelKey: "dietPlanner.form.breeds.cow.dangi", fallback: "Dangi — Maharashtra", region: "Maharashtra" },
        { value: "Nagori", labelKey: "dietPlanner.form.breeds.cow.nagori", fallback: "Nagori — Rajasthan", region: "Rajasthan" },
        { value: "Other", labelKey: "dietPlanner.breed.other", fallback: "Other — (Any Region)", region: "Any" },
      ],
      Buffalo: [
        { value: "Murrah", labelKey: "dietPlanner.form.breeds.buffalo.murrah", fallback: "Murrah — Haryana/Punjab", region: "Haryana/Punjab" },
        { value: "Mehsana", labelKey: "dietPlanner.form.breeds.buffalo.mehsana", fallback: "Mehsana — Gujarat", region: "Gujarat" },
        { value: "Jaffarabadi", labelKey: "dietPlanner.form.breeds.buffalo.jaffarabadi", fallback: "Jaffarabadi — Gujarat", region: "Gujarat" },
        { value: "Surti", labelKey: "dietPlanner.form.breeds.buffalo.surti", fallback: "Surti — Gujarat", region: "Gujarat" },
        { value: "Bhadawari", labelKey: "dietPlanner.form.breeds.buffalo.bhadawari", fallback: "Bhadawari — UP/MP", region: "UP/MP" },
        { value: "Nagpuri", labelKey: "dietPlanner.form.breeds.buffalo.nagpuri", fallback: "Nagpuri — Maharashtra", region: "Maharashtra" },
        { value: "Nili Ravi", labelKey: "dietPlanner.form.breeds.buffalo.niliRavi", fallback: "Nili Ravi — Punjab", region: "Punjab" },
        { value: "Pandharpuri", labelKey: "dietPlanner.form.breeds.buffalo.pandharpuri", fallback: "Pandharpuri — Maharashtra", region: "Maharashtra" },
        { value: "Toda", labelKey: "dietPlanner.form.breeds.buffalo.toda", fallback: "Toda — Tamil Nadu (Nilgiris)", region: "Tamil Nadu" },
        { value: "Chilika", labelKey: "dietPlanner.form.breeds.buffalo.chilika", fallback: "Chilika — Odisha", region: "Odisha" },
        { value: "Other", labelKey: "dietPlanner.breed.other", fallback: "Other — (Any Region)", region: "Any" },
      ],
      Goat: [
        { value: "Jamunapari", labelKey: "dietPlanner.form.breeds.goat.jamunapari", fallback: "Jamunapari — Uttar Pradesh", region: "Uttar Pradesh" },
        { value: "Beetal", labelKey: "dietPlanner.form.breeds.goat.beetal", fallback: "Beetal — Punjab", region: "Punjab" },
        { value: "Barbari", labelKey: "dietPlanner.form.breeds.goat.barbari", fallback: "Barbari — Uttar Pradesh", region: "Uttar Pradesh" },
        { value: "Sirohi", labelKey: "dietPlanner.form.breeds.goat.sirohi", fallback: "Sirohi — Rajasthan", region: "Rajasthan" },
        { value: "Black Bengal", labelKey: "dietPlanner.form.breeds.goat.blackBengal", fallback: "Black Bengal — West Bengal", region: "West Bengal" },
        { value: "Osmanabadi", labelKey: "dietPlanner.form.breeds.goat.osmanabadi", fallback: "Osmanabadi — Maharashtra", region: "Maharashtra" },
        { value: "Malabari", labelKey: "dietPlanner.form.breeds.goat.malabari", fallback: "Malabari (Kannur) — Kerala", region: "Kerala" },
        { value: "Jakhrana", labelKey: "dietPlanner.form.breeds.goat.jakhrana", fallback: "Jakhrana — Rajasthan", region: "Rajasthan" },
        { value: "Gaddi", labelKey: "dietPlanner.form.breeds.goat.gaddi", fallback: "Gaddi — Himachal Pradesh", region: "Himachal Pradesh" },
        { value: "Marwari", labelKey: "dietPlanner.form.breeds.goat.marwari", fallback: "Marwari — Rajasthan", region: "Rajasthan" },
        { value: "Zalawadi", labelKey: "dietPlanner.form.breeds.goat.zalawadi", fallback: "Zalawadi — Gujarat", region: "Gujarat" },
        { value: "Sangamneri", labelKey: "dietPlanner.form.breeds.goat.sangamneri", fallback: "Sangamneri — Maharashtra", region: "Maharashtra" },
        { value: "Surti", labelKey: "dietPlanner.form.breeds.goat.surti", fallback: "Surti — Gujarat", region: "Gujarat" },
        { value: "Changthangi", labelKey: "dietPlanner.form.breeds.goat.changthangi", fallback: "Changthangi — Ladakh", region: "Ladakh" },
        { value: "Chegu", labelKey: "dietPlanner.form.breeds.goat.chegu", fallback: "Chegu — Himachal/J&K", region: "Himachal/J&K" },
        { value: "Other", labelKey: "dietPlanner.breed.other", fallback: "Other — (Any Region)", region: "Any" },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );

  const weightOptions: Record<FormValues["cattleType"], WeightOption[]> = useMemo(
    () => ({
      Cow: [
        { value: "0-300kg", labelKey: "dietPlanner.weights.cow.w0_300", fallback: "0–300 kg" },
        { value: "300-400kg", labelKey: "dietPlanner.weights.cow.w300_400", fallback: "300–400 kg" },
        { value: "400-500kg", labelKey: "dietPlanner.weights.cow.w400_500", fallback: "400–500 kg" },
      ],
      Buffalo: [
        { value: "0-300kg", labelKey: "dietPlanner.weights.buffalo.w0_300", fallback: "0–300 kg" },
        { value: "300-400kg", labelKey: "dietPlanner.weights.buffalo.w300_400", fallback: "300–400 kg" },
        { value: "400-500kg", labelKey: "dietPlanner.weights.buffalo.w400_500", fallback: "400–500 kg" },
      ],
      Goat: [
        { value: "20-50kg", labelKey: "dietPlanner.weights.goat.w20_50", fallback: "20–50 kg" },
        { value: "50-80kg", labelKey: "dietPlanner.weights.goat.w50_80", fallback: "50–80 kg" },
        { value: "80-120kg", labelKey: "dietPlanner.weights.goat.w80_120", fallback: "80–120 kg" },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );

  function makeSummary(data: FormValues) {
    // ✅ show translated cattle/health, but keep stored breed value stable
    const typeLabel = t(`dietPlanner.cattle.${String(data.cattleType).toLowerCase()}`, data.cattleType);
    const healthLabel = t(`dietPlanner.health.${String(data.healthStatus).toLowerCase()}`, data.healthStatus);

    return t(
      "dietPlanner.log.summary",
      "{{type}} • {{breed}} • {{weight}} • {{health}} — Chart generated",
      {
        type: typeLabel,
        breed: data.breed,
        weight: data.weightCategory,
        health: healthLabel,
      }
    );
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      age: 0,
      tagged: "No",
    },
  });

  const cattleType = form.watch("cattleType");

  useEffect(() => {
    if (!cattleType) return;
    form.setValue("breed", "");
    form.setValue("weightCategory", "");
  }, [cattleType, form]);

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(i18n.language || "en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(iso));
    } catch {
      return new Date(iso).toLocaleDateString();
    }
  };

  const getBreedDisplay = (type: FormValues["cattleType"], breedValue: string) => {
    const opt = breedOptions[type]?.find((b) => b.value === breedValue);
    if (!opt) return breedValue; // fallback for legacy/unknown
    return t(opt.labelKey, opt.fallback);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const summary = makeSummary(data);

      await createLog({
        date: new Date().toISOString(),
        cattleType: data.cattleType,
        breed: data.breed,
        weightCategory: data.weightCategory,
        age: data.age,
        healthStatus: data.healthStatus,
        tagged: data.tagged,
        dietPlanResult: summary,
      });

      toast({
        title: t("dietPlanner.toast.generatedTitle", "Diet Chart Generated!"),
        description: t("dietPlanner.toast.generatedDesc", "Opening full chart with details."),
      });

      const region =
        breedOptions[data.cattleType].find((b) => b.value === data.breed)?.region ?? "Any";

      const lang = (i18n.language || "en").toLowerCase().startsWith("hi") ? "hi" : "en";

      const params = new URLSearchParams({
        lang,
        name: data.name,
        contact: data.contact,
        cattleType: data.cattleType,
        breed: data.breed,
        breedRegion: region,
        weightCategory: data.weightCategory,
        age: String(data.age),
        healthStatus: data.healthStatus,
        tagged: data.tagged,
      });

      localStorage.setItem("verdant_lang", lang);
      setLocation(`/diet-chart?${params.toString()}`);
    } catch (error) {
      toast({
        title: t("dietPlanner.toast.errorTitle", "Error"),
        description: t("dietPlanner.toast.errorDesc", "Failed to save diet log. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-16 bg-background font-sans">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
            {t("dietPlanner.title", "Smart Diet Planner")}
          </h1>

          <p className="text-lg text-muted-foreground">
            {t(
              "dietPlanner.subtitle",
              "Get feeding recommendations based on cattle type, breed, weight, and health status."
            )}
          </p>

          <p className="text-xs text-muted-foreground mt-3">
            {t("dietPlanner.brandNotePrefix", "Powered by")}{" "}
            <span data-verdant-brand className="notranslate" translate="no">
              Verdant
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-lg">
              <CardHeader className="bg-primary/5 pb-8 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                  <Calculator className="h-6 w-6" />
                  {t("dietPlanner.form.title", "Enter Cattle Details")}
                </CardTitle>
                <CardDescription>
                  {t("dietPlanner.form.desc", "All fields are required for accurate calculation.")}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.yourName", "Your Name")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-background"
                                placeholder={t("dietPlanner.form.namePlaceholder", "Enter your name")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.contact", "Contact Number")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("dietPlanner.form.contactPlaceholder", "+91...")}
                                {...field}
                                className="bg-background"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="cattleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.cattleType", "Cattle Type")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder={t("dietPlanner.form.selectType", "Select type")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                <SelectItem value="Cow">{t("dietPlanner.cattle.cow", "Cow")}</SelectItem>
                                <SelectItem value="Buffalo">{t("dietPlanner.cattle.buffalo", "Buffalo")}</SelectItem>
                                <SelectItem value="Goat">{t("dietPlanner.cattle.goat", "Goat")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="breed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.breed", "Breed (with region)")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!cattleType}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue
                                    placeholder={
                                      cattleType
                                        ? t("dietPlanner.form.selectBreed", "Select breed")
                                        : t("dietPlanner.form.selectTypeFirst", "Select cattle type first")
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent className="bg-background">
                                {cattleType &&
                                  breedOptions[cattleType].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {t(opt.labelKey, opt.fallback)}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weightCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.weight", "Weight Category")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!cattleType}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue
                                    placeholder={
                                      cattleType
                                        ? t("dietPlanner.form.selectWeight", "Select weight")
                                        : t("dietPlanner.form.selectTypeFirst", "Select cattle type first")
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                {cattleType &&
                                  weightOptions[cattleType].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {t(opt.labelKey, opt.fallback)}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.age", "Age (Years)")}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                className="bg-background"
                                placeholder={t("dietPlanner.form.agePlaceholder", "e.g., 4")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healthStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.health", "Health Status")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder={t("dietPlanner.form.selectStatus", "Select status")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                <SelectItem value="Healthy">{t("dietPlanner.health.healthy", "Healthy")}</SelectItem>
                                <SelectItem value="Sick">{t("dietPlanner.health.sick", "Sick")}</SelectItem>
                                <SelectItem value="Pregnant">{t("dietPlanner.health.pregnant", "Pregnant")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tagged"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("dietPlanner.form.tagged", "Tagged?")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder={t("dietPlanner.form.select", "Select...")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                <SelectItem value="Yes">{t("dietPlanner.yes", "Yes")}</SelectItem>
                                <SelectItem value="No">{t("dietPlanner.no", "No")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("dietPlanner.button.calculating", "Calculating...")}
                        </>
                      ) : (
                        t("dietPlanner.button.generate", "Generate Diet Chart")
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <div className="lg:col-span-1">
            <Card className="h-full border-border shadow-md flex flex-col">
              <CardHeader className="bg-secondary/30 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5 text-muted-foreground" />
                  {t("dietPlanner.history.title", "Recent Logs")}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow overflow-auto max-h-[600px] p-0">
                {logsLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                    <div className="text-xs text-muted-foreground mt-3">
                      {t("common.loading", "Loading...")}
                    </div>
                  </div>
                ) : logs && logs.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-secondary/20 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-primary text-sm">
                            {t(`dietPlanner.cattle.${String(log.cattleType).toLowerCase()}`, log.cattleType)}{" "}
                            ({getBreedDisplay(log.cattleType as FormValues["cattleType"], log.breed)})
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(log.date)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {log.weightCategory} •{" "}
                          {t(`dietPlanner.health.${String(log.healthStatus).toLowerCase()}`, log.healthStatus)}
                        </p>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {log.dietPlanResult}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    {t("dietPlanner.history.empty", "No history yet. Generate your first plan!")}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}