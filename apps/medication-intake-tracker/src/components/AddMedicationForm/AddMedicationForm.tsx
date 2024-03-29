import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMedication } from "../../utils/contexts/MedicationsContext";
import { IMedicationForm, IMedication } from "../../interfaces";
import { Button, InputField } from "@medication-intake-tracker/shared";
import "./AddMedicationForm.scss";

const schema: Yup.ObjectSchema<IMedicationForm> = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  count: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || isNaN(originalValue)) {
        return undefined;
      }

      return Number(value);
    })
    .required("Initial count is required")
    .integer("Initial count must be an integer")
    .test(
      "count-validation",
      "Initial count must be less than or equal to Destination count and greater than or equal to 0",
      function (value) {
        const { destinationCount } = this.parent;
        return value <= destinationCount && value >= 0;
      },
    ),
  destinationCount: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === "" || isNaN(originalValue)) {
        return undefined;
      }

      return Number(value);
    })
    .required("Destination count is required")
    .positive("Destination count must be a positive number")
    .integer("Destination count must be an integer"),
  notes: Yup.array().optional(),
});

interface AddMedicationFormProps {
  medication?: IMedication;
  onClose: () => void;
}

export const AddMedicationForm = ({
  medication,
  onClose,
}: AddMedicationFormProps) => {
  const { addMedication, updateMedication } = useMedication();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: medication || {},
  });

  const onSubmit = (data: IMedicationForm) => {
    if (medication) {
      updateMedication(medication.id, data);
    } else {
      addMedication(data);
    }

    onClose();
    reset();
  };

  return (
    <div className="add-medication-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="name"
          type="text"
          label="Name"
          register={register}
          error={errors.name?.message}
        />
        <InputField
          id="description"
          type="text"
          label="Description"
          register={register}
          error={errors.description?.message}
        />
        <InputField
          id="count"
          type="number"
          label="Initial Count"
          register={register}
          error={errors.count?.message}
        />
        <InputField
          id="destinationCount"
          type="number"
          label="Destination Count"
          register={register}
          error={errors.destinationCount?.message}
        />
        <div className="add-medication-form__buttons-container">
          <Button type="submit" color="SECONDARY">
            {medication ? "Update" : "Add"}
          </Button>
          <Button onClick={onClose} color="ERROR">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
