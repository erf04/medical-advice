import { IsNotEmpty } from "class-validator"


export class SignInDto {
    @IsNotEmpty()
    phone_number:string
    @IsNotEmpty() 
    password :string 
}