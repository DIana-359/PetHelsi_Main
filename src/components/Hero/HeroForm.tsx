"use client"
import React from "react";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react"
import { Icon } from "@iconify/react";

interface FormData {
  email: string;
  roleName: string;
}

const ROLES_TYPES = [
  { key: "CLIENT", text: "Я - власник тварини" },
  {key: "VET", text: "Я - ветеринар"}
]

export const HeroForm = () => {
  const [formData, setFormData] = React.useState<FormData>({
      email: "",
      roleName: "CLIENT"
  });
  const [submitted, setSubmitted] = React.useState<FormData | null>(null);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setEmailError(true);
      return
    } else {
      setEmailError(false);
    }
    setSubmitted({ ...formData });
  };

  return (
    <Form
    className="w-full flex-col space-x-4 md:flex-row lg:max-w-[840px] bg-white rounded-xl p-4"
    onSubmit={handleSubmit}
    >
      <Select
        className="lg:max-w-2xs"
        classNames={{
          base: "shadow-none",
          trigger: "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
        }}
        listboxProps={{
          itemClasses: {
            base: "data-[selected=true]:!bg-primary-100 data-[selected=true]:text-primary-700 hover:!bg-primary-200",
          }
        }}
        name="roleName"
        defaultSelectedKeys={["CLIENT"]}
        value={formData.roleName}
        onChange={(value) => setFormData({ ...formData, roleName: value.toString() })}
        aria-label="Role"
        variant="bordered"
        color="primary"
        startContent={
          <Icon icon="lucide:user" className="text-primary text-lg" />
        }
      >
      {ROLES_TYPES.map((role) => (
            <SelectItem className="text-gray-800" key={role.key}>{role.text}</SelectItem>
          ))}
      </Select>

      <Input
        className="w-full lg:max-w-2xs"
        classNames={{
          base: "shadow-none",
          inputWrapper: "border-primary-300 hover:!border-primary focus:border-primary shadow-none",
        }}
        name="email"
        placeholder="Ваш E-mail"
        type="email"
        aria-label="Email"
        variant="bordered"
        color="primary"
        startContent={
          <Icon icon="lucide:mail" className="text-primary text-lg" />
        }
        endContent={
          emailError && (
            <Icon icon="lucide:alert-circle" className="text-danger text-lg" />
          )
        }
        isInvalid={emailError}
      />
        <Button 
          className="w-full md:w-auto min-w-[200px]" 
          radius="sm" 
          color="primary" 
          type="submit"
        >
          Повідомити про запуск
        </Button>
      
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted.roleName)}</code>
        </div>
      )}
    </Form>
  )
}