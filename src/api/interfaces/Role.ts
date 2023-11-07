import { AdminRole, AdminRoleEnum } from './Admin'

export type Role = AdminRole | 'USER'

export const RoleEnum = [...AdminRoleEnum, 'USER'] as const

const mapping = Array.from(RoleEnum)
	.reverse()
	.reduce(
		(acc, curr, i) => {
			return { ...acc, [curr]: i }
		},
		{} as { [k in Role]: number }
	)

export const roleGuards = {
	isRoleGreater: function (role1: Role, role2: Role) {
		// Every super admin is greater than the other
		if (role1 === role2 && role1 === 'ADMIN') return true

		return mapping[role1] > mapping[role2]
	},
}
