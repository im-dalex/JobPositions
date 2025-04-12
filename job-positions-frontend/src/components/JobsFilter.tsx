import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import type { keyValueDto } from "@/types/keyValue";
import {
  fetchDepartments,
  fetchPositionStatuses,
} from "@/api/http/miscellaneous";

export interface JobsFilterHandle {
  resetFilters: () => void;
}

export interface JobsFilterProps {
  onSearch: (title?: string, departmentId?: number, statusId?: number) => void;
}

const FilterSchema = z.object({
  title: z.string().optional(),
  departmentId: z.string().optional(),
  statusId: z.string().optional(),
});

type FiltersModel = z.infer<typeof FilterSchema>;

type FiltersOptions = Record<"statuses" | "departments", keyValueDto[]>;

const JobsFilter = forwardRef<JobsFilterHandle, JobsFilterProps>(
  ({ onSearch }, ref) => {
    const [options, setOptions] = useState<FiltersOptions>({
      statuses: [],
      departments: [],
    });

    const fetchFormOptions = async () => {
      const [departments, statuses] = await Promise.all([
        fetchDepartments(),
        fetchPositionStatuses(),
      ]);

      setOptions({ departments, statuses });
    };

    useEffect(() => {
      fetchFormOptions();
    }, []);

    const form = useForm<FiltersModel>({
      resolver: zodResolver(FilterSchema),
      defaultValues: { title: "" },
    });

    const resetFilters = () => form.reset({ departmentId: "", statusId: "" });

    const onSubmit = (filters: FiltersModel) =>
      onSearch(
        filters.title,
        filters.departmentId ? Number(filters.departmentId) : undefined,
        filters.statusId ? Number(filters.statusId) : undefined
      );

    useImperativeHandle(ref, () => ({ resetFilters }));

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Position Title"
                    type="search"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent optionItems={options.departments} />
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent optionItems={options.statuses} />
                </Select>
              </FormItem>
            )}
          />
          <Button>Search</Button>
          <Button variant="outline" onClick={resetFilters}>
            Clear
          </Button>
        </form>
      </Form>
    );
  }
);

export default JobsFilter;
