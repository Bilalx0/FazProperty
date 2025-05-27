import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DashLayout } from "@/components/layout/dash-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { FileDown, Eye, Mail, Trash2 } from "lucide-react";
import { formatDate, objectsToCSV, downloadCSV, truncateText } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function EnquiriesPage() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [deleteEnquiryId, setDeleteEnquiryId] = useState<number | null>(null);

  // Fetch enquiries
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['/api/enquiries'],
  });

  // Delete enquiry mutation
  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/enquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries'] });
      toast({
        title: "Enquiry deleted",
        description: "The enquiry has been successfully deleted.",
      });
      setDeleteEnquiryId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete enquiry. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to delete enquiry:", error);
    }
  });

  // Mark enquiry as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("PUT", `/api/enquiries/${id}/read`, {});
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries'] });
      toast({
        title: "Enquiry marked as read",
        description: "The enquiry has been marked as read.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark enquiry as read. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to mark enquiry as read:", error);
    }
  });

  const handleDelete = (id: number) => {
    setDeleteEnquiryId(id);
  };

  const confirmDelete = () => {
    if (deleteEnquiryId !== null) {
      deleteEnquiryMutation.mutate(deleteEnquiryId);
    }
  };

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };

  const handleExportCSV = () => {
    const csv = objectsToCSV(enquiries);
    downloadCSV(csv, "enquiries.csv");
    toast({
      title: "Export successful",
      description: "Enquiries have been exported to CSV.",
    });
  };

  return (
    <DashLayout
      title="Enquiries Management"
      description="Manage customer enquiries and messages"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-6">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-6">No enquiries found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {enquiry.name || "Anonymous"}
                </h3>
                <Badge variant={enquiry.isRead ? "outline" : "secondary"}>
                  {enquiry.isRead ? "Read" : "New"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Email:</span> {enquiry.email || "—"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Phone:</span> {enquiry.phone || "—"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Subject:</span> {enquiry.subject || "General Enquiry"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Message:</span>{" "}
                  <span title={enquiry.message}>
                    {truncateText(enquiry.message || "No message provided", 50)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Property Ref:</span> {enquiry.propertyReference || "—"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Date:</span> {formatDate(enquiry.createdAt) || "—"}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/enquiries/${enquiry.id}`)}
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMarkAsRead(enquiry.id)}
                  disabled={enquiry.isRead}
                  title="Mark as Read"
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Mark as Read</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(enquiry.id)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteEnquiryId !== null} onOpenChange={(open) => !open && setDeleteEnquiryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this enquiry. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashLayout>
  );
}