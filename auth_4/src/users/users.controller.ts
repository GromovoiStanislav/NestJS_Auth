import { Controller, Get, Post, Patch, Delete, Param, Body } from "@nestjs/common";
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { UserPermission } from './user-permissin.enum';
import { RequirePermissions } from "./require-permissions.decorator";


@Controller('users')
export class UsersController {

	@Post()
	// @SetMetadata('roles', [Role.ADMIN])
	@Roles(Role.ADMIN)
	@RequirePermissions(UserPermission.CREATE_USER)
	create(@Body() dto){
		return 'OK'
	}


	@RequirePermissions(UserPermission.READ_USER)
	@Get()
	findAll(){
		return 'OK'
	}


	@RequirePermissions(UserPermission.READ_USER)
	@Get(':id')
	findOne(@Param('id') id:string) {
		return 'OK'
	}


	@RequirePermissions(UserPermission.UPDATE_USER)
	@Patch(':id')
	@Roles(Role.ADMIN)
	update(@Param('id') id: string, @Body() dto) {
		return 'OK'
	}


	@Roles(Role.ADMIN)
	@RequirePermissions(UserPermission.REMOVE_USER)
	@Delete(':id')
	@Roles(Role.ADMIN)
	remove(@Param('id') id: string) {
		return 'OK'
	}

}