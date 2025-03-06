import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Ticket,
  AlertCircle,
  Clock,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Fragment } from "react";

export interface CreateTicketData {
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
}

const priorityColors: { [key: string]: string } = {
  Low: "bg-green-400",
  Medium: "bg-yellow-400",
  High: "bg-orange-400",
  Critical: "bg-red-400",
};

const CreateTicketForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateTicketData>();

  const priorityValue = watch("priority");

  const mutation = useMutation(apiClient.createTicket, {
    onSuccess: async () => {
      showToast({ message: "Ticket created successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("tickets");
      navigate("/tickets");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Ticket
          </h1>
          <p className="text-gray-600">
            Submit a new support ticket and we'll help you resolve your issue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Ticket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">New Ticket</h3>
                  <p className="text-sm text-gray-500">
                    Create support request
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Average response time: 2-4 hours</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>24/7 Support available</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Priority Levels</h4>
                <div className="space-y-2">
                  {["Low", "Medium", "High", "Critical"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${priorityColors[level]}`}
                      />
                      <span className="text-sm text-gray-600">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Brief description of your issue"
                  />
                  {errors.title && (
                    <span className="text-sm text-red-500 mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Provide detailed information about your issue"
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Select category"
                    />
                    {errors.category && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.category.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <Menu
                      as="div"
                      className="relative inline-block text-left w-full"
                    >
                      <div>
                        <Menu.Button className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 flex items-center justify-between">
                          {priorityValue ? priorityValue : "Select Priority"}
                          <ChevronDown
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {["Low", "Medium", "High", "Critical"].map(
                            (priority) => (
                              <Menu.Item key={priority}>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setValue(
                                        "priority",
                                        priority as
                                          | "Low"
                                          | "Medium"
                                          | "High"
                                          | "Critical"
                                      );
                                    }}
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } group flex items-center w-full px-4 py-3 text-sm`}
                                  >
                                    <div
                                      className={`w-2 h-2 rounded-full mr-2 ${priorityColors[priority]}`}
                                    />
                                    {priority}
                                  </button>
                                )}
                              </Menu.Item>
                            )
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {errors.priority && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.priority.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-6 py-3 text-sm font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Creating Ticket...
                      </span>
                    ) : (
                      "Create Ticket"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketForm;