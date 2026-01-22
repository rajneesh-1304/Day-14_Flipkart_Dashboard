import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Users, Querry } from './user.interface';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async register(data) {
    const userRepo = this.dataSource.getRepository(User);

    const existingUser = await userRepo.findOne({ where: { email: data.email } });
    if (existingUser) throw new ConflictException('Email already registered');

    if (data.password.length < 8) throw new BadRequestException('Password must be at least 8 characters');

    const user = userRepo.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });

    await userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  // register(data:any ){
  //   const email = this.users.find((e)=> e.email === data.email);
  //   if(email){
  //     throw new ConflictException(
  //       'Email is already completed',
  //     );
  //   }

  //   if(data.password.length <8){
  //     throw new BadRequestException('Password is less than 8 digits');
  //   }

  //   if(data.role === 'Admin'){
  //     throw new BadRequestException('Cannot select Admin');
  //   }
  //   const id=Date.now();

  //   const user:Users = {
  //     id:id,
  //     name:data.name,
  //     email:data.email,
  //     password:data.password,
  //     role:data.role,
  //   }

  //   this.users.push(user);
  //   console.log('Register Successfully');
  //   return {
  //     message: 'User registered successfully',
  //   };
  // }

  async login(data){
    const userRepo=this.dataSource.getRepository(User);
    const user = await userRepo.findOne({where : {email:data.email}});
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== data.password) {
    throw new BadRequestException('Incorrect password');   
  }
  return { message: 'User logged in successfully',
    role:user.role,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
   };
  }

  // login(data: any) {
  //   const user = this.users.find((e) => e.email === data.email);

  //   if (!user) {
  //     throw new NotFoundException(
  //       'User Not Registered',
  //     );
  //   }

  //   if (user.password !== data.password) {
  //     throw new BadRequestException(
  //       'Incorrect Password',
  //     );
  //   }
  //   console.log("User logged in Successfully");

  //   return {
  //     message: "User Login Successfully"
  //   };
  // }

  async getAll() {
    const userRepo = this.dataSource.getRepository(User);
    return await userRepo.find();
  }

}
