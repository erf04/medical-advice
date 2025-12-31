import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"


export class SignInDto {
    @IsNotEmpty()
    phone_number:string
    @IsNotEmpty() 
    password :string 
}


export class SignUpDto {
    @IsNotEmpty()
    first_name : string
    @IsNotEmpty() 
    last_name : string
    @IsNotEmpty() 
    phone : string
    @IsEmail()
    @IsEmpty()
    email : string
    role : string = "patient"
    @IsNotEmpty()
    password : string 

}