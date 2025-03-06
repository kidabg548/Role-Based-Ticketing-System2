// src/components/CreateTicketForm.tsx

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export interface CreateTicketData {
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
}

const CreateTicketForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketData>();

  const mutation = useMutation(apiClient.createTicket, {
    onSuccess: async () => {
      showToast({ message: "Ticket created successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("tickets"); // Invalidate tickets query
      navigate("/tickets"); // Navigate to the tickets list page
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Ticket</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="border rounded w-full py-2 px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: "This field is required" })}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="border rounded w-full py-2 px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", { required: "This field is required" })}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              className="border rounded w-full py-2 px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: "This field is required" })}
            />
            {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="border rounded w-full py-2 px-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("priority", { required: "This field is required" })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
               <option value="Critical">Critical</option>
            </select>
            {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white text-lg py-2 px-4 rounded-lg font-bold hover:bg-blue-500 transition duration-200 ease-in-out"
            >
              {isSubmitting ? "Creating Ticket..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketForm;