import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

const URL = 'http://865531-cs02320.tmweb.ru:4205'

export default function Crm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const onSubmit = data => {
    axios.post(`${URL}/auth/registration`, data, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    })
      .then(res => {
        setIsError(res.data.error);
        setMessage(res.data.message);
      })
  }


  return (
    <div className="container mx-auto p-4">
      <h1>CRM</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>userName</label>
        <input
          className="border-2"
          type="text"
          {...register("userName", { required: true })}
        />
        <br />
        <label>password</label>
        <input
          className="border-2"
          type='password'
          {...register("password", { required: true })}

        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <input className="border-2" type="submit" />
      </form>
      <div className={isError ? 'bg-red-600' : ' bg-green-600 '}>{message}</div>
    </div>
  )
}

