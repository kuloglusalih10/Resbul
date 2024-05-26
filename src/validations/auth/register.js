import Yup from "../yup"

export const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(6),
  email: Yup.string().required().email(),
})
