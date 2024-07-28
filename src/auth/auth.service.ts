import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './schemas/user.schema'; // Ensure correct import
import { Model } from 'mongoose';
import { signUpDto } from './dto/signup.dto'; // Ensure correct import
import * as bcrypt from 'bcryptjs';
import { signinDto } from './dto/login.dto'; // Ensure correct import
import ApiFeatures from 'src/utils/apiFeatures'; // Correct import
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private userModel: Model<user>,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  // Register user
  // TODO: Implement middleware to handle duplicate email addresses
  async signUp(signUpDto: signUpDto): Promise<user> {
    const { name, email, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
    const user = await this.userModel.create({ name, email, password: hashedPassword, role });
    return user;
  }

  async login(signInDto: signinDto): Promise<{ token: string }> {
  
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid Email Address Or Password.');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('The Password Is Incorrect.');
    }
    const token = await ApiFeatures.assignJwtToken(user._id.toString(), this.jwtService);
    return { token };
  }
}
