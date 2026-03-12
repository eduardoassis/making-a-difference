import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

const StepContact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">{t("stepContact.title")}</h2>
      <p className="text-sm text-muted-foreground mb-5">{t("stepContact.subtitle")}</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("stepContact.firstName")}</label>
          <Input
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder={t("stepContact.firstNamePlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("stepContact.lastName")}</label>
          <Input
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder={t("stepContact.lastNamePlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("stepContact.email")}</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t("stepContact.emailPlaceholder")}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{t("stepContact.phone")}</label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t("stepContact.phonePlaceholder")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepContact;
