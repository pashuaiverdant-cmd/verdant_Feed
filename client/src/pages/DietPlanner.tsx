import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDietLogs, useCreateDietLog } from "@/hooks/use-diet-logs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Calculator, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  contact: z.string().min(5, "Contact is required"),
  cattleType: z.enum(["Cow", "Buffalo", "Goat"]),
  breed: z.string().min(1, "Breed is required"),
  weightCategory: z.string().min(1, "Weight is required"),
  age: z.coerce.number().min(0, "Age must be valid"),
  healthStatus: z.enum(["Healthy", "Sick", "Pregnant"]),
  tagged: z.enum(["Yes", "No"]),
});

type FormValues = z.infer<typeof formSchema>;

type BreedOption = {
  value: string;     // used in logic
  label: string;     // shown in UI (includes region)
  region: string;
};

const breedOptions: Record<FormValues["cattleType"], BreedOption[]> = {
  Cow: [
    { value: "Gir", label: "Gir — Gujarat", region: "Gujarat" },
    { value: "Sahiwal", label: "Sahiwal — Punjab/Haryana", region: "Punjab/Haryana" },
    { value: "Tharparkar", label: "Tharparkar — Rajasthan", region: "Rajasthan" },
    { value: "Red Sindhi", label: "Red Sindhi — North/West India", region: "North/West India" },
    { value: "Rathi", label: "Rathi — Rajasthan", region: "Rajasthan" },
    { value: "Hariana", label: "Hariana — Haryana", region: "Haryana" },
    { value: "Kankrej", label: "Kankrej — Gujarat/Rajasthan", region: "Gujarat/Rajasthan" },
    { value: "Ongole", label: "Ongole — Andhra Pradesh", region: "Andhra Pradesh" },
    { value: "Deoni", label: "Deoni — Maharashtra/Karnataka", region: "Maharashtra/Karnataka" },
    { value: "Kangayam", label: "Kangayam — Tamil Nadu", region: "Tamil Nadu" },
    { value: "Hallikar", label: "Hallikar — Karnataka", region: "Karnataka" },
    { value: "Gaolao", label: "Gaolao — MP/Maharashtra", region: "MP/Maharashtra" },
    { value: "Khillari", label: "Khillari — Maharashtra/Karnataka", region: "Maharashtra/Karnataka" },
    { value: "Vechur", label: "Vechur — Kerala", region: "Kerala" },
    { value: "Punganur", label: "Punganur — Andhra Pradesh", region: "Andhra Pradesh" },
    { value: "Dangi", label: "Dangi — Maharashtra", region: "Maharashtra" },
    { value: "Nagori", label: "Nagori — Rajasthan", region: "Rajasthan" },
    { value: "Other", label: "Other — (Any Region)", region: "Any" },
  ],
  Buffalo: [
    { value: "Murrah", label: "Murrah — Haryana/Punjab", region: "Haryana/Punjab" },
    { value: "Mehsana", label: "Mehsana — Gujarat", region: "Gujarat" },
    { value: "Jaffarabadi", label: "Jaffarabadi — Gujarat", region: "Gujarat" },
    { value: "Surti", label: "Surti — Gujarat", region: "Gujarat" },
    { value: "Bhadawari", label: "Bhadawari — UP/MP", region: "UP/MP" },
    { value: "Nagpuri", label: "Nagpuri — Maharashtra", region: "Maharashtra" },
    { value: "Nili Ravi", label: "Nili Ravi — Punjab", region: "Punjab" },
    { value: "Pandharpuri", label: "Pandharpuri — Maharashtra", region: "Maharashtra" },
    { value: "Toda", label: "Toda — Tamil Nadu (Nilgiris)", region: "Tamil Nadu" },
    { value: "Chilika", label: "Chilika — Odisha", region: "Odisha" },
    { value: "Other", label: "Other — (Any Region)", region: "Any" },
  ],
  Goat: [
    { value: "Jamunapari", label: "Jamunapari — Uttar Pradesh", region: "Uttar Pradesh" },
    { value: "Beetal", label: "Beetal — Punjab", region: "Punjab" },
    { value: "Barbari", label: "Barbari — Uttar Pradesh", region: "Uttar Pradesh" },
    { value: "Sirohi", label: "Sirohi — Rajasthan", region: "Rajasthan" },
    { value: "Black Bengal", label: "Black Bengal — West Bengal", region: "West Bengal" },
    { value: "Osmanabadi", label: "Osmanabadi — Maharashtra", region: "Maharashtra" },
    { value: "Malabari", label: "Malabari (Kannur) — Kerala", region: "Kerala" },
    { value: "Jakhrana", label: "Jakhrana — Rajasthan", region: "Rajasthan" },
    { value: "Gaddi", label: "Gaddi — Himachal Pradesh", region: "Himachal Pradesh" },
    { value: "Marwari", label: "Marwari — Rajasthan", region: "Rajasthan" },
    { value: "Zalawadi", label: "Zalawadi — Gujarat", region: "Gujarat" },
    { value: "Sangamneri", label: "Sangamneri — Maharashtra", region: "Maharashtra" },
    { value: "Surti", label: "Surti — Gujarat", region: "Gujarat" },
    { value: "Changthangi", label: "Changthangi — Ladakh", region: "Ladakh" },
    { value: "Chegu", label: "Chegu — Himachal/J&K", region: "Himachal/J&K" },
    { value: "Other", label: "Other — (Any Region)", region: "Any" },
  ],
};

