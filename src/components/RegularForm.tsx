import { useState, ChangeEvent, FormEvent } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
// import { validate } from 'email-validator';

interface FormData {
  username: string;
  email: string;
  password: string;
  gender: string;
}

function RegularForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    gender: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    alert(JSON.stringify(formData));
    setFormData({
      username: '',
      email: '',
      password: '',
      gender: ''
    })
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const isPasswordValid = (password: string) => {
    // Regular expression for password validation
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])(?=.{8,20})/;
    return passwordPattern.test(password);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1>Change Me To React Hook Form</h1>
      <div>
        <input
          type="text"
          id="username"
          placeholder='Enter UserName'
          {...register('username',
            { required: true, minLength: 2 })}
          onChange={handleChange}
          aria-invalid={errors.username ? true : false}
        />
        {errors.username?.type === 'required' && <p role='alert'>user name is required</p>}
        {errors.username?.type === 'minLength' && <p role='alert'>user name is uninvalid</p>}
      </div>
      <div>
        <input
          type="text"
          id="email"
          placeholder='Enter Email'
          {...register('email', { required: true, pattern: emailPattern })}

          onChange={handleChange}
          aria-invalid={errors.email ? true : false}
        />
        {errors.email?.type === 'required' && <p role='alert'>user email is required</p>}
        {errors.email?.type === 'pattern' && <p role='alert'>user email is uninvalid</p>}
      </div>
      <div>
        <input
          type="text"
          id="password"
          placeholder='Enter Password'
          {...register('password', {
            required: true,
            validate: isPasswordValid, // Custom password validation
          })}

          onChange={handleChange}
          aria-invalid={errors.password ? true : false}
        />
        {errors.password?.type === 'required' && <p role='alert'>password is required</p>}
        {errors.password?.type === 'validate' && <p role='alert'>user password is uninvalid</p>}
      </div>
      <div>
        <select
          id="gender"
          {...register("gender", { required: true })}>
          <option value="">Select Gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        {errors.gender?.type === 'required' && <p role='alert'>Gender is required</p>}

      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularForm;
