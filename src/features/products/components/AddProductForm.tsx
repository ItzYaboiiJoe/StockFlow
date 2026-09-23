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
import {
  getCurrentBusinessID,
  addProductInfo,
  addProductVariant,
} from "../actions/addProduct";

// Form Schema
const addProductSchema = z.object({
  pName: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters long"),
  pDescription: z.string().trim().optional(),
  pCategory: z.string().trim().optional(),
  vName: z.string().trim().min(1, "Variant name cannot be empty"),
  vSKU: z.string().trim().min(4, "SKU must be at least 4 characters long"),
  vPrice: z
    .number({ error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  vCost: z.number().min(0, "Cost cannot be negative").optional(),
  vLowStockThreshold: z
    .number({ error: "Low Stock Threshold must be a number" })
    .int("Low stock threshold must be a whole number")
    .min(0, "Low stock threshold cannot be negative"),
});

const AddProductForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // State to handle add product errors
  const [errorAdd, setErrorAdd] = useState<string | null>(null);
  // State to control the spinner loading
  const [loading, setLoading] = useState(false);

  // Create Form Instance
  const addProductForm = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      pName: "",
      pDescription: "",
      pCategory: "",
      vName: "",
      vSKU: "",
      vPrice: undefined,
      vCost: undefined,
      vLowStockThreshold: undefined,
    },
  });

  // Form Submit Handler
  async function onSubmit(data: z.infer<typeof addProductSchema>) {
    // Clear Error
    setErrorAdd(null);
    // Activate loading spinner
    setLoading(true);
    try {
      // Fetch Business ID
      const businessID = await getCurrentBusinessID();
      // Insert Product Info to DB
      const productID = await addProductInfo(
        businessID,
        data.pName,
        data.pDescription!,
        data.pCategory!,
      );
      //Insert Variant Info to DB
      await addProductVariant(
        productID.id,
        data.vSKU,
        data.vName,
        data.vPrice,
        data.vCost!,
        data.vLowStockThreshold,
      );
      // Display success message and disable spinner loading
      toast.add({
        type: "success",
        description: `Product ${data.pName} Added Successfully`,
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
        id="add-product-form"
        onSubmit={addProductForm.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {/* Product Information */}
          <div>Product Information</div>
          {/* Product Name */}
          <Controller
            name="pName"
            control={addProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-product-form-pName">
                  Product Name
                </FieldLabel>
                <Input
                  {...field}
                  id="add-product-form-pName"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="e.g. Classic T-Shirt"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Description */}
          <Controller
            name="pDescription"
            control={addProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-product-form-pDescription">
                  Description
                </FieldLabel>
                <Input
                  {...field}
                  id="add-product-form-pDescription"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Optional product description"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Category */}
          <Controller
            name="pCategory"
            control={addProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-product-form-pCategory">
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  id="add-product-form-pCategory"
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="e.g. Clothing"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Variant Information */}
          <div>Variant Information</div>
          <div className="grid grid-cols-2 gap-4">
            {/* Variant Name */}
            <Controller
              name="vName"
              control={addProductForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-product-form-vName">
                    Variant Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="add-product-form-vName"
                    aria-invalid={fieldState.invalid}
                    type="text"
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
              control={addProductForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-product-form-vSKU">SKU</FieldLabel>
                  <Input
                    {...field}
                    id="add-product-form-vSKU"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="e.g. SHIRT-BLK-L"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Price */}
            <Controller
              name="vPrice"
              control={addProductForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-product-form-vPrice">
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
                    id="add-product-form-vPrice"
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
              control={addProductForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-product-form-vCost">Cost</FieldLabel>
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
                    id="add-product-form-vCost"
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
            control={addProductForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-product-form-vLowStockThreshold">
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
                  id="add-product-form-vLowStockThreshold"
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
        <Button type="submit" form="add-product-form">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Spinner className="size-8" /> <span>Adding Product...</span>
            </div>
          ) : (
            "Add Product"
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

export default AddProductForm;
