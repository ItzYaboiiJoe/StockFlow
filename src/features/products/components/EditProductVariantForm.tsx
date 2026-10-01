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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { ProductVariantsInfo } from "../actions/fetchProducts";
import { updateVariantInfo } from "../actions/editVariants";

// Form Schema
const editVariantSchema = z.object({
  vName: z
    .string()
    .trim()
    .min(1, "Variant name cannot be empty")
    .max(50, "Variant name must be 50 characters or less"),
  vSKU: z
    .string()
    .trim()
    .min(4, "SKU must be at least 4 characters long")
    .max(40, "Product sku must be 40 characters or less"),
  vPrice: z
    .number({ error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  vCost: z.number().min(0, "Cost cannot be negative").optional(),
  vLowStockThreshold: z
    .number({ error: "Low Stock Threshold must be a number" })
    .int("Low stock threshold must be a whole number")
    .min(0, "Low stock threshold cannot be negative"),
  status: z.boolean(),
});

const EditProductVariantForm = ({
  onSuccess,
  variant,
}: {
  onSuccess: () => void;
  variant: ProductVariantsInfo;
}) => {
  // State to handle edit variant errors
  const [errorEdit, setErrorEdit] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const editVariantForm = useForm<z.infer<typeof editVariantSchema>>({
    resolver: zodResolver(editVariantSchema),
    defaultValues: {
      vName: variant.variant_name,
      vSKU: variant.sku,
      vPrice: variant.price,
      vCost: variant.cost ?? undefined,
      vLowStockThreshold: variant.low_stock_threshold,
      status: variant.active,
    },
  });

  async function onSubmit(data: z.infer<typeof editVariantSchema>) {
    // Clear Error
    setErrorEdit(null);
    // Activate loading spinner
    setLoading(true);
    try {
      await updateVariantInfo(
        variant.id,
        data.vSKU,
        data.vName,
        data.vPrice,
        data.vCost,
        data.vLowStockThreshold,
        data.status,
      );
      // Display success message and disable spinner loading
      toast.add({
        type: "success",
        description: `${data.vName} updated successfully`,
        priority: "high",
      });
      // Close modal
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Display Error Message and disable spinner loading
        setErrorEdit(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <form
        id="edit-variant-form"
        onSubmit={editVariantForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Variant Name */}
          <Controller
            name="vName"
            control={editVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-variant-form-vName">
                  Variant Name
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-variant-form-vName"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={50}
                  placeholder="e.g. Black / Large"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* SKU */}
          <Controller
            name="vSKU"
            control={editVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-variant-form-vSKU">SKU</FieldLabel>
                <Input
                  {...field}
                  id="edit-variant-form-vSKU"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  maxLength={40}
                  placeholder="e.g. SHIRT-BLK-L"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <Controller
              name="vPrice"
              control={editVariantForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-variant-form-vPrice">
                    Price
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
                    id="edit-variant-form-vPrice"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="0.00"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Cost */}
            <Controller
              name="vCost"
              control={editVariantForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-variant-form-vCost">
                    Cost
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
                    id="edit-variant-form-vCost"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="0.00"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          {/* Low Stock Threshold */}
          <Controller
            name="vLowStockThreshold"
            control={editVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-variant-form-vLowStockThreshold">
                  Low Stock Threshold
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
                  id="edit-variant-form-vLowStockThreshold"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="e.g. 5"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Status */}
          <Controller
            name="status"
            control={editVariantForm.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Variant Status</FieldLabel>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">
                      {field.value ? "Active" : "Inactive"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {field.value
                        ? "This variant is currently active."
                        : "This variant is currently inactive."}
                    </p>
                  </div>
                  <Switch
                    id="edit-variant-form-status"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button disabled={loading} type="submit" form="edit-variant-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>

        {/* Display Error Message */}
        {errorEdit && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorEdit}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProductVariantForm;
