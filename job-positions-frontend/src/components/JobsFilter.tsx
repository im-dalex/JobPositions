import { forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

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

const JobsFilter = forwardRef<JobsFilterHandle, JobsFilterProps>(
  ({ onSearch }, ref) => {
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
                  <SelectContent>
                    <SelectItem value="1">IT</SelectItem>
                    <SelectItem value="2">HR</SelectItem>
                  </SelectContent>
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
                  <SelectContent>
                    <SelectItem value="1">Open</SelectItem>
                    <SelectItem value="2">Closed</SelectItem>
                  </SelectContent>
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
