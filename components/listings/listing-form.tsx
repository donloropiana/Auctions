"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/form/InputFormField";
import { SelectFormField } from "@/components/form/SelectFormField";
import { TextareaFormField } from "@/components/form/TextareaFormField";
import { listingFormSchema } from "@/lib/schemas/listing";
import { cn } from "@/lib/utils";
import { DateTimeFormField } from "@/components/form/DateTimeFormField";
import { submitListing } from "@/lib/api/listings";

type FormData = z.infer<typeof listingFormSchema>;

export default function ListingForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      category: "wine",
      volume_ml: 750,
      status: "upcoming",
      start_price: 0,
      reserve_price: 0,
      start_date_time: new Date().toISOString(),
      end_date_time: new Date().toISOString(),
      wine_details: {
        vintage: 0,
        varietal: "",
        region: "",
      }
    },
  });

  const category = form.watch("category");

  // Set category-specific details
  useEffect(() => {
    if (category === "wine") {
      form.setValue("wine_details", {
        vintage: 0,
        varietal: "",
        region: "",
      });
    } else if (category === "spirit") {
      form.setValue("spirit_details", {
        age: 0,
        proof: 0,
        subcategory: "",
      });
    }
  }, [category, form.setValue]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5,
  });

  async function onSubmit(values: FormData) {
    try {
      console.log("Inside onSubmit function");
      console.log("Form values:", JSON.stringify(values, null, 2));
      console.log("Files:", files);
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('values', JSON.stringify(values));
      
      // Append each file
      files.forEach((file) => {
        formData.append('files', file);
      });
      
      const response = await fetch('/api/listing', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const data = await response.json();
      console.log("Submission response:", data);
      
      toast.success("Listing created successfully");
      router.push("/listings");
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error("Error creating listing: " + (error as Error).message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <InputFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="1982 Château Lafite Rothschild"
            />
            <InputFormField
              control={form.control}
              name="brand"
              label="Brand/Producer"
              placeholder="Château Lafite Rothschild"
            />
          </div>

          <TextareaFormField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe your listing..."
          />

          {/* Category Selection */}
          <SelectFormField
            control={form.control}
            name="category"
            label="Category"
            options={[
              { value: "wine", label: "Wine" },
              { value: "spirit", label: "Spirit" },
            ]}
          />

          {/* Volume */}
          <InputFormField
            control={form.control}
            name="volume_ml"
            label="Volume (ml)"
            type="number"
          />

          {/* Category Specific Fields */}
          {category === "wine" && (
            <div className="grid gap-4 md:grid-cols-3">
              <InputFormField
                control={form.control}
                name="wine_details.vintage"
                label="Vintage"
                type="number"
                placeholder="1982"
                min={1800}
                max={new Date().getFullYear()}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : 0;
                  form.setValue("wine_details.vintage", value);
                }}
              />
              <InputFormField
                control={form.control}
                name="wine_details.varietal"
                label="Varietal"
                placeholder="Cabernet Sauvignon"
              />
              <InputFormField
                control={form.control}
                name="wine_details.region"
                label="Region"
                placeholder="Bordeaux"
              />
            </div>
          )}

          {category === "spirit" && (
            <div className="grid gap-4 md:grid-cols-3">
              <InputFormField
                control={form.control}
                name="spirit_details.age"
                label="Age (years)"
                type="number"
                placeholder="12"
              />
              <InputFormField
                control={form.control}
                name="spirit_details.proof"
                label="Proof"
                type="number"
                placeholder="80"
              />
              <InputFormField
                control={form.control}
                name="spirit_details.subcategory"
                label="Subcategory"
                placeholder="Single Malt Scotch"
              />
            </div>
          )}

          {/* Pricing and Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <InputFormField
              control={form.control}
              name="start_price"
              label="Start Price"
              type="number"
              min={0}
              placeholder="100"
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : 0;
                form.setValue("start_price", value);
              }}
            />
            <InputFormField
              control={form.control}
              name="reserve_price"
              label="Reserve Price (Optional)"
              type="number"
              min={0}
              placeholder="500"
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value) : 0;
                form.setValue("reserve_price", value);
              }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DateTimeFormField
              control={form.control}
              name="start_date_time"
              label="Start Date & Time"
            />
            <DateTimeFormField
              control={form.control}
              name="end_date_time"
              label="End Date & Time"
            />
          </div>

          {/* Image Upload */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
              isDragActive && "border-primary bg-primary/10"
            )}
          >
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className="space-y-2">
                <p>Selected files:</p>
                {files.map((file) => (
                  <p key={file.name}>{file.name}</p>
                ))}
              </div>
            ) : (
              <div>
                <p>Drag & drop images here, or click to select files</p>
                <p className="text-sm text-muted-foreground">
                  (Up to 5 images, JPEG/PNG/WebP)
                </p>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          onClick={() => {
            console.log("Create Listing form button clicked");
            console.log("Form state:", form.formState);
            console.log("Form errors:", form.formState.errors);
          }}
        >
          Create Listing
        </Button>
      </form>
    </Form>
  );
}