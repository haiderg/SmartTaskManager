interface Props {
  entityName: string;
}

export const NoRecordMessage = ({ entityName }: Props) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500">
        <h4 className="text-xl font-semibold mb-2">No {entityName} yet</h4>
        <p>
          Create your first {entityName.toLowerCase()} above to get started!
        </p>
      </div>
    </div>
  );
};
