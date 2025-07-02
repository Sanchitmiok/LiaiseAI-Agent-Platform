import EmptyState from "@/components/empty-state";
export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting in cancelled"
        description="This meeting has been cancelled and will not take place. You can create a new meeting if needed."
      />
    </div>
  );
};
