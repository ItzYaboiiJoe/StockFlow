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
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { addNewVariant } from "../actions/addVariants";

// Form Schema
const addProductVariantsSchema = z.object({
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
});

const AddProductVariantsForm = ({
  onSuccess,
  productId,
}: {
  onSuccess: () => void;
  productId: string;
}) => {
  // State to handle add variants errors
  const [errorAdd, setErrorAdd] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const addVariantForm = useForm<z.infer<typeof addProductVariantsSchema>>({
    resolver: zodResolver(addProductVariantsSchema),
    defaultValues: {
      vName: "",
      vSKU: "",
      vPrice: undefined,
      vCost: undefined,
      vLowStockThreshold: undefined,
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof addProductVariantsSchema>) {
    // Clear Error
    setErrorAdd(null);
    // Activate loading spinner
    setLoading(true);
    try {
      // Insert Variant into DB
      await addNewVariant(
        productId,
        data.vSKU,
        data.vName,
        data.vPrice,
        data.vCost,
        data.vLowStockThreshold,
      );
      // Display success message and disable spinner loading
      toast.add({
        type: "success",
        description: `Variant ${data.vName} Added Successfully`,
        priority: "high",
      });
      setLoading(false);
      // Close modal
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Display Error Message and disable spinner loading
        setErrorAdd(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <form
        id="add-variant-form"
        onSubmit={addVariantForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Variant Name */}
          <Controller
            name="vName"
            control={addVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-variant-form-vName">
                  Variant Name
                </FieldLabel>
                <Input
                  {...field}
                  id="add-variant-form-vName"
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
            control={addVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-variant-form-vSKU">SKU</FieldLabel>
                <Input
                  {...field}
                  id="add-variant-form-vSKU"
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
              control={addVariantForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-variant-form-vPrice">
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
                    id="add-variant-form-vPrice"
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
              control={addVariantForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-variant-form-vCost">Cost</FieldLabel>
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
                    id="add-variant-form-vCost"
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
            control={addVariantForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-variant-form-vLowStockThreshold">
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
                  id="add-variant-form-vLowStockThreshold"
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
        </FieldGroup>
      </form>
      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <Button type="submit" form="add-variant-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Adding Variant...</span>
            </div>
          ) : (
            "Add Variant"
          )}
        </Button>

        {/* Display Error Message */}
        {errorAdd && (
          <p className="text-md text-center text-red-700 font-semibold">
            {errorAdd}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProductVariantsForm;
