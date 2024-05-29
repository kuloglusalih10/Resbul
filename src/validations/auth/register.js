import Yup from "../yup"

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  password: Yup.string().required().min(6),
  email: Yup.string().required().email(),
})
