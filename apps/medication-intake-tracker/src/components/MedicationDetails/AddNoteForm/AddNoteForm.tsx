import { Controller, useForm } from "react-hook-form";
import { CustomEditor } from "../CustomEditor/CustomEditor";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMedication } from "../../../utils/contexts/MedicationsContext";
import * as Yup from "yup";
import { IMedication, IMedicationNoteForm } from "../../../interfaces";

const schema: Yup.ObjectSchema<IMedicationNoteForm> = Yup.object().shape({
  note: Yup.string().required("Text note is required"),
});

interface AddNoteFormProps {
  medication: IMedication;
  onClose: () => void;
}

export const AddNoteForm = ({ medication, onClose }: AddNoteFormProps) => {
  const { updateMedication } = useMedication();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IMedicationNoteForm) => {
    updateMedication(medication.id, {
      ...medication,
      notes: medication.notes ? [...medication.notes, data.note] : [data.note],
    });
    onClose();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="note">Note</label>
        <Controller
          render={({ field }) => (
            <CustomEditor field={field} error={!!errors.note} />
          )}
          name="note"
          control={control}
        />
        <p>{errors.note?.message}</p>
      </div>
      <button type="submit">Add</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};
