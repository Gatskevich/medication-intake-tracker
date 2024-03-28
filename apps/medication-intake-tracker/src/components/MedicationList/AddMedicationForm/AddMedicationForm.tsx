import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMedication } from '../../../utils/contexts/MedicationsContext';
import { IMedicationForm } from '../../../interfaces/IMedicationForm';
import './AddMedicationForm.scss';

const schema: Yup.ObjectSchema<IMedicationForm> = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  count: Yup.number()
    .required('Initial count is required')
    .integer('Initial count must be an integer')
    .test('count-validation', 'Initial count must be less than or equal to Destination count and greater than or equal to 0', function(value) {
        const { destinationCount } = this.parent;
        return value <= destinationCount && value >= 0;
    }),
  destinationCount: Yup.number()
    .required('Destination count is required')
    .positive('Destination count must be a positive number')
    .integer('Destination count must be an integer'),
  notes: Yup.array().optional(),
});

interface AddMedicationFormProps {
    medication?: IMedicationForm;
    onClose: () => void;
}

export const AddMedicationForm = ({ medication, onClose }: AddMedicationFormProps) => {
  const { addMedication } = useMedication();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: medication || {}
  });


  const onSubmit = (data: IMedicationForm) => {
    addMedication(data);
    onClose();
    reset();
  };

  return (
    <div className="add-medication-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" {...register('description')} />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <label htmlFor="count">Initial Count</label>
          <input id="count" type="number" {...register('count')} />
          <p>{errors.count?.message}</p>
        </div>
        <div>
          <label htmlFor="destinationCount">Destination Count</label>
          <input id="destinationCount" type="number" {...register('destinationCount')} />
          <p>{errors.destinationCount?.message}</p>
        </div>
        <button type="submit">{medication ? "Update" : "Add"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
