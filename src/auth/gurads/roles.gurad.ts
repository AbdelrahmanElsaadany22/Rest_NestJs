import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { userRoles } from '../schemas/user.schema';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.role) {
      console.error('User or user.role is undefined');
      return false;
    }
    // Ensure user role is of type userRoles
    return matchRoles(roles, user.role);
  }
}

// Ensure userRole is of type userRoles or string
function matchRoles(roles: string[], userRole: userRoles): boolean {
  return roles.includes(userRole);
}
