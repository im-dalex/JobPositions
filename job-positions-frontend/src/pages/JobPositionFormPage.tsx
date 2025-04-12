import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createJobPosition,
  editJobPosition,
  fetchJobPositionById,
} from "@/api/http/jobPosition";
import { useEffect, useState } from "react";
import type { JobPositionCreateDto } from "@/types/jobPosition";
import type { AxiosError } from "axios";
import type { keyValueDto } from "@/types/keyValue";
import {
  fetchDepartments,
  fetchPositionStatuses,
  fetchRecruiters,
} from "@/api/http/miscellaneous";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .nonempty("Title is required"),
  number: z.number().min(0, "Position number is required"),
  budget: z.number().positive("Budget must be greater than 0"),
  departmentId: z.string({
    required_error: "Department is required",
  }),
  recruiterId: z.string({
    required_error: "Recruiter is required",
  }),
  statusId: z.string({
    required_error: "Status is required",
  }),
});

type PositionFormType = z.infer<typeof FormSchema>;

type FormOptions = Record<
  "statuses" | "recruiters" | "departments",
  keyValueDto[]
>;

const JobPositionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState<FormOptions>({
    statuses: [],
    recruiters: [],
    departments: [],
  });

  const goBack = () => navigate(-1);

  const fetchFormOptions = async () => {
    const [departments, statuses, recruiters] = await Promise.all([
      fetchDepartments(),
      fetchPositionStatuses(),
      fetchRecruiters(),
    ]);

    setOptions({ departments, statuses, recruiters });
  };

  const fetchJobPosition = async (positionId: number) => {
    const position = await fetchJobPositionById(positionId);
    if (!position) return;

    form.reset({
      title: position.title,
      number: position.number,
      budget: position.budget,
      departmentId: String(position.departmentId),
      statusId: String(position.statusId),
      recruiterId: String(position.recruiterId),
    });
  };

  useEffect(() => {
    fetchFormOptions();
    if (!id) return;
    fetchJobPosition(Number(id));
  }, [id]);

  const form = useForm<PositionFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      number: 0,
      budget: 0,
    },
  });

  const onSubmit = async (data: PositionFormType) => {
    const model: JobPositionCreateDto = {
      ...data,
      departmentId: Number(data.departmentId),
      statusId: Number(data.statusId),
      recruiterId: Number(data.recruiterId),
    };
    try {
      if (id) {
        await editJobPosition(Number(id), model);
      } else {
        await createJobPosition(model);
      }
      toast.success(`Job position was submitted successfully`, {
        position: "top-right",
        richColors: true,
      });
      goBack();
    } catch (error) {
      const { response } = error as AxiosError;
      const { message } = response?.data as Record<string, string>;
      toast.error(`Error submitting the job position`, {
        position: "top-right",
        description: message,
        richColors: true,
      });
    }
  };

  const titleVerb = id ? "Edit" : "Create";

  return (
    <>
      <h2 className="mb-5 text-2xl">{titleVerb} Position</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid items-start w-2/3 grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent optionItems={options.departments} />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent optionItems={options.statuses} />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recruiterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recruiter</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Recruiter" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent optionItems={options.recruiters} />
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between col-span-2">
            <Button variant="secondary" onClick={goBack}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default JobPositionPage;
