"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
} from "@heroui/react";
import { Footer } from "@/app/page";
import { IconMapPin, IconRefresh, IconSearch } from "@tabler/icons-react"; // Optional: npm install @tabler/icons-react
import { ButtonAc } from "@/components/ui/stateful-button";

const PROVINCES_DATA: Record<string, string[]> = {
  "Misamis Oriental": [
    "Cagayan de Oro City",
    "Magsaysay",
    "Gingoog City",
    "Medina",
    "Talisayan",
    "Balingoan",
    "Kinoguitan",
    "Sugbongcogon",
    "Binuangan",
    "Salay",
    "Lagonglong",
    "Balingasag",
    "Jasaan",
    "Villanueva",
    "Tagoloan",
    "Puerto",
    "Opol",
    "El Salvador",
    "Alubijid",
    "Laguindingan",
    "Libertad",
    "Initao",
    "Naawan",
    "Manticao",
    "Lugait",
  ],
};

export function SearchForm() {
  const router = useRouter();
  const DEFAULT_PROVINCE = "Misamis Oriental";
  const DEFAULT_LGU = "Cagayan de Oro City";

  const [selectedProvince, setSelectedProvince] =
    useState<string>(DEFAULT_PROVINCE);
  const [selectedLGU, setSelectedLGU] = useState<string>(DEFAULT_LGU);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = () => {
    setSelectedProvince(DEFAULT_PROVINCE);
    setSelectedLGU(DEFAULT_LGU);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    router.push(
      `/auth/monitor?province=${selectedProvince}&lgu=${selectedLGU}`,
    );

    // Simulate API call
    setTimeout(() => {
      console.log("Province:", selectedProvince, "LGU:", selectedLGU);
      setIsSubmitting(false);
    }, 1000);
  };

  const provincesArray = Object.keys(PROVINCES_DATA);
  const lgusArray = PROVINCES_DATA[selectedProvince] || [];

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-4">
      {/* Aceternity UI: Background Beams (Simplified implementation) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-200/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <Card className="z-10 w-full max-w-xl bg-background/60 backdrop-blur-md border-small border-default-200/50 shadow-medium">
        <CardHeader className="flex flex-col items-start px-8 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-default-100 text-default-600">
              <IconMapPin size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Search Location
              </h1>
              <p className="text-small text-default-500 font-medium">
                DTI-BNPC Monitoring System
              </p>
            </div>
          </div>
        </CardHeader>

        <Divider className="opacity-50" />

        <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Province Selection (HeroUI) */}
            <div className="space-y-2">
              <Select
                label="Province"
                labelPlacement="outside"
                placeholder="Select Province"
                selectedKeys={[selectedProvince]}
                isDisabled={true} // Per your original logic
                variant="bordered"
                classNames={{
                  trigger: "h-12 border-default-200 dark:border-default-100",
                  label: "font-semibold text-default-700",
                }}
              >
                {provincesArray.map((province) => (
                  <SelectItem key={province}>{province}</SelectItem>
                ))}
              </Select>
            </div>

            {/* LGU Selection (HeroUI) */}
            <div className="space-y-2">
              <Select
                label="Local Government Unit"
                labelPlacement="outside"
                placeholder="Choose an LGU"
                variant="bordered"
                selectedKeys={selectedLGU ? [selectedLGU] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  setSelectedLGU(val);
                }}
                classNames={{
                  trigger: "h-12 border-default-200 dark:border-default-100",
                  label: "font-semibold text-default-700",
                }}
              >
                {lgusArray.map((lgu) => (
                  <SelectItem key={lgu}>{lgu}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 mt-4">
              {/* shadcn-like HeroUI Button */}
              <Button
                variant="flat"
                fullWidth
                onPress={handleReset}
                startContent={<IconRefresh size={18} />}
                className="font-semibold rounded-lg"
              >
                Reset
              </Button>

              {/* High-Impact CTA Button */}
              <ButtonAc
                type="submit"
                color="primary"
                className="font-bold shadow-lg shadow-primary/20 w-full"
              >
                Search Data
              </ButtonAc>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="mt-20 w-full">
        <Footer />
      </div>
    </div>
  );
}
