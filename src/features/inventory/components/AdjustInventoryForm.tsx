"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InventoryInfo } from "../actions/fetchInventory";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

// Form schema
const adjustInventorySchema = z.object({
  productVariantId: z.number({ error: "Please select a product variant" }),
  quantity: z
    .number({
      error: "Quantity is required",
    })
    .int("Quantity must be a whole number")
    .min(-999999, "Quantity is too low")
    .max(999999, "Quantity is too high")
    .refine((value) => value !== 0, {
      message: "Quantity cannot be 0",
    }),
  reason: z.string().min(1, "Please select a reason"),
  note: z.string().max(250, "Note must be 250 characters or less").optional(),
});

const AdjustInventoryForm = ({
  onSuccess,
  inventory,
}: {
  onSuccess: () => void;
  inventory: InventoryInfo[];
}) => {
  // State to handle adjust inventory errors
  const [errorAdjust, setErrorAdjust] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create form instance
  const adjustInventoryForm = useForm<z.infer<typeof adjustInventorySchema>>({
    resolver: zodResolver(adjustInventorySchema),
    defaultValues: {
      productVariantId: undefined,
      quantity: undefined,
      reason: "",
      note: "",
    },
  });

  // To display the products in the dropdown
  const variantOptions = inventory.flatMap((product) =>
    product.product_variant.map((variant) => ({
      id: variant.id,
      label: `${product.name} - ${variant.variant_name}`,
    })),
  );

  const router = useRouter();

  // Form submit handler
  async function onSubmit(data: z.infer<typeof adjustInventorySchema>) {
    console.log(data);
    onSuccess();
    router.refresh();
  }

  return (
    <div>
      <form
        id="adjust-inventory-form"
        onSubmit={adjustInventoryForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Products / Variants Dropdown */}
          <Controller
            name="productVariantId"
            control={adjustInventoryForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="adjust-inventory-form-productVariantId">
                  Product / Variant
                </FieldLabel>
                <Select
                  value={field.value?.toString() ?? null}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger id="adjust-inventory-form-productVariantId">
                    <SelectValue placeholder="Select a product variant">
                      {variantOptions.find((v) => v.id === field.value)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {variantOptions.map((variant) => (
                        <SelectItem
                          key={variant.id}
                          value={variant.id.toString()}
                        >
                          {variant.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Quantity Change */}
          <Controller
            name="quantity"
            control={adjustInventoryForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="adjust-inventory-form-quantity">
                  Quantity Change
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : e.target.valueAsNumber,
                    )
                  }
                  id="adjust-inventory-form-quantity"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="e.g. +5 or -5"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Reason */}
          <Controller
            name="reason"
            control={adjustInventoryForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="adjust-inventory-form-reason">
                  Reason
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Restock">Restock</SelectItem>
                      <SelectItem value="Damage">Damage</SelectItem>
                      <SelectItem value="Return">Return</SelectItem>
                      <SelectItem value="Correction">Correction</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Note */}
          <Controller
            name="note"
            control={adjustInventoryForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="adjust-inventory-form-note">
                  Note (optional)
                </FieldLabel>
                <Input
                  {...field}
                  id="adjust-inventory-form-note"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={250}
                  placeholder="e.g. Damaged during shipping"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {/* Adjust button */}
      <div className="flex justify-end mt-5">
        <Button disabled={loading} type="submit" form="adjust-inventory-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Adjusting...</span>
            </div>
          ) : (
            "Adjust"
          )}
        </Button>

        {/* Display Error Message */}
        {errorAdjust && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorAdjust}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdjustInventoryForm;
