import React from 'react';
import { useNavigate } from 'react-router-dom';


interface FormField {
  name: string;
  label: string;
  type: string;
}

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
];

const UserForm: React.FC = () => {
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    formFields.forEach((field) => {
      if (!formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('userDetails', JSON.stringify(formData));
      navigate('/second');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="https://www.growmeorganic.com/wp-content/uploads/2020/05/GrowMeOrganicLogo-e1589337030567-360x60.png" alt="GrowMeOrganic Logo" className="mb-4 w-48 h-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">User Information</h1>
        <form onSubmit={handleSubmit} noValidate>
          {formFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-main focus:border-primary-main ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#95430B] text-white rounded-md shadow hover:bg-[#7b3410] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#95430B]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
