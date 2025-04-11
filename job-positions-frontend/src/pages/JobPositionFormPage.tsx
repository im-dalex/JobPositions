import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast, Toaster } from "sonner";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createJobPosition,
  editJobPosition,
  fetchJobPositionById,
} from "@/api/http/jobPosition";
import { useEffect } from "react";
import { JobPositionCreateDto } from "@/types/jobPosition";
import { AxiosError } from "axios";

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

export const JobPositionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const fetchJobPosition = async (positionId: number) => {
    const position = await fetchJobPositionById(positionId);
    console.log(position);
    if (!position) return;

    form.reset({
      title: position.title,
      number: position.number,
      budget: position.budget,
      departmentId: String(position.departmentId),
      statusId: String(position.statusId),
      recruiterId: String(position.recruiterId),
    });
    form.setValue("departmentId", String(position.recruiterId));
    console.log(form.getValues());
  };

  useEffect(() => {
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
      <Toaster expand visibleToasts={9} />
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
                <FormLabel>Department {field.value}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">IT</SelectItem>
                    <SelectItem value="2">HR</SelectItem>
                  </SelectContent>
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
                  <SelectContent>
                    <SelectItem value="1">Open</SelectItem>
                    <SelectItem value="2">Closed</SelectItem>
                  </SelectContent>
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
                  <SelectContent>
                    <SelectItem value="1">Veronica Arias</SelectItem>
                    <SelectItem value="2">Adrian Carmona</SelectItem>
                  </SelectContent>
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
