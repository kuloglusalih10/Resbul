import Yup from "../yup"

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6)
})
