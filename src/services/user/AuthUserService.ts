import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest {
  email: string;
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {

    const error = "User/Passord incorrect";

    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user)
      throw new Error(error);

    // Verificar se a senha que ele mandou está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new Error(error);

    // gerar um token JWT e devolver os dados do usuario
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }

    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}

export { AuthUserService }