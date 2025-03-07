import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Tag, AlertCircle, CheckCircle2, X } from "lucide-react";
import { TicketType } from "../types/types";

interface TicketModalProps {
  ticket: TicketType;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  const getPriorityColor = (priority: string) => {
    const priorityLower = priority.toLowerCase(); // Ensure lower case
    const colors: { [key: string]: string } = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
      critical: "bg-purple-100 text-purple-700",
    };
    return colors[priorityLower] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase(); // Ensure lower case
    const colors: { [key: string]: string } = {
      open: "bg-blue-100 text-blue-700",
      "in progress": "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      closed: "bg-gray-100 text-gray-700",
    };
    return colors[statusLower] || "bg-gray-100 text-gray-700";
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 20 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-25 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer" 
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 pr-8">
              {ticket.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Creation date not available"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Category
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 inline-block">
                  {ticket.category}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Priority
                  </span>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-lg text-sm inline-block ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Status</span>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-lg text-sm inline-block ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TicketModal;