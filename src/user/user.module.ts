import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
