"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RANKS } from "@/types/user";
import { capitalize } from "@/lib/utils";
import {
  createCourseSchema,
  type CreateCourseInput,
} from "@/lib/validations/course";
import { useCreateCourse, useUpdateCourse } from "@/hooks/use-courses";
import type { Course } from "@/types/course";
import { useState } from "react";
import { ImagePlus } from "lucide-react";

interface CourseFormProps {
  initialData?: Course;
}

export function CourseForm({ initialData }: CourseFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          rank: initialData.rank as CreateCourseInput["rank"],
        }
      : undefined,
  });

  const onSubmit = async (data: CreateCourseInput) => {
    setServerError("");
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: initialData.id, data });
        router.push(`/courses/${initialData.id}/edit`);
      } else {
        const course = await createMutation.mutateAsync(data);
        router.push(`/courses/${course.id}/edit`);
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <form id="course-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div>
        {!isEdit && (
          <div className="mb-12">
            <div className="flex items-center shrink-0 w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="h-11 text-[14px] font-semibold text-gray-900 flex items-center justify-center w-full">
                Basic information to begin the draft
              </div>
            </div>
          </div>
        )}
        
        {serverError && (
          <div className="bg-red-50 text-red-600 border border-red-100 text-[13px] px-3 py-2 rounded-lg mb-8">
            {serverError}
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <div>
              <Label htmlFor="title" className="text-[14px] font-semibold text-gray-900 block">Course Title</Label>
              <p className="text-[13px] text-gray-500 mt-1">Give your course a clear and concise title.</p>
            </div>
            <div>
              <input
                id="title"
                placeholder="e.g. Aerodynamics 101"
                className="h-9 text-[13px] placeholder:text-[13px] placeholder:text-gray-400 bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg w-full px-3 outline-none transition-colors border"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <div>
              <Label htmlFor="rank" className="text-[14px] font-semibold text-gray-900 block">Target Rank</Label>
              <p className="text-[13px] text-gray-500 mt-1">The target audience level for this course.</p>
            </div>
            <div>
              <Select 
                onValueChange={(val) => setValue("rank", val as CreateCourseInput["rank"])}
                defaultValue={initialData?.rank}
              >
                <SelectTrigger className="!h-9 text-[13px] data-[placeholder]:text-[13px] data-[placeholder]:text-gray-400 bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg w-full" id="rank">
                  <SelectValue placeholder="Select rank..." />
                </SelectTrigger>
                <SelectContent>
                  {RANKS.map((rank) => (
                    <SelectItem key={rank} value={rank} className="text-[13px]">
                      {capitalize(rank)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Hidden input to register rank field for validation */}
              <input type="hidden" {...register("rank")} />
              
              {errors.rank && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.rank.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <div>
              <Label className="text-[14px] font-semibold text-gray-900 block">Course Thumbnail</Label>
              <p className="text-[13px] text-gray-500 mt-1">This is used in course cards and site sections.</p>
            </div>
            <div>
              <div className="w-full h-[140px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ImagePlus className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-[13px] font-medium text-gray-900 mb-1">Click to upload image</p>
                <p className="text-[11px] text-gray-500">PNG, JPG or WEBP (Max 2MB)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            <div>
              <Label htmlFor="description" className="text-[14px] font-semibold text-gray-900 block">Description</Label>
              <p className="text-[13px] text-gray-500 mt-1">Describe what students will learn from this course.</p>
            </div>
            <div>
              <textarea
                id="description"
                rows={8}
                placeholder="Describe the course content and objectives..."
                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-[13px] placeholder:text-[13px] placeholder:text-gray-400 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors outline-none resize-none"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
