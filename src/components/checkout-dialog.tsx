import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export type CheckoutPlan = {
  id: "formation" | "accompagnement";
  label: string;
  price: string;
};

const schema = z.object({
  fullName: z.string().trim().min(2, "Indique ton prénom et nom").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
});

interface CheckoutDialogProps {
  plan: CheckoutPlan | null;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ plan, onOpenChange }: CheckoutDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    const parsed = schema.safeParse({ fullName, email });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.functions.invoke("create-mollie-payment", {
      body: {
        plan: plan.id,
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        origin: window.location.origin,
      },
    });
    setLoading(false);

    if (error) {
      const details =
        error instanceof FunctionsHttpError ? await error.context.text() : error.message;
      console.error("create-mollie-payment failed:", details);
      toast.error("Le paiement n'a pas pu être lancé. Réessaie dans un instant.");
      return;
    }

    if (data?.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      toast.error("Lien de paiement indisponible.");
    }
  };

  return (
    <Dialog open={!!plan} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>{plan?.label}</DialogTitle>
          <DialogDescription>
            Renseigne ton e-mail : tu recevras l'accès à la formation immédiatement après le
            paiement de {plan?.price}.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Prénom et nom</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Léo Martin"
              maxLength={100}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse e-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@email.com"
              maxLength={255}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redirection..." : "Payer en toute sécurité"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Paiement sécurisé par Mollie · Satisfait ou remboursé 30 jours
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