const weightOptions: Record<FormValues["cattleType"], string[]> = {
  Cow: ["0-300kg", "300-400kg", "400-500kg"],
  Buffalo: ["0-300kg", "300-400kg", "400-500kg"],
  Goat: ["20-50kg", "50-80kg", "80-120kg"],
};

// small summary saved in logs
function makeSummary(data: FormValues) {
  return `${data.cattleType} • ${data.breed} • ${data.weightCategory} • ${data.healthStatus} — Chart generated`;
}

export default function DietPlanner() {
  const { toast } = useToast();
  const { data: logs, isLoading: logsLoading } = useDietLogs();
  const { mutateAsync: createLog, isPending } = useCreateDietLog();
  const [, setLocation] = useLocation();

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

  // reset breed when cattleType changes (prevents mismatch)
  useEffect(() => {
    if (!cattleType) return;
    form.setValue("breed", "");
  }, [cattleType, form]);

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
        title: "Diet Chart Generated!",
        description: "Opening full chart with details.",
      });

      // send breedRegion too
      const region =
        breedOptions[data.cattleType].find((b) => b.value === data.breed)?.region ?? "Any";

      // default Hindi chart => lang=hi
      const params = new URLSearchParams({
        lang: "hi",
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

      setLocation(`/diet-chart?${params.toString()}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save diet log. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Smart Diet Planner
          </h1>
          <p className="text-lg text-muted-foreground">
            Get feeding recommendations based on cattle type, breed, weight, and health status.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-lg">
              <CardHeader className="bg-primary/5 pb-8 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                  <Calculator className="h-6 w-6" />
                  Enter Cattle Details
                </CardTitle>
                <CardDescription>All fields are required for accurate calculation.</CardDescription>
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
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-background" />
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
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91..." {...field} className="bg-background" />
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
                            <FormLabel>Cattle Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                {/* ✅ make solid */}
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              {/* ✅ make dropdown solid */}
                              <SelectContent className="bg-background">
                                <SelectItem value="Cow">Cow</SelectItem>
                                <SelectItem value="Buffalo">Buffalo</SelectItem>
                                <SelectItem value="Goat">Goat</SelectItem>
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
                            <FormLabel>Breed (with region)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!cattleType}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder={cattleType ? "Select breed" : "Select cattle type first"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                {cattleType &&
                                  breedOptions[cattleType].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
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
                            <FormLabel>Weight Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!cattleType}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder={cattleType ? "Select weight" : "Select cattle type first"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                {cattleType &&
                                  weightOptions[cattleType].map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                      {opt}
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
                            <FormLabel>Age (Years)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} className="bg-background" />
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
                            <FormLabel>Health Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                <SelectItem value="Healthy">Healthy</SelectItem>
                                <SelectItem value="Sick">Sick</SelectItem>
                                <SelectItem value="Pregnant">Pregnant</SelectItem>
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
                            <FormLabel>Tagged?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background !opacity-100">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-background">
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
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
                          Calculating...
                        </>
                      ) : (
                        "Generate Diet Chart"
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
                  Recent Logs
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow overflow-auto max-h-[600px] p-0">
                {logsLoading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : logs && logs.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-secondary/20 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-primary text-sm">
                            {log.cattleType} ({log.breed})
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {log.weightCategory} • {log.healthStatus}
                        </p>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {log.dietPlanResult}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No history yet. Generate your first plan!
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
