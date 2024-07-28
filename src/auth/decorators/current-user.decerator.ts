
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
//that provides information about the current request execution context

import { user } from '../schemas/user.schema';
export const CurrentUser=createParamDecorator(
    (data,context:ExecutionContext):user=>{
        const req=context.switchToHttp().getRequest()
        return req.user
    }
)